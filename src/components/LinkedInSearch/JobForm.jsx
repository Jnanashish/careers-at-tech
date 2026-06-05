import React from "react";
import { MultiChips, Select, SwitchRow } from "./FormControls";
import { TIME_POSTED, SORT_BY, WORK_MODE, JOB_TYPE, EXPERIENCE } from "./lib/linkedin-params";

const INPUT =
  "w-full h-[46px] px-[14px] text-[14px] tracking-[0.2px] text-cat-fg bg-white border border-cat-border rounded-[8px] placeholder:text-cat-fg-hint transition-colors focus:outline-none focus:border-cat-primary focus-visible:ring-[3px] focus-visible:ring-cat-primary/20";
const LABEL = "block text-[14px] font-medium text-cat-fg mb-[9px]";

const JobForm = ({ job, set, keywordsRef }) => (
  <div className="bg-white border border-cat-border rounded-[14px] p-6 space-y-[22px]">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
      <div>
        <label className={LABEL} htmlFor="li-kw">Keywords</label>
        <input
          id="li-kw"
          ref={keywordsRef}
          type="text"
          className={INPUT}
          placeholder="e.g. Frontend Developer"
          value={job.keywords}
          onChange={(e) => set({ keywords: e.target.value })}
        />
      </div>
      <div>
        <label className={LABEL} htmlFor="li-loc">Location</label>
        <input
          id="li-loc"
          type="text"
          className={INPUT}
          placeholder="e.g. Bengaluru"
          value={job.location}
          onChange={(e) => set({ location: e.target.value })}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
      <div>
        <span className={LABEL}>Time posted</span>
        <Select
          options={TIME_POSTED}
          value={job.timePosted}
          onChange={(v) => set({ timePosted: v })}
          ariaLabel="Time posted"
        />
      </div>
      <div>
        <span className={LABEL}>Sort by</span>
        <Select
          options={SORT_BY}
          value={job.sortBy}
          onChange={(v) => set({ sortBy: v })}
          ariaLabel="Sort by"
        />
      </div>
    </div>

    <div>
      <span className={LABEL}>Work mode</span>
      <MultiChips
        name="Work mode"
        options={WORK_MODE}
        values={job.workMode}
        onChange={(v) => set({ workMode: v })}
      />
    </div>

    <div>
      <span className={LABEL}>Job type</span>
      <MultiChips
        name="Job type"
        options={JOB_TYPE}
        values={job.jobType}
        onChange={(v) => set({ jobType: v })}
      />
    </div>

    <div>
      <span className={LABEL}>Experience level</span>
      <MultiChips
        name="Experience level"
        options={EXPERIENCE}
        values={job.experience}
        onChange={(v) => set({ experience: v })}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
      <div>
        <span className={LABEL}>Easy Apply</span>
        <SwitchRow
          checked={job.easyApply}
          onChange={(v) => set({ easyApply: v })}
          title="Easy Apply only"
          sub="Skip company sites"
        />
      </div>
      <div>
        <label className={LABEL} htmlFor="li-sal">Min salary</label>
        <div className="relative">
          <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[14px] text-cat-fg-dim pointer-events-none">
            ₹
          </span>
          <input
            id="li-sal"
            type="text"
            inputMode="numeric"
            className={`${INPUT} pl-7`}
            placeholder="e.g. 6,00,000"
            value={job.minSalary}
            onChange={(e) => set({ minSalary: e.target.value })}
          />
        </div>
        <p className="text-[10px] text-cat-fg-hint mt-[7px] leading-[1.45]">
          Shown in your summary — LinkedIn can&rsquo;t filter ₹ salary via URL.
        </p>
      </div>
    </div>
  </div>
);

export default JobForm;
