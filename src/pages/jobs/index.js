import React from "react";

import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import JobListRedesign from "@/widgets/JobListRedesign";
import { MobileWhatsAppBanner } from "@/components/Redesign/SidebarNew";

import { getJobListing } from "@/Helpers/jobdetailshelper";
import Meta from "../../core/SEO/Meta";

export async function getStaticProps() {
    const params = null;
    const res = await getJobListing(params);

    return {
        props: {
            data: res,
        },
        revalidate: 600,
    };
}

const Jobs = ({ data }) => {
    return (
        <>
            <Meta />
            <Navbar />
            <JobListRedesign jobData={data} />
            <MobileWhatsAppBanner />
            <FooterNew />
        </>
    );
};

export default Jobs;
