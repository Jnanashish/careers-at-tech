import React from "react";
import { PROMOBANNER, PROMOLINK } from "@/Helpers/config";
import styles from "./index.module.scss";
import Image from "next/image";

function PromoBanner() {
    const handleRedirection = () => {
        if (!!PROMOLINK) {
            window.open(PROMOLINK, "_blank");
        }
    };
    return (
        <div onClick={handleRedirection} className={styles.bannerContainer}>
            <Image src={PROMOBANNER} alt="banner" height={1080} width={1080}/>
        </div>
    );
}

export default PromoBanner;
