import React, { useEffect } from "react";
import Router from "next/router";
import Image from "next/image";
import { firenbaseEventHandler } from "@/core/eventHandler";

import styles from "./similarjob.module.scss";

const Similarjobcard = (props) => {
    const { title, imagePath, batch, degree, id } = props.data;

    const titleforShare = title.replace(/[\s;]+/g, "-").toLowerCase();
    const redirectToJobdetailPage = () => {
        firenbaseEventHandler("similar_jobcard_clicked", {
            job_id: id,
            job_title: title,
        });
        Router.push(`/${titleforShare}/${id}`);
    };
    return (
        <div onClick={() => redirectToJobdetailPage()} className={styles.jobCardContainer}>
            <div className={styles.headerContainer}>
                <Image
                    className={styles.compantLogo}
                    src={imagePath}
                    height={40}
                    width={40}
                    alt="company logo"></Image>
                <div>
                    <h4 className={styles.jobTitle}>{title}</h4>
                    <div className={styles.jobdetails}>
                        <p>
                            <b>Batch : </b>
                            {batch}
                        </p>
                        <p>
                            <b>Degree : </b>
                            {degree}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Similarjobcard;
