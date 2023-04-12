import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import styles from "./joblist.module.scss";

// import components
import DasBanner from "../Das/DasBanner";
import DasLink from "../Das/DasLink";
import Jobcard from "../Jobcard/Jobcard";
import { getJobListData, getcompanynamedata, getjdJobtypeData } from "@/core/apis/jobapicall";
import Notice from "../common/Notice/notice";
import WhatsAppJoin from "../common/WhatsappJoin";
import { firenbaseEventHandler } from "@/core/eventHandler";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

const JobList = () => {
    const [dasBanner, setDasBanner] = useState(null);
    const [jobdata, setJobdata] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [loading, setLoading] = useState(true);
    const [companyname, setCompanyname] = useState("");
    const [jobType, setJobType] = useState(null);
    const [showMoreClicked, setShowMoreClicked] = useState(false);
    const [searchWord, setSearchWord] = useState([
        "Frontend",
        "Backend",
        "Software engineer",
        "Web developer",
        "Test Engineer",
        "Fullstack",
    ]);
    const [selectedSearchWord, setSelectedSearchWord] = useState("");
    const dasBannerData = useSelector((state) => state.das.dasBanner);

    useEffect(() => {
        if (dasBannerData) {
            setDasBanner(dasBannerData);
        }
    }, [dasBannerData]);
    useEffect(() => {
        callJobList();
    }, [pageno]);
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

    const callJobList = async () => {
        setLoading(true);
        const apiResponse = await getJobListData(pageno);
        if (apiResponse && apiResponse.data) {
            setJobdata([...jobdata, ...apiResponse.data]);
            setLoading(false);
            setShowMoreClicked(false);
        }
    };
    const getCompanyData = (keyword = "") => {
        let searchTerm;
        if (keyword != "") {
            searchTerm = keyword;
        } else {
            firenbaseEventHandler("search_filter_clicked", {
                search_term: companyname,
            });
            searchTerm = companyname;
        }

        setLoading(true);
        setJobdata([]);
        getcompanynamedata(searchTerm).then((result) => {
            setJobdata([]);
            if (result.error) {
                console.log("Cannot Load data");
            }
            setLoading(false);
            setJobdata(result.data);
        });
    };

    const getRoleData = async (role) => {
        setJobdata([]);
        getjdJobtypeData(role).then((result) => {
            if (result.error) {
                console.log("Cannot Load data");
            }
            setLoading(false);
            setJobdata(result.data);
        });
        1;
    };

    const handleCancelClick = () => {
        firenbaseEventHandler("clear_search_field_clicked", {
            search_term: companyname,
        });
        setPageno(1);
        setJobdata([]);
        setCompanyname("");
        callJobList();
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
            getCompanyData(word);
        }
    };
    const showMoreButtonClicked = () => {
        setShowMoreClicked(true);
        firenbaseEventHandler("showmore_button_clicked", {
            pageno: pageno,
        });
        setPageno(pageno + 1);
    };
    const handleJobtypeFilterClicked = (jobtype) => {
        setJobType(jobtype);
        firenbaseEventHandler("jobtype_filter_selected", {
            job_type: jobtype,
        });
    };

    var itemCount = 0;
    return (
        <div>
            {/* Header section and filter  */}
            <div className={styles.headerContainer}>
                <div className={styles.headerSection}>
                    <h2>
                        Discover verified <br /> tech <span>Jobs</span> and <span>Internships</span>
                        <br /> at top companies.
                    </h2>

                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            className={styles.searchcompany}
                            value={companyname}
                            onChange={(e) => setCompanyname(e.target.value)}
                            placeholder="Search with title or company name"
                        />

                        <div
                            style={
                                companyname && companyname.length != 0
                                    ? { color: "#0069FF" }
                                    : { color: "#FFF" }
                            }
                            onClick={() => handleCancelClick()}
                            className={styles.cancelButton}>
                            <FontAwesomeIcon
                                icon={faXmark}
                                style={{ height: "16px", width: "16px" }}
                            />
                        </div>

                        <div onClick={() => getCompanyData()} className={styles.search_btn}>
                            <FontAwesomeIcon
                                style={{ height: "18px", width: "18px" }}
                                icon={faSearch}
                            />
                        </div>
                    </div>
                    <div className={styles.searchWordContainer}>
                        {searchWord.map((word, i) => {
                            return (
                                <span
                                    style={
                                        selectedSearchWord === word
                                            ? { backgroundColor: "#0069FF", color: "#FFF" }
                                            : {}
                                    }
                                    onClick={() => handleSearchWordSelection(word)}
                                    key={i}>
                                    {word}
                                </span>
                            );
                        })}
                    </div>

                    <div className={styles.radioGroup}>
                        <span onClick={() => handleJobtypeFilterClicked("full")}>
                            <input
                                placeholder="full time radio"
                                type="radio"
                                checked={jobType === "full"}
                                name="full time radio"
                                onChange={() => setJobType("full")}
                            />
                            <p
                                style={
                                    jobType === "full"
                                        ? { color: "#0069ff", fontWeight: "600" }
                                        : {}
                                }>
                                Full time
                            </p>
                        </span>
                        <span onClick={() => handleJobtypeFilterClicked("intern")}>
                            <input
                                placeholder="intern radio"
                                type="radio"
                                checked={jobType === "intern"}
                                name="intern radio"
                                onChange={() => setJobType("intern")}
                            />
                            <p
                                style={
                                    jobType === "intern"
                                        ? { color: "#0069ff", fontWeight: "600" }
                                        : {}
                                }>
                                Internship
                            </p>
                        </span>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1678515591/3d-business-young-woman-sitting-with-laptop-and-stylus_fvym3e.png"
                        alt="girl with computer"
                        height={324}
                        width={256}
                    />
                </div>
            </div>

            {/* No job found section  */}
            {!loading && jobdata.length === 0 && (
                <div className={styles.nojobContainer}>
                    <p>
                        No jobs found 😔 ! <br /> Please try differnet filter
                    </p>
                </div>
            )}

            {/* jobs and das list  */}
            <div className={styles.dasContainer}>
                {dasBanner && dasBanner.length <= 1 && <DasLink />}
                {dasBanner && dasBanner.length > 1 && <DasBanner />}
            </div>
            {(!loading || jobdata.length !== 0) && (
                <div className={styles.centerContainer}>
                    <div className={styles.jobCardContainer}>
                        {jobdata.map((data) => {
                            return (
                                <div cnt={itemCount++} key={data.id}>
                                    {itemCount % 3 === 0 && (
                                        <div
                                            className="mobileViewBanner"
                                            style={{ marginBottom: "20px" }}>
                                            <WhatsAppJoin />
                                        </div>
                                    )}
                                    <Jobcard data={data} />
                                </div>
                            );
                        })}
                        {jobdata.length !== 0 && (
                            <div className={styles.moreJobContainer}>
                                {!showMoreClicked && (
                                    <p onClick={() => showMoreButtonClicked()}>Show more jobs</p>
                                )}
                                {showMoreClicked && (
                                    <div
                                        style={{ height: "10px" }}
                                        className={styles.loaderContainer}>
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
            {!showMoreClicked && loading && (
                <div style={{ height: "300px" }} className={styles.loaderContainer}>
                    <div className={styles.loader} />
                </div>
            )}
            {!loading && jobdata.length !== 0 && <Notice />}
        </div>
    );
};

export default JobList;
