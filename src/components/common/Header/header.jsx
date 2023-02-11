import React from "react";
import styles from "./header.module.scss";
import Image from "next/image";

import logo from "../../../static/Image/logo.svg";

const Header = () => {
    const handleLogoClick = () => {};
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <Image
                    onClick={() => {
                        handleLogoClick();
                    }}
                    className={styles.logo}
                    src={logo}
                    alt="careersat tech logo"
                    width={150}
                    height={22}
                />
            </div>
        </div>
    );
};

export default Header;
