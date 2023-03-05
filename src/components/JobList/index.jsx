import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import components
import DasBanner from "../Das/DasBanner";
import DasLink from "../Das/DasLink";
import styles from "./joblist.module.scss";
import WhatsAppJoin from "../common/WhatsappJoin";
import Jobcard from "../Jobcard/Jobcard";
import { getJobListData, getcompanynamedata } from "@/core/apis/jobapicall";
import Notice from "../common/Notice/notice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const JobList = () => {
    const [dasBanner, setDasBanner] = useState(null);
    const [jobdata, setJobdata] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [loading, setLoading] = useState(true);
    const [companyname, setCompanyname] = useState("");
    const [jobType, setJobType] = useState("fulltime");

    const dasBannerData = useSelector((state) => state.das.dasBanner);

    useEffect(() => {
        if (dasBannerData) {
            setDasBanner(dasBannerData);
        }
    }, [dasBannerData]);
    useEffect(() => {
        callJobList();
    }, [pageno]);

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
        getcompanynamedata(companyname).then((result) => {
            setJobdata([]);
            if (result.error) {
                console.log("Cannot Load data");
            }
            setLoading(false);
            setJobdata(result.data);
        });
    };

    var itemCount = 0;
    return (
        <div>
            <div className={styles.headerSection}>
                <h2>
                    Discover verified 💯 <br /> tech <span>Jobs</span> and <span>Internships</span>
                    <br /> at top companies.
                </h2>

                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.searchcompany}
                        value={companyname}
                        onChange={(e) => setCompanyname(e.target.value)}
                        placeholder="Search Jobs with company name"
                    />
                    <button onClick={() => getCompanyData()} className={styles.search_btn}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className={styles.radioGroup}>
                    <span onClick={() => setJobType("fulltime")}>
                        <input type="radio" checked={jobType === "fulltime"} name="gender" />{" "}
                        <p
                            style={
                                jobType === "fulltime"
                                    ? { color: "#0069ff", fontWeight: "600" }
                                    : {}
                            }>
                            Full time
                        </p>
                    </span>
                    <span onClick={() => setJobType("internship")}>
                        <input type="radio" checked={jobType === "internship"} name="gender" />{" "}
                        <p
                            style={
                                jobType === "internship"
                                    ? { color: "#0069ff", fontWeight: "600" }
                                    : {}
                            }>
                            Internship
                        </p>
                    </span>
                </div>
            </div>
            <div className={styles.nojobContainer}>
                <p>
                    No jobs found 😔 ! <br /> Please try differnet filter
                </p>
            </div>
            {dasBanner && dasBanner.length <= 1 && <DasLink />}
            <div className={styles.dasContainer}>
                {dasBanner && dasBanner.length > 1 && <DasBanner />}
            </div>
            {(!loading || jobdata.length !== 0) && (
                <div>
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
                    </div>
                    <div className={styles.moreJobContainer}>
                        <p onClick={() => setPageno(pageno + 1)}>Show more jobs</p>
                    </div>
                </div>
            )}
            {loading && (
                <div
                    style={jobdata.length === 0 ? { height: "70vh" } : { height: "100px" }}
                    className={styles.loaderContainer}>
                    <div className={styles.loader} />
                </div>
            )}
            <Notice />
        </div>
    );
};

export default JobList;
