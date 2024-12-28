import React, { useState, useEffect } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../Input/Custominput";
import Dropdown from "@/components/Dropdown";
import styles from "./navheader.module.scss";
import { dropdownData } from "./staticData";
import bannerimage from "../../static/Image/bannerimage.png"

const NavHeader = (props) => {
    const {params, handleFilterChange} = props;
    const [searchedquery, setSearchedquery] = useState("");
    const [selecterParam, setSelectedParam] = useState(null)

    // whern user pressed enter in search bar
    const handleEnterClick = (e) => {
        if (e.key === "Enter") {
            handleFilterChange("query", searchedquery);
        }
    };

    useEffect(() => {
        if (params) {
            setSelectedParam(null);
            params.forEach((param) => {
                const key = Object.keys(param)[0];
                setSelectedParam((prevParams) => {
                    return { ...prevParams, [key]: param[key] };
                });
            });
        }
    }, [params]);

    useEffect(() => {
        !!selecterParam?.query ? setSearchedquery(selecterParam?.query) : setSearchedquery("")
    }, [selecterParam]);



    return (
        <div className={styles.navheader}>
            <div className={styles.navheader_filters}>
                <h2>
                    Discover verified <br /> tech <span>Jobs</span> and <span>Internships</span>
                    <br /> at top companies.
                </h2>

                <div className={styles.searchsection}>
                    <CustomInput
                        className={styles.searchsection_searchbar}
                        value={searchedquery}
                        event={(value) => setSearchedquery(value)}
                        placeholder="Search by title or company name"
                        onKeyDown={(e) => handleEnterClick(e)}
                    />

                    <div onClick={() => handleFilterChange("query", "")} className={styles.searchsection_cancelbutton}>
                        <FontAwesomeIcon style={searchedquery?.length === 0 ? { color: "#FFF" } : {}} className={styles.icon} icon={faXmark} />
                    </div>

                    <div onClick={() => props?.handleFilterChange("query", searchedquery)} className={styles.searchsection_searchbutton}>
                        <FontAwesomeIcon className={styles.icon} icon={faSearch} />
                    </div>
                </div>

                {/* Filter section (by job type, batch, location) */}
                <div className={styles.dropdown}>
                    <p>Filter by : </p>
                    <Dropdown selectedValue={selecterParam?.jobtype} parameter="jobtype" handleFilterChange={props.handleFilterChange} placeholder="Job type" data={dropdownData.jobtype}/>
                    <Dropdown selectedValue={selecterParam?.batch} parameter="batch" handleFilterChange={props.handleFilterChange} placeholder="Batch" data={dropdownData.batch}/>
                    <Dropdown selectedValue={selecterParam?.location} parameter="location" handleFilterChange={props.handleFilterChange} placeholder="Location" data={dropdownData.location}/>
                </div>
            </div>

            <div className={styles.navheader_image}>
                <Image
                    src={bannerimage}
                    alt="girl with a computer"
                    height={324}
                    width={256}
                />
            </div>
        </div>
    );
};

export default NavHeader;
