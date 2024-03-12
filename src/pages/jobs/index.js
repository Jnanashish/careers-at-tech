import React, { useEffect } from "react";
import Header from "@/components/common/Header/header";
import Head from "next/head";

import Footer from "@/components/common/Footer/Footer";
import JobList from "@/widgets/JobList";
import { handleIntialPageLoad } from "@/core/handleInitialPageLoad";

const Jobs = () => {
    useEffect(() => {
        handleIntialPageLoad();
    }, []);

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
