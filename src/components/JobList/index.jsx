import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import components
import DasBanner from "../Das/DasBanner";
import DasLink from "../Das/DasLink";
import styles from "./joblist.module.scss";
import WhatsAppJoin from "../common/WhatsappJoin";
import Jobcard from "../Jobcard/Jobcard";
import { getJobListData } from "@/core/apis/jobapicall";
import Notice from "../common/Notice/notice";

const JobList = () => {
    const [dasBanner, setDasBanner] = useState(null);
    const [jobdata, setJobdata] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [loading, setLoading] = useState(true);

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

    var itemCount = 0;
    return (
        <div>
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
