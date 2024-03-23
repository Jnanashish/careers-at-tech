import React, { useEffect } from "react";
import Head from "next/head";
import { useSearchParams } from 'next/navigation'


import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/header";
import JobList from "@/widgets/JobList";
import { handleIntialPageLoad } from "@/core/handleInitialPageLoad";

const Jobs = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search') || '';
    if(searchParams.has("location")){

    }

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
