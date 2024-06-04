import React from "react";
import styles from "./sidebar.module.scss";
import WhatAppBanner from "@/components/Banners/WhatsappBanner";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <WhatAppBanner />
        </div>
    );
}

export default Sidebar;
