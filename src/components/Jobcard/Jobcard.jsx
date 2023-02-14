import React from "react";
import Image from "next/image";
import styles from "./jobcard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEye, faClock } from "@fortawesome/free-solid-svg-icons";

const Jobcard = (props) => {
    console.log("PROPS", props);
    const {
        title,
        degree,
        batch,
        imagePath,
        jobtype,
        location,
        experience,
        jdpage,
        createdAt,
        totalclick,
    } = props.data;

    return (
        <div className={styles.jobCardContainer}>
            <div className={styles.mainSection}>
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
                            height={44}
                            width={44}
                        />
                    )}
                </div>

                <p className={styles.jobtitle}>{title}</p>
                <div className={styles.jobdetails}>
                    <div className={styles.jobdetailsItem}>
                        <h5>Degree :</h5>
                        <p>{degree}</p>
                    </div>
                    <div className={styles.jobdetailsItem}>
                        <h5>Batch :</h5>
                        <p>{batch}</p>
                    </div>
                    <div className={styles.chipContainer}>
                        <div>
                            {jobtype !== "N" && (
                                <span
                                    style={{ backgroundColor: "#e1ebff", color: "#1d4ed8" }}
                                    className={styles.chip}>
                                    {jobtype}
                                </span>
                            )}
                            {location !== "N" && (
                                <span
                                    style={{ backgroundColor: "#def7ec", color: "#046C4E" }}
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
                                    style={{ backgroundColor: "#F0ECFF", color: "#6B46C1" }}
                                    className={styles.chip}>
                                    <FontAwesomeIcon className={styles.chipIcon} icon={faClock} />
                                    {experience}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerSection}>
                {totalclick && (
                    <p>
                        <FontAwesomeIcon className={styles.chipIcon} icon={faEye} />
                        {totalclick + 200} impressions
                    </p>
                )}
                <p>
                    {createdAt && createdAt !== "null"
                        ? createdAt.slice(0, 10).split("-").reverse().join("-")
                        : ""}
                </p>
            </div>
        </div>
    );
};

export default Jobcard;
