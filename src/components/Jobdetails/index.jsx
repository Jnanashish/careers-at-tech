import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import useClipboard from "react-use-clipboard";

import styles from "./jobdetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShare, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import DasBanner from "../Das/DasBanner";
import { countClickinJd } from "@/core/apis/jobapicall";

function Jobdetails(jobdata) {
    const data = jobdata.jobdata;
    const [isCopied, setCopied] = useClipboard(data.link);

    const shareJobDetail = () => {
        if (navigator.share) {
            navigator.share({
                title: `${data.title} | ${data.title}`,
                text: `Check out this job : ${data.title}`,
                url: document.location.href,
            });
        } else {
            shareonWhatsApp();
        }
    };
    const shareonWhatsApp = () => {
        window.open(`whatsapp://send?text=${document.location.href}`);
    };

    return (
        <div className={styles.mainContainer}>
            <div>
                <div className={styles.headerContainer}>
                    {data.imagePath !== "none" && (
                        <Image
                            height={45}
                            width={45}
                            src={data.imagePath}
                            alt={data.companyName + "logo"}
                        />
                    )}
                    <div
                        onClick={() => {
                            shareJobDetail();
                        }}
                        className={styles.shareBtn}>
                        Share Job
                        <FontAwesomeIcon className={styles.icon} icon={faShareNodes} />
                    </div>
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
            <DasBanner />
            {data.responsibility !== "<p>N</p>" && (
                <div className={styles.joddetailContainer}>
                    <h3>Responsibility : </h3>
                    {parse(data.responsibility)}
                </div>
            )}
            {data.eligibility !== "N" && data.eligibility !== "<p>N</p>" && (
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
                <div onClick={setCopied}>
                    {isCopied ? (
                        <div className={styles.openonBrowswer}>Copied 👍</div>
                    ) : (
                        <div className={styles.openonBrowswer}>
                            <p> Copy the Apply link</p>
                            <FontAwesomeIcon className={styles.icon} icon={faCopy} />
                        </div>
                    )}
                </div>

                <div
                    onClick={() => {
                        shareonWhatsApp();
                    }}
                    className={styles.whatsappShareBtn}>
                    <p> Share this Job on WhatsApp</p>
                </div>
            </div>
            {data.aboutCompany !== "<p>N</p>" && (
                <div className={styles.joddetailContainer}>
                    <h3>About Company : </h3>
                    {parse(data.aboutCompany)}
                </div>
            )}
            <div className={styles.whatsAppGroup}>
                <div style={{ display: "flex" }}>
                    <p>
                        Join our <span>WhastApp</span> group to get direct apply links for
                        Internship and Jobs
                    </p>
                    <Image
                        src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1676743231/get-logo-whatsapp-png-pictures-1_1_1_iy5c8o.png"
                        alt="whatsapp icon"
                        height={60}
                        width={60}
                    />
                </div>
                <a href="https://chat.whatsapp.com/EQNivQSL7aQFKUqC3YXpgc">
                    <div className={styles.whatsAppJoinBtn}>
                        <p>Join us Now on WhatsApp</p>
                        <FontAwesomeIcon className={styles.icon} icon={faShare} />
                    </div>
                </a>
            </div>
            <a
                onClick={() => countClickinJd(data._id)}
                href={data.link}
                rel="noreferrer"
                target="_blank">
                <div className={styles.applyBtn}>Apply Now</div>
            </a>
        </div>
    );
}

export default Jobdetails;
