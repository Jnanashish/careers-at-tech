# careers-at-tech

A Next.js-based job aggregation platform focused on tech careers. This repository powers a web application that lists, filters, and showcases job openings across technology companies, along with supporting content and career tooling.

## What this repo handles

This repo is the right place to pick up tasks related to:

### Job listings & discovery
- Browsing, searching, and filtering tech job postings (`src/pages/jobs`, `src/widgets/JobList`)
- Individual job detail pages with dynamic routing by job title (`src/pages/[jobtitle]`)
- Job cards, pagination, "show more" behavior, and "similar jobs" surfaces (`src/components/Jobcard`, `src/components/Pagination`, `src/components/Similarjob`)
- "No jobs found" empty states and loading skeletons (`src/components/NojobFound`, `src/components/Loader`)

### Company career pages
- Curated list of company-specific careers pages (`src/pages/career-pages`, including `companycareerspage.json`)

### Toolkit / content hub
- Markdown-driven articles and guides parsed with `gray-matter` and rendered via `react-markdown` (`src/pages/toolkit`, `src/content`, `src/lib/blog-api.js`)
- Category taxonomy and HTML sanitization for user-facing content (`src/lib/categories.js`, `isomorphic-dompurify`)

### Tools for job seekers
- LinkedIn search helper and similar utilities (`src/pages/tools/linkedin-search.js`, `src/components/LinkedInSearch`)
- Prompt library for AI-assisted career workflows (`src/content/prompts`, `src/lib/prompts.js`)

### Static pages
- Contact, DMCA, Privacy Policy, Terms & Conditions (`src/pages/contact`, `src/pages/dmca`, `src/pages/privacy-policy`, `src/pages/terms-and-conditions`)

### Shared UI & navigation
- Header, footer, nav header, sidebar, drawer, dropdowns, inputs, banners (including a WhatsApp banner) (`src/components/common`, `src/components/navHeader`, `src/components/Sidebar`, `src/components/Drawer`, `src/components/Dropdown`, `src/components/Input`, `src/components/Banners`)

### State, data & infra
- Redux Toolkit store with `redux-persist`, thunks, reducers, action types, and services (`src/Redux`)
- Firebase integration for backend services (`firebase` dependency, `src/Redux/service`)
- SEO metadata component (`src/core/SEO/Meta.jsx`)
- Helpers for job listing/details fetching (`src/Helpers/jobdetailshelper`)
- Styling via Tailwind CSS + SCSS modules (`tailwind.config.js`, `src/scss`, `*.module.scss`)
- Next.js static generation with ISR (`revalidate`) for job pages

## When to route tasks here

Pick this repo for any task involving:
- The careers-at-tech website UI, pages, routing, or SEO
- Job listing data flow, filtering, or presentation
- Toolkit/blog-style markdown content and its rendering pipeline
- Redux state, Firebase-backed services, or Next.js build/config changes
- Styling (Tailwind/SCSS), shared components, or static legal pages

## Tech stack

- **Framework:** Next.js 14 (Pages Router), React 18
- **State:** Redux Toolkit, redux-persist, redux-thunk
- **Backend:** Firebase
- **Styling:** Tailwind CSS, SCSS modules, `@tailwindcss/typography`
- **Content:** `gray-matter`, `react-markdown`, `html-react-parser`, `isomorphic-dompurify`
- **UI extras:** FontAwesome icons, `react-modal`, `react-modern-drawer`, `react-loading-skeleton`, `timeago.js`

## Getting started

```bash
npm run dev
# or yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. The root route redirects to `/jobs`.

### Scripts

- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm start` – serve the production build
- `npm run lint` – run ESLint (`eslint-config-next`)
