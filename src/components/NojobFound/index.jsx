import React from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

function NojobFound() {
    const router = useRouter();

    return (
        <div className={styles.nojobsection}>
            <p>
                <b>No jobs found 😔</b><br /> Please try different filter 
                or <span onClick={() => router.push("/contact")}>contact us</span> if the issue continue.
            </p>
            
        </div>
    );
}

export default NojobFound;
