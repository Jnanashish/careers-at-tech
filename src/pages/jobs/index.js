import React from "react";

import JobList from "@/widgets/JobList";

import { listJobsV2 } from "@/core/apis/v2/client";
import Meta from "@/core/SEO/Meta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

export async function getStaticProps() {
    let initialJobs = { data: [], total: 0, page: 1, totalPages: 0, hasMore: false };
    try {
        initialJobs = await listJobsV2({ limit: 12, page: 1, sort: "datePosted:desc" });
    } catch {
        initialJobs = { data: [], total: 0, page: 1, totalPages: 0, hasMore: false };
    }
    return {
        props: { initialJobs },
        revalidate: 600,
    };
}

const JobsPage = ({ initialJobs }) => (
    <>
        <Meta
            title="Tech jobs and internships for freshers in India | CareersAt.Tech"
            description="Browse verified tech jobs and internships from top companies hiring freshers in India. Filter by role, work mode, batch, and skills. Always free."
            canonical={`${SITE_URL}/jobs`}
        />
        <JobList initialJobs={initialJobs} />
    </>
);

export default JobsPage;
