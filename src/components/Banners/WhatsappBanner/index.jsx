import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./whatsappbanner.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import whatsappIcon from "@/static/Image/whatsappIcon.svg";
import { firenbaseEventHandler } from "@/core/eventHandler";

function WhatAppBanner(props) {
    const { isModal = false } = props;
    const [showModal, setShowModal] = useState(true);

    const handleInitialLoad = () => {
        if (typeof window !== "undefined") {
            var expirationTime = localStorage.getItem("expirationTime");

            if (new Date().getTime() >= parseInt(expirationTime)) {
                localStorage.removeItem("expirationTime");
                localStorage.removeItem("whatsAppClickedLocal");
            }

            const isWhatsAppClickedLocal = localStorage.getItem("whatsAppClickedLocal");
            const isWhatsAppClickedSession = sessionStorage.getItem("whatsAppClickedSession");

            if (!isWhatsAppClickedSession && !isWhatsAppClickedLocal) {
                setShowModal(true);
            } else {
                setShowModal(false);
            }
        }
    };

    const handleCancelClicked = () => {
        firenbaseEventHandler("whatsapp_modal_cancel_clicked", true);
        sessionStorage.setItem("whatsAppClickedSession", "true");
        setShowModal(false);
    };

    const handleWhatsAppJoinClick = () => {
        if (typeof window !== "undefined" && isModal) {
            var now = new Date().getTime();
            var expirationTime = now + 20 * 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime.toString());
            localStorage.setItem("whatsAppClickedLocal", "true");
        }

        firenbaseEventHandler("whatsapp_modal_ad_clicked", true);
    };

    useEffect(() => {
        !!isModal && handleInitialLoad();
    }, []);

    return (
        <>
            {showModal && (
                <div overlayClassName={isModal ? styles.overlayModalContainer : {}} className={isModal ? `${styles.whatsappbanner} ${styles.whatsappmodal}` : `${styles.whatsappbanner}`}>
                    {isModal && (
                        <div onClick={() => handleCancelClicked()} className={styles.crossIconContainer}>
                            <FontAwesomeIcon className={styles.whatsappbanner_crossicon} icon={faXmark} />
                        </div>
                    )}

                    <p>
                        Join our WhatsApp Channel to get the latest <b>internship</b> and <b>job</b> updates.
                    </p>
                    <a onClick={() => handleWhatsAppJoinClick()} href="https://bit.ly/jobs-whatsappchannel">
                        <div className={styles.whatsappbanner_joinbutton}>
                            <p>Join us on WhatsApp Channel</p>
                            <Image src={whatsappIcon} alt="Whatsapp icon" height={20} width={20} />
                        </div>
                    </a>
                    <p className={styles.whatsappbanner_members}>80,000+ members have already joined!</p>
                </div>
            )}
        </>
    );
}

export default WhatAppBanner;
