import React from "react";
import styles from "./sidebar.module.scss";
import founditbanner from "../../static/Image/foundit.svg";
import Image from "next/image";
import WhatAppBanner from "@/components/Banners/WhatsappBanner";
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <WhatAppBanner />
            <a href="bit.ly/foundit-careersattech">
                <Image className={styles.sidebar_image} src={founditbanner} width={1200} height={750} />
            </a>
        </div>
    );
}

export default Sidebar;
