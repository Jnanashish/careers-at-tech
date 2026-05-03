// Dynamic sitemap. Served at /sitemap.xml. Includes:
//   - static landing pages (/, /jobs, /companies, /toolkit, /career-pages, legal)
//   - all published v2 job slugs (lastmod = datePosted)
//   - all active v2 company slugs
//   - all toolkit prompt slugs from src/content/prompts/
//
// Cap: 50,000 URLs per sitemap (Google's hard limit). At our current scale
// (~700 jobs + ~500 companies + ~15 prompts) we are nowhere near; if we
// approach the limit, split into a sitemap index.

import { fetchAllPublishedJobSlugs, fetchAllActiveCompanySlugs, listJobsV2 } from "@/core/apis/v2/client";
import { getAllPromptSlugs } from "@/lib/prompts";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech").replace(/\/$/, "");

const STATIC_PAGES = [
    { path: "/", priority: 1.0, changefreq: "daily" },
    { path: "/jobs", priority: 0.9, changefreq: "daily" },
    { path: "/companies", priority: 0.8, changefreq: "weekly" },
    { path: "/toolkit", priority: 0.7, changefreq: "weekly" },
    { path: "/career-pages", priority: 0.6, changefreq: "monthly" },
    { path: "/contact", priority: 0.4, changefreq: "yearly" },
    { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
    { path: "/terms-and-conditions", priority: 0.3, changefreq: "yearly" },
    { path: "/dmca", priority: 0.3, changefreq: "yearly" },
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

async function buildJobUrls() {
    let slugs = [];
    try {
        slugs = await fetchAllPublishedJobSlugs();
    } catch {
        return [];
    }
    if (slugs.length === 0) return [];

    // Pull lastmod (datePosted) for each job. We fetch in batches to keep memory
    // bounded. At ~700 jobs we can do this in 7 calls of 100 each.
    const lastmodBySlug = new Map();
    const PAGE = 100;
    let page = 1;
    while (true) {
        let res;
        try {
            res = await listJobsV2({ limit: PAGE, page, sort: "datePosted:desc" });
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

    return slugs.map((slug) => ({
        loc: `${SITE_URL}/jobs/${slug}`,
        lastmod: lastmodBySlug.get(slug) || undefined,
        changefreq: "daily",
        priority: 0.8,
    }));
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
        loc: `${SITE_URL}/toolkit/${e.params.slug}`,
        changefreq: "monthly",
        priority: 0.5,
    }));
}

function buildStaticUrls() {
    const today = new Date().toISOString().slice(0, 10);
    return STATIC_PAGES.map((p) => ({
        loc: `${SITE_URL}${p.path}`,
        lastmod: today,
        changefreq: p.changefreq,
        priority: p.priority,
    }));
}

export async function getServerSideProps({ res }) {
    const [staticUrls, jobUrls, companyUrls, toolkitUrls] = await Promise.all([
        Promise.resolve(buildStaticUrls()),
        buildJobUrls(),
        buildCompanyUrls(),
        Promise.resolve(buildToolkitUrls()),
    ]);

    const allUrls = [...staticUrls, ...jobUrls, ...companyUrls, ...toolkitUrls].slice(0, 50000);
    const body =
        `<?xml version="1.0" encoding="UTF-8"?>` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
        allUrls.map(urlEntry).join("") +
        `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    // Cache for 1 hour at the CDN edge; allow stale-while-revalidate for 6 hours.
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate=21600");
    res.write(body);
    res.end();
    return { props: {} };
}

export default function Sitemap() {
    return null;
}
