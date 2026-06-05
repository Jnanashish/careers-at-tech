// url-builder.js — pure LinkedIn URL + summary logic for the CareersAtTech URL builder.
// Ported from the design handoff (builder-core.js). No DOM, no React — pure functions
// over the { mode, job, referral } state object.

import {
  TIME_POSTED,
  WORK_MODE,
  JOB_TYPE,
  EXPERIENCE,
  DEGREE,
  JT_NOUN,
  EXP_ADJ,
  emptyJob,
  emptyReferral,
  emptyState,
} from "./linkedin-params";

// ---------- helpers ----------
function labelsFor(vocab, values) {
  return values
    .map((v) => (vocab.find((o) => o.value === v) || {}).label)
    .filter(Boolean);
}

function joinList(arr) {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

export function titleish(s) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function titleishFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---------- is there anything set? ----------
export function jobIsEmpty(j) {
  return (
    !j.keywords &&
    !j.location &&
    !j.timePosted &&
    !j.minSalary &&
    j.workMode.length === 0 &&
    j.jobType.length === 0 &&
    j.experience.length === 0 &&
    !j.easyApply
  );
}

export function referralIsEmpty(r) {
  return !r.company && !r.role && !r.location && r.degree.length === 0;
}

export function isEmpty(state) {
  return state.mode === "job"
    ? jobIsEmpty(state.job)
    : referralIsEmpty(state.referral);
}

// ---------- URL builders ----------
export function buildJobUrl(j) {
  const p = new URLSearchParams();
  if (j.keywords) p.set("keywords", j.keywords);
  if (j.location) p.set("location", j.location);
  if (j.timePosted) p.set("f_TPR", j.timePosted);
  if (j.sortBy) p.set("sortBy", j.sortBy);
  if (j.workMode.length) p.set("f_WT", j.workMode.join(","));
  if (j.jobType.length) p.set("f_JT", j.jobType.join(","));
  if (j.experience.length) p.set("f_E", j.experience.join(","));
  if (j.easyApply) p.set("f_AL", "true");
  // Min salary is intentionally NOT emitted — LinkedIn has no INR salary param.
  const qs = p.toString();
  return `https://www.linkedin.com/jobs/search/${qs ? "?" + qs : ""}`;
}

export function buildReferralUrl(r) {
  const p = new URLSearchParams();
  // People search has no clean free-text company/location param without geo/company
  // URNs, so role + company + location all fold into the keywords query.
  const kw = [r.role, r.company, r.location]
    .map((s) => (s || "").trim())
    .filter(Boolean)
    .join(" ");
  if (kw) p.set("keywords", kw);
  if (r.degree.length) p.set("network", JSON.stringify(r.degree)); // ["F","S","O"]
  p.set("origin", "FACETED_SEARCH");
  const qs = p.toString();
  return `https://www.linkedin.com/search/results/people/${qs ? "?" + qs : ""}`;
}

export function buildUrl(state) {
  return state.mode === "job"
    ? buildJobUrl(state.job)
    : buildReferralUrl(state.referral);
}

// ---------- plain-English summaries ----------
function jobSummary(j) {
  if (jobIsEmpty(j)) return "";

  // subject noun from job types
  const subject = j.jobType.length
    ? joinList(j.jobType.map((v) => JT_NOUN[v] || "roles"))
    : "roles";

  // leading adjectives: experience (skip if redundant with internship type) + work mode
  const adj = [];
  const typeHasInternship = j.jobType.includes("I");
  j.experience.forEach((v) => {
    if (v === "1" && typeHasInternship) return; // avoid "internship internships"
    adj.push(EXP_ADJ[v]);
  });
  const wm = labelsFor(WORK_MODE, j.workMode);
  let lead = "";
  if (adj.length) lead += `${joinList(adj)} `;
  if (wm.length) lead += `${joinList(wm)} `;

  let sentence = titleishFirst(`${lead}${subject}`.trim());
  if (j.keywords) sentence += ` matching "${j.keywords}"`;
  if (j.location) sentence += ` in ${titleish(j.location)}`;

  const tail = [];
  const tp = (TIME_POSTED.find((o) => o.value === j.timePosted) || {}).label;
  if (j.timePosted)
    tail.push(`posted ${tp.toLowerCase().replace("past ", "in the past ")}`);
  if (j.sortBy === "DD") tail.push("newest first");
  if (j.easyApply) tail.push("Easy Apply only");
  if (j.minSalary) tail.push(`min ₹${j.minSalary.replace(/^₹\s*/, "")}`);
  if (tail.length) sentence += ` — ${tail.join(", ")}`;
  return `${sentence}.`;
}

function referralSummary(r) {
  if (referralIsEmpty(r)) return "";
  const deg = labelsFor(DEGREE, r.degree);
  let s = "People";
  if (r.role) s += ` working as ${r.role}`;
  if (r.company) s += ` at ${titleish(r.company)}`;
  if (r.location) s += ` in ${titleish(r.location)}`;
  if (deg.length) s += `, within your ${joinList(deg)} degree network`;
  return `${s} — your referral shortlist.`;
}

export function summary(state) {
  return state.mode === "job"
    ? jobSummary(state.job)
    : referralSummary(state.referral);
}

// ---------- active-filter chips (for the removable bar) ----------
// each chip: { key, label, apply() -> next state }
export function activeChips(state) {
  const out = [];
  if (state.mode === "job") {
    const j = state.job;
    const set = (patch) => ({ ...state, job: { ...j, ...patch } });
    if (j.keywords)
      out.push({ key: "kw", label: `“${j.keywords}”`, apply: () => set({ keywords: "" }) });
    if (j.location)
      out.push({ key: "loc", label: titleish(j.location), apply: () => set({ location: "" }) });
    if (j.timePosted)
      out.push({
        key: "tp",
        label: (TIME_POSTED.find((o) => o.value === j.timePosted) || {}).label,
        apply: () => set({ timePosted: "" }),
      });
    if (j.sortBy === "DD")
      out.push({ key: "sb", label: "Most recent", apply: () => set({ sortBy: "R" }) });
    j.workMode.forEach((v) =>
      out.push({
        key: `wm${v}`,
        label: (WORK_MODE.find((o) => o.value === v) || {}).label,
        apply: () => set({ workMode: j.workMode.filter((x) => x !== v) }),
      })
    );
    j.jobType.forEach((v) =>
      out.push({
        key: `jt${v}`,
        label: (JOB_TYPE.find((o) => o.value === v) || {}).label,
        apply: () => set({ jobType: j.jobType.filter((x) => x !== v) }),
      })
    );
    j.experience.forEach((v) =>
      out.push({
        key: `ex${v}`,
        label: (EXPERIENCE.find((o) => o.value === v) || {}).label,
        apply: () => set({ experience: j.experience.filter((x) => x !== v) }),
      })
    );
    if (j.easyApply)
      out.push({ key: "ea", label: "Easy Apply", apply: () => set({ easyApply: false }) });
    if (j.minSalary)
      out.push({
        key: "ms",
        label: `₹${j.minSalary.replace(/^₹\s*/, "")}+`,
        apply: () => set({ minSalary: "" }),
      });
  } else {
    const r = state.referral;
    const set = (patch) => ({ ...state, referral: { ...r, ...patch } });
    if (r.company)
      out.push({ key: "co", label: titleish(r.company), apply: () => set({ company: "" }) });
    if (r.role) out.push({ key: "ro", label: r.role, apply: () => set({ role: "" }) });
    if (r.location)
      out.push({ key: "rl", label: titleish(r.location), apply: () => set({ location: "" }) });
    r.degree.forEach((v) =>
      out.push({
        key: `dg${v}`,
        label: `${(DEGREE.find((o) => o.value === v) || {}).label} degree`,
        apply: () => set({ degree: r.degree.filter((x) => x !== v) }),
      })
    );
  }
  return out;
}

export function clearActive(state) {
  if (state.mode === "job") return { ...state, job: emptyJob() };
  return { ...state, referral: emptyReferral() };
}

// ---------- merge a partial/decoded blob into a fresh, safe state ----------
export function hydrateState(parsed) {
  const base = emptyState();
  if (!parsed) return base;
  base.mode = parsed.mode === "referral" ? "referral" : "job";
  if (parsed.job) base.job = Object.assign(emptyJob(), parsed.job);
  if (parsed.referral) base.referral = Object.assign(emptyReferral(), parsed.referral);
  return base;
}

// ---------- hash encode / decode (share a config) ----------
export function encode(state) {
  try {
    const json = JSON.stringify(state);
    return `cfg=${btoa(unescape(encodeURIComponent(json)))}`;
  } catch {
    return "";
  }
}

export function decode(hash) {
  try {
    const m = /cfg=([^&]+)/.exec(hash || "");
    if (!m) return null;
    const json = decodeURIComponent(escape(atob(m[1])));
    return hydrateState(JSON.parse(json));
  } catch {
    return null;
  }
}
