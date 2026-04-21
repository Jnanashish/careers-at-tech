import React, { useState } from "react";
import Router from "next/router";
import Image from "next/image";

import styles from "./header.module.scss";
import { firenbaseEventHandler } from "@/core/eventHandler";
import logo from "../../../static/Image/careersattech-biglogo.svg";

import { isMobile } from "@/Helpers/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import MobileDrawer from "./Components/MobileDrawer";
import HeaderTabs from "./Components/HeaderTabs";

const Header = ({ showBorder = false }) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    // ga logo click event
    const handleRedirection = () => {
        firenbaseEventHandler("header_logo_click", {
            source: "Header",
            action: "Go to home page",
        });
        Router.push("/jobs");
    };

    return (
        <>
            <div className={`${styles.header} ${showBorder ? styles.showborder : ""}`}>
                <Image onClick={() => handleRedirection()} src={logo} height={30} width={150} />

                {/* tabs for desktop device  */}
                {/* {!isMobile() && <HeaderTabs />} */}

                {/* drawer for mobile view only  */}
                {isMobile() && (
                    <>
                        <MobileDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                        <FontAwesomeIcon onClick={() => setOpenDrawer(true)} className={styles.icon} icon={faBars} />
                    </>
                )}
            </div>
        </>
    );
};

export default Header;
