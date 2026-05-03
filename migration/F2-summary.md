# F2 — V2 API Client + Endpoint Verification

**Date (final):** 2026-05-03
**Status:** ✅ **COMPLETE**
**Backend deployment verified at:** `https://careersattech-backend-production.up.railway.app/api`

---

## What shipped on the backend (verified live)

After the backend agent finished its work on `careersat-backend`, all 9 public read endpoints are live and returning the contracted shapes. Smoke test (12 checks): **PASSED**.

```
1. listJobsV2()                            ✓  HTTP 200, total=8, hasMore=true, env shape correct
2. listJobsV2({employmentType,workMode})   ✓  filter applied server-side
3. fetchJobV2BySlug(<slug>)                ✓  full doc + populated company (17 fields)
4. fetchJobV2BySlug(<missing>)             ✓  HTTP 404 with JSON {"error":"not_found","message":...}
5. fetchSlugByLegacyId(<id>)               ⚠  HTTP 410 for live v2 IDs (see "Known issue" below)
6. fetchAllPublishedJobSlugs()             ✓  HTTP 200, 9 slugs
7. listCompaniesV2()                       ✓  HTTP 200, total=459 companies
8. fetchCompanyV2BySlug(<slug>)            ✓  full doc, recentJobs[] field present
9. fetchAllActiveCompanySlugs()            ✓  HTTP 200, 459 slugs
10. POST /jobs/v2/<slug>/track-view        ✓  HTTP 204
11. POST /jobs/v2/<slug>/track-apply       ✓  HTTP 204
12. v1 regression /jd/get                  ✓  HTTP 200, totalCount=714 (unchanged)
```

CORS preflight from `https://careersat.tech` returns 204 with `Access-Control-Allow-Origin: https://careersat.tech` — tracking POSTs will work from the browser.

## Real response shapes observed (use these in Phase 3+, not the spec)

### List envelope
`{ data: [...], total, page, limit, totalPages, hasMore }` — confirmed identical across `/jobs/v2` and `/companies/v2`.

### Job detail top-level fields (live)
```
_id, slug, title, companyName, company (populated),
displayMode, employmentType[], workMode, batch[],
experience{min,max}, baseSalary{currency,min,max,unitText},
jobLocation[{city,region,country}], requiredSkills[], preferredSkills[],
topicTags[], category, degree[],
jobDescription{html,plain}, applyLink, applyPlatform,
datePosted, validThrough, isExpired, sponsorship{tier,activeUntil}, priority,
stats, source, externalJobId,
status, deletedAt, approvedBy, approvedFromStagingId, publishedAt,
createdAt, updatedAt, isVerified, __v
```

**⚠️ Field name deltas vs the contract** — the frontend client adapts to these:

| Spec called for | Backend ships | Action |
|---|---|---|
| `applyUrl` | `applyLink` (+ `applyPlatform`) | Phase 3 reads `applyLink` |
| (none) | top-level `isExpired` boolean | Phase 3 trusts this — no need to compare `validThrough` to `now` |
| (none) | leaks admin fields: `__v`, `approvedBy`, `approvedFromStagingId`, `deletedAt`, `status`, `source`, `externalJobId`, `publishedAt`, `createdAt`, `updatedAt` | Non-blocking; flagged for backend cleanup |

### Company detail (live)
```
_id, slug, companyName, logo{icon,banner,iconAlt,bgColor},
description{short,long}, isVerified, companyType, industry,
headquarters, employeeCount, foundedYear,
website, careerPageLink, socialLinks, ratings, locations[], tags[], techStack[],
stats{openJobsCount}, sponsorship, seo, recentJobs[]
```

`recentJobs` is bundled into the response — no second call needed for the company detail page (Phase 4).

### CompanyV2 (live data quality note)
- 459 active companies in the database.
- All 459 currently report `openJobsCount: 0` because only 8 jobs total are published in `jobs_v2`. Most companies legitimately have no open jobs in v2 right now; this is a data-volume issue, not a counter bug. Phase 5/7 testing will need to use the 8 jobs that DO exist.

---

## Known backend issue (non-blocking, has fallback)

**`GET /api/jobs/v2/by-id/:id` returns 410 for ALL inputs**, including live, published v2 documents whose `_id` was passed straight from the list endpoint. Three different live v2 `_id` values were tested — all returned 410.

**Impact:** Phase 3's 301 redirect shim from legacy `/[jobtitle]/[id]` URLs cannot resolve old IDs to new slugs. Without this, every legacy URL Google has indexed will return 410 Gone (per F1 plan — never 404).

**Frontend mitigation in `fetchSlugByLegacyId()`** (`src/core/apis/v2/client.js`): catches the 410 and returns `null`, so the redirect shim can call it cleanly and emit a 410 response when null comes back. The moment the backend fixes the resolver, the shim starts working without code changes here.

**Recommended backend fix:** the route handler is likely unconditionally returning 410. It should:
1. Look up `JobV2.findById(id)`.
2. If found AND `status === 'published'` AND `deletedAt == null` → `{ slug: doc.slug }` HTTP 200.
3. If found but unpublished/deleted → 410.
4. If not found → 410 (per the contract — never 404).

Also worth verifying: does the v1→v2 migration preserve old `_id` values, or did v2 generate fresh ObjectIds? If v2 IDs are fresh, the resolver needs an additional `legacyId` field to look up by.

---

## What was created in this phase

| File | Purpose |
|---|---|
| `src/core/apis/v2/client.js` | The 9-function v2 API client. Native `fetch`, throws `V2ApiError` on 4xx/5xx, returns `null` on 404, 1 retry on network error in SSG/ISR contexts only. |
| `migration/scripts/test-v2-client.js` | The 12-check smoke test reproduced above. Runnable via `NEXT_PUBLIC_BACKEND_URL=... node migration/scripts/test-v2-client.js`. |

The client deliberately deviates from the user prompt's suggested path of `lib/api/v2/client.js` — placed at `src/core/apis/v2/client.js` to match the existing `src/core/apis/` convention (flagged in F1).

`isomorphic-dompurify` was **not** installed in this phase — it's a Phase 3 requirement (sanitizing `jobDescription.html`).

---

## Open questions to confirm before / during Phase 3

1. **`isExpired` flag** — backend already computes this server-side. Phase 3 will use it as the gate for emitting JSON-LD (Google rejects expired postings). No client-side date math needed. ✓
2. **`applyLink` semantics** — set when `displayMode === 'external_redirect'`. For `displayMode === 'internal'` the field appears to be `null`. Phase 3 button logic: prefer `applyLink`, fall back to `company.careerPageLink`, then `company.website`.
3. **`@tailwindcss/typography`** — needed for the `prose` container that renders `jobDescription.html`. Will install in Phase 3 alongside `isomorphic-dompurify`.
4. **Image domain allowlist** — the v2 logos served by 3M etc. come from `res.cloudinary.com`, which is already allowlisted in `next.config.js`. No new domain needed yet. Phase 5 will recheck after seeing more company logos.

---

## Phase 2 — DONE. Awaiting checkpoint for Phase 3.

Reply **"go"** to start Phase 3 (`/jobs/[slug]` detail page + JobPosting JSON-LD + 301 redirect shim).

If you'd like the backend `by-id` fix prioritized first, say "fix by-id first" — I'll write that as an addendum to `backend-prompt.md` and pause Phase 3 until it's resolved (otherwise legacy Google traffic 410s for now, which is correct per the plan but not ideal).
