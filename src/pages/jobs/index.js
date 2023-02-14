import React, { useEffect } from "react";
import JobList from "@/components/JobList";
import Header from "@/components/common/Header/header";
import { getJobListData } from "@/core/apis/jobapicall";
import Head from "next/head";

import { useDispatch } from "react-redux";

// import methods
import { handleRequestGET } from "@/core/apis/dasapicall";
import { apiEndPoint } from "@/core/apis/apiEndpoints";
import { storeDASLinkData, storeDASBannerData, storeDASPopUpType } from "@/Redux/actions";
import Footer from "@/components/common/Footer/Footer";

const Jobs = (props) => {
    const { jobdata } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        getDASLinkData();
        getDASBannerData();
        getDASPoptypeData();
        window.scrollTo(0, 1);
    }, []);

    const getDASLinkData = () => {
        handleRequestGET(apiEndPoint.dasLink).then((res) => {
            if (!res) {
                dispatch(storeDASLinkData([]));
            } else {
                dispatch(storeDASLinkData(res));
            }
        });
    };

    const getDASBannerData = () => {
        handleRequestGET(apiEndPoint.dasBanner).then((res) => {
            if (!res) {
                dispatch(storeDASBannerData([]));
            } else {
                dispatch(storeDASBannerData(res));
            }
        });
    };

    const getDASPoptypeData = () => {
        handleRequestGET(apiEndPoint.dasPopupType).then((res) => {
            if (!res) {
                dispatch(storeDASPopUpType([]));
            } else {
                dispatch(storeDASPopUpType(res));
            }
        });
    };

    return (
        <div>
            <Head>
                <title>Careers at Tech</title>
                <meta
                    name="description"
                    content="One place solution to get regular Internship and Job Updates."
                />
            </Head>
            <Header />
            <JobList jobdata={jobdata} />
            <Footer />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const apiResponse = await getJobListData(1);
    return {
        props: {
            jobdata: apiResponse.data,
        },
    };
};

export default Jobs;
