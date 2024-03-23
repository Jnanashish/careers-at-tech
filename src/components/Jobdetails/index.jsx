import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Router from "next/router";

import styles from "./jobdetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { countClickinJd } from "@/core/apis/jobapicall";
import Similarjob from "../Similarjob/Similarjob";
import { firenbaseEventHandler } from "@/core/eventHandler";
import { shareJobDetails } from "@/Helpers/socialmediahandler";

const Jobdetails = (jobdata) => {
    const data = jobdata.jobdata;

    // when back button is clicked move to job listing page
    const handleBackButtonclick = () => {
        firenbaseEventHandler("back_button_clicked", {
            job_id: data._id,
            job_title: data.title,
        });
        Router.push("/jobs");
    };

    // when apply now button is clicked
    const applyButtonClicked = () => {
        firenbaseEventHandler("apply_button_clicked", {
            job_id: data._id,
            job_title: data.title,
            is_jd_page: true,
        });
        countClickinJd(data._id);
    };

    return (
        <div>
            <div className={styles.jobdetails}>
                {false && (
                    <span onClick={handleBackButtonclick} className={styles.jobdetails_backbuttonsection}>
                        <FontAwesomeIcon className={styles.back_icon} icon={faCaretLeft} />
                        <p>Back to all jobs</p>
                    </span>
                )}

                {/* header section, share icon, logo, title */}
                <>
                    <div className={styles.header}>
                        <span>{data.imagePath !== "none" && <Image className={styles.companyLogo} height={45} width={45} src={data.imagePath} alt={data.companyName + "logo"} />}</span>
                        <span onClick={() => shareJobDetails(data)} className={styles.sharebutton}>
                            <span>Share job</span>
                            <FontAwesomeIcon className={styles.shareicon} icon={faShareNodes} />
                        </span>
                    </div>

                    <h1 className={styles.job_title}>{data.role}</h1>
                    <span className={styles.companyname_section}>
                        <p className={styles.companyname}>{data.companyName}</p>
                        <p className={styles.posteddate}> • Posted 1 day ago</p>
                    </span>
                </>

                {/* job details section in a box  */}
                <div className={styles.detailssection}>
                    {data.experience !== "N" && <p>Experience : {data.experience}</p>}
                    {data.degree !== "N" && <p>Degree : {data.degree}</p>}
                    {data.batch !== "N" && <p>Batch : {data.batch}</p>}
                    {data.location !== "N" && <p>Location : {data.location}</p>}
                    {data.salary !== "N" && <p>Salary : {data.salary}</p>}
                </div>

                {data.jobdesc !== "N" && data.jobdesc !== "<p>N</p>" && (
                    <div className={styles.jobinfo}>
                        <p>{parse(data.jobdesc)}</p>
                    </div>
                )}

                {data.responsibility !== "N" && data.responsibility !== "<p>N</p>" && (
                    <div className={styles.jobinfo}>
                        <h3>Responsibility : </h3>
                        <p>{parse(data.responsibility)}</p>
                    </div>
                )}

                {data.eligibility !== "N" && data.eligibility !== "<p>N</p>" && (
                    <div className={styles.jobinfo}>
                        <h3>Eligibility : </h3>
                        <p>{parse(data.eligibility)}</p>
                    </div>
                )}

                {data.skills !== "N" && data.skills !== "<p>N</p>" && (
                    <div className={styles.jobinfo}>
                        <h3>Prefered Skills : </h3>
                        <p>{parse(data.skills)}</p>
                    </div>
                )}

                {data.aboutCompany !== "N" && data.aboutCompany !== "<p>N</p>" && (
                    <div className={styles.jobinfo}>
                        <h3>About Company : </h3>
                        <p>{parse(data.aboutCompany)}</p>
                    </div>
                )}

                <a onClick={applyButtonClicked} href={data.link} rel="noreferrer" target="_blank">
                    <div className={styles.appply_button}>Apply now</div>
                </a>
            </div>
            <Similarjob companytype={data.companytype} id={data._id} />
        </div>
    );
};

export default Jobdetails;
