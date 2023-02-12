import React, { useEffect } from "react";
import JobList from "@/components/JobList";
import Header from "@/components/common/Header/header";
import { getJobListData } from "@/core/apis/jobapicall";

import { useDispatch } from "react-redux";

// import methods
import { handleRequestGET } from "@/core/apis/dasapicall";
import { apiEndPoint } from "@/core/apis/apiEndpoints";
import { storeDASLinkData, storeDASBannerData, storeDASPopUpType } from "@/Redux/actions";

const Jobs = (props) => {
    const { jobdata } = props;
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
        <div>
            <Header />
            <JobList jobdata={jobdata} />
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
