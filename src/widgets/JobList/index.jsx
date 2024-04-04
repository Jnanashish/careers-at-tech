import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./joblist.module.scss";

// import components
import Jobcard from "@/components/Jobcard/Jobcard";
import Notice from "@/components/common/Notice/notice";
import WhatAppModal from "../../Temp/whatsAppModal";
import NavHeader from "@/components/navHeader";
import Loader from "@/components/common/Loader";

import { getJobListing } from "@/Helpers/jobdetailshelper";

const JobList = () => {
    var itemCount = 0;

    const [pageno, setPageno] = useState(1);
    const [params, setParams] = useState(null); // array of object
    const [jobdata, setJobdata] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(true);

    const router = useRouter();
    const paramsToCheck = ["batch", "year", "companyname", "degree", "jobtype", "query", "location"];

    const [showMoreClicked, setShowMoreClicked] = useState(false);

    // add new key value in params array state or update existing value
    const updateParam = (key, value) => {
        console.log("VALYE", value);
        if (!value || value === "") {
            const tempParams = params.filter((param) => Object.keys(param)[0] !== key);
            setParams(tempParams);
            return;
        }
        setParams((prevParam) => {
            if (prevParam !== null) {
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
                    return [...prevParam, { [key]: value }];
                }
            } else {
                return [{ [key]: value }];
            }
        });
    };

    // when user clicked show more increment page no
    const showMoreButtonClicked = () => {
        if (!showMoreClicked) {
            setShowMoreClicked(true);
            setPageno(pageno + 1);
        }
    };

    // call job listing data (send params as parameter)
    const getJoblistingData = async (params) => {
        setLoaderStatus(true);
        const res = await getJobListing(params, pageno);
        if (!!res && Array.isArray(res?.data)) {
            setLoaderStatus(false);
            setShowMoreClicked(false);
            setJobdata((jobdata) => [...jobdata, ...res.data]);
        }
    };

    // update search param in url
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

    const handleFilterChange = (param, userQuery) => {
        setPageno(1);
        setJobdata([]);
        updateParam(param, userQuery);
    };

    // when page number change call job list api with existing param
    useEffect(() => {
        pageno !== 1 && getJoblistingData(params);
    }, [pageno]);

    // if any paramter change then call job listing api
    useEffect(() => {
        console.log("params !== null", params !== null, params);
        if (params !== null) {
            getJoblistingData(params);
            updateSearchparaminUrl(params);
        }
    }, [params]);

    // --------------------------------------------------------
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

    // detect any change in url and check if any query parama present in url
    useEffect(() => {
        const handleRouteChange = ({ shallow }) => {
            if (!shallow) checkParameterinUrl();
        };

        router.events.on("routeChangeComplete", handleRouteChange);
        return () => router.events.off("routeChangeComplete", handleRouteChange);
    }, [router.events]);

    // on intial load check if any query parama present in url
    useEffect(() => {
        checkParameterinUrl();
    }, []);

    return (
        <div className={styles.joblist}>
            <NavHeader params={params} handleFilterChange={handleFilterChange} />

            {/* No job found section when data is empty and page is not loading */}
            {!loaderStatus && jobdata.length === 0 && (
                <div className={styles.joblist_nojobsection}>
                    <p>
                        No jobs found 😔, Please try different filter <br />
                        or <span onClick={() => Router.push("/contact")}>contact us</span> if the issue continue.
                    </p>
                </div>
            )}

            {(!loaderStatus || jobdata.length !== 0) && (
                <div className={styles.joblistcontainer}>
                    {/* main job card list section  */}
                    <div className={styles.joblistcontainer_jobcards}>
                        {!!jobdata &&
                            jobdata.map((data) => {
                                return (
                                    <div cnt={itemCount++} key={data.id}>
                                        <Jobcard data={data} />
                                    </div>
                                );
                            })}

                        {/* show more button */}
                        {jobdata.length !== 0 && (
                            <div onClick={showMoreButtonClicked} className={styles.showmoresection}>
                                {!showMoreClicked && (
                                    <span className={styles.showmoresection_button}>
                                        <p>Show more jobs</p>
                                        <FontAwesomeIcon className={styles.icon} icon={faChevronDown} />
                                    </span>
                                )}
                                {showMoreClicked && (
                                    <span className={styles.showmoresection_loader}>
                                        {" "}
                                        <Loader loaderheight="30px" loadercontainerheright="30px" borderWidth="4px" />
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* side bar  */}
                    <div className={styles.joblistcontainer_sidebar}></div>
                </div>
            )}

            {/*  show loader  */}
            {!showMoreClicked && loaderStatus && <Loader />}
            {!loaderStatus && jobdata.length !== 0 && <Notice />}

            <WhatAppModal />
        </div>
    );
};

export default JobList;
