import React from "react";
import Link from "next/link";
import { format } from "timeago.js";

import {
    formatEmploymentTypes,
    formatWorkMode,
    formatJobLocations,
    formatBaseSalary,
    formatBatch,
} from "@/Helpers/jobV2helpers";

const SimpleJobCard = ({ job }) => {
    if (!job?.slug) return null;

    const employment = formatEmploymentTypes(job.employmentType);
    const workMode = formatWorkMode(job.workMode);
    const location = formatJobLocations(job.jobLocation);
    const salary = formatBaseSalary(job.baseSalary);
    const batch = formatBatch(job.batch);
    const logo = job.company?.logo?.icon;
    const logoBg = job.company?.logo?.bgColor || "#ffffff";

    return (
        <article className="bg-white border border-border rounded-card p-5 shadow-card hover:shadow-card-hover transition-shadow">
            <Link href={`/jobs/${job.slug}`} prefetch={false} className="block">
                <div className="flex items-start gap-4">
                    <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg border border-border overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: logoBg }}
                    >
                        {logo ? (
                            <img
                                src={logo}
                                alt={`${job.companyName} logo`}
                                width={48}
                                height={48}
                                className="object-contain w-full h-full p-1"
                                loading="lazy"
                            />
                        ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-text-primary">
                            {job.title}
                        </h3>
                        <p className="text-sm text-text-secondary mt-0.5">
                            {job.companyName}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3 text-xs text-text-tertiary">
                            {employment && (
                                <span className="bg-page rounded px-2 py-0.5 border border-border">{employment}</span>
                            )}
                            {workMode && (
                                <span className="bg-page rounded px-2 py-0.5 border border-border">{workMode}</span>
                            )}
                            {location && (
                                <span className="bg-page rounded px-2 py-0.5 border border-border">{location}</span>
                            )}
                            {batch && (
                                <span className="bg-page rounded px-2 py-0.5 border border-border">Batch {batch}</span>
                            )}
                        </div>

                        {Array.isArray(job.requiredSkills) && job.requiredSkills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2 text-xs text-text-tertiary">
                                {job.requiredSkills.slice(0, 5).map((skill) => (
                                    <span key={skill} className="bg-gray-100 rounded px-2 py-0.5">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-3 mt-3 text-sm">
                            {salary && (
                                <span className="font-medium text-terracotta">{salary}</span>
                            )}
                            {job.datePosted && (
                                <span className="text-text-tertiary">Posted {format(job.datePosted)}</span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default SimpleJobCard;
