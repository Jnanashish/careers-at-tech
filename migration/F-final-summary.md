# F — Final Migration Summary

**Repo:** `careers-at-tech`
**Branch:** `staging`
**Migration end date:** 2026-05-03
**Phases completed:** F1 audit → F7 cleanup, all 7 checkpoints passed.

---

## What this migration delivered

1. **Switched all public reads to v2.** Every `/api/jd/get*` call is gone. The v2 client at `src/core/apis/v2/client.js` is the only path to job and company data.
2. **Restructured URLs.** Job URLs are now `/jobs/[slug]` (was `/[titleSlug]/[mongoId]`). Companies got a brand-new namespace at `/companies/[slug]` and `/companies` listing.
3. **Shipped Google for Jobs.** `/jobs/[slug]` emits valid `JobPosting` JSON-LD with all six required fields (title, description, datePosted, validThrough, employmentType, hiringOrganization, jobLocation/applicantLocationRequirements). Verified in F3 against the Accenture posting.
4. **Shipped Organization JSON-LD** on `/companies/[slug]`.
5. **Shipped BreadcrumbList JSON-LD** on both detail page types.
6. **Built the first dynamic sitemap.** `/sitemap.xml` lists 492 URLs (9 static + 9 jobs with lastmod + 459 companies + 15 toolkit prompts).
7. **Updated `robots.txt`** to disallow `/api/` and `/_next/`.
8. **301/410 redirect shim** at `/[jobtitle]/[id]` for the legacy URL pattern Google has indexed.
9. **Deleted 25 v1 files** + 6 empty directories. Removed v1 endpoint constants. Bundle shrunk by ~1KB.
10. **Five preserved feature areas (toolkit, tools/linkedin-search, legal pages, career-pages, AI prompts) are confirmed unchanged.** All 6 preserved routes return 200 in the smoke test.

---

## Files

### Created (15)

| Path | Purpose |
|---|---|
| `src/core/apis/v2/client.js` | 9-function v2 API client (Phase 2) |
| `src/core/SEO/jobPostingJsonLd.js` | JobPosting schema builder (Phase 3) |
| `src/core/SEO/organizationJsonLd.js` | Organization schema builder (Phase 4) |
| `src/core/SEO/breadcrumbJsonLd.js` | BreadcrumbList schema builder (Phase 6) |
| `src/Helpers/jobV2helpers.js` | Display formatters: salary (`₹8L–12L LPA`), batch, experience, work mode, employment type, apply-URL cascade (Phase 3) |
| `src/pages/jobs/[slug].js` | New v2 job detail page (Phase 3) |
| `src/pages/companies/index.js` | New companies listing (Phase 5) |
| `src/pages/companies/[slug].js` | New v2 company detail page (Phase 4) |
| `src/pages/sitemap.xml.js` | Dynamic sitemap (Phase 6) |
| `src/widgets/JobListV2/index.jsx` | New v2 listing widget (Phase 5) |
| `src/components/Redesign/JobCardV2.jsx` | New v2 job card (Phase 5) |
| `src/components/Redesign/FilterBarV2.jsx` | New v2 filter bar (Phase 5) |
| `migration/F1-frontend-audit.md` … `F7-summary.md` | Per-phase summaries |
| `migration/F-final-summary.md` | This document |
| `migration/scripts/test-v2-client.js` | Smoke test script (Phase 2) |
| `migration/backend-prompt.md` | The handoff prompt that unblocked Phase 2 |

### Modified (8)

| Path | Change |
|---|---|
| `src/pages/[jobtitle]/[id].js` | Rewritten as legacy 301/410 redirect shim |
| `src/pages/jobs/index.js` | Switched from `getJobListing` to `listJobsV2` |
| `src/pages/index.jsx` | JS-driven `Router.push` → server-side 308 redirect |
| `src/pages/toolkit/index.jsx` | Trending-jobs section migrated to v2 (preserved feature) |
| `src/core/apis/apiEndpoints.js` | Removed v1 `job_list` and `update_job_click_count` keys |
| `tailwind.config.js` | Added `cream` (#F7F4EF) and `terracotta` brand tokens; registered `@tailwindcss/typography` |
| `public/robots.txt` | Added `Disallow: /api/`, `Disallow: /_next/` |
| `package.json` | Added `isomorphic-dompurify@^3.12.0`, `@tailwindcss/typography@^0.5.19` |

### Deleted (25 + 6 dirs)

See F7-summary.md for the full list. Highlights: `src/core/apis/jobapicall.js`, `src/Helpers/jobdetailshelper.js`, `src/widgets/JobList{,Redesign}/`, all `src/components/Redesign/JobDetail/*` v1 subcomponents, `src/core/SEO/JobDetailMeta.jsx`, `src/core/SEO/JobDescriptionMeta.jsx`, deprecated `Temp/Modal/`, `Similarjob/`, `Jobcard/`, `Jobdetails/`.

---

## Endpoints called (frontend → backend)

All against `https://careersattech-backend-production.up.railway.app/api`:

| Method | Path | Caller |
|---|---|---|
| GET | `/jobs/v2` | `listJobsV2()` — listing page, similar jobs on detail, toolkit trending, sitemap |
| GET | `/jobs/v2/:slug` | `fetchJobV2BySlug()` — `/jobs/[slug]` `getStaticProps` |
| GET | `/jobs/v2/by-id/:id` | `fetchSlugByLegacyId()` — `/[jobtitle]/[id]` redirect shim |
| GET | `/jobs/v2/slugs` | `fetchAllPublishedJobSlugs()` — sitemap, `getStaticPaths` |
| GET | `/companies/v2` | `listCompaniesV2()` — `/companies` listing |
| GET | `/companies/v2/:slug` | `fetchCompanyV2BySlug()` — `/companies/[slug]` |
| GET | `/companies/v2/slugs` | `fetchAllActiveCompanySlugs()` — sitemap, `getStaticPaths` |
| POST | `/jobs/v2/:slug/track-view` | `trackJobView()` — fires from `useEffect` on detail page mount |
| POST | `/jobs/v2/:slug/track-apply` | `trackJobApplyClick()` — fires from Apply button onClick |

DAS (advertising) endpoints `/sda/*` and `/showadpop/get` are unchanged and still on v1.

---

## Backend gaps surfaced + status

| Gap | Phase found | Status |
|---|---|---|
| Public v2 endpoints didn't exist at all | F2 | **Resolved** — backend agent shipped all 9 routes; smoke 12/12 passed |
| `GET /api/jobs/v2/by-id/:id` returns 410 for every input, including live published v2 docs | F2/F3 | **Open** — frontend gracefully emits 410 Gone for legacy URLs as fallback. When backend fixes the resolver, redirect equity transfers automatically without frontend code change |
| Detail endpoint leaks admin fields (`__v`, `approvedBy`, `approvedFromStagingId`, `deletedAt`, `status`, `source`, `externalJobId`, `publishedAt`, `createdAt`, `updatedAt`) — adds ~1.5KB per request | F2 | **Open** — non-blocking. One-line `.select('-...')` on backend |
| `recentJobs` empty on company detail; `?company=slug` filter on jobs list also returns empty for companies that have published jobs (e.g. Google has 3 jobs, both endpoints return 0) | F4 | **Open** — backend join bug. Frontend renders empty state gracefully |
| Most v2 jobs have no joined company (Accenture's job has `company.companyName: "Accenture"` but `company.website` and `company.logo` are missing) | F3 | **Data quality** — backend should backfill or auto-create stub company docs |
| `applyLink` field name (vs spec's `applyUrl`); top-level `isExpired` flag instead of `validThrough < now` | F2 | **Resolved** — frontend client adapts to actual response shape |

---

## Lighthouse — RUN AFTER DEPLOY

I cannot run Lighthouse from this environment without a public deploy URL. Run after the first staging deploy, fill this table in, attach screenshots from PageSpeed Insights or `lighthouse` CLI:

| Route | Performance | SEO | Accessibility | Best Practices | Notes |
|---|---|---|---|---|---|
| `/` (redirects to /jobs) | _ | _ | _ | _ | should be N/A — redirect doesn't render |
| `/jobs` | _ | _ | _ | _ | target ≥85 / 100 / 90 / 90 |
| `/jobs/<live-slug>` | _ | _ | _ | _ | target ≥85 / 100 / 90 / 90 |
| `/companies/<live-slug>` | _ | _ | _ | _ | target ≥85 / 100 / 90 / 90 |

Pre-migration Lighthouse on `/[jobtitle]/[id]` was not recorded — this is a clean v2 baseline.

---

## Bundle size comparison (build output, top routes)

| Route | First Load JS |
|---|---|
| Shared (all routes) | **107 kB** (was 108 kB pre-migration; -1 kB) |
| `/jobs` | 170 kB (new v2 listing) |
| `/jobs/[slug]` | 165 kB (new) |
| `/companies` | 149 kB (new) |
| `/companies/[slug]` | 151 kB (new) |
| `/toolkit` | 145 kB (preserved) |
| `/tools/linkedin-search` | 157 kB (preserved) |

---

## Verification artifacts

- **F2 smoke test (12 checks):** PASSED. `node migration/scripts/test-v2-client.js` runs end-to-end against the live backend.
- **F7 manual smoke checklist (20 checks):** PASSED. Every preserved route returns 200; every new route renders the expected JSON-LD.
- **JSON-LD verified on `/jobs/accenture-data-engineer-azwzxe`** — all six Google for Jobs required fields present, plus `baseSalary`, `skills`, multiple `jobLocation` places.
- **Build clean** — no new lint errors. Pre-existing warnings in `Dropdown`, legacy `Header`, and `CareerePages` widget are out of scope.

---

## Manual follow-ups for the user

In priority order:

1. **Resubmit `https://careersat.tech/sitemap.xml` to Google Search Console.** Phase 6 ships a real sitemap; the old static URL was pointing at nothing.
2. **Request indexing on the top 50 job slugs** in GSC. Brand-new URLs need a nudge.
3. **Run Lighthouse against the staging deploy** and fill in the table above.
4. **Run Google's Rich Results Test** against `/jobs/accenture-data-engineer-azwzxe` (or any non-expired live URL): https://search.google.com/test/rich-results
5. **Fix the four backend gaps** flagged above (especially `by-id` resolver — affects legacy-URL SEO equity).
6. **Ship `/og/default.png`** (1200×630 PNG with the wordmark on cream) — referenced as fallback in detail pages today.
7. **Update `src/core/SEO/Meta.jsx`** stale tokens: `og:locale` is `en_US` (should be `en_IN`), `theme-color` is `#0069ff` (should match brand). One-line fix each.
8. **Complete the v1 → v2 data migration** on backend. Only 8 jobs are in `jobs_v2` today; `jobs` v1 has 714. Until the migration finishes, `/jobs` listing is largely empty.

---

## Migration ledger

```
F1 audit            → ./migration/F1-frontend-audit.md
F2 v2 client        → ./migration/F2-summary.md
F3 /jobs/[slug]     → ./migration/F3-summary.md
F4 /companies/[slug]→ ./migration/F4-summary.md
F5 listings + cards → ./migration/F5-summary.md
F6 sitemap + LD     → ./migration/F6-summary.md
F7 cleanup          → ./migration/F7-summary.md
F-final             → this file
backend prompt      → ./migration/backend-prompt.md
v2 smoke script     → ./migration/scripts/test-v2-client.js
```

All 7 checkpoint pauses were honored — work proceeded only on explicit "go" from the user. Auto mode resumed in F3 after the initial F1/F2 checkpoints.

---

## Done.
