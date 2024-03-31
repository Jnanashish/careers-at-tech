import React from "react";
import styles from "./loader.module.scss";

function Loader(props) {
    const { loaderheight, loadercontainerheright, borderWidth } = props;
    return (
        <div style={loadercontainerheright ? { height: loadercontainerheright } : {}} className={styles.loader_section}>
            <div
                style={{
                    height: loaderheight ? loaderheight : "70px",
                    width: loaderheight ? loaderheight : "70px",
                    borderWidth: borderWidth ? borderWidth : "6px",
                }}
                className={styles.loader}
            />
        </div>
    );
}

export default Loader;
