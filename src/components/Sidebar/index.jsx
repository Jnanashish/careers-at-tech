import React from "react";
import styles from "./sidebar.module.scss";
import WhatAppBanner from "@/components/Banners/WhatsappBanner";
import PromoBanner from "../Banners/PromoBanner";
import SubscribeForm from "../SubscribeForm";
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <SubscribeForm/>
            <WhatAppBanner />
            {/* <PromoBanner/> */}
        </div>
    );
}

export default Sidebar;
