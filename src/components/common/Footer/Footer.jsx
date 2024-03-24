import styles from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import telegramIcon from "../../../static/Image/telegramIcon.svg";
import instagramIcon from "../../../static/Image/instagramIcon.svg";
import whatsappIcon from "../../../static/Image/whatsappIcon.svg";
import linkedinIcon from "../../../static/Image/linkedinIcon.svg";

import { jobsbylocation, jobsbybatch, company, jobsbytypes } from "./Helpers/staticdata";
import { firenbaseEventHandler } from "@/core/eventHandler";

const Footer = () => {
    const socialIconClicked = (name) => {
        firenbaseEventHandler("social_icon_clicked", {
            social_media_name: name,
            source: "Footer",
        });
    };

    return (
        <div className={styles.footer}>
            <div className={styles.footer_links}>
                <span>
                    <p>Connect with us</p>
                    <div className={styles.social_container}>
                        <a href="https://www.instagram.com/careersattech/" onClick={() => socialIconClicked("instagram")} className={styles.social_container_icons}>
                            <Image src={instagramIcon} alt="Telegram icon" height={25} width={25} />
                        </a>
                        <a onClick={() => socialIconClicked("telegram")} href="https://t.openinapp.co/careersattech-3" className={styles.social_container_icons}>
                            <Image src={telegramIcon} alt="Telegram icon" height={25} width={25} />
                        </a>
                        <a onClick={() => socialIconClicked("linkedin")} href="https://openinapp.co/m04iq" className={styles.social_container_icons}>
                            <Image src={linkedinIcon} alt="Telegram icon" height={25} width={25} />
                        </a>
                        <a onClick={() => socialIconClicked("whatsApp")} href="https://chat.whatsapp.com/EQNivQSL7aQFKUqC3YXpgc" className={styles.social_container_icons}>
                            <Image src={whatsappIcon} alt="Telegram icon" height={25} width={25} />
                        </a>
                    </div>
                </span>
{/* 
                <div className={styles.companytabs}>
                    <span>
                        <p>CareersAtTech</p>
                        <span className={styles.companytabs_links}>
                            {company.map((item, index) => (
                                <Link key={index} className={styles.link} href={item.redirection_url}>
                                    {item.title}
                                </Link>
                            ))}
                        </span>
                    </span>

                    <span>
                        <p>Jobs by types</p>
                        <span className={styles.companytabs_links}>
                            {jobsbytypes.map((item, index) => (
                                <Link key={index} className={styles.link} href={item.redirection_url}>
                                    {item.title}
                                </Link>
                            ))}
                        </span>
                    </span>

                    <span>
                        <p>Jobs by location</p>
                        <span className={styles.companytabs_links}>
                            {jobsbylocation.map((item, index) => (
                                <Link key={index} className={styles.link} href={item.redirection_url}>
                                    {item.title}
                                </Link>
                            ))}
                        </span>
                    </span>

                    <span>
                        <p>Jobs by batch</p>
                        <span className={styles.companytabs_links}>
                            {jobsbybatch.map((item, index) => (
                                <Link key={index} className={styles.link} href={item.redirection_url}>
                                    {item.title}
                                </Link>
                            ))}
                        </span>
                    </span>
                </div> */}
            </div>
            <div className={styles.bottom_nav}>
                <p>
                    Made with ❤️ in India by
                    <a target="_blank" rel="noopener noreferrer" href="https://bit.ly/jsh_linkedin_footer">
                        @Jnanashish
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
