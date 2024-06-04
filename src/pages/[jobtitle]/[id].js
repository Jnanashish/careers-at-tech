import React, { useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "./jobdetail.module.scss";

// import components
import Header from "@/components/common/Header/header";
import Jobdetails from "@/components/Jobdetails";
import ScrolltoTop from "@/components/common/ScrolltoTop";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/common/Footer/Footer";

import Meta from "@/core/SEO/meta";
import { handleIntialPageLoad } from "@/core/handleInitialPageLoad";
import { firenbaseEventHandler } from "@/core/eventHandler";
import { getJobListing } from "@/Helpers/jobdetailshelper";

const interFont = Inter({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export async function getStaticPaths() {
    // create static paths from with top 30 pages
    const res = await getJobListing(null, 1, 30);

    const jobdata = res?.data.filter((item) => item?.jdpage === "true");

    const paths = jobdata.map((item) => {
        // TODO: Write a common function for page title
        const titleforShare = item?.title?.replace(/[\s;]+/g, "-")?.toLowerCase();
        return {
            params: { jobtitle: titleforShare, id: item?.id },
        };
    });

    return {
        paths: [],
        fallback: "blocking",
    };
}

// fetch the job details based on the query param
export async function getStaticProps(context) {
    const res = await getJobListing([{ id: context?.params?.id }]);

    // if job not found show 404 page
    // TODO: Built custom 404 page UI
    if (!res && !res?.data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data: res?.data,
        },
    };
}

const JobdetailsPage = ({ data }) => {
    useEffect(() => {
        handleIntialPageLoad();
        firenbaseEventHandler("jd_page_loaded", {
            job_id: data._id,
            jd_page_title: data.title,
        });
    }, []);

    return (
        <div>
            <Head>
                <link rel="canonical" href="https://careersat.tech/" />
            </Head>
            <>
                <Header />
                <Meta jobTitle={data?.title} description={data?.jobdesc} logo={data?.imagePath} />
                <div className={styles.jobdetailContainer}>
                    <div className={interFont.className}>
                        <Jobdetails jobdata={data} />
                    </div>
                    <div className="desktopview">
                        <Sidebar />
                    </div>
                </div>
                <Footer />
                <ScrolltoTop />
            </>
        </div>
    );
};

export default JobdetailsPage;
