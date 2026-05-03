// Build a Google-for-Jobs-compliant JobPosting JSON-LD object from a v2 job document.
// Returns null when any required Google field is missing or the posting is expired —
// emitting a partial/expired schema gets the URL silently dropped from rich results.
//
// Required Google fields: title, description, datePosted, validThrough,
// hiringOrganization, jobLocation (or applicantLocationRequirements for remote),
// employmentType.
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
    const validThrough = job.validThrough;
    if (!datePosted || !validThrough) return null;

    const employmentType = normalizeEmploymentType(job.employmentType);
    if (!employmentType) return null;

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
        validThrough,
        employmentType,
        hiringOrganization,
        directApply: false,
    };

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
