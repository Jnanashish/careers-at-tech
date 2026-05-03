import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "timeago.js";
import { Building2, ExternalLink, CheckCircle, Sparkles } from "lucide-react";

import {
    formatEmploymentTypes,
    formatWorkMode,
    formatJobLocations,
    formatBaseSalary,
    formatBatch,
} from "@/Helpers/jobV2helpers";

const shouldAnimate = typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const Badge = ({ children, tone = "default" }) => {
    const tones = {
        default: "bg-gray-100 text-gray-700",
        primary: "bg-primary-light text-primary",
        success: "bg-green-50 text-green-700",
        warning: "bg-amber-50 text-amber-800",
        info: "bg-blue-50 text-blue-700",
        terracotta: "bg-terracotta-light text-terracotta",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tones[tone] || tones.default}`}>
            {children}
        </span>
    );
};

const JobCardV2 = ({ job, index = 0 }) => {
    if (!job?.slug) return null;

    const employment = formatEmploymentTypes(job.employmentType);
    const workMode = formatWorkMode(job.workMode);
    const location = formatJobLocations(job.jobLocation);
    const salary = formatBaseSalary(job.baseSalary);
    const batch = formatBatch(job.batch);

    const logo = job.company?.logo?.icon;
    const logoBg = job.company?.logo?.bgColor || "#ffffff";
    const isVerified = job.company?.isVerified;
    const isSponsored = job.sponsorship?.tier && job.sponsorship.tier !== "none";

    return (
        <motion.article
            initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
            className="group bg-white rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:border-l-4 hover:border-l-terracotta transition-all duration-200 border border-border"
            role="article"
            aria-label={`${job.title} at ${job.companyName}`}
        >
            <Link href={`/jobs/${job.slug}`} prefetch={false} className="block focus:outline-none">
                <div className="flex items-start gap-4">
                    <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg border border-border overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: logoBg }}
                    >
                        {logo ? (
                            <Image
                                src={logo}
                                alt={`${job.companyName} logo`}
                                width={48}
                                height={48}
                                className="object-contain w-full h-full p-1"
                            />
                        ) : (
                            <Building2 size={20} className="text-text-tertiary" />
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <h3 className="text-card-title text-text-primary truncate group-hover:text-primary transition-colors">
                                    {job.title}
                                </h3>
                                <p className="text-base text-text-secondary flex items-center gap-1.5 mt-0.5">
                                    <span className="truncate">{job.companyName}</span>
                                    {isVerified && (
                                        <CheckCircle size={14} className="text-secondary flex-shrink-0" aria-label="Verified company" />
                                    )}
                                </p>
                            </div>
                            {isSponsored && (
                                <span className="inline-flex items-center gap-1 bg-terracotta-light text-terracotta text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
                                    <Sparkles size={10} />
                                    {job.sponsorship.tier === "featured" ? "Featured" : "Sponsored"}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                            {employment && <Badge tone="primary">{employment}</Badge>}
                            {workMode && <Badge tone={workMode === "Remote" ? "success" : "default"}>{workMode}</Badge>}
                            {location && <Badge>{location}</Badge>}
                            {batch && <Badge tone="info">Batch {batch}</Badge>}
                        </div>

                        {Array.isArray(job.requiredSkills) && job.requiredSkills.length > 0 && (
                            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                                {job.requiredSkills.slice(0, 4).map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs text-text-tertiary bg-page rounded px-2 py-0.5 border border-border"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-4 gap-3">
                            <div className="flex items-center gap-3 text-sm text-text-tertiary min-w-0 flex-wrap">
                                {salary && (
                                    <span className="font-medium text-terracotta whitespace-nowrap">{salary}</span>
                                )}
                                {job.datePosted && (
                                    <>
                                        {salary && <span className="hidden sm:inline">·</span>}
                                        <span className="whitespace-nowrap">Posted {format(job.datePosted)}</span>
                                    </>
                                )}
                            </div>
                            <span className="hidden sm:inline-flex items-center gap-1.5 border border-primary text-primary rounded-lg px-4 py-2 text-sm font-medium group-hover:bg-primary-light transition-colors flex-shrink-0">
                                View & apply
                                <ExternalLink size={14} />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default JobCardV2;
