import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEye, faClock, faShareNodes } from "@fortawesome/free-solid-svg-icons";

// import local components and methods
import Modal from "../common/Modal/Modal";
import { countClickinJd } from "@/core/apis/jobapicall";
import styles from "./jobcard.module.scss";

const Jobcard = (props) => {
    const {
        title,
        degree,
        batch,
        imagePath,
        jobtype,
        location,
        experience,
        jdpage,
        totalclick,
        id,
        link,
    } = props.data;
    const [showModal, setShowModal] = useState(false);
    const [popType, setPopType] = useState("none");
    const [jobcardClicked, setJobcardClicked] = useState(false);
    const titleforShare = title.replace(/[\s;]+/g, "-").toLowerCase();
    const impression =
        totalclick === 0 ? 100 : totalclick < 200 ? totalclick + 200 : totalclick + 300;

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
        setJobcardClicked(true);
        if (jobtype === "promo") {
            countClickinJd(id);
            window.location.assign(link);
        } else {
            if (jdpage === "true") {
                redirectToJobdetailPage();
            }
            if (jdpage === "false" && popType === "none") {
                window.location.assign(link);
                countClickinJd(id);
            }
            if (jdpage === "false" && popType !== "none") {
                setShowModal(true);
            }
        }
    };

    const handleShareClick = () => {
        if (jdpage === "true") {
            const joblink = `https://careersat.tech/${titleforShare}/${id}`;
            if (navigator.share) {
                navigator.share({
                    title: `${title} | ${title}`,
                    text: `Hey 👋! \nCheckout this job : ${title} \n\nTo know more visit`,
                    url: joblink,
                });
            } else {
                const msg = `Hey 👋! %0ACheckout this job opening.%0A${title} %0A%0ATo know more visit here : %0A${joblink}`;
                window.open(`whatsapp://send?text=${msg}`);
            }
        } else {
            if (navigator.share) {
                navigator.share({
                    title: `${title} | ${title}`,
                    text: `Hey 👋! %0ACheckout this job : ${title} %0AApply to this job from here ${link}. %0A%0AFor more job opportunity visit %0A`,
                    url: "https://careersat.tech/jobs",
                });
            } else {
                const url = "https://careersat.tech/jobs";
                const msg = `Hey 👋! %0ACheckout this job opening.%0A${title} %0A%0AApply to this job role from here : %0A${link}%0A%0AFor more job opportunity visit %0A$👉{url}`;
                window.open(`whatsapp://send?text=${msg}`);
            }
        }
    };

    return (
        <div className={styles.jobCardContainer}>
            {showModal && (
                <Modal
                    id={id}
                    link={link}
                    showModal={showModal}
                    toggleModalView={toggleModalView}
                />
            )}
            {!jobcardClicked && (
                <div
                    onClick={() => {
                        handleJobCardClick();
                    }}
                    onMouseEnter={() => onMouseEnter()}
                    className={styles.mainSection}>
                    <div className={styles.companyLogoContainer}>
                        {imagePath === "none" ? (
                            <div className={styles.logotext}>
                                <p>{title[0]}</p>
                            </div>
                        ) : (
                            <Image
                                className={styles.companyLogo}
                                src={imagePath}
                                alt="Company logo"
                                height={50}
                                width={50}
                            />
                        )}
                    </div>

                    <p className={styles.jobtitle}>{title}</p>
                    {jobtype !== "promo" && (
                        <div className={styles.jobdetails}>
                            <div className={styles.jobdetailsItem}>
                                <p className={styles.detailTitle}>Degree :</p>
                                <p>{degree}</p>
                            </div>
                            <div className={styles.jobdetailsItem}>
                                <p className={styles.detailTitle}>Batch :</p>
                                <p>{batch}</p>
                            </div>
                            <div className={styles.chipContainer}>
                                <div>
                                    {jobtype !== "N" && (
                                        <span
                                            style={{
                                                backgroundColor: "#e1ebff",
                                                color: "#1d4ed8",
                                            }}
                                            className={styles.chip}>
                                            {jobtype}
                                        </span>
                                    )}
                                    {location !== "N" && (
                                        <span
                                            style={{
                                                backgroundColor: "#def7ec",
                                                color: "#046C4E",
                                            }}
                                            className={styles.chip}>
                                            <FontAwesomeIcon
                                                className={styles.chipIcon}
                                                icon={faLocationDot}
                                            />
                                            {location}
                                        </span>
                                    )}
                                    {experience !== "N" && experience.length < 12 && (
                                        <span
                                            style={{
                                                backgroundColor: "#F0ECFF",
                                                color: "#6B46C1",
                                            }}
                                            className={styles.chip}>
                                            <FontAwesomeIcon
                                                className={styles.chipIcon}
                                                icon={faClock}
                                            />
                                            {experience}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {jobcardClicked && (
                <div className={styles.loaderContainer}>
                    <div className={styles.loader} />
                </div>
            )}
            <div onClick={() => handleShareClick()} className={styles.footerSection}>
                <p>
                    <FontAwesomeIcon className={styles.chipIcon} icon={faEye} />
                    {impression + 300} views
                </p>
                <div className={styles.shareContainer}>
                    <p>Share</p>
                    <FontAwesomeIcon className={styles.chipIcon} icon={faShareNodes} />
                </div>
            </div>
        </div>
    );
};

export default Jobcard;
