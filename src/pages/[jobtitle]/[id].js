import React from "react";
import Head from "next/head";
import Header from "@/components/common/Header/header";
import Jobdetails from "@/components/Jobdetails";
import { getAlljdData } from "@/core/apis/jobapicall";
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
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5689754827429199"
                    crossorigin="anonymous"></script>
            </Head>
            {data && (
                <div>
                    <Header />
                    <Meta jobTitle={data.title} logo={data.imagePath} />
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

export const getServerSideProps = async (context) => {
    const apiResponse = await getAlljdData(context?.query.id);

    return {
        props: {
            data: apiResponse,
        },
    };
};

export default JobdetailsPage;
