import React from "react";
import { PROMOBANNER, PROMOLINK } from "@/Helpers/config";
import styles from "./index.module.scss";

function PromoBanner() {
    const handleRedirection = () => {
        if (!!PROMOLINK) {
            window.open(PROMOLINK, "_blank");
        }
    };
    return (
        <div onClick={handleRedirection} className={styles.bannerContainer}>
            <img src={PROMOBANNER} alt="banner" />
        </div>
    );
}

export default PromoBanner;
