import React from "react";

const Donut = ({ value = 0, size = 56, stroke = 6 }) => {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const offset = c * (1 - Math.max(0, Math.min(100, value)) / 100);
    return (
        <svg width={size} height={size} aria-hidden="true">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--v3-paper-3)" strokeWidth={stroke} />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="var(--v3-accent)"
                strokeWidth={stroke}
                strokeDasharray={c}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                fontSize={Math.round(size * 0.28)}
                fontWeight={600}
                fill="var(--v3-ink)"
            >
                {value}
            </text>
        </svg>
    );
};

export default Donut;
