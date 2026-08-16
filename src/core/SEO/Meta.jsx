import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME } from "./constants";

/**
 * Generic page <Head> for title, description, canonical and social cards.
 * Charset and viewport live in _document.js / _app.js respectively — never here.
 *
 * Canonical defaults to the *current* route (self-referential) when no `canonical`
 * prop is passed, so pages that render <Meta/> bare no longer all claim
 * https://careersat.tech/jobs as their canonical URL.
 *
 * Pass `noindex` to keep a page out of the index (thin, duplicate or utility
 * pages). It was previously impossible to do that through this component —
 * "index, follow" was hardcoded for every caller.
 */
function Meta(props) {
    const router = useRouter();

    const title = props?.title || "Discover freshers tech Jobs and Internships | Careers at tech";
    const desc =
        props?.description ||
        "Find verified tech jobs and internships opportunity across India or remote location. Check out our job listings today to discover the right job for you and start your career at tech!";

    const currentPath = (router?.asPath || "/jobs").split(/[?#]/)[0];
    const canonical = props?.canonical || `${SITE_URL}${currentPath}`;
    const ogImage = props?.image || DEFAULT_OG_IMAGE;
    const imageAlt = props?.imageAlt || title;

    // The default OG image is square (400x400). "summary_large_image" against a
    // square asset makes Twitter/X drop the card image entirely, so only claim
    // the large card when the caller supplied a wide image of its own.
    const twitterCard = props?.image ? "summary_large_image" : "summary";

    // max-image-preview:large opts into full-size SERP thumbnails, max-snippet:-1
    // lets Google use as much of the description as it wants. Both are pure
    // upside for a job board and the resume-prompts pages already set them —
    // this makes it the site-wide default rather than a one-page special case.
    const robots = props?.noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1";

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={canonical} />
            <meta name="theme-color" content="#0069ff" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={imageAlt} />

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={imageAlt} />
        </Head>
    );
}

export default Meta;
