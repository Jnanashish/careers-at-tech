import React, { useEffect } from "react";
import Head from "next/head";
import HomePage from "./home";
import { useDispatch } from "react-redux";

// import methods
import { handleRequestGET } from "@/core/apis/dasapicall";
import { apiEndPoint } from "@/core/apis/apiEndpoints";
import { storeDASLinkData, storeDASBannerData, storeDASPopUpType } from "@/Redux/actions";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getDASLinkData();
        getDASBannerData();
        getDASPoptypeData();
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
        <>
            <Head>
                <title>Careers at Tech</title>
                <meta name="description" content="One place solution to get regular Internship and Job Updates." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage />
        </>
    );
};

export default Home;
