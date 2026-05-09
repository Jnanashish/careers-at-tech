import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionCard from "./primitives/SectionCard";
import { deterministicHueBg } from "@/widgets/JobList/utils";
import {
    formatBaseSalary,
    formatWorkMode,
    resolveCompanyLogo,
    formatPostedAgo,
} from "@/Helpers/jobV2helpers";

const SimilarCard = ({ job }) => {
    const logoBg = job.company?.logo?.bgColor || deterministicHueBg(job.companyName || "");
    const logoSrc = resolveCompanyLogo(job);
    const initial = (job.companyName || "?")[0].toUpperCase();
    const salary = formatBaseSalary(job.baseSalary);
    const mode = formatWorkMode(job.workMode);
    const postedAgo = formatPostedAgo(job.datePosted);

    return (
        <Link
            href={`/jobs/${job.slug}`}
            prefetch={false}
            className="flex flex-col gap-2.5 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{ background: "#FAFBFC" }}
        >
            {/* Top: logo + company + time */}
            <div className="flex items-center gap-2.5">
                <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                    style={{ background: logoBg }}
                >
                    {logoSrc ? (
                        <Image
                            src={logoSrc}
                            alt={`${job.companyName} logo`}
                            width={36}
                            height={36}
                            className="object-contain w-full h-full"
                        />
                    ) : (
                        <span className="text-white text-sm font-bold select-none">{initial}</span>
                    )}
                </div>
                <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-gray-600 truncate">{job.companyName}</p>
                    {postedAgo && (
                        <p className="font-jetbrains text-[10px] text-gray-400">{postedAgo} ago</p>
                    )}
                </div>
            </div>

            {/* Title */}
            <p className="font-fraunces text-[18px] font-medium text-gray-900 leading-snug">
                {job.title}
            </p>

            {/* Bottom: mode + salary pills */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
                {mode && (
                    <span className="inline-flex items-center bg-white border border-gray-200 text-gray-600 text-[11px] font-medium rounded-full px-2.5 py-0.5">
                        {mode}
                    </span>
                )}
                {salary && (
                    <span
                        className="font-jetbrains inline-flex items-center bg-white text-[11px] font-semibold rounded-full px-2.5 py-0.5 border"
                        style={{ borderColor: "#D1FADF", color: "#027A48" }}
                    >
                        {salary}
                    </span>
                )}
            </div>
        </Link>
    );
};

const JDESimilarRoles = ({ similarJobs }) => {
    if (!Array.isArray(similarJobs) || similarJobs.length === 0) return null;

    return (
        <SectionCard number="04" title="Similar roles" actionLabel="See all →" actionHref="/jobs">
            {/* Desktop: 3-col grid; Mobile: horizontal scroll */}
            <div className="hidden sm:grid grid-cols-3 gap-3">
                {similarJobs.slice(0, 6).map((j) => (
                    <SimilarCard key={j.slug} job={j} />
                ))}
            </div>
            <div className="flex sm:hidden gap-3 overflow-x-auto pb-1 no-scrollbar snap-x snap-mandatory">
                {similarJobs.slice(0, 6).map((j) => (
                    <div key={j.slug} className="snap-start flex-shrink-0 w-[260px]">
                        <SimilarCard job={j} />
                    </div>
                ))}
            </div>
        </SectionCard>
    );
};

export default JDESimilarRoles;
