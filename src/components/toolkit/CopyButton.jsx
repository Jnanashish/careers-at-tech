import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

import styles from "./CopyButton.module.scss";
import { firebaseEventHandler } from "@/core/eventHandler";

const CopyButton = ({ text, label = "Copy prompt", variant = "primary", analyticsSlug, analyticsSource }) => {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setError(false);

            if (analyticsSlug || analyticsSource) {
                firebaseEventHandler("prompt_copied", {
                    slug: analyticsSlug || "",
                    source: analyticsSource || "",
                });
            }

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    }, [text, analyticsSlug, analyticsSource]);

    if (error) {
        return (
            <button
                className={`${styles.copyButton} ${styles[variant]}`}
                aria-label="Select and copy manually"
            >
                Select and copy manually
            </button>
        );
    }

    return (
        <button
            className={`${styles.copyButton} ${styles[variant]} ${copied ? styles.copied : ""}`}
            onClick={handleCopy}
            aria-label={copied ? "Copied to clipboard" : label}
        >
            <FontAwesomeIcon
                className={styles.icon}
                icon={copied ? faCheck : faCopy}
            />
            <span>{copied ? "Copied!" : label}</span>
        </button>
    );
};

export default CopyButton;
