import React from "react";

const Hero = () => {
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
                        Only verified roles from companies that actually ship — fresher-friendly, no recruiter spam.
                    </p>
                </div>
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
