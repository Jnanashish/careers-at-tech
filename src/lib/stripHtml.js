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

const TRUNCATION_SUFFIX = "\n\n[JD truncated — full version on the job page]";
const MAX_JD_TEXT_LENGTH = 8000;

/**
 * Combines multiple HTML job description fields into a single plain-text block.
 * Total output is guaranteed to be at most MAX_JD_TEXT_LENGTH characters.
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

    if (combined.length > MAX_JD_TEXT_LENGTH) {
        const allowedLength = Math.max(0, MAX_JD_TEXT_LENGTH - TRUNCATION_SUFFIX.length);
        return combined.slice(0, allowedLength) + TRUNCATION_SUFFIX;
    }

    return combined;
}
