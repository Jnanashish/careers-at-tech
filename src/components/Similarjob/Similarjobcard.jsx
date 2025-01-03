import React from "react";
import Router from "next/router";
import Image from "next/image";
import { firenbaseEventHandler } from "@/core/eventHandler";

import styles from "./similarjob.module.scss";
import { DEFAULT_COMPANY_LOGO } from "@/Helpers/config";

const Similarjobcard = (props) => {
    console.log("props", props);
    const { title, imagePath, batch, degree, id, jobtype, location, experience, company } = props.data;
    const titleforShare = title.replace(/[\s;]+/g, "-").toLowerCase();
    const redirectToJobdetailPage = () => {
        firenbaseEventHandler("similar_jobcard_clicked", {
            job_id: id,
            job_title: title,
        });
        Router.push(`/${titleforShare}/${id}`);
    };

    const companyLogo = () => {
        const logo = company?.smallLogo || imagePath;
        if (!logo || logo === "none") {
            return DEFAULT_COMPANY_LOGO;
        }
        return logo;
    };

    return (
        <div onClick={() => redirectToJobdetailPage()} className={styles.similarjobcard}>
            <Image className={styles.similarjobcard_logo} src={companyLogo()} height={40} width={40} alt="company logo"></Image>
            <div>
                <h4 className={styles.similarjobcard_title}>{title}</h4>
                <div className={styles.similarjobcard_details}>
                    <p>
                        {jobtype} • {experience} • {location}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Similarjobcard;
