// Feature flags. Flip to true when backend / data ready.
// Designs exist for these — UI hidden until implementation lands.
// Backlog: see FEATURE_FLAGS.md at repo root.

export const FLAGS = {
    JD_E_VARIANT: true,           // JD-E listing-continuity variant of the job detail page
    CARD_SAVE: false,             // Save / bookmark icon on job cards
    CARD_APPLICANTS: false,       // Applicants count on job cards
    CARD_MATCH_SCORE: false,      // "XX% match" chip on job cards
    CARD_CLOSING_DEADLINE: false, // "⏱ Closes {date}" urgency pill on job cards
    RESULTS_SORT_LABEL: false,    // "· sorted by latest" text in results header
    RESULTS_VIEW_TOGGLE: false,   // List view button in results header
    FOOTER_RESUME_TOOLKIT: true,  // "Resume Prompts" link in footer company links
    FOOTER_SOCIAL_ICONS: true,    // Social icons (Instagram, LinkedIn, Telegram, WhatsApp)
};
