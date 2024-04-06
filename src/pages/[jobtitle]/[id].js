import React, { useEffect } from "react";
import Head from "next/head";

import Header from "@/components/common/Header/header";
import Jobdetails from "@/components/Jobdetails";
import { getAlljdData, getJobListData } from "@/core/apis/jobapicall";
import { Inter } from "@next/font/google";
import styles from "./jobdetail.module.scss";
import Meta from "@/core/meta";
import Footer from "@/components/common/Footer/Footer";
import { handleIntialPageLoad } from "@/core/handleInitialPageLoad";
import { firenbaseEventHandler } from "@/core/eventHandler";
import { getJobListing } from "@/Helpers/jobdetailshelper";
import ScrolltoTop from "@/components/common/ScrolltoTop";

import Sidebar from "@/components/Sidebar";
const interFont = Inter({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

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
            {data && (
                <div>
                    <Header />
                    <Meta jobTitle={data.title} description={data.jobdesc} logo={data.imagePath} />
                    <div className={styles.jobdetailContainer}>
                        <div className={interFont.className}>
                            <Jobdetails jobdata={data} />
                        </div>
                        <div className="desktopview">
                            <Sidebar/>
                        </div>
                    </div>
                    <Footer />
                    <ScrolltoTop/>
                </div>
            )}
        </div>
    );
};

export default JobdetailsPage;

export async function getStaticProps(context) {
    const apiResponse = await getJobListing([{id : context?.params?.id}]);
    return {
        props: {
            data: apiResponse,
        },
    };
}
export async function getStaticPaths() {
    const apiResponse = await getJobListing(null, 1, 30);
    const jobdata = apiResponse.data.filter((item) => item.jdpage === "true");
    const paths = jobdata.map((item) => {
        const titleforShare = item.title.replace(/[\s;]+/g, "-").toLowerCase();
        return {
            params: { jobtitle: titleforShare, id: item.id },
        };
    });

    return {
        paths,
        fallback: "blocking",
    };
}
