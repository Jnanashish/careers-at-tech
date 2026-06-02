import React from "react";
import Link from "next/link";

const Header = ({ compact = false }) => {
    return (
        <header
            className="sticky top-0 z-30 flex items-center justify-between"
            style={{
                background: "var(--v3-paper)",
                borderBottom: "1px solid var(--v3-line-soft)",
                padding: "20px 56px",
                transform: compact ? "translateY(-100%)" : "translateY(0)",
                opacity: compact ? 0 : 1,
                pointerEvents: compact ? "none" : "auto",
                transition: "transform 0.28s ease, opacity 0.2s ease",
                willChange: "transform",
            }}
        >
            <div className="hidden md:flex items-center gap-3">
                <Link href="/jobs" className="flex items-center gap-3 v3-focus-ring rounded">
                    <span
                        className="grid place-items-center font-v3-serif italic"
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: 8,
                            background: "var(--v3-ink)",
                            color: "var(--v3-paper)",
                            fontSize: 22,
                            lineHeight: 1,
                        }}
                    >
                        c
                    </span>
                    <span className="font-v3-serif" style={{ fontSize: 22, color: "var(--v3-ink)" }}>
                        careers <em style={{ color: "var(--v3-accent)" }}>at</em> tech
                    </span>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-3.5">
                <Link
                    href="/resume-prompts"
                    className="v3-focus-ring inline-flex items-center gap-2 rounded-full"
                    style={{
                        background: "var(--v3-ink)",
                        color: "var(--v3-paper)",
                        textDecoration: "none",
                        padding: "10px 16px",
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "var(--font-geist), sans-serif",
                    }}
                >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--v3-acid)" }} />
                    Resume Prompts · free
                </Link>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center justify-between w-full gap-3">
                <Link href="/jobs" className="flex items-center gap-2">
                    <span className="font-v3-serif" style={{ fontSize: 18, color: "var(--v3-ink)" }}>
                        careers <em style={{ color: "var(--v3-accent)" }}>at</em> tech
                    </span>
                    <span
                        className="font-v3-mono"
                        style={{
                            fontSize: 10,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: "var(--v3-acid)",
                            color: "var(--v3-ink)",
                        }}
                    >
                        v3
                    </span>
                </Link>
                <div className="flex items-center gap-2">
                    <Link
                        href="/resume-prompts"
                        className="rounded-full font-v3-sans inline-flex items-center gap-1.5"
                        style={{
                            background: "var(--v3-ink)",
                            color: "var(--v3-paper)",
                            textDecoration: "none",
                            padding: "8px 14px",
                            fontSize: 12,
                            fontWeight: 500,
                        }}
                    >
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--v3-acid)" }} />
                        Resume Prompts
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
