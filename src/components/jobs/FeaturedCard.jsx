import React from "react";
import Logo from "@/components/ui/Logo";
import Pill from "@/components/ui/Pill";

const FeaturedCard = ({ job, saved, onSave, onClick }) => {
    return (
        <article
            className="v3-card-hov flex flex-col flex-shrink-0 cursor-pointer"
            style={{
                width: 320,
                border: "1px solid var(--v3-line)",
                borderRadius: 18,
                overflow: "hidden",
                background: "var(--v3-paper)",
            }}
            role="link"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                }
            }}
        >
            <div
                className="relative flex items-end"
                style={{
                    height: 110,
                    background: job.logoBg,
                    padding: 16,
                }}
            >
                <span
                    className="font-v3-mono absolute"
                    style={{
                        top: 12,
                        right: 12,
                        fontSize: 10.5,
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.18)",
                        color: "#fff",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                    }}
                >
                    ★ FEATURED
                </span>
                <div className="flex items-center gap-3" style={{ color: "#fff" }}>
                    <Logo company={job.company} logoUrl={job.logoUrl} logoBg={job.logoBg} size={40} rounded={8} />
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.9 }}>{job.company}</div>
                        <div className="font-v3-mono" style={{ fontSize: 11, opacity: 0.7 }}>
                            {[job.location, job.mode].filter(Boolean).join(" · ")}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 flex-1" style={{ padding: 16 }}>
                <div
                    className="font-v3-serif"
                    style={{ fontSize: 22, lineHeight: 1.1, color: "var(--v3-ink)" }}
                >
                    {job.role}
                </div>
                {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {job.tags.slice(0, 3).map((t) => (
                            <Pill key={t} sm tone="ghost">
                                {t}
                            </Pill>
                        ))}
                    </div>
                )}
                <div className="flex-1" />
                <div
                    className="flex items-center justify-between"
                    style={{ borderTop: "1px solid var(--v3-line-soft)", paddingTop: 12 }}
                >
                    <div>
                        <div
                            className="font-v3-mono"
                            style={{
                                fontSize: 11,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "var(--v3-mute)",
                                fontWeight: 500,
                            }}
                        >
                            Comp
                        </div>
                        <div className="font-v3-mono" style={{ fontSize: 13.5, fontWeight: 500, color: "var(--v3-ink)" }}>
                            {job.salary || "—"}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSave?.(job.id);
                        }}
                        className="rounded-full inline-flex items-center gap-1.5 cursor-pointer v3-focus-ring"
                        style={{
                            background: "var(--v3-ink)",
                            color: "var(--v3-paper)",
                            border: "none",
                            padding: "9px 14px",
                            fontSize: 12.5,
                            fontWeight: 500,
                        }}
                    >
                        {saved ? "✓ Saved" : "View"} <span>→</span>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default FeaturedCard;
