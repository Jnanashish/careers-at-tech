/**
 * Strips HTML tags from a string and normalizes whitespace.
 * Used to convert rich-text JD fields into plain text for prompt injection.
 */
export function stripHtml(html) {
    if (!html || html === "N" || html === "<p>N</p>") return "";
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Combines multiple HTML job description fields into a single plain-text block.
 * Truncates at 8000 characters as specified.
 */
export function buildJdText(jobData) {
    const sections = [
        { label: "Job Description", value: jobData?.jobdesc },
        { label: "Responsibilities", value: jobData?.responsibility },
        { label: "Eligibility", value: jobData?.eligibility },
        { label: "Required Skills", value: jobData?.skills },
    ];

    const parts = sections
        .map(({ label, value }) => {
            const text = stripHtml(value);
            if (!text) return null;
            return `${label}:\n${text}`;
        })
        .filter(Boolean);

    const combined = parts.join("\n\n");

    if (combined.length > 8000) {
        return combined.slice(0, 8000) + "\n\n[JD truncated — full version on the job page]";
    }

    return combined;
}
