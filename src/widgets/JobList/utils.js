import {
    formatBaseSalary,
    formatBatch,
    formatEmploymentTypes,
    formatExperience,
    formatJobLocations,
    formatPostedAgo,
    formatWorkMode,
    pseudoViewCount,
    resolveApplyUrl,
    resolveCompanyLogo,
    daysUntil,
} from "@/Helpers/jobV2helpers";

const TYPE_TO_API = {
    "Full-time": "FULL_TIME",
    Internship: "INTERN",
    Contract: "CONTRACT",
};

const LOC_TO_WORK_MODE = {
    Remote: "remote",
    Hybrid: "hybrid",
    Onsite: "onsite",
};

const HUE_PALETTE = [
    "#635BFF", "#0C2451", "#387ED1", "#0052CC", "#1F1F1F",
    "#F9BD2B", "#FF6C37", "#111111", "#5E6AD2", "#0055FF",
    "#C75B3F", "#0D9488", "#7C3AED", "#059669", "#2563EB",
];

export const typeFilterToApi = (t) => (t === "All" ? null : TYPE_TO_API[t] || null);
export const locationFilterToWorkMode = (loc) => LOC_TO_WORK_MODE[loc] || null;
export const locationFilterIsCity = (loc) => loc !== "Anywhere" && !LOC_TO_WORK_MODE[loc];

export function deterministicHueBg(seed = "") {
    let h = 0;
    for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) | 0;
    return HUE_PALETTE[Math.abs(h) % HUE_PALETTE.length];
}

export function matchScoreFor(seed = "") {
    let h = 0;
    for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) | 0;
    return Math.min(94, 62 + (Math.abs(h) * 7) % 32);
}

export function urgencyFor(daysRemaining) {
    if (daysRemaining == null || Number.isNaN(daysRemaining)) return 0;
    if (daysRemaining <= 1) return 0.95;
    if (daysRemaining <= 3) return 0.85;
    if (daysRemaining <= 5) return 0.78;
    if (daysRemaining <= 7) return 0.72;
    if (daysRemaining <= 10) return 0.55;
    if (daysRemaining <= 14) return 0.42;
    if (daysRemaining <= 21) return 0.32;
    if (daysRemaining <= 30) return 0.22;
    return 0.12;
}

export function compScoreFor(baseSalary) {
    if (!baseSalary || typeof baseSalary !== "object") return 0.5;
    const { currency, max, min } = baseSalary;
    const v = max ?? min ?? 0;
    if (!v) return 0.5;
    if (currency === "USD") {
        if (v >= 110000) return 0.86;
        if (v >= 90000) return 0.78;
        if (v >= 60000) return 0.6;
        return 0.4;
    }
    if (currency === "EUR") return 0.58;
    if (currency === "INR") {
        if (v >= 4000000) return 0.82;
        if (v >= 3000000) return 0.72;
        if (v >= 2500000) return 0.6;
        if (v >= 1800000) return 0.46;
        if (v >= 1000000) return 0.38;
        return 0.3;
    }
    return 0.5;
}

function formatDeadlineShort(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return null;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}`;
}

export function mapJob(job) {
    if (!job) return null;
    const id = job.slug || job._id;
    const company = job.company?.name || job.companyName || "Unknown";
    const logoUrl = resolveCompanyLogo(job);
    const tags = Array.isArray(job.topicTags) ? job.topicTags.slice(0, 3) : [];
    const featured = job.sponsorship?.tier === "featured";
    const days = daysUntil(job.validThrough);
    const deadline = formatDeadlineShort(job.validThrough);
    const urgency = urgencyFor(days);
    const views = pseudoViewCount(job.slug || job._id);
    const applicants = Math.max(0, Math.round(views / 3));

    return {
        id,
        slug: job.slug,
        role: job.title || job.role || "Untitled role",
        company,
        logoUrl,
        logoBg: deterministicHueBg(company),
        location: formatJobLocations(job.jobLocation),
        mode: formatWorkMode(job.workMode),
        type: formatEmploymentTypes(job.employmentType),
        exp: formatExperience(job.experience),
        batch: formatBatch(job.batch),
        salary: formatBaseSalary(job.baseSalary),
        baseSalary: job.baseSalary,
        topicTags: tags,
        tags,
        posted: formatPostedAgo(job.datePosted),
        views,
        applicants,
        featured,
        deadline,
        urgency,
        matchScore: matchScoreFor(id || ""),
        applyUrl: resolveApplyUrl(job),
        compScore: compScoreFor(job.baseSalary),
    };
}

export function applyClientQuickFilter(jobs, quick) {
    if (!quick) return jobs;
    return jobs.filter((j) => {
        switch (quick) {
            case "Closing soon":
                return j.urgency > 0.7;
            case "Remote only":
                return j.mode === "Remote";
            case "Fresher-friendly":
                return (j.exp || "").includes("0") || (j.exp || "").toLowerCase().includes("intern") || (j.exp || "").toLowerCase().includes("fresh");
            case "≤ 1 yr exp":
                return (j.exp || "").includes("0-1") || (j.exp || "").toLowerCase().includes("intern") || (j.exp || "").toLowerCase().includes("fresh");
            case "New this week": {
                const p = j.posted || "";
                if (!p) return false;
                if (p === "just now") return true;
                if (/^[\d]+m$/.test(p) || /^[\d]+h$/.test(p)) return true;
                const m = p.match(/^([\d]+)d$/);
                if (m) return parseInt(m[1], 10) <= 7;
                return false;
            }
            case "$$$ High":
                return (j.compScore ?? 0) >= 0.7;
            default:
                return true;
        }
    });
}

export function applyClientSort(jobs, sort) {
    if (sort === "Salary") {
        return [...jobs].sort((a, b) => (b.compScore ?? 0) - (a.compScore ?? 0));
    }
    if (sort === "Deadline") {
        return [...jobs].sort((a, b) => (b.urgency ?? 0) - (a.urgency ?? 0));
    }
    return jobs;
}

export function urlToFilters(query) {
    return {
        type: query.type || "All",
        location: query.loc || "Anywhere",
        batch: query.batch || "All",
        quick: query.quick || null,
        search: query.q || "",
        sort: query.sort || "Latest",
        page: Math.max(1, parseInt(query.page, 10) || 1),
    };
}

export function filtersToQuery({ type, location, batch, quick, search, sort, page }) {
    const q = {};
    if (type && type !== "All") q.type = type;
    if (location && location !== "Anywhere") q.loc = location;
    if (batch && batch !== "All") q.batch = batch;
    if (quick) q.quick = quick;
    if (search) q.q = search;
    if (sort && sort !== "Latest") q.sort = sort;
    if (page && page > 1) q.page = String(page);
    return q;
}
