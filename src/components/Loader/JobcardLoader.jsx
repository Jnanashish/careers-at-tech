import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./index.module.scss";
import { isMobile } from "@/Helpers/utils";
function JobcardLoader() {
    const mobile = isMobile();
    return (
        <div className={styles.jobloader}>
            <span className={styles.jobloader_logoloader}>
                <Skeleton circle={true} height={mobile ? 42 : 56} width={mobile ? 42 : 56} />
            </span>
            <span className={styles.jobloader_textloader}>
                <Skeleton height={mobile ? 20 : 22} />
                <Skeleton height={mobile ? 10 : 12} width={100} />
                <Skeleton height={mobile ? 10 : 12} width={mobile ? 240 : 400} />
                <Skeleton height={mobile ? 10 : 12} width={140} />
            </span>
        </div>
    );
}
export default JobcardLoader;