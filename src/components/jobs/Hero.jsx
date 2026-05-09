import React from "react";
import { FLAGS } from "@/Helpers/featureFlags";

const Stat = ({ label, value, tiny, invert }) => (
    <div>
        <div
            className="v3-num font-v3-sans"
            style={{
                fontSize: tiny ? 22 : 28,
                fontWeight: 600,
                lineHeight: 1,
                color: invert ? "#fff" : "var(--v3-ink)",
            }}
        >
            {value}
        </div>
        <div
            style={{
                fontSize: 10.5,
                marginTop: 4,
                color: invert ? "rgba(250,250,247,0.6)" : "var(--v3-mute)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
            }}
        >
            {label}
        </div>
    </div>
);

const MicroStat = ({ label, value, sub, accent }) => (
    <div
        style={{
            border: "1px solid var(--v3-line)",
            borderRadius: 12,
            padding: "14px 16px",
            background: accent ? "var(--v3-acid)" : "var(--v3-paper)",
        }}
    >
        <div
            className="font-v3-mono"
            style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accent ? "var(--v3-ink-2)" : "var(--v3-mute)",
                fontWeight: 500,
            }}
        >
            {label}
        </div>
        <div className="flex items-baseline gap-2 mt-1.5">
            <span className="v3-num font-v3-serif" style={{ fontSize: 32, lineHeight: 1, color: "var(--v3-ink)" }}>
                {value}
            </span>
            <span
                className="font-v3-mono"
                style={{
                    fontSize: 11,
                    color: accent ? "var(--v3-ink-3)" : "var(--v3-mute)",
                }}
            >
                {sub}
            </span>
        </div>
    </div>
);

const Hero = ({ stats }) => {
    const open = stats?.open ?? 148;
    const todayDelta = stats?.todayDelta ?? "+18 today";
    const internships = stats?.internships ?? 38;
    const remote = stats?.remote ?? 61;
    const newGrad = stats?.newGrad ?? 84;

    return (
        <section
            className="bg-v3-dot-grid relative"
            style={{
                padding: "72px 56px 44px",
                borderBottom: "1px solid var(--v3-line-soft)",
                background: "var(--v3-paper)",
                backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(10,14,26,0.08) 1px, transparent 0)",
                backgroundSize: "24px 24px",
            }}
        >
            <div
                className="hero-grid"
                data-stats={FLAGS.HERO_STATS ? "on" : "off"}
                style={{ display: "grid", alignItems: "start", gap: 48 }}
            >
                <div>
                    <h1
                        className="font-v3-serif hero-title"
                        style={{
                            margin: 0,
                            color: "var(--v3-ink)",
                            fontWeight: 400,
                            letterSpacing: "-0.04em",
                            lineHeight: 0.92,
                        }}
                    >
                        The <span style={{ color: "var(--v3-accent)" }}>freshers&rsquo;</span> job board,
                        <br />
                        <em className="mr-3">curated </em> by hand.
                    </h1>

                    <p
                        className="font-v3-sans"
                        style={{
                            margin: "36px 0 0",
                            maxWidth: 580,
                            fontSize: 17,
                            lineHeight: 1.55,
                            color: "var(--v3-ink-3)",
                            fontWeight: 400,
                        }}
                    >
                        142 verified roles from companies that actually ship. Fresher-friendly, no recruiter spam,
                        and a single human reads every posting before it goes live.
                    </p>
                </div>

                {FLAGS.HERO_STATS && (
                    <div className="flex flex-col gap-5">
                        <div
                            className="relative overflow-hidden"
                            style={{
                                border: "1px solid var(--v3-line)",
                                borderRadius: 16,
                                padding: "24px 26px",
                                background: "var(--v3-ink)",
                                color: "var(--v3-paper)",
                            }}
                        >
                            <div className="flex justify-between items-baseline">
                                <span
                                    className="font-v3-mono"
                                    style={{
                                        fontSize: 11,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "rgba(250,250,247,0.6)",
                                        fontWeight: 500,
                                    }}
                                >
                                    Open right now
                                </span>
                                <span
                                    className="font-v3-mono"
                                    style={{ fontSize: 11, color: "var(--v3-acid)" }}
                                >
                                    {todayDelta}
                                </span>
                            </div>
                            <div
                                className="v3-num font-v3-serif"
                                style={{ fontSize: 96, lineHeight: 1, marginTop: 8 }}
                            >
                                {open}
                            </div>
                            <div
                                className="flex gap-5"
                                style={{
                                    marginTop: 14,
                                    paddingTop: 14,
                                    borderTop: "1px solid rgba(255,255,255,0.12)",
                                }}
                            >
                                <Stat label="Internships" value={internships} tiny invert />
                                <Stat label="Remote" value={remote} tiny invert />
                                <Stat label="New grad" value={newGrad} tiny invert />
                            </div>
                        </div>

                        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
                            <MicroStat label="Avg time-to-offer" value="9d" sub="−2d w/w" />
                            <MicroStat label="Companies hiring" value="62" sub="14 verified" accent />
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .hero-grid {
                    grid-template-columns: 1fr;
                }
                .hero-title {
                    font-size: 34px;
                    line-height: 0.95;
                }
                @media (min-width: 1024px) {
                    .hero-grid[data-stats="on"] {
                        grid-template-columns: 1.6fr 1fr;
                    }
                    .hero-title {
                        font-size: 100px;
                        line-height: 0.92;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
