// linkedin-params.js — option vocabularies + default state for the LinkedIn URL builder.
// Ported from the CareersAtTech design handoff (builder-core.js). Each option is
// { value, label } where value is the literal LinkedIn search-param value.

export const TIME_POSTED = [
  { value: "", label: "Any time" },
  { value: "r86400", label: "Past 24 hours" },
  { value: "r604800", label: "Past week" },
  { value: "r2592000", label: "Past month" },
];

export const SORT_BY = [
  { value: "R", label: "Relevance" },
  { value: "DD", label: "Most recent" },
];

export const WORK_MODE = [
  { value: "1", label: "on-site" },
  { value: "2", label: "remote" },
  { value: "3", label: "hybrid" },
];

export const JOB_TYPE = [
  { value: "F", label: "full-time" },
  { value: "P", label: "part-time" },
  { value: "C", label: "contract" },
  { value: "I", label: "internship" },
];

export const EXPERIENCE = [
  { value: "1", label: "internship" },
  { value: "2", label: "entry" },
  { value: "3", label: "associate" },
  { value: "4", label: "mid-senior" },
];

export const DEGREE = [
  { value: "F", label: "1st" },
  { value: "S", label: "2nd" },
  { value: "O", label: "3rd+" },
];

// ---------- plain-English vocab ----------
// job-type value -> plural noun phrase used in the summary
export const JT_NOUN = {
  F: "full-time roles",
  P: "part-time roles",
  C: "contract roles",
  I: "internships",
};
// experience value -> leading adjective in the summary
export const EXP_ADJ = {
  1: "internship",
  2: "entry-level",
  3: "associate",
  4: "mid-senior",
};

// ---------- default state ----------
export function emptyJob() {
  return {
    keywords: "",
    location: "",
    timePosted: "",
    sortBy: "R",
    workMode: [],
    jobType: [],
    experience: [],
    easyApply: false,
    minSalary: "",
  };
}

export function emptyReferral() {
  return { company: "", role: "", degree: [], location: "" };
}

export function emptyState() {
  return { mode: "job", job: emptyJob(), referral: emptyReferral() };
}
