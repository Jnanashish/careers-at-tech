// templates.js — built-in quick-start templates. Each returns a full state object.
import { emptyState, emptyJob, emptyReferral } from "./linkedin-params";

export const TEMPLATES = [
  {
    name: "Remote internships",
    mode: "job",
    state: () =>
      Object.assign(emptyState(), {
        mode: "job",
        job: Object.assign(emptyJob(), {
          workMode: ["2"],
          jobType: ["I"],
          experience: ["1"],
          timePosted: "r604800",
          sortBy: "DD",
        }),
      }),
  },
  {
    name: "Entry-level SDE · Bengaluru",
    mode: "job",
    state: () =>
      Object.assign(emptyState(), {
        mode: "job",
        job: Object.assign(emptyJob(), {
          keywords: "Software Engineer",
          location: "Bengaluru",
          jobType: ["F"],
          experience: ["2"],
          sortBy: "DD",
          timePosted: "r2592000",
        }),
      }),
  },
  {
    name: "Fresher full-time · remote",
    mode: "job",
    state: () =>
      Object.assign(emptyState(), {
        mode: "job",
        job: Object.assign(emptyJob(), {
          workMode: ["2"],
          jobType: ["F"],
          experience: ["2"],
          easyApply: true,
          sortBy: "DD",
        }),
      }),
  },
  {
    name: "Referrers at FAANG",
    mode: "referral",
    state: () =>
      Object.assign(emptyState(), {
        mode: "referral",
        referral: Object.assign(emptyReferral(), {
          company: "Google",
          role: "Software Engineer",
          degree: ["S", "O"],
          location: "India",
        }),
      }),
  },
];
