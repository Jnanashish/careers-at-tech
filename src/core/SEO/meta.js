import React from "react";
import Head from "next/head";

function Meta(props) {
    const title = props?.title || "Discover freshers tech Jobs and Internships | Careers at tech";
    const desc = props?.description || "Find verified tech jobs and internships opportunity across India or remote location. Check out our job listings today to discover the right job for you and start your career at tech!";
    const canonical = props?.canonical || "https://careersat.tech/jobs"

    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />

            <meta name="description" content={desc} />
            <meta property="og:description" content={desc} />


            {/* The viewport meta tag is defined twice; keeping only one instance */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#0069ff" />
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={canonical} />

            <meta property="og:locale" content="en_US" />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content="Careers at Tech" />
            <meta property="og:image" content="https://res.cloudinary.com/dvc6fw5as/image/upload/v1737812575/IMG_7793_vq6qwi.jpg" />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="400" />
            <meta property="og:image:height" content="400" />
        </Head>
    );
}

export default Meta;
