import React, { useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../Input/Custominput";
import Dropdown from "@/components/Dropdown";
import styles from "./navheader.module.scss";
import { dropdownData } from "./Helpers";

const NavHeader = (props) => {
    const { handleQuerySearch } = props;
    const [searchedquery, setSearchedquery] = useState("");

    // whern user pressed enter in search bar
    const handleEnterClick = (e) => {
        if (e.key === "Enter") {
            handleQuerySearch(searchedquery);
        }
    };

    return (
        <div className={styles.navheader}>
            <div className={styles.navheader_filters}>
                <h2>
                    Discover verified <br /> tech <span>Jobs</span> and <span>Internships</span>
                    <br /> at tech companies.
                </h2>

                <div className={styles.searchsection}>
                    <CustomInput
                        className={styles.searchsection_searchbar}
                        value={searchedquery}
                        event={(value) => setSearchedquery(value)}
                        placeholder="Search with title or company name"
                        onKeyDown={(e) => handleEnterClick(e)}
                    />

                    <div onClick={() => setSearchedquery("")} className={styles.searchsection_cancelbutton}>
                        <FontAwesomeIcon style={searchedquery?.length === 0 ? { color: "#FFF" } : {}} className={styles.icon} icon={faXmark} />
                    </div>

                    <div onClick={() => handleQuerySearch(searchedquery)} className={styles.searchsection_searchbutton}>
                        <FontAwesomeIcon className={styles.icon} icon={faSearch} />
                    </div>
                </div>

                <div className={styles.dropdown}>
                    <Dropdown parameter="jobtype" updateQueryParam={props.updateQueryParam} placeholder="Job type" data={dropdownData.jobtype}/>
                    <Dropdown parameter="batch" updateQueryParam={props.updateQueryParam} placeholder="Batch" data={dropdownData.batch}/>
                    <Dropdown parameter="query" updateQueryParam={props.updateQueryParam} placeholder="Job category" data={dropdownData.jobcategory}/>
                    <Dropdown parameter="location" updateQueryParam={props.updateQueryParam} placeholder="Location" data={dropdownData.location}/>
                </div>
            </div>

            <div className={styles.navheader_image}>
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
