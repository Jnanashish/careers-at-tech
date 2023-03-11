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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

const JobList = () => {
    const [dasBanner, setDasBanner] = useState(null);
    const [jobdata, setJobdata] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [loading, setLoading] = useState(true);
    const [companyname, setCompanyname] = useState("");
    const [jobType, setJobType] = useState(null);
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
        if (jobType) {
            setLoading(true);
            getRoleData(jobType);
        }
    }, [jobType]);

    const callJobList = async () => {
        setLoading(true);
        const apiResponse = await getJobListData(pageno);
        if (apiResponse.data) {
            setJobdata([...jobdata, ...apiResponse.data]);
            setLoading(false);
        }
    };
    const getCompanyData = () => {
        setLoading(true);
        setJobdata([]);
        getcompanynamedata(companyname).then((result) => {
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
        setJobdata([]);
        setCompanyname("");
        callJobList();
    };

    var itemCount = 0;
    return (
        <div>
            {/* Header section and filter  */}
            <div className={styles.headerContainer}>
                <div className={styles.headerSection}>
                    <h2>
                        Discover 💯 verified <br /> tech <span>Jobs</span> and{" "}
                        <span>Internships</span>
                        <br /> at top companies.
                    </h2>

                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            className={styles.searchcompany}
                            value={companyname}
                            onChange={(e) => setCompanyname(e.target.value)}
                            placeholder="Search jobs with company or title"
                        />

                        <div
                            style={
                                companyname && companyname.length != 0
                                    ? { color: "#0069FF" }
                                    : { color: "#FFF" }
                            }
                            onClick={() => handleCancelClick()}
                            className={styles.cancelButton}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>

                        <div onClick={() => getCompanyData()} className={styles.search_btn}>
                            <FontAwesomeIcon
                                style={{ height: "20px", width: "20px" }}
                                icon={faSearch}
                            />
                        </div>
                    </div>

                    <div className={styles.radioGroup}>
                        <span onClick={() => setJobType("full")}>
                            <input
                                placeholder="full time radio"
                                type="radio"
                                checked={jobType === "full"}
                                name="gender"
                            />{" "}
                            <p
                                style={
                                    jobType === "full"
                                        ? { color: "#0069ff", fontWeight: "600" }
                                        : {}
                                }>
                                Full time
                            </p>
                        </span>
                        <span onClick={() => setJobType("intern")}>
                            <input
                                placeholder="intern radio"
                                type="radio"
                                checked={jobType === "intern"}
                                name="gender"
                            />{" "}
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
                                <p onClick={() => setPageno(pageno + 1)}>Show more jobs</p>
                            </div>
                        )}
                    </div>
                    <div className={styles.sidebar}></div>
                </div>
            )}
            {loading && (
                <div
                    style={jobdata.length === 0 ? { height: "400px" } : { height: "100px" }}
                    className={styles.loaderContainer}>
                    <div className={styles.loader} />
                </div>
            )}
            {!loading && jobdata.length !== 0 && <Notice />}
        </div>
    );
};

export default JobList;
