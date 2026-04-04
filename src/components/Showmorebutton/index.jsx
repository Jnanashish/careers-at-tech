import React from "react";
import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/common/Loader";

const ShowMoreButton = (props) => {

    const showmoreButtonClick = () => {
        props?.buttonclickHandler();
    };

    return (
        <div>
            <button onClick={showmoreButtonClick} className={styles.showmoresection} style={{ background: "none", border: "none", cursor: "pointer", width: "100%", font: "inherit" }}>
                {!props?.showMoreClicked && (
                    <span className={styles.showmoresection_button}>
                        <p>Show more jobs</p>
                        <FontAwesomeIcon className={styles.icon} icon={faChevronDown} />
                    </span>
                )}
                {props?.showMoreClicked && (
                    <span className={styles.showmoresection_loader}>
                        <Loader loaderheight="30px" loadercontainerheright="30px" borderWidth="4px" />
                    </span>
                )}
            </button>
        </div>
    );
};

export default ShowMoreButton;
