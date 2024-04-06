import React from "react";
import Router from "next/router";
import Image from "next/image";
import { firenbaseEventHandler } from "@/core/eventHandler";

import styles from "./similarjob.module.scss";

const Similarjobcard = (props) => {
    console.log("props", props);
    const { title, imagePath, batch, degree, id, jobtype, location, experience } = props.data;
    const titleforShare = title.replace(/[\s;]+/g, "-").toLowerCase();
    const redirectToJobdetailPage = () => {
        firenbaseEventHandler("similar_jobcard_clicked", {
            job_id: id,
            job_title: title,
        });
        Router.push(`/${titleforShare}/${id}`);
    };

    return (
        <div onClick={() => redirectToJobdetailPage()} className={styles.similarjob}>
            <Image className={styles.similarjob_logo} src={imagePath} height={40} width={40} alt="company logo"></Image>
            <div>
                <h4 className={styles.similarjob_title}>{title}</h4>
                <div className={styles.similarjob_details}>
                    <p>
                        {jobtype} • {experience} • {location}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Similarjobcard;
