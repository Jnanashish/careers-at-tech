// Feature flags. Flip to true when backend / data ready.
// Designs exist for these — UI hidden until implementation lands.
// Backlog: see FEATURE_FLAGS.md at repo root.

export const FLAGS = {
    HEADER_NAV: false,        // Companies / Salaries / Resources / Drops nav links
    HEADER_AUTH: false,       // Sign in
    HEADER_POST_JOB: false,   // "Post a role · ₹4,800" CTA + payments flow
    HERO_STATS: false,        // Hero right-column stat cards (open / internships / remote / time-to-offer / companies hiring)
    FILTER_SORT: false,       // Latest / Salary / Deadline sort segment
    TRENDING_BAND: false,     // Bottom-of-page "What everyone is looking at right now" trending strip
    SIDEBAR_TRENDING: false,  // Right-rail "Trending now" list
    SIDEBAR_PROFILE_MATCH: false, // Right-rail "Your match" / Rohan K. profile card
    SIDEBAR_SAVED: false,         // Right-rail "Saved" jobs list
    SIDEBAR_RESOURCES: false,     // Right-rail "Free resources" links
    JD_E_VARIANT: true,           // JD-E listing-continuity variant of the job detail page
    CARD_SAVE: false,             // Save / bookmark icon on job cards
    CARD_APPLICANTS: false,       // Applicants count on job cards
    CARD_MATCH_SCORE: false,      // "XX% match" chip on job cards
    CARD_CLOSING_DEADLINE: false, // "⏱ Closes {date}" urgency pill on job cards
    FOOTER_EMAIL_ALERT: false,    // "Get weekly job alerts" email signup in footer
    FOOTER_JOBS_BY_TYPE: false,   // "Jobs by types" link column in footer
    RESULTS_SORT_LABEL: false,    // "· sorted by latest" text in results header
    RESULTS_VIEW_TOGGLE: false,   // List / Grid view toggle buttons in results header
    FOOTER_RESUME_TOOLKIT: false, // "Resume Toolkit" link in footer company links
    FOOTER_LOGO: false,           // Footer logo image
    FOOTER_SOCIAL_ICONS: false,   // Social icons (Instagram, LinkedIn, Telegram, WhatsApp)
    FOOTER_MADE_WITH: false,      // "Made with ❤️ in India by @Jnanashish" text
};
