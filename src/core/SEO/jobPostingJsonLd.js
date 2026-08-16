// Build a Google-for-Jobs-compliant JobPosting JSON-LD object from a v2 job document.
// Returns null when a *required* Google field is missing or the posting is expired —
// emitting a partial/expired schema gets the URL silently dropped from rich results.
//
// Google's REQUIRED set is exactly: title, description, datePosted,
// hiringOrganization, and jobLocation (or jobLocationType +
// applicantLocationRequirements for remote roles).
//
// validThrough and employmentType are RECOMMENDED, not required. They used to be
// treated as required here, and since the backend currently returns
// validThrough: null on every job, that single check suppressed the JobPosting
// block on 100% of job pages — the site shipped no Google-for-Jobs markup at all.
// They are now emitted when present and omitted when not, which is what the spec
// asks for. (Backend should still start populating validThrough: without it
// Google has no expiry signal and relies on the posting disappearing.)
//
// Schema reference: https://developers.google.com/search/docs/appearance/structured-data/job-posting

const SCHEMA_EMPLOYMENT_TYPES = new Set([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACTOR",
    "TEMPORARY",
    "INTERN",
    "VOLUNTEER",
    "PER_DIEM",
    "OTHER",
]);

function normalizeEmploymentType(types) {
    if (!Array.isArray(types) || types.length === 0) return null;
    const mapped = types
        .map((t) => (typeof t === "string" ? t.trim().toUpperCase() : null))
        .filter((t) => t && SCHEMA_EMPLOYMENT_TYPES.has(t));
    if (mapped.length === 0) return null;
    return mapped.length === 1 ? mapped[0] : mapped;
}

function buildJobLocation(jobLocation) {
    if (!Array.isArray(jobLocation) || jobLocation.length === 0) return null;
    const places = jobLocation
        .map((loc) => {
            if (!loc || typeof loc !== "object") return null;
            const address = {};
            if (loc.city) address.addressLocality = loc.city;
            if (loc.region) address.addressRegion = loc.region;
            address.addressCountry = loc.country || "IN";
            if (Object.keys(address).length === 1 && !loc.city && !loc.region) return null;
            return {
                "@type": "Place",
                address: { "@type": "PostalAddress", ...address },
            };
        })
        .filter(Boolean);
    return places.length > 0 ? places : null;
}

function buildBaseSalary(baseSalary) {
    if (!baseSalary || typeof baseSalary !== "object") return null;
    const { currency, min, max, unitText } = baseSalary;
    if (!currency) return null;
    if (min == null && max == null) return null;
    const value = { "@type": "QuantitativeValue", unitText: unitText || "YEAR" };
    if (min != null) value.minValue = min;
    if (max != null) value.maxValue = max;
    if (min != null && max != null && min === max) value.value = min;
    return { "@type": "MonetaryAmount", currency, value };
}

function buildHiringOrganization(job) {
    const name = job.companyName || job.company?.companyName;
    if (!name) return null;
    const org = { "@type": "Organization", name };
    const website = job.company?.website;
    if (website) org.sameAs = website;
    const logo = job.company?.logo?.icon;
    if (logo) org.logo = logo;
    return org;
}

/**
 * Builds JobPosting JSON-LD for a v2 job document. Returns null if not eligible.
 * @param {object} job  populated v2 job doc as returned by GET /api/jobs/v2/:slug
 * @returns {object|null}
 */
export function buildJobPostingJsonLd(job) {
    if (!job) return null;
    if (job.isExpired) return null;

    const title = job.title;
    if (!title) return null;

    const datePosted = job.datePosted;
    if (!datePosted) return null;

    const validThrough = job.validThrough || null;
    const employmentType = normalizeEmploymentType(job.employmentType);

    const hiringOrganization = buildHiringOrganization(job);
    if (!hiringOrganization) return null;

    const jobLocation = buildJobLocation(job.jobLocation);
    const isRemote = job.workMode === "remote";

    if (!jobLocation && !isRemote) return null;

    const descriptionHtml = job.jobDescription?.html;
    const descriptionPlain = job.jobDescription?.plain;
    const description = descriptionHtml || descriptionPlain || job.seo?.metaDescription;
    if (!description) return null;

    const ld = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title,
        description,
        datePosted,
        hiringOrganization,
        directApply: false,
    };

    if (validThrough) ld.validThrough = validThrough;
    if (employmentType) ld.employmentType = employmentType;
    if (jobLocation) ld.jobLocation = jobLocation;
    if (isRemote) {
        ld.jobLocationType = "TELECOMMUTE";
        ld.applicantLocationRequirements = {
            "@type": "Country",
            name: "India",
        };
    }

    const baseSalary = buildBaseSalary(job.baseSalary);
    if (baseSalary) ld.baseSalary = baseSalary;

    if (Array.isArray(job.requiredSkills) && job.requiredSkills.length > 0) {
        ld.skills = job.requiredSkills.join(", ");
    }
    if (Array.isArray(job.industry) && job.industry.length > 0) {
        ld.industry = job.industry.join(", ");
    } else if (job.company?.industry) {
        ld.industry = job.company.industry;
    }

    return ld;
}
