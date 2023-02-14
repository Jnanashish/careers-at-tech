import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import { useSelector } from "react-redux";

// import css
import styles from "./linkmid.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// import internal components and methods
import Jobcard from "../Jobcard/Jobcard";
import { countClickinJd } from "@/core/apis/jobapicall";
import { apiEndPoint } from "@/core/apis/apiEndpoints";
import { handleRequestPATCH } from "@/core/apis/dasapicall";

const Linkmid = (props) => {
    const { id, link, jdpage } = props.data;
    const [showModal, setShowModal] = useState(false);
    const [showRedirectBtn, setShowRedirectBtn] = useState(false);
    const [popType, setPopType] = useState("none");
    const [dasBannerData, setDasBannerData] = useState(null);
    const [timer, setTimer] = useState(5);

    const dasPoptype = useSelector((state) => state.das.dasPoptype);
    const dasBanner = useSelector((state) => state.das.dasBanner);

    useEffect(() => {
        if (dasPoptype && dasPoptype[0]) {
            setPopType(dasPoptype[0].adpoptype);
        }
    }, [dasPoptype]);
    useEffect(() => {
        window.scrollTo(0, 10);
        if (dasBanner.length > 1) {
            setDasBannerData(dasBanner[1]);
        } else if (dasBanner.length === 1) {
            setDasBannerData(dasBanner[0]);
        }
    }, [dasBanner]);
    useEffect(() => {
        if (showModal && timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        }
    }, [timer, showModal]);

    setTimeout(() => {
        setShowRedirectBtn(true);
    }, "1000");

    const handleBannerClick = (id) => {
        handleRequestPATCH(`${apiEndPoint.countBannerClick}${id}`);
    };

    const handleRedirection = () => {
        if (jdpage === "true") {
            history.push(`/jd/${id}`);
        } else if (jdpage === "false") {
            countClickinJd(id);
            window.location.assign(link);
        }
    };

    return (
        <div>
            <ReactModal isOpen={showModal} className={styles.modalContainer}>
                <div className={styles.modalItems}>
                    <FontAwesomeIcon
                        onClick={() => setShowModal(false)}
                        className={styles.crossIcon}
                        icon={faXmark}
                    />
                    {dasBannerData && (
                        <>
                            <p className={styles.clickText}>Click to know more👇</p>
                            <a
                                key={dasBannerData._id}
                                href={dasBannerData.link}
                                onClick={() => handleBannerClick(dasBannerData._id)}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Image
                                    className={styles.dasBanner}
                                    src={dasBannerData.imagePath}
                                    priority={1}
                                    width={400}
                                    height={400}
                                    alt="Ads Poster"
                                    loading={eager}
                                />
                            </a>
                        </>
                    )}
                    {showRedirectBtn && (
                        <button
                            className={styles.redirectButton}
                            style={
                                timer !== 0
                                    ? {
                                          backgroundColor: "#deebff",
                                          color: "#121212",
                                      }
                                    : {}
                            }
                            onClick={() => handleRedirection()}>
                            {timer === 0 ? (
                                <>
                                    <p>Redirect to Job page</p>
                                    <FontAwesomeIcon
                                        className={styles.redirectIcon}
                                        icon={faArrowRight}
                                    />
                                </>
                            ) : (
                                <p>{timer}</p>
                            )}
                        </button>
                    )}
                </div>
            </ReactModal>
            <div className={styles.jobCardContainer}>
                {jdpage === "false" && popType === "none" ? (
                    <a
                        onClick={() => countClickinJd(id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link}>
                        <Jobcard data={props.data} />
                    </a>
                ) : (
                    <div onClick={() => setShowModal(true)}>
                        <Jobcard data={props.data} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Linkmid;
