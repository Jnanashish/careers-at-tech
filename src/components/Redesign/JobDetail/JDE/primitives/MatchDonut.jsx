import React from "react";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// TODO: replace with real match API
const MatchDonut = ({ score, size = 56 }) => {
    const filled = (score / 100) * CIRCUMFERENCE;
    const gap = CIRCUMFERENCE - filled;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 56 56"
            role="img"
            aria-label={`Match: ${score}%`}
            style={{ flexShrink: 0 }}
        >
            {/* track */}
            <circle
                cx="28"
                cy="28"
                r={RADIUS}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="4"
            />
            {/* fill */}
            <circle
                cx="28"
                cy="28"
                r={RADIUS}
                fill="none"
                stroke="var(--jde-brand, #2563EB)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${filled} ${gap}`}
                strokeDashoffset={CIRCUMFERENCE * 0.25}
                style={{ transition: "stroke-dasharray 0.5s ease" }}
            />
            <text
                x="28"
                y="28"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
                fill="#111827"
            >
                {score}%
            </text>
        </svg>
    );
};

export default MatchDonut;
