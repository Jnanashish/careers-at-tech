import React from "react";
import Image from "next/image";
import styles from "./contact.module.scss";
import Header from "@/components/common/Header/header";
import Footer from "@/components/common/Footer/Footer";

function Contact() {
    const openWhatsApp = () => {
        const phoneNumber = "917743091193";
        const msg = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
        window.open(msg);
    };

    return (
        <div>
            <Header />
            <div className={styles.contactContainer}>
                <Image
                    src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1677948702/3d-business-young-woman-talking-online_1_h69v40.png"
                    alt="girl with query"
                    height={200}
                    width={158}
                    className={styles.girlCover}
                />
                <h3>Got a query?</h3>
                <p>Shoot an email and get it resolved!</p>
                <a href="mailto:thecodergeek@gmail.com?subject=Query related to Job">
                    thecodergeek@gmail.com
                </a>
                <div onClick={() => openWhatsApp()} className={styles.whatsAppContainer}>
                    <p>
                        For instant answers for all your queries, Reach out to us on <br /> WhatsApp
                        <b> @ +91 7743091193</b>
                    </p>
                    <Image
                        src="https://res.cloudinary.com/dvc6fw5as/image/upload/v1677949670/get-logo-whatsapp-png-pictures-1_cdq0bq.png"
                        height={60}
                        width={60}
                        className={styles.whatsAppIcon}
                        alt="whatsapp icon"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
