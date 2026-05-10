import React, { useState } from "react";
import { ExternalLink, Share2 } from "lucide-react";
import { formatBaseSalary, formatWorkMode, formatJobLocations, resolveApplyUrl } from "@/Helpers/jobV2helpers";
import { trackJobApplyClick } from "@/core/apis/v2/client";

const JDEApplyCard = ({ job, daysLeft, isUrgent, expired }) => {
    const sparse = !job.baseSalary?.min;
    const salary = sparse ? null : formatBaseSalary(job.baseSalary);
    const mode = formatWorkMode(job.workMode);
    const locations = formatJobLocations(job.jobLocation);
    const applyUrl = resolveApplyUrl(job);

    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: `${job.title} at ${job.companyName}`,
            url: typeof window !== "undefined" ? window.location.href : "",
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch { /* user cancelled or unsupported */ }
    };

    const handleApply = () => {
        if (!applyUrl) return;
        try { trackJobApplyClick(job.slug); } catch { /* ignore */ }
        window.open(applyUrl, "_blank", "noopener,noreferrer");
    };

    // Status pill — "Accepting" fallback HIDDEN_FOR_API_INTEGRATION (see HIDDEN_FEATURES.md)
    let pillBg, pillText, pillDot, pillLabel;
    if (expired) {
        pillBg = "#F3F4F6"; pillText = "#6B7280"; pillDot = "#9CA3AF";
        pillLabel = "Closed";
    } else if (isUrgent) {
        pillBg = "var(--jde-brand-soft)"; pillText = "var(--jde-brand-ink)"; pillDot = "var(--jde-brand)";
        pillLabel = `Urgent · ${daysLeft}d left`;
    } else if (daysLeft != null && daysLeft > 0) {
        pillBg = "#ECFDF3"; pillText = "#027A48"; pillDot = "#12B76A";
        pillLabel = `Open · ${daysLeft} days left`;
    } else {
        pillLabel = null;
    }

    return (
        <div
            className="bg-white rounded-2xl p-[22px]"
            style={{
                border: "1px solid var(--jde-brand-soft-b)",
                boxShadow: "0 0 0 4px var(--jde-brand-soft), 0 12px 32px -8px rgba(16,24,40,.08)",
            }}
        >
            {/* Status pill — fixed height to prevent layout shift */}
            <div className="mb-4 min-h-[28px] flex items-center">
                {pillLabel && (
                    <span
                        className="inline-flex items-center gap-1.5 rounded-full font-jetbrains text-[10.5px] font-bold uppercase tracking-[0.06em] px-2.5 py-1"
                        style={{ background: pillBg, color: pillText }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-sm flex-shrink-0"
                            style={{ background: pillDot }}
                            aria-hidden="true"
                        />
                        {pillLabel}
                    </span>
                )}
            </div>

            {/* Salary */}
            <div className="mb-1">
                {salary ? (
                    <p
                        className="font-fraunces font-normal leading-[1.05] text-gray-900"
                        style={{ fontSize: "30px", letterSpacing: "-0.02em" }}
                    >
                        {salary}
                    </p>
                ) : (
                    <p
                        className="font-fraunces italic text-gray-400"
                        style={{ fontSize: "22px" }}
                    >
                        Pay not disclosed
                    </p>
                )}
            </div>
            <p className="text-[13px] text-gray-500 mb-5">
                {[job.employmentType?.map((t) =>
                    t === "FULL_TIME" ? "Full-time" :
                    t === "INTERN" ? "Internship" :
                    t === "CONTRACT" ? "Contract" : t
                ).join(" / "), locations, mode].filter(Boolean).join(" · ")}
            </p>

            {/* Apply / See similar + Share */}
            <div className="flex items-stretch gap-1.5">
                {expired ? (
                    <a
                        href="#similar"
                        className="flex items-center justify-center flex-1 rounded-[10px] px-4 py-2.5 text-[14px] font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        See similar roles ↓
                    </a>
                ) : (
                    <button
                        onClick={handleApply}
                        disabled={!applyUrl}
                        className="flex items-center justify-center gap-1.5 flex-1 rounded-[10px] px-4 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: "var(--jde-brand)",
                            boxShadow: "inset 0 0 0 1px var(--jde-brand-ink)",
                        }}
                    >
                        Apply on {job.companyName}
                        <ExternalLink size={14} aria-hidden="true" />
                    </button>
                )}
                <button
                    onClick={handleShare}
                    aria-label="Share job"
                    title={copied ? "Copied!" : "Share"}
                    className="flex items-center justify-center w-11 rounded-[10px] border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
                >
                    <Share2 size={15} aria-hidden="true" />
                </button>
            </div>
            {copied && (
                <p className="mt-1.5 text-[12px] text-gray-500 text-right">Link copied</p>
            )}

            {/* HIDDEN_FOR_API_INTEGRATION: Footer stats (avg response + applicants) — see HIDDEN_FEATURES.md
            <div className="mt-4 pt-3.5 border-t border-dashed border-gray-200 flex justify-between text-[12.5px] text-gray-500">
                <span>⚡ Avg response: <strong className="text-gray-700">4 days</strong></span>
                <span>👤 <strong className="text-gray-700">{applicants.toLocaleString()}</strong> applicants</span>
            </div>
            */}
        </div>
    );
};

export default JDEApplyCard;
