import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer/Footer";
import CareerPages from "@/widgets/CareerePages";
import companyData from "./companycareerspage.json";
import ScrolltoTop from "@/components/common/ScrolltoTop";
import Meta from "@/core/SEO/Meta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careersat.tech";

function page({ data }) {
    return (
        <>
            <Meta
                title="Product-Based Company Career Pages (A–Z) | CareersAt.Tech"
                description="Direct links to the official career pages of top product-based tech companies, sorted A–Z. Skip the aggregators and apply for jobs straight at the source."
                canonical={`${SITE_URL}/career-pages`}
            />
            <Header />
            <CareerPages careerpageData={data} />
            <Footer />
            <ScrolltoTop />
        </>
    );
}

export default page;

export async function getStaticProps() {
    const data = companyData;

    if (!!data) {
        return {
            props: {
                data: data,
            },
        };
    }

    return {
        notFound: true,
    };
}
