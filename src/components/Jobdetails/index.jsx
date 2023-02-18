import React from "react";
import Image from "next/image";
import styles from "./jobdetails.module.scss";
import parse from "html-react-parser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

function Jobdetails(jobdata) {
    const data = jobdata.jobdata;
    console.log("DATA==>", data);
    return (
        <div className={styles.mainContainer}>
            <div>
                <div className={styles.headerContainer}>
                    <Image
                        height={45}
                        width={45}
                        src={data.imagePath}
                        alt={data.companyName + "logo"}
                    />
                    <div className={styles.shareBtn}>Share Job</div>
                </div>
                <h1 className={styles.jobTitle}>{data.title}</h1>
            </div>
            <div className={styles.detailsContainer}>
                {data.experience !== "N" && (
                    <p>
                        <span> Experience</span> : {data.experience}
                    </p>
                )}
                {data.degree !== "N" && (
                    <p>
                        <span> Degree</span> : {data.degree}
                    </p>
                )}
                {data.batch !== "N" && (
                    <p>
                        <span> Batch</span> : {data.batch}
                    </p>
                )}
                {data.location !== "N" && (
                    <p>
                        <span> Location</span> : {data.location}
                    </p>
                )}
                {data.salary !== "N" && (
                    <p>
                        <span> Salary</span> : {data.salary}
                    </p>
                )}
            </div>
            {data.jobdesc !== "<p>N</p>" && (
                <div className={styles.joddetailContainer}>{parse(data.jobdesc)}</div>
            )}

            {data.responsibility !== "<p>N</p>" && (
                <div className={styles.joddetailContainer}>
                    <h3>Responsibility : </h3>
                    {parse(data.responsibility)}
                </div>
            )}
            {data.eligibility !== "N" && (
                <div className={styles.joddetailContainer}>
                    <h3>Eligibility : </h3>
                    {parse(data.eligibility)}
                </div>
            )}
            {data.skills !== "<p>N</p>" && (
                <div className={styles.joddetailContainer}>
                    <h3>Prefered Skills : </h3>
                    {parse(data.skills)}
                </div>
            )}
            <div className={styles.shareContainer}>
                <p>
                    To apply directly on company portail copy the link and open this job detail page
                    on your browser
                </p>
                <div className={styles.openonBrowswer}>
                    <p> Copy the Apply link</p>
                    <FontAwesomeIcon className={styles.chipIcon} icon={faCopy} />
                </div>
                <div className={styles.whatsappShareBtn}>
                    <p> Share this Job on WhatsApp</p>
                </div>
            </div>
            {data.aboutCompany !== "<p>N</p>" && (
                <div className={styles.joddetailContainer}>
                    <h3>About Company : </h3>
                    {parse(data.aboutCompany)}
                </div>
            )}
            <a href={data.link} rel="noreferrer" target="_blank">
                <div className={styles.applyBtn}>Apply Now</div>
            </a>
        </div>
    );
}

export default Jobdetails;
