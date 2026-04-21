# CareersAt.Tech — Claude Code Instructions

## Project Overview

CareersAt.Tech is India's curated job board for freshers and early-career tech professionals. It surfaces verified internships and full-time roles at major tech companies. Target audience: Indian tech freshers (20–25 yrs), primarily mobile-first. Built by @Jnanashish.

## Tech Stack

- **Framework:** Next.js 14.2 (Pages Router, NOT App Router)
- **Language:** JavaScript (JSX) — no TypeScript
- **Styling:** Tailwind CSS 3.4 + SCSS modules (legacy only)
- **Animations:** Framer Motion 12
- **State:** Redux Toolkit + Redux Persist (localStorage)
- **Icons:** Lucide React (primary), FontAwesome (legacy)
- **Analytics:** Firebase Analytics, Microsoft Clarity
- **Backend:** Railway-hosted API (`NEXT_PUBLIC_BACKEND_URL`)
- **Images:** Cloudinary, ibb.co (via next/image)
- **Fonts:** Inter (primary), Instrument Serif, DM Sans

## Repo Structure

```
src/
├── pages/                    # Next.js Pages Router
│   ├── _app.js               # Redux provider, fonts, global wrappers
│   ├── _document.js          # HTML shell, GA/Clarity scripts
│   ├── index.jsx              # Redirects to /jobs
│   ├── jobs/index.js          # Job listing (SSG + ISR)
│   ├── [jobtitle]/[id].js    # Job detail (SSG + ISR, fallback: true)
│   ├── tools/                 # Tools/resources pages
│   ├── career-pages/          # Career guides
│   └── contact/, privacy-policy/, terms-and-conditions/, dmca/
├── components/
│   ├── Redesign/              # Active components (Navbar, Hero, FilterBar, JobCardNew, etc.)
│   │   ├── JobDetail/         # Job detail sub-components
│   │   └── Tools/             # Tools page components
│   ├── common/                # Header, Footer, ErrorBoundary
│   └── Temp/                  # Deprecated — do not use
├── widgets/                   # Page-level composite components
│   ├── JobListRedesign/       # Active job listing controller
│   └── JobList/               # Deprecated — do not use
├── Redux/
│   ├── store.js               # RTK configureStore + persist
│   ├── reducers/              # Root reducer + feature reducers
│   ├── actions/               # Action creators
│   └── actionTypes/           # Action type constants
├── core/
│   ├── apis/
│   │   ├── request.js         # fetch wrappers (getHelper, postHelper, etc.)
│   │   ├── apiEndpoints.js    # API path constants
│   │   └── jobapicall.js      # Job-specific API functions
│   ├── SEO/
│   │   ├── meta.js            # Generic <Head> meta component
│   │   └── JobDetailMeta.jsx  # Job-specific SEO + JSON-LD
│   ├── firebaseConfig.js      # Firebase init
│   ├── eventHandler.js        # Analytics event helpers
│   └── backend.js             # API base URL
├── Helpers/                   # Utility functions (utils.js, config.js, etc.)
├── styles/globals.css         # Tailwind directives + global resets
└── static/Image/              # SVG logos and icons
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
- Use `getHelper()` / `postHelper()` from `@/core/apis/request.js` — native fetch wrappers
- Endpoints defined in `@/core/apis/apiEndpoints.js`
- Backend URL from `process.env.NEXT_PUBLIC_BACKEND_URL`

### State Management
- **Global:** Redux Toolkit (`configureStore`) with `redux-persist` for localStorage
- **Local:** `useState` / `useEffect` hooks (most component state)
- **No context API** — use Redux for shared state

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
- Don't import from `components/Temp/` or `widgets/JobList/` — they're deprecated
- Don't install axios — use the native fetch wrappers in `request.js`
- Don't use inline styles — always Tailwind classes
- Don't use pure black (`#000`) for text — use `text-primary` (#111827)
- Don't add new Redux reducers without integrating with `redux-persist`
- Don't use `reactStrictMode` patterns — it's disabled in next.config

## Performance & Web Vitals

- **Images:** Always specify `width`, `height`, `loading="lazy"` on non-LCP images; use `priority` on LCP image
- **Fonts:** Inter loaded via `next/font/google` with `display: swap` — don't add new font loads without subsetting
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
```

## Config Files

- `tailwind.config.js` — Extended theme with semantic tokens (colors, fonts, shadows, radii, animations)
- `next.config.js` — Image domains (Cloudinary, ibb.co), strict mode disabled
- `jsconfig.json` — Path alias `@/*` → `./src/*`
- `.eslintrc.json` — Extends `next/core-web-vitals`

## Known Gotchas

- **DESIGN_SYSTEM.md mentions App Router and TypeScript** — ignore that, the actual codebase uses Pages Router and plain JavaScript
- **`fallback: true` pages** need skeleton loading — always handle `router.isFallback` state
- **Firebase config** is in `core/firebaseConfig.js` using v9+ modular SDK — don't use v8 compat imports
- **Redux store** is wrapped with `redux-persist` — new reducers must be added to the persist config in `Redux/service/reduxPersist.js`
- **Image domains** are allowlisted in `next.config.js` — adding a new image source requires updating the config
- **`request.js` returns `null` on error** — always null-check API responses
- **The `Temp/` directory** contains deprecated ad system and social join components — don't reference or extend them
- **No TypeScript** — don't create `.ts`/`.tsx` files; use `.js`/`.jsx` with JSDoc if types are needed
