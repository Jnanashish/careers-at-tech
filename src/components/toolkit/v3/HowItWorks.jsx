import React from "react";
import SectionHead from "./SectionHead";

const STEPS = [
    {
        n: "01",
        title: "Tell us what's wrong",
        body: "Pick the situation that sounds like yours — or search the library if you already know.",
    },
    {
        n: "02",
        title: "Copy the prompt",
        body: "One click. The prompt comes with all the context an AI needs to be actually useful.",
    },
    {
        n: "03",
        title: "Paste, run, ship",
        body: "Open ChatGPT, Claude, or Gemini. Free tier is fine. Read what comes back, paste into your resume.",
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-white border-t border-cat-divider px-4 md:px-8 py-14 md:py-20">
            <div className="max-w-[1100px] mx-auto">
                <SectionHead
                    eyebrow="How it works"
                    eyebrowColor="teal"
                    title="Three clicks, five minutes, real progress."
                    sub="No account, no upload, nothing to install. The toolkit hands you the words; you bring the rest."
                />
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-[14px] md:gap-5">
                    {STEPS.map((s) => (
                        <div
                            key={s.n}
                            className="bg-white border border-cat-border rounded-[14px] p-7 shadow-[var(--cat-shadow-card)] transition-all duration-300 hover:border-cat-accent-teal hover:-translate-y-0.5 hover:shadow-[var(--cat-shadow-card-hover)]"
                        >
                            <div className="font-serif-display text-[40px] text-cat-accent-teal leading-none mb-[14px] font-normal">
                                {s.n}
                            </div>
                            <h3 className="text-[18px] font-semibold text-cat-ink m-0 mb-2 tracking-[0.1px]">
                                {s.title}
                            </h3>
                            <p className="text-[14px] text-cat-fg-muted leading-[1.6] m-0">
                                {s.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
