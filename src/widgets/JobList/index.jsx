import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./joblist.module.scss";
// import components
import Jobcard from "../../components/Jobcard/Jobcard";
import { getJobListData, getcompanynamedata, getjdJobtypeData } from "@/core/apis/jobapicall";
import Notice from "../../components/common/Notice/notice";
import { firenbaseEventHandler } from "@/core/eventHandler";
import WhatAppModal from "../../Temp/whatsAppModal";
import NavHeader from "@/components/navHeader";
import { logEvent } from "firebase/analytics";
import { getJobListing } from "@/Helpers/jobdetailshelper";

import Loader from "@/components/common/Loader";

const JobList = () => {
    const [pageno, setPageno] = useState(1);
    var itemCount = 0;

    const [params, setParams] = useState(null); // array of object
    const [jobdata, setJobdata] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [size, setSize] = useState(2);

    const router = useRouter();
    const paramsToCheck = ["batch", "year", "companyname", "degree", "jobtype", "query", "location"];

    const [showMoreClicked, setShowMoreClicked] = useState(false);

    // add new key value in params array state
    const updateParam = (key, value) => {
        setParams((prevParam) => {
            if (prevParam !== null) {
                const updatedParams = prevParam.map((param) => {
                    if (Object.keys(param)[0] === key) {
                        return { [key]: value };
                    }
                    return param;
                });
                return updatedParams;
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

    // when user search any query in searchbar
    const handleQuerySearch = (searchedquery) => {
        if (!!searchedquery) {
            clearSearchParam()
            setParams(null);
            setJobdata([]);
            updateParam("query", searchedquery);
        }
    };

    // call job listing data (send params as parameter)
    const callJobListingApi = async (params) => {
        setLoaderStatus(true);
        const res = await getJobListing(params, pageno, size);
        if (!!res && Array.isArray(res?.data)) {
            setLoaderStatus(false);
            setShowMoreClicked(false);
            setJobdata((jobdata) => [...jobdata, ...res.data]);
        }
    };

    // check if any query parameter present in url
    const checkParameterinUrl = () => {
        const searchParams = new URLSearchParams(window.location.search);
        let isQueryPresent = false;
        setParams(null);
        setJobdata([]);
        paramsToCheck.forEach((paramKey) => {
            // if parameter is present in url then get the value
            const paramValue = searchParams.get(paramKey);
            if (!!paramValue) {
                updateParam(paramKey, paramValue);
                isQueryPresent = true;
            }
        });
        // if no query param present in url, call api for jobs without any query
        if (!isQueryPresent) {
            callJobListingApi(null);
        }
    };

    // clear existing query params from url
    const clearSearchParam = () => {
        window.history.replaceState({}, "", `${window.location.pathname}`);
    }

    // update search param in url
    const updateSearchParam = (params) => {
        const searchParams = new URLSearchParams(window.location.search);
        params.forEach((param) => {
            const key = Object.keys(param)[0];
            const value = param[key];
            searchParams.set(key, value);
        });
        window.history.replaceState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
    };

    const updateQueryParam = (selectedValue, param) =>{
        updateParam(param, selectedValue);

    }

    // if any paramter change then call job listing api
    useEffect(() => {
        if (params !== null) {
            callJobListingApi(params);
            updateSearchParam(params);
        }
    }, [params]);

    // detect any change in url and check for query parameter
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

    // when page number change call job list api with existing param
    useEffect(() => {
        pageno !== 1 && callJobListingApi(params);
    }, [pageno]);

    // on intial load check if any query parama present in url
    useEffect(() => {
        checkParameterinUrl();
    }, []);

    return (
        <div className={styles.joblist}>
            <NavHeader handleQuerySearch={handleQuerySearch} updateQueryParam={updateQueryParam}/>

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
                                {showMoreClicked && <Loader loaderheight="30px" loadercontainerheright="30px" borderWidth="4px" />}
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
