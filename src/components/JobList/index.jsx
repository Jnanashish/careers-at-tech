import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import components
import Linkmid from "./Linkmid";
import DasBanner from "../Das/DasBanner";
import DasLink from "../Das/DasLink";
import styles from "./linkmid.module.scss";

const JobList = (jobdata) => {
    const [dasBanner, setDasBanner] = useState(null);
    const dasBannerData = useSelector((state) => state.das.dasBanner);
    useEffect(() => {
        if (dasBannerData) {
            setDasBanner(dasBannerData);
        }
    }, [dasBannerData]);

    var itemCount = 0;
    return (
        <>
            {dasBanner && dasBanner.length === 0 && <DasLink />}

            <DasBanner />
            <div>
                {jobdata &&
                    jobdata.jobdata.map((data) => {
                        return (
                            <div cnt={itemCount++} key={data.id}>
                                {itemCount % 5 === 3 && <DasLink />}
                                <Linkmid data={data} />
                            </div>
                        );
                    })}
            </div>
            <div className={styles.moreJobContainer}>
                <a href="http://bit.ly/3K1qQ8w">For more jobs join Telegram</a>
            </div>
        </>
    );
};

export default JobList;
