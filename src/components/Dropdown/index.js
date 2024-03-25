import { useState } from "react";
import styles from "./dropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Dropdown = () => {
    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState("Choose one");

    const [temp, setTemp] = useState([
        {
            title: "Noida",
            redirection: "/noida",
        },
        {
            title: "Bangalore",
            redirection: "/bangalore",
        },
    ]);

    return (
        <div className={styles.dropdown}>
            <div
                onClick={(e) => {
                    setIsActive(!isActive);
                }}
                className={styles.dropdown_button}
            >
                {selected}
                <span>{isActive ? <FontAwesomeIcon icon={faChevronUp} className={styles.icon} /> : <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />}</span>
            </div>
            <div className={styles.dropdown_content} style={{ display: isActive ? "block" : "none" }}>
                {!!temp &&
                    temp.map((item) => {
                        return (
                            <div
                                onClick={(e) => {
                                    setIsSelected(e.target.textContent);
                                    setIsActive(!isActive);
                                }}
                                className={styles.item}
                            >
                                {item.title}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Dropdown;
