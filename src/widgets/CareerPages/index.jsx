import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

const ALPHABETS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0-9"];

// ~490 outbound links on one page. rel="nofollow" so this directory doesn't read
// as a link farm and doesn't hand ranking signal to every company it lists;
// noopener/noreferrer for the usual target="_blank" reasons.
const OUTBOUND_REL = "nofollow noopener noreferrer";

function CareerPages({ careerpageData }) {
    return (
        <main id="main-content" className={styles.careepages}>
            <h1>Discover product based companies and their career pages</h1>
            <div className={styles.careepages_alphabets}>
                {ALPHABETS.map((item) => (
                    <a key={item} href={`#${item}`}>{item}</a>
                ))}
            </div>
            <div className={styles.companylist}>
                {careerpageData?.map((item, index) => {
                    return (
                        <div key={item?.name || index}>
                            {!!item?.alphabet && <span id={item?.alphabet} className={styles.companylist_alphabet}>{item?.alphabet}</span>}
                            {!!item?.name && (
                                <span className={styles.companylist_card}>
                                    {!!item?.logourl && <Image height={40} width={40} src={item?.logourl} alt={`${item?.name || "Company"} logo`} loading="lazy" />}
                                    <h4>{item?.name}</h4>
                                    <a className="desktopview" href={item?.url} target="_blank" rel={OUTBOUND_REL}>{item?.url}</a>
                                </span>
                            )}
                            <a href={item?.url} target="_blank" rel={OUTBOUND_REL}>{item?.url}</a>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

export default CareerPages;
