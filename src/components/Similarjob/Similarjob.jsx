import React, { useEffect, useState } from "react";
import styles from "./similarjob.module.scss";
import { getJobListData } from "@/core/apis/jobapicall";
import Similarjobcard from "./Similarjobcard";

const Similarjob = (props) => {
    const { companytype, id } = props;
    const [jobData, setJobData] = useState(null);

    const loadJobDetails = async () => {
        const jobdata = await getJobListData(2, 5);
        setJobData(jobdata.data);
    };

    useEffect(() => {
        loadJobDetails();
    }, []);

    return (
        <div className={styles.similarjob}>
            <h3 className={styles.similarjob_header}>Similar jobs</h3>
            <p className={styles.similarjob_subHeader}>Here are other jobs you might want to apply for.</p>
            <div className={styles.similarCosmponent}>
                {jobData &&
                    jobData.map((item, index) => {
                        return <div key={index}>{(item.id !== id && item.jdpage === "true") && <Similarjobcard data={item} />}</div>;
                    })}
            </div>
        </div>
    );
};

export default Similarjob;
