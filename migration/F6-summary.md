# F6 — Sitemap + Robots + Canonical + OG Defaults + Breadcrumb JSON-LD

**Date:** 2026-05-03
**Status:** ✅ **COMPLETE**

---

## What shipped

### Files created
| Path | Purpose |
|---|---|
| `src/pages/sitemap.xml.js` | Dynamic sitemap served at `/sitemap.xml`. Includes 9 static landing pages, all published v2 job slugs (with `lastmod = datePosted`), all active v2 company slugs, all toolkit prompt slugs from `src/content/prompts/`. Cap 50,000 URLs. CDN-cached for 1h with 6h SWR. |
| `src/core/SEO/breadcrumbJsonLd.js` | Pure builder for `BreadcrumbList` structured data. |

### Files modified
| Path | Change |
|---|---|
| `public/robots.txt` | Added `Disallow: /api/` and `Disallow: /_next/`. Sitemap link unchanged. |
| `src/pages/jobs/[slug].js` | Added `BreadcrumbList` JSON-LD (Jobs → Company → Title). OG image now falls back to `/og/default.png` when neither `seo.ogImage` nor company logo exist. |
| `src/pages/companies/[slug].js` | Added `BreadcrumbList` JSON-LD (Companies → Company name). OG image fallback to `/og/default.png`. |

---

## Build output

```
ƒ /sitemap.xml                              249 B    94.4 kB    ← dynamic, server-rendered on demand
● /jobs/[slug] (ISR: 300s)                 20.5 kB  165 kB     ← +0.2kB for breadcrumb LD
● /companies/[slug] (ISR: 600s)            6.45 kB  151 kB     ← +0.15kB for breadcrumb LD
```

---

## Verification

### `/sitemap.xml` (live)

```
HTTP 200 | 59467 bytes
Content-Type: application/xml; charset=utf-8
Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=21600

Valid XML ✓
492 <loc> tags total:
  - 9 static (/, /jobs, /companies, /toolkit, /career-pages, /contact, /privacy-policy, /terms-and-conditions, /dmca)
  - 9 jobs (with lastmod timestamps from datePosted)
  - 459 companies
  - 15 toolkit prompts
```

Sample job entry:
```xml
<url>
  <loc>https://careersat.tech/jobs/accenture-associate-software-engineer-8wtf5z</loc>
  <lastmod>2026-04-21T19:44:09.433Z</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>
```

### `/robots.txt` (live)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://careersat.tech/sitemap.xml
```

### Detail-page JSON-LD (live)

`/jobs/accenture-data-engineer-azwzxe`:
- Script #1: `JobPosting` ✓
- Script #2: `BreadcrumbList` ✓

`/companies/google`:
- Script #1: `Organization` ✓
- Script #2: `BreadcrumbList` ✓

Both detail pages now emit two `<script type="application/ld+json">` blocks. The `BreadcrumbList` complements the `JobPosting`/`Organization` and helps Google render breadcrumbs in SERP.

---

## Design decisions

1. **Sitemap is `getServerSideProps`, not built-time.** With ISR for individual pages, we want the sitemap to reflect the actual current set of published jobs without rebuilding. The 1-hour CDN cache (`s-maxage=3600`) keeps it cheap; 6-hour `stale-while-revalidate` covers backend hiccups. New jobs show up within an hour without a deploy.
2. **`lastmod` for jobs only**, not for companies or static pages. Company `updatedAt` would require a per-company doc fetch; not worth the latency. Static pages get `lastmod = today` which is good enough for crawlers.
3. **Pagination loop is bounded.** When fetching job lastmods we cap at 500 pages × 100 = 50,000 jobs, which equals the sitemap cap. Defensive against runaway loops if the backend ever returns wrong `hasMore`.
4. **Breadcrumb on jobs uses company slug** when available, falls back to `?company=` query (for jobs whose company isn't joined). This keeps the breadcrumb meaningful even when the company link can't resolve.
5. **OG default image** is referenced as `/og/default.png` but the asset is **not yet committed**. The reference is in code; Phase 7 will either generate the image (1200×630 brand splash) or remove the fallback. Marked as a follow-up below.
6. **No sitemap index split.** At ~500 URLs we're nowhere near the 50k cap; if we cross it later, splitting into `sitemap-jobs.xml`, `sitemap-companies.xml`, etc., is a 30-minute refactor.
7. **Toolkit URLs included.** `getAllPromptSlugs()` from `src/lib/prompts.js` enumerates the 15 markdown files. Stays in sync as new prompts are added without touching the sitemap code.

---

## Known follow-ups

1. **`/og/default.png` not yet committed.** Pages that fall back to it will currently 404 the OG image fetch. Either: ship the asset (preferred — a 1200×630 PNG with the wordmark on cream background), OR remove the fallback. **Phase 7 action item.**
2. **Sitemap doesn't include filtered listing URLs** (`/jobs?employmentType=INTERN`, etc.). Filtered URLs are valid but not "primary" pages — leaving them out is the right call for indexing economy.
3. **No `image_sitemap` extension.** If we want company logos/banners surfaced in Google Images, we can add `xmlns:image=` and `<image:image>` tags later.
4. **No localization** (`hreflang`). Single-locale (en-IN) site, so not needed.

---

## Phase 6 — DONE. Awaiting checkpoint for Phase 7.

Reply **"go"** to start Phase 7 (smoke test, Lighthouse, delete legacy code).
