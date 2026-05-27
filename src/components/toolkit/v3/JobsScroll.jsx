import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Wand2 } from "lucide-react";
import SectionHead from "./SectionHead";

const TILE_COLOR = { bg: "var(--cat-ink)", color: "#fff" };

const getInitial = (name) => (name || "?").trim().charAt(0).toUpperCase();

const JobCard = ({ job }) => {
    const color = TILE_COLOR;
    const initial = getInitial(job.companyName);
    return (
        <Link
            href={`/jobs/${job.slug}`}
            className="cat-snap-start group flex-shrink-0 w-[300px] bg-white border border-cat-border rounded-[14px] p-5 transition-all duration-300 hover:border-cat-accent-teal hover:shadow-[var(--cat-shadow-card-hover)] hover:-translate-y-0.5 shadow-[var(--cat-shadow-card)] flex flex-col gap-4 no-underline text-inherit"
        >
            <div className="flex items-center gap-3">
                <div
                    className="w-11 h-11 rounded-[10px] flex items-center justify-center font-bold text-[17px] flex-shrink-0"
                    style={{ background: color.bg, color: color.color }}
                >
                    {initial}
                </div>
                <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-cat-ink leading-[1.3] truncate">
                        {job.title}
                    </div>
                    <div className="text-[13px] text-cat-fg-muted mt-0.5 truncate">
                        {job.companyName}
                    </div>
                </div>
            </div>

            <div className="px-3 py-2.5 bg-cat-accent-teal-bg border border-cat-accent-teal-bg rounded-[8px] text-[12px] text-cat-accent-teal leading-[1.5] flex gap-2 items-start">
                <Wand2 size={11} className="mt-0.5 flex-shrink-0" />
                <span>Tailor your resume for this exact JD.</span>
            </div>

            <span className="mt-auto text-[13px] font-semibold text-cat-accent-teal inline-flex items-center gap-1.5 group-hover:gap-2 transition-all">
                Get prompt for this job <ArrowRight size={11} />
            </span>
        </Link>
    );
};

const JobsScroll = ({ jobs = [] }) => {
    const trackRef = useRef(null);
    if (jobs.length === 0) return null;

    const scroll = (dir) => {
        trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
    };

    return (
        <section
            id="jobs"
            className="bg-white border-t border-cat-divider overflow-hidden pl-4 py-14 md:pl-8 md:py-20"
        >
            <div className="max-w-[1100px] mx-auto pr-4 md:pr-8">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                    <SectionHead
                        eyebrow="Tailor on a live job"
                        eyebrowColor="teal"
                        title="Pick a real job. Get a tailored prompt."
                        sub="Open any role from CareersAt.Tech below. Copy your resume + the JD into the prompt, paste in your AI, get back a version that matches the role."
                    />
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => scroll(-1)}
                            aria-label="Scroll jobs left"
                            className="w-[38px] h-[38px] rounded-full border border-cat-border bg-white text-cat-ink cursor-pointer text-[12px] flex items-center justify-center hover:bg-cat-accent-teal-bg hover:border-cat-accent-teal hover:text-cat-accent-teal transition-colors"
                        >
                            <ArrowLeft size={14} />
                        </button>
                        <button
                            onClick={() => scroll(1)}
                            aria-label="Scroll jobs right"
                            className="w-[38px] h-[38px] rounded-full border border-cat-border bg-white text-cat-ink cursor-pointer text-[12px] flex items-center justify-center hover:bg-cat-accent-teal-bg hover:border-cat-accent-teal hover:text-cat-accent-teal transition-colors"
                        >
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
            <div
                ref={trackRef}
                className="mt-8 flex gap-4 overflow-x-auto cat-snap-x cat-no-scrollbar pb-2 pr-4 md:pr-8"
                style={{
                    paddingLeft:
                        "max(16px, calc((100% - 1100px) / 2))",
                }}
            >
                {jobs.map((job, i) => (
                    <JobCard key={job.slug || job._id || i} job={job} />
                ))}
            </div>
        </section>
    );
};

export default JobsScroll;
