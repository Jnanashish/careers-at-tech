import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { isMobile } from "@/Helpers/utils";

const Dropdown = (props) => {
    const { placeholder, data, parameter } = props;
    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState(placeholder);

    const toggleDrawer = () => {
        setIsActive((prevState) => !prevState);
    };

    const dropdownRef = useRef(null);

    // when value is selected from dropdown or drawer
    const handleFiltervalueClick = (item) => {
        setIsSelected(item.display_text);
        props?.updateQueryParam(item.value, parameter);

        setIsActive(!isActive);
    };

    // if clicked outside drodown modal then close the modal
    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) && isActive) {
                setIsActive(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isActive]);

    return (
        <>
            <div ref={dropdownRef} className={styles.dropdown}>
                <div style={selected !== placeholder ? { borderColor: "#121212" } : {}} onClick={(e) => setIsActive(!isActive)} className={styles.dropdown_button}>
                    <p style={selected !== placeholder ? { color: "#000", borderColor: "#000" } : {}}>{selected.length > 12 ? `${selected.substring(0, 12)}...` : selected}</p>
                    <span>{isActive ? <FontAwesomeIcon icon={faChevronUp} className={styles.icon} /> : <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />}</span>
                </div>

                {/* dropdown content only for desktop device */}
                <div className={styles.dropdown_content} style={{ display: isActive && !isMobile() ? "block" : "none" }}>
                    <div className={styles.dropdown_header}>
                        Job type <FontAwesomeIcon onClick={toggleDrawer} icon={faXmark} className={styles.icon} />
                    </div>
                    <div >
                        {!!data &&
                            data.map((item) => {
                                return (
                                    <div
                                        onClick={() => handleFiltervalueClick(item)}
                                        className={`${styles.item} ${item.value === "Clear" ? styles.dropdown_clearmessage : ""}`}
                                        style={item.value === selected ? { backgroundColor: "#f1f1f1" } : {}}
                                    >
                                        {item.display_text}
                                    </div>
                                );
                            })}
                    </div>
                    <div className={styles.dropdown_clearmessage}>Clear filter</div>
                </div>
            </div>

            {/* drawer only for mobile device  */}
            {isMobile() && (
                <Drawer open={isActive} onClose={toggleDrawer} direction="bottom" className={styles.drawer} size={400}>
                    <div style={{ display: isActive ? "block" : "none" }}>
                        <div className={styles.drawer_header}>
                            Job type <FontAwesomeIcon onClick={toggleDrawer} icon={faXmark} className={styles.icon} />
                        </div>
                        <div className={styles.drawer_content}>
                            {!!data &&
                                data.map((item) => {
                                    return (
                                        <div onClick={() => handleFiltervalueClick(item)} className={styles.item} style={item.title === selected ? { backgroundColor: "#f1f1f1" } : {}}>
                                            {item.display_text}
                                        </div>
                                    );
                                })}
                        </div>
                        <div className={styles.drawer_clearmessage}>Clear filter</div>
                    </div>
                </Drawer>
            )}
        </>
    );
};

export default Dropdown;
