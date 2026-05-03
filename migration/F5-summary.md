# F5 — Homepage + `/jobs` Listing + Cards Rewrite + `/companies` Listing

**Date:** 2026-05-03
**Status:** ✅ **COMPLETE**

---

## What shipped

### Files created
| Path | Purpose |
|---|---|
| `src/widgets/JobListV2/index.jsx` | New v2 listing widget. Reads filters from URL on mount, calls `listJobsV2`, supports load-more pagination, writes filter state back to URL via `replaceState`. Clean separation from the v1 `JobListRedesign` (kept around for reference, removed in Phase 7). |
| `src/components/Redesign/JobCardV2.jsx` | New v2 job card. Reads only v2 fields (`slug`, `title`, `companyName`, `company.logo`, `company.isVerified`, `employmentType[]`, `workMode`, `jobLocation`, `baseSalary`, `batch`, `requiredSkills`, `datePosted`, `sponsorship`). Whole card is a `<Link href="/jobs/${slug}">`. Shows up to 4 required skills. Sponsored/featured badge with terracotta tint. |
| `src/components/Redesign/FilterBarV2.jsx` | New filter bar with v2 query keys: `employmentType`, `workMode`, `batch`, `topicTags` (called "Category" in UI). Same UX as old FilterBar — dropdowns on desktop, horizontal scroll chips on mobile, applied-filter pills, clear-all. |
| `src/pages/companies/index.js` | Companies listing referenced by Phase 4 breadcrumb. Search, paginated grid, card-per-company, links to `/companies/[slug]`. |

### Files modified
| Path | Change |
|---|---|
| `src/pages/jobs/index.js` | Replaced `getJobListing` (v1) with `listJobsV2({ limit: 12, sort: "datePosted:desc" })`. Mounts `JobListV2` widget. New Meta with v2-aware copy. Canonical `https://careersat.tech/jobs`. ISR 600s. |
| `src/pages/index.jsx` | Switched from `useEffect(() => Router.push("/jobs"))` to a server-side 308 permanent redirect via `getServerSideProps`. Crawler-friendly, no flash of empty content, no JS bundle ships before the redirect. |

No other files modified. The legacy `src/widgets/JobListRedesign/index.jsx`, `src/components/Redesign/JobCardNew.jsx`, `src/components/Redesign/FilterBar.jsx`, `src/components/Redesign/JobDetail/SimilarJobsMini.jsx` are **kept untouched** for now — they'll be deleted in Phase 7 once we're confident nothing references them.

---

## Build output

```
Route (pages)                                         Size     First Load JS
ƒ /                                                              ← 308 → /jobs (server-side)
ƒ /[jobtitle]/[id]                                   666 B    97.3 kB    ← legacy 301/410 shim
● /jobs (ISR: 600s)                                  11.8 kB  170 kB     ← v2 listing
● /jobs/[slug] (ISR: 300s)                           20.3 kB  165 kB     ← Phase 3 detail
● /companies (ISR: 600s)                             3.88 kB  149 kB     ← NEW listing
● /companies/[slug] (ISR: 600s)                      6.3 kB   151 kB     ← Phase 4 detail
○ /toolkit, /toolkit/[slug]                                              ← preserved, untouched
○ /contact, /dmca, /privacy-policy, /terms-and-conditions                ← preserved
○ /tools, /tools/linkedin-search                                         ← preserved
○ /career-pages                                                          ← preserved
```

All preserved routes still build, no size or behavior change.

---

## Verification (live, port 3010)

| Path | Result |
|---|---|
| `GET /` | **308 Permanent Redirect** → `/jobs` (correct: was previously a JS-driven `Router.push`) |
| `GET /jobs` | 200, 71KB. Title "Tech jobs and internships for freshers in India \| CareersAt.Tech". Canonical `https://careersat.tech/jobs`. 8 v2 jobs in SSR HTML. v2 Cloudinary logos rendered. |
| `GET /jobs?employmentType=INTERN` | 200, 8 jobs in initial SSR (filters apply client-side after mount — no SSR pre-filter; Phase 6 may revisit if SEO of filtered URLs is desired) |
| `GET /companies` | 200, 91KB. Title "Companies hiring freshers in India \| CareersAt.Tech". Canonical `https://careersat.tech/companies`. 24 company cards in initial render. |
| `GET /companies/google` | 200 (Phase 4 regression check) |
| `GET /toolkit` | 200 (preserved) |
| `GET /tools/linkedin-search` | 200 (preserved) |
| `GET /privacy-policy` | 200 (preserved) |

---

## Design / implementation decisions

1. **Filters are client-only.** `JobListV2` reads filters from URL on mount and refetches via `listJobsV2`. Initial SSR HTML contains the unfiltered first page (12 jobs sorted by `datePosted:desc`). Filter URLs aren't pre-rendered at build time. **Tradeoff:** filter-shaped URLs (e.g. `/jobs?employmentType=INTERN`) work for users but don't ship as SEO-optimized SSR HTML. If we ever want indexed filter pages (e.g. `/jobs?topicTags=frontend`), we can switch to `getServerSideProps` for `/jobs` later, but that's a real perf regression for the much more common unfiltered case. Keeping it ISR + client-filtering for now matches the user prompt's preference.
2. **Shallow filter URL updates.** Filter changes call `window.history.replaceState` rather than `router.replace({}, { shallow: true })` to avoid triggering Next's route lifecycle. Page never refetches data via the router; only the explicit `fetchJobs()` call does. Simpler and faster.
3. **Filter mapping is intentional, not literal.** v1 had `jobtype`, `experience`, `location`, `batch`, `companyname`, `degree`, `query`. v2 takes `employmentType`, `workMode`, `topicTags` (category), `batch`, `company`, `search`. **`location` and `experience` are dropped from the visible filter bar** — they're harder to model server-side (location is a free-text city; experience is a `{min,max}` range), and both are visually shown in the cards. If users ask, we can add a "Location" search later that maps to `?search=<city>` server-side.
4. **`JobCardV2` is a single Link element**, not a button + onClick. Better accessibility, real prefetch, real right-click "open in new tab", real cmd-click. The legacy `JobCardNew.jsx` used `Router.push` inside `onClick` — won't do that here.
5. **`/companies` listing is mobile-first**: 1 column under `md`, 2 columns under `lg`, 3 columns at `lg+`. Search + load-more, no filter bar (industry/companyType filters can come in Phase 6 if needed; the user prompt doesn't require it).
6. **Homepage is server-side redirect** (`getServerSideProps`). 308 instead of 301 because Next's API uses `permanent: true` which means 308 by default — Google treats 308 and 301 identically. Eliminates the flash + JS hop.
7. **`Hero` and `LogoWall` and `SidebarNew`** are reused unmodified — they don't depend on v1/v2 schemas. The popular-filter buttons in Hero map to v2 keys via `handlePopularFilter` (e.g. clicking "Internships" sets `employmentType=INTERN`).

---

## Known issues carried forward

1. **Initial SSR HTML doesn't reflect URL filters.** A user landing on `/jobs?employmentType=INTERN` from a backlink sees the unfiltered 12 jobs render first, then a flash to the filtered list once JS runs. Acceptable for v1 of the migration; Phase 6 or later can convert to SSR-with-filters if needed.
2. **`topicTags` filter values are guesses.** The v2 schema allows arbitrary strings (`frontend`, `backend`, `data-engineering`, `software`, etc.). The 8 jobs currently in v2 use values like `software`, `frontend`, `data-engineering`. The filter dropdown enumerates a hardcoded list — if backend introduces new tags, the dropdown won't auto-update. Worth replacing with a `topicTags` count/aggregation endpoint at some point; out of scope for Phase 5.
3. **Companies search doesn't paginate within the search results properly** if `?search=` is set in URL on initial mount — the SSR-fetched first page is the unsearched first page, and the client refetches with `search` after mount. Tiny flash. Same fix path as #1 above.
4. **No `BreadcrumbList` JSON-LD** — visible breadcrumbs exist on detail pages, structured data deferred to Phase 6.
5. **Carry-forward from F4**: backend `recentJobs` and `?company=slug` filter both return empty for Google despite having 3 published jobs. Frontend handles gracefully but a real product launch needs this fixed on backend.

---

## Phase 5 — DONE. Awaiting checkpoint for Phase 6.

Reply **"go"** to start Phase 6 (sitemap + robots + canonical + OG defaults).
