import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./modalstyle.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import whatsappIcon from "../../../static/Image/whatsappIcon.svg";
import { firenbaseEventHandler } from "@/core/eventHandler";

function WhatAppModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        handleInitialLoad();
    }, []);

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
        if (typeof window !== "undefined") {
            var now = new Date().getTime();
            var expirationTime = now + 20 * 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime.toString());
            localStorage.setItem("whatsAppClickedLocal", "true");
        }

        firenbaseEventHandler("whatsapp_modal_ad_clicked", true);
    };

    return (
        <>
            {showModal && (
                <div
                    overlayClassName={styles.overlayModalContainer}
                    className={styles.modalContainer}>
                    <div className={styles.cardContainer}>
                        <div
                            onClick={() => handleCancelClicked()}
                            className={styles.crossIconContainer}>
                            <FontAwesomeIcon className={styles.crossIcon} icon={faXmark} />
                        </div>

                        <p>
                            Join us on WhastApp to stay upto date with latest <b>Internship</b> and
                            <b> Job</b> updates.
                        </p>
                        <a
                            onClick={() => handleWhatsAppJoinClick()}
                            href="https://bit.ly/49nv3wG">
                            <div className={styles.whatsAppJoinBtn}>
                                <p>Join us now on WhatsApp</p>
                                <Image
                                    src={whatsappIcon}
                                    alt="Whatsapp icon"
                                    height={20}
                                    width={20}
                                />
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

export default WhatAppModal;
