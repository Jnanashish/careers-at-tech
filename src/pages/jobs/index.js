import React from "react";
import Head from "next/head";

// import components
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import JobList from "@/widgets/JobList";
import WhatAppBanner from "@/components/Banners/WhatsappBanner";

// Job listing page
const Jobs = () => {
    return (
        <>
            {/* TODO: new meta title and description for home page */}
            <Head>
                <title>Careers at Tech</title>
                <meta name="description" content="One place solution to get regular Internship and Job Updates." />
            </Head>
            <Header />
            <JobList />
            <span className="mobileview">
                <WhatAppBanner isModal={true} />
            </span>
            <Footer />
        </>
    );
};

export default Jobs;
