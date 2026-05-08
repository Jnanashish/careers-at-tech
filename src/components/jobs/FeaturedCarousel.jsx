import React from "react";
import FeaturedCard from "./FeaturedCard";

const FeaturedCarousel = ({ jobs, saved, onSave, onSelect }) => {
    if (!jobs || jobs.length === 0) return null;
    return (
        <section style={{ marginBottom: 28 }}>
            <div className="flex items-baseline justify-between mb-4 gap-3 flex-wrap">
                <div className="flex items-baseline gap-3.5">
                    <span
                        className="font-v3-serif"
                        style={{ fontSize: 32, color: "var(--v3-ink)", lineHeight: 1 }}
                    >
                        Featured this week
                    </span>
                    <span
                        className="font-v3-mono"
                        style={{
                            fontSize: 11,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--v3-mute)",
                            fontWeight: 500,
                        }}
                    >
                        Hand-picked · {jobs.length}
                    </span>
                </div>
                <span
                    className="v3-underline-link font-v3-mono cursor-pointer"
                    style={{ fontSize: 12, color: "var(--v3-ink-2)" }}
                >
                    View all featured →
                </span>
            </div>
            <div className="v3-scroll-x flex gap-4 carousel-row" style={{ paddingBottom: 8 }}>
                {jobs.map((j) => (
                    <FeaturedCard
                        key={j.id}
                        job={j}
                        saved={saved.has(j.id)}
                        onSave={onSave}
                        onClick={() => onSelect?.(j)}
                    />
                ))}
            </div>
            <style jsx>{`
                .carousel-row :global(article) {
                    width: 280px;
                }
                @media (min-width: 768px) {
                    .carousel-row :global(article) {
                        width: 320px;
                    }
                }
            `}</style>
        </section>
    );
};

export default FeaturedCarousel;
