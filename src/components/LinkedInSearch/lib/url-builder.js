import {
  TIME_POSTED_LABELS,
  WORK_MODE_LABELS,
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  CONNECTION_DEGREE_LABELS,
} from "./linkedin-params";

export function buildJobSearchURL(filters) {
  const params = new URLSearchParams();

  if (filters.keywords) params.set("keywords", filters.keywords);
  if (filters.location) params.set("location", filters.location);
  if (filters.timePosted) params.set("f_TPR", filters.timePosted);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.workMode.length) params.set("f_WT", filters.workMode.join(","));
  if (filters.jobType.length) params.set("f_JT", filters.jobType.join(","));
  if (filters.experienceLevel.length)
    params.set("f_E", filters.experienceLevel.join(","));
  if (filters.easyApply) params.set("f_EA", "true");
  if (filters.minSalary) params.set("f_SB2", filters.minSalary);

  const qs = params.toString();
  return `https://www.linkedin.com/jobs/search/${qs ? "?" + qs : ""}`;
}

export function buildReferralURL(filters) {
  const params = new URLSearchParams();

  const keywordParts = [filters.company, filters.location].filter(Boolean);
  if (keywordParts.length) params.set("keywords", keywordParts.join(" "));
  if (filters.role) params.set("title", filters.role);
  if (filters.connectionDegree.length) {
    params.set("network", JSON.stringify(filters.connectionDegree));
  }

  const qs = params.toString();
  return `https://www.linkedin.com/search/results/people/${qs ? "?" + qs : ""}`;
}

export function buildHumanReadableSummary(filters, tab) {
  if (tab === "referral") {
    const parts = [];
    if (filters.company)
      parts.push(`at **${filters.company}**`);
    if (filters.role) parts.push(`with title **${filters.role}**`);
    if (filters.connectionDegree.length) {
      const degrees = filters.connectionDegree
        .map((d) => CONNECTION_DEGREE_LABELS[d])
        .join(", ");
      parts.push(`in your **${degrees}** connections`);
    }
    if (filters.location) parts.push(`in **${filters.location}**`);
    if (!parts.length) return "";
    return `Finding people ${parts.join(", ")}`;
  }

  const parts = [];
  if (filters.keywords) parts.push(`for **${filters.keywords}**`);
  if (filters.location) parts.push(`in **${filters.location}**`);
  if (filters.timePosted) {
    const label = TIME_POSTED_LABELS[filters.timePosted];
    if (label) parts.push(`posted in the **${label.toLowerCase()}**`);
  }
  if (filters.jobType.length) {
    const types = filters.jobType.map((t) => JOB_TYPE_LABELS[t]).join(", ");
    parts.push(`**${types}** positions`);
  }
  if (filters.workMode.length) {
    const modes = filters.workMode.map((m) => WORK_MODE_LABELS[m]).join(", ");
    parts.push(`**${modes}** work`);
  }
  if (filters.experienceLevel.length) {
    const levels = filters.experienceLevel
      .map((l) => EXPERIENCE_LEVEL_LABELS[l])
      .join(", ");
    parts.push(`**${levels}** level`);
  }
  if (filters.easyApply) parts.push(`with **Easy Apply**`);
  if (filters.sortBy === "DD") parts.push(`sorted by **most recent**`);
  if (!parts.length) return "";
  return `Searching ${parts.join(", ")}`;
}

export function encodeFiltersToHash(filters, tab) {
  try {
    const data = { tab, filters };
    return btoa(JSON.stringify(data));
  } catch {
    return "";
  }
}

export function decodeFiltersFromHash(hash) {
  try {
    const decoded = JSON.parse(atob(hash));
    return { tab: decoded.tab, filters: decoded.filters };
  } catch {
    return null;
  }
}
