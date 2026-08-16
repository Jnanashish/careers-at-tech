// Display + formatting helpers for the v2 job schema.

export const EMPLOYMENT_TYPE_LABEL = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACTOR: "Contract",
    TEMPORARY: "Temporary",
    INTERN: "Internship",
    VOLUNTEER: "Volunteer",
    PER_DIEM: "Per diem",
    OTHER: "Other",
};

export const WORK_MODE_LABEL = {
    onsite: "On-site",
    remote: "Remote",
    hybrid: "Hybrid",
};

export function formatEmploymentTypes(types) {
    if (!Array.isArray(types) || types.length === 0) return null;
    return types.map((t) => EMPLOYMENT_TYPE_LABEL[t] || t).join(" / ");
}

export function formatWorkMode(mode) {
    return WORK_MODE_LABEL[mode] || null;
}

// API employmentType → /jobs?type= values that actually drive a filtered
// listing (FilterBar + widgets/JobList urlToFilters understand these). Other
// types still get a breadcrumb label, just no link (no filter backs them yet).
const LINKABLE_CATEGORY = {
    FULL_TIME: "Full-time",
    INTERN: "Internship",
};

// Breadcrumb "category" for a job = its primary employment type.
// Returns { label, href } where href is null when the type has no filtered view.
export function jobCategory(job) {
    const types = job?.employmentType;
    if (!Array.isArray(types) || types.length === 0) return null;
    const primary = types[0];
    const label = EMPLOYMENT_TYPE_LABEL[primary] || primary;
    if (!label) return null;
    const filterValue = LINKABLE_CATEGORY[primary] || null;
    const href = filterValue ? `/jobs?type=${encodeURIComponent(filterValue)}` : null;
    return { label, href };
}

export function formatJobLocations(jobLocation) {
    if (!Array.isArray(jobLocation) || jobLocation.length === 0) return null;
    const cities = jobLocation
        .map((loc) => loc?.city)
        .filter(Boolean);
    if (cities.length === 0) return null;
    if (cities.length <= 3) return cities.join(", ");
    return `${cities.slice(0, 3).join(", ")} +${cities.length - 3}`;
}

export function formatBatch(batch) {
    if (!Array.isArray(batch) || batch.length === 0) return null;
    return batch.slice().sort((a, b) => a - b).join(", ");
}

export function formatExperience(experience) {
    if (!experience || typeof experience !== "object") return null;
    const { min, max } = experience;
    if (min == null && max == null) return null;
    if (min != null && max != null) {
        if (min === 0 && max === 0) return "Freshers";
        if (min === max) return `${min} yr${min === 1 ? "" : "s"}`;
        return `${min}–${max} yrs`;
    }
    if (min != null) return `${min}+ yrs`;
    return `Up to ${max} yrs`;
}

const CURRENCY_SYMBOL = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };

function formatINRShort(amount) {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 1)}Cr`;
    if (amount >= 100000) return `${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
    return String(amount);
}

export function formatBaseSalary(baseSalary) {
    if (!baseSalary || typeof baseSalary !== "object") return null;
    const { currency, min, max, unitText } = baseSalary;
    if (min == null && max == null) return null;
    const symbol = CURRENCY_SYMBOL[currency] || `${currency} `;
    const isINR = currency === "INR";
    const fmt = (n) => (isINR ? formatINRShort(n) : n.toLocaleString());
    let suffix = "";
    if (isINR && (unitText || "YEAR") === "YEAR") suffix = " LPA";
    else if (unitText === "MONTH") suffix = "/mo";
    else if (unitText === "HOUR") suffix = "/hr";
    if (min != null && max != null) {
        if (min === max) return `${symbol}${fmt(min)}${suffix}`;
        return `${symbol}${fmt(min)}–${fmt(max)}${suffix}`;
    }
    if (min != null) return `From ${symbol}${fmt(min)}${suffix}`;
    return `Up to ${symbol}${fmt(max)}${suffix}`;
}

export function daysUntil(dateStr) {
    if (!dateStr) return null;
    const target = new Date(dateStr).getTime();
    if (Number.isNaN(target)) return null;
    const now = Date.now();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff;
}

// Only http(s) may ever reach window.open / an href. The apply link is
// backend-supplied, and window.open("javascript:…") executes that script in a
// document on our own origin — so an unvalidated value here is a stored-XSS
// sink, not just a broken link. Same reasoning covers data: and blob:.
const SAFE_LINK_SCHEMES = new Set(["http:", "https:"]);

function safeExternalUrl(value) {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    // Protocol-relative ("//jobs.example.com/…") used to work via window.open;
    // keep it working by pinning it to https rather than dropping the link.
    const candidate = trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
    try {
        const parsed = new URL(candidate);
        return SAFE_LINK_SCHEMES.has(parsed.protocol) ? candidate : null;
    } catch {
        // Relative or malformed. Apply links are always absolute third-party
        // URLs, so anything unparseable is bad data — drop it and let the UI
        // fall back to its "apply link unavailable" state.
        return null;
    }
}

export function resolveApplyUrl(job) {
    if (!job) return null;
    return (
        safeExternalUrl(job.applyLink) ||
        safeExternalUrl(job.company?.careerPageLink) ||
        safeExternalUrl(job.company?.website) ||
        null
    );
}

export function resolveCompanyLogo(job) {
    return job?.company?.logo?.icon || null;
}

// SEO meta description for a job detail page. Structured, keyword-front-loaded
// format (company → role → location → audience → experience/salary) instead of
// a raw slice of the JD, so the SERP snippet reads cleanly and ranks for the
// "{company} hiring {role} freshers" intent. An explicit job.seo.metaDescription
// (admin-set) still wins.
export function jobMetaDescription(job) {
    if (!job) return "";
    if (job.seo?.metaDescription) return job.seo.metaDescription;

    const company = job.companyName || "A top tech company";
    const role = job.title || "tech role";

    let s = `${company} is hiring a ${role}`;

    const loc = formatJobLocations(job.jobLocation);
    if (loc) s += ` in ${loc}`;
    else if (job.workMode === "remote") s += " (Remote)";

    const batch = formatBatch(job.batch);
    const audience = batch ? `${batch} batch` : "freshers";
    s += ` for ${audience}`;

    const exp = formatExperience(job.experience);
    const salary = formatBaseSalary(job.baseSalary);
    const parenParts = [];
    // Skip experience when it would only echo "freshers" already in the sentence.
    if (exp && !(audience === "freshers" && exp === "Freshers")) parenParts.push(exp);
    if (salary) parenParts.push(salary);
    if (parenParts.length) s += ` (${parenParts.join(", ")})`;

    s += ". View eligibility, skills & apply — verified on CareersAt.Tech.";
    return s;
}

export function jobMetaTitle(job) {
    if (!job) return "Tech Jobs for Freshers | CareersAt.Tech";
    if (job.seo?.metaTitle) return job.seo.metaTitle;
    const role = job.title || "Tech Role";
    const base = job.companyName ? `${role} at ${job.companyName} for Freshers` : `${role} for Freshers`;
    return `${base} | CareersAt.Tech`;
}

// TODO(api): replace with job.stats.views once backend exposes counts.
export function pseudoViewCount(slug) {
    if (!slug) return 0;
    let h = 0;
    for (let i = 0; i < slug.length; i += 1) {
        h = (h * 31 + slug.charCodeAt(i)) | 0;
    }
    const n = Math.abs(h) % 3800;
    return 200 + n;
}

// Freshness check — true when a job was posted within the last `withinHours`
// (default 48h). Drives the "New" badge on cards + the job detail page.
export function isJobNew(dateStr, withinHours = 48) {
    if (!dateStr) return false;
    const t = new Date(dateStr).getTime();
    if (Number.isNaN(t)) return false;
    const ageHours = (Date.now() - t) / (1000 * 60 * 60);
    return ageHours >= 0 && ageHours <= withinHours;
}

export function formatPostedAgo(dateStr) {
    if (!dateStr) return null;
    const t = new Date(dateStr).getTime();
    if (Number.isNaN(t)) return null;
    const diffSec = Math.max(0, Math.floor((Date.now() - t) / 1000));
    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `${diffDay}d`;
    const diffWk = Math.floor(diffDay / 7);
    if (diffWk < 5) return `${diffWk}w`;
    const diffMo = Math.floor(diffDay / 30);
    return `${diffMo}mo`;
}
