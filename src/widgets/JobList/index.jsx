import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./joblist.module.scss";

// import components
import Jobcard from "@/components/Jobcard/Jobcard";
import NavHeader from "@/components/navHeader";
import Sidebar from "@/components/Sidebar";
import ScrolltoTop from "@/components/common/ScrolltoTop";
import NojobFound from "@/components/NojobFound";
import JoblistLoader from "@/components/Loader/JoblistLoader";
import ShowMoreButton from "@/components/Showmorebutton";

// Helper functions
import { getJobListing } from "@/Helpers/jobdetailshelper";

const JobList = () => {
    const [pageno, setPageno] = useState(1);
    const [params, setParams] = useState(null); // array of object
    const [jobdata, setJobdata] = useState([]);
    const [totalJobCount, setTotalJobCount] = useState(0);
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [showMoreClicked, setShowMoreClicked] = useState(false);

    const router = useRouter();
    const paramsToCheck = ["batch", "year", "companyname", "degree", "jobtype", "query", "location"];

    // [PARAM] add new key value in params array state or update existing value
    const updateParam = (key, value) => {
        // if value is empty then remove the param from list
        if (!value || value === "") {
            const tempParams = params.filter((param) => Object.keys(param)[0] !== key);
            setParams(tempParams);
            return;
        }
        setParams((prevParam) => {
            if (prevParam !== null) {
                // if param key already exist update the param value
                const keyExists = prevParam.some((param) => Object.keys(param)[0] === key);
                if (keyExists) {
                    const updatedParams = prevParam.map((param) => {
                        if (Object.keys(param)[0] === key) {
                            return { [key]: value };
                        }
                        return param;
                    });
                    return updatedParams;
                } else {
                    // add new param value with key
                    return [...prevParam, { [key]: value }];
                }
            } else {
                return [{ [key]: value }];
            }
        });
    };

    // when user clicked show more increment page no
    // show loader in show more section
    const showMoreButtonClicked = () => {
        if (!showMoreClicked) {
            setShowMoreClicked(true);
            setPageno(pageno + 1);
        }
    };

    // [JOB DATA API] call job listing data (send params as parameter)
    const getJoblistingData = async (params) => {
        setLoaderStatus(true);
        const size = 10;
        const res = await getJobListing(params, pageno, size);

        if (!!res && Array.isArray(res?.data)) {
            setTotalJobCount(res?.totalCount);
            setLoaderStatus(false);
            setShowMoreClicked(false);
            setJobdata((jobdata) => [...jobdata, ...res?.data]);
        }
    };

    // [URL] update search param in url
    const updateSearchparaminUrl = (params) => {
        window.history.replaceState({}, "", `${window.location.pathname}`);
        const searchParams = new URLSearchParams(window.location.search);
        params.forEach((param) => {
            const key = Object.keys(param)[0];
            const value = param[key];
            searchParams.set(key, value);
        });
        window.history.replaceState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
    };

    // when filter change reset to default state
    const handleFilterChange = (param, userQuery) => {
        setPageno(1);
        setJobdata([]);
        updateParam(param, userQuery);
    };

    // check if any query parameter present in url
    const checkParameterinUrl = () => {
        // clear existing data and params
        setParams(null);
        setJobdata([]);
        setPageno(1);

        const searchParams = new URLSearchParams(window.location.search);
        let isQueryPresent = false;
        paramsToCheck.forEach((paramKey) => {
            // if any parameter is present in url then get the value
            const paramValue = searchParams.get(paramKey);
            if (!!paramValue) {
                updateParam(paramKey, paramValue);
                isQueryPresent = true;
            }
        });
        // if no query param present in url, call api for jobs without any query
        if (!isQueryPresent) {
            getJoblistingData(params);
        }
    };

    // --------------------------------------------------------
    // when page number change call job list api with existing param
    useEffect(() => {
        pageno !== 1 && getJoblistingData(params);
    }, [pageno]);

    // if any paramter change then call job listing api
    useEffect(() => {
        if (params !== null) {
            getJoblistingData(params);
            updateSearchparaminUrl(params);
        }
    }, [params]);

    // detect any change in url and check if any query parama present in url
    useEffect(() => {
        const handleRouteChange = ({ shallow }) => {
            if (!shallow) checkParameterinUrl();
        };

        router.events.on("routeChangeComplete", handleRouteChange);
        return () => router.events.off("routeChangeComplete", handleRouteChange);
    }, [router.events]);

    // on intial load check if any query parama present in url to apply it as filter
    useEffect(() => {
        checkParameterinUrl();
    }, []);

    return (
        <>
            <NavHeader params={params} handleFilterChange={handleFilterChange} />

            <div className={styles.joblist}>
                <div className={styles.joblist_mainsection}>
                    {/* No job found section when data is empty and page is not loading */}
                    {!loaderStatus && jobdata.length === 0 && <NojobFound />}

                    {/* main job card list section  */}
                    {(!loaderStatus || jobdata.length !== 0) && (
                        <>
                            {!!totalJobCount && <p className={styles.joblist_mainsection_alljobs}>All Jobs ({totalJobCount})</p>}

                            {!!jobdata &&
                                Array.isArray(jobdata) &&
                                jobdata?.map((data) => {
                                    return (
                                        <div key={data?.id}>
                                            <Jobcard data={data} />
                                        </div>
                                    );
                                })}

                            {/* show more button */}
                            {jobdata.length !== 0 && pageno * 10 < totalJobCount && <ShowMoreButton buttonclickHandler={showMoreButtonClicked} showMoreClicked={showMoreClicked} />}
                        </>
                    )}

                    {/*  show job list loader  */}
                    {!showMoreClicked && loaderStatus && <JoblistLoader/>}
                </div>

                {/* side bar  */}
                <div className={`${styles.joblist_sidebar} desktopview`}>
                    <Sidebar />
                </div>
            </div>

            <ScrolltoTop />
        </>
    );
};

export default JobList;
