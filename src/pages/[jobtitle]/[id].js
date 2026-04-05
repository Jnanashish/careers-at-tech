import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import ScrollToTop from "@/components/Redesign/ScrollToTop";
import JobDetailMeta from "@/core/SEO/JobDetailMeta";
import Breadcrumb from "@/components/Redesign/JobDetail/Breadcrumb";
import JobHeader from "@/components/Redesign/JobDetail/JobHeader";
import ContentCard from "@/components/Redesign/JobDetail/ContentCard";
import SkillTags from "@/components/Redesign/JobDetail/SkillTags";
import StickyApplyCard from "@/components/Redesign/JobDetail/StickyApplyCard";
import SimilarJobsMini from "@/components/Redesign/JobDetail/SimilarJobsMini";
import MobileStickyBar from "@/components/Redesign/JobDetail/MobileStickyBar";
import SafetyBanner from "@/components/Redesign/JobDetail/SafetyBanner";
import JobDetailSkeleton from "@/components/Redesign/JobDetail/JobDetailSkeleton";
import JobNotFound from "@/components/Redesign/JobDetail/JobNotFound";
import { WhatsAppCTA } from "@/components/Redesign/SidebarNew";

import { handleIntialPageLoad } from "@/core/handleInitialPageLoad";
import { getJobListing } from "@/Helpers/jobdetailshelper";
import { generateSlugFromrole } from "@/Helpers/jobdetailshelper";

export async function getStaticPaths() {
    // create static paths from with intial 30 pages
    const res = await getJobListing(null, 1, 30);

    const jobdata = res?.data.filter((item) => item?.jdpage === "true");

    const staticPaths = jobdata?.map((item) => {
        const titleforShare = generateSlugFromrole(item?.title);
        return {
            params: {
                jobtitle: titleforShare,
                id: item?.id,
            },
        };
    });

    return {
        paths: staticPaths,
        fallback: true,
    };
}

export async function getStaticProps(context) {
    const res = await getJobListing([{ id: context?.params?.id }]);
    if (!res && !res?.data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data: res?.data,
        },
        revalidate: 600,
    };
}

const JobdetailsPage = ({ data }) => {
    const router = useRouter();

    useEffect(() => {
        handleIntialPageLoad();
    }, []);

    if (router.isFallback) {
        return (
            <>
                <Navbar />
                <JobDetailSkeleton />
                <FooterNew />
            </>
        );
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return (
            <>
                <Navbar />
                <JobNotFound />
                <FooterNew />
            </>
        );
    }

    const job = Array.isArray(data) ? data[0] : data;
    const displayTitle = job.role && job.role !== "N" ? job.role : job.title;

    return (
        <>
            <Navbar />
            <JobDetailMeta data={job} />

            <main id="main-content" className="bg-page min-h-screen pt-20 pb-12 lg:pb-12">
                <div className="max-w-content mx-auto px-4 lg:px-6 py-6">
                    <Breadcrumb companyName={job.companyName} jobTitle={displayTitle} />
                    <JobHeader data={job} />

                    {/* Two-column layout */}
                    <div className="flex flex-col lg:flex-row gap-8 mt-8">
                        {/* Main content */}
                        <article className="flex-1 flex flex-col gap-4 min-w-0">
                            <ContentCard
                                title="About This Role"
                                icon="📋"
                                html={job.jobdesc}
                            />
                            <ContentCard
                                title="What You'll Do"
                                icon="🎯"
                                html={job.responsibility}
                            />
                            <ContentCard
                                title="Who Should Apply"
                                icon="✅"
                                html={job.eligibility}
                            />
                            <SkillTags
                                title="Nice to Have"
                                icon="⭐"
                                html={job.skills}
                            />
                            <ContentCard
                                title={`About ${job.companyName || "the Company"}`}
                                icon="🏢"
                                html={job.aboutCompany}
                                fallbackText
                                companyName={job.companyName}
                                applyUrl={job.link}
                            />

                            {/* Similar jobs on mobile (below content) */}
                            <div className="lg:hidden">
                                <WhatsAppCTA />
                                <div className="mt-4">
                                    <SimilarJobsMini
                                        companytype={job.companytype}
                                        currentJobId={job._id}
                                    />
                                </div>
                            </div>
                        </article>

                        {/* Sidebar — desktop only */}
                        <aside className="hidden lg:flex flex-col gap-4 w-[320px] flex-shrink-0">
                            <StickyApplyCard data={job} />
                            <WhatsAppCTA />
                            <SimilarJobsMini
                                companytype={job.companytype}
                                currentJobId={job._id}
                            />
                        </aside>
                    </div>
                </div>

                <SafetyBanner jobTitle={displayTitle} companyName={job.companyName} />
            </main>

            <FooterNew />
            <ScrollToTop />
            <MobileStickyBar data={job} />
        </>
    );
};

export default JobdetailsPage;
