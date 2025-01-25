import React from "react";

// import components
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/header";
import JobList from "@/widgets/JobList";
import WhatAppBanner from "@/components/Banners/WhatsappBanner";

import { getJobListing } from "@/Helpers/jobdetailshelper";
import Meta from "../../core/SEO/Meta.jsx";

// call job details api on intial load
export async function getStaticProps() {
    const params = null;
    const res = await getJobListing(params);    

    return {
        props: {
            data: res,
        },
        revalidate: 600, // In seconds (10 min)
    };
}

// Job listing page
const Jobs = ({data}) => {
    return (
        <>
            <Meta/>
            <Header />
            <JobList jobData={data}/>
            <span className="mobileview">
                <WhatAppBanner isModal={true} />
            </span>
            <Footer />
        </>
    );
};

export default Jobs;
