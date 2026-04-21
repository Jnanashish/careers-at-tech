import React, { useState, useEffect, useCallback } from "react";
import ReactModal from "react-modal";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCopy, faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./TailorModal.module.scss";
import { stripHtml, buildJdText } from "@/lib/stripHtml";
import { firebaseEventHandler } from "@/core/eventHandler";

const PROMPT_TEMPLATE = `You are an expert tech recruiter who hires Indian freshers for companies like
{COMPANY}. I'm applying for the role below. Help me tailor my resume to this
specific job description without inventing any experience I don't have.

ROLE: {JOB_TITLE} at {COMPANY}

JOB DESCRIPTION:
{JD_TEXT}

Here's what I need you to do:
1. Extract the top 10 keywords and skills from the JD that an ATS would look for.
2. Ask me to paste my current resume.
3. Once I paste it, identify which keywords are missing and which bullets need
   rewriting.
4. Rewrite my bullet points to naturally include the missing keywords — but only
   where they're truthful based on what I've actually done.
5. Flag any skill gaps I should address in my cover letter instead.
6. Give me a final "fresher-friendly" 3-line professional summary at the top.

Important: I'm a fresher with limited experience. Don't make up metrics or
invent skills. Keep the tone confident but honest. Output plain text only —
no tables, no markdown formatting, no emojis.`;

const TailorModal = ({ isOpen, onClose, jobData }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            ReactModal.setAppElement("#__next");
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            firebaseEventHandler("tailor_modal_opened", {
                job_id: jobData?._id || "",
            });
        }
    }, [isOpen, jobData?._id]);

    const generatedPrompt = PROMPT_TEMPLATE
        .replace(/\{JOB_TITLE\}/g, jobData?.role || "")
        .replace(/\{COMPANY\}/g, jobData?.companyName || "")
        .replace(/\{JD_TEXT\}/g, buildJdText(jobData));

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(generatedPrompt);
            setCopied(true);
            firebaseEventHandler("tailor_modal_prompt_copied", {
                job_id: jobData?._id || "",
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // fallback: user must copy manually
        }
    }, [generatedPrompt, jobData?._id]);

    const handleAiClick = (platform, url) => {
        firebaseEventHandler(`open_in_${platform}_clicked`, {
            source: "tailor_modal",
            job_id: jobData?._id || "",
        });
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleClose}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            className={styles.modal}
            overlayClassName={styles.overlay}
            aria={{
                labelledby: "tailor-modal-title",
                describedby: "tailor-modal-desc",
            }}
        >
            <div className={styles.modalContent}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h2 id="tailor-modal-title" className={styles.headerTitle}>
                            Tailor your resume to this job
                        </h2>
                        <p id="tailor-modal-desc" className={styles.headerSub}>
                            {jobData?.role} at {jobData?.companyName}
                        </p>
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={handleClose}
                        aria-label="Close modal"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                {/* Prompt */}
                <div className={styles.promptContainer}>
                    <pre className={styles.promptBlock}>
                        <code>{generatedPrompt}</code>
                    </pre>
                </div>

                {/* Copy Button */}
                <button
                    className={`${styles.copyBtn} ${copied ? styles.copiedBtn : ""}`}
                    onClick={handleCopy}
                    aria-label={copied ? "Copied to clipboard" : "Copy prompt"}
                >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                    <span>{copied ? "Copied!" : "Copy prompt"}</span>
                </button>

                {/* AI Platform Links */}
                <div className={styles.aiLinks}>
                    <button
                        className={styles.aiButton}
                        onClick={() => handleAiClick("chatgpt", "https://chatgpt.com/")}
                        aria-label="Open ChatGPT"
                    >
                        Open ChatGPT
                    </button>
                    <button
                        className={styles.aiButton}
                        onClick={() => handleAiClick("claude", "https://claude.ai/new")}
                        aria-label="Open Claude"
                    >
                        Open Claude
                    </button>
                    <button
                        className={styles.aiButton}
                        onClick={() => handleAiClick("gemini", "https://gemini.google.com/app")}
                        aria-label="Open Gemini"
                    >
                        Open Gemini
                    </button>
                </div>

                {/* Steps */}
                <div className={styles.steps}>
                    <p className={styles.stepsTitle}>What to do next</p>
                    <ol className={styles.stepsList}>
                        <li>Paste this prompt in your AI of choice</li>
                        <li>Paste your resume when asked</li>
                        <li>Review and copy the output back</li>
                    </ol>
                </div>

                {/* Footer */}
                <div className={styles.modalFooter}>
                    <Link href="/toolkit" className={styles.footerLink}>
                        Not what you wanted? Browse more prompts
                        <FontAwesomeIcon className={styles.footerArrow} icon={faArrowRight} />
                    </Link>
                </div>
            </div>
        </ReactModal>
    );
};

export default TailorModal;
