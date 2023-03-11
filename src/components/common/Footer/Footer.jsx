import { useState, useEffect } from "react";
import styles from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import telegramIcon from "../../../static/Image/telegramIcon.svg";
import instagramIcon from "../../../static/Image/instagramIcon.svg";
import whatsappIcon from "../../../static/Image/whatsappIcon.svg";
import linkedinIcon from "../../../static/Image/linkedinIcon.svg";

const Footer = () => {
    const [count, setCount] = useState("");
    useEffect(() => {
        pageview();
    }, []);

    const pageview = () => {
        fetch(
            "https://api.countapi.xyz/update/interviewprep/ca0e20b7-5690-4571-a2b0-b45d4c26ec3d/?amount=1"
        )
            .then((res) => res.json())
            .then((data) => {
                setCount(data.value);
            });
    };

    return (
        <div>
            <div className={styles.footerSection}>
                <p className={styles.companyName}>Socials</p>
                <div className={styles.iconContainer}>
                    <a
                        href="https://www.instagram.com/careersattech/"
                        className={styles.socialIcon}>
                        <Image src={instagramIcon} alt="Telegram icon" height={25} width={25} />
                    </a>
                    <a href="https://t.openinapp.co/careersattech-3" className={styles.socialIcon}>
                        <Image src={telegramIcon} alt="Telegram icon" height={25} width={25} />
                    </a>
                    <a href="https://openinapp.co/m04iq" className={styles.socialIcon}>
                        <Image src={linkedinIcon} alt="Telegram icon" height={25} width={25} />
                    </a>
                    <a
                        href="https://chat.whatsapp.com/EQNivQSL7aQFKUqC3YXpgc"
                        className={styles.socialIcon}>
                        <Image src={whatsappIcon} alt="Telegram icon" height={25} width={25} />
                    </a>
                </div>
                <div className={styles.companyTabs}>
                    <p className={styles.companyName}>CareersAtTech</p>
                    <div className={styles.tabContainer}>
                        <Link className={styles.linkTab} href="/contact">
                            Contact us
                        </Link>
                        <Link className={styles.linkTab} href="/privacy-policy">
                            Privacy
                        </Link>
                        <Link className={styles.linkTab} href="/terms-and-conditions">
                            Terms
                        </Link>
                        <Link className={styles.linkTab} href="/dmca">
                            DMCA
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <p>Total Page view 🔎 {count}</p>
                <p>
                    Made with ❤️ in India by
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://bit.ly/jsh_linkedin_footer">
                        @JSH
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
