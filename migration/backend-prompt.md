# Backend Prompt — Ship Public v2 Read Endpoints for `careersat-backend`

Paste this into a Claude Code session opened at the root of the **`careersat-backend`** repo. It's self-contained: it tells the agent the full context, the contract, the constraints, and how to verify.

---

## 1. Context

You are working in the **`careersat-backend`** repo — the Express/Node API that powers `careersat.tech` (a job portal for Indian tech freshers).

A frontend migration is in progress in a sibling repo (`careers-at-tech`). The frontend has been audited (see `migration/F1-frontend-audit.md` in that repo), and Phase 2 of the migration **just stopped at a verification gate** because the public v2 read endpoints it needs don't exist yet.

What's already shipped on this backend:
- ✅ v2 collections `jobs_v2` and `companies_v2` exist with full schemas.
- ✅ Admin v2 routes exist (e.g. `GET /api/admin/jobs/v2` returns 401 today — auth-gated).
- ✅ Old v1 routes still serve real traffic (`GET /api/jd/get` returns 200 with 714 jobs).
- ❌ **No public, unauthenticated v2 read endpoints exist.** Every shape probed (`/api/jobs/v2`, `/api/v2/jobs`, `/api/jobs`, etc.) returns 404.

Your job: **ship the public read endpoints listed in §3 below**, deploy them to `https://careersattech-backend-production.up.railway.app/api/...`, and verify each one with a curl. That's it. Do not touch admin routes, do not touch v1 routes, do not run a v1 → v2 data migration (already done).

Production URL of this backend: `https://careersattech-backend-production.up.railway.app/api`.

---

## 2. Hard rules

1. **Read-only public endpoints.** No writes from the public surface except two fire-and-forget tracking POSTs (no auth, rate-limited).
2. **Server-side filtering is mandatory.** The frontend will trust your response. Every list endpoint must enforce:
   - Jobs: `status === 'published'` AND `deletedAt == null`. Default also `validThrough >= now` (allow override via `?includeExpired=1`).
   - Companies: `status === 'active'` AND `deletedAt == null`.
3. **Slug-based identity, never `_id` in URLs.** The one exception is the legacy-redirect resolver `/api/jobs/v2/by-id/:id`.
4. **Lean populate.** On the job detail endpoint (`/api/jobs/v2/:slug`), populate the `company` ref but only with the public-safe fields (companyName, slug, logo, isVerified, companyType, website, industry). Don't leak admin fields, internal stats, or sponsorship internals.
5. **CORS** must allow `https://careersat.tech`, `https://www.careersat.tech`, all `*.vercel.app` previews of the frontend repo, and `http://localhost:3000` for dev. Required for the two POST tracking endpoints.
6. **No new dependencies** unless required. Use the existing Express + Mongoose setup.
7. **Pagination shape — be consistent.** Every list endpoint returns the same envelope: `{ data: [...], total, page, limit, totalPages, hasMore }`. Pick this shape and stick to it across both `jobs` and `companies`.
8. **Error responses are JSON, not HTML.** 404 → `{ error: "not_found", message: "..." }`. 400 → `{ error: "bad_request", details: {...} }`. 410 → `{ error: "gone" }`. The frontend currently sees Express's default HTML 404 — fix that with a JSON 404 fallback at the end of the v2 router.
9. **Don't break v1.** All existing `/api/jd/*` routes keep working unchanged.

---

## 3. Endpoint contract

Implement exactly these 9 endpoints. Field names match the v2 schemas already in the codebase — verify against your `JobV2` and `CompanyV2` models.

### 3.1 `GET /api/jobs/v2`

**Query params (all optional):**
- `limit` (default 20, max 100)
- `page` (default 1, 1-indexed)
- `sort` (default `datePosted:desc`. Other accepted: `priority:desc`, `sponsorship:desc` — sponsorship sort means tier ranking: `sponsored > featured > none`, then `priority:desc`, then `datePosted:desc`)
- `batch` (number or comma-separated, e.g. `2025` or `2025,2026`) → matches if any value in `batch[]` array
- `employmentType` (single or comma-separated; values from the schema enum)
- `workMode` (`onsite` | `remote` | `hybrid`)
- `topicTags` (single or comma-separated) → ANY match
- `search` (free text → case-insensitive regex on `title` + `companyName`, or `$text` if you have a text index)
- `company` (company **slug**, not id) → resolve to `company` ObjectId, then filter
- `exclude` (job slug to exclude, used for "similar jobs" on detail page)
- `includeExpired` (`1` to disable the `validThrough >= now` filter)

**Response:**
```json
{
  "data": [
    {
      "_id": "...",
      "slug": "software-engineer-google-bangalore",
      "title": "Software Engineer",
      "companyName": "Google",
      "company": { "_id": "...", "slug": "google", "logo": { "icon": "...", "bgColor": "..." }, "isVerified": true },
      "displayMode": "internal",
      "employmentType": ["FULL_TIME"],
      "workMode": "hybrid",
      "batch": [2025, 2026],
      "experience": { "min": 0, "max": 2 },
      "baseSalary": { "currency": "INR", "min": 1200000, "max": 1800000, "unitText": "YEAR" },
      "jobLocation": [{ "city": "Bangalore", "region": "KA", "country": "IN" }],
      "requiredSkills": ["JavaScript", "React"],
      "topicTags": ["frontend"],
      "datePosted": "2026-04-19T11:31:53.051Z",
      "validThrough": "2026-06-19T11:31:53.051Z",
      "sponsorship": { "tier": "featured", "activeUntil": "..." },
      "priority": 5
    }
  ],
  "total": 487,
  "page": 1,
  "limit": 20,
  "totalPages": 25,
  "hasMore": true
}
```

**Don't include on list:** `jobDescription` (heavy HTML), `seo`, `stats`, `preferredSkills`, `degree`, `applyUrl`. Frontend gets these on the detail call.

### 3.2 `GET /api/jobs/v2/:slug`

Returns one job, **populated `company`** with the public-safe field set:
`companyName, slug, logo, description, isVerified, companyType, industry, website, careerPageLink, headquarters, foundedYear, employeeCount, ratings, socialLinks`.

If not found OR `status !== 'published'` OR `deletedAt != null` → **404 JSON**.

If `validThrough < now` → still return the document, but include `"isExpired": true` at the top level so the frontend can render an expired banner instead of the JSON-LD.

Include the full `jobDescription` object (`{ html, plain }`).

### 3.3 `GET /api/jobs/v2/by-id/:id`

Resolver for legacy 301 redirects. Takes the **old MongoDB `_id`** (which v2 docs preserve from the migration — verify in your migration code).

- Found, published, not deleted → `{ slug: "<new-slug>" }` with HTTP 200
- Found but unpublished/deleted → HTTP 410 `{ error: "gone" }`
- Not found at all → HTTP 410 `{ error: "gone" }` (NOT 404 — the user prompt for the frontend explicitly says never 404 here so Google sees the page is permanently gone, not temporarily missing)

If your v2 docs do NOT carry the old `_id` (i.e. the migration generated fresh ObjectIds), say so loudly in the response and skip this endpoint — the frontend will fall back to a different strategy.

### 3.4 `GET /api/jobs/v2/slugs`

Returns `{ slugs: ["...", "...", ...] }` — every published, non-deleted slug. Used by sitemap and `getStaticPaths`. No pagination (we expect <50k). Cache aggressively (5 min Redis or in-process LRU is fine).

### 3.5 `GET /api/companies/v2`

Same envelope as 3.1.

**Query params:**
- `limit`, `page`
- `search` (case-insensitive on `companyName`)
- `companyType` (single or comma-separated)
- `industry`
- `sort` (default `companyName:asc`)

**List response fields per company:**
`_id, slug, companyName, logo, description.short, isVerified, companyType, industry, headquarters, employeeCount, stats.openJobsCount, sponsorship.tier`.

### 3.6 `GET /api/companies/v2/:slug`

Returns one company. Include everything **public-safe** from the schema. Bundle in:
- `recentJobs`: array of up to 20 jobs from this company, in the same shape as 3.1's list items, sorted by `sponsorship` then `datePosted:desc`.
- `stats.openJobsCount`: live count, not denormalized stale value.

If not found OR `status !== 'active'` OR `deletedAt != null` → 404 JSON.

### 3.7 `GET /api/companies/v2/slugs`

`{ slugs: [...] }` of every active, non-deleted company. Same caching rules as 3.4.

### 3.8 `POST /api/jobs/v2/:slug/track-view`

Body: empty or `{ ref?: string }`. Behavior: increment `stats.pageViews` atomically (`$inc`). Returns **204 No Content**. Fire-and-forget — must never block.

Rate-limit: 10/min per IP per slug. On limit hit, still return 204 (silent drop).

### 3.9 `POST /api/jobs/v2/:slug/track-apply`

Same as 3.8 but increments `stats.applyClicks`.

---

## 4. Implementation guidance

1. **Find the existing v1 router** (likely `routes/jd.js` or similar). Mirror its structure for the new file `routes/v2/jobs.js` and `routes/v2/companies.js`. Wire them under `/api` with `app.use('/api/jobs/v2', publicJobsV2Router)` and `app.use('/api/companies/v2', publicCompaniesV2Router)`.
2. **Find the v2 admin router** (the one that returns 401 today). Reuse its query-building logic if cleanly extractable — but the public router must NOT inherit its auth middleware.
3. **Compose the published-only filter once.** Helper like `publishedJobsFilter(extra = {})` that returns `{ status: 'published', deletedAt: null, ...extra }`. Use it on every public jobs query without exception.
4. **Project lean fields on list endpoints.** Use Mongoose `.select()` to avoid shipping `jobDescription.html` on `/api/jobs/v2`. That HTML can be 50–200KB per doc.
5. **Index check.** Confirm these indexes exist on `jobs_v2`:
   - `{ slug: 1 }` unique
   - `{ status: 1, deletedAt: 1, datePosted: -1 }` compound (for the default list query)
   - `{ company: 1, status: 1, datePosted: -1 }` (for company detail's `recentJobs`)
   - `{ topicTags: 1 }` (for similar jobs)
   - Add any missing — without these, `/api/jobs/v2` will be slow at 714+ docs and worse as you scale.
6. **JSON 404 fallback.** At the bottom of each v2 router: `router.use((req, res) => res.status(404).json({ error: 'not_found' }))`. Without this, Express returns the HTML page that broke our frontend probe.
7. **CORS.** Use the existing `cors` middleware if present; add the origins listed in §2 rule 5. Allowing `*` is acceptable for read-only GETs but the POSTs need a real allowlist.
8. **Tracking POSTs.** Don't await the DB write on the request path. Pattern:
   ```js
   router.post('/:slug/track-view', rateLimit, (req, res) => {
     res.status(204).end();
     JobV2.updateOne({ slug: req.params.slug, status: 'published', deletedAt: null }, { $inc: { 'stats.pageViews': 1 } })
       .catch(err => logger.warn('track-view failed', { slug: req.params.slug, err }));
   });
   ```

---

## 5. Verification (do this before saying you're done)

After deploying, run each of these from a shell that can reach the production URL. Every line must match the expected outcome.

```bash
BASE="https://careersattech-backend-production.up.railway.app/api"

# 5.1 Public list returns 200 with the expected envelope
curl -sS "$BASE/jobs/v2?limit=2" | jq '{total, hasMore, sample: .data[0] | {slug, companyName, displayMode, status: (has("status"))}}'
# Expect: total > 0, hasMore boolean, sample.slug present, sample.status absent (we projected it out)

# 5.2 List filters work
curl -sS "$BASE/jobs/v2?employmentType=INTERN&workMode=remote&limit=1" -w "\nHTTP %{http_code}\n"
# Expect: HTTP 200, all returned docs match the filter

# 5.3 Detail returns populated company
SLUG=$(curl -sS "$BASE/jobs/v2?limit=1" | jq -r '.data[0].slug')
curl -sS "$BASE/jobs/v2/$SLUG" | jq '{slug, companyName, hasDescription: (.jobDescription.html | length > 0), companyPopulated: (.company.slug | type == "string"), validThrough}'
# Expect: companyPopulated == true, validThrough is a date string

# 5.4 Detail 404 is JSON, not HTML
curl -sS -w "\nHTTP %{http_code}\n" "$BASE/jobs/v2/this-slug-does-not-exist-xyz"
# Expect: HTTP 404 with body {"error":"not_found",...}

# 5.5 By-id resolver
ID=$(curl -sS "$BASE/jd/get?page=1&size=1" | jq -r '.data[0]._id')
curl -sS "$BASE/jobs/v2/by-id/$ID" -w "\nHTTP %{http_code}\n"
# Expect: HTTP 200 {"slug":"..."}  OR  HTTP 410 {"error":"gone"} if v2 docs don't preserve old _id

# 5.6 Slugs endpoint
curl -sS "$BASE/jobs/v2/slugs" | jq '{count: (.slugs | length), sample: .slugs[0:3]}'
# Expect: count > 0

# 5.7 Companies list + detail
curl -sS "$BASE/companies/v2?limit=2" | jq '{total, sample: .data[0] | {slug, companyName, openJobs: .stats.openJobsCount}}'
CSLUG=$(curl -sS "$BASE/companies/v2?limit=1" | jq -r '.data[0].slug')
curl -sS "$BASE/companies/v2/$CSLUG" | jq '{slug, companyName, recentJobsCount: (.recentJobs | length), openJobsCount: .stats.openJobsCount}'

# 5.8 Companies slugs
curl -sS "$BASE/companies/v2/slugs" | jq '{count: (.slugs | length)}'

# 5.9 Tracking endpoints return 204 silently
SLUG=$(curl -sS "$BASE/jobs/v2?limit=1" | jq -r '.data[0].slug')
curl -sS -X POST -w "HTTP %{http_code}\n" "$BASE/jobs/v2/$SLUG/track-view"
curl -sS -X POST -w "HTTP %{http_code}\n" "$BASE/jobs/v2/$SLUG/track-apply"
# Expect: both HTTP 204, empty body

# 5.10 CORS preflight from frontend origin
curl -sS -X OPTIONS "$BASE/jobs/v2/some-slug/track-view" \
  -H "Origin: https://careersat.tech" \
  -H "Access-Control-Request-Method: POST" \
  -i | head -20
# Expect: Access-Control-Allow-Origin reflects careersat.tech

# 5.11 v1 still works (regression check)
curl -sS "$BASE/jd/get?page=1&size=1" | jq '.totalCount'
# Expect: same number as before your changes (714 at time of writing)
```

---

## 6. Deliverables

When you're done:

1. All 9 endpoints live on production at `https://careersattech-backend-production.up.railway.app/api/...`.
2. Every command in §5 returns the expected output. Paste the actual outputs into a comment on the deploy PR or into a `BACKEND-V2-PUBLIC-VERIFICATION.md` in the repo.
3. A short note on **two questions** the frontend agent has:
   - Do v2 docs preserve old `_id` from the v1→v2 migration? (Determines whether §3.3 is implementable as designed.)
   - Is the `recentJobs` bundling in §3.6 cheap enough, or should the frontend make a second `listJobsV2({ company })` call instead?
4. Tell the user: "Backend v2 public endpoints are live. The frontend repo can resume Phase 2."

---

## 7. What you are NOT doing

- Not changing v1 routes.
- Not changing admin v2 routes.
- Not running data migrations.
- Not adding auth, rate limiting beyond §3.8/§3.9, or business logic the frontend hasn't asked for.
- Not deleting old code.
- Not committing or merging unless the user asks — present the diff and let them review.

Start by reading the current router structure and the v2 admin router, then implement. Report back when §5 verification passes end-to-end.
