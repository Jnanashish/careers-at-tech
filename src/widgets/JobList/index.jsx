import React, { useEffect, useState } from "react";
import Router from "next/router";

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

const JobList = (props) => {
    const { jobdata, loaderStatus } = props;
    // const [jobdata, setJobdata] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [loading, setLoading] = useState(true);
    const [companyname, setCompanyname] = useState("");
    const [jobType, setJobType] = useState(null);
    const [showMoreClicked, setShowMoreClicked] = useState(false);
    const [selectedSearchWord, setSelectedSearchWord] = useState("");

    // useEffect(() => {
    //     callJobList();
    // }, [pageno]);
    useEffect(() => {
        setJobType("");
    }, [companyname]);

    useEffect(() => {
        if (jobType) {
            setSelectedSearchWord("");
            setCompanyname("");
            setLoading(true);
            getRoleData(jobType);
        }
    }, [jobType]);

    // const callJobList = async () => {
    //     setLoading(true);
    //     const apiResponse = await getJobListData(pageno);
    //     if (apiResponse && apiResponse.data) {
    //         setJobdata([...jobdata, ...apiResponse.data]);
    //         setLoading(false);
    //         setShowMoreClicked(false);
    //     }
    // };
    // const getCompanyData = (keyword = "") => {
    //     let searchTerm;
    //     if (keyword != "") {
    //         searchTerm = keyword;
    //     } else {
    //         firenbaseEventHandler("search_filter_clicked", {
    //             search_term: companyname,
    //         });
    //         searchTerm = companyname;
    //     }

    //     setLoading(true);
    //     setJobdata([]);
    //     getcompanynamedata(searchTerm).then((result) => {
    //         setJobdata([]);
    //         if (result.error) {
    //             console.log("Cannot Load data");
    //         }
    //         setLoading(false);
    //         setJobdata(result.data);
    //     });
    // };

    // const getRoleData = async (role) => {
    //     setJobdata([]);
    //     getjdJobtypeData(role).then((result) => {
    //         if (result.error) {
    //             console.log("Cannot Load data");
    //         }
    //         setLoading(false);
    //         setJobdata(result.data);
    //     });
    //     1;
    // };

    const handleCancelClick = () => {
        firenbaseEventHandler("clear_search_field_clicked", {
            search_term: companyname,
        });
        // setPageno(1);
        // setJobdata([]);
        setCompanyname("");
        // callJobList();
        setSelectedSearchWord("");
    };

    const handleSearchWordSelection = (word) => {
        firenbaseEventHandler("search_term_clicked", {
            search_term: word,
        });
        if (selectedSearchWord === word) {
            setSelectedSearchWord("");
        } else {
            setJobType("");
            setCompanyname(word);
            setSelectedSearchWord(word);
            // getCompanyData(word);
        }
    };
    const showMoreButtonClicked = () => {
        if (!showMoreClicked) {
            setShowMoreClicked(true);
            firenbaseEventHandler("showmore_button_clicked", {
                pageno: pageno,
            });
            setPageno(pageno + 1);
        }
    };
    const handleJobtypeFilterClicked = (jobtype) => {
        setJobType(jobtype);
        firenbaseEventHandler("jobtype_filter_selected", {
            job_type: jobtype,
        });
    };

    // redirec to contact us page
    const handleContactusClick = () => {
        Router.push("/contact");
    }

    useEffect(() => {
        console.log("PROPS", props);
    }, [props]);
    var itemCount = 0;
    return (
        <div className={styles.joblist}>
            {/* <NavHeader
                companyname={companyname}
                selectedSearchWord={selectedSearchWord}
                jobType={jobType}
                setCompanyname={setCompanyname}
                handleCancelClick={handleCancelClick}
                // getCompanyData={getCompanyData}
                handleSearchWordSelection={handleSearchWordSelection}
                handleJobtypeFilterClicked={handleJobtypeFilterClicked}
                setJobType={setJobType}
            /> */}

            {/* No job found section when data is empty and page is not loading */}
            {!loaderStatus && jobdata.length === 0 && (
                <div className={styles.nojob_section}>
                    <p>
                        No jobs found 😔, Please try different filter <br /> 
                        or <span onClick={handleContactusClick}>contact us</span> if the issue continue.
                    </p>
                </div>
            )}

            {(!loaderStatus || jobdata.length !== 0) && (
                <div className={styles.centerContainer}>
                    <div className={styles.jobCardContainer}>
                        {jobdata.map((data) => {
                            return (
                                <div cnt={itemCount++} key={data.id}>
                                    <Jobcard data={data} />
                                </div>
                            );
                        })}
                        {jobdata.length !== 0 && false && (
                            <div onClick={() => showMoreButtonClicked()} className={styles.moreJobContainer}>
                                {!showMoreClicked && (
                                    <span className={styles.showmore_button}>
                                        <p>Show more jobs</p>
                                        <FontAwesomeIcon className={styles.icon} icon={faChevronDown} />
                                    </span>
                                )}
                                {showMoreClicked && (
                                    <div style={{ height: "10px" }} className={styles.loaderContainer}>
                                        <div
                                            style={{
                                                height: "30px",
                                                width: "30px",
                                            }}
                                            className={styles.loader}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={styles.sidebar}></div>
                </div>
            )}

            {/*  show loader  */}
            {!showMoreClicked && loaderStatus &&(
                <div  className={styles.loader_section}>
                    <div className={styles.loader} />
                </div>
            )}
            {!loaderStatus && jobdata.length !== 0 && <Notice />}

            <WhatAppModal />
        </div>
    );
};

export default JobList;
