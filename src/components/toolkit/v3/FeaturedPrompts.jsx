import React from "react";
import SectionHead from "./SectionHead";
import PromptCardV3 from "./PromptCardV3";

const FeaturedPrompts = ({ prompts, layout = "hero" }) => {
    if (!prompts || prompts.length === 0) return null;

    const items = prompts.slice(0, 3);
    const [first, ...rest] = items;

    return (
        <section className="bg-cat-surface-soft px-4 md:px-8 py-14 md:py-20">
            <div className="max-w-[1100px] mx-auto">
                <SectionHead
                    eyebrow="Featured prompts"
                    eyebrowColor="teal"
                    title="The 3 prompts most freshers start with."
                    sub="Battle-tested across 1,800+ resumes. If you only try one thing, try the top one."
                />

                {layout === "row" ? (
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-[14px] md:gap-5">
                        {items.map((p) => (
                            <PromptCardV3 key={p.slug || p.id} prompt={p} variant="standard" />
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5 items-stretch">
                        <PromptCardV3 prompt={first} variant="featured" />
                        <div className="grid grid-cols-1 gap-4 content-stretch">
                            {rest.map((p) => (
                                <PromptCardV3
                                    key={p.slug || p.id}
                                    prompt={p}
                                    variant="compact"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedPrompts;
