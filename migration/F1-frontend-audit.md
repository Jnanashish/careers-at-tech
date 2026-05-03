# F1 — Frontend Audit (Read-Only)

**Repo:** `careers-at-tech`
**Branch:** `staging`
**Audit date:** 2026-05-03
**Goal:** Inventory the v1 surface area before migrating to v2 backend (`jobs_v2`, `companies_v2`).

This document is the source of truth that subsequent phases (F2–F8) reference. Nothing in the codebase has been modified during Phase 1.

---

## 1. Current job URL pattern + route file

**Route file:** `src/pages/[jobtitle]/[id].js`

The dynamic route is **two-segment**: `/{titleSlug}/{mongoId}`. The slug is the human-readable job title; the ID is the MongoDB `_id` (or `id`) of the job document.

**Slug helper:** `src/Helpers/jobdetailshelper.js:20–26`

```js
export const generateSlugFromrole = (title) => {
    if (!title) return "";
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
};
```

**Example legacy URLs (currently indexed by Google):**
- `/software-engineer-internship/507f1f77bcf86cd799439011`
- `/backend-developer-python-go/507f1f77bcf86cd799439012`
- `/product-manager-full-time/507f1f77bcf86cd799439013`
- `/devops-engineer/507f1f77bcf86cd799439014`

**`getStaticPaths` (lines 28–48):** pre-renders the top 30 jobs where `jdpage === "true"`. `fallback: true`.

**`getStaticProps` (lines 50–64):** fetches by `id` via `getJobListing([{ id: context.params.id }])`. `revalidate: 600` (10 min ISR). Returns `notFound: true` when the API returns null/empty.

**v1 fields the page reads** (lines 100–172):
- Job-side: `_id`, `id`, `role`, `title`, `jobdesc`, `responsibility`, `eligibility`, `skills`, `aboutCompany`, `companyName`, `link`, `jobtype`, `location`, `experience`, `salary`, `createdAt`, `companytype`, `jdpage`
- Company-side (denormalized on job): `company.smallLogo`, `imagePath`

**Target v2 URL:** `/jobs/[slug]` (single-segment under a stable namespace; `slug` is unique on `jobs_v2`).

---

## 2. API client location

**Fetch wrappers:** `src/core/apis/request.js`

```js
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postHelper   = async (url, formData) => { ... }   // POST
export const getHelper    = async (url, signal)   => { ... }   // GET
export const deleteHelper = async (url)            => { ... }  // DELETE
export const updateHelper = async (url, formData)  => { ... }  // PUT
```

All return JSON on 200/201, `null` otherwise. **No retry logic, no typed errors, no signal-on-network-error.** Phase 2's v2 client will keep `getHelper`/`postHelper` for ad-hoc use but introduce its own `fetchV2()` wrapper with retry + typed errors as the prompt requires.

**Endpoint registry:** `src/core/apis/apiEndpoints.js`

```js
export const apiEndPoint = {
    dasLink: "/sda/link/get",          // ADs
    dasLinkImg: "/sda/linkimg/get",
    dasBanner: "/sda/banner/get",
    dasPopupType: "/showadpop/get",
    countBannerClick: "/sda/banner/count/",
    countdasLinkClick: "/sda/link/count/",
    countdasLinkImgClick: "/sda/linkimg/count/",
    job_list: "/jd/get",                          // ← v1
    update_job_click_count: "/jd/update/count",   // ← v1
};
```

**Standalone job/company endpoints:** `src/core/apis/jobapicall.js`

Inline `fetch` calls (do not use `getHelper`):

| Function | Endpoint | Purpose |
|---|---|---|
| `getJobListData(pagenum, dataPerPage)` | `GET /jd/get?page=&size=` | List |
| `getAlljdData(id)` | `GET /jd/get/{id}` | Detail by id |
| `getcompanynamedata(name)` | `GET /jd/get/query?query=` | Search by company name |
| `getjdBatchData(year)` | `GET /jd/get/batch?year=` | Filter by batch |
| `getjdDegreeData(deg)` | `GET /jd/get/degree?degree=` | Filter by degree |
| `getjdJobtypeData(role)` | `GET /jd/get/jobtype?jobtype=` | Filter by job type |
| `gettypeofad()` | `GET /showadpop/get` | AD popup config |
| `countClickinJd(id)` | `PATCH /jd/update/count/{id}` | Increment click count |

**Higher-level helper:** `src/Helpers/jobdetailshelper.js::getJobListing(params, page=1, size=10)` — wraps `getHelper` and serializes a heterogeneous params array into a query string. **This is the function used everywhere** the page-level `getStaticProps`/`getStaticPaths` need data. After Phase 2 it should NOT be called from migrated pages.

**Backend URL:** `src/core/backend.js` exports `API = process.env.NEXT_PUBLIC_BACKEND_URL` (also re-derived directly in `request.js`).

**No company-specific endpoints exist today.** v1 does not have a companies API; the SidebarNew company list is hardcoded.

---

## 3. Redux slices touching jobs/companies

**Store:** `src/Redux/store.js` — `configureStore` + `redux-thunk` + `persistStore`.

**Persist wrapper:** `src/Redux/service/reduxPersist.js`

```js
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persist = (persistConfig, reducer) =>
    persistReducer({ ...persistConfig, storage }, reducer);
```

**Root reducer:** `src/Redux/reducers/index.js`

```js
const dasPersistConfig = { key: "dasStore" };

export default combineReducers({
    das: persist(dasPersistConfig, dasReducer),
});
```

**The only persisted slice is `das` (advertising/banner state).** State shape (`src/Redux/reducers/rootReducers/dasReducers.js`): `{ dasLink: [], dasBanner: [], dasPoptype: [] }`. Action types: `ADD_DASLINK_DATA`, `ADD_DASBANNER_DATA`, `ADD_DAS_POPTYPE`.

**No persist `version` key is set** — so the user-prompt's caution about bumping persist version is **moot for this codebase**.

**No Redux slice currently caches jobs or companies.** Job data is fetched per-page via SSG/ISR (`getStaticProps`) and held in component-local `useState`. **This means migration touches Redux only if we choose to introduce a job/company slice — which the user prompt does not require.** Recommendation: keep job state out of Redux for v2 too.

---

## 4. SEO Meta component

**Generic Meta:** `src/core/SEO/Meta.jsx`

Props (line 4): `props.title`, `props.description`, `props.canonical` — all optional with defaults pointing to `/jobs`.

Emits in `<Head>`:
- `<title>`, `<meta name="description">`
- viewport, theme-color (`#0069ff` — note: stale, doesn't match new brand)
- canonical link
- OG: `og:title`, `og:description`, `og:locale` (en_US — should be en_IN), `og:url`, `og:site_name`, `og:image` (hardcoded Cloudinary URL), `og:image:type`, `og:image:width/height`
- Twitter: `summary_large_image` card with hardcoded image
- Material Icons stylesheet link (legacy — flagged for removal in Phase 7 if unused)

**Job-specific Meta + JSON-LD:** `src/core/SEO/JobDetailMeta.jsx`

Props (line 23): `data` (the v1 job object).

Builds:
- `title = ${role} at ${companyName} — CareersAt.Tech`
- `description` — assembled from companyName + experience + role + salary + location
- `keywords` — comma-joined
- `canonical = ${NEXT_PUBLIC_SITE_URL}/${titleSlug}/${data._id}`  ← legacy URL pattern (will need to update to `/jobs/${slug}`)
- `companyLogo = data.company?.smallLogo || data.imagePath || DEFAULT_COMPANY_LOGO`

**Existing JobPosting JSON-LD (lines 55–77) — what's missing for Google for Jobs:**

```js
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title, description (regex-stripped HTML), datePosted, employmentType,
  hiringOrganization: { name, logo },
  jobLocation: { ... }   // ONLY emitted if location !== "India"
}
```

**Critical Google for Jobs gaps:**
- ❌ No `validThrough` (required by Google — postings without it get rejected)
- ❌ No `baseSalary` 
- ❌ No `directApply` flag
- ❌ `hiringOrganization.sameAs` (company website) missing
- ❌ `jobLocation` is single object instead of array (v2 has `jobLocation: [{ city, region, country }]`)
- ❌ Missing `jobLocation` entirely when location is "India" (suppressed by ternary)
- ❌ `applicantLocationRequirements` not emitted for remote roles
- ⚠️ `stripHtml` is a regex (vulnerable to malformed HTML; not robust). Phase 3 replaces with `isomorphic-dompurify`.

**Generic JSON-LD wrapper:** `src/core/SEO/JsonLd.jsx` — a reusable `<script type="application/ld+json">` component. **Currently unused in the codebase.** Phase 3/4 will adopt it.

**Other SEO file:** `src/core/SEO/JobDescriptionMeta.jsx` — alternative meta component (no JSON-LD). Currently unused in the active job detail page; flagged for deletion in Phase 7 unless found in use.

---

## 5. Existing sitemap setup

**Status: NONE.** No dynamic sitemap exists.

- No `src/pages/sitemap.xml.js`
- No `next-sitemap.config.js`
- `next-sitemap` package is NOT in `package.json`
- `public/robots.txt` references `https://careersat.tech/sitemap.xml` but **nothing serves it** — that URL likely 404s in production today.

**Phase 6 will create `src/pages/sitemap.xml.js`** that emits XML covering: static pages, all published v2 jobs (with `lastmod = datePosted`), all active v2 companies, toolkit markdown slugs (via `getAllPromptSlugs()` from `src/lib/prompts.js`), and legal pages.

---

## 6. Existing robots.txt

`public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://careersat.tech/sitemap.xml
```

**Issues to fix in Phase 6:**
- Add `Disallow: /api/*` (per user prompt)
- Sitemap URL will become live once Phase 6 ships

---

## 7. Tailwind config — brand token check

**File:** `tailwind.config.js`

**Required brand tokens for new pages:**

| Token | Required value | Status in current config | Action |
|---|---|---|---|
| Background `bg-cream` | `#F7F4EF` | **Missing** — closest is `page: "#F9FAFB"` | Add NEW token (don't overwrite `page`) |
| Accent `terracotta` | TBD (warm orange-red) | **Missing** — closest is `linkedin.accent: "#C75B3F"` (scoped to LinkedIn page only) | Add NEW token, e.g. `terracotta: { DEFAULT: "#C75B3F", hover: "#B5492F" }` |
| Display font `Instrument Serif` | `var(--font-instrument-serif)` | ✅ Present as `serif-display` family | Reuse |
| Body font `DM Sans` | `var(--font-dm-sans)` | ✅ Present as `dm` family | Reuse |

**Decision:** Add `bg-cream` and `terracotta` as **additive** tokens. Do NOT touch existing `page`, `primary`, `linkedin.*` colors — preserved pages (toolkit, linkedin-search, legal) depend on them. New pages opt in by writing `bg-cream` / `text-terracotta` explicitly.

**Other tokens to be aware of (already wired):**
- `maxWidth: { content: "1200px", card: "800px" }`
- `borderRadius: { card: "12px", button: "8px", input: "8px" }`
- `boxShadow: { card, "card-hover", letterpress, "letterpress-hover", ... }`
- `fontSize: { hero, "page-title", "section-header", "card-title", body, small, caption }`

---

## 8. File inventory — delete / rewrite / modify / create

### Delete (Phase 7, after redirect shim verified)

| File | Why |
|---|---|
| `src/core/apis/jobapicall.js` | All v1 endpoints |
| (parts of) `src/core/apis/apiEndpoints.js` | Remove `job_list`, `update_job_click_count` |
| `src/Helpers/jobdetailshelper.js::getJobListing` | v1 wrapper (keep `generateSlugFromrole` and `generateRandomImpression` if still in use) |
| `src/core/SEO/JobDescriptionMeta.jsx` | Confirmed unused |

### Rewrite

| File | Change |
|---|---|
| `src/pages/[jobtitle]/[id].js` | Convert to thin **301 redirect shim** that resolves legacy `_id` → new slug, then `Location: /jobs/${slug}`. **Do not delete in Phase 5; delete only after analytics confirm no traffic** (Phase 7 or later). If unresolvable: 410 Gone (per user prompt §3 — never 404). |
| `src/pages/jobs/index.js` | Swap `getJobListing` → `listJobsV2`. Keep ISR. |
| `src/widgets/JobListRedesign/index.jsx` | Remap filter keys from `[batch, year, companyname, degree, jobtype, query, location]` → `[batch, employmentType, workMode, company (slug), search, topicTags]`. |
| `src/components/Redesign/JobCardNew.jsx` | Replace destructure of v1 fields with v2 fields. URL becomes `/jobs/${slug}`. Remove `countClickinJd` import (use `trackJobApplyClick` from new client). |
| `src/components/Redesign/JobDetail/SimilarJobsMini.jsx` | Same v1→v2 field remap. URL becomes `/jobs/${slug}`. |
| `src/core/SEO/JobDetailMeta.jsx` | Slim down to just OG/Twitter/canonical. JSON-LD generation moves to `src/core/SEO/jobPostingJsonLd.js`. Canonical becomes `/jobs/${slug}`. |
| `src/core/SEO/Meta.jsx` | Update `og:locale` to `en_IN`. Update `theme-color` to brand color. Add OG image override prop for per-page customization. |
| `next.config.js` | Add `redirects()` for legacy `/[jobtitle]/[id]` → `/jobs/[slug]` (or alternatively keep the `getServerSideProps` shim approach if dynamic resolution is needed). Add image domains for any new v2 logo CDN. |
| `tailwind.config.js` | **Additive only** — `bg-cream` (#F7F4EF), `terracotta` color group. |
| `public/robots.txt` | Add `Disallow: /api/*`. |
| `src/pages/index.jsx` | Phase 5 — replace client-side redirect with a real homepage that lists 12 fresh v2 jobs (sponsored first). |

### Create

| File | Purpose |
|---|---|
| `src/core/apis/v2/client.js` | v2 API client (Phase 2). Note: the user-prompt suggested `lib/api/v2/client.js` — we deviate to match existing `src/core/apis/` convention. |
| `src/pages/jobs/[slug].js` | New job detail (Phase 3). |
| `src/pages/companies/index.js` | Companies listing (Phase 4). |
| `src/pages/companies/[slug].js` | Company detail (Phase 4). |
| `src/core/SEO/jobPostingJsonLd.js` | JobPosting schema builder (Phase 3). Returns null if any required Google field missing. |
| `src/core/SEO/organizationJsonLd.js` | Organization schema builder (Phase 4). |
| `src/pages/sitemap.xml.js` | Dynamic sitemap (Phase 6). |
| `migration/scripts/test-v2-client.js` | Smoke test script (Phase 2). |
| `migration/F2-summary.md` … `F-final-summary.md` | Per-phase summaries. |

### Install

| Package | Version | Why |
|---|---|---|
| `isomorphic-dompurify` | latest | Sanitize `jobDescription.html` before rendering. Currently NOT in `package.json`. |

---

## 9. Preserved features — confirmation

All five preserved areas exist in the current codebase and are isolated from the migration's blast radius:

| Feature | Routes / files | Migration touches? |
|---|---|---|
| `/toolkit/*` markdown blog | `src/pages/toolkit/index.jsx`, `src/pages/toolkit/[slug].jsx`, `src/lib/prompts.js`, `src/lib/categories.js`, `src/components/toolkit/*`, 15 `.md` files in `src/content/prompts/` | **No** — only the sitemap (Phase 6) reads `getAllPromptSlugs()`. |
| `/tools/linkedin-search` | `src/pages/tools/linkedin-search.js`, `src/components/LinkedInSearch/*` (13 files + hooks + lib) | **No.** |
| `/contact` | `src/pages/contact/index.jsx` (uses legacy `Header`/`Footer`) | **No.** |
| `/dmca` | `src/pages/dmca/index.jsx` | **No.** |
| `/privacy-policy` | `src/pages/privacy-policy/index.jsx` | **No.** |
| `/terms-and-conditions` | `src/pages/terms-and-conditions/index.jsx` | **No.** |
| `/career-pages` | `src/pages/career-pages/index.jsx` + `companycareerspage.json` + `src/widgets/CareerePages` | **No.** |
| AI prompt content | `src/content/prompts/*.md` (15 files) | **No.** |
| Common components | `src/components/Redesign/Navbar.jsx`, `FooterNew.jsx`, `src/components/common/Header/*`, `Footer/*`, `ErrorBoundary`, `ScrolltoTop`, `Loader`, `Notice` | **No.** |
| Redux DAS plumbing | `src/Redux/reducers/rootReducers/dasReducers.js`, action types, action creators | **No.** |

**Verification approach:** Phase 7 smoke checklist explicitly visits `/toolkit`, `/contact`, `/privacy-policy`, `/career-pages` after the migration to confirm no visual or behavioral regression.

---

## 10. Environment variables

All `process.env.NEXT_PUBLIC_*` referenced in the codebase:

1. `NEXT_PUBLIC_BACKEND_URL` — Railway API base URL (used in `src/core/backend.js`, `src/core/apis/request.js`, `src/core/apis/jobapicall.js`)
2. `NEXT_PUBLIC_SITE_URL` — Production site URL (used in `Meta.jsx`, `JobDetailMeta.jsx`, share helpers, toolkit pages)
3. `NEXT_PUBLIC_FIREBASE_API_KEY` … `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (7 vars for Firebase Analytics)

**No new env vars required for this migration.** If Phase 2 discovers v2 endpoints live on a different host, that becomes an env-var question.

---

## 11. HTML sanitization status

`isomorphic-dompurify` is **NOT installed**. Today, `JobDetailMeta.jsx::stripHtml()` is a regex strip used only for the JSON-LD `description` field. The detail page renders v1 HTML fields (`jobdesc`, `responsibility`, etc.) via the `ContentCard` component — likely with `html-react-parser` (already in `package.json` v5.2.0). Phase 3 must:

1. Install `isomorphic-dompurify`.
2. Sanitize `jobDescription.html` server-side (in `getStaticProps`) before passing to the page; this avoids shipping the sanitizer to the client.
3. Render sanitized HTML inside a `prose` container (Tailwind `@tailwindcss/typography` is NOT currently installed — flag if needed).

---

## 12. Existing structured data / JSON-LD

Single use in codebase: `JobPosting` in `src/core/SEO/JobDetailMeta.jsx:106–109`. **No other structured data types** (no Organization, no BreadcrumbList, no FAQPage). Phase 3 expands JobPosting; Phase 4 adds Organization. BreadcrumbList is already partially supported via `Breadcrumb` UI component but not emitted as JSON-LD — flagged as a Phase 6 nice-to-have.

---

## 13. Risks & open questions for Phase 2

1. **Backend public v2 endpoints unverified.** Phase 2 first action: `curl ${NEXT_PUBLIC_BACKEND_URL}/api/jobs/v2?limit=1`. If 404 or 401, **stop and report** — backend repo needs public endpoints added before this migration can proceed.
2. **Legacy `_id` → new slug resolution endpoint.** The 301 shim in Phase 3 needs `/api/jobs/v2/by-id/:id`. If absent, fallback options (in order):
   - Try `listJobsV2({ legacyId: id })` — assumes v2 docs preserve old `_id`.
   - Try matching `slug` against `generateSlugFromrole(title)` — only works if title slug stayed identical, which is unsafe.
   - Last resort: return 410 Gone (per user prompt §3 — never 404).
3. **Image CDN for v2 logos.** `next.config.js` allowlists only `res.cloudinary.com` and `i.ibb.co`. If v2 stores logos elsewhere, Phase 5 must add the new domain.
4. **Tailwind `prose` plugin.** `@tailwindcss/typography` is not installed. Phase 3 either adds it (preferred for rich JD HTML) or styles JD content with hand-rolled Tailwind utility classes.
5. **No tests exist.** Phase 7 verification is fully manual (smoke checklist + Lighthouse + Rich Results Test). User prompt says "Don't add tests unless asked" — respecting that.

---

## Phase 1 — DONE. Awaiting checkpoint.

Per the user's prompt: *"Begin with Phase 1 (Audit). Write the audit report to ./migration/F1-frontend-audit.md and stop. Don't write any application code in Phase 1. Wait for my 'go' before Phase 2."*

No application code was written. No files outside `migration/` were modified. Ready for review.
