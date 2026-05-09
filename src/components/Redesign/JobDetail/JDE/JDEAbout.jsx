import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionCard from "./primitives/SectionCard";
import MiniStat from "./primitives/MiniStat";
import { deterministicHueBg } from "@/widgets/JobList/utils";
import { resolveCompanyLogo } from "@/Helpers/jobV2helpers";

const JDEAbout = ({ job }) => {
    const company = job.company;
    if (!company) return null;

    const hasContent =
        company.description?.short ||
        company.description?.long ||
        company.foundedYear ||
        company.employeeCount ||
        company.headquarters;
    if (!hasContent) return null;

    const logoBg = company.logo?.bgColor || deterministicHueBg(job.companyName || "");
    const logoSrc = resolveCompanyLogo(job);
    const initial = (job.companyName || "?")[0].toUpperCase();
    const openRoles = 4; // placeholder — real value would come from API
    const openRolesDelta = `+${Math.max(1, Math.floor(openRoles / 4))}`;

    const desc = company.description?.short || company.description?.long || "";
    const hasTechStack = Array.isArray(job.topicTags) && job.topicTags.length > 0;

    return (
        <SectionCard number="03" title={`About ${job.companyName}`}>
            {/* 2-col: logo card + description */}
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6 mb-6">
                {/* Logo card */}
                <div
                    className="rounded-2xl p-[18px] flex flex-col justify-between"
                    style={{
                        background: logoBg,
                        aspectRatio: "1 / 1.05",
                    }}
                >
                    <div
                        className="w-[52px] h-[52px] rounded-xl flex items-center justify-center overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}
                    >
                        {logoSrc ? (
                            <Image
                                src={logoSrc}
                                alt={company.logo?.iconAlt || `${job.companyName} logo`}
                                width={52}
                                height={52}
                                className="object-contain w-full h-full"
                            />
                        ) : (
                            <span className="text-white text-xl font-bold select-none">{initial}</span>
                        )}
                    </div>
                    <div className="mt-auto pt-4">
                        <p className="font-fraunces text-[22px] font-medium text-white leading-snug">
                            {job.companyName}
                        </p>
                        {job.topicTags?.[0] && (
                            <p className="font-jetbrains text-[10.5px] uppercase tracking-[0.07em] text-white/70 mt-1">
                                {job.topicTags[0]}
                            </p>
                        )}
                    </div>
                </div>

                {/* Description + links */}
                <div className="flex flex-col justify-between gap-4">
                    <p className="text-[14.5px] text-gray-800 leading-[1.65]">{desc}</p>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 text-[13px]">
                        {company.website && (
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-gray-800 hover:opacity-70 transition-opacity"
                            >
                                Website ↗
                            </a>
                        )}
                        {company.careerPageLink && (
                            <a
                                href={company.careerPageLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-gray-800 hover:opacity-70 transition-opacity"
                            >
                                Career page ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* 4-up mini stats */}
            {(company.foundedYear || company.employeeCount || company.headquarters) && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {company.foundedYear && (
                        <MiniStat label="Founded" value={company.foundedYear} />
                    )}
                    {company.employeeCount && (
                        <MiniStat label="Team size" value={company.employeeCount} />
                    )}
                    {company.headquarters && (
                        <MiniStat label="HQ" value={company.headquarters} />
                    )}
                    <MiniStat label="Open roles" value={String(openRoles)} delta={openRolesDelta} />
                </div>
            )}

            {/* Tech stack from topicTags */}
            {hasTechStack && (
                <div className="border-t border-dashed border-gray-200 pt-5">
                    <p className="font-jetbrains text-[10.5px] uppercase tracking-[0.08em] text-gray-400 mb-3">
                        Tech · topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {job.topicTags.map((tag) => (
                            <span
                                key={tag}
                                className="font-jetbrains text-[11.5px] px-2.5 py-1 rounded-md text-gray-700"
                                style={{ background: "#F2F4F7" }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </SectionCard>
    );
};

export default JDEAbout;
