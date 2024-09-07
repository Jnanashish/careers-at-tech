import React, {useState} from "react";
import Link from "next/link";

import { jobsbycategories, jobsbylocation, jobsbybatch } from "../staticdata";
import styles from "../header.module.scss";

function HeaderTabs() {
    const [openModal, setOpenModal] = useState(false);


    const handleMouseEnter = () => {
        setOpenModal(true);
    };

    const handleMouserLeave = () => {
        setTimeout(() => {
            if (!document.querySelector(".jobstabs:hover") && !document.querySelector(".modal:hover")) {
                setOpenModal(false);
            }
        }, 200);
    };
    
    return (
        <div>
            <span className={styles.header_tabs}>
                <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouserLeave} className={styles.header_tabs_container}>
                    <p style={openModal ? { borderColor: "#0050FF" } : {}} id="jobstabs" className={styles.header_tabs_tab}>
                        Jobs
                    </p>
                    {openModal && (
                        <span id="modal" className={styles.modal}>
                            <div className={styles.modal_container}>
                                <p className={styles.modal_container_header}>Popular categories</p>
                                {jobsbycategories.map((item, index) => (
                                    <Link key={index} className={styles.link} href={item.redirection_url}>
                                        <p>{item.title}</p>
                                    </Link>
                                ))}
                            </div>
                            <div className={styles.modal_container}>
                                <p className={styles.modal_container_header}>Jobs by location</p>
                                {jobsbylocation.map((item, index) => (
                                    <Link key={index} className={styles.link} href={item.redirection_url}>
                                        <p>{item.title}</p>
                                    </Link>
                                ))}
                            </div>
                            <div className={styles.modal_container}>
                                <p className={styles.modal_container_header}>Jobs by batch</p>
                                {jobsbybatch.map((item, index) => (
                                    <Link key={index} className={styles.link} href={item.redirection_url}>
                                        <p>{item.title}</p>
                                    </Link>
                                ))}
                            </div>
                        </span>
                    )}
                </span>
                <Link href={"/career-pages"} className={styles.header_tabs_tab}>
                    Career pages
                </Link>
                <p className={styles.header_tabs_tab}>Resources</p>
                <p className={styles.header_tabs_tab}>Post a Job</p>
                <p className={styles.header_tabs_tab}>About us</p>
            </span>
        </div>
    );
}

export default HeaderTabs;
