import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/header";
import JobList from "@/widgets/JobList";
import { getJobListing } from "@/Helpers/jobdetailshelper";

const Jobs = () => {
    const [params, setParams] = useState(null);
    const [jobdata, setJobdata] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(30);

    const router = useRouter();
    const paramsToCheck = ["batch", "year", "companyname", "degree", "jobtype", "query", "location"];

    const callgetJobListingApi = async (params) => {
        const res = (await getJobListing(params, page, size));
        if(!!res && Array.isArray(res?.data)){
            setLoaderStatus(false)
            setJobdata((jobdata) => [...jobdata, ...res.data]);
        }
    };

    // add new key value in params array state
    const updateParam = (key, value) => {
        setParams((prevParam) => (prevParam !== null ? [...prevParam, { [key]: value }] : [{ [key]: value }]));
    };

    // check if any parameter present in url
    const checkParameterinUrl = () => {
        const searchParams = new URLSearchParams(window.location.search);
        let isQueryPresent = false;
        paramsToCheck.forEach((paramKey) => {
            // if parameter is present in url then get the value
            const paramValue = searchParams.get(paramKey);
            if (!!paramValue) {
                updateParam(paramKey, paramValue);
                isQueryPresent = true;
            }
        });
        // if no query param is present call api for jobs
        if (!isQueryPresent) {
            callgetJobListingApi(null);
        }
    };

    useEffect(() => {
        params !== null && callgetJobListingApi(params);
    }, [params]);

    // detect any change in url and check for parameter
    useEffect(() => {
        const handleRouteChange = ({ shallow }) => {
            if (!shallow) {
                checkParameterinUrl();
            }
        };

        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        page !== 1 && callgetJobListingApi(params);
    }, [page]);

    useEffect(() => {
        checkParameterinUrl();
    }, []);

    return (
        <div>
            <Head>
                <title>Careers at Tech</title>
                <meta name="description" content="One place solution to get regular Internship and Job Updates." />
            </Head>
            <Header />
            <JobList jobdata={jobdata} setPage={setPage} setSize={setSize} loaderStatus={loaderStatus}/>
            {/* <Footer /> */}
        </div>
    );
};

export default Jobs;
