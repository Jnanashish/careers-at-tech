import React from "react";
import Router from "next/router";
import styles from "./header.module.scss";
import { firenbaseEventHandler } from "@/core/eventHandler";

const Header = () => {
    // ga logo click event
    const handleRedirection = () => {
        firenbaseEventHandler("header_logo_click", {
            source: "Header",
            action: "Go to home page",
        });
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
