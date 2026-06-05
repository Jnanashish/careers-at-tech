import React from "react";
import { MultiChips } from "./FormControls";
import { DEGREE } from "./lib/linkedin-params";

const INPUT =
  "w-full h-[46px] px-[14px] text-[14px] tracking-[0.2px] text-cat-fg bg-white border border-cat-border rounded-[8px] placeholder:text-cat-fg-hint transition-colors focus:outline-none focus:border-cat-primary focus-visible:ring-[3px] focus-visible:ring-cat-primary/20";
const LABEL = "block text-[14px] font-medium text-cat-fg mb-[9px]";

const ReferralForm = ({ referral, set, companyRef }) => (
  <div className="bg-white border border-cat-border rounded-[14px] p-6 space-y-[22px]">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
      <div>
        <label className={LABEL} htmlFor="li-co">Company</label>
        <input
          id="li-co"
          ref={companyRef}
          type="text"
          className={INPUT}
          placeholder="e.g. Razorpay"
          value={referral.company}
          onChange={(e) => set({ company: e.target.value })}
        />
      </div>
      <div>
        <label className={LABEL} htmlFor="li-role">Role of referrer</label>
        <input
          id="li-role"
          type="text"
          className={INPUT}
          placeholder="e.g. Software Engineer"
          value={referral.role}
          onChange={(e) => set({ role: e.target.value })}
        />
      </div>
    </div>

    <div>
      <span className={LABEL}>Connection degree</span>
      <MultiChips
        name="Connection degree"
        options={DEGREE}
        values={referral.degree}
        onChange={(v) => set({ degree: v })}
      />
      <p className="text-[10px] text-cat-fg-hint mt-[7px] leading-[1.45]">
        2nd-degree connections are the sweet spot for warm intros.
      </p>
    </div>

    <div>
      <label className={LABEL} htmlFor="li-rloc">Location</label>
      <input
        id="li-rloc"
        type="text"
        className={INPUT}
        placeholder="e.g. India"
        value={referral.location}
        onChange={(e) => set({ location: e.target.value })}
      />
    </div>
  </div>
);

export default ReferralForm;
