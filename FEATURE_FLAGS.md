# Feature Flags — Design-Ready, Backend-Pending

Tracks UI elements that exist in code but are hidden behind flags in
`src/Helpers/featureFlags.js` because the backing feature isn't built yet.

When the backend / data / flow ships, flip the corresponding flag to `true`.
Do not delete the UI code — flip the flag.

| Flag | What's hidden | What's missing | Where |
|------|---------------|----------------|-------|
| `HEADER_NAV` | Top-nav links: Jobs · Companies · Salaries · Resources · Drops | `/salaries`, `/resources`, `/drops` routes don't exist. Companies + Jobs work but nav grouping waits until full set ready. | `src/components/layout/Header.jsx` |
| `HEADER_AUTH` | "Sign in" link | No auth system. No accounts. No saved-jobs sync. | `src/components/layout/Header.jsx` |
| `HEADER_POST_JOB` | "Post a role · ₹4,800" CTA | No employer dashboard, no payment flow, no posting form, no Razorpay/Stripe wiring. | `src/components/layout/Header.jsx` |
| `HERO_STATS` | Hero right-column cards: Open right now · Internships · Remote · New grad · Avg time-to-offer · Companies hiring | Numbers are hard-coded mocks. Need stats API endpoint with real aggregates. | `src/components/jobs/Hero.jsx` |
| `FILTER_SORT` | Sort segment (Latest · Salary · Deadline) | API supports `sort=datePosted:desc` only. Salary + Deadline sort fields not in v2 backend yet. | `src/components/jobs/FilterBar.jsx` |
| `TRENDING_BAND` | Bottom-of-page trending strip ("What everyone is looking at right now") | Search-term aggregates, click-tracking, and trend ranking endpoint not built. Currently hard-coded chips. | `src/widgets/JobList/index.jsx`, `src/components/jobs/TrendingBand.jsx` |
| `SIDEBAR_TRENDING` | Right-rail "Trending now" list | Same — needs trending-roles aggregation endpoint. Currently hard-coded list. | `src/widgets/JobList/index.jsx`, `src/components/jobs/sidebar/TrendingNow.jsx` |
| `SIDEBAR_PROFILE_MATCH` | Right-rail "Your match" / Rohan K. donut card | No user accounts, no profile, no skill tagging, no match scoring. Mock data only. | `src/widgets/JobList/index.jsx`, `src/components/jobs/sidebar/ProfileMatch.jsx` |
| `SIDEBAR_SAVED` | Right-rail "Saved" jobs list | Save state lives in local React state only. No persistence (localStorage/Redux/account sync). | `src/widgets/JobList/index.jsx`, `src/components/jobs/sidebar/SavedJobs.jsx` |
| `SIDEBAR_RESOURCES` | Right-rail "Free resources" links | Curated resources list not finalized. Some target pages (interview kits, salary data) don't exist yet. | `src/widgets/JobList/index.jsx`, `src/components/jobs/sidebar/Resources.jsx` |

## How to re-enable

1. Build the backend / data / flow.
2. Open `src/Helpers/featureFlags.js`.
3. Flip the relevant flag from `false` to `true`.
4. Delete the row from this table.
5. Once **all** flags for a component are flipped, remove the `FLAGS` import + gating from that component.

## Add a new flag

```js
// src/Helpers/featureFlags.js
export const FLAGS = {
    ...,
    NEW_FLAG: false, // What it gates + why hidden
};
```

Then add a row above with: flag name, what's hidden, what's missing, file paths.
