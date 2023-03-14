import React from "react";
import Head from "next/head";

import Header from "@/components/common/Header/header";
import Jobdetails from "@/components/Jobdetails";
import { getAlljdData, getJobListData } from "@/core/apis/jobapicall";
import { IBM_Plex_Sans } from "@next/font/google";
import styles from "./jobdetail.module.scss";
import Meta from "@/core/meta";
import Footer from "@/components/common/Footer/Footer";

const ibmPlexSans = IBM_Plex_Sans({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

const JobdetailsPage = ({ data }) => {
    return (
        <div>
            <Head>
                <link rel="canonical" href="https://careersat.tech/" />
            </Head>
            {data && (
                <div>
                    <Header />
                    <Meta jobTitle={data.title} description={data.title} logo={data.imagePath} />
                    <div className={styles.jobdetailContainer}>
                        <div className={ibmPlexSans.className}>
                            <Jobdetails jobdata={data} />
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default JobdetailsPage;

export async function getStaticProps(context) {
    const apiResponse = await getAlljdData(context?.params?.id);
    return {
        props: {
            data: apiResponse,
        },
        revalidate: 10800,
    };
}
export async function getStaticPaths() {
    const apiResponse = await getJobListData(1, 30);
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
