import React from "react";
import Image from "next/image";

import mark from "@/static/Image/careersattech-mark.png";

// Optical sizes. Manrope ExtraBold runs wide, so tracking is pulled tight and
// the sizes sit a notch below the equivalent Inter step. The mark is sized to
// the text's cap height plus a little, so the lockup reads as one object.
const SIZES = {
    sm: { text: "text-[1.0625rem]", mark: 24, radius: 6, gap: "gap-2" }, // 17px — mobile nav, drawer header
    md: { text: "text-[1.25rem]", mark: 28, radius: 7, gap: "gap-2.5" }, // 20px — desktop nav
    lg: { text: "text-[1.5rem]", mark: 34, radius: 8, gap: "gap-3" }, // 24px — footer, standalone brand blocks
};

/**
 * Brand lockup: the "C" mark followed by "CareersAt" in ink and ".Tech" in
 * brand blue.
 *
 * The text is real text — it stays crisp at any size and is readable by
 * crawlers. The mark carries `alt=""` because every call site wraps this in a
 * link that already has an aria-label; giving it its own alt would make screen
 * readers announce the brand twice.
 *
 * Wrap it in a `group` container (a Link, usually) — the accent rule under
 * ".Tech" wipes in on hover.
 *
 * Pass `showMark={false}` for text-only contexts.
 */
const Wordmark = ({ size = "md", showMark = true, className = "" }) => {
    const s = SIZES[size];

    return (
        <span className={`group/wm inline-flex items-center ${s.gap} whitespace-nowrap ${className}`}>
            {showMark && (
                <Image
                    src={mark}
                    alt=""
                    width={s.mark}
                    height={s.mark}
                    priority
                    className="flex-shrink-0"
                    style={{ borderRadius: s.radius }}
                />
            )}
            <span
                className={`inline-flex items-center font-manrope font-extrabold leading-none tracking-[-0.04em] ${s.text}`}
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
        </span>
    );
};

export default Wordmark;
