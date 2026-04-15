import { INITIAL_JOB_FILTERS } from "./linkedin-params";

export const BUILT_IN_TEMPLATES = [
  {
    id: "fresher-sde-remote",
    name: "Fresher SDE \u2014 Remote India",
    filters: {
      ...INITIAL_JOB_FILTERS,
      keywords: "Software Developer",
      location: "India",
      experienceLevel: ["2"],
      workMode: ["2"],
      timePosted: "r2592000",
    },
    isBuiltIn: true,
  },
  {
    id: "2025-batch-bangalore",
    name: "2025 Batch \u2014 Entry Level Bangalore",
    filters: {
      ...INITIAL_JOB_FILTERS,
      keywords: "2025 batch",
      location: "Bangalore",
      experienceLevel: ["1", "2"],
      timePosted: "r604800",
    },
    isBuiltIn: true,
  },
  {
    id: "internship-software",
    name: "Internship \u2014 Software Development",
    filters: {
      ...INITIAL_JOB_FILTERS,
      keywords: "Software Development",
      jobType: ["I"],
      timePosted: "r2592000",
    },
    isBuiltIn: true,
  },
  {
    id: "data-analyst-hyderabad",
    name: "Data Analyst \u2014 Fresher Hyderabad",
    filters: {
      ...INITIAL_JOB_FILTERS,
      keywords: "Data Analyst",
      location: "Hyderabad",
      experienceLevel: ["2"],
      timePosted: "r2592000",
    },
    isBuiltIn: true,
  },
  {
    id: "frontend-remote",
    name: "Frontend Developer \u2014 Remote",
    filters: {
      ...INITIAL_JOB_FILTERS,
      keywords: "Frontend Developer",
      workMode: ["2"],
      jobType: ["F"],
    },
    isBuiltIn: true,
  },
  {
    id: "devops-intern",
    name: "DevOps Intern \u2014 Any Location",
    filters: {
      ...INITIAL_JOB_FILTERS,
      keywords: "DevOps",
      jobType: ["I"],
      timePosted: "r604800",
    },
    isBuiltIn: true,
  },
];
