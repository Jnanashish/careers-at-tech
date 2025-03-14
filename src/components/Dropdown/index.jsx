import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./dropdown.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { isMobile } from "@/Helpers/utils";

const Dropdown = (props) => {
    const { placeholder, data, parameter, selectedValue } = props;
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState({
        display_text: placeholder,
        value: placeholder,
    });

    // Memoize the toggleDrawer function to prevent recreation on each render
    const toggleDrawer = useCallback(() => {
        setIsActive((prevState) => !prevState);
    }, []);

    const dropdownRef = useRef(null);

    // Memoize the handleFiltervalueClick function
    const handleFiltervalueClick = useCallback((item) => {
        setSelected({
            display_text: item.display_text,
            value: item.value,
        });

        props?.handleFilterChange(parameter, item.value === placeholder ? "" : item.value);

        setIsActive((prevIsActive) => !prevIsActive);
    }, [parameter, placeholder, props]);

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

    useEffect(() => {
        if (!!selectedValue) {
            data.forEach((item) => {
                if (item.value === selectedValue) {
                    setSelected(item);
                }
            });
        } else {
            setSelected({
                display_text: placeholder,
                value: placeholder,
            });
        }
    }, [selectedValue, data, placeholder]);

    // Memoize the clear filter handler
    const handleClearFilter = useCallback(() => {
        handleFiltervalueClick({ display_text: placeholder, value: placeholder });
    }, [handleFiltervalueClick, placeholder]);

    return (
        <>
            <div ref={dropdownRef} className={styles.dropdown}>
                <div style={selected.value !== placeholder ? { borderColor: "#9C9C9C" } : {}} onClick={(e) => setIsActive(!isActive)} className={styles.dropdown_button}>
                    <p style={selected.value !== placeholder ? { color: "#000" } : {}}>
                        {selected.value !== placeholder && <b>•</b>}{selected?.display_text?.length > 20 ? `${selected.display_text.substring(0, 20)}...` : selected.display_text}
                    </p>
                    <span>{isActive ? <FontAwesomeIcon icon={faChevronUp} className={styles.icon} /> : <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />}</span>
                </div>

                {/* dropdown content only for desktop device */}
                <div className={styles.dropdown_content} style={{ display: isActive && !isMobile() ? "block" : "none" }}>
                    <div className={styles.dropdown_header}>
                        <p>Job type</p>
                        <p onClick={handleClearFilter} className={styles.dropdown_header_clearbtn}>
                            Clear
                        </p>
                    </div>
                    <div>
                        {!!data &&
                            data.map((item) => {
                                return (
                                    <div
                                        key={item.display_text}
                                        onClick={() => handleFiltervalueClick(item)}
                                        className={`${styles.item} ${item.value === "Clear" ? styles.dropdown_clearmessage : ""}`}
                                        style={item.value === selected.value ? { backgroundColor: "#f1f1f1" } : {}}
                                    >
                                        {item.display_text}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

            {/* drawer only for mobile device  */}
            {isMobile() && (
                <Drawer open={isActive} onClose={toggleDrawer} direction="bottom" className={styles.drawer} size={460}>
                    <div style={{ display: isActive ? "block" : "none" }}>
                        <div className={styles.drawer_header}>
                            <p>Job type </p>
                            <FontAwesomeIcon onClick={toggleDrawer} icon={faXmark} className={styles.icon} />
                            {/* <p className={styles.drawer_header_clearbtn}>Clear</p> */}
                        </div>
                        <div className={styles.drawer_content}>
                            {!!data &&
                                data.map((item) => {
                                    return (
                                        <p key={item.display_text} onClick={() => handleFiltervalueClick(item)} className={styles.item} style={item.value === selected.value ? { backgroundColor: "#f1f1f1" } : {}}>
                                            {item.display_text}
                                        </p>
                                    );
                                })}
                        </div>
                        <div onClick={handleClearFilter} className={styles.drawer_clearmessage}>Clear filter</div>
                    </div>
                </Drawer>
            )}
        </>
    );
};

// Wrap the component with React.memo to prevent unnecessary re-renders
export default React.memo(Dropdown);
