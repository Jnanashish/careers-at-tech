import React from "react";
import Image from "next/image";
import styles from "./contact.module.scss";
import Navbar from "@/components/Redesign/Navbar";
import Footer from "@/components/common/Footer/Footer";
import Meta from "@/core/SEO/Meta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

function Contact() {
    const openWhatsApp = () => {
        const phoneNumber = "919707040143";
        const msg = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
        // noopener: without it the opened tab gets window.opener back into this
        // page and can navigate it (reverse tabnabbing).
        window.open(msg, "_blank", "noopener,noreferrer");
    };

    const handleWhatsAppKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openWhatsApp();
        }
    };

    return (
        <>
        <Meta
            title="Contact CareersAt.Tech — Get in Touch"
            description="Questions about a job listing or need help with your tech career search? Reach the CareersAt.Tech team by email or WhatsApp — we're happy to help freshers."
            canonical={`${SITE_URL}/contact`}
        />
        <div>
            <Navbar />
            <main id="main-content" className={`${styles.contactContainer} pt-16`}>
                <Image
                    src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1677948702/3d-business-young-woman-talking-online_1_h69v40.png"
                    alt="girl with query"
                    height={200}
                    width={158}
                    className={styles.girlCover}
                />
                {/* Was an <h3>: this is the page's top-level heading, so the
                    document started at h3 with no h1 at all. Styling is unchanged
                    (the rule in contact.module.scss moved with it). */}
                <h1>Got a query?</h1>
                <p>Shoot an email and get it resolved!</p>
                <a href="mailto:thecodergeek@gmail.com?subject=Query related to Job">
                    thecodergeek@gmail.com
                </a>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={openWhatsApp}
                    onKeyDown={handleWhatsAppKeyDown}
                    className={styles.whatsAppContainer}
                >
                    <p>
                        For instant answers for all your queries, Reach out to us on <br /> WhatsApp
                        <b> @ +91 9707040143</b>
                    </p>
                    <Image
                        src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1677949670/get-logo-whatsapp-png-pictures-1_cdq0bq.png"
                        height={60}
                        width={60}
                        className={styles.whatsAppIcon}
                        alt="whatsapp icon"
                    />
                </div>
            </main>
            <Footer />
        </div>
        </>
    );
}

export default Contact;
