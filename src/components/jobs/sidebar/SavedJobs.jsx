import React from "react";
import Logo from "@/components/ui/Logo";

const SavedJobs = ({ savedIds, jobs, onSelect }) => {
    const savedSet = savedIds instanceof Set ? savedIds : new Set(savedIds || []);
    const items = (jobs || []).filter((j) => savedSet.has(j.id)).slice(0, 3);
    return (
        <div
            style={{
                background: "var(--v3-paper)",
                border: "1px solid var(--v3-line)",
                borderRadius: 16,
                padding: 18,
            }}
        >
            <div className="flex items-center justify-between mb-3.5">
                <span
                    className="font-v3-mono"
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--v3-mute)",
                        fontWeight: 500,
                    }}
                >
                    Saved · {savedSet.size}
                </span>
                {savedSet.size > 0 && (
                    <span
                        className="v3-underline-link cursor-pointer"
                        style={{
                            fontSize: 12,
                            color: "var(--v3-accent-deep)",
                            fontWeight: 500,
                        }}
                    >
                        View all
                    </span>
                )}
            </div>
            {items.length === 0 ? (
                <div
                    className="font-v3-sans"
                    style={{
                        padding: "16px 0",
                        textAlign: "center",
                        fontSize: 12.5,
                        color: "var(--v3-mute)",
                    }}
                >
                    No saved roles yet · press{" "}
                    <span
                        className="font-v3-mono"
                        style={{
                            padding: "2px 5px",
                            border: "1px solid var(--v3-line)",
                            borderRadius: 4,
                        }}
                    >
                        ⌘S
                    </span>
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    {items.map((j) => (
                        <button
                            key={j.id}
                            type="button"
                            onClick={() => onSelect?.(j)}
                            className="flex items-center gap-2.5 text-left w-full cursor-pointer v3-focus-ring rounded"
                            style={{ background: "transparent", border: "none", padding: 0 }}
                        >
                            <Logo company={j.company} logoUrl={j.logoUrl} logoBg={j.logoBg} size={32} rounded={8} />
                            <div className="flex-1 min-w-0">
                                <div
                                    style={{
                                        fontSize: 12.5,
                                        fontWeight: 500,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        color: "var(--v3-ink)",
                                    }}
                                >
                                    {j.role}
                                </div>
                                <div className="font-v3-mono" style={{ fontSize: 10.5, color: "var(--v3-mute)" }}>
                                    {j.company}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
