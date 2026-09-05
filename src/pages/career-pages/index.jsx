import React from "react";
import Navbar from "@/components/Redesign/Navbar";
import Footer from "@/components/common/Footer/Footer";
import CareerPages from "@/widgets/CareerPages";
import companyData from "./companycareerspage.json";
import ScrolltoTop from "@/components/common/ScrolltoTop";
import Meta from "@/core/SEO/Meta";
import { SITE_URL } from "@/core/SEO/constants";

// The JSON also carries `originalImage2`, a stale career-pages.vercel.app image
// URL nothing renders. Shipping it pushed this page's __NEXT_DATA__ to 128 kB —
// Next's large-page-data warning threshold exactly — for 492 rows. Project down
// to the four fields the widget actually reads and the payload drops ~41%.
function toRenderableRows(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map(({ alphabet, name, logourl, url }) => {
        const row = {};
        if (alphabet) row.alphabet = alphabet;
        if (name) row.name = name;
        if (logourl) row.logourl = logourl;
        if (url) row.url = url;
        return row;
    });
}

function CareerPagesRoute({ data }) {
    return (
        <>
            <Meta
                title="Product-Based Company Career Pages (A–Z) | CareersAt.Tech"
                description="Direct links to the official career pages of top product-based tech companies, sorted A–Z. Skip the aggregators and apply for jobs straight at the source."
                canonical={`${SITE_URL}/career-pages`}
            />
            <Navbar />
            <div className="pt-16">
                <CareerPages careerpageData={data} />
            </div>
            <Footer />
            <ScrolltoTop />
        </>
    );
}

export default CareerPagesRoute;

export async function getStaticProps() {
    const data = toRenderableRows(companyData);

    if (data.length === 0) {
        return { notFound: true };
    }

    return {
        props: { data },
    };
}
