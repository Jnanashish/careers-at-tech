import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";

import styles from "./PromptCard.module.scss";
import CopyButton from "./CopyButton";

const PromptCard = ({ prompt, promptText }) => {
    const handleCopyClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <Link href={`/toolkit/${prompt.slug}`} className={styles.card}>
            <div className={styles.cardContent}>
                <span className={styles.categoryChip}>{prompt.categoryLabel}</span>
                <h3 className={styles.title}>{prompt.title}</h3>
                <p className={styles.description}>{prompt.description}</p>
                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <FontAwesomeIcon className={styles.metaIcon} icon={faClock} />
                        {prompt.timeMinutes} min
                    </span>
                    <span className={styles.metaDivider}>|</span>
                    <span className={styles.metaItem}>{prompt.difficulty}</span>
                </div>
                <div className={styles.footer}>
                    {promptText && (
                        <span onClick={handleCopyClick}>
                            <CopyButton
                                text={promptText}
                                label="Copy"
                                variant="secondary"
                                analyticsSlug={prompt.slug}
                                analyticsSource="hub"
                            />
                        </span>
                    )}
                    <span className={styles.readMore}>
                        Read more
                        <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default PromptCard;
