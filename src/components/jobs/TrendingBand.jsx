import React from "react";
import { MOCK_TRENDING } from "./data";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H2NYOSbdwqd6JVV8ABEHjE";

const TrendingBand = ({ items = MOCK_TRENDING, onSelect }) => (
    <section
        style={{
            padding: "40px 56px",
            borderTop: "1px solid var(--v3-line-soft)",
            borderBottom: "1px solid var(--v3-line-soft)",
            background: "var(--v3-paper-2)",
        }}
        className="v3-trending-band"
    >
        <div className="band-grid items-center gap-8" style={{ display: "grid" }}>
            <div>
                <div
                    className="font-v3-mono"
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--v3-mute)",
                        fontWeight: 500,
                        marginBottom: 10,
                    }}
                >
                    Trending searches · live
                </div>
                <div
                    className="font-v3-serif band-title"
                    style={{ lineHeight: 1, letterSpacing: "-0.02em", color: "var(--v3-ink)" }}
                >
                    What <em style={{ color: "var(--v3-accent)" }}>everyone</em> is looking at right now.
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                    {items.map((t, i) => (
                        <button
                            key={t.tag}
                            type="button"
                            onClick={() => onSelect?.(t.tag)}
                            className="inline-flex items-center gap-2 rounded-full cursor-pointer v3-focus-ring"
                            style={{
                                padding: "8px 14px",
                                border: "1px solid var(--v3-line)",
                                background: "var(--v3-paper)",
                                fontSize: 13,
                                fontWeight: 500,
                                color: "var(--v3-ink-2)",
                            }}
                        >
                            <span className="font-v3-mono" style={{ fontSize: 10.5, color: "var(--v3-mute)" }}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            {t.tag}
                            <span
                                className="font-v3-mono"
                                style={{
                                    fontSize: 11,
                                    padding: "2px 6px",
                                    borderRadius: 4,
                                    background: "var(--v3-accent-soft)",
                                    color: "var(--v3-accent-deep)",
                                }}
                            >
                                {t.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <div
                className="relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #128C7E 0%, #25D366 100%)",
                    color: "#fff",
                    borderRadius: 18,
                    padding: 28,
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: -40,
                        right: -40,
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.2)",
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.18)",
                    }}
                />
                <div
                    className="font-v3-mono"
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: 500,
                        marginBottom: 8,
                    }}
                >
                    Drops · Mon 7AM
                </div>
                <div className="font-v3-serif drop-title" style={{ lineHeight: 1.05 }}>
                    Get the drop <em>before</em> everyone else.
                </div>
                <div
                    className="font-v3-sans"
                    style={{ fontSize: 13.5, marginTop: 10, opacity: 0.9, maxWidth: 320 }}
                >
                    24,000 builders. One curated list of new roles every Monday at 7AM IST.
                </div>
                <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block cursor-pointer v3-focus-ring"
                    style={{
                        marginTop: 18,
                        background: "#fff",
                        color: "#128C7E",
                        border: "none",
                        padding: "12px 18px",
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 600,
                    }}
                >
                    Join the WhatsApp drop →
                </a>
            </div>
        </div>

        <style jsx>{`
            .band-grid {
                grid-template-columns: 1fr;
            }
            .band-title {
                font-size: 36px;
            }
            .drop-title {
                font-size: 28px;
            }
            @media (min-width: 1024px) {
                .band-grid {
                    grid-template-columns: 1.4fr 1fr;
                }
                .band-title {
                    font-size: 56px;
                }
                .drop-title {
                    font-size: 36px;
                }
            }
        `}</style>
    </section>
);

export default TrendingBand;
