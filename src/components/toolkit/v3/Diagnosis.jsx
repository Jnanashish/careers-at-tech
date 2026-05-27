import React, { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, ArrowDown, TrendingUp, ExternalLink } from "lucide-react";
import SectionHead from "./SectionHead";
import Badge from "./Badge";
import { firebaseEventHandler } from "@/core/eventHandler";

export const DIAGNOSIS = [
    {
        id: "ghosted",
        headline: "I keep getting ghosted.",
        body: "You apply and apply. Nothing comes back. Not even a rejection.",
        promptSlug: "keyword-gap-analysis",
        prompt_title: "ATS keyword gap analysis vs. a job description",
        prompt_intro:
            "Most likely an ATS rejection. This prompt finds the top 12 keywords missing from your resume vs. the JD — and tells you exactly where to add each.",
        example_before: "Worked on backend systems.",
        example_after:
            "Built a Node.js + PostgreSQL inventory API serving 4,200 daily requests with p95 latency under 90ms (final-year project, used by 3 student clubs).",
        stat: "From 4% to 38% reply rate",
        sub_stat: "Avg. across 230 freshers, last 30 days",
    },
    {
        id: "noexp",
        headline: "I have nothing to talk about.",
        body: "No internship. No job. Just college, side projects, and a couple of hackathons.",
        promptSlug: "fresher-project-to-bullet",
        prompt_title: "Turn a college project into 3 strong bullets",
        prompt_intro:
            "A college project is real work — your resume just doesn't say so yet. This prompt rewrites a one-paragraph description into three STAR-format bullets that sound like a job, without overclaiming.",
        example_before: "Made a clone of Zomato for college project.",
        example_after:
            "Built a 3-screen food-ordering web app with React + Firebase; modeled cart + checkout state, integrated Razorpay test mode, deployed to Vercel (Web Dev coursework, May 2025).",
        stat: "Used by 1,247 freshers",
        sub_stat: "First-time SDE applicants",
    },
    {
        id: "switch",
        headline: "I'm switching from non-CS.",
        body: "You did B.Com, mech, or 2 years in BPO. Now you've learned to code. How do you say that without it sounding desperate?",
        promptSlug: "non-cs-to-tech-pivot",
        prompt_title: "Translate non-tech work into tech-relevant bullets",
        prompt_intro:
            "Don't hide the pivot — frame it. This prompt turns past sales/ops/teaching/finance work into bullets that map to engineering-relevant skills (data, systems, communication) without lying.",
        example_before:
            "Worked at HDFC bank for 2 years before learning to code.",
        example_after:
            "Automated daily reconciliation of ~1,400 transactions using Excel + VBA, cutting team's manual work by 6 hrs/week. (Foundation for picking up Python + SQL in 2024.)",
        stat: "62% land tech roles in 6 months",
        sub_stat: "Self-reported, cohort of 84",
    },
    {
        id: "tailor",
        headline: "There's one job I really want.",
        body: "Razorpay SDE-1. Zomato frontend. The one you'd take. You don't want to send the same resume you sent to everyone.",
        promptSlug: "tailor-resume-to-jd",
        prompt_title: "Tailor my resume to a specific job description",
        prompt_intro:
            "Paste the JD, then your resume. The prompt returns a re-ordered, keyword-aligned version + a one-line cover note. Done in under 90 seconds.",
        example_before: "Skills: Java, Python, SQL, HTML, CSS, Git.",
        example_after:
            "Skills (for Razorpay SDE-1): Java, Spring Boot, REST APIs, PostgreSQL, distributed systems basics, Git. (Reordered to match top-listed JD keywords.)",
        stat: "+3.4× interview rate",
        sub_stat: "Tailored vs. untailored, n=412",
    },
];

const DiagCard = ({ d, open, onOpen }) => (
    <button
        onClick={onOpen}
        aria-expanded={open}
        className={`block text-left cursor-pointer font-[inherit] p-6 rounded-[14px] border transition-all duration-200 ${
            open
                ? "bg-cat-accent-teal-bg border-cat-accent-teal shadow-[0_4px_16px_rgba(13,148,136,0.12)] -translate-y-px"
                : "bg-white border-cat-border shadow-[var(--cat-shadow-card)] hover:bg-cat-surface-soft hover:shadow-[0_2px_12px_rgba(16,24,40,0.06)]"
        }`}
    >
        <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
                <h3 className="font-serif-display text-[24px] md:text-[26px] font-normal text-cat-ink m-0 mb-2 leading-[1.15] tracking-[-0.2px]">
                    &ldquo;{d.headline}&rdquo;
                </h3>
                <p className="text-[14px] text-cat-fg-muted leading-[1.55] m-0">
                    {d.body}
                </p>
            </div>
            <span
                className={`w-[34px] h-[34px] rounded-full flex-shrink-0 border flex items-center justify-center transition-colors ${
                    open
                        ? "bg-cat-accent-teal text-white border-cat-accent-teal"
                        : "bg-white text-cat-accent-teal border-cat-border"
                }`}
            >
                {open ? <Check size={14} /> : <ArrowRight size={14} />}
            </span>
        </div>
    </button>
);

const DiagDetail = ({ d }) => {
    const [copied, setCopied] = useState(false);
    const copy = useCallback(() => {
        try {
            navigator.clipboard.writeText(d.prompt_title);
        } catch (_) {}
        setCopied(true);
        firebaseEventHandler("toolkit_diagnosis_copy", {
            diagnosis_id: d.id,
            prompt_slug: d.promptSlug,
        });
        setTimeout(() => setCopied(false), 1400);
    }, [d]);

    return (
        <div className="cat-rise-in relative mt-4 bg-white border border-cat-accent-teal rounded-[14px] p-6 md:p-8 shadow-[0_12px_40px_rgba(13,148,136,0.10)]">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-cat-accent-teal rotate-45" />

            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-8">
                <div>
                    <Badge variant="teal">The prompt for this</Badge>
                    <h3 className="text-[20px] md:text-[22px] font-semibold text-cat-ink mt-3 mb-2.5 tracking-[0.1px] leading-[1.3]">
                        {d.prompt_title}
                    </h3>
                    <p className="text-[15px] text-cat-fg-muted leading-[1.6] m-0 mb-5">
                        {d.prompt_intro}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                        <button
                            onClick={copy}
                            className={`inline-flex items-center gap-2 min-h-[44px] px-[18px] py-3 rounded-[8px] text-[14px] font-semibold tracking-[0.14px] text-white border-0 cursor-pointer transition-colors ${
                                copied ? "bg-cat-green-ink" : "bg-cat-primary hover:bg-cat-primary-light"
                            }`}
                        >
                            {copied ? <Check size={13} /> : <Copy size={13} />}
                            {copied ? "Copied to clipboard" : "Copy the prompt"}
                        </button>
                        <Link
                            href={`/resume-prompts/${d.promptSlug}`}
                            className="inline-flex items-center gap-2 min-h-[44px] px-[18px] py-3 rounded-[8px] text-[14px] font-medium text-cat-ink bg-white border border-cat-border tracking-[0.14px] hover:bg-cat-accent-teal-bg hover:border-cat-accent-teal transition-colors"
                        >
                            Read full prompt <ExternalLink size={12} />
                        </Link>
                    </div>

                    {d.stat && (
                        <div className="mt-6 p-[14px] bg-cat-surface-soft rounded-[10px] border border-cat-border flex items-center gap-[14px]">
                            <div className="w-9 h-9 rounded-full bg-cat-green-bg text-cat-green-ink flex items-center justify-center flex-shrink-0">
                                <TrendingUp size={14} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[14px] font-semibold text-cat-ink">
                                    {d.stat}
                                </div>
                                <div className="text-[12px] text-cat-fg-dim mt-0.5">
                                    {d.sub_stat}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <div className="text-[12px] text-cat-fg-dim font-semibold uppercase tracking-[1.2px] mb-3">
                        Example output
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="px-[14px] py-3 bg-[#FAFBFC] border border-cat-border rounded-[10px] text-[13px] font-mono text-cat-fg-muted leading-[1.5]">
                            <div className="text-[10px] text-cat-warm-ink font-semibold mb-1.5 tracking-[0.6px] uppercase">
                                Before
                            </div>
                            {d.example_before}
                        </div>
                        <div className="flex justify-center text-cat-primary">
                            <ArrowDown size={16} />
                        </div>
                        <div className="px-[14px] py-3 bg-[#F4FBF6] border border-cat-green-border rounded-[10px] text-[13px] font-mono text-cat-ink-2 leading-[1.5]">
                            <div className="text-[10px] text-cat-green-ink font-semibold mb-1.5 tracking-[0.6px] uppercase">
                                After
                            </div>
                            {d.example_after}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Diagnosis = () => {
    const [openId, setOpenId] = useState("ghosted");

    return (
        <section
            id="diagnose"
            className="bg-white px-4 md:px-8 py-16 md:py-24"
        >
            <div className="max-w-[1100px] mx-auto">
                <SectionHead
                    center
                    eyebrow="Where does yours get stuck?"
                    eyebrowColor="teal"
                    title="Tell us what's wrong. We'll hand you the exact prompt."
                    sub="Pick the one that sounds most like you. The right prompt opens below — copy it, paste it in your AI, done."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mt-11">
                    {DIAGNOSIS.map((d) => (
                        <DiagCard
                            key={d.id}
                            d={d}
                            open={openId === d.id}
                            onOpen={() =>
                                setOpenId(openId === d.id ? null : d.id)
                            }
                        />
                    ))}
                </div>

                {openId && <DiagDetail d={DIAGNOSIS.find((x) => x.id === openId)} />}
            </div>
        </section>
    );
};

export default Diagnosis;
