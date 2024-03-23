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
        <div className={styles.similarjob_section}>
            <h3>Similar jobs</h3>
            <div className={styles.similarComponent}>
                {jobData &&
                    jobData.map((item, index) => {
                        return <div key={index}>{(item.id !== id && item.jdpage === "true" || true) && <Similarjobcard data={item} />}</div>;
                    })}
            </div>
        </div>
    );
};

export default Similarjob;
