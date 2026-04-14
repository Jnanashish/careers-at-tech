import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

import styles from "./TailorButton.module.scss";
import { firebaseEventHandler } from "@/core/eventHandler";

const TailorButton = ({ jobData, onClick }) => {
    const handleClick = () => {
        firebaseEventHandler("tailor_button_clicked", {
            job_id: jobData?._id || "",
            job_title: jobData?.role || "",
        });
        onClick();
    };

    return (
        <button
            className={styles.tailorButton}
            onClick={handleClick}
            aria-label="Tailor your resume to this job description"
        >
            <FontAwesomeIcon className={styles.icon} icon={faWandMagicSparkles} />
            <span>Tailor your resume to this JD</span>
        </button>
    );
};

export default TailorButton;
