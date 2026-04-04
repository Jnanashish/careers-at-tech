import React from "react";
import Router from "next/router";
import styles from "./index.module.scss";

function NojobFound() {
    return (
        <div className={styles.nojobsection}>
            <p>
                No jobs found 😔, Please try different filter <br />
                or <button onClick={() => Router.push("/contact")} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", textDecoration: "underline", font: "inherit", padding: 0 }}>contact us</button> if the issue continue.
            </p>
        </div>
    );
}

export default NojobFound;
