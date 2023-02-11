import React from "react";

// import css
import styles from "./linkmid.module.scss";

// import internal components and methods
import Jobcard from "../Jobcard/Jobcard";

const Linkmid = (props) => {
    const { id, link, jdpage } = props.data;

    return (
        <div>
            <div className={styles.jobCardContainer}>
                {jdpage === "false" && (
                    <a target="_blank" rel="noopener noreferrer" href={link}>
                        <Jobcard data={props.data} />
                    </a>
                )}
            </div>
        </div>
    );
};

export default Linkmid;
