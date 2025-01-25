import React, { useEffect } from "react";
import styles from "./index.module.scss";

// import components
import Header from "@/components/common/Header/header";
import Jobdetails from "@/components/Jobdetails";
import ScrolltoTop from "@/components/common/ScrolltoTop";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/common/Footer/Footer";

import JobDescriptionMeta from "@/core/SEO/JobDescriptionMeta";
import { handleIntialPageLoad } from "@/core/handleInitialPageLoad";
import { getJobListing } from "@/Helpers/jobdetailshelper";

import { generateSlugFromrole } from "@/Helpers/jobdetailshelper";

export async function getStaticPaths() {
    // create static paths from with intial 30 pages
    const res = await getJobListing(null, 1, 30);

    const jobdata = res?.data.filter((item) => item?.jdpage === "true");

    const staticPaths = jobdata?.map((item) => {
        const titleforShare = generateSlugFromrole(item?.title);
        return {
            params: {
                jobtitle: titleforShare,
                id: item?.id,
            },
        };
    });

    return {
        paths: staticPaths,
        fallback: true, // TODO: Need to show a loader during loading of jd
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
        revalidate: 600, // In seconds (10 min)
    };
}

const JobdetailsPage = ({ data }) => {
    useEffect(() => {
        handleIntialPageLoad();
    }, []);

    return (
        <div>
            <>
                <Header />
                <JobDescriptionMeta data={data} />
                <div className={styles.jobdetailpage}>
                    <div>
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
