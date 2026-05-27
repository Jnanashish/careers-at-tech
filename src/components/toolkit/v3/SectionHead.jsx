import React from "react";

const EYEBROW_COLORS = {
    primary: "text-cat-primary",
    warm: "text-cat-accent-warm",
    teal: "text-cat-accent-teal",
    plum: "text-cat-accent-plum",
    ink: "text-cat-fg-dim",
};

const SectionHead = ({ eyebrow, title, sub, center = false, eyebrowColor = "ink", className = "" }) => (
    <div
        className={`${center ? "text-center mx-auto" : "text-left"} max-w-[720px] ${center ? "" : ""} ${className}`}
    >
        {eyebrow && (
            <div className={`text-[12px] font-semibold uppercase tracking-[1.2px] mb-3 ${EYEBROW_COLORS[eyebrowColor] || EYEBROW_COLORS.ink}`}>
                {eyebrow}
            </div>
        )}
        <h2 className="text-[28px] md:text-[34px] font-semibold leading-[1.2] text-cat-ink m-0 tracking-[-0.3px]">
            {title}
        </h2>
        {sub && (
            <p
                className={`text-[16px] text-cat-fg-muted leading-[1.6] mt-[14px] ${center ? "mx-auto max-w-[620px]" : "max-w-[600px]"}`}
            >
                {sub}
            </p>
        )}
    </div>
);

export default SectionHead;
