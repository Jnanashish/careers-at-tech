import React from "react";
import { MOCK_TRENDING } from "../data";

const TrendingNow = ({ items = MOCK_TRENDING, onSelect }) => (
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
                Trending now
            </span>
            <span
                aria-hidden="true"
                style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--v3-rose)" }}
            />
        </div>
        <div className="flex flex-col gap-2">
            {items.map((t, i) => (
                <button
                    key={t.tag}
                    type="button"
                    onClick={() => onSelect?.(t.tag)}
                    className="flex items-center justify-between text-left cursor-pointer w-full v3-focus-ring"
                    style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        background: "var(--v3-paper-2)",
                        border: "none",
                    }}
                >
                    <div className="flex items-center gap-2.5">
                        <span className="font-v3-mono" style={{ fontSize: 11, color: "var(--v3-mute)" }}>
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--v3-ink)" }}>{t.tag}</span>
                    </div>
                    <span
                        className="font-v3-mono"
                        style={{
                            fontSize: 11,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: "var(--v3-accent-soft)",
                            color: "var(--v3-accent-deep)",
                        }}
                    >
                        {t.count}
                    </span>
                </button>
            ))}
        </div>
    </div>
);

export default TrendingNow;
