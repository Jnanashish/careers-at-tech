import React, { useEffect, useState } from "react";
import styles from "./das.module.scss";
import { handleRequestPATCH } from "@/core/apis/dasapicall";
import { useSelector } from "react-redux";
import { apiEndPoint } from "@/core/apis/apiEndpoints";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const DasLink = () => {
    const [dasLinkData, setDasLinkData] = useState(null);
    const dasLink = useSelector((state) => state.das.dasLink);

    useEffect(() => {
        if (dasLink && dasLink[0]) {
            setDasLinkData(dasLink[0]);
        }
    }, [dasLink]);

    const handleLinkClick = (id) => {
        handleRequestPATCH(`${apiEndPoint.countdasLinkClick}${id}`);
    };
    return (
        <div>
            {dasLinkData && (
                <a onClick={() => handleLinkClick(dasLinkData._id)} href={dasLinkData.link}>
                    <div className={styles.dasLinkContainer}>
                        <p>{dasLinkData.title}</p>
                        <FontAwesomeIcon className={styles.chipIcon} icon={faUpRightFromSquare} />
                    </div>
                </a>
            )}
        </div>
    );
};

export default DasLink;
