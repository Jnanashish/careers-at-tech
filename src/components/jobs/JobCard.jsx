import React from "react";
import Logo from "@/components/ui/Logo";
import Pill from "@/components/ui/Pill";

const Dot = () => (
    <span
        aria-hidden="true"
        style={{
            width: 3,
            height: 3,
            borderRadius: 1,
            background: "var(--v3-line)",
            display: "inline-block",
        }}
    />
);

const JobCard = ({ job, saved, onSave, onClick }) => {
    const railW = 184;
    const pad = 20;

    return (
        <article
            className="v3-card-hov cursor-pointer"
            role="link"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                }
            }}
            style={{
                display: "grid",
                gridTemplateColumns: `1fr ${railW}px`,
                border: "1px solid var(--v3-line)",
                borderRadius: 16,
                overflow: "hidden",
                background: "var(--v3-paper)",
            }}
        >
            <div
                className="flex gap-4 items-start"
                style={{ padding: pad }}
            >
                <Logo company={job.company} logoUrl={job.logoUrl} logoBg={job.logoBg} size={52} rounded={12} />
                <div className="flex-1 flex flex-col gap-2.5 min-w-0">
                    <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {job.featured && (
                                <Pill sm tone="acid">
                                    ★ Featured
                                </Pill>
                            )}
                            <Pill sm tone={job.matchScore >= 80 ? "success" : "ghost"}>
                                {job.matchScore}% match
                            </Pill>
                            {job.urgency > 0.7 && job.deadline && (
                                <Pill sm tone="warn">
                                    ⏱ Closes {job.deadline}
                                </Pill>
                            )}
                        </div>
                        <h3
                            className="font-v3-serif"
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.05,
                                color: "var(--v3-ink)",
                            }}
                        >
                            {job.role}
                        </h3>
                        <div
                            className="flex items-center gap-2 mt-2 flex-wrap"
                            style={{ fontSize: 12.5, color: "var(--v3-ink-3)" }}
                        >
                            <span style={{ fontWeight: 600 }}>{job.company}</span>
                            {job.location && (<><Dot /><span style={{ fontWeight: 500 }}>{job.location}</span></>)}
                            {job.mode && (<><Dot /><span>{job.mode}</span></>)}
                            {job.type && (<><Dot /><span>{job.type}</span></>)}
                            {job.exp && (<><Dot /><span>{job.exp}</span></>)}
                            {job.batch && (
                                <>
                                    <Dot />
                                    <span className="font-v3-mono" style={{ color: "var(--v3-mute)" }}>
                                        Batch {job.batch}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-3 font-v3-mono"
                        style={{ fontSize: 11.5, color: "var(--v3-mute)" }}
                    >
                        <span className="inline-flex items-center gap-1">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            {job.views.toLocaleString()} views
                        </span>
                        {job.posted && (
                            <span className="inline-flex items-center gap-1">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v5l3 2" />
                                </svg>
                                posted {job.posted} ago
                            </span>
                        )}
                        {job.applicants > 0 && (
                            <span className="inline-flex items-center gap-1">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                </svg>
                                {job.applicants.toLocaleString()} applicants
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="flex flex-col justify-between gap-3"
                style={{
                    padding: pad,
                    borderLeft: "1px solid var(--v3-line-soft)",
                    background: "linear-gradient(180deg, var(--v3-paper) 0%, var(--v3-paper-2) 100%)",
                }}
            >
                <div className="flex justify-end items-start">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSave?.(job.id);
                        }}
                        aria-label={saved ? "Unsave role" : "Save role"}
                        aria-pressed={saved}
                        className="grid place-items-center cursor-pointer v3-focus-ring"
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "1px solid var(--v3-line)",
                            background: saved ? "var(--v3-ink)" : "var(--v3-paper)",
                            color: saved ? "var(--v3-paper)" : "var(--v3-ink-3)",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                    </button>
                </div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (job.applyUrl) {
                            window.open(job.applyUrl, "_blank", "noopener,noreferrer");
                        } else {
                            onClick?.();
                        }
                    }}
                    className="rounded-full inline-flex items-center justify-center gap-1.5 cursor-pointer v3-focus-ring"
                    style={{
                        background: "var(--v3-ink)",
                        color: "var(--v3-paper)",
                        border: "none",
                        width: "100%",
                        padding: "10px 14px",
                        fontSize: 12.5,
                        fontWeight: 500,
                    }}
                >
                    Apply now <span>→</span>
                </button>
            </div>
        </article>
    );
};

export default JobCard;
