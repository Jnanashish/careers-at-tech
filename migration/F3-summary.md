# F3 — `/jobs/[slug]` Detail + JobPosting JSON-LD + Legacy Redirect Shim

**Date:** 2026-05-03
**Status:** ✅ **COMPLETE**

---

## What shipped

### Files created
| Path | Purpose |
|---|---|
| `src/pages/jobs/[slug].js` | New v2 job detail page. SSG + ISR (`fallback: "blocking"`, `revalidate: 300`). Includes JobPosting JSON-LD, OG/Twitter meta, canonical, mobile sticky apply bar, similar-jobs sidebar. |
| `src/core/SEO/jobPostingJsonLd.js` | Pure builder for the JobPosting structured-data object. Returns `null` when any Google-required field is missing or `isExpired` is true (Google rejects either case anyway, so emitting bad schema is worse than emitting none). |
| `src/Helpers/jobV2helpers.js` | Display formatters: employment type / work mode labels, location join with overflow `+N`, INR salary formatter (`₹8L–12L LPA`, `₹2.5Cr`), batch sort, experience range, `daysUntil(validThrough)`, `resolveApplyUrl()` cascade (`applyLink → company.careerPageLink → company.website`), meta-title / meta-description fallbacks. |

### Files modified
| Path | Change |
|---|---|
| `src/pages/[jobtitle]/[id].js` | **Completely rewritten** as a server-side legacy-URL redirect shim. `getServerSideProps` calls `fetchSlugByLegacyId(id)` and 301s to `/jobs/<new-slug>`. On unresolvable id → HTTP 410 Gone (per F1 plan, never 404). Reserved top-level segments are guarded against. |
| `tailwind.config.js` | **Additive only** — added `cream: "#F7F4EF"` and `terracotta: { DEFAULT, hover, light }` colors; registered `@tailwindcss/typography` plugin for the `prose` JD container. No existing tokens changed. |
| `package.json` | Added `isomorphic-dompurify@^3.12.0` and `@tailwindcss/typography@^0.5.19`. |

---

## Build output (production)

```
Route (pages)                                  Size     First Load JS
┌ ƒ /[jobtitle]/[id]                            666 B    97.3 kB    ← redirect shim, dynamic SSR
├ ● /jobs/[slug] (ISR: 300 Seconds)            22.4 kB  164 kB     ← v2 detail, ISR
│   ├ /jobs/accenture-data-engineer-azwzxe (11248 ms)
│   ├ /jobs/blackrock-frontend-engineer-vice-president-vfzp7m (3606 ms)
│   ├ /jobs/google-ux-designer-y4scqa (2623 ms)
│   ├ /jobs/google-associate-product-manager-intern-nzyvss (2604 ms)
│   ├ /jobs/stripe-software-engineer-zqpyg9 (2202 ms)
│   ├ /jobs/stripe-frontend-engineer-intern-zy449n (2152 ms)
│   ├ /jobs/accenture-associate-software-engineer-8wtf5z (10519 ms)
│   └ [+2 more paths] (avg 1882 ms)
```

All 9 published v2 slugs pre-rendered at build time. Preserved routes (`/toolkit`, `/contact`, `/dmca`, `/privacy-policy`, `/terms-and-conditions`, `/career-pages`, `/tools/linkedin-search`) build untouched.

No new lint errors introduced. Pre-existing warnings in `src/components/Dropdown`, `src/components/common/Header`, `src/widgets/CareerePages`, `src/widgets/JobList` (deprecated), and `src/widgets/JobListRedesign` are out of scope.

---

## Verification

### `/jobs/accenture-data-engineer-azwzxe` — JSON-LD payload (live)

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Data Engineer",
  "description": "Apply for Data Engineer at Accenture. View eligibility, salary range, skills required, and apply now on CareersAt.Tech.",
  "datePosted": "2026-04-21T19:44:09.751Z",
  "validThrough": "2026-06-18T19:44:06.963Z",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Accenture"
  },
  "directApply": false,
  "jobLocation": [
    {
      "@type": "Place",
      "address": { "@type": "PostalAddress", "addressLocality": "Bangalore", "addressCountry": "IN" }
    },
    {
      "@type": "Place",
      "address": { "@type": "PostalAddress", "addressLocality": "Hyderabad", "addressCountry": "IN" }
    }
  ],
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": { "@type": "QuantitativeValue", "unitText": "YEAR", "minValue": 800000, "maxValue": 1200000 }
  },
  "skills": "Python, Spark, Airflow, SQL"
}
```

**Google for Jobs required-field check:**

| Field | Required | Present | Notes |
|---|---|---|---|
| `title` | ✓ | ✓ | "Data Engineer" |
| `description` | ✓ | ✓ | non-empty |
| `datePosted` | ✓ | ✓ | ISO 8601 |
| `validThrough` | ✓ | ✓ | ISO 8601 |
| `employmentType` | ✓ | ✓ | enum-valid `FULL_TIME` |
| `hiringOrganization` | ✓ | ✓ | name set |
| `jobLocation` OR `applicantLocationRequirements` | ✓ | ✓ | 2 Place entries |
| `baseSalary` | ✗ (recommended) | ✓ | correct shape |

This page is **eligible for Google for Jobs**. Recommend running the full Rich Results Test against the deployed URL once Phase 6 ships and the page is live in production.

### Other verification points

- **`/jobs/blackrock-frontend-engineer-vice-president-vfzp7m`** — JSON-LD correctly suppressed (BlackRock job has `validThrough: null`; Google would reject the schema). Page still renders fully, including all fields, salary (`₹25L–40L LPA`), single Mumbai location, "Apply on company site" chip. Title and canonical correct.
- **HTTP 404** on unknown slug `/jobs/this-doesnt-exist-zzz` ✓
- **HTTP 410 Gone** on legacy `/some-old-job/aabbccddeeff112233445566` ✓ (driven by the broken backend by-id resolver — frontend gracefully falls back to 410 per F1 plan)
- **Mobile sticky apply bar** appears below `lg` breakpoint with terracotta CTA. (Visual check on built output; full responsive verification in Phase 7.)
- **Sanitization** — `jobDescription.html` runs through `isomorphic-dompurify.sanitize()` with `FORBID_TAGS=[script,style,iframe,object,embed,form]` and dangerous attribute denial in `getStaticProps` (server-side, so the sanitizer doesn't ship in the client bundle).

### Visible content (text-extracted from `/jobs/accenture-data-engineer-azwzxe`)

```
Data Engineer · Accenture · Full-time · Hybrid · Apply on company site · Apply by 19 Jun
Location: Bangalore, Hyderabad
Salary: ₹8L–12L LPA
Batch: 2025, 2026
Experience: 0–2 yrs
Posted: 1 week ago
Apply on Accenture | Ask for referral
[Full description on company site card — external_redirect job has no html body]
Required skills: Python · Spark · Airflow · SQL
```

---

## Design decisions worth flagging

1. **`isExpired` is the gate, not `validThrough < now`**. Backend already computes `isExpired` server-side. Trusted per F2 finding. If `isExpired === true` we render the "This posting has expired" amber banner AND suppress JSON-LD entirely.
2. **`hiringOrganization` is name-only when company logo/website are missing.** Google accepts `Organization` with just a `name`. The Accenture record currently has neither logo nor website on the v2 company doc that's joined onto the job — flagged for backend data quality, not a frontend bug. Phase 4 will surface this on the company detail page where it's more visible.
3. **`directApply: false` always.** All current jobs use external redirects (or, for `internal` mode, still redirect to the company careers page via `applyLink`). When backend ships an internal apply form, we'll flip this per-job.
4. **No `BreadcrumbList` JSON-LD yet.** Visible breadcrumb UI is in place (reused `Breadcrumb` component). Adding the structured data is queued for Phase 6 alongside sitemap.
5. **Tracking POSTs use `navigator.sendBeacon` when available**, falling back to `fetch({ keepalive: true })`. Both fire from a `useEffect` so they don't run during SSR/ISR.
6. **Mobile sticky bar is inline in the page**, not a separate component. The legacy `MobileStickyBar.jsx` references v1 fields (`data.link`, `countClickinJd`) and would need its own rewrite — simpler to inline the small amount of markup.
7. **Apply CTA cascade**: `applyLink → company.careerPageLink → company.website`. Disabled state ("Apply link unavailable") shown if all three are missing. This will be rare in practice.

---

## Known issues carried forward

1. **Backend `by-id` resolver returns 410 for everything.** Documented in F2. Until backend fixes it, every legacy URL Google has indexed will get 410 Gone — correct from an SEO perspective (Google deindexes), but loses the redirect equity of resolving to the new slug. Phase 7 will recheck.
2. **Backend leaks admin fields on detail endpoint** (`__v`, `approvedBy`, `approvedFromStagingId`, `deletedAt`, `status`, `source`, `externalJobId`, `publishedAt`, `createdAt`, `updatedAt`). Adds ~1.5KB per request. Not blocking. Worth a one-line `.select('-...')` on the backend.
3. **Some companies have empty `logo` / `website`** on v2. Causes JSON-LD `hiringOrganization.logo` and `sameAs` to be omitted. Data-quality issue, not a code bug.
4. **Only 8 published jobs in v2 right now.** Sufficient for development verification; production launch needs the full migration to complete.

---

## Phase 3 — DONE. Awaiting checkpoint for Phase 4.

Reply **"go"** to start Phase 4 (`/companies/[slug]` detail page + Organization JSON-LD).
