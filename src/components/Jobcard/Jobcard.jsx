import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEye, faClock, faShareNodes } from "@fortawesome/free-solid-svg-icons";

import { format } from "timeago.js";

// import local components and methods
// import Modal from "../../Temp/Modal/Modal";
import { countClickinJd } from "@/core/apis/jobapicall";
import styles from "./jobcard.module.scss";
import { handleShareClick } from "../../core/shareJobs";
import { firenbaseEventHandler } from "@/core/eventHandler";

const Jobcard = (props) => {
    const { title, role, degree, batch, imagePath, jobtype, location, experience, jdpage, totalclick, id, link, companyName, createdAt } = props.data;
    const [showModal, setShowModal] = useState(false);
    const [popType, setPopType] = useState("none");
    const [jobcardClicked, setJobcardClicked] = useState(false);
    const [daysAgo, setDaysAgo] = useState(null);

    const titleforShare = title.replace(/[\s;]+/g, "-").toLowerCase();
    const impression = totalclick * 3;

    // set type of das popup when page load
    const dasPoptype = useSelector((state) => state.das.dasPoptype);
    useEffect(() => {
        if (dasPoptype && dasPoptype[0]) {
            setPopType(dasPoptype[0].adpoptype);
        }
    }, [dasPoptype]);

    // redirect to job detail page when jdpage is true
    const redirectToJobdetailPage = () => {
        Router.push(`/${titleforShare}/${id}`);
    };

    const toggleModalView = () => {
        setShowModal(!showModal);
        setJobcardClicked(false);
    };
    const onMouseEnter = () => {
        if (jdpage === "true") {
            Router.prefetch(`/${titleforShare}/${id}`);
        }
    };

    // handle job card and footer section click
    const handleJobCardClick = () => {
        firenbaseEventHandler("job_card_clicked", {
            job_id: id,
            jd_page: jdpage,
            job_title: title,
        });
        if (jobtype === "promo" || true) {
            countClickinJd(id);
            window.open(link);
        } else {
            if (jdpage === "true") {
                setJobcardClicked(true);
                redirectToJobdetailPage();
            }
            if (jdpage === "false" && popType === "none") {
                firenbaseEventHandler("apply_button_clicked", {
                    job_id: id,
                    job_title: title,
                    is_jd_page: jdpage,
                });
                window.open(link);
                // window.location.assign(link);
                countClickinJd(id);
            }
            if (jdpage === "false" && popType !== "none") {
                setShowModal(true);
            }
        }
    };

    return (
        <div className={styles.jobCardContainer}>
            {!jobcardClicked && (
                <div
                    onClick={() => {
                        handleJobCardClick();
                    }}
                    onMouseEnter={() => onMouseEnter()}
                    className={styles.mainSection}
                >
                    <div className={styles.companyLogoContainer}>
                        {imagePath === "none" ? (
                            <div className={styles.logotext}>
                                <p>{title[0]}</p>
                            </div>
                        ) : (
                            <Image className={styles.companyLogo} src={imagePath} alt="Company logo" height={50} width={50} />
                        )}
                    </div>

                    <div className={styles.jobTitleContainer}>
                        <p className={styles.jobtitle}>{role !== "N" ? role : title}</p>
                        {jobtype !== "promo" && <p className={styles.companyName}>{companyName}</p>}
                    </div>

                    {jobtype !== "promo" && (
                        <div className={styles.jobdetails}>
                            <div>
                                {degree !== "N" && (
                                    <div className={styles.jobdetailsItem}>
                                        <p className={styles.detailTitle}> Degree :</p>
                                        <p>{degree}</p>
                                    </div>
                                )}
                                {batch !== "N" && (
                                    <div className={styles.jobdetailsItem}>
                                        <p className={styles.detailTitle}>Batch :</p>
                                        <p>{batch}</p>
                                    </div>
                                )}

                                {/* chip section  */}
                                <div className={styles.chipContainer}>
                                    {jobtype !== "N" && (
                                        <span
                                            style={{
                                                backgroundColor: "#e1ebff",
                                                color: "#1d4ed8",
                                            }}
                                            className={styles.chip}
                                        >
                                            {jobtype}
                                        </span>
                                    )}
                                    {location !== "N" && (
                                        <span
                                            style={{
                                                backgroundColor: "#def7ec",
                                                color: "#046C4E",
                                            }}
                                            className={styles.chip}
                                        >
                                            <FontAwesomeIcon className={styles.chipIcon} icon={faLocationDot} />
                                            <p>{location}</p>
                                        </span>
                                    )}
                                    {experience !== "N" && experience.length < 12 && (
                                        <span
                                            style={{
                                                backgroundColor: "#F0ECFF",
                                                color: "#6B46C1",
                                            }}
                                            className={styles.chip}
                                        >
                                            <FontAwesomeIcon className={styles.chipIcon} icon={faClock} />
                                            {experience}
                                        </span>
                                    )}
                                </div>
                                <p className={styles.postedMsg}>Posted {format(createdAt)}</p>
                            </div>
                            <p className={styles.views}>
                                <FontAwesomeIcon className={styles.viewIcon} style={{ marginRight: "3px" }} icon={faEye} />
                                {impression + 300} views
                            </p>
                        </div>
                    )}
                </div>
            )}
            {jobtype !== "promo" && jobcardClicked && (
                <div className={styles.loaderContainer}>
                    <div className={styles.loader} />
                </div>
            )}

            {/* footer with view count and share for mobile only  */}
            {jobtype !== "promo" && (
                <div onClick={() => handleShareClick(props.data)} className={styles.footerSection}>
                    <p>
                        {/*<FontAwesomeIcon*/}
                        {/*    className={styles.footerIcon}*/}
                        {/*    style={{ marginRight: "3px", height: "10px", width: "10px" }}*/}
                        {/*    icon={faEye}*/}
                        {/*/>*/}
                        {impression + 300} views
                    </p>
                    <div className={styles.shareContainer}>
                        <p>Share</p>
                        <FontAwesomeIcon className={styles.footerIcon} icon={faShareNodes} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobcard;
