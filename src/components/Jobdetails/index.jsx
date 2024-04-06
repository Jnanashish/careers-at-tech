import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Router from "next/router";

import styles from "./jobdetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faCaretLeft, faLocationDot, faClock, faGraduationCap, faCalendar, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

import { countClickinJd } from "@/core/apis/jobapicall";
import Similarjob from "../Similarjob/Similarjob";
import { firenbaseEventHandler } from "@/core/eventHandler";
import { shareJobDetails } from "@/Helpers/socialmediahandler";
import WhatAppBanner from "../Banners/WhatsappBanner";

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
                <span onClick={handleBackButtonclick} className={styles.jobdetails_backbuttonsection}>
                    <FontAwesomeIcon className={styles.back_icon} icon={faCaretLeft} />
                    <p>Back to all jobs</p>
                </span>

                {/* header section, share icon, logo, title */}
                <div className={styles.jobinfo}>
                    <div className={styles.header}>
                        <span>{data.imagePath !== "none" && <Image className={styles.companyLogo} height={42} width={42} src={data.imagePath} alt={data.companyName + "logo"} />}</span>
                        <span onClick={() => shareJobDetails(data)} className={styles.sharebutton}>
                            <span>Share job</span>
                            <FontAwesomeIcon className={styles.shareicon} icon={faShareNodes} />
                        </span>
                    </div>

                    <h1 className={styles.jobinfo_title}>{data.role}</h1>
                    <span className={styles.jobinfo_companynamesection}>
                        <p className={styles.jobinfo_companynamesection_name}>{data.companyName}</p>
                        <p className={styles.jobinfo_companynamesection_postdate}> • Posted 1 day ago</p>
                    </span>
                </div>

                <div className={styles.detailssectionnew}>
                    {data.experience && (
                        <div>
                            <p>Experience</p>
                            <span>
                                <FontAwesomeIcon className={styles.chipIcon} icon={faCalendar} />
                                <p>{data.experience}</p>
                            </span>
                        </div>
                    )}
                    {data.degree && (
                        <div>
                            <p>Degree</p>
                            <span>
                                <FontAwesomeIcon className={styles.chipIcon} icon={faGraduationCap} />
                                <p>{data.degree}</p>
                            </span>
                        </div>
                    )}
                    {data.location && (
                        <div>
                            <p>Location</p>
                            <span>
                                <FontAwesomeIcon className={styles.chipIcon} icon={faLocationDot} />
                                <p>{data.location}</p>
                            </span>
                        </div>
                    )}
                    {data.batch && (
                        <div>
                            <p>Batch</p>
                            <span>
                                <FontAwesomeIcon className={styles.chipIcon} icon={faClock} />
                                <p>{data.batch}</p>
                            </span>
                        </div>
                    )}
                    {data.salary && (
                        <div>
                            <p>Salary</p>
                            <span>
                                <FontAwesomeIcon className={styles.chipIcon} icon={faMoneyCheckDollar} />
                                <p>{data.salary}</p>
                            </span>
                        </div>
                    )}
                </div>

                {data.jobdesc !== "N" && data.jobdesc !== "<p>N</p>" && (
                    <div className={styles.jobinfo}>
                        <p>{parse(data.jobdesc)}</p>
                    </div>
                )}

                <span className={`${styles.bannercontainer} mobileview`}>
                    <WhatAppBanner isModal={false} />
                </span>

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

                <span className={`${styles.bannercontainer} mobileview`}>
                    <WhatAppBanner isModal={false} />
                </span>

                <a onClick={applyButtonClicked} href={data.link} rel="noreferrer" target="_blank">
                    <div className={styles.appply_button}>Apply now</div>
                </a>
            </div>
            <Similarjob companytype={data.companytype} id={data._id} />
        </div>
    );
};

export default Jobdetails;
