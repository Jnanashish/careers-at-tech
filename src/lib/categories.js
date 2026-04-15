/**
 * Category metadata used on the hub page and category grid.
 * Kept in a separate file from prompts.js to avoid bundling Node.js 'fs' on the client.
 */
export const CATEGORIES = [
    {
        key: "tailor-to-jd",
        label: "Tailor to a specific JD",
        description: "Rewrite your resume to match a specific job description without faking experience.",
    },
    {
        key: "no-experience",
        label: "I have no real experience",
        description: "Turn college projects and coursework into recruiter-ready bullet points.",
    },
    {
        key: "ats",
        label: "ATS and keyword optimization",
        description: "Make sure your resume passes automated screening before a human ever sees it.",
    },
    {
        key: "career-switcher",
        label: "Career switcher or non-CS to tech",
        description: "Reframe your non-CS background as an asset for software roles.",
    },
    {
        key: "review-fixes",
        label: "Get reviewed and fix weaknesses",
        description: "Get a brutally honest critique and know exactly what to fix first.",
    },
];
