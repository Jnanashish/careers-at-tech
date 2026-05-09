import React, { useState } from "react";
import Logo from "@/components/ui/Logo";
import Pill from "@/components/ui/Pill";
import { FLAGS } from "@/Helpers/featureFlags";

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

const JobCardMobile = ({ job, saved, onSave, onClick }) => {
    const hasPills = job.featured || (FLAGS.CARD_MATCH_SCORE && job.matchScore) || (FLAGS.CARD_CLOSING_DEADLINE && job.urgency > 0.7 && job.deadline);
    const [hovered, setHovered] = useState(false);
    return (
    <article
        className="v3-card-hov cursor-pointer relative"
        role="link"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
            }
        }}
        style={{
            border: "1px solid var(--v3-line)",
            borderRadius: 16,
            background: "var(--v3-paper)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
        }}
    >
        {FLAGS.CARD_SAVE && (
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onSave?.(job.id);
                }}
                aria-label={saved ? "Unsave role" : "Save role"}
                aria-pressed={saved}
                className="grid place-items-center cursor-pointer absolute v3-focus-ring"
                style={{
                    top: 12,
                    right: 12,
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
        )}

        <div className="flex gap-3 items-start" style={{ paddingRight: FLAGS.CARD_SAVE ? 40 : 0 }}>
            <Logo company={job.company} logoUrl={job.logoUrl} logoBg={job.logoBg} size={40} rounded={10} />
            <div className="flex-1 min-w-0">
                {hasPills && (
                    <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 6 }}>
                        {job.featured && (
                            <Pill sm tone="acid">
                                ★ Featured
                            </Pill>
                        )}
                        {FLAGS.CARD_MATCH_SCORE && (
                            <Pill sm tone={job.matchScore >= 80 ? "success" : "ghost"}>
                                {job.matchScore}% match
                            </Pill>
                        )}
                        {FLAGS.CARD_CLOSING_DEADLINE && job.urgency > 0.7 && job.deadline && (
                            <Pill sm tone="warn">
                                ⏱ Closes {job.deadline}
                            </Pill>
                        )}
                    </div>
                )}
                <h3
                    className="font-v3-serif"
                    style={{
                        margin: 0,
                        fontSize: 20,
                        lineHeight: 1.1,
                        color: "var(--v3-ink)",
                    }}
                >
                    {job.role}
                </h3>
                <div
                    className="flex items-center gap-1.5 flex-wrap mt-1.5"
                    style={{ fontSize: 12, color: "var(--v3-ink-3)" }}
                >
                    <span style={{ fontWeight: 600 }}>{job.company}</span>
                    {job.location && (<><Dot /><span style={{ fontWeight: 500 }}>{job.location}</span></>)}
                    {job.mode && (<><Dot /><span>{job.mode}</span></>)}
                    {job.type && (<><Dot /><span>{job.type}</span></>)}
                </div>
            </div>
        </div>

        <div
            className="flex items-center gap-3 font-v3-mono"
            style={{ fontSize: 11, color: "var(--v3-mute)", flexWrap: "wrap" }}
        >
            <span>{job.views.toLocaleString()} views</span>
            {job.posted && <span>· posted {job.posted} ago</span>}
            {job.salary && <span>· {job.salary}</span>}
        </div>

        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            className="rounded-full inline-flex items-center justify-center gap-1.5 cursor-pointer v3-focus-ring"
            style={{
                background: "transparent",
                color: "var(--v3-ink-3)",
                border: "1px solid var(--v3-line)",
                width: "100%",
                padding: "11px 14px",
                fontSize: 13,
                fontWeight: 500,
                marginTop: 4,
            }}
        >
            View job <span aria-hidden="true" style={{ display: "inline-block", transition: "transform 0.2s ease", transform: hovered ? "rotate(-45deg)" : "rotate(0deg)" }}>→</span>
        </button>
    </article>
    );
};

export default JobCardMobile;
