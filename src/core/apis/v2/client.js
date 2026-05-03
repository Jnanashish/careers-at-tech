// V2 backend client. Public, unauthenticated read endpoints.
// Contract verified against careersattech-backend production on 2026-05-03.
// See migration/F2-summary.md for live response shapes.

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
const V2_PREFIX = "/jobs/v2";
const V2_COMPANIES_PREFIX = "/companies/v2";

class V2ApiError extends Error {
    constructor(message, { status, url, body } = {}) {
        super(message);
        this.name = "V2ApiError";
        this.status = status;
        this.url = url;
        this.body = body;
    }
}

const isServer = typeof window === "undefined";

function buildUrl(path, params) {
    if (!API_BASE) {
        throw new V2ApiError("NEXT_PUBLIC_BACKEND_URL is not set", { status: 0, url: path });
    }
    const url = new URL(`${API_BASE}${path}`);
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            if (v === undefined || v === null || v === "") continue;
            if (Array.isArray(v)) {
                if (v.length === 0) continue;
                url.searchParams.set(k, v.join(","));
            } else {
                url.searchParams.set(k, String(v));
            }
        }
    }
    return url.toString();
}

async function fetchV2(path, { params, signal, retries = isServer ? 1 : 0 } = {}) {
    const url = buildUrl(path, params);
    let lastErr;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, { method: "GET", signal });
            if (res.status === 404) return null;
            if (!res.ok) {
                let body = null;
                try { body = await res.json(); } catch { /* non-json error */ }
                throw new V2ApiError(`v2 API ${res.status} on ${path}`, { status: res.status, url, body });
            }
            return await res.json();
        } catch (err) {
            lastErr = err;
            if (err instanceof V2ApiError) throw err; // 4xx/5xx — don't retry
            if (attempt < retries) continue;
            throw err;
        }
    }
    throw lastErr;
}

/**
 * List published jobs.
 * @param {object} params
 * @param {number} [params.limit=20]
 * @param {number} [params.page=1]
 * @param {string} [params.sort]               e.g. "datePosted:desc" | "sponsorship:desc"
 * @param {(number|number[])} [params.batch]
 * @param {(string|string[])} [params.employmentType]
 * @param {string} [params.workMode]           "onsite" | "remote" | "hybrid"
 * @param {(string|string[])} [params.topicTags]
 * @param {string} [params.search]
 * @param {string} [params.company]            company slug
 * @param {string} [params.exclude]            job slug to exclude (similar-jobs use case)
 * @param {boolean} [params.includeExpired]
 * @returns {Promise<{ data: object[], total: number, page: number, limit: number, totalPages: number, hasMore: boolean }>}
 */
export async function listJobsV2(params = {}) {
    const res = await fetchV2(V2_PREFIX, { params });
    if (!res) return { data: [], total: 0, page: 1, limit: params.limit ?? 20, totalPages: 0, hasMore: false };
    return res;
}

/**
 * Fetch a single published job by slug. Company is populated.
 * @param {string} slug
 * @returns {Promise<object|null>} null if not found / unpublished / deleted
 */
export async function fetchJobV2BySlug(slug) {
    if (!slug) return null;
    return fetchV2(`${V2_PREFIX}/${encodeURIComponent(slug)}`);
}

/**
 * Resolve a legacy v1 _id to its current v2 slug. Used by the 301 redirect shim.
 * NOTE (2026-05-03): backend currently returns 410 for every input — endpoint is broken.
 * This wrapper returns null on 410 so callers can emit a 410 Gone response.
 * @param {string} id
 * @returns {Promise<string|null>} the new slug, or null
 */
export async function fetchSlugByLegacyId(id) {
    if (!id) return null;
    try {
        const res = await fetchV2(`${V2_PREFIX}/by-id/${encodeURIComponent(id)}`);
        return res?.slug ?? null;
    } catch (err) {
        if (err instanceof V2ApiError && err.status === 410) return null;
        throw err;
    }
}

/**
 * All published, non-deleted job slugs. Used by sitemap and getStaticPaths.
 * @returns {Promise<string[]>}
 */
export async function fetchAllPublishedJobSlugs() {
    const res = await fetchV2(`${V2_PREFIX}/slugs`);
    return res?.slugs ?? [];
}

/**
 * List active companies.
 * @param {object} params
 * @param {number} [params.limit=20]
 * @param {number} [params.page=1]
 * @param {string} [params.search]
 * @param {(string|string[])} [params.companyType]
 * @param {string} [params.industry]
 * @param {string} [params.sort]
 * @returns {Promise<{ data: object[], total: number, page: number, limit: number, totalPages: number, hasMore: boolean }>}
 */
export async function listCompaniesV2(params = {}) {
    const res = await fetchV2(V2_COMPANIES_PREFIX, { params });
    if (!res) return { data: [], total: 0, page: 1, limit: params.limit ?? 20, totalPages: 0, hasMore: false };
    return res;
}

/**
 * Fetch a single active company by slug. Includes `recentJobs` (up to 20) and live `stats.openJobsCount`.
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function fetchCompanyV2BySlug(slug) {
    if (!slug) return null;
    return fetchV2(`${V2_COMPANIES_PREFIX}/${encodeURIComponent(slug)}`);
}

/**
 * All active, non-deleted company slugs.
 * @returns {Promise<string[]>}
 */
export async function fetchAllActiveCompanySlugs() {
    const res = await fetchV2(`${V2_COMPANIES_PREFIX}/slugs`);
    return res?.slugs ?? [];
}

/**
 * Fire-and-forget pageview tracker. Never throws, never blocks.
 * @param {string} slug
 */
export function trackJobView(slug) {
    if (!slug || isServer || !API_BASE) return;
    const url = `${API_BASE}${V2_PREFIX}/${encodeURIComponent(slug)}/track-view`;
    try {
        if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
            const blob = new Blob([""], { type: "application/json" });
            navigator.sendBeacon(url, blob);
            return;
        }
        fetch(url, { method: "POST", keepalive: true }).catch(() => { /* swallow */ });
    } catch { /* swallow */ }
}

/**
 * Fire-and-forget apply-click tracker. Never throws, never blocks.
 * @param {string} slug
 */
export function trackJobApplyClick(slug) {
    if (!slug || isServer || !API_BASE) return;
    const url = `${API_BASE}${V2_PREFIX}/${encodeURIComponent(slug)}/track-apply`;
    try {
        if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
            const blob = new Blob([""], { type: "application/json" });
            navigator.sendBeacon(url, blob);
            return;
        }
        fetch(url, { method: "POST", keepalive: true }).catch(() => { /* swallow */ });
    } catch { /* swallow */ }
}

export { V2ApiError };
