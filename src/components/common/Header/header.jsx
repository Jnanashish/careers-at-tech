import React from "react";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";

import styles from "./header.module.scss";
import { firebaseEventHandler } from "@/core/eventHandler";
import logo from "../../../static/Image/careersattech-biglogo.svg";

const Header = ({showBorder = false}) => {
    // ga logo click event
    const handleRedirection = () => {
        firebaseEventHandler("header_logo_click", {
            source: "Header",
            action: "Go to home page",
        });
        Router.push("/jobs");
    };

    return (
        <div className={`${styles.header} ${showBorder ? styles.showborder : ''}`}>
            <Image onClick={() => handleRedirection()} src={logo} height={30} width={150} />
            <Link href="/toolkit" className={styles.toolkitLink}>Resume Toolkit</Link>
        </div>
    );
};

export default Header;