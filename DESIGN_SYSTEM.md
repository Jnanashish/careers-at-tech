# CareersAt.Tech — Design System & Theme Guide

> **What this file is:** The single source of truth for every UI decision across CareersAt.Tech. Before building, modifying, or reviewing any page, component, or feature — read this file first. Every color, font size, spacing value, shadow, radius, animation, and component pattern is defined here. **Do not deviate.**

> **Last updated:** April 2026
> **Tech stack:** Next.js (App Router) · Tailwind CSS · Framer Motion · Lucide React · TypeScript

---

## 1. Brand Identity

**Platform:** CareersAt.Tech — India's curated job board for freshers and early-career tech professionals.
**Handle:** @careersattech (Instagram), @Jnanashish (builder)
**Audience:** Indian tech freshers (20–25 yrs), primarily mobile-first, searching for their first full-time role or internship.
**Design personality:** Clean, trustworthy, minimal, professional. Not playful, not corporate-cold — the sweet spot of "someone careful built this."
**One-line vibe:** A product freshers trust and bookmark, not a side-project they tolerate.

---

## 2. Color System

### 2.1 Core Palette

| Token                  | Hex       | Tailwind Class    | Usage                                      |
|------------------------|-----------|-------------------|---------------------------------------------|
| `--color-primary`      | `#2563EB` | `blue-600`        | CTAs, links, active states, focus rings     |
| `--color-primary-hover`| `#1D4ED8` | `blue-700`        | Button hover, link hover                    |
| `--color-primary-light`| `#EFF6FF` | `blue-50`         | Hover backgrounds, active filter bg, tints  |
| `--color-secondary`    | `#0D9488` | `teal-600`        | Success states, positive feedback, salary   |
| `--color-bg-page`      | `#F9FAFB` | `gray-50`         | Page background (every page)                |
| `--color-bg-card`      | `#FFFFFF` | `white`           | Card surfaces, modals, dropdowns            |
| `--color-text-primary` | `#111827` | `gray-900`        | Headings, job titles, important text        |
| `--color-text-secondary`| `#4B5563`| `gray-600`        | Company names, body copy, descriptions      |
| `--color-text-tertiary`| `#9CA3AF` | `gray-400`        | Timestamps, metadata, placeholder text      |
| `--color-border`       | `#E5E7EB` | `gray-200`        | Card borders, dividers, input borders       |
| `--color-border-light` | `#F3F4F6` | `gray-100`        | Internal dividers within cards              |

### 2.2 Semantic Colors

| Token                | Hex       | Usage                         |
|----------------------|-----------|-------------------------------|
| `--color-success`    | `#059669` | Green — verified, free, salary|
| `--color-warning`    | `#D97706` | Amber — freemium, hybrid      |
| `--color-danger`     | `#DC2626` | Red — paid, errors, report    |
| `--color-info`       | `#2563EB` | Blue — onsite, links          |

### 2.3 Badge / Pill Colors

Use these consistently across all pages for categorization pills:

| Badge Type      | Background  | Text        | Usage                     |
|-----------------|-------------|-------------|---------------------------|
| Remote          | `#ECFDF5`   | `#059669`   | Work arrangement          |
| Hybrid          | `#FEF3C7`   | `#D97706`   | Work arrangement          |
| Onsite          | `#EFF6FF`   | `#2563EB`   | Work arrangement          |
| Full-time       | `#F0FDF4`   | `#15803D`   | Job type                  |
| Internship      | `#F3E8FF`   | `#7C3AED`   | Job type                  |
| Free (pricing)  | `#ECFDF5`   | `#059669`   | Tool/resource pricing     |
| Freemium        | `#FEF3C7`   | `#D97706`   | Tool/resource pricing     |
| Paid            | `#FEE2E2`   | `#DC2626`   | Tool/resource pricing     |
| Editor's Pick   | `#FEF3C7`   | `#92400E`   | Featured/curated items    |
| New             | `#DBEAFE`   | `#1D4ED8`   | Recently added            |
| Verified        | `#ECFDF5`   | `#059669`   | Employer verification     |
| Neutral tag     | `#F3F4F6`   | `#374151`   | Skills, categories, meta  |

### 2.4 Footer / Dark Surfaces

| Token                   | Hex       | Usage                          |
|-------------------------|-----------|--------------------------------|
| `--color-footer-bg`     | `#111827` | Footer background, dark cards  |
| `--color-footer-text`   | `#D1D5DB` | Footer body text               |
| `--color-footer-heading`| `#FFFFFF` | Footer column headings         |
| `--color-footer-link`   | `#9CA3AF` | Footer link default            |
| `--color-footer-link-hover`| `#FFFFFF`| Footer link hover             |
| `--color-footer-divider`| `#374151` | Footer horizontal rules        |

### 2.5 Brand Colors (third-party)

| Brand      | Hex       | Usage                |
|------------|-----------|----------------------|
| WhatsApp   | `#25D366` | WhatsApp CTA buttons |
| LinkedIn   | `#0A66C2` | Referral links       |

### 2.6 Rules

- **Never use pure white (`#FFFFFF`) as a page background.** Always use `#F9FAFB`.
- Cards sit on `#FFFFFF` against the `#F9FAFB` page, creating natural contrast without heavy borders.
- **Maximum 2 badge colors per card** — overcrowding destroys hierarchy.
- All text must meet **WCAG AA** contrast (4.5:1 body, 3:1 large text) against its background.
- Do not introduce new colors without adding them to this file first.

---

## 3. Typography

### 3.1 Font Stack

```css
font-family: 'Inter', 'Noto Sans', system-ui, -apple-system, sans-serif;
```

- **Primary:** Inter Variable — load from Google Fonts as a variable font (~45KB single file)
- **Fallback:** Noto Sans — ensures Hindi/Devanagari script renders with compatible x-height
- **System fallback:** system-ui, -apple-system, sans-serif
- **Budget:** Total font payload must stay under **100KB**
- **Loading:** `font-display: swap`, preload weights 400 and 600

### 3.2 Type Scale (Minor Third — 1.200 ratio)

| Token          | Size           | Weight | Line Height | Tracking     | Usage                                      |
|----------------|----------------|--------|-------------|--------------|---------------------------------------------|
| `display`      | 48px (3rem)    | 700    | 1.1         | -0.025em     | Hero headlines only                         |
| `h1`           | 36px (2.25rem) | 700    | 1.2         | -0.02em      | Page titles                                 |
| `h2`           | 24px (1.5rem)  | 600    | 1.3         | normal       | Section headers                             |
| `h3`           | 20px (1.25rem) | 600    | 1.4         | normal       | Card titles, sidebar headings               |
| `body-lg`      | 18px (1.125rem)| 400    | 1.6         | normal       | Hero subheadlines, prominent body text      |
| `body`         | 16px (1rem)    | 400    | 1.6         | normal       | Default body text, descriptions, paragraphs |
| `body-sm`      | 15px (0.9375rem)| 500   | 1.5         | normal       | Metadata values, card secondary info        |
| `small`        | 14px (0.875rem)| 400    | 1.5         | normal       | Timestamps, helper text, links              |
| `caption`      | 12px (0.75rem) | 500    | 1.5         | 0.05em       | Uppercase labels, eyebrow text, badge text  |
| `micro`        | 10px (0.625rem)| 700    | 1.4         | 0.05em       | Tiny badges ("NEW"), notification counts    |

### 3.3 Rules

- **All sizing uses `rem` units** — respects user browser font settings for accessibility.
- Use `clamp()` for responsive headings: `font-size: clamp(1.875rem, 3.6vw, 3rem)` for display.
- **Maximum line width:** `65ch` for body text, `40ch` for card descriptions.
- **Heading hierarchy:** Every page must have exactly one `<h1>`. Sections use `<h2>`. Card titles use `<h3>`.
- **Weight usage:** 400 (body), 500 (metadata values, buttons), 600 (headings, card titles), 700 (hero, page titles only).
- Never use weight 300 (thin), 800, or 900 anywhere.
- `caption` token is **always uppercase** with letter-spacing `0.05em`.

---

## 4. Spacing System

### 4.1 Base Grid: 8px

**Every spacing value must be a multiple of 8.** Use 4px only as a half-unit for fine adjustments (icon-text gaps, badge padding).

### 4.2 Scale

| Token   | Value  | Usage Examples                                        |
|---------|--------|-------------------------------------------------------|
| `xxs`   | 4px    | Badge internal padding, icon-text micro-gap           |
| `xs`    | 8px    | Pill gaps, between related badges                     |
| `sm`    | 12px   | Between bullet items, tight card elements             |
| `md`    | 16px   | Card gaps, grid gaps, input padding                   |
| `lg`    | 24px   | Card internal padding, section component gaps         |
| `xl`    | 32px   | Between content blocks, card padding (large cards)    |
| `2xl`   | 48px   | Section vertical padding, hero bottom padding         |
| `3xl`   | 64px   | Between major page sections                           |
| `4xl`   | 96px   | Hero top padding, footer top padding                  |

### 4.3 Component Spacing

| Component              | Padding     | Gap Between      | Margin Bottom    |
|------------------------|-------------|-------------------|-----------------|
| Card (standard)        | 24px        | —                 | 16px            |
| Card (large/header)    | 32px        | —                 | 24px            |
| Badge/pill             | 4px 12px    | 8px between pills | —               |
| Button (standard)      | 12px 20px   | —                 | —               |
| Button (large)         | 14px 32px   | —                 | —               |
| Input field            | 12px 16px   | —                 | —               |
| Section                | 48px 0      | —                 | 64px            |
| Grid                   | —           | 16px              | —               |
| Filter bar             | 12px 0      | 8px between chips | —               |

### 4.4 Max Widths

| Element              | Max Width    |
|----------------------|-------------|
| Page content         | `1200px`    |
| Hero text block      | `680px`     |
| Hero subheadline     | `560px`     |
| Body paragraph       | `65ch`      |
| Card description     | `40ch`      |
| Centered CTA section | `480px`     |

---

## 5. Border Radius

| Token        | Value       | Usage                              |
|--------------|-------------|-------------------------------------|
| `rounded-sm` | `6px`       | Small inner elements, code blocks  |
| `rounded`    | `8px`       | Buttons, input fields, logos       |
| `rounded-lg` | `12px`      | Cards, modals, dropdown panels     |
| `rounded-xl` | `16px`      | Large hero cards, search bars      |
| `rounded-full`| `9999px`   | Badges, pills, avatars, chips      |

### Rules

- **Cards are always 12px radius.** No exceptions.
- **Badges/pills are always fully rounded** (`9999px`).
- **Buttons are 8px radius.**
- **Input fields are 8px radius** (or 12px for the hero search bar).
- Never use 0px (sharp corners) or 24px+ radius on cards.

---

## 6. Shadows & Elevation

| Token            | Value                                                               | Usage                     |
|------------------|---------------------------------------------------------------------|---------------------------|
| `shadow-sm`      | `0 1px 2px rgba(0,0,0,0.05)`                                       | Subtle: input fields      |
| `shadow`         | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)`          | Default: cards at rest    |
| `shadow-md`      | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)`          | Elevated: nav on scroll   |
| `shadow-lg`      | `0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)`       | Card hover, dropdowns     |
| `shadow-top`     | `0 -4px 12px rgba(0,0,0,0.08)`                                     | Sticky bottom bars        |
| `focus-ring`     | `0 0 0 3px rgba(37,99,235,0.15)`                                   | Input/button focus glow   |

### Rules

- Cards at rest use `shadow`. On hover, transition to `shadow-lg`.
- Nav starts borderless; on scroll, gains `shadow-md` + border-bottom.
- Never use `shadow-xl` or `shadow-2xl` — too heavy for this design system.
- All shadow transitions use `200ms ease`.

---

## 7. Buttons

### 7.1 Variants

| Variant        | Background     | Text        | Border               | Hover                                     |
|----------------|----------------|-------------|----------------------|--------------------------------------------|
| Primary        | `#2563EB`      | `#FFFFFF`   | none                 | `bg: #1D4ED8`, `shadow-sm → shadow-md`     |
| Ghost          | transparent    | `#2563EB`   | `1px solid #2563EB`  | `bg: #EFF6FF`                              |
| Secondary      | `#F3F4F6`      | `#374151`   | `1px solid #E5E7EB`  | `bg: #E5E7EB`                              |
| Danger         | transparent    | `#DC2626`   | `1px solid #FCA5A5`  | `bg: #FEE2E2`                              |
| WhatsApp       | `#25D366`      | `#FFFFFF`   | none                 | `bg: #20BD5A`                              |
| Text Link      | transparent    | `#2563EB`   | none                 | `underline`, `color: #1D4ED8`              |

### 7.2 Sizes

| Size    | Padding       | Font Size | Height  |
|---------|---------------|-----------|---------|
| Small   | `8px 16px`    | 14px/500  | 36px    |
| Default | `12px 20px`   | 14px/500  | 44px    |
| Large   | `14px 32px`   | 16px/600  | 48px    |

### 7.3 Rules

- **All buttons: 8px border-radius, `transition-all 200ms ease`.**
- Minimum touch target: `44x44px` on all devices.
- Icon + text buttons: 8px gap between icon and label, icon is 16px.
- **Never stack 2 primary buttons together.** Pair primary + ghost.
- Disabled state: `opacity-50 cursor-not-allowed` — no color change.
- Loading state: Replace label with spinner (16px, currentColor) + `opacity-80`.

---

## 8. Form Inputs

| Property        | Value                                               |
|-----------------|------------------------------------------------------|
| Height          | 44px (default), 48px (large/hero search)            |
| Padding         | 12px 16px                                            |
| Background      | `#FFFFFF`                                            |
| Border          | `1px solid #E5E7EB`                                  |
| Border radius   | 8px (default), 12px (hero search bar)                |
| Text            | 16px / 400 / `#111827`                               |
| Placeholder     | 16px / 400 / `#9CA3AF`                               |
| Focus           | `border-color: #2563EB` + `ring: 0 0 0 3px rgba(37,99,235,0.15)` |
| Error           | `border-color: #DC2626` + `ring: 0 0 0 3px rgba(220,38,38,0.15)` |
| Disabled        | `bg: #F9FAFB`, `opacity-60`, `cursor-not-allowed`   |
| Icon (left)     | 20px, `#9CA3AF`, 16px from left edge                |

---

## 9. Cards

Cards are the atomic unit of CareersAt.Tech. Every content block — job listings, tool listings, sidebar widgets, CTAs — is a card.

### 9.1 Standard Card

```
Background:     #FFFFFF
Border radius:  12px
Padding:        24px
Shadow:         shadow (see section 6)
Border:         none at rest (or 1px solid transparent)
Hover:          translateY(-2px) + shadow-lg + border-color: #E5E7EB
Transition:     all 200ms ease
```

### 9.2 Card Variants

| Variant         | Differences from standard                                        |
|-----------------|-------------------------------------------------------------------|
| Large card      | Padding: 32px, used for job detail header, hero cards            |
| Sidebar card    | Padding: 24px, sticky position, narrower                        |
| CTA card        | Background: `#EFF6FF` (primary light) or `#ECFDF5` (green tint) |
| Dark card       | Background: `#111827`, text: `#D1D5DB`, used sparingly          |
| Skeleton card   | Background: `#F3F4F6`, shimmer animation (see section 11)       |

### 9.3 Internal Card Anatomy

Every card follows this vertical order (skip layers that don't apply):

1. **Badge/ribbon** (top edge) — "Editor's Pick", "Featured", "NEW"
2. **Icon/Logo + Title row** — visual anchor, largest text in card
3. **Subtitle/meta** — company name, description, secondary info
4. **Pills/tags row** — color-coded badges, max 4 visible + "+N more"
5. **Data/details** — salary, location, metadata grid
6. **Divider** — `1px solid #F3F4F6`, margin `12px 0`
7. **Actions** — CTA button, save/share icons, links

---

## 10. Component Patterns

### 10.1 Badges / Pills

```
Padding:        4px 12px
Font:           12px / 500
Border radius:  9999px (full round)
Max per row:    4 visible + "+N more" overflow
Gap:            8px between pills
```

Color mapping: See section 2.3. Always use the specific bg + text color pairs — never mix.

### 10.2 Filter Chips (horizontal bar)

```
Padding:        8px 16px
Font:           14px / 500
Border radius:  9999px
Border:         1px solid #E5E7EB (default), 1px solid #2563EB (active)
Background:     white (default), #2563EB (active)
Text:           #4B5563 (default), #FFFFFF (active)
Hover:          border-color: #2563EB, text: #2563EB
Show count:     "(24)" in same color as chip text
```

- Sticky below nav on scroll (`top: 64px`, `z-index: 30`)
- Mobile: horizontal scroll, `overflow-x: auto`, edge fade mask gradient
- Clicking filters content **instantly** (no page reload)

### 10.3 Section Headers

```
Pattern:        Emoji + Title text
Font:           20px (h3) or 24px (h2) / 600 / #111827
Divider below:  2px solid #E5E7EB, margin 12px 0 20px 0
Optional:       Right-aligned action link ("View all ->" in 14px / #2563EB)
```

Use human-friendly names: "What You'll Do" not "Responsibilities", "Nice to Have" not "Preferred Skills".

### 10.4 Navigation Bar

```
Height:         64px (desktop), 56px (mobile)
Background:     white + border-bottom 1px #E5E7EB
On scroll:      Compact to 56px, add shadow-md, bg rgba(255,255,255,0.95) + backdrop-blur-md
Active link:    2px blue underline, offset 4px below text
Mobile:         Hamburger (right) + logo (left)
Z-index:        50
```

Structure: `[Logo] — [Find Jobs | Tools | Companies | Resources] — [Sign In (ghost) | Post a Job (primary)]`

### 10.5 Footer

```
Background:     #111827
Padding:        64px top, 48px bottom
Columns:        4 on desktop (Logo+desc | For Job Seekers | For Employers | Company)
Headings:       14px / 600 / uppercase / tracking 0.05em / #FFFFFF
Links:          14px / 400 / #9CA3AF / hover: #FFFFFF
Divider:        1px solid #374151
Social icons:   24x24, #9CA3AF, hover: brand colors
Bottom bar:     copyright line + social icons, separated by divider
Mobile:         Stack columns vertically, accordion expand
```

### 10.6 Mobile Sticky Bottom Bar

```
Position:       fixed, bottom: 0, left: 0, right: 0, z-index: 40
Height:         72px
Background:     white
Border top:     1px solid #E5E7EB
Shadow:         shadow-top (see section 6)
Content:        Left: meta text, Right: primary CTA button
Appears:        When main CTA scrolls out of viewport (Intersection Observer)
Animation:      translateY(100% -> 0), 250ms ease-out
Page padding:   Add padding-bottom: 80px to body when bar is visible
```

### 10.7 Skeleton Loading

```
Base color:     #F3F4F6
Shimmer:        linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)
Animation:      background-position slides left->right, 1.5s ease-in-out infinite
Border radius:  Match real content (text: 4px, cards: 12px, pills: 9999px)
Rule:           Skeleton dimensions must match real content to prevent layout shift
```

### 10.8 Toast Notifications

```
Position:       fixed, bottom: 24px (or above sticky bar), center-x
Background:     #111827
Text:           14px / 500 / #FFFFFF
Padding:        12px 20px
Border radius:  8px
Shadow:         shadow-lg
Animation:      fadeIn + translateY(8px -> 0), 200ms in, auto-dismiss after 2s, fadeOut 200ms
Z-index:        60
```

### 10.9 Dropdown Panels

```
Background:     #FFFFFF
Border:         1px solid #E5E7EB
Border radius:  12px
Shadow:         shadow-lg
Max height:     320px (overflow-y: auto with scrollbar)
Padding:        8px
Item padding:   10px 16px
Item hover:     bg: #F9FAFB, rounded-lg
Open animation: opacity 0->1 + translateY(-8px -> 0), 150ms ease
Close:          Click outside or Escape key
Z-index:        40
```

### 10.10 Empty States

```
Container:      Centered in content area, py-16
Icon:           48px emoji or Lucide icon, #9CA3AF
Title:          20px / 600 / #111827
Description:    14px / 400 / #6B7280, max-width 360px, centered
CTA:            Ghost button below (optional)
```

---

## 11. Animation System

### 11.1 Core Transitions

| Property         | Duration | Easing        | Usage                           |
|------------------|----------|---------------|---------------------------------|
| Colors/bg        | 150ms    | ease          | Links, buttons, badges          |
| Shadow/transform | 200ms    | ease          | Card hover, lift effects        |
| Opacity          | 200ms    | ease-out      | Fade in/out                     |
| Layout/position  | 250ms    | ease-out      | Sticky bars, slide-ins          |
| Page entrance    | 300-400ms| ease-out      | Hero, cards on load             |

### 11.2 Entrance Animations

| Element             | Animation                      | Timing                           |
|---------------------|--------------------------------|----------------------------------|
| Hero headline       | fadeIn + translateY(20px -> 0) | 300ms, on load                   |
| Hero subheadline    | fadeIn + translateY(20px -> 0) | 300ms, delay 150ms              |
| Hero search bar     | fadeIn + translateY(20px -> 0) | 300ms, delay 300ms              |
| Cards (page load)   | fadeIn + translateY(12px -> 0) | 200ms each, stagger 40ms       |
| Cards (scroll-in)   | fadeIn + translateY(16px -> 0) | 300ms, stagger 80ms, `whileInView` |
| Sidebar cards       | fadeIn + translateY(12px -> 0) | 300ms, on scroll-into-view      |
| Skill tags          | fadeIn + scale(0.9 -> 1)      | 150ms each, stagger 30ms       |
| Sticky bottom bar   | translateY(100% -> 0)         | 250ms ease-out                  |
| Dropdown open       | opacity + translateY(-8px -> 0)| 150ms ease                      |
| Toast               | opacity + translateY(8px -> 0) | 200ms in, 200ms out after 2s   |

### 11.3 Interaction Animations

| Interaction         | Animation                      | Duration  |
|---------------------|--------------------------------|-----------|
| Card hover          | translateY(-2px) + shadow-lg   | 200ms     |
| Bookmark click      | scale(1 -> 1.3 -> 1)          | 300ms     |
| Button press        | scale(1 -> 0.97 -> 1)         | 150ms     |
| Filter transition   | Fade out 100ms -> Fade in 200ms| stagger 30ms between cards |
| Link hover          | underline + color shift        | 150ms     |

### 11.4 Rules

- **All animations respect `prefers-reduced-motion: reduce`** — disable everything.
- Use Framer Motion `whileInView` for scroll-triggered animations, not page-load.
- Never animate more than `opacity` + `transform` simultaneously for performance.
- `will-change: transform` on cards that animate frequently.
- No animation should exceed **400ms** — anything longer feels sluggish.

---

## 12. Responsive Breakpoints

| Name      | Width        | Layout Changes                                                    |
|-----------|-------------|-------------------------------------------------------------------|
| Mobile    | `< 640px`   | 1-col, stacked cards, bottom sheets, hamburger nav, sticky bar   |
| Tablet    | `640-1024px` | 2-col grids, scrollable filter chips, condensed hero             |
| Desktop   | `> 1024px`  | Full layout, sidebar, 3-col grids, hover states, sticky sidebar  |

### Key Breakpoint Rules

- **Mobile-first:** Write base styles for mobile, use `sm:` `md:` `lg:` for larger screens.
- **Hero headline:** 48px desktop -> 36px tablet -> 30px mobile (use `clamp()`)
- **Cards:** Full-width mobile -> 2-col tablet -> 3-col desktop (tools) or 1-col + sidebar (jobs)
- **Filters:** Bottom sheet on mobile, horizontal scroll on tablet, full bar on desktop
- **Sidebar:** Visible only on `lg:` (1024px+). Content reflows inline on smaller screens.
- **Touch targets:** Minimum `44x44px` on mobile for all interactive elements.
- **Sticky elements:** Nav sticks everywhere. Filter bar sticks on desktop/tablet. Bottom bar on mobile only.

---

## 13. Accessibility Standards

| Requirement              | Implementation                                                  |
|--------------------------|-----------------------------------------------------------------|
| Contrast                 | WCAG AA: 4.5:1 body text, 3:1 large text                      |
| Focus rings              | `outline: 2px solid #2563EB; outline-offset: 2px` everywhere  |
| Touch targets            | Minimum 44x44px on all interactive elements                    |
| Heading hierarchy        | Single `<h1>` per page, sequential `<h2>` -> `<h3>`           |
| Semantic HTML            | `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<section>` |
| Icon-only buttons        | Always include `aria-label`                                    |
| External links           | `target="_blank" rel="noopener noreferrer"` + "(opens in new tab)" in aria-label |
| Images                   | Alt text on all: "[Company Name] logo"                         |
| Skip navigation          | Hidden skip-to-content link, visible on focus                  |
| Reduced motion           | `@media (prefers-reduced-motion: reduce)` disables all animation |
| Font sizing              | All in `rem` — scales with user browser settings               |
| Form validation          | Inline error messages below fields, red border + ring          |

---

## 14. Icon System

- **Library:** Lucide React (tree-shakeable, consistent 24px grid)
- **Default size:** 20px for inline, 16px for buttons/badges, 24px for standalone
- **Stroke width:** 1.5px (Lucide default) — do not change
- **Color:** Inherits from `currentColor` — set via text color classes
- **Common icons:**

| Usage               | Lucide Icon          |
|----------------------|---------------------|
| Search               | `Search`            |
| Bookmark (save)      | `Bookmark`          |
| Share                | `Share2`            |
| External link        | `ExternalLink`      |
| Filter               | `SlidersHorizontal` |
| Close                | `X`                 |
| Check/verified       | `CheckCircle2`      |
| Location             | `MapPin`            |
| Money/salary         | `IndianRupee`       |
| Calendar/date        | `Calendar`          |
| Briefcase/job        | `Briefcase`         |
| Graduation/degree    | `GraduationCap`     |
| Users/experience     | `User`              |
| Arrow right          | `ArrowRight`        |
| Arrow up-right       | `ArrowUpRight`      |
| Report/flag          | `Flag`              |
| Star/rating          | `Star`              |
| Menu (hamburger)     | `Menu`              |
| Scroll to top        | `ChevronUp`         |

---

## 15. Image & Media Guidelines

| Asset Type       | Format  | Max Size  | Dimensions           | Treatment                          |
|------------------|---------|-----------|----------------------|------------------------------------|
| Company logos     | PNG/SVG | 50KB      | Source: 128x128      | Display: 40-64px, `object-fit: contain`, 1px border `#E5E7EB`, rounded-lg, white bg |
| Tool icons        | PNG/SVG | 30KB      | Source: 96x96        | Display: 32-48px, same treatment as above |
| Hero images       | —       | —         | —                    | **Do not use hero images.** Text-driven heroes only. |
| Social icons      | SVG     | 5KB       | 24x24                | Inline SVG or Lucide icons         |
| OG images         | PNG     | 200KB     | 1200x630             | Auto-generated from job/page data  |
| Placeholders      | —       | —         | Match final size     | Gray skeleton with shimmer         |

### Rules

- **All images use `next/image`** with `loading="lazy"` (except above-fold logos).
- **WebP format** preferred for raster images. SVG for logos when available.
- **No decorative illustrations** on content pages. Keep it clean.
- Company logos get a `1px solid #E5E7EB` border + white background container.

---

## 16. Z-Index Scale

| Layer                  | Z-Index | Element                            |
|------------------------|---------|------------------------------------|
| Base content           | 0       | Cards, grids, sections             |
| Sticky filter bar      | 30      | Category chips bar                 |
| Dropdowns/popovers     | 40      | Filter dropdowns, share menus      |
| Sticky bottom bar      | 40      | Mobile apply bar                   |
| Navigation             | 50      | Top navbar                         |
| Toast notifications    | 60      | Temporary feedback messages        |
| Modals/overlays        | 70      | Bottom sheets, modal dialogs       |
| Overlay backdrop       | 69      | Semi-transparent bg behind modals  |

---

## 17. Page Templates

Every page on CareersAt.Tech follows one of these structural templates:

### 17.1 List Page (`/jobs`, `/tools`)

```
[Navbar]
[Hero — headline + search + stats]
[Trust bar — logos or stats strip]
[Filter bar — sticky chips]
[Content grid — cards + optional sidebar]
[CTA section]
[WhatsApp CTA — single instance]
[Footer]
```

### 17.2 Detail Page (`/jobs/[id]`)

```
[Navbar]
[Breadcrumb]
[Header card — large, all meta + CTAs]
[Two-column: Main content (left) + Sticky sidebar (right)]
[Safety/report section]
[Footer]
[Mobile: Sticky bottom bar]
```

### 17.3 Static Page (`/about`, `/privacy`, `/terms`)

```
[Navbar]
[Title + description]
[Prose content — max-width 720px, centered]
[Footer]
```

---

## 18. Tailwind Config Extensions

Add these to `tailwind.config.ts` to enforce the design system:

```ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#EFF6FF',
        },
        secondary: '#0D9488',
        page: '#F9FAFB',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h1':      ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2':      ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3':      ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body':    ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.5', fontWeight: '500' }],
        'small':   ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'pill': '9999px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
        'nav': '0 1px 3px rgba(0,0,0,0.1)',
        'top': '0 -4px 12px rgba(0,0,0,0.08)',
        'focus': '0 0 0 3px rgba(37,99,235,0.15)',
      },
      spacing: {
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
        '18': '72px',
        '22': '88px',
      },
      maxWidth: {
        'content': '1200px',
        'hero-text': '680px',
        'hero-sub': '560px',
        'prose': '65ch',
        'card-desc': '40ch',
        'cta': '480px',
      },
      animation: {
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
};
```

---

## 19. Do's and Don'ts

### Do

- Use `#F9FAFB` as page background, `#FFFFFF` for cards
- Keep cards at 12px radius, pills at full-round
- Pair primary + ghost buttons (never two primary buttons together)
- Show result counts in filters
- Use relative timestamps ("2 hours ago", not "April 5, 2026 14:32")
- Limit pills/badges to 4 per card maximum
- Use emoji prefixes on section headers for visual scanning
- Make entire cards clickable (not just the CTA)
- Persist filter state in URL params
- Test all text at 200% browser zoom

### Don't

- Use pure white (`#FFFFFF`) as page background
- Use shadows heavier than `shadow-lg`
- Use font weight 300, 800, or 900
- Use more than 2 trust badges on a single card
- Introduce new colors without adding them to this file
- Place the WhatsApp CTA more than once per page
- Use sidebar filters — horizontal chips only
- Use banner/hero images — text-driven heroes only
- Use sharp corners (0px radius) anywhere
- Add decorative illustrations to content pages
- Make animations longer than 400ms
- Skip `aria-label` on icon-only buttons

---

## 20. Versioning

When updating this file:
1. Add a changelog entry below with date and what changed
2. Update the "Last updated" date at the top
3. If adding a new color, add it to section 2 AND the Tailwind config in section 18
4. If adding a new component pattern, add it to section 10

### Changelog

| Date       | Change                                     |
|------------|---------------------------------------------|
| Apr 2026   | Initial design system created               |
