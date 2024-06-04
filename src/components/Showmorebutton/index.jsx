import React from "react";
import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/common/Loader";

const ShowMoreButton = (props) => {

    const showmoreButtonClick = () => {
        console.log("CHILD");

        props?.buttonclickHandler();
    };

    return (
        <div>
            <div onClick={showmoreButtonClick} className={styles.showmoresection}>
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
            </div>
        </div>
    );
};

export default ShowMoreButton;
