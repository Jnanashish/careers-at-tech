export const TIME_POSTED = {
  "Past 10 min": "r600",
  "Past hour": "r3600",
  "Past 24 hours": "r86400",
  "Past week": "r604800",
  "Past month": "r2592000",
};

export const SORT_BY = {
  "Most recent": "DD",
  "Most relevant": "R",
};

export const WORK_MODE = {
  "On-site": "1",
  Remote: "2",
  Hybrid: "3",
};

export const JOB_TYPE = {
  "Full-time": "F",
  "Part-time": "P",
  Contract: "C",
  Temporary: "T",
  Internship: "I",
  Volunteer: "V",
};

export const EXPERIENCE_LEVEL_PRIMARY = {
  Internship: "1",
  "Entry level": "2",
  Associate: "3",
};

export const EXPERIENCE_LEVEL_SECONDARY = {
  "Mid-Senior": "4",
  Director: "5",
  Executive: "6",
};

export const EXPERIENCE_LEVEL = {
  ...EXPERIENCE_LEVEL_PRIMARY,
  ...EXPERIENCE_LEVEL_SECONDARY,
};

export const CONNECTION_DEGREE = {
  "1st": "F",
  "2nd": "S",
  "3rd+": "O",
};

export const INDIAN_LOCATIONS = [
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Delhi NCR",
  "Chennai",
  "Noida",
  "Gurgaon",
  "Remote",
];

export const CURRENCIES = {
  INR: "INR",
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  CAD: "CAD",
  AUD: "AUD",
};

export const INITIAL_JOB_FILTERS = {
  keywords: "",
  location: "",
  timePosted: "",
  sortBy: "",
  workMode: [],
  jobType: [],
  experienceLevel: [],
  easyApply: false,
  minSalary: "",
  salaryCurrency: "INR",
};

export const INITIAL_REFERRAL_FILTERS = {
  company: "",
  role: "",
  connectionDegree: [],
  location: "",
};

// Reverse lookups: value -> label
const buildReverseLookup = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

export const TIME_POSTED_LABELS = buildReverseLookup(TIME_POSTED);
export const SORT_BY_LABELS = buildReverseLookup(SORT_BY);
export const WORK_MODE_LABELS = buildReverseLookup(WORK_MODE);
export const JOB_TYPE_LABELS = buildReverseLookup(JOB_TYPE);
export const EXPERIENCE_LEVEL_LABELS = buildReverseLookup(EXPERIENCE_LEVEL);
export const CONNECTION_DEGREE_LABELS = buildReverseLookup(CONNECTION_DEGREE);
