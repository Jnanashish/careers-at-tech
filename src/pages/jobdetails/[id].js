import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/common/Header/header";
import Jobdetails from "@/components/Jobdetails";
import { getAlljdData } from "@/core/apis/jobapicall";
import { IBM_Plex_Sans } from "@next/font/google";
import styles from "./jobdetail.module.scss";

const ibmPlexSans = IBM_Plex_Sans({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

const JobdetailsPage = ({ data }) => {
    const router = useRouter();
    const jobId = router.query.id;

    return (
        <>
            <Header />
            <div className={styles.jobdetailContainer}>
                <div className={ibmPlexSans.className}>
                    <Jobdetails jobdata={data} />
                </div>
            </div>
        </>
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
