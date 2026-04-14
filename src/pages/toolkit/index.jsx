import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./toolkit.module.scss";
import Header from "@/components/common/Header/header";
import Footer from "@/components/common/Footer/Footer";
import ScrolltoTop from "@/components/common/ScrolltoTop";
import CategoryGrid from "@/components/toolkit/CategoryGrid";
import PromptCard from "@/components/toolkit/PromptCard";
import WhatAppBanner from "@/components/Banners/WhatsappBanner";
import JsonLd from "@/core/SEO/JsonLd";

import { CATEGORIES } from "@/lib/categories";
import { getJobListing } from "@/Helpers/jobdetailshelper";
import { generateSlugFromrole } from "@/Helpers/jobdetailshelper";
import { firebaseEventHandler } from "@/core/eventHandler";

export async function getStaticProps() {
    const { getAllPrompts, getPromptsByCategory, getFeaturedPrompts } = require("@/lib/prompts");
    const allPrompts = getAllPrompts();
    const promptsByCategory = getPromptsByCategory();
    const featuredPrompts = getFeaturedPrompts();

    let trendingJobs = [];
    try {
        const res = await getJobListing(null, 1, 6);
        trendingJobs = res?.data?.filter((j) => j?.jdpage === "true").slice(0, 6) || [];
    } catch (e) {
        trendingJobs = [];
    }

    return {
        props: {
            allPrompts,
            promptsByCategory,
            featuredPrompts,
            trendingJobs,
        },
        revalidate: 600,
    };
}

const FAQ_ITEMS = [
    {
        q: "Is this free?",
        a: "Yes, completely free. There is no signup, no paywall, and no hidden cost. You copy the prompt, paste it into your own AI tool, and use it as many times as you like.",
    },
    {
        q: "Which AI tool is best — ChatGPT, Claude, or Gemini?",
        a: "All three work well with these prompts. ChatGPT (GPT-4o) and Claude tend to follow formatting instructions more closely. Gemini is a solid free option. Try whichever you already have access to.",
    },
    {
        q: "Will recruiters notice if I used AI to write my resume?",
        a: "Not if you use it correctly. These prompts help you rewrite your own real experience more clearly — they don't generate fake content. The output still needs your review and personal touch.",
    },
    {
        q: "Is it safe to paste my resume into ChatGPT?",
        a: "Your resume contains personal info, so use the same judgement you would with any online tool. All major AI tools have privacy policies. If you are concerned, remove your phone number and address before pasting.",
    },
    {
        q: "I have no internships. Will these prompts still work?",
        a: "Yes. Several prompts in the 'I have no real experience' category are specifically built for freshers with only college projects, coursework, and personal projects. That is the core audience for this toolkit.",
    },
    {
        q: "Do these prompts work for non-CS branches?",
        a: "Yes. The 'Career switcher' category has prompts built for mechanical, civil, electrical, and other non-CS students who are targeting software roles. They help you reframe your background as an advantage.",
    },
    {
        q: "How is this different from tools like Enhancv or Teal?",
        a: "Those are resume builders with templates. This toolkit gives you AI prompts you run yourself — you keep full control over the output, and you are not locked into any tool or format. It is also completely free.",
    },
];

const ToolkitHubPage = ({ allPrompts, promptsByCategory, featuredPrompts, trendingJobs }) => {
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        firebaseEventHandler("toolkit_hub_view", {});
    }, []);

    const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/toolkit`;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Resume Toolkit — Free AI Prompts for Fresher Tech Jobs",
        description: "Free, curated AI prompts to tailor your resume, fix bullet points, and pass ATS checks. Built for Indian freshers by CareersAt.Tech.",
        url: canonicalUrl,
        numberOfItems: allPrompts.length,
    };

    const scrollToCategories = () => {
        const el = document.getElementById("categories-section");
        if (el) {
            const offset = 80;
            const pos = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: pos - offset, behavior: "smooth" });
        }
    };

    return (
        <div>
            <Head>
                <title>Resume Toolkit — Free AI Prompts for Fresher Tech Jobs | CareersAt.Tech</title>
                <meta
                    name="description"
                    content="Free, curated AI prompts to tailor your resume, fix bullet points, and pass ATS checks. Built for Indian freshers by CareersAt.Tech."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:title" content="Resume Toolkit — Free AI Prompts for Fresher Tech Jobs | CareersAt.Tech" />
                <meta property="og:description" content="Free, curated AI prompts to tailor your resume, fix bullet points, and pass ATS checks. Built for Indian freshers by CareersAt.Tech." />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Careers at Tech" />
                <meta property="og:locale" content="en_US" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Resume Toolkit — Free AI Prompts for Fresher Tech Jobs | CareersAt.Tech" />
                <meta name="twitter:description" content="Free, curated AI prompts to tailor your resume, fix bullet points, and pass ATS checks. Built for Indian freshers by CareersAt.Tech." />
            </Head>
            <JsonLd data={faqSchema} />
            <JsonLd data={collectionSchema} />
            <Header />

            <main className={styles.toolkit}>
                {/* Hero */}
                <section className={styles.hero}>
                    <h1 className={styles.heroTitle}>Fix your resume in 5 minutes.</h1>
                    <p className={styles.heroSub}>
                        Free AI prompts built for Indian freshers. Paste into ChatGPT, Claude, or Gemini. No signup, no paywall.
                    </p>
                    <div className={styles.heroCtas}>
                        <button onClick={scrollToCategories} className={styles.primaryCta}>
                            Browse prompts
                            <FontAwesomeIcon className={styles.ctaIcon} icon={faArrowDown} />
                        </button>
                        <Link href="/jobs" className={styles.secondaryCta}>
                            Try it on a live job
                            <FontAwesomeIcon className={styles.ctaIcon} icon={faArrowRight} />
                        </Link>
                    </div>
                </section>

                {/* How it works */}
                <section className={styles.howItWorks}>
                    <h2 className={styles.sectionTitle}>How it works</h2>
                    <div className={styles.stepsGrid}>
                        <div className={styles.stepCard}>
                            <span className={styles.stepNumber}>1</span>
                            <h3>Pick your situation</h3>
                            <p>Choose a prompt that matches what you need — tailoring, ATS fixes, or a full critique.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <span className={styles.stepNumber}>2</span>
                            <h3>Copy the prompt</h3>
                            <p>Hit the copy button. The prompt is ready to paste — no editing needed.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <span className={styles.stepNumber}>3</span>
                            <h3>Paste in your AI of choice</h3>
                            <p>Open ChatGPT, Claude, or Gemini. Paste the prompt and follow the instructions.</p>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section id="categories-section" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Pick your situation</h2>
                    <CategoryGrid categories={CATEGORIES} promptsByCategory={promptsByCategory} />
                </section>

                {/* Featured Prompts */}
                {featuredPrompts.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Featured prompts</h2>
                        <div className={styles.promptGrid}>
                            {featuredPrompts.map((p) => (
                                <PromptCard key={p.slug} prompt={p} />
                            ))}
                        </div>
                    </section>
                )}

                {/* All prompts by category */}
                {CATEGORIES.map((cat) => {
                    const prompts = promptsByCategory[cat.key];
                    if (!prompts || prompts.length === 0) return null;
                    return (
                        <section key={cat.key} id={`category-${cat.key}`} className={styles.section}>
                            <h2 className={styles.sectionTitle}>{cat.label}</h2>
                            <p className={styles.sectionSub}>{cat.description}</p>
                            <div className={styles.promptGrid}>
                                {prompts.map((p) => (
                                    <PromptCard key={p.slug} prompt={p} />
                                ))}
                            </div>
                        </section>
                    );
                })}

                {/* Trending Jobs */}
                {trendingJobs.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Tailor on a live job</h2>
                        <p className={styles.sectionSub}>Pick a job and get a prompt pre-filled with the real JD.</p>
                        <div className={styles.jobsScroll}>
                            {trendingJobs.map((job) => {
                                const slug = generateSlugFromrole(job?.title);
                                return (
                                    <Link
                                        key={job._id || job.id}
                                        href={`/${slug}/${job.id}?tailor=1`}
                                        className={styles.jobCard}
                                    >
                                        <p className={styles.jobTitle}>{job.role}</p>
                                        <p className={styles.jobCompany}>{job.companyName}</p>
                                        <span className={styles.jobLink}>
                                            Get prompt
                                            <FontAwesomeIcon className={styles.jobArrow} icon={faArrowRight} />
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* FAQ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
                    <div className={styles.faqList}>
                        {FAQ_ITEMS.map((item, i) => (
                            <div key={i} className={styles.faqItem}>
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    aria-expanded={openFaq === i}
                                >
                                    <span>{item.q}</span>
                                    <span className={`${styles.faqToggle} ${openFaq === i ? styles.faqOpen : ""}`}>+</span>
                                </button>
                                {openFaq === i && (
                                    <p className={styles.faqAnswer}>{item.a}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* WhatsApp CTA */}
                <section className={styles.section}>
                    <WhatAppBanner isModal={false} />
                </section>
            </main>

            <Footer />
            <ScrolltoTop />
        </div>
    );
};

export default ToolkitHubPage;
