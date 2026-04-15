import React, { useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./PromptPageLayout.module.scss";
import CopyButton from "./CopyButton";
import PromptCard from "./PromptCard";
import { firebaseEventHandler } from "@/core/eventHandler";

const PromptPageLayout = ({ prompt, relatedPrompts }) => {
    const { frontmatter, content } = prompt;

    useEffect(() => {
        firebaseEventHandler("prompt_page_view", {
            slug: frontmatter.slug,
            category: frontmatter.category,
        });
    }, [frontmatter.slug, frontmatter.category]);

    // Extract the prompt text from within the first code block in the content
    const promptMatch = content.match(/```[\s\S]*?\n([\s\S]*?)```/);
    const promptText = promptMatch ? promptMatch[1].trim() : "";

    // Get the body content after the first code block
    const bodyContent = content.replace(/```[\s\S]*?```/, "").trim();

    return (
        <div className={styles.layout}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/jobs">Home</Link>
                <span className={styles.breadcrumbSep}>/</span>
                <Link href="/toolkit">Toolkit</Link>
                <span className={styles.breadcrumbSep}>/</span>
                <span>{frontmatter.title}</span>
            </nav>

            {/* Hero */}
            <div className={styles.hero}>
                <span className={styles.categoryChip}>{frontmatter.categoryLabel}</span>
                <h1 className={styles.title}>{frontmatter.title}</h1>
                <p className={styles.description}>{frontmatter.description}</p>
                <div className={styles.metaStrip}>
                    <span className={styles.metaItem}>
                        For: {frontmatter.forWho}
                    </span>
                    <span className={styles.metaDivider}>|</span>
                    <span className={styles.metaItem}>
                        <FontAwesomeIcon className={styles.metaIcon} icon={faClock} />
                        {frontmatter.timeMinutes} min
                    </span>
                    <span className={styles.metaDivider}>|</span>
                    <span className={styles.metaItem}>{frontmatter.difficulty}</span>
                    <span className={styles.metaDivider}>|</span>
                    <span className={styles.metaItem}>
                        Works with: {frontmatter.worksWith?.join(", ")}
                    </span>
                </div>
            </div>

            {/* Prompt Block */}
            <div className={styles.promptSection}>
                <div className={styles.promptHeader}>
                    <h2 className={styles.promptLabel}>The prompt</h2>
                    <div className={styles.copyDesktop}>
                        <CopyButton
                            text={promptText}
                            label="Copy prompt"
                            variant="primary"
                            analyticsSlug={frontmatter.slug}
                            analyticsSource="prompt_page"
                        />
                    </div>
                </div>
                <pre className={styles.promptBlock}>
                    <code>{promptText}</code>
                </pre>
                <div className={styles.copyMobile}>
                    <CopyButton
                        text={promptText}
                        label="Copy prompt"
                        variant="primary"
                        analyticsSlug={frontmatter.slug}
                        analyticsSource="prompt_page"
                    />
                </div>
            </div>

            {/* Markdown Body */}
            <div className={styles.body}>
                <ReactMarkdown>{bodyContent}</ReactMarkdown>
            </div>

            {/* Related Prompts */}
            {relatedPrompts && relatedPrompts.length > 0 && (
                <div className={styles.relatedSection}>
                    <h2 className={styles.sectionTitle}>Related prompts</h2>
                    <div className={styles.relatedGrid}>
                        {relatedPrompts.map((rp) => (
                            <PromptCard key={rp.slug} prompt={rp} />
                        ))}
                    </div>
                </div>
            )}

            {/* Footer CTA */}
            <div className={styles.footerCta}>
                <p>Want to try this on a real job?</p>
                <Link href="/jobs" className={styles.footerCtaLink}>
                    Browse live jobs
                    <FontAwesomeIcon className={styles.ctaArrow} icon={faArrowRight} />
                </Link>
            </div>
        </div>
    );
};

export default PromptPageLayout;
