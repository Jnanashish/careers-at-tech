# TODO

## SEO — sitemap & indexing

### 1. Wire the backend to `/api/indexnow` (needed for the push path to do anything)

The route and key file ship in this repo but nothing calls them yet. IndexNow
covers Bing / Yandex / Seznam / Naver — Google does not participate.

- Set on Vercel (both Production and Preview):
  - `INDEXNOW_KEY=c65fb186075315376225bb3974133e1e` — must equal the basename of
    `public/c65fb186075315376225bb3974133e1e.txt`, or every submission 403s.
  - `INDEXNOW_SUBMIT_TOKEN=<generate a new random secret>` — shared with the backend.
- In the Railway backend, on job **publish**, **unpublish** and **delete**:

  ```
  POST https://careersat.tech/api/indexnow
  Authorization: Bearer $INDEXNOW_SUBMIT_TOKEN
  Content-Type: application/json

  {"slugs": ["<job-slug>"]}
  ```

  Fire and forget — the route never throws and a failed ping must not fail a publish.
  Deletes use the same call: IndexNow has no delete verb, so resubmitting the dead
  URL is how you ask for de-indexing.
- After the first deploy, confirm `https://careersat.tech/c65fb186075315376225bb3974133e1e.txt`
  returns the key as plain text, then send one real submission and check Bing
  Webmaster Tools → IndexNow for the accepted count. Not verified yet: the key file
  has to be live before any submission can pass validation.

### 2. Google Indexing API for job postings (the Google-side equivalent)

Google ignores IndexNow and retired sitemap ping in June 2023, so `<lastmod>` plus
crawl scheduling is currently the only Google signal. The Indexing API is the
exception and it explicitly supports `JobPosting` — one of only two allowed types.

- Needs a GCP service account + Search Console ownership verification.
- `URL_UPDATED` on publish, `URL_DELETED` on expire/delete.
- Default quota 200 URLs/day; current volume is well under that.
- Belongs in the backend next to the IndexNow call, for the same reason.

### 3. Static-page `lastmod` is hand-maintained

`STATIC_PAGES` in `src/pages/sitemap.xml.js` carries a literal `lastmod` per page,
seeded from `git log -1 --format=%cs`. Bump it when you meaningfully edit one of
those pages. Deliberately not wired to `new Date()` — a page that claims to change
daily but doesn't is what makes Google stop trusting lastmod site-wide.

### 4. Open decision: thin and expired URLs in the sitemap

Measured 2026-08-08 against production; both are still submitted for indexing.

- **426 of 827 company pages (52%) have zero live jobs** — 29% of the whole
  sitemap. `/companies/3m` is representative: `openJobsCount: 0`, no jobs, a
  327-char boilerplate blurb, and `companies/[slug].js:234` hardcodes
  `index, follow`. Candidate for dropping from the sitemap + `noindex`.
- **49 expired jobs are still listed.** `jobPostingJsonLd.js:80` correctly returns
  `null` for them so no invalid schema ships, but the pages return 200 with
  `index, follow`. Google's JobPosting guidance is to remove expired postings.

Deferred pending a call on whether these pages have standalone search value.
