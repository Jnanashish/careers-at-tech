// Dynamic sitemap. Served at /sitemap.xml. Includes:
//   - static landing pages (/jobs, /companies, /resume-prompts, /tools, /career-pages, legal)
//   - all published v2 job slugs (lastmod = datePosted)
//   - all active v2 company slugs
//   - all toolkit prompt slugs from src/content/prompts/
//
// Freshness: this route is getServerSideProps, so every CDN cache miss re-reads
// the live backend. A newly published job appears without a rebuild; a deleted or
// unpublished one disappears, because /jobs/v2/slugs only returns published,
// non-deleted rows. The CDN header below is the only staleness window.
//
// lastmod policy: only emit a date we can actually stand behind. Google
// de-weights (and eventually ignores) sitemap lastmod site-wide once it spots
// values that don't track real changes, so a "today" stamp on a legal page would
// poison the signal for the job URLs that genuinely need it. Static pages carry a
// hand-maintained date; /jobs derives its date from the newest posting.
//
// Cap: 50,000 URLs per sitemap (Google's hard limit). At our current scale
// (~600 jobs + ~830 companies + ~19 prompts) we are nowhere near; if we
// approach the limit, split into a sitemap index.

import { fetchAllPublishedJobSlugs, fetchAllActiveCompanySlugs, listJobsV2 } from "@/core/apis/v2/client";
import { getAllPromptSlugs } from "@/lib/prompts";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech").replace(/\/$/, "");

// `/` is intentionally absent: it serves a 308 permanent redirect to /jobs
// (see pages/index.jsx). Listing a redirect wastes crawl budget and shows up in
// Search Console as "Page with redirect". /jobs is the canonical entry point.
// `lastmod` here is the date the page's own content last changed — bump it by hand
// when you meaningfully edit the page (it was seeded from `git log -1 --format=%cs`
// per file). Do NOT wire it to `new Date()`: a page that claims to change daily but
// doesn't is exactly what makes Google stop trusting lastmod.
// `/jobs` is the exception — its listing genuinely changes with every posting, so
// buildStaticUrls() overrides it with the newest job's datePosted.
const STATIC_PAGES = [
    { path: "/jobs", priority: 1.0, changefreq: "daily", lastmod: "2026-05-08" },
    { path: "/companies", priority: 0.8, changefreq: "weekly", lastmod: "2026-05-03" },
    { path: "/resume-prompts", priority: 0.9, changefreq: "weekly", lastmod: "2026-06-01" },
    { path: "/tools", priority: 0.7, changefreq: "monthly", lastmod: "2026-06-14" },
    { path: "/tools/linkedin-search", priority: 0.7, changefreq: "monthly", lastmod: "2026-06-05" },
    { path: "/career-pages", priority: 0.6, changefreq: "monthly", lastmod: "2026-06-14" },
    { path: "/contact", priority: 0.4, changefreq: "yearly", lastmod: "2026-06-06" },
    { path: "/privacy-policy", priority: 0.3, changefreq: "yearly", lastmod: "2026-06-06" },
    { path: "/terms-and-conditions", priority: 0.3, changefreq: "yearly", lastmod: "2026-06-06" },
    { path: "/dmca", priority: 0.3, changefreq: "yearly", lastmod: "2026-06-06" },
];

function escapeXml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
    const parts = [`<loc>${escapeXml(loc)}</loc>`];
    if (lastmod) parts.push(`<lastmod>${escapeXml(lastmod)}</lastmod>`);
    if (changefreq) parts.push(`<changefreq>${changefreq}</changefreq>`);
    if (priority != null) parts.push(`<priority>${priority.toFixed(1)}</priority>`);
    return `<url>${parts.join("")}</url>`;
}

const NO_JOBS = { urls: [], newestDatePosted: null };

/**
 * Build the /jobs/:slug entries.
 *
 * The slug list is the source of truth for *membership* — it returns only
 * published, non-deleted jobs, so adds and deletes both propagate with no
 * further work. The paged list is only consulted for each job's datePosted.
 *
 * @returns {Promise<{ urls: object[], newestDatePosted: string|null }>}
 *   newestDatePosted doubles as the lastmod for the /jobs listing page.
 */
async function buildJobUrls() {
    let slugs = [];
    try {
        slugs = await fetchAllPublishedJobSlugs();
    } catch {
        return NO_JOBS;
    }
    if (slugs.length === 0) return NO_JOBS;

    // Pull lastmod (datePosted) for each job. We fetch in batches to keep memory
    // bounded. At ~700 jobs we can do this in 7 calls of 100 each.
    //
    // includeExpired is required: /slugs returns every published job, while the
    // list endpoint hides expired ones by default. Without it the expired tail
    // (~50 jobs) lands in the sitemap with no <lastmod> at all.
    const lastmodBySlug = new Map();
    const PAGE = 100;
    let page = 1;
    while (true) {
        let res;
        try {
            res = await listJobsV2({ limit: PAGE, page, sort: "datePosted:desc", includeExpired: true });
        } catch {
            break;
        }
        const data = res?.data || [];
        for (const j of data) {
            if (j.slug) lastmodBySlug.set(j.slug, j.datePosted || j.updatedAt || null);
        }
        if (!res?.hasMore || data.length === 0 || page >= 500) break;
        page += 1;
    }

    // Newest datePosted across the jobs we actually list. Sorting is server-side,
    // but take the max explicitly so a sort change upstream can't silently make
    // the /jobs lastmod wrong.
    let newestDatePosted = null;
    for (const slug of slugs) {
        const d = lastmodBySlug.get(slug);
        if (d && (!newestDatePosted || d > newestDatePosted)) newestDatePosted = d;
    }

    return {
        urls: slugs.map((slug) => ({
            loc: `${SITE_URL}/jobs/${slug}`,
            lastmod: lastmodBySlug.get(slug) || undefined,
            changefreq: "daily",
            priority: 0.8,
        })),
        newestDatePosted,
    };
}

async function buildCompanyUrls() {
    let slugs = [];
    try {
        slugs = await fetchAllActiveCompanySlugs();
    } catch {
        return [];
    }
    return slugs.map((slug) => ({
        loc: `${SITE_URL}/companies/${slug}`,
        changefreq: "weekly",
        priority: 0.6,
    }));
}

function buildToolkitUrls() {
    let entries = [];
    try {
        entries = getAllPromptSlugs() || [];
    } catch {
        return [];
    }
    return entries.map((e) => ({
        loc: `${SITE_URL}/resume-prompts/${e.params.slug}`,
        changefreq: "monthly",
        priority: 0.7,
    }));
}

function buildStaticUrls(newestJobDate) {
    return STATIC_PAGES.map((p) => ({
        loc: `${SITE_URL}${p.path}`,
        // The listing at /jobs really does change every time a job is posted, so
        // its lastmod tracks the data. Everything else uses its hand-set date.
        lastmod: (p.path === "/jobs" && newestJobDate) || p.lastmod,
        changefreq: p.changefreq,
        priority: p.priority,
    }));
}

export async function getServerSideProps({ res }) {
    const [jobs, companyUrls, toolkitUrls] = await Promise.all([
        buildJobUrls(),
        buildCompanyUrls(),
        Promise.resolve(buildToolkitUrls()),
    ]);
    const staticUrls = buildStaticUrls(jobs.newestDatePosted);

    const allUrls = [...staticUrls, ...jobs.urls, ...companyUrls, ...toolkitUrls].slice(0, 50000);
    const body =
        `<?xml version="1.0" encoding="UTF-8"?>` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
        allUrls.map(urlEntry).join("") +
        `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    // Fresh for 10 min at the CDN edge, then served stale for up to 1 more hour
    // while it revalidates in the background — so a new or deleted job shows up
    // within ~10 min, 70 min worst case. Regenerating costs ~9 backend calls and
    // only crawlers request this route, so the tighter window is close to free.
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=600, stale-while-revalidate=3600");
    res.write(body);
    res.end();
    return { props: {} };
}

export default function Sitemap() {
    return null;
}
