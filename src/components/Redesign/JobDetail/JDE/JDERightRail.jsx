import React from "react";
import JDEApplyCard from "./JDEApplyCard";

const JDERightRail = ({ job, daysLeft, isUrgent, expired, className = "" }) => {
    return (
        <aside
            className={`flex flex-col gap-3.5 self-start ${className}`}
            style={{ position: "sticky", top: "80px" }}
        >
            <JDEApplyCard
                job={job}
                daysLeft={daysLeft}
                isUrgent={isUrgent}
                expired={expired}
            />
            {/* HIDDEN_FOR_API_INTEGRATION: ResumeToolkit, ActivityCard, "Spotted an issue" — see HIDDEN_FEATURES.md
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
            */}
        </aside>
    );
};

export default JDERightRail;
