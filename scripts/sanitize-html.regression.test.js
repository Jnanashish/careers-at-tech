/**
 * Regression guard for the sanitize-html dependency used by src/pages/jobs/[slug].js.
 *
 * Why this file exists
 * -------------------
 * sanitize-html 2.17.6 changed its htmlparser2 dependency from ^10.1.0 to ^12.0.0.
 * htmlparser2 11 and 12 are ESM-only ("type": "module", no `require` export
 * condition), but sanitize-html itself is still CommonJS and does
 * `require('htmlparser2')` at the top of its index.js.
 *
 * Next.js does not bundle node_modules into the server output — it externalises
 * them and `require()`s them at runtime. Vercel's runtime shim (/opt/rust/nodejs.js)
 * reimplements Module._load without Node's require(esm) interop, so the require
 * threw ERR_REQUIRE_ESM and every uncached render of /jobs/[slug] returned a 500.
 * It did not reproduce locally because modern Node supports require(esm) natively.
 *
 * 2.17.5 is the newest release that is both advisory-clean and CommonJS-safe, so
 * package.json pins it exactly. These tests fail if that pin is loosened, and also
 * fail if a future version bump drops the two security behaviours the pin must keep.
 *
 * Run: npm run test:deps
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const sanitizeHtml = require("sanitize-html");
const { version } = require("sanitize-html/package.json");

const REPO_ROOT = path.join(__dirname, "..");
const JOB_PAGE = path.join(REPO_ROOT, "src", "pages", "jobs", "[slug].js");

// The options object from src/pages/jobs/[slug].js getStaticProps. Kept in sync by
// the "job page still passes rel" test below.
const jobDescriptionOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "img"]),
    allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        a: [...(sanitizeHtml.defaults.allowedAttributes.a || []), "rel"],
        "*": ["class", "id"],
    },
    disallowedTagsMode: "discard",
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
            rel: "nofollow noopener noreferrer",
            target: "_blank",
        }),
    },
};

const clean = (html) => sanitizeHtml(html, jobDescriptionOptions);

test("sanitize-html loads under a CommonJS require with require(esm) interop disabled", () => {
    // This is the exact failure that took /jobs/[slug] down. Node's require(esm)
    // support masks it locally, so we explicitly turn that support off — which is
    // the state Vercel's runtime shim is effectively in.
    const flag = "--no-experimental-require-module";
    const supportsFlag = process.allowedNodeEnvironmentFlags.has(flag);

    // On a Node without require(esm) at all, a plain require is already the strict case.
    const args = supportsFlag ? [flag, "-e", "require('sanitize-html')"] : ["-e", "require('sanitize-html')"];

    assert.doesNotThrow(
        () => execFileSync(process.execPath, args, { cwd: REPO_ROOT, stdio: "pipe" }),
        "require('sanitize-html') threw. Its htmlparser2 dependency is ESM-only — " +
            "sanitize-html must stay pinned to a release that depends on htmlparser2 ^10."
    );
});

test("sanitize-html resolves a CommonJS-capable htmlparser2", () => {
    // Read from disk rather than require()-ing: htmlparser2 does not expose
    // ./package.json through its "exports" map. Prefer a nested copy, which is what
    // npm installs when sanitize-html's range conflicts with the hoisted one.
    const candidates = [
        path.join(REPO_ROOT, "node_modules/sanitize-html/node_modules/htmlparser2/package.json"),
        path.join(REPO_ROOT, "node_modules/htmlparser2/package.json"),
    ];
    const pkgPath = candidates.find((p) => fs.existsSync(p));
    assert.ok(pkgPath, "htmlparser2 is not installed");

    const parserPkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const exportsField = parserPkg.exports?.["."];
    const hasRequireCondition =
        typeof exportsField === "object" && exportsField !== null && "require" in exportsField;

    assert.ok(
        hasRequireCondition,
        `htmlparser2@${parserPkg.version} exposes no "require" export condition, so the ` +
            "CommonJS sanitize-html cannot load it on the deploy runtime."
    );
});

test("package.json pins sanitize-html exactly, not with a range", () => {
    const range = require(path.join(REPO_ROOT, "package.json")).dependencies["sanitize-html"];
    assert.match(
        range,
        /^\d+\.\d+\.\d+$/,
        `sanitize-html is declared as "${range}". A ^ or ~ range lets npm resolve 2.17.6+, ` +
            "which pulls the ESM-only htmlparser2 and 500s every job page."
    );
});

test("<xmp> raw-text content cannot smuggle markup through the allowlist", () => {
    // GHSA: default XSS via `xmp` raw-text passthrough, fixed in 2.17.4.
    const out = clean("<xmp><img src=x onerror=alert(1)></xmp>");
    assert.ok(!/onerror/i.test(out), `xmp content leaked an event handler: ${out}`);
    assert.ok(!/<img/i.test(out), `xmp content leaked a live tag: ${out}`);
});

test("javascript: URIs are stripped from action-bearing attributes", () => {
    // GHSA: incomplete URI scheme validation via action/formaction/data/poster/background,
    // fixed in 2.17.5.
    const vectors = [
        '<button formaction="javascript:alert(1)">go</button>',
        '<video poster="javascript:alert(1)"></video>',
        '<table background="javascript:alert(1)"></table>',
        '<form action="javascript:alert(1)"></form>',
        '<object data="javascript:alert(1)"></object>',
        '<a href="javascript:alert(1)">x</a>',
    ];
    for (const vector of vectors) {
        const out = clean(vector);
        assert.ok(!/javascript:/i.test(out), `javascript: survived sanitisation of ${vector} -> ${out}`);
    }
});

test("links inside a job description come out with rel=nofollow noopener noreferrer", () => {
    // Regression guard for the attribute-allowlist bug: transformTags added rel and
    // the allowedAttributes filter removed it again, so the control was a no-op.
    const out = clean('<a href="https://example.com/apply">Apply</a>');
    assert.match(out, /rel="nofollow noopener noreferrer"/, `rel was stripped: ${out}`);
    assert.match(out, /target="_blank"/, `target was stripped: ${out}`);
});

test("a rel supplied by the backend HTML cannot override ours", () => {
    const out = clean('<a href="https://example.com" rel="dofollow">x</a>');
    assert.match(out, /rel="nofollow noopener noreferrer"/, `backend rel won: ${out}`);
    assert.ok(!/dofollow/.test(out), `backend rel survived: ${out}`);
});

test("the job page allowlist still permits rel on <a>", () => {
    // The options above are a copy of the page's. If the page stops allowing rel,
    // the behavioural tests would keep passing while production silently regressed.
    const source = fs.readFileSync(JOB_PAGE, "utf8");
    assert.match(
        source,
        /allowedAttributes\.a\s*\|\|\s*\[\]\)\s*,\s*"rel"\s*\]/,
        "src/pages/jobs/[slug].js no longer adds \"rel\" to the <a> attribute allowlist; " +
            "the nofollow/noopener transform is a no-op again."
    );
});

test("the pinned version is one of the known advisory-clean, CJS-safe releases", () => {
    assert.equal(
        version,
        "2.17.5",
        `sanitize-html is ${version}. 2.17.6+ is ESM-broken on the deploy runtime and ` +
            "<=2.17.4 carries open XSS advisories. Re-verify both before changing this."
    );
});
