// IndexNow submission helper.
//
// IndexNow is a push protocol: instead of waiting for a crawler to re-read
// sitemap.xml, we tell the engine the moment a URL appears or disappears.
// Bing, Yandex, Seznam and Naver participate and share submissions with each
// other. Google does NOT — for Google, job URLs need the Indexing API (which
// officially supports JobPosting) and the sitemap remains the fallback.
//
// Ownership is proved by hosting a file at https://<host>/<key>.txt whose entire
// body is the key. That file lives at public/<key>.txt and MUST stay in sync with
// INDEXNOW_KEY — if they diverge, every submission is rejected with 403.
//
// There is no "delete" verb. A removed job is submitted like any other URL; the
// engine recrawls, gets a 404/410 or a noindex, and drops it. Submitting a dead
// URL is the correct way to request de-indexing, not an error.

const ENDPOINT = "https://api.indexnow.org/indexnow";

// Per-request cap in the IndexNow spec. Larger batches must be chunked.
const MAX_URLS_PER_REQUEST = 10000;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech").replace(/\/$/, "");

export function getIndexNowKey() {
    return process.env.INDEXNOW_KEY || null;
}

/**
 * Keep only absolute URLs on our own origin. IndexNow rejects a whole batch if
 * any URL is off-host, so one bad entry would silently cost us every other URL
 * in the same call.
 * @param {string[]} urls
 * @returns {string[]} deduped, same-origin URLs
 */
export function filterOwnHostUrls(urls) {
    if (!Array.isArray(urls)) return [];
    const origin = new URL(SITE_URL).origin;
    const seen = new Set();
    for (const raw of urls) {
        if (typeof raw !== "string" || !raw) continue;
        let parsed;
        try {
            parsed = new URL(raw);
        } catch {
            continue; // not absolute — skip rather than guess at a base
        }
        if (parsed.origin !== origin) continue;
        seen.add(parsed.toString());
    }
    return [...seen];
}

function chunk(items, size) {
    const out = [];
    for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
    return out;
}

/**
 * Submit URLs to IndexNow. Never throws — SEO pings must not be able to fail a
 * job publish. Inspect the returned object to see what happened.
 *
 * @param {string[]} urls absolute URLs on this site (added, updated or removed)
 * @returns {Promise<{ ok: boolean, submitted: number, skipped: number, batches: {status: number|null, count: number, error?: string}[], reason?: string }>}
 */
export async function submitToIndexNow(urls) {
    const key = getIndexNowKey();
    const valid = filterOwnHostUrls(urls);
    const skipped = (Array.isArray(urls) ? urls.length : 0) - valid.length;

    if (!key) return { ok: false, submitted: 0, skipped, batches: [], reason: "INDEXNOW_KEY not set" };
    if (valid.length === 0) return { ok: false, submitted: 0, skipped, batches: [], reason: "no valid same-host URLs" };

    const host = new URL(SITE_URL).host;
    const batches = [];
    let submitted = 0;

    for (const group of chunk(valid, MAX_URLS_PER_REQUEST)) {
        try {
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    host,
                    key,
                    keyLocation: `${SITE_URL}/${key}.txt`,
                    urlList: group,
                }),
            });
            // 200 accepted, 202 accepted but key still being validated. Both fine.
            const ok = res.status === 200 || res.status === 202;
            if (ok) submitted += group.length;
            batches.push({ status: res.status, count: group.length });
        } catch (err) {
            batches.push({ status: null, count: group.length, error: String(err?.message || err) });
        }
    }

    return { ok: submitted > 0, submitted, skipped, batches };
}

/**
 * Convenience wrapper for job slugs, which is the common case.
 * @param {string[]} slugs
 */
export function jobUrlsFromSlugs(slugs) {
    if (!Array.isArray(slugs)) return [];
    return slugs.filter(Boolean).map((s) => `${SITE_URL}/jobs/${s}`);
}
