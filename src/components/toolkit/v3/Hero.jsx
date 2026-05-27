import React from "react";
import { ArrowRight } from "lucide-react";
import LiveDemoCard from "./LiveDemoCard";
import Btn from "./Btn";

const Hero = ({ liveCount = 1847 }) => {
    return (
        <section className="relative overflow-hidden border-b border-cat-divider bg-gradient-to-b from-cat-blue-bg via-white to-white px-4 md:px-8 pt-12 pb-14 md:pt-[72px] md:pb-20">
            <div className="relative z-[1] max-w-[920px] mx-auto text-center">
                {/* Stat pill */}
                <div className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full bg-white border border-cat-border text-[12px] font-medium text-cat-fg-muted mb-6 tracking-[0.14px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cat-success cat-pulse-dot" />
                    {liveCount.toLocaleString("en-IN")} freshers fixed their resume this month
                </div>

                <h1 className="font-serif-display font-normal leading-[1.05] tracking-[-0.5px] text-cat-ink m-0 mb-[18px] text-[40px] md:text-[60px]">
                    Your resume isn&apos;t bad.
                    <br />
                    It&apos;s just{" "}
                    <em className="italic text-cat-primary">invisible.</em>
                </h1>

                <p className="text-[16px] md:text-[19px] text-cat-fg-muted leading-[1.55] m-0 mx-auto mb-9 max-w-[600px] tracking-[0.14px]">
                    94% of fresher resumes get auto-rejected before a human reads
                    them. We made a free pile of AI prompts that fix yours — in
                    5 minutes, no signup, no paywall.
                </p>

                <LiveDemoCard />

                <div className="flex flex-wrap gap-3 justify-center mt-9">
                    <Btn variant="primary" href="#diagnose">
                        Fix mine now <ArrowRight size={14} />
                    </Btn>
                    <Btn variant="secondary" href="#library">
                        Browse 50+ prompts
                    </Btn>
                </div>
            </div>
        </section>
    );
};

export default Hero;
