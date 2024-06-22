import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

function CareerPages({ careerpageData }) {
    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0-9"];

    return (
        <div className={styles.careepages}>
            <h1>Discover product based companies and there career pages </h1>
            <div className={styles.careepages_alphabets}>
                {alphabets &&
                    alphabets?.map((item, index) => {
                        return <a href={`#${item}`}>{item}</a>;
                    })}
            </div>
            <div className={styles.companylist}>
                {careerpageData?.map((item, index) => {
                    return (
                        <>
                            {!!item?.alphabet && <span id={item?.alphabet} className={styles.companylist_alphabet}>{item?.alphabet}</span>}
                            {!!item?.name && (
                                <span className={styles.companylist_card}>
                                    {!!item?.logourl && <Image height={40} width={40} src={item?.logourl} />}
                                    <h4>{item?.name}</h4>
                                    <a href={item?.url}>{item?.url}</a>
                                </span>
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default CareerPages;
