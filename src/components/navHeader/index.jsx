import React, { useState, useEffect } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../Input/input";
import Dropdown from "@/components/Dropdown";

import styles from "./navheader.module.scss";

const NavHeader = (props) => {
    const [searchWord, setSearchWord] = useState(["Frontend", "Backend", "Software engineer", "Web developer", "Test Engineer", "Fullstack"]);

    const { companyname, selectedSearchWord, jobType } = props;

    const handleEnterClick = (e) => {
        if (e.key === "Enter") {
            props.getCompanyData();
        }
    };

    return (
        <div className={styles.headerContainer}>
            {/* <Dropdown/> */}
            <div className={styles.headerSection}>
                <h2>
                    Discover verified <br /> tech <span>Jobs</span> and <span>Internships</span>
                    <br /> at top companies.
                </h2>

                <div className={styles.searchContainer}>
                    <CustomInput
                        className={styles.searchcompany}
                        value={companyname}
                        event={(value) => props.setCompanyname(value)}
                        placeholder="Search with title or company name"
                        onKeyDown={(e) => handleEnterClick(e)}
                    />

                    <div style={companyname?.length ? { color: "#0069FF" } : { color: "#FFF" }} onClick={() => props.handleCancelClick()} className={styles.cancelButton}>
                        <FontAwesomeIcon icon={faXmark} style={{ height: "16px", width: "16px", marginTop: "1px" }} />
                    </div>

                    <div onClick={() => props.getCompanyData()} className={styles.search_btn}>
                        <FontAwesomeIcon icon={faSearch} style={{ height: "18px", width: "18px", color: "#111817", marginTop: "1px" }} />
                    </div>
                </div>
                <div className={styles.searchWordContainer}>
                    {searchWord.map((word, i) => {
                        return (
                            <span style={selectedSearchWord === word ? { backgroundColor: "#e1ebff", color: "#1d4ed8" } : {}} onClick={() => props.handleSearchWordSelection(word)} key={i}>
                                {word}
                            </span>
                        );
                    })}
                </div>

                <div className={styles.radioGroup}>
                    <span onClick={() => props.handleJobtypeFilterClicked("full")}>
                        <CustomInput
                            type="radio"
                            checked={jobType === "full"}
                            name="full time radio"
                            className={styles.radioInput}
                            event={() => props.setJobType("full")}
                            placeholder="full time radio"
                        />
                        <p className={`${jobType === "full" ? styles.activeRadioButton : {}}`}>Full time</p>
                    </span>
                    <span onClick={() => props.handleJobtypeFilterClicked("intern")}>
                        <CustomInput type="radio" checked={jobType === "intern"} name="intern radio" className={styles.radioInput} event={() => props.setJobType("intern")} />
                        <p className={`${jobType === "intern" ? styles.activeRadioButton : {}}`}>Internship</p>
                    </span>
                </div>
            </div>

            <div className={styles.imageContainer}>
                <Image
                    src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1678515591/3d-business-young-woman-sitting-with-laptop-and-stylus_fvym3e.png"
                    alt="girl with computer"
                    height={324}
                    width={256}
                />
            </div>
        </div>
    );
};

export default NavHeader;
