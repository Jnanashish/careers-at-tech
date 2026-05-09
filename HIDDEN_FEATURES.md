# Hidden Features — Pending API Integration

Items hidden from the Job Detail page on 2026-05-09. Currently powered by mock/pseudo data
(`pseudoViewCount`, `matchScoreFor`, hard-coded "4 days", "2 min ago"). Restore once the
backend exposes real values.

Search marker in code: `HIDDEN_FOR_API_INTEGRATION`

## Hidden items

| # | Item | File | Restore by |
|---|------|------|------------|
| 1 | Match section (donut + score card) | `src/components/Redesign/JobDetail/JDE/JDEHero.jsx` | Need real match-score API tied to user profile / saved skills. |
| 2 | Breadcrumbs (Home / Jobs / Company / Title) | `src/components/Redesign/JobDetail/JDE/JDEHero.jsx` | Pure UI — restore freely or wire to canonical breadcrumb component. |
| 3 | Applicants count (hero meta strip) | `src/components/Redesign/JobDetail/JDE/JDEHero.jsx` | Need real applicant count from backend. |
| 4 | "Live · updated 2 min ago" indicator | `src/components/Redesign/JobDetail/JDE/JDEHero.jsx` | Need real `lastUpdatedAt` field; format relative. |
| 5 | "Accepting" status pill (apply card default state) | `src/components/Redesign/JobDetail/JDE/JDEApplyCard.jsx` | Need real application-window status (open / accepting / paused). |
| 6 | Avg response time ("4 days") in apply card footer | `src/components/Redesign/JobDetail/JDE/JDEApplyCard.jsx` | Need company-level avg-response metric. |
| 7 | Applicants count in apply card footer | `src/components/Redesign/JobDetail/JDE/JDEApplyCard.jsx` | Same backend field as #3. |
| 8 | Resume Toolkit section (right rail + mobile) | `src/components/Redesign/JobDetail/JDE/index.jsx`, `JDERightRail.jsx` | Restore when toolkit content/links are finalized. |
| 9 | Activity section (right rail + mobile) | `src/components/Redesign/JobDetail/JDE/index.jsx`, `JDERightRail.jsx` | Need real applicants / avg-response / posted / status fields. |
| 10 | "Spotted an issue?" report link (right rail + mobile) | `src/components/Redesign/JobDetail/JDE/index.jsx`, `JDERightRail.jsx` | Restore when feedback/report flow is decided. |
| 11 | About Company section | `src/components/Redesign/JobDetail/JDE/index.jsx` | Need real company description / HQ / founded / employee-count fields populated. |

## How to restore

```bash
grep -rn "HIDDEN_FOR_API_INTEGRATION" src/
```

Each hidden block is wrapped in a JSX comment `{/* HIDDEN_FOR_API_INTEGRATION ... */}` or
guarded by a `false` literal with that marker. Remove the wrapper / flip the guard once the
corresponding backend field is live.
