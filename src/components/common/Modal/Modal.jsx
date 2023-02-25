import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// import internal methods and components
import styles from "./modal.module.scss";
import { countClickinJd } from "@/core/apis/jobapicall";
import { apiEndPoint } from "@/core/apis/apiEndpoints";
import { handleRequestPATCH } from "@/core/apis/dasapicall";

const Modal = (props) => {
    const { showModal, id, link, toggleModalView } = props;
    const [modalisOpen, setModalisOpen] = useState(showModal);
    const [showRedirectBtn, setShowRedirectBtn] = useState(false);
    const [dasBannerData, setDasBannerData] = useState(null);
    const [timer, setTimer] = useState(5);

    const dasBanner = useSelector((state) => state.das.dasBanner);

    useEffect(() => {
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
        toggleModalView();
        countClickinJd(id);
        window.location.assign(link);
    };
    const handleCrossClicked = () => {
        toggleModalView();
        setModalisOpen(false);
    };

    return (
        <div>
            <ReactModal isOpen={modalisOpen} className={styles.modalContainer}>
                <div className={styles.modalItems}>
                    <div className={styles.modalHeader}>
                        <FontAwesomeIcon
                            onClick={() => handleCrossClicked()}
                            className={styles.crossIcon}
                            icon={faXmark}
                        />
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
                    {dasBannerData && (
                        <>
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
                                    quality={100}
                                    width={600}
                                    height={600}
                                    alt="Ads Poster"
                                    loading="eager"
                                />
                            </a>
                            <p className={styles.clickText}>Click to know more👆</p>
                        </>
                    )}
                </div>
            </ReactModal>
        </div>
    );
};

export default Modal;
