import React, { useState } from "react";
import Header from "@/components/common/Header/header";
import Footer from "@/components/common/Footer/Footer";
import CareerPages from "@/widgets/CareerePages";
import companyData from "./companycareerspage.json";
import ScrolltoTop from "@/components/common/ScrolltoTop";
import Head from "next/head";

function page({ data }) {
    return (
        <>
            <Head>
                <link rel="canonical" href="https://careersat.tech/career-pages" />
            </Head>
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
