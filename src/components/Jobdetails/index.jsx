import React from "react";
import Image from "next/image";
import parse from "html-react-parser";

import styles from "./jobdetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import DasBanner from "../Das/DasBanner";
import { countClickinJd } from "@/core/apis/jobapicall";
import WhatsAppJoin from "../common/WhatsappJoin";
import Similarjob from "../Similarjob/Similarjob";

const Jobdetails = (jobdata) => {
    const data = jobdata.jobdata;
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
        const msg = `Hey 👋! %0ACheckout this job opening at ${data.companyName}. %0A%0ATo know more visit here : %0A${document.location.href}`;
        window.open(`whatsapp://send?text=${msg}`);
    };

    return (
        <div>
            <div className={styles.mainContainer}>
                <div>
                    <div className={styles.headerContainer}>
                        {data.imagePath !== "none" && (
                            <Image
                                className={styles.companyLogo}
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
                <div>
                    <DasBanner />
                </div>
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
                <div className="mobileViewBanner">
                    <WhatsAppJoin />
                </div>
                {data.aboutCompany !== "<p>N</p>" && (
                    <div className={styles.joddetailContainer}>
                        <h3>About Company : </h3>
                        {parse(data.aboutCompany)}
                    </div>
                )}
                <a
                    onClick={() => countClickinJd(data._id)}
                    href={data.link}
                    rel="noreferrer"
                    target="_blank">
                    <div className={styles.applyBtn}>Apply Now</div>
                </a>
            </div>
            <Similarjob companytype={data.companytype} id={data._id} />
        </div>
    );
};

export default Jobdetails;
