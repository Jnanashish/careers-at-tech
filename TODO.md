# TODO

## SEO — sitemap & indexing

### 1. Wire the backend to `/api/indexnow` (needed for the push path to do anything)

The route and key file ship in this repo but nothing calls them yet. IndexNow
covers Bing / Yandex / Seznam / Naver — Google does not participate.

- Set on Vercel (both Production and Preview):
  - `INDEXNOW_KEY=c65fb186075315376225bb3974133e1e` — must equal the basename of
    `public/c65fb186075315376225bb3974133e1e.txt`, or every submission 403s.
  - `INDEXNOW_SUBMIT_TOKEN=<generate a new random secret>` — shared with the backend.
- In the Railway backend, on job **publish**, **unpublish** and **delete**:

  ```
  POST https://careersat.tech/api/indexnow
  Authorization: Bearer $INDEXNOW_SUBMIT_TOKEN
  Content-Type: application/json

  {"slugs": ["<job-slug>"]}
  ```

  Fire and forget — the route never throws and a failed ping must not fail a publish.
  Deletes use the same call: IndexNow has no delete verb, so resubmitting the dead
  URL is how you ask for de-indexing.
- After the first deploy, confirm `https://careersat.tech/c65fb186075315376225bb3974133e1e.txt`
  returns the key as plain text, then send one real submission and check Bing
  Webmaster Tools → IndexNow for the accepted count. Not verified yet: the key file
  has to be live before any submission can pass validation.

### 2. Google Indexing API for job postings (the Google-side equivalent)

Google ignores IndexNow and retired sitemap ping in June 2023, so `<lastmod>` plus
crawl scheduling is currently the only Google signal. The Indexing API is the
exception and it explicitly supports `JobPosting` — one of only two allowed types.

- Needs a GCP service account + Search Console ownership verification.
- `URL_UPDATED` on publish, `URL_DELETED` on expire/delete.
- Default quota 200 URLs/day; current volume is well under that.
- Belongs in the backend next to the IndexNow call, for the same reason.

### 3. Static-page `lastmod` is hand-maintained

`STATIC_PAGES` in `src/pages/sitemap.xml.js` carries a literal `lastmod` per page,
seeded from `git log -1 --format=%cs`. Bump it when you meaningfully edit one of
those pages. Deliberately not wired to `new Date()` — a page that claims to change
daily but doesn't is what makes Google stop trusting lastmod site-wide.

### 4. Open decision: thin and expired URLs in the sitemap

Measured 2026-08-08 against production; both are still submitted for indexing.

- **426 of 827 company pages (52%) have zero live jobs** — 29% of the whole
  sitemap. `/companies/3m` is representative: `openJobsCount: 0`, no jobs, a
  327-char boilerplate blurb, and `companies/[slug].js` hardcodes
  `index, follow`. Candidate for dropping from the sitemap + `noindex`.
- **49 expired jobs are still listed.** `jobPostingJsonLd.js` correctly returns
  `null` for them so no invalid schema ships, but the pages return 200 with
  `index, follow`. Google's JobPosting guidance is to remove expired postings.

Deferred pending a call on whether these pages have standalone search value.
`Meta.jsx` now takes a `noindex` prop, so whichever way this is decided the
page-level half of it is a one-line change.

### 5. Backend does not populate `validThrough` on any job

Confirmed against production on 2026-08-15: `validThrough` is `null` on every job
returned by `/jobs/v2/:slug`.

`validThrough` is only *recommended* by Google, and `jobPostingJsonLd.js` no
longer treats it as required — before that fix its absence suppressed the
JobPosting block on **100%** of job pages, so the site shipped no Google-for-Jobs
markup at all. The schema is emitting now, but without `validThrough`:

- Google has no expiry signal and will keep a posting live until it 404s or
  drops out of the sitemap.
- The JD-E "Closes" spec cell renders `—` on every job, and `daysUntil()` returns
  null so the urgency pill never fires.

Populating it backend-side is the real fix. Once it exists, revisit item 4 —
`isExpired` + `validThrough` together make the expired-page policy enforceable.

### 6. Dependency upgrades that need their own PR

`npm audit`: 21 findings, 1 critical, all transitive after the 2026-08-15 pass
(that pass patched the two that were directly exploitable here — `sanitize-html`,
fixing an XSS via `xmp` raw-text passthrough in the exact call path used for job
descriptions, and `postcss` 8.5.13→8.5.26). That pass went to `sanitize-html`
2.17.7 and took the site down; it now sits at 2.17.5, which is advisory-clean.
See item 8.

- **`firebase@10` → `@12`** (major). Pulls `@firebase/database` →
  `faye-websocket` → `websocket-driver` (critical). Nothing imports
  `firebase/database`, so it never reaches the client bundle — this is an audit
  finding, not a live exposure. Needs an analytics smoke test after upgrading.
- **`next@14.2.35` → `15`/`16`** (major). 14.2.35 is the last 14.2 patch, so the
  open advisories cannot be cleared inside the 14 line. Most of them are App
  Router / Server Actions / RSC / middleware / i18n / self-hosted-image-optimizer
  issues, none of which this app uses (Pages Router, no middleware, no i18n, no
  rewrites, Vercel-managed image optimizer). Real work, low urgency.

### 7. No Content-Security-Policy

`next.config.js` sets `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy` and `X-DNS-Prefetch-Control`. CSP is
deliberately absent: AdSense, Clarity, the inline Clarity bootstrap and the
inline JSON-LD blocks all need either `unsafe-inline` (pointless) or a nonce
pipeline plus a `Report-Only` rollout. Worth doing, but as its own change.

### 8. `sanitize-html` is pinned to 2.17.5 and cannot be bumped yet

`sanitize-html` 2.17.6 moved its `htmlparser2` dependency from `^10.1.0` to
`^12.0.0`. htmlparser2 11 and 12 are ESM-only (`"type": "module"`, no `require`
export condition) while `sanitize-html` is still CommonJS and does
`require('htmlparser2')` at the top of `index.js`.

Next.js externalises `node_modules` from the server output and `require()`s them
at runtime. Vercel's runtime shim (`/opt/rust/nodejs.js`) reimplements
`Module._load` without Node's `require(esm)` interop, so that require threw
`ERR_REQUIRE_ESM` and **every uncached render of `/jobs/[slug]` returned a 500**
(2026-08-16). It does not reproduce locally, because modern Node supports
`require(esm)` natively — reproduce with
`node --no-experimental-require-module -e "require('sanitize-html')"`.

2.17.5 is the newest release that is both advisory-clean (it has the `xmp`
raw-text fix from 2.17.4 and the `formaction`/`poster`/`background`/`data`
scheme fix from 2.17.5) and CommonJS-safe. The version in `package.json` is an
exact pin on purpose: a `^` or `~` range resolves to 2.17.6+ and takes the site
down again. `npm run test:deps` guards this.

Unpin when **either** happens:
- `sanitize-html` ships a release that works under CJS `require()` again (either
  it goes ESM/dual itself, or htmlparser2 restores a `require` export condition), or
- the deploy runtime gains `require(esm)` interop.

Alternative if a newer `sanitize-html` is ever needed urgently: add
`transpilePackages: ["sanitize-html"]` to `next.config.js` so webpack bundles it
instead of externalising it. Unverified — it must be tested against a real
deployment, not `next start`, since the failure lives in Vercel's module loader.
Do **not** "fix" this with an npm `overrides` pin of `htmlparser2` to v10 while on
2.17.7: 2.17.7's `<textarea>` escaping is written for htmlparser2 ≥ 11 RCDATA
decoding, so v10 would mis-escape and reopen the mutation-XSS path.
