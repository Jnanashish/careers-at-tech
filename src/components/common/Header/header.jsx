import React from "react";
import styles from "./header.module.scss";

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <h2 className={styles.logo}>
                    careers@<span>tech</span>
                </h2>
            </div>
        </div>
    );
};

export default Header;
