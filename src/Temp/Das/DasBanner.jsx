/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

// import local components and methods
import styles from "./das.module.scss";
import { handleRequestPATCH } from "@/core/apis/dasapicall";
import { apiEndPoint } from "@/core/apis/apiEndpoints";

const DasBanner = () => {
    const [dasBanner, setDasBanner] = useState(null);
    const dasBannerData = useSelector((state) => state.das.dasBanner);
    useEffect(() => {
        if (dasBannerData && dasBannerData[0]) {
            setDasBanner(dasBannerData[0]);
        }
    }, [dasBannerData]);
    const handleBannerClick = (id) => {
        handleRequestPATCH(`${apiEndPoint.countBannerClick}${id}`);
    };
    return (
        <div>
            {true && (
                // <a href={dasBanner.link} className={styles.dasBannerContainer}>
                    <Image
                        onClick={() => handleBannerClick(dasBanner._id)}
                        className={styles.dasBanner}
                        src="https://i.ibb.co/mSWQZvv/Copy-of-August-Influ-Creatives-Master-File-png.png"
                        alt="banner"
                        height={400}
                        width={400}
                        priority={1}
                        quality={100}
                        loading="eager"
                    />
                // </a>
            )}
        </div>
    );
};

export default DasBanner;
