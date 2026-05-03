# F7 — Smoke Test + Legacy Code Cleanup

**Date:** 2026-05-03
**Status:** ✅ **COMPLETE**

---

## Smoke checklist (20/20 PASS)

```
✓ Homepage redirects to /jobs              (308)  /
✓ /jobs listing                            (200)  /jobs
✓ /jobs with filter                        (200)  /jobs?employmentType=INTERN
✓ /jobs/<v2 slug>                          (200)  /jobs/accenture-data-engineer-azwzxe
✓ /jobs/<external_redirect job>            (200)  /jobs/blackrock-frontend-engineer-vice-president-vfzp7m
✓ /jobs/<unknown slug> 404                 (404)  /jobs/this-doesnt-exist-zzz
✓ Legacy URL 410                           (410)  /old-job/aabbccddeeff112233445566
✓ /companies listing                       (200)  /companies
✓ /companies/<slug>                        (200)  /companies/google
✓ /companies/<unknown> 404                 (404)  /companies/this-doesnt-exist-zzz
✓ /sitemap.xml                             (200)  /sitemap.xml
✓ /robots.txt                              (200)  /robots.txt
✓ Preserved /toolkit                       (200)  /toolkit
✓ Preserved /toolkit/<slug>                (200)  /toolkit/tailor-resume-to-jd
✓ Preserved /tools/linkedin-search         (200)  /tools/linkedin-search
✓ Preserved /career-pages                  (200)  /career-pages
✓ Preserved /contact                       (200)  /contact
✓ Preserved /dmca                          (200)  /dmca
✓ Preserved /privacy-policy                (200)  /privacy-policy
✓ Preserved /terms-and-conditions          (200)  /terms-and-conditions
```

JSON-LD on key pages (verified live):

| Page | Schemas emitted |
|---|---|
| `/jobs/accenture-data-engineer-azwzxe` | `JobPosting` + `BreadcrumbList` |
| `/jobs/google-software-engineer-ii-cevh3q` | `JobPosting` + `BreadcrumbList` |
| `/companies/google` | `Organization` + `BreadcrumbList` |
| `/toolkit` | `FAQPage` + `CollectionPage` (preserved) |

---

## Legacy code deleted

### Files removed (25 total)

**v1 API client + helpers:**
- `src/core/apis/jobapicall.js`
- `src/Helpers/jobdetailshelper.js`

**v1 SEO meta:**
- `src/core/SEO/JobDetailMeta.jsx`
- `src/core/SEO/JobDescriptionMeta.jsx`

**v1 widgets and detail components:**
- `src/widgets/JobList/index.jsx` + `joblist.module.scss`
- `src/widgets/JobListRedesign/index.jsx`
- `src/components/Redesign/FilterBar.jsx`
- `src/components/Redesign/JobCardNew.jsx`
- `src/components/Redesign/JobDetail/JobHeader.jsx`
- `src/components/Redesign/JobDetail/MobileStickyBar.jsx`
- `src/components/Redesign/JobDetail/StickyApplyCard.jsx`
- `src/components/Redesign/JobDetail/SimilarJobsMini.jsx`
- `src/components/Redesign/JobDetail/ContentCard.jsx`
- `src/components/Redesign/JobDetail/SkillTags.jsx`
- `src/components/Redesign/JobDetail/badgeUtils.js`

**v1 unused/deprecated:**
- `src/components/Similarjob/Similarjobcard.jsx` + `similarjob.module.scss`
- `src/components/Jobcard/jobcard.module.scss`
- `src/components/Jobdetails/index.jsx` + `jobdetails.module.scss`
- `src/Temp/Modal/Modal.jsx` + `modal.module.scss`

### Empty directories cleaned up
- `src/components/Similarjob/`
- `src/components/Jobcard/`
- `src/components/Jobdetails/`
- `src/Temp/Modal/`
- `src/widgets/JobList/`
- `src/widgets/JobListRedesign/`

### Files modified during cleanup
- `src/core/apis/apiEndpoints.js` — removed `job_list` and `update_job_click_count` constants. DAS endpoints retained.
- `src/pages/toolkit/index.jsx` — replaced `getJobListing` (v1) with `listJobsV2` from the v2 client. Trending-jobs links now point to `/jobs/<slug>` instead of `/<title-slug>/<id>`. Imports of `generateSlugFromrole` removed.

---

## Build state after cleanup

```
First Load JS shared by all                         107 kB     (was 108 kB before — 1 kB freed)
/jobs/[slug]                                        20.5 kB
/companies/[slug]                                   6.45 kB
/jobs                                               11.8 kB
/companies                                          3.88 kB
/sitemap.xml                                        ƒ dynamic
/[jobtitle]/[id]                                    ƒ dynamic (legacy redirect shim)
```

Preserved page sizes are **unchanged** vs. pre-cleanup baseline. Build succeeds with the same lint warning set (in `Dropdown`, legacy `Header`, `CareerePages` widget — pre-existing, out of scope).

---

## Lighthouse — not run

Lighthouse runs against a deployed URL. The user's prompt asks for "Lighthouse on `/jobs/<slug>` — Performance > 85, SEO = 100, Accessibility > 90". I cannot run Lighthouse from this environment without a public deploy URL. **Action item: run Lighthouse manually after merge + deploy** and paste the four-route comparison into the F-final-summary.md table.

For reference, the per-route static bundle sizes shipped suggest:
- `/jobs/[slug]` — 20.5 kB page + 107 kB shared = 127.5 kB JS budget. Comfortable for a fresh-on-3G mobile device.
- `/companies/[slug]` — 6.45 kB + 107 kB = 113 kB.
- Inter font + DM Sans + Instrument Serif loaded with `display: swap` (no font-blocking).
- All images `next/image` with width/height set; no CLS shifts expected.

---

## Known issues remaining (handed off to F8)

These are flagged but not blockers for ship:

1. **Backend `/api/jobs/v2/by-id/:id` returns 410 for everything.** Frontend correctly emits 410 Gone for legacy URLs. Backend fix would let the redirect equity transfer to the new slug; without it, Google deindexes legacy URLs (still correct).
2. **Backend leaks admin fields on `GET /api/jobs/v2/:slug`** (`__v`, `approvedBy`, `approvedFromStagingId`, `deletedAt`, `status`, `source`, `externalJobId`, `publishedAt`, `createdAt`, `updatedAt`). +1.5KB per request. Easy `.select('-...')` fix on backend.
3. **Backend `recentJobs` and `?company=slug` filter both empty for Google** despite Google having 3 published jobs. Join bug — flagged in F4. Frontend renders empty state gracefully.
4. **`/og/default.png` referenced but not committed.** Pages with no `seo.ogImage` and no company logo will 404 the OG image. Either ship the asset or remove the fallback.
5. **`@/core/SEO/Meta.jsx`** has `og:locale` set to `en_US` (line 28) and `theme-color` set to `#0069ff` (line 20) — both stale. Not blocking but worth a one-liner fix.
6. **8 jobs in `jobs_v2`** — production launch needs the full v1 → v2 data migration completed on backend.

---

## Phase 7 — DONE. Awaiting checkpoint for Phase 8 (final summary).

Reply **"go"** to write `F-final-summary.md`.
