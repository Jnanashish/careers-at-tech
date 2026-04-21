import React from "react";
import Head from "next/head";

import Navbar from "@/components/Redesign/Navbar";
import FooterNew from "@/components/Redesign/FooterNew";
import ScrollToTop from "@/components/Redesign/ScrollToTop";
import PromptPageLayout from "@/components/toolkit/PromptPageLayout";
import JsonLd from "@/core/SEO/JsonLd";

export async function getStaticPaths() {
    const { getAllPromptSlugs } = require("@/lib/prompts");
    const slugs = getAllPromptSlugs();
    return {
        paths: slugs,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { getPromptBySlug, getRelatedPrompts } = require("@/lib/prompts");
    const prompt = getPromptBySlug(params.slug);
    const relatedPrompts = getRelatedPrompts(params.slug, prompt.frontmatter.category);
    return {
        props: {
            prompt,
            relatedPrompts,
        },
    };
}

const ToolkitPromptPage = ({ prompt, relatedPrompts }) => {
    const { frontmatter } = prompt;
    const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/toolkit/${frontmatter.slug}`;

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: frontmatter.title,
        description: frontmatter.description,
        totalTime: `PT${frontmatter.timeMinutes}M`,
        step: [
            {
                "@type": "HowToStep",
                name: "Copy the prompt",
                text: "Click the Copy button to copy the AI prompt to your clipboard.",
            },
            {
                "@type": "HowToStep",
                name: "Paste into your AI tool",
                text: "Open ChatGPT, Claude, or Gemini and paste the prompt.",
            },
            {
                "@type": "HowToStep",
                name: "Add your details",
                text: "Replace the placeholder text with your actual resume or project details.",
            },
        ],
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: process.env.NEXT_PUBLIC_SITE_URL || "",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Toolkit",
                item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/toolkit`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: frontmatter.title,
                item: canonicalUrl,
            },
        ],
    };

    return (
        <div>
            <Head>
                <title>{frontmatter.seoTitle}</title>
                <meta name="description" content={frontmatter.seoDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:title" content={frontmatter.seoTitle} />
                <meta property="og:description" content={frontmatter.seoDescription} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Careers at Tech" />
                <meta property="og:locale" content="en_US" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={frontmatter.seoTitle} />
                <meta name="twitter:description" content={frontmatter.seoDescription} />
            </Head>
            <JsonLd data={howToSchema} />
            <JsonLd data={breadcrumbSchema} />
            <Navbar />
            <PromptPageLayout prompt={prompt} relatedPrompts={relatedPrompts} />
            <FooterNew />
            <ScrollToTop />
        </div>
    );
};

export default ToolkitPromptPage;
