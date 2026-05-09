import React from "react";
import Header from "@/components/layout/Header";
import FooterNew from "@/components/Redesign/FooterNew";
import ScrollToTop from "@/components/Redesign/ScrollToTop";

import JDEHero from "./JDEHero";
import JDEDescription from "./JDEDescription";
import JDESkills from "./JDESkills";
import JDESimilarRoles from "./JDESimilarRoles";
import JDERightRail from "./JDERightRail";
import JDEApplyCard from "./JDEApplyCard";

import { daysUntil } from "@/Helpers/jobV2helpers";

// trackJobView is called by the parent [slug].js page component.
const JDEVariant = ({ job, similarJobs = [] }) => {

    const daysLeft = daysUntil(job.validThrough);
    const isUrgent = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
    const expired = job.isExpired || (daysLeft !== null && daysLeft <= 0);

    return (
        <div className="jde-page bg-page min-h-screen">
            <Header />

            <JDEHero
                job={job}
                daysLeft={daysLeft}
                isUrgent={isUrgent}
                expired={expired}
            />

            {/* Mobile: apply card sits right above sections */}
            <div className="lg:hidden px-4 pt-5 pb-0">
                <JDEApplyCard
                    job={job}
                    daysLeft={daysLeft}
                    isUrgent={isUrgent}
                    expired={expired}
                />
            </div>

            {/* Body grid */}
            <div
                id="similar"
                className="max-w-[1280px] mx-auto px-5 lg:px-20 pt-7 pb-16"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 items-start">
                    {/* Main content */}
                    <main>
                        <JDEDescription job={job} />
                        <JDESkills job={job} />
                        {/* HIDDEN_FOR_API_INTEGRATION: About company — see HIDDEN_FEATURES.md */}
                        {/* <JDEAbout job={job} /> */}
                        <JDESimilarRoles similarJobs={similarJobs} />
                    </main>

                    {/* Right rail — desktop only */}
                    <JDERightRail
                        job={job}
                        daysLeft={daysLeft}
                        isUrgent={isUrgent}
                        expired={expired}
                        className="hidden lg:flex"
                    />
                </div>

                {/* HIDDEN_FOR_API_INTEGRATION: Mobile rail widgets (ResumeToolkit, Activity, Spotted issue) — see HIDDEN_FEATURES.md
                <div className="lg:hidden flex flex-col gap-3.5 mt-4">
                    <ResumeToolkit jobTitle={job.title} />
                    <ActivityCard
                        job={{ ...job, postedAgo }}
                        expired={expired}
                        applicants={applicants}
                    />
                    <p className="text-center text-[12px] text-gray-500 mt-1">
                        Spotted an issue?{" "}
                        <a
                            href={`mailto:thecodergeek@gmail.com?subject=Report: ${encodeURIComponent(job.title)} at ${encodeURIComponent(job.companyName)}`}
                            className="font-semibold hover:opacity-75 transition-opacity"
                            style={{ color: "var(--jde-brand)" }}
                        >
                            Report this listing
                        </a>
                    </p>
                </div>
                */}
            </div>

            <FooterNew />
            <ScrollToTop />
        </div>
    );
};

export default JDEVariant;
