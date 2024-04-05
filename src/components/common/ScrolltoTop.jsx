import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const styles = {
    scrollupcontainer: {
        height: "46px",
        width: "46px",
        borderRadius: "50%",
        backgroundColor: "#f2f2f2",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        position: "fixed",
        bottom: "30px",
        right: "20px",
    },
    icon: {
        height: "16px",
        width: "16px",
    },
};

function ScrolltoTop() {
    const [currentHeight, setCurrentHeight] = useState(0);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const handleScroll = () => {
        setCurrentHeight(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {currentHeight > 200 && (
                <div onClick={scrollToTop} style={styles.scrollupcontainer}>
                    <FontAwesomeIcon style={styles.icon} icon={faArrowUp} />
                </div>
            )}
        </>
    );
}

export default ScrolltoTop;
