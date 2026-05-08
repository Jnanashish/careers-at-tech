import React from "react";
import Link from "next/link";

const COLS = [
    { h: "Browse", items: [
        { label: "All roles", href: "/jobs" },
        { label: "Internships", href: "/jobs?type=Internship" },
        { label: "Remote", href: "/jobs?loc=Remote" },
        { label: "New grad", href: "/jobs?batch=2025" },
        { label: "High paying", href: "/jobs" },
    ] },
    { h: "Resources", items: [
        { label: "Resume templates", href: "/tools/resume-templates" },
        { label: "Salary data", href: "#" },
        { label: "Interview kits", href: "/tools/resume-toolkit" },
        { label: "Drops archive", href: "#" },
    ] },
    { h: "About", items: [
        { label: "Manifesto", href: "/about" },
        { label: "Pricing", href: "#" },
        { label: "Contact", href: "/contact" },
        { label: "Press", href: "#" },
    ] },
];

const Footer = () => (
    <footer
        style={{
            background: "var(--v3-ink)",
            color: "var(--v3-paper)",
            padding: "64px 56px 32px",
        }}
    >
        <div
            className="footer-grid"
            style={{ display: "grid", gap: 40, marginBottom: 48 }}
        >
            <div>
                <div
                    className="font-v3-serif"
                    style={{ fontSize: 36, marginBottom: 12, lineHeight: 1.05 }}
                >
                    careers <em style={{ color: "var(--v3-acid)", fontStyle: "italic" }}>at</em> tech
                </div>
                <p
                    className="font-v3-sans"
                    style={{
                        fontSize: 14,
                        color: "rgba(250,250,247,0.65)",
                        maxWidth: 360,
                        lineHeight: 1.5,
                    }}
                >
                    A small, opinionated job board for the next wave of builders. One human reads every role.
                </p>
            </div>
            {COLS.map((c) => (
                <div key={c.h}>
                    <div
                        className="font-v3-mono"
                        style={{
                            fontSize: 11,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(250,250,247,0.5)",
                            fontWeight: 500,
                            marginBottom: 14,
                        }}
                    >
                        {c.h}
                    </div>
                    {c.items.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="block"
                            style={{
                                fontFamily: "var(--font-geist), sans-serif",
                                fontSize: 13.5,
                                marginBottom: 10,
                                color: "rgba(250,250,247,0.85)",
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            ))}
        </div>
        <div
            className="footer-bottom"
            style={{
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.10)",
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(250,250,247,0.5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
            }}
        >
            <span>© MMXXVI · ALL ROLES VERIFIED BY HUMANS</span>
            <span>SET IN INSTRUMENT SERIF &amp; GEIST</span>
        </div>

        <style jsx>{`
            .footer-grid {
                grid-template-columns: 1fr 1fr;
            }
            @media (min-width: 1024px) {
                .footer-grid {
                    grid-template-columns: 2fr 1fr 1fr 1fr;
                }
            }
        `}</style>
    </footer>
);

export default Footer;
