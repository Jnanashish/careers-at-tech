import React, { useState, useMemo, useCallback } from "react";
import Router from "next/router";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEye, faShareNodes, faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import { format } from "timeago.js";

import { countClickinJd } from "@/core/apis/jobapicall";
import { handleShareClick } from "@/core/shareJobs";
import Loader from "@/components/common/Loader";

import styles from "./jobcard.module.scss";

import { generateSlugFromrole, generateRandomImpression } from "@/Helpers/jobdetailshelper";
import { DEFAULT_COMPANY_LOGO } from "@/Helpers/config";

const Jobcard = (props) => {
    const { title, role, imagePath, jobtype, location, experience, jdpage, totalclick, id, link, companyName, createdAt, company } = props.data;

    const [jobcardClicked, setJobcardClicked] = useState(false);

    // Memoize derived values to prevent recalculation on each render
    const titleforShare = useMemo(() => generateSlugFromrole(title), [title]);
    const impressionClick = useMemo(() => generateRandomImpression(totalclick), [totalclick]);

    // Memoize event handlers with useCallback to prevent recreation on each render
    const redirectToJobdetailPage = useCallback(() => {
        Router.push(`/${titleforShare}/${id}`);
    }, [titleforShare, id]);

    const onMouseEnter = useCallback(() => {
        if (jdpage === "true") {
            Router.prefetch(`/${titleforShare}/${id}`);
        }
    }, [jdpage, titleforShare, id]);

    // Memoize the company logo function
    const companyLogo = useCallback(() => {
        const logo = company?.smallLogo || imagePath;
        if (!logo || logo === "none") {
            return DEFAULT_COMPANY_LOGO;
        }
        return logo;
    }, [company, imagePath]);

    // Memoize the job card click handler
    const handleJobCardClick = useCallback(() => {
        // if job description present open jd page
        if (jdpage === "true") {
            setJobcardClicked(true);
            redirectToJobdetailPage();
        }
        // open job details in careers page in new tab
        if (jdpage === "false" || jobtype === "promo") {
            window.open(link);
            countClickinJd(id);
        }
    }, [jdpage, jobtype, link, id, redirectToJobdetailPage]);

    return (
        <div className={styles.jobcardcontainer}>
            {!jobcardClicked && (
                <div onClick={handleJobCardClick} onMouseEnter={onMouseEnter} className={styles.jobcard}>
                    <div className={styles.jobcard_logocontainer}>
                        <Image className={styles.jobcard_logocontainer_logo} src={companyLogo()} alt={`${companyName} logo`} height={54} width={54} />
                    </div>

                    <div className={styles.jobcard_titlecontainer}>
                        <p className={styles.jobcard_titlecontainer_title}>{role !== "N" ? role : title}</p>
                        {jobtype !== "promo" && <p className={styles.jobcard_titlecontainer_companyname}>{companyName}</p>}
                    </div>

                    <div className={styles.detailscontainer}>
                        <div>
                            <div className={styles.detailscontainer_jobdetails}>
                                {jobtype !== "N" && <span className={styles.chip}>{jobtype}</span>}
                                {location !== "N" && location.length < 12 && (
                                    <span className={styles.chip}>
                                        <FontAwesomeIcon className={`${styles.chip_icon} ${styles.chip_icon_location}`} icon={faLocationDot} />
                                        <p>{location}</p>
                                    </span>
                                )}
                                {experience !== "N" && experience.length < 12 && (
                                    <span className={styles.chip}>
                                        <FontAwesomeIcon className={styles.chip_icon} icon={faBusinessTime} />
                                        {experience}
                                    </span>
                                )}
                            </div>
                            <p className={styles.detailscontainer_postedtime}>Posted {format(createdAt)}</p>
                        </div>

                        <p className={styles.viewscontainer}>
                            <FontAwesomeIcon className={styles.viewscontainer_icon} style={{ marginRight: "3px" }} icon={faEye} />
                            {impressionClick} views
                        </p>
                    </div>
                </div>
            )}

            {/* show loader when job is clicked  */}
            {jobtype !== "promo" && jobcardClicked && <Loader loaderheight="40px" loadercontainerheright="138px" borderWidth="4px" />}

            {/* footer with view count and share for mobile only  */}
            {jobtype !== "promo" && (
                <div onClick={() => handleShareClick(props.data)} className={styles.footer}>
                    <p>{impressionClick} views</p>
                    <div className={styles.footer_share}>
                        <p>Share</p>
                        <FontAwesomeIcon className={styles.footer_share_icon} icon={faShareNodes} />
                    </div>
                </div>
            )}
        </div>
    );
};

// Wrap the component with React.memo to prevent unnecessary re-renders
export default React.memo(Jobcard);
