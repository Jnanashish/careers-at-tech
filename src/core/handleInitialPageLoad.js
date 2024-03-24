import { v4 as uuidv4 } from "uuid";

import { handleRequestGET } from "@/core/apis/dasapicall";
import { apiEndPoint } from "@/core/apis/apiEndpoints";
import { storeDASLinkData, storeDASBannerData, storeDASPopUpType } from "@/Redux/actions";

const checklocalStorage = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        localStorage.setItem("userId", uuidv4());
    }
};

// make api calls for available das on intial load
const callDasApiCalls = () => {
    getDASLinkData();
    getDASBannerData();
    getDASPoptypeData();
};

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

export const handleIntialPageLoad = () => {
    checklocalStorage();
};


export const getJobListing = (params) => {

}