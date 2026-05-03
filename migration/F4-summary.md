# F4 — `/companies/[slug]` Detail + Organization JSON-LD

**Date:** 2026-05-03
**Status:** ✅ **COMPLETE**

---

## What shipped

### Files created
| Path | Purpose |
|---|---|
| `src/pages/companies/[slug].js` | New v2 company detail page. SSG + ISR (`fallback: "blocking"`, `revalidate: 600`). Hero with banner image (or `bgColor` block), about section, open-roles grid, tech stack, locations, social links sidebar, employee ratings. |
| `src/core/SEO/organizationJsonLd.js` | Pure builder for the Organization structured-data object. Returns `null` if `name`, `url`, or `logo` missing — strict gate to avoid emitting thin schemas. |

No existing files modified. All preserved features untouched.

---

## Build output

```
Route (pages)                                  Size     First Load JS
├ ● /companies/[slug] (ISR: 600 Seconds)      5.32 kB   151 kB
│   ├ /companies/atlassian (2070 ms)
│   ├ /companies/jade-global (1738 ms)
│   ├ /companies/symphonyai (1629 ms)
│   ├ /companies/unisys, hitachi, zupee, paypal ...
```

24 of the top 30 active company slugs pre-rendered at build time (`fallback: "blocking"` handles the remaining 435 on-demand). Build clean — no new lint errors.

---

## Verification (`/companies/google`)

### Organization JSON-LD payload (live)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Google",
  "url": "https://www.google.com",
  "logo": "https://res.cloudinary.com/dvc6fw5as/image/upload/v1730290043/g5e7lae8hildgwxkfmbc.png",
  "description": "American multinational technology company behind Google Search, Android, YouTube, and Google Cloud, with major engineering centres in India.",
  "foundedDate": "1998-01-01",
  "sameAs": [
    "https://www.linkedin.com/company/google",
    "https://www.glassdoor.com/Reviews/Google-Reviews-E9079.htm"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mountain View, California, USA"
  }
}
```

All required Organization fields present (`name`, `url`, `logo`). `sameAs` correctly omits null `twitter`/`instagram` entries. `address`, `foundedDate`, and `description` populated when present.

### HTTP results

- `/companies/google` → 200, 32585 bytes
- `/companies/this-company-does-not-exist` → 404
- Title from `seo.metaTitle`: "Google Careers — Hiring Freshers | CareersAt.Tech" ✓
- Canonical: `https://careersat.tech/companies/google` ✓

### Visible content (text-extracted)

```
Companies › Google
Google · Product · consumer internet
HQ: Mountain View, California, USA · Employees: 5000+ · Founded: 1998

About Google
Google is an American multinational technology company specialising in
internet-related services and products. Its portfolio includes the Google
Search engine, online advertising, the Android mobile operating system, the
Chrome browser, Google Cloud, YouTube ... [1357-char description]
```

Hero, breadcrumb, stats row, About section all render correctly. Logo displayed on `bgColor: "#F7F4EF"` swatch (cream — matches the new brand palette by coincidence; a deliberate design alignment).

### Sidebar

- "Website" link → external open
- "Careers page" CTA in terracotta brand color → external open
- Social pills: `LI` (LinkedIn) + `GD` (Glassdoor) — Twitter/Instagram correctly omitted as null
- Employee ratings: Glassdoor 4.4 with star icon

---

## Design / implementation decisions

1. **`recentJobs` fallback strategy.** Backend is supposed to bundle `recentJobs[]` on the detail response, but for Google (which has 3 published jobs in v2), the field comes back as `[]`. As a fallback, the page calls `listJobsV2({ company: slug, limit: 20, sort: "datePosted:desc" })` from `getStaticProps` when `recentJobs` is empty. **Both endpoints currently return 0 jobs for Google** — flagged as a backend join issue (see "Known issues" below). Page renders the empty-state correctly with a "Check Google's careers page" CTA.
2. **`buildOrganizationJsonLd` is strict** — returns null without `name`, `url`, AND `logo`. Companies with sparse data don't emit thin schema. ~half of the 459 companies will emit Organization schema; the rest just rely on standard meta.
3. **Brand icons replaced with text codes.** `lucide-react@1.7.0` (the locked version on this project) does NOT export brand icons (`Linkedin`, `Twitter`, `Instagram`). Using "LI", "TW", "IG", "GD" text labels in 40×40 round buttons — consistent with the existing Glassdoor pattern in this codebase. Upgrading lucide-react isn't worth doing in this migration.
4. **Hero treatment.** When `logo.banner` is present, render as a 32–48px-tall background image with the `logo.icon` as a 96×96 chip overlapping the bottom edge (`-mt-12 shadow-card`). When banner is absent, the chip sits flat in the cream background. Avoids the "broken hero" look.
5. **Job cards in the open-roles grid** are simplified vs the main `/jobs` listing — only show what's relevant for this company context (title, employment + work mode + location, salary). No company logo (it's redundant on the company page).
6. **No sponsorship treatment yet.** Companies with `sponsorship.tier !== 'none'` aren't visually emphasized — Phase 5 will add a "Featured" badge on the listing page, and Phase 4 can revisit if needed.
7. **`bg-cream` (#F7F4EF)** background applied to the entire main area — matches the brand palette set in Phase 3. Preserved pages still use `bg-page`.

---

## Known issues carried forward

1. **Backend `recentJobs` and the `?company=slug` filter both return empty for Google** despite Google having 3 published jobs in v2 (`google-software-engineer-ii-cevh3q`, `google-associate-product-manager-intern-nzyvss`, `google-ux-designer-y4scqa`). This is a backend join bug — the company FK on the job doc and the lookup on the company endpoint don't match, OR the `?company=slug` query isn't translating slug → ObjectId. Worth flagging back to backend; the frontend gracefully degrades with the "no open roles" empty state.
2. **Per-company logos vary in quality.** Some have empty `logo.banner` and `bgColor: "#F7F4EF"` (default fallback). Page handles these gracefully but the visual is plain. Data-quality issue.
3. **`/companies` listing page does not exist yet.** The breadcrumb and the 404-fallback both link to `/companies` which would currently 404. **This will be built in Phase 5** alongside the `/jobs` listing rewrite.

---

## Phase 4 — DONE. Awaiting checkpoint for Phase 5.

Reply **"go"** to start Phase 5 (homepage rewrite + `/jobs` listing v2 remap + JobCardNew/SimilarJobsMini v2 fields + `/companies` listing).
