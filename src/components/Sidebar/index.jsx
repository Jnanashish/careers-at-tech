import React from "react";
import styles from "./sidebar.module.scss";
import WhatAppBanner from "@/components/Banners/WhatsappBanner";
import PromoBanner from "../Banners/PromoBanner";
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <WhatAppBanner />
            <PromoBanner/>
        </div>
    );
}

export default Sidebar;
