import React, { useState } from "react";
import Header from "@/components/common/Header/header";
import Footer from "@/components/common/Footer/Footer";
import CareerPages from "@/widgets/CareerePages";
import companyData from "./companycareerspage.json";
import ScrolltoTop
 from "@/components/common/ScrolltoTop";
function page({ data }) {
    return (
        <>
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
