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

export function resolveApplyUrl(job) {
    if (!job) return null;
    if (job.applyLink) return job.applyLink;
    if (job.company?.careerPageLink) return job.company.careerPageLink;
    if (job.company?.website) return job.company.website;
    return null;
}

export function resolveCompanyLogo(job) {
    return job?.company?.logo?.icon || null;
}

export function jobMetaDescription(job) {
    if (!job) return "";
    if (job.seo?.metaDescription) return job.seo.metaDescription;
    const plain = job.jobDescription?.plain;
    if (plain) return plain.slice(0, 160).trim();
    const parts = [];
    if (job.companyName) parts.push(`${job.companyName} is hiring`);
    parts.push(`for a ${job.title} role`);
    const loc = formatJobLocations(job.jobLocation);
    if (loc) parts.push(`in ${loc}`);
    parts.push("on CareersAt.Tech.");
    return parts.join(" ");
}

export function jobMetaTitle(job) {
    if (!job) return "Job — CareersAt.Tech";
    if (job.seo?.metaTitle) return job.seo.metaTitle;
    return `${job.title} at ${job.companyName} — CareersAt.Tech`;
}
