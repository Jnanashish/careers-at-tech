import React from "react";
import Link from "next/link";
import { FLAGS } from "@/Helpers/featureFlags";

const NAV_LINKS = [
    { label: "Jobs", href: "/jobs", active: true },
    { label: "Companies", href: "/companies" },
    { label: "Salaries", href: "#" },
    { label: "Resources", href: "/resources" },
    { label: "Drops", href: "#" },
];

const Header = ({ onMobileMenu, compact = false }) => {
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

            {FLAGS.HEADER_NAV && (
                <nav className="hidden md:flex gap-7">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            className="v3-focus-ring rounded"
                            style={{
                                fontFamily: "var(--font-geist), sans-serif",
                                fontSize: 13.5,
                                fontWeight: 500,
                                color: l.active ? "var(--v3-ink-2)" : "var(--v3-mute)",
                            }}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>
            )}

            {(FLAGS.HEADER_AUTH || FLAGS.HEADER_POST_JOB) && (
                <div className="hidden md:flex items-center gap-3.5">
                    {FLAGS.HEADER_AUTH && (
                        <Link
                            href="#"
                            className="v3-focus-ring rounded"
                            style={{
                                fontFamily: "var(--font-geist), sans-serif",
                                fontSize: 13.5,
                                fontWeight: 500,
                                color: "var(--v3-mute)",
                            }}
                        >
                            Sign in
                        </Link>
                    )}
                    {FLAGS.HEADER_POST_JOB && (
                        <button
                            type="button"
                            className="v3-focus-ring inline-flex items-center gap-2 rounded-full"
                            style={{
                                background: "var(--v3-ink)",
                                color: "var(--v3-paper)",
                                border: "none",
                                padding: "10px 16px",
                                fontSize: 13,
                                fontWeight: 500,
                                cursor: "pointer",
                            }}
                        >
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--v3-acid)" }} />
                            Post a role · ₹4,800
                        </button>
                    )}
                </div>
            )}

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
                    {FLAGS.HEADER_POST_JOB && (
                        <button
                            type="button"
                            className="rounded-full font-v3-sans"
                            style={{
                                background: "var(--v3-ink)",
                                color: "var(--v3-paper)",
                                border: "none",
                                padding: "8px 14px",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            Post
                        </button>
                    )}
                    {FLAGS.HEADER_NAV && (
                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={onMobileMenu}
                            className="grid place-items-center"
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: 8,
                                border: "1px solid var(--v3-line)",
                                background: "var(--v3-paper)",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M3 12h18M3 18h18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
