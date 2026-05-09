import React from "react";
import Image from "next/image";
import {
    formatBaseSalary,
    formatWorkMode,
    formatJobLocations,
    formatBatch,
    formatPostedAgo,
    pseudoViewCount,
    resolveCompanyLogo,
} from "@/Helpers/jobV2helpers";
import { deterministicHueBg } from "@/widgets/JobList/utils";
import SpecCell from "./primitives/SpecCell";

const shouldAnimate =
    typeof window !== "undefined"
        ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : true;

const TagPill = ({ children, style, className = "" }) => (
    <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium border ${className}`}
        style={style}
    >
        {children}
    </span>
);

const JDEHero = ({ job, daysLeft, isUrgent, expired }) => {
    const sparse = !job.baseSalary?.min;
    const salary = sparse ? null : formatBaseSalary(job.baseSalary);
    const locations = formatJobLocations(job.jobLocation);
    const mode = formatWorkMode(job.workMode);
    const batch = formatBatch(job.batch);
    const logoSrc = resolveCompanyLogo(job);
    const logoBg = job.company?.logo?.bgColor || deterministicHueBg(job.companyName || "");
    const views = pseudoViewCount(job.slug);
    const postedAgo = formatPostedAgo(job.datePosted);

    // Comma-italic title split
    const commaIdx = (job.title || "").indexOf(",");
    const titleMain = commaIdx >= 0 ? job.title.slice(0, commaIdx) : job.title;
    const titleSuffix = commaIdx >= 0 ? job.title.slice(commaIdx + 1).trim() : null;

    const isFeatured = job.sponsorship?.tier === "featured" || job.sponsorship?.tier === "sponsored";
    const isVerified = job.company?.isVerified;

    // Closes cell config
    const closesLabel = isUrgent ? "Closes soon" : "Closes";
    const closesValue = daysLeft != null
        ? daysLeft <= 0
            ? "Closed"
            : daysLeft === 0
            ? "Today"
            : `${daysLeft}d`
        : "—";
    const closesValueStyle = isUrgent ? { color: "var(--jde-brand)" } : undefined;
    const closesDate = job.validThrough
        ? new Date(job.validThrough).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
        : null;

    return (
        <section
            style={{
                background: "linear-gradient(to bottom, var(--jde-brand-soft, #EFF6FF), #F9FAFB)",
                borderBottom: "1px solid #E5E7EB",
            }}
        >
            <div className="max-w-[1280px] mx-auto px-5 lg:px-20 pt-10 pb-0">
                {/* HIDDEN_FOR_API_INTEGRATION: Breadcrumb — see HIDDEN_FEATURES.md
                <nav aria-label="breadcrumb" className="mb-5">
                    <p className="font-jetbrains text-[11px] uppercase tracking-[0.1em] text-gray-400">
                        <span className="hidden sm:inline">
                            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
                            {" / "}
                            <Link href="/jobs" className="hover:text-gray-600 transition-colors">Jobs</Link>
                            {" / "}
                            <span className="text-gray-500">{job.companyName}</span>
                            {" / "}
                        </span>
                        <span className="sm:hidden">
                            <Link href="/jobs" className="hover:text-gray-600 transition-colors">{job.companyName}</Link>
                            {" / "}
                        </span>
                        <span className="text-gray-800 font-semibold">{job.title}</span>
                    </p>
                </nav>
                */}

                {/* Expired banner */}
                {expired && (
                    <div
                        role="status"
                        className="flex items-start gap-3 rounded-xl px-4 py-3 mb-5 border"
                        style={{ background: "#FEF3C7", borderColor: "#F59E0B" }}
                    >
                        <span className="text-base" aria-hidden="true">⌛</span>
                        <p className="text-[13.5px] font-medium" style={{ color: "#B45309" }}>
                            This role has closed.{" "}
                            {closesDate && <>Applications were due {closesDate}.</>}
                        </p>
                    </div>
                )}

                {/* Tag pill row */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                    {job.employmentType && job.employmentType.length > 0 && (
                        <TagPill className="bg-white border-gray-200 text-gray-600">
                            {job.employmentType.map((t) =>
                                t === "FULL_TIME" ? "Full-time" :
                                t === "INTERN" ? "Internship" :
                                t === "CONTRACT" ? "Contract" : t
                            ).join(" / ")}
                        </TagPill>
                    )}
                    {isFeatured && (
                        <TagPill
                            className="border-0 font-semibold"
                            style={{
                                background: "var(--jde-brand-soft)",
                                color: "var(--jde-brand-ink)",
                                boxShadow: "inset 0 0 0 1px var(--jde-brand-soft-b)",
                            }}
                        >
                            ★ Featured
                        </TagPill>
                    )}
                    {isVerified && (
                        <TagPill className="bg-green-50 border-green-100" style={{ color: "#027A48" }}>
                            ✓ Verified
                        </TagPill>
                    )}
                    {job.topicTags && job.topicTags.length > 0 && (
                        <span className="font-jetbrains text-[11px] uppercase tracking-[0.07em] text-gray-400">
                            · {job.topicTags.slice(0, 2).join(" · ")}
                        </span>
                    )}
                </div>

                {/* Title block: HIDDEN_FOR_API_INTEGRATION removed match column — single col until restored */}
                <div className="grid grid-cols-1 gap-6 lg:gap-10 items-end mb-7">
                    {/* Left: logo + company + H1 */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="flex-shrink-0 w-[74px] h-[74px] rounded-[18px] flex items-center justify-center overflow-hidden"
                                style={{
                                    backgroundColor: logoBg,
                                    boxShadow: "0 6px 20px rgba(16,24,40,.12)",
                                }}
                            >
                                {logoSrc ? (
                                    <Image
                                        src={logoSrc}
                                        alt={job.company?.logo?.iconAlt || `${job.companyName} logo`}
                                        width={74}
                                        height={74}
                                        className="object-contain w-full h-full"
                                    />
                                ) : (
                                    <span className="text-white text-2xl font-bold select-none">
                                        {(job.companyName || "?")[0].toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <p className="text-[14px] font-semibold text-gray-600 leading-snug">
                                {job.companyName}
                            </p>
                        </div>
                        <h1
                            className="font-fraunces font-normal leading-none text-gray-900"
                            style={{
                                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                                letterSpacing: "-0.04em",
                                textWrap: "balance",
                            }}
                        >
                            {titleMain}
                            {titleSuffix && (
                                <>
                                    ,{" "}
                                    <em
                                        className="not-italic font-normal"
                                        style={{ color: "var(--jde-brand)" }}
                                    >
                                        {titleSuffix}
                                    </em>
                                </>
                            )}
                        </h1>
                    </div>

                    {/* HIDDEN_FOR_API_INTEGRATION: Match card — see HIDDEN_FEATURES.md
                    <div className="bg-white border border-gray-200 rounded-2xl p-[18px] flex items-center gap-3.5 lg:self-end">
                        <MatchDonut score={match} size={56} />
                        <div>
                            <p className="font-jetbrains text-[10px] uppercase tracking-[0.1em] text-gray-400 mb-0.5">
                                Your match
                            </p>
                            <p className="font-fraunces text-[18px] font-medium text-gray-900 leading-tight">
                                {match >= 80 ? "Strong match" : match >= 65 ? "Good match" : "Partial match"}
                            </p>
                            <p className="text-[12px] text-gray-500 mt-0.5">
                                {job.requiredSkills?.length ?? 0} of {(job.requiredSkills?.length ?? 0) + (job.preferredSkills?.length ?? 0)} skills
                            </p>
                        </div>
                    </div>
                    */}
                </div>

                {/* Spec strip */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        <SpecCell
                            first
                            label="Pay"
                            value={salary ?? "Not disclosed"}
                            valueStyle={sparse ? { fontStyle: "italic", color: "#98A2B3", fontSize: "18px" } : undefined}
                            delta={salary ? "+22% vs avg" : undefined}
                            deltaColor="#027A48"
                        />
                        <SpecCell
                            label="Location"
                            value={locations ?? "—"}
                            delta={mode ?? undefined}
                            deltaColor="#667085"
                        />
                        <SpecCell
                            label="Batch"
                            value={batch ?? "—"}
                            delta="eligible"
                            deltaColor="#667085"
                        />
                        <SpecCell
                            label={closesLabel}
                            value={closesValue}
                            valueStyle={closesValueStyle}
                            delta={closesDate}
                            deltaColor="#667085"
                        />
                    </div>
                </div>

                {/* Meta strip — HIDDEN_FOR_API_INTEGRATION dropped applicants + "updated 2 min ago"; see HIDDEN_FEATURES.md */}
                <div className="flex items-center justify-between flex-wrap gap-2 py-4 text-[12.5px] text-gray-500">
                    <p>
                        {postedAgo && <>Posted {postedAgo} ago · </>}
                        {views.toLocaleString()} views this week
                    </p>
                </div>
            </div>
        </section>
    );
};

export default JDEHero;
