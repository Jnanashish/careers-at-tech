/**
 * Category metadata for the Resume Toolkit hub.
 * Single source of truth — drives:
 *   - CategoryGrid cards (icon, label, hint, count)
 *   - PromptLibrary filter chips (catId, label)
 *   - PromptLibrary grouped sections (sectionTitle, sectionSub)
 *
 * `key`  = value used in prompt frontmatter `category:` field (slug in md files)
 * `catId` = compact id used inside the design v3 components
 *
 * Kept JS-only (no fs import) so it can be bundled on the client.
 */
export const CATEGORIES = [
    {
        key: "no-experience",
        catId: "noexp",
        label: "No real experience yet",
        hint: "College projects, hackathons, self-learning.",
        description: "Turn college projects and coursework into recruiter-ready bullet points.",
        sectionTitle: "If you're a fresher with no real experience",
        sectionSub: "Translate your projects, hackathons, and coursework into resume-grade lines.",
    },
    {
        key: "ats",
        catId: "ats",
        label: "Got rejected by ATS",
        hint: "Format, keywords, parser-safe rewrite.",
        description: "Make sure your resume passes automated screening before a human ever sees it.",
        sectionTitle: "If you got rejected by ATS",
        sectionSub: "Format and keyword fixes that get you past the bot and to a human.",
    },
    {
        key: "career-switcher",
        catId: "switch",
        label: "Career switcher from non-CS",
        hint: "Translate prior work into tech-speak.",
        description: "Reframe your non-CS background as an asset for software roles.",
        sectionTitle: "If you're switching from non-CS",
        sectionSub: "Reframe what you did before so a tech recruiter can read it.",
    },
    {
        key: "tailor-to-jd",
        catId: "tailor",
        label: "Tailor for one job",
        hint: "Paste a JD, get a targeted resume.",
        description: "Rewrite your resume to match a specific job description without faking experience.",
        sectionTitle: "If you have one specific job in mind",
        sectionSub: "Paste a JD, get a re-ordered, keyword-aligned version in 90 seconds.",
    },
    {
        key: "bullets",
        catId: "bullets",
        label: "Fix weak bullets",
        hint: "Add metrics, verbs, impact.",
        description: "Sharpen and quantify resume bullets honestly, without inventing metrics.",
        sectionTitle: "If your bullets sound weak",
        sectionSub: "Quantified, action-led, ATS-friendly rewrites for any single bullet.",
    },
    {
        key: "review-fixes",
        catId: "critique",
        label: "Full resume critique",
        hint: "Brutal honest review, line by line.",
        description: "Get a brutally honest critique and know exactly what to fix first.",
        sectionTitle: "If you want a full critique",
        sectionSub: "What a senior engineer would mark up. Brutal honesty, line by line.",
    },
    {
        key: "intern",
        catId: "intern",
        label: "Internship resume",
        hint: "First-time, no full-time experience.",
        description: "Build a one-page internship resume from scratch — ATS-safe, no fake experience.",
        sectionTitle: "If you're applying for your first internship",
        sectionSub: "Start clean — a one-page, ATS-safe resume built around projects and coursework.",
    },
    {
        key: "linkedin",
        catId: "linkedin",
        label: "Match my LinkedIn",
        hint: "Align headline, About, and Skills.",
        description: "Align your LinkedIn headline and About section with the resume recruiters will read.",
        sectionTitle: "If your LinkedIn is out of sync",
        sectionSub: "Same story, two formats. Aligned headlines, About, and Skills.",
    },
];

/** Lookup helpers. */
export const CATEGORY_BY_KEY = CATEGORIES.reduce((acc, c) => {
    acc[c.key] = c;
    return acc;
}, {});

export const CATEGORY_BY_CATID = CATEGORIES.reduce((acc, c) => {
    acc[c.catId] = c;
    return acc;
}, {});

/** Filter chips for PromptLibrary (prepends "All"). */
export const FILTER_CHIPS = [
    { id: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.catId, label: c.label })),
];
