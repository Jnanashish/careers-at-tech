import React from "react";
import styles from "./sidebar.module.scss";
import WhatAppBanner from "@/components/Banners/WhatsappBanner";
import DasBanner from "@/Temp/Das/DasBanner";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <DasBanner/>
            <br/><br/>
            <WhatAppBanner />
        </div>
    );
}

export default Sidebar;
