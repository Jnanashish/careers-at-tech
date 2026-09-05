# CareersAt.Tech — Claude Code Instructions

## Project Overview

CareersAt.Tech is India's curated job board for freshers and early-career tech professionals. It surfaces verified internships and full-time roles at major tech companies. Target audience: Indian tech freshers (20–25 yrs), primarily mobile-first. Built by @Jnanashish.

## Tech Stack

- **Framework:** Next.js 14.2 (Pages Router, NOT App Router)
- **Language:** JavaScript (JSX) — no TypeScript
- **Styling:** Tailwind CSS 3.4 + SCSS modules (legacy only)
- **Animations:** Framer Motion 12
- **State:** Local component state (`useState`/`useEffect`) + URL query params. **No Redux** in `src/` — the `@reduxjs/toolkit`/`react-redux`/`redux`/`redux-persist`/`redux-thunk` entries in `package.json` are unused legacy and can be removed.
- **Icons:** Lucide React (primary), FontAwesome (legacy — still in toolkit/legacy header)
- **Analytics:** Firebase Analytics (GA4), Microsoft Clarity, PostHog (product analytics + session replay + experiments), Vercel Speed Insights
- **Backend:** Railway-hosted API (`NEXT_PUBLIC_BACKEND_URL`), consumed via `core/apis/v2/client.js`
- **Images:** Cloudinary, ibb.co (via `next/image`, allowlisted in `next.config.js` `images.remotePatterns`)
- **Fonts:** Inter (primary body), Instrument Serif, JetBrains Mono, Fraunces — all via `next/font/google` in `_app.js`; **Geist + Geist Mono** via `<link>` in `_document.js` (not yet in `next/font`). Loaded once each; do not re-add render-blocking `@import`s.

## Repo Structure

```
src/
├── pages/                      # Next.js Pages Router
│   ├── _app.js                 # next/font setup, global viewport <Head>, Clarity, SpeedInsights, SPA page_view
│   ├── _document.js            # HTML shell, charset, AdSense + Geist font <link>
│   ├── jobs/index.js           # Job listing page (SSG + ISR) — renders widgets/JobList
│   ├── jobs/[slug].js          # Job detail (SSG + ISR, fallback "blocking") — JSON-LD, JD-E variant
│   ├── [jobtitle]/[id].js      # Legacy 301→/jobs/:slug redirect shim (else 410 Gone)
│   ├── companies/index.js      # Company directory (SSG + ISR)
│   ├── companies/[slug].js     # Company detail (SSG + ISR)
│   ├── resume-prompts/         # Resume-prompt toolkit (index.jsx + [slug].jsx)
│   ├── tools/                  # tools/index.js + tools/linkedin-search.js
│   ├── career-pages/           # Career guides (+ companycareerspage.json)
│   ├── sitemap.xml.js          # Dynamic sitemap (getServerSideProps, CDN-cached 10min)
│   ├── api/indexnow.js         # Token-auth IndexNow push; backend calls on job publish/delete
│   └── contact/, dmca/, privacy-policy/, terms-and-conditions/
├── components/
│   ├── Redesign/               # Active V3 components (Navbar, FooterNew, JobDetail/, Tools/, ScrollToTop)
│   ├── jobs/                   # Job-listing UI (Hero, FilterBar, JobCard, Pagination, sidebar/)
│   ├── toolkit/                # Resume-prompt UI (PromptCard, TailorModal, CopyButton, …)
│   ├── LinkedInSearch/         # LinkedIn URL builder tool UI
│   ├── common/                 # Header, Footer, ErrorBoundary (legacy; used by legal pages)
│   ├── layout/                 # Header used by the JobList widget
│   └── ui/                     # Logo, Pill, SelectChip
├── widgets/
│   ├── JobList/                # ACTIVE job-listing controller (filters, URL sync, data fetch)
│   └── CareerPages/            # Career-pages widget
├── core/
│   ├── apis/v2/client.js       # v2 backend client (listJobsV2, fetchJobV2BySlug, track*, companies*)
│   ├── SEO/
│   │   ├── Meta.jsx            # Generic <Head> (title/desc/canonical/OG/Twitter); self-referential canonical
│   │   ├── JsonLd.jsx          # <script type="application/ld+json"> wrapper
│   │   ├── jobPostingJsonLd.js # Google-compliant JobPosting builder (returns null if ineligible)
│   │   ├── breadcrumbJsonLd.js # BreadcrumbList builder
│   │   ├── serializeJsonLd.js  # Script-safe JSON-LD serializer (escapes < > & U+2028/9)
│   │   ├── constants.js        # SITE_URL / DEFAULT_OG_IMAGE / SITE_NAME
│   │   ├── organizationJsonLd.js # Organization builder
│   │   └── indexnow.js         # IndexNow submit helper (Bing/Yandex; Google not supported)
│   ├── firebaseConfig.js       # Firebase init (app only)
│   ├── eventHandler.js         # Event fan-out: GA4 (firebase) + PostHog; trackPageView is GA4-only
│   ├── posthog.js              # PostHog init (dynamic import, idle), capture/identify/onFeatureFlags
│   └── useFeatureVariant.js    # useFeatureVariant / useFeatureEnabled hooks for experiments
├── Helpers/                    # utils.js, featureFlags.js, jobV2helpers.js
├── lib/                        # categories.js, prompts.js, stripHtml.js (resume-prompt content)
├── content/prompts/            # Markdown prompt content (sitemap + resume-prompts source)
├── styles/globals.css          # Tailwind directives + V3/cat design tokens (no @font-face / @import)
├── scss/, *.module.scss        # Legacy SCSS — frozen, do not extend
└── static/Image/               # SVG logos and icons
```

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm start            # Start production server
npm run lint         # ESLint (next/core-web-vitals)
```

## Code Conventions

### File & Naming
- **Components:** PascalCase filenames (`JobCardNew.jsx`, `FilterBar.jsx`)
- **Helpers/utils:** camelCase (`jobdetailshelper.js`, `eventHandler.js`)
- **Variables/functions:** camelCase
- **Event handlers:** `handle` prefix (`handleClick`, `handleApply`)
- **Folders:** PascalCase for component dirs, camelCase for utility dirs

### Imports
- Always use `@/*` path alias (maps to `src/*`) — never `../../`
- Order: React/Next → external libs → internal (core, Helpers, components)

### Component Pattern
```jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SomeIcon } from "lucide-react";
import Link from "next/link";

const shouldAnimate = typeof window !== "undefined"
  ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : true;

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  const handleAction = () => { /* ... */ };

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-card p-6 shadow-card"
    >
      {/* content */}
    </motion.div>
  );
};

export default ComponentName;
```

### Page Pattern (SSG + ISR)
```jsx
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data }, revalidate: 600 };
}

export async function getStaticPaths() {
  const items = await getItems();
  return {
    paths: items.slice(0, 30).map(i => ({ params: { id: i.id } })),
    fallback: true,
  };
}

const Page = ({ data }) => (
  <>
    <Meta title="..." description="..." />
    <Navbar />
    <main className="bg-page min-h-screen">
      {/* content */}
    </main>
    <FooterNew />
  </>
);

export default Page;
```

### API Calls
- Use the typed-ish v2 client `@/core/apis/v2/client.js` — exported functions:
  `listJobsV2`, `fetchJobV2BySlug`, `fetchAllPublishedJobSlugs`, `fetchSlugByLegacyId`,
  `listCompaniesV2`, `fetchCompanyV2BySlug`, `fetchAllActiveCompanySlugs`,
  `trackJobView`, `trackJobApplyClick`. All public, unauthenticated reads.
- Native `fetch` only (no axios). The client returns `null` on 404 and `{ data: [], … }`
  on list-miss — **always null-check / default**.
- Backend URL from `process.env.NEXT_PUBLIC_BACKEND_URL` (`API_BASE` in the client).
- Data fetched in `getStaticProps` (ISR) — never SSR a data page. Errors are caught so
  the page still builds with empty data when the backend is unreachable.

### State Management
- **Local only:** `useState` / `useEffect` per component; cross-cutting list state lives in
  the `widgets/JobList` controller and is mirrored to the URL query string (shareable filters).
- **No Redux, no Context** for app state. Don't reintroduce a global store unless asked —
  the redux deps in `package.json` are dead and should be pruned, not used.

## Styling Rules

- Use Tailwind utility classes directly in `className` — never create new CSS files
- SCSS modules (`.module.scss`) exist in legacy code; do not create new ones
- Use semantic Tailwind tokens from `tailwind.config.js`: `bg-page`, `text-primary`, `shadow-card`, `rounded-card`, etc.
- Never use `#FFFFFF` for page backgrounds — use `bg-page` (#F9FAFB)
- Badge colors are predefined: `badge-remote-bg/text`, `badge-internship-bg/text`, etc.
- Custom font sizes: `text-hero`, `text-page-title`, `text-section-header`, `text-card-title`, `text-body`, `text-small`, `text-caption`

## Design System

**Before any UI change, design update, or visual improvement — you MUST read `DESIGN_SYSTEM.md` first.** It is the single source of truth for all visual decisions: colors, spacing, typography, shadows, radii, component patterns, and badge styles. Do not guess or improvise — look it up.

- Every color, font size, spacing value, shadow, and radius is defined there
- Badge styles (job type, location, pricing) have exact bg/text color pairs — use them
- Button variants (primary, ghost, secondary, danger, WhatsApp) are specified with exact styles
- Form inputs: 44px height, specific focus ring, specific border colors
- Cards: 12px radius, 24px padding, defined hover elevation
- Loading states: spinner replaces button text, skeleton for content
- Disabled state: `opacity-50`, never a color change
- Max line width: 65ch for body text, 40ch for card descriptions
- All font sizes use rem units for accessibility

If `DESIGN_SYSTEM.md` doesn't cover a case, match the closest existing pattern. When in doubt, ask — don't invent new visual patterns.

## Do / Don't Rules

### Do
- Read `DESIGN_SYSTEM.md` before any UI work — always
- Respect `prefers-reduced-motion` — check `shouldAnimate` before applying Framer Motion
- Use `next/image` for all images with Cloudinary/ibb.co domains
- Use ISR (`revalidate: 600`) for data pages — never SSR
- Add JSON-LD structured data for job detail pages (see `JobDetailMeta.jsx`)
- Keep touch targets minimum 44×44px for mobile
- Use `next/link` for all internal navigation with prefetch
- Track user actions via `eventHandler.js` Firebase events

### Don't
- Don't use App Router patterns — this is Pages Router
- Don't install axios — use the `fetch`-based `core/apis/v2/client.js`
- Don't add render-blocking font loads (`@import` in CSS or extra Google `<link>`s) — fonts
  go through `next/font` in `_app.js` (Geist is the one `<link>` exception in `_document.js`)
- Don't use inline styles in new components — Tailwind classes only (the `widgets/JobList`
  V3 inline-style/`style jsx` blocks are existing; don't copy the pattern into new code)
- Don't use pure black (`#000`) for text — use `text-primary` (#111827)
- Don't reintroduce Redux / a global store, or add unused fonts/deps
- Don't use `reactStrictMode` patterns — it's disabled in next.config

## Performance & Web Vitals

- **Images:** Always specify `width`, `height`, `loading="lazy"` on non-LCP images; use `priority` on LCP image
- **Fonts:** loaded via `next/font/google` in `_app.js` with `display: swap` and only the weights Tailwind actually maps (Inter 400–700). Geist/Geist Mono come from one `<link>` in `_document.js`. Before adding a font family or weight, confirm a Tailwind token references it — unused families were already pruned
- **Code splitting:** Use `React.lazy()` + `<Suspense>` for heavy below-fold components
- **Animations:** Keep Framer Motion transitions under 300ms; disable on `prefers-reduced-motion`
- **SSG/ISR:** Pre-generate top 30 pages in `getStaticPaths`, use `fallback: true` with skeleton loading for the rest
- **Bundle:** Don't add heavy dependencies — check bundle impact before installing

## SEO Guidelines

- Every page needs a `<Meta>` component with unique `title` and `description`
- Job detail pages must include JSON-LD `JobPosting` structured data
- Use semantic HTML: `<main>`, `<article>`, `<nav>`, `<section>` with proper heading hierarchy
- URL slugs generated via `generateSlugFromrole()` — keep URLs clean and descriptive
- Add `<Breadcrumb>` on detail pages for navigation context + rich results
- Canonical URLs on all pages to avoid duplicate content

## Analytics & Experiments

Three tools, deliberately non-overlapping — don't "consolidate" them without asking:

| Tool | Owns | Entry point |
|------|------|-------------|
| GA4 (Firebase) | Acquisition, SEO/Search Console reporting, pageviews | `core/eventHandler.js` |
| Microsoft Clarity | Heatmaps, rage-click, unmetered replay | inline script in `_app.js` |
| PostHog | Funnels, feature adoption, retention, event-linked replay, A/B tests | `core/posthog.js` |

Rules:

- **Custom events:** keep calling `firebaseEventHandler(name, props)`. It fans out to GA4 **and** PostHog. Don't call `posthogCapture` directly unless the event is deliberately PostHog-only.
- **Pageviews:** `trackPageView` is GA4-only on purpose. posthog-js captures `$pageview` itself via `capture_pageview: "history_change"` — mirroring it would double-count every SPA navigation.
- **Bundle:** posthog-js is ~80KB gzipped and must stay out of the shared `_app` chunk. It is behind a dynamic `import()` fired on `requestIdleCallback` — do not convert `core/posthog.js` to a static import, and do not add `@posthog/react` (its provider needs a client at first render, which drags the SDK into the shared chunk).
- **Reverse proxy:** ingestion is served from `/ingest/*` via `rewrites()` in `next.config.js`, which is why `skipTrailingSlashRedirect: true` is set. That traffic counts against Vercel Fast Data Transfer — session replay is the bulk of it.
- **Free-tier guards** in `posthog.js`: replay `sampleRate: 0.2`, `capture_pageleave/dead_clicks/heatmaps` off, surveys disabled, `person_profiles: "identified_only"`. Loosen these only with the 1M events / 5K recordings per month ceilings in mind.

### Two kinds of flags — don't mix them

- `Helpers/featureFlags.js` (`FLAGS`) = **build-time** gates for UI whose backend isn't built yet. Static, no rollout, no measurement. See `FEATURE_FLAGS.md`.
- PostHog flags via `core/useFeatureVariant.js` = **runtime** gates for experiments and staged rollouts.

```jsx
import { useFeatureVariant } from "@/core/useFeatureVariant";

const { variant, loaded } = useFeatureVariant("jd-apply-cta-test", "control");

// Render the control until flags resolve — the SDK loads at idle, so an
// unguarded swap on above-the-fold UI flickers on a visitor's first pageview.
return loaded && variant === "test" ? <NewCta /> : <ControlCta />;
```

Reading a flag emits `$feature_flag_called`, which is how PostHog counts exposure — call the hook where the variant is actually rendered, not in a parent that mounts for everyone.

## Environment Variables

All prefixed with `NEXT_PUBLIC_` (client-side accessible):

```
NEXT_PUBLIC_BACKEND_URL       # Railway API base URL
NEXT_PUBLIC_SITE_URL          # Production site URL (https://careersat.tech)
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
NEXT_PUBLIC_POSTHOG_KEY        # phc_… project API key (public client-side token)
NEXT_PUBLIC_POSTHOG_HOST       # "/ingest" — the reverse-proxy path, not the PostHog domain
NEXT_PUBLIC_POSTHOG_ALLOW_LOCALHOST  # optional; "true" lets localhost send data
```

PostHog no-ops entirely when `NEXT_PUBLIC_POSTHOG_KEY` is empty, and skips localhost
unless `NEXT_PUBLIC_POSTHOG_ALLOW_LOCALHOST=true`.

Server-only (no `NEXT_PUBLIC_` prefix — these are secrets and must never reach the
client bundle). Both are read only by `pages/api/indexnow.js` / `core/SEO/indexnow.js`:

```
INDEXNOW_KEY                  # Must equal the basename of public/<key>.txt, else submissions 403
INDEXNOW_SUBMIT_TOKEN         # Bearer token the backend sends to POST /api/indexnow
```

## Config Files

- `tailwind.config.js` — Extended theme with semantic tokens (colors, fonts, shadows, radii, animations)
- `next.config.js` — Image hosts via `images.remotePatterns` (Cloudinary, ibb.co) with
  `formats: avif/webp`; `/toolkit*`→`/resume-prompts*` and `/`→`/jobs` 308 redirects;
  site-wide security headers (`headers()`); `poweredByHeader: false`; strict mode disabled.
  **There is no `pages/index.jsx`** — `/` is redirected at the routing layer, not by a
  `getServerSideProps` shim, so the homepage costs no function invocation
- `jsconfig.json` — Path alias `@/*` → `./src/*`
- `.eslintrc.json` — Extends `next/core-web-vitals`

## Known Gotchas

- **DESIGN_SYSTEM.md mentions App Router and TypeScript** — ignore that, the actual codebase uses Pages Router and plain JavaScript
- **Fallback pages** need skeleton loading — `jobs/[slug]` uses `fallback: "blocking"`; any `fallback: true` page must handle `router.isFallback`
- **Firebase config** is in `core/firebaseConfig.js` using v9+ modular SDK — don't use v8 compat imports. Analytics inits lazily behind `isSupported()` in `eventHandler.js`
- **Image hosts** are allowlisted in `next.config.js` via `images.remotePatterns` (not the deprecated `images.domains`) — add a new source there before using `next/image` with it
- **The v2 client returns `null` on 404 / `{ data: [] }` on list-miss** — always null-check / default API responses
- **`components/Temp/`, `widgets/JobListRedesign/`, `Redux/`, `components/Banners|Drawer|Dropdown|Input|Loader|Pagination|navHeader/`, `Helpers/config.js`, `Helpers/socialmediahandler.js`, `core/eventAttributes.js`, `core/shareJobs.js` no longer exist** — older docs/comments may still reference them; the active listing controller is `widgets/JobList`
- **No TypeScript** — don't create `.ts`/`.tsx` files; use `.js`/`.jsx` with JSDoc if types are needed
- **`Meta.jsx` canonical** defaults to the current route (self-referential). Still pass an explicit `canonical`/`title`/`description` on every page for unique metadata

## Performance & SEO — Tech Debt / Backlog

Larger cleanups identified but intentionally deferred (each needs its own scoped,
tested change — don't bundle them into unrelated work):

1. **Firebase major upgrade** — `firebase@10` pulls `@firebase/database` →
   `faye-websocket` → `websocket-driver`, which carries a critical advisory. Nothing
   in `src/` imports `firebase/database`, so it never reaches the client bundle, but
   `npm audit` stays red until `firebase@12`. Needs an analytics smoke test.
2. **Two monospace fonts** — Geist Mono (`font-v3-mono`, via `<link>`) and JetBrains Mono
   (`font-jetbrains`, via `next/font`) are both heavily used. Consolidate to one to drop a
   whole font family from the network.
3. **FontAwesome alongside Lucide** — `@fortawesome/*` is still imported by ~13 files
   (`components/toolkit/*`, legacy `common/Header`). Migrate to Lucide and drop the three
   `@fortawesome/*` deps. `TailorModal` is now code-split so its FA cost is off the critical
   job-detail path, but the deps still ship elsewhere.
4. **Multiple Header implementations** — `Redesign/Navbar`, `layout/Header`, `common/Header`,
   `navHeader`. New pages use `Redesign/Navbar`; legal/contact pages still use the legacy
   `common/Header` + `Footer` + SCSS modules. Consolidate when those pages are next touched.
5. **AdSense `<script async>`** is injected eagerly in `_document.js`. Consider moving to
   `next/script` with `strategy="lazyOnload"` to cut main-thread cost on first paint
   (revenue-adjacent — weigh against ad-fill timing before changing).
