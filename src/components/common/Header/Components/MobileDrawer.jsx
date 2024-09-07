import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "../header.module.scss";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import whatsappIcon from "@/static/Image/whatsappIcon.svg";

import { jobsbycategories, jobsbylocation, jobsbybatch } from "../staticdata";

const MobileDrawer = ({openDrawer, setOpenDrawer}) => {
    const [showTabDropdown, setShowTabDropdown] = useState(null);

    const handletabHeaderClick = (type) => {
        if (showTabDropdown === type) {
            setShowTabDropdown(null);
        } else {
            setShowTabDropdown(type);
        }
    };

    const closeDrawer = () => {
        setOpenDrawer(false)
    }

    return (
        <div>
            <Drawer open={openDrawer} direction="right" className={styles.drawer} size={"80%"} overlayOpacity={0.6} lockBackgroundScroll={true}>
                <div className={styles.drawer_crossiconContainer}>
                    <span onClick={closeDrawer} className={styles.crossicon}>
                        <FontAwesomeIcon className={styles.icon} icon={faXmark} />
                    </span>
                </div>

                <div className={styles.drawer_container}>
                    <span onClick={() => handletabHeaderClick("category")} className={styles.drawer_tabHeaderContainer}>
                        <p className={styles.drawer_tabs}>Popular categories </p>
                        <FontAwesomeIcon icon={showTabDropdown === "category" ? faChevronUp : faChevronDown} className={styles.icon} />
                    </span>

                    {showTabDropdown === "category" && (
                        <div onClick={closeDrawer} className={styles.drawer_subtabsContainer}>
                            {jobsbycategories.map((item, index) => (
                                <Link key={index} className={styles.link} href={item.redirection_url}>
                                    <p>{item.title}</p>
                                </Link>
                            ))}
                        </div>
                    )}

                    <span onClick={() => handletabHeaderClick("batch")} className={styles.drawer_tabHeaderContainer}>
                        <p className={styles.drawer_tabs}>Jobs by batch</p>
                        <FontAwesomeIcon icon={showTabDropdown === "batch" ? faChevronUp : faChevronDown} className={styles.icon} />
                    </span>

                    {showTabDropdown === "batch" && (
                        <div onClick={closeDrawer} className={styles.drawer_subtabsContainer}>
                            {jobsbybatch.map((item, index) => (
                                <Link key={index} className={styles.link} href={item.redirection_url}>
                                    <p>{item.title}</p>
                                </Link>
                            ))}
                        </div>
                    )}

                    <span onClick={() => handletabHeaderClick("location")} className={styles.drawer_tabHeaderContainer}>
                        <p className={styles.drawer_tabs}>Jobs by location</p>
                        <FontAwesomeIcon icon={showTabDropdown === "location" ? faChevronUp : faChevronDown} className={styles.icon} />
                    </span>

                    {showTabDropdown === "location" && (
                        <div onClick={closeDrawer} className={styles.drawer_subtabsContainer}>
                            {jobsbylocation.map((item, index) => (
                                <Link key={index} className={styles.link} href={item.redirection_url}>
                                    <p>{item.title}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                    
                    <Link onClick={closeDrawer} href={"/career-pages"} className={styles.drawer_tabs}>Career pages </Link>
                    <Link onClick={closeDrawer} href={"/"} className={styles.drawer_tabs}>Resources </Link>
                    <Link onClick={closeDrawer} href={"/"} className={styles.drawer_tabs}>Post a Job </Link>
                    <Link onClick={closeDrawer} href={"/"} className={styles.drawer_tabs}>About us </Link>

                    <a onClick={closeDrawer} className={styles.whatsAppButton} href="https://bit.ly/jobs-whatsappchannel">
                        <p>Join WhatsApp Channel</p>
                        <Image src={whatsappIcon} alt="Whatsapp icon" height={22} width={22} />
                    </a>
                </div>
            </Drawer>
        </div>
    );
}

export default MobileDrawer;
