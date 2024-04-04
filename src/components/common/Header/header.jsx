import React from "react";
import Router from "next/router";
import Image from "next/image";

import styles from "./header.module.scss";
import { firenbaseEventHandler } from "@/core/eventHandler";
import logo from "../../../static/Image/careersattech-biglogo.svg";

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
        <div className={styles.header}>
            <Image onClick={() => handleRedirection()} src={logo} height={30} width={150} />
        </div>
    );
};

export default Header;