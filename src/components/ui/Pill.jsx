import React from "react";

const TONES = {
    ink:     { bg: "transparent",         fg: "var(--v3-ink)",         bd: "var(--v3-line)" },
    accent:  { bg: "var(--v3-accent-soft)", fg: "var(--v3-accent-deep)", bd: "transparent" },
    acid:    { bg: "var(--v3-acid)",       fg: "var(--v3-ink)",         bd: "transparent" },
    dark:    { bg: "var(--v3-ink)",        fg: "#fff",                  bd: "var(--v3-ink)" },
    success: { bg: "#E8F8EF",              fg: "#006B3F",               bd: "transparent" },
    warn:    { bg: "#FFF1DA",              fg: "#7A4400",               bd: "transparent" },
    ghost:   { bg: "var(--v3-paper-2)",    fg: "var(--v3-ink-2)",       bd: "transparent" },
};

const Pill = ({ children, tone = "ink", sm = false, className = "" }) => {
    const t = TONES[tone] || TONES.ink;
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full whitespace-nowrap ${className}`}
            style={{
                padding: sm ? "3px 8px" : "5px 10px",
                background: t.bg,
                color: t.fg,
                border: `1px solid ${t.bd}`,
                fontSize: sm ? 10.5 : 11.5,
                fontWeight: 500,
            }}
        >
            {children}
        </span>
    );
};

export default Pill;
