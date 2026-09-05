import React from "react";

// Optical sizes. Manrope ExtraBold runs wide, so tracking is pulled tight and
// the sizes sit a notch below the equivalent Inter step.
const SIZES = {
    sm: "text-[1.0625rem]", // 17px — mobile nav, drawer header
    md: "text-[1.25rem]", // 20px — desktop nav
    lg: "text-[1.5rem]", // 24px — footer, standalone brand blocks
};

/**
 * Text-only brand wordmark: "CareersAt" in ink, ".Tech" in brand blue.
 *
 * Replaces the outlined-path `careersattech-biglogo.svg` (~70KB of vector
 * glyphs) that used to load on every page that renders a header. Real text —
 * so it stays crisp at any size, inherits the theme, and is readable by
 * crawlers and screen readers without an alt attribute.
 *
 * Wrap it in a `group` container (a Link, usually) — the accent rule under
 * ".Tech" wipes in on hover.
 */
const Wordmark = ({ size = "md", className = "" }) => (
    <span
        className={`group/wm inline-flex items-center whitespace-nowrap font-manrope font-extrabold leading-none tracking-[-0.04em] ${SIZES[size]} ${className}`}
    >
        <span className="text-text-primary">CareersAt</span>
        <span className="relative text-primary">
            .Tech
            <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-[0.3em] right-0 h-[2px] origin-left scale-x-0 rounded-full bg-primary transition-transform duration-200 ease-out group-hover/wm:scale-x-100 group-focus-visible/wm:scale-x-100 motion-reduce:transition-none"
            />
        </span>
    </span>
);

export default Wordmark;
