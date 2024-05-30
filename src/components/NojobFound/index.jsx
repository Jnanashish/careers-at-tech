import React from "react";
import styles from "./index.module.scss";

function NojobFound() {
    return (
        <div className={styles.nojobsection}>
            <p>
                No jobs found 😔, Please try different filter <br />
                or <span onClick={() => Router.push("/contact")}>contact us</span> if the issue continue.
            </p>
        </div>
    );
}

export default NojobFound;
