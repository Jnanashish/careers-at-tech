import React from "react";

const ResultsHeader = ({ count, sort }) => (
    <div className="flex items-baseline justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-baseline gap-3 flex-wrap">
            <h2
                className="font-v3-serif"
                style={{ margin: 0, fontSize: 36, lineHeight: 1, color: "var(--v3-ink)" }}
            >
                {count} <em>roles</em>
            </h2>
            <span className="font-v3-mono" style={{ fontSize: 12, color: "var(--v3-mute)" }}>
                · sorted by {String(sort || "Latest").toLowerCase()}
            </span>
        </div>
        <div className="hidden md:flex items-center gap-2.5">
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
                View
            </span>
            <div
                className="inline-flex"
                style={{
                    border: "1px solid var(--v3-line)",
                    borderRadius: 8,
                    overflow: "hidden",
                }}
            >
                <button
                    type="button"
                    aria-label="List view"
                    aria-pressed="true"
                    style={{
                        padding: "7px 10px",
                        background: "var(--v3-ink)",
                        color: "var(--v3-paper)",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                </button>
                <button
                    type="button"
                    aria-label="Grid view"
                    aria-pressed="false"
                    style={{
                        padding: "7px 10px",
                        background: "var(--v3-paper)",
                        color: "var(--v3-ink)",
                        border: "none",
                        borderLeft: "1px solid var(--v3-line)",
                        cursor: "pointer",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
);

export default ResultsHeader;
