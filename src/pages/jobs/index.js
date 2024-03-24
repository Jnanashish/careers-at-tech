import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/header";
import JobList from "@/widgets/JobList";
import { handleIntialPageLoad } from "@/core/handleInitialPageLoad";
import { getJobListing } from "@/Helpers/jobdetailshelper";
const Jobs = () => {
    const searchParams = useSearchParams();
    const paramsToCheck = ["batch", "year", "companyname", "degree", "jobtype", "query", "location"];
    const [params, setParams] = useState([
        {
            paramKey: "",
            paramValue: "",
        },
    ]);

    // add new key value in params array
    const updateParam = (key, value) => {
        console.log("KEY", key, value);
        setParams((prevParam) => [...prevParam, { [key]: value }]);
    };

    const checkParamsinUrl = () => {
        console.log("CALLED");
        paramsToCheck.forEach((paramKey) => {
            // if param is present in url then get the value
            const paramValue = searchParams.get(paramKey);
            if (!!paramValue) {
                updateParam(paramKey, paramValue);
            }
        });
    };

    // useEffect(() => {
    //     getJobListing(params);
        
    // }, [params]);

    // useEffect(() => {
    //     checkParamsinUrl();
    //     handleIntialPageLoad();
    // }, []);

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
