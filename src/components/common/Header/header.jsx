import React from "react";
import Router from "next/router";
import styles from "./header.module.scss";

const Header = () => {
    const handleRedirection = () => {
        Router.push("/jobs");
    };
    return (
        <div className={styles.headerContainer}>
            <div onClick={() => handleRedirection()} className={styles.header}>
                <h2 className={styles.logo}>
                    careers@<span>tech</span>
                </h2>
            </div>
        </div>
    );
};

export default Header;
