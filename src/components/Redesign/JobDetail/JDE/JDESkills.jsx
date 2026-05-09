import React from "react";
import SectionCard from "./primitives/SectionCard";

const RequiredChip = ({ label }) => (
    <span
        className="inline-flex items-center rounded-full text-[13px] font-medium text-white px-3.5 py-1.5"
        style={{
            background: "var(--jde-brand)",
            boxShadow: "inset 0 0 0 1px var(--jde-brand-ink)",
        }}
    >
        {label}
    </span>
);

const PreferredChip = ({ label }) => (
    <span className="inline-flex items-center rounded-full text-[13px] text-gray-600 bg-white px-3 py-1.5 border border-dashed border-gray-300">
        {label}
    </span>
);

const JDESkills = ({ job }) => {
    const required = Array.isArray(job.requiredSkills) ? job.requiredSkills : [];
    const preferred = Array.isArray(job.preferredSkills) ? job.preferredSkills : [];
    const total = required.length + preferred.length;

    if (total === 0) return null;

    const singleColumn = preferred.length === 0;

    return (
        <SectionCard number="02" title="Skills" count={`${total} total`}>
            {singleColumn ? (
                <div className="flex flex-wrap gap-2">
                    {required.map((s) => <RequiredChip key={s} label={s} />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                    {/* Required column */}
                    <div className="pr-6 sm:border-r border-gray-200">
                        <p className="font-fraunces text-[20px] font-medium text-gray-900 mb-3">
                            Required
                            <span className="font-jetbrains text-[11px] font-normal text-gray-400 ml-2 align-middle">
                                {required.length}
                            </span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {required.map((s) => <RequiredChip key={s} label={s} />)}
                        </div>
                    </div>
                    {/* Preferred column */}
                    <div className="pl-0 sm:pl-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                        <p className="font-fraunces text-[20px] font-medium text-gray-500 italic mb-3">
                            Nice to have
                            <span className="font-jetbrains text-[11px] font-normal text-gray-400 ml-2 align-middle not-italic">
                                {preferred.length}
                            </span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {preferred.map((s) => <PreferredChip key={s} label={s} />)}
                        </div>
                    </div>
                </div>
            )}
        </SectionCard>
    );
};

export default JDESkills;
