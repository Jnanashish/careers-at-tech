import React, { useEffect, useState } from "react";
import styles from "./similarjob.module.scss";
import { getJobListData } from "@/core/apis/jobapicall";
import Similarjobcard from "./Similarjobcard";

const Similarjob = (props) => {
    const { companytype, id } = props;
    const [jobData, setJobData] = useState(null);

    useEffect(() => {
        loadJobDetails();
    }, []);

    const loadJobDetails = async () => {
        const jobdata = await getJobListData(2, 5);
        setJobData(jobdata.data);
    };
    return (
        <div className={styles.mainContainer}>
            <h3>Similar Jobs :</h3>
            <div className={styles.similarComponent}>
                {jobData &&
                    jobData.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.id !== id && item.jdpage === "true" && (
                                    <Similarjobcard data={item} />
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Similarjob;
