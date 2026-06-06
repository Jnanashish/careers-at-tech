import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";
const DEFAULT_OG_IMAGE = "https://res.cloudinary.com/dvc6fw5as/image/upload/v1737812575/IMG_7793_vq6qwi.jpg";

/**
 * Generic page <Head> for title, description, canonical and social cards.
 * Charset and viewport live in _document.js / _app.js respectively — never here.
 *
 * Canonical defaults to the *current* route (self-referential) when no `canonical`
 * prop is passed, so pages that render <Meta/> bare no longer all claim
 * https://careersat.tech/jobs as their canonical URL.
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

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={canonical} />
            <meta name="theme-color" content="#0069ff" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content="Careers at Tech" />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="400" />
            <meta property="og:image:height" content="400" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={ogImage} />
        </Head>
    );
}

export default Meta;
