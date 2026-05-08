import React from "react";
import Link from "next/link";
import { MOCK_RESOURCES } from "../data";

const RESOURCES_LINKS = [
    { ...MOCK_RESOURCES[0], href: "/tools/resume-templates" },
    { ...MOCK_RESOURCES[1], href: "/tools/resume-toolkit" },
    { ...MOCK_RESOURCES[2], href: "#" },
];

const Resources = () => (
    <div
        style={{
            background: "var(--v3-paper)",
            border: "1px solid var(--v3-line)",
            borderRadius: 16,
            padding: 18,
        }}
    >
        <div
            className="font-v3-mono"
            style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--v3-mute)",
                fontWeight: 500,
                marginBottom: 12,
            }}
        >
            Free resources
        </div>
        <div className="flex flex-col">
            {RESOURCES_LINKS.map((r, i) => (
                <Link
                    key={r.title}
                    href={r.href}
                    className="flex items-center gap-3 cursor-pointer v3-focus-ring"
                    style={{
                        padding: "10px 0",
                        borderBottom:
                            i < RESOURCES_LINKS.length - 1 ? "1px solid var(--v3-line-soft)" : "none",
                    }}
                >
                    <span style={{ fontSize: 18 }}>{r.emoji}</span>
                    <div className="flex-1">
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--v3-ink)" }}>{r.title}</div>
                        <div className="font-v3-mono" style={{ fontSize: 10.5, color: "var(--v3-mute)" }}>
                            {r.meta}
                        </div>
                    </div>
                    <span style={{ color: "var(--v3-mute)" }}>→</span>
                </Link>
            ))}
        </div>
    </div>
);

export default Resources;
