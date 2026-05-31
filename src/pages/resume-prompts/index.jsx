import React, { useEffect } from "react";
import Head from "next/head";

import Header from "@/components/layout/Header";
import FooterNew from "@/components/Redesign/FooterNew";
import ScrollToTop from "@/components/Redesign/ScrollToTop";
import JsonLd from "@/core/SEO/JsonLd";

import Hero from "@/components/toolkit/v3/Hero";
import HowItWorks from "@/components/toolkit/v3/HowItWorks";
import Diagnosis from "@/components/toolkit/v3/Diagnosis";
import CategoryGridV3 from "@/components/toolkit/v3/CategoryGridV3";
import FeaturedPrompts from "@/components/toolkit/v3/FeaturedPrompts";
import PromptLibrary from "@/components/toolkit/v3/PromptLibrary";
import JobsScroll from "@/components/toolkit/v3/JobsScroll";
import FAQ from "@/components/toolkit/v3/FAQ";
import WhatsAppBanner from "@/components/toolkit/v3/WhatsAppBanner";

import { CATEGORIES, CATEGORY_BY_KEY, FILTER_CHIPS } from "@/lib/categories";
import { listJobsV2 } from "@/core/apis/v2/client";
import { firebaseEventHandler } from "@/core/eventHandler";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

export async function getStaticProps() {
    const { getAllPrompts, getFeaturedPrompts } = require("@/lib/prompts");

    const allPrompts = getAllPrompts();
    const featuredPrompts = getFeaturedPrompts();

    // shape prompts for v3 components — add catId + display category label + tools array
    const shapeForV3 = (p) => {
        const cat = CATEGORY_BY_KEY[p.category];
        return {
            id: p.slug,
            slug: p.slug,
            catId: cat?.catId || p.category,
            category: cat?.label || p.categoryLabel || p.category,
            title: p.title,
            description: p.description,
            time: p.timeMinutes || 3,
            tools: Array.isArray(p.worksWith) ? p.worksWith : ["ChatGPT", "Claude", "Gemini"],
            popular: !!p.featured,
        };
    };

    const v3Prompts = allPrompts.map(shapeForV3);

    // featured: ensure top-3 with promptPreview hint for the featured card
    const featuredShaped = featuredPrompts
        .slice(0, 3)
        .map(shapeForV3)
        .map((p, idx) => {
            const original = featuredPrompts[idx];
            return {
                ...p,
                promptPreview: original?.description || p.description,
            };
        });

    // category counts for the grid (drives "{n} prompts" badge)
    const promptCountByKey = {};
    for (const p of allPrompts) {
        promptCountByKey[p.category] = (promptCountByKey[p.category] || 0) + 1;
    }
    const gridCategories = CATEGORIES.map((c) => ({
        id: c.catId,
        label: c.label,
        hint: c.hint,
        count: promptCountByKey[c.key] || 0,
    }));

    const sectionMeta = CATEGORIES.map((c) => ({
        id: c.catId,
        title: c.sectionTitle,
        sub: c.sectionSub,
    }));

    // live jobs for the rail
    let trendingJobs = [];
    try {
        const res = await listJobsV2({ limit: 6, page: 1, sort: "datePosted:desc" });
        trendingJobs = (res?.data || []).slice(0, 6).map((j) => ({
            slug: j.slug,
            title: j.title || j.role || "Role",
            companyName: j.companyName || j.company || "",
        }));
    } catch (_) {
        trendingJobs = [];
    }

    return {
        props: {
            v3Prompts,
            featuredShaped,
            gridCategories,
            sectionMeta,
            trendingJobs,
            totalPromptCount: allPrompts.length,
        },
        revalidate: 600,
    };
}

const FAQ_ITEMS = [
    {
        q: "Is this actually free? Where's the catch?",
        a: "Yes — completely free. No signup, no email, no credit card, no paywall. CareersAt.Tech makes money from the job board; this toolkit is a side project we run because it's the thing we wished existed when we were freshers.",
    },
    {
        q: "Will recruiters know I used AI to write my resume?",
        a: "Not if you use it the way we suggest. These prompts rewrite your own real experience more clearly — they don't fabricate. You're still the one with the brain; the AI is the editor. Read every line before pasting and remove anything that overstates what you actually did.",
    },
    {
        q: "Do I need a paid ChatGPT / Claude / Gemini plan?",
        a: "No. Every prompt here is sized to fit the free tier of ChatGPT (GPT-4o mini), Claude (Haiku/Sonnet free), and Gemini (1.5 Flash). For long resume rewrites Claude tends to follow formatting best; for quick bullet fixes ChatGPT is fastest; Gemini handles short tweaks well.",
    },
    {
        q: "Is it safe to paste my resume into an AI tool?",
        a: "Use the same judgement you would on any web tool. All three major AIs publish privacy policies. If you're cautious, remove your phone number, full address, and college roll number before pasting — they don't change the AI's output anyway.",
    },
    {
        q: "I have no internships. Will these prompts still work?",
        a: "Yes — this toolkit was built for exactly that case. The 'No real experience yet' and 'Internship resume' categories use only college projects, hackathons, and coursework as input. Most of the freshers who use this site have zero internships when they start.",
    },
    {
        q: "Do these prompts work for non-CS branches (Mech, Civil, ECE)?",
        a: "Yes. The 'Career switcher' category has prompts specifically built for mechanical, civil, electrical, and ECE students targeting software roles. They frame your non-CS background as an asset, not a gap.",
    },
    {
        q: "What if the output sounds too American or too corporate?",
        a: "Add this line to the end of any prompt: 'Use Indian English. Avoid words like leveraged, spearheaded, synergized, delve, embark.' Most AI tools then drop the corporate-fluff vocabulary. A one-click 'India-fresher mode' toggle is on the roadmap.",
    },
    {
        q: "How is this different from Enhancv, Teal, or Zety?",
        a: "Those are paid resume builders with templates. This toolkit gives you raw AI prompts you run yourself — you keep full control over the output, you're not locked into any tool or format, and there's no monthly fee. The trade-off: you do the copy-paste work yourself instead of clicking buttons.",
    },
    {
        q: "How do I suggest a new prompt or report a bad one?",
        a: "Join the WhatsApp community below or DM @Jnanashish on Twitter. New prompts go up every couple of weeks based on what people ask for. If a prompt gives a bad output for your situation, share the input + output and we'll tune it.",
    },
];

const ToolkitHubPage = ({
    v3Prompts,
    featuredShaped,
    gridCategories,
    sectionMeta,
    trendingJobs,
    totalPromptCount,
}) => {
    useEffect(() => {
        firebaseEventHandler("toolkit_hub_view", {
            version: "v3",
            prompts: totalPromptCount,
        });
    }, [totalPromptCount]);

    const canonicalUrl = `${SITE_URL}/resume-prompts`;

    const seoTitle = `Free AI Resume Prompts for Fresher Tech Jobs | CareersAt.Tech`;
    const seoDescription = `${totalPromptCount}+ free, curated AI prompts to rewrite your resume for ATS, tailor it to a specific JD, fix weak bullets, and pass auto-screening. Built for Indian B.Tech freshers. No signup, no paywall.`;

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

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Resume Prompts",
                item: canonicalUrl,
            },
        ],
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Fix your resume with free AI prompts (5 minutes)",
        description:
            "Step-by-step: pick the situation that matches you, copy a free AI prompt, paste it into ChatGPT/Claude/Gemini, and get a tailored resume rewrite.",
        totalTime: "PT5M",
        estimatedCost: { "@type": "MonetaryAmount", currency: "INR", value: "0" },
        step: [
            {
                "@type": "HowToStep",
                position: 1,
                name: "Pick your situation",
                text: "Choose the category that sounds like yours — no experience, ATS rejection, switching from non-CS, tailoring to a specific JD, fixing weak bullets, or a full critique.",
            },
            {
                "@type": "HowToStep",
                position: 2,
                name: "Open the prompt",
                text: "Open any prompt and hit the Copy button on its page. The prompt comes with all the context an AI needs to be useful.",
            },
            {
                "@type": "HowToStep",
                position: 3,
                name: "Paste in your AI tool",
                text: "Open ChatGPT, Claude, or Gemini. Free tier is fine. Paste the prompt, replace the placeholder text with your actual resume or JD, and run.",
            },
            {
                "@type": "HowToStep",
                position: 4,
                name: "Review and ship",
                text: "Read each line before pasting back into your resume. Remove anything that overstates what you actually did. Save a version named for the role you're applying to.",
            },
        ],
    };

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Resume Prompts — AI prompts for Indian tech freshers",
        numberOfItems: v3Prompts.length,
        itemListElement: v3Prompts.slice(0, 20).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/resume-prompts/${p.slug}`,
            name: p.title,
        })),
    };

    const ogImage = `${SITE_URL}/og-image.png`;

    return (
        <>
            <Head>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta
                    name="keywords"
                    content="resume prompts, AI resume, ChatGPT resume, Claude resume, fresher resume India, ATS resume, tailor resume to JD, college project resume, no experience resume, internship resume, non-CS to tech, LinkedIn headline AI"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
                <meta name="author" content="CareersAt.Tech" />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="CareersAt.Tech" />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@Jnanashish" />
                <meta name="twitter:creator" content="@Jnanashish" />
                <meta name="twitter:title" content={seoTitle} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={ogImage} />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>

            <JsonLd data={faqSchema} />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={howToSchema} />
            <JsonLd data={itemListSchema} />

            <Header />

            <main className="bg-white text-cat-ink">
                <Hero />
                <HowItWorks />
                <Diagnosis />
                <CategoryGridV3 categories={gridCategories} />
                <FeaturedPrompts prompts={featuredShaped} layout="hero" />
                <PromptLibrary
                    prompts={v3Prompts}
                    filterCategories={FILTER_CHIPS}
                    sectionMeta={sectionMeta}
                />
                <JobsScroll jobs={trendingJobs} />
                <FAQ items={FAQ_ITEMS} />
                <WhatsAppBanner />
            </main>

            <FooterNew />
            <ScrollToTop />
        </>
    );
};

export default ToolkitHubPage;
