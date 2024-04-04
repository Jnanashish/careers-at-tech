import React from "react";
import Head from "next/head";

// import components
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/header";
import JobList from "@/widgets/JobList";

// job listing page
const Jobs = () => {
    return (
        <div>
            <Head>
                <title>Careers at Tech</title>
                <meta name="description" content="One place solution to get regular Internship and Job Updates." />
            </Head>
            <Header />
            <JobList />
            <Footer />
        </div>
    );
};

export default Jobs;
