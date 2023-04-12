import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Router from "next/router";

import styles from "./jobdetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import DasBanner from "../Das/DasBanner";
import { countClickinJd } from "@/core/apis/jobapicall";
import Similarjob from "../Similarjob/Similarjob";
import DasLink from "../Das/DasLink";
import { firenbaseEventHandler } from "@/core/eventHandler";
import TelegramJoin from "../common/TelegramJoin";
import whatsappIcon from "../../static/Image/whatsappIcon.svg";

const Jobdetails = (jobdata) => {
    const data = jobdata.jobdata;
    const shareJobDetail = () => {
        firenbaseEventHandler("share_job_clicked", {
            job_id: data._id,
            job_title: data.title,
            source: "Jd page",
        });
        if (navigator.share) {
            navigator.share({
                title: `${data.title} | ${data.title}`,
                text: `Hey 👋! \nCheckout this job : ${data.title} \n\nTo know more visit`,
                url: document.location.href,
            });
        } else {
            shareonWhatsApp();
        }
    };
    const handleBackButtonclick = () => {
        firenbaseEventHandler("back_button_clicked", {
            job_id: data._id,
            job_title: data.title,
        });
        Router.push("/jobs");
    };

    const shareonWhatsApp = () => {
        const msg = `Hey 👋! %0ACheckout this job opening at ${data.companyName}. %0A%0ATo know more visit here : %0A${document.location.href}`;
        window.open(`whatsapp://send?text=${msg}`);
    };

    const applyButtonClicked = () => {
        firenbaseEventHandler("apply_button_clicked", {
            job_id: data._id,
            job_title: data.title,
            is_jd_page: true,
        });
        countClickinJd(data._id);
    };

    const whatsAppClicked = () => {
        firenbaseEventHandler("whatsappcard_jobpage_clicked", true);
    };

    return (
        <div>
            <div className={styles.mainContainer}>
                <span
                    onClick={() => {
                        handleBackButtonclick();
                    }}
                    className={styles.backButtonContainer}>
                    <FontAwesomeIcon className={styles.backIcon} icon={faCaretLeft} />
                    <p>Back to all jobs</p>
                </span>
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
                <a
                    href="https://chat.whatsapp.com/C0avjznUDHjKXc16AKmhxB"
                    onClick={() => whatsAppClicked()}
                    className={styles.whatsAppJoinBtn}>
                    <p>Get job updates on WhatsApp</p>
                    <Image src={whatsappIcon} alt="Telegram icon" height={20} width={20} />
                </a>
                {data.jobdesc !== "N" && data.jobdesc !== "<p>N</p>" && (
                    <div className={styles.joddetailContainer}>{parse(data.jobdesc)}</div>
                )}

                {data.responsibility !== "N" && data.responsibility !== "<p>N</p>" && (
                    <div className={styles.joddetailContainer}>
                        <h2>Responsibility : </h2>
                        {parse(data.responsibility)}
                    </div>
                )}

                {data.eligibility !== "N" && data.eligibility !== "<p>N</p>" && (
                    <div className={styles.joddetailContainer}>
                        <h2>Eligibility : </h2>
                        {parse(data.eligibility)}
                    </div>
                )}
                <div>
                    <DasBanner />
                </div>
                {data.skills !== "N" && data.skills !== "<p>N</p>" && (
                    <div className={styles.joddetailContainer}>
                        <h2>Prefered Skills : </h2>
                        {parse(data.skills)}
                    </div>
                )}

                {data.aboutCompany !== "N" && data.aboutCompany !== "<p>N</p>" && (
                    <div className={styles.joddetailContainer}>
                        <h2>About Company : </h2>
                        {parse(data.aboutCompany)}
                    </div>
                )}
                <div className="mobileViewBanner">
                    <TelegramJoin />
                </div>
                <a
                    onClick={() => applyButtonClicked()}
                    href={data.link}
                    rel="noreferrer"
                    target="_blank">
                    <div className={styles.applyBtn}>Apply Now</div>
                </a>
                <br />
            </div>
            <Similarjob companytype={data.companytype} id={data._id} />
            <DasLink />
        </div>
    );
};

export default Jobdetails;
