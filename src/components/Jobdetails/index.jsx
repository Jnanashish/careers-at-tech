import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Router from "next/router";

import styles from "./jobdetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faCaretLeft, faLocationDot, faClock, faGraduationCap, faCalendar, faMoneyCheckDollar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { countClickinJd } from "@/core/apis/jobapicall";
import Similarjob from "../Similarjob/Similarjob";
import { shareJobDetails } from "@/Helpers/socialmediahandler";
import WhatAppBanner from "../Banners/WhatsappBanner";
import { format } from "timeago.js";
import linkedinIcon from "../../static/Image/linkedinIcon.svg";
import PromoBanner from "../Banners/PromoBanner";

const Jobdetails = (props) => {
    const data = props?.jobdata;

    // when back button is clicked move to job listing page
    const handleBackButtonclick = () => {
        Router.push("/jobs");
    };

    // when apply now button is clicked
    const applyButtonClicked = (link) => {
        countClickinJd(data._id);
        window.open(link, "_blank");
    };

    // opne linkedin with network tab
    const askforReferral = () => {
        const linekdinUrl = `https://www.linkedin.com/search/results/people/?keywords=${data?.companyName}&network=%5B%22F%22%2C%22S%22%5D&sid=zDx`;
        window.open(linekdinUrl);
    };


    const companyLogo = () => {
        const logo = data?.company?.smallLogo || data?.imagePath;
        if(!logo || logo === "none"){
            return false;
        }
        return logo;
    }

    // [UI] component for job info card item
    const JobInfoItem = ({ title, jobinfo, icon }) => {
        if (!!jobinfo && jobinfo != "₹0LPA") {
            return (
                <div>
                    <p>{title}</p>
                    <span>
                        <FontAwesomeIcon className={styles.chipIcon} icon={icon} />
                        <p>{jobinfo}</p>
                    </span>
                </div>
            );
        }
    };

    // [UI] compone for job details
    const JobDetailItem = ({ data, header }) => {
        if (!!data && data !== "N" && data !== "<p>N</p>") {
            return (
                <div className={styles.jobsection}>
                    {!!header && <h3>{header} : </h3>}
                    <p>{parse(data)}</p>
                </div>
            );
        }
    };

    return (
        <>
            <div className={styles.jobdetails}>
                <span onClick={handleBackButtonclick} className={styles.jobdetails_backbuttonsection}>
                    <FontAwesomeIcon className={styles.back_icon} icon={faCaretLeft} />
                    <p>Back to all Jobs</p>
                </span>

                {/* header section, share icon, logo, title */}
                <div className={styles.jobinfo}>
                    <div className={styles.header}>
                        <span>{!!companyLogo() && <Image className={styles.companyLogo} height={44} width={44} src={companyLogo()} alt={data?.companyName + "logo"} />}</span>
                        <span onClick={() => shareJobDetails(data)} className={styles.sharebutton}>
                            <span>Share job</span>
                            <FontAwesomeIcon className={styles.shareicon} icon={faShareNodes} />
                        </span>
                    </div>

                    <h1 className={styles.jobinfo_title}>{data?.role}</h1>
                    <span className={styles.jobinfo_companynamesection}>
                        <p className={styles.jobinfo_companynamesection_name}>{data?.companyName}</p>
                        <p className={styles.jobinfo_companynamesection_postdate}> • Posted {format(data?.createdAt)}</p>
                    </span>
                </div>

                <div className={styles.detailscard}>
                    <JobInfoItem title="Experience" jobinfo={data?.experience} icon={faCalendar} />
                    <JobInfoItem title="Location" jobinfo={data?.location} icon={faLocationDot} />
                    <JobInfoItem title="Salary" jobinfo={data?.salary} icon={faMoneyCheckDollar} />
                    <JobInfoItem title="Degree" jobinfo={data?.degree} icon={faGraduationCap} />
                    <JobInfoItem title="Batch" jobinfo={data?.batch} icon={faClock} />
                </div>

                {/* job details section  */}
                <div className={styles.details}>
                    <JobDetailItem data={data?.jobdesc} />
                    <span className={`${styles.bannercontainer} mobileview`}>
                        <WhatAppBanner isModal={false} />
                    </span>
                    <JobDetailItem header="Responsibility" data={data?.responsibility} />
                    <JobDetailItem header="Eligibility" data={data?.eligibility} />
                    <JobDetailItem header="Prefered Skills" data={data?.skills} />
                    <JobDetailItem header="Benifits" data={data?.benifits} />
                    <JobDetailItem header="About Company" data={data?.aboutCompany} />
                </div>

                <PromoBanner/>


                <div className={styles.buttonsection}>
                    <span onClick={askforReferral} className={styles.buttonsection_referral}>
                        <p>Ask for referrals on</p>
                        <Image className={styles.icon} src={linkedinIcon} alt="Telegram icon" height={25} width={25} />
                    </span>
                    <span className={styles.buttonsection_apply} onClick={() => applyButtonClicked(data?.link)}>
                        <p>Apply now</p>
                        <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
                    </span>
                </div>
                {data?.platform === "careerspage" && <p className={styles.redirection_message}>* You will be redirected to the official company careers page.</p>}
            </div>
            <Similarjob companytype={data?.companytype} id={data?._id} />
        </>
    );
};

export default Jobdetails;
