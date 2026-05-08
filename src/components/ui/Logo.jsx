import React from "react";
import Image from "next/image";

const SIZES = {
    32: "w-8 h-8 text-base",
    40: "w-10 h-10 text-xl",
    52: "w-[52px] h-[52px] text-2xl",
    64: "w-16 h-16 text-3xl",
};

const Logo = ({ company = "", logoUrl = null, logoBg = "#0A0E1A", size = 52, rounded = 12 }) => {
    const initial = (company || "?").trim().charAt(0).toUpperCase() || "?";
    const px = size;
    const fontSize = Math.round(px * 0.5);
    const sizeStyle = { width: px, height: px, borderRadius: rounded };

    if (logoUrl) {
        return (
            <div
                className="relative overflow-hidden bg-white flex-shrink-0"
                style={{ ...sizeStyle, boxShadow: "inset 0 0 0 1px rgba(10,14,26,0.06)" }}
            >
                <Image src={logoUrl} alt={`${company} logo`} fill sizes={`${px}px`} className="object-contain p-1" />
            </div>
        );
    }

    return (
        <div
            className="grid place-items-center text-white flex-shrink-0 font-v3-serif"
            style={{
                ...sizeStyle,
                background: logoBg,
                fontSize,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
                lineHeight: 1,
            }}
        >
            {initial}
        </div>
    );
};

export default Logo;
