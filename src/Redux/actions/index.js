import {
    ADD_DASLINK_DATA,
    ADD_DASBANNER_DATA,
    ADD_DAS_POPTYPE,
} from "../actionTypes/index";

export const storeDASLinkData = (data) => {
    return {
        type: ADD_DASLINK_DATA,
        payload: {
            data,
        },
    };
};

export const storeDASBannerData = (data) => {
    return {
        type: ADD_DASBANNER_DATA,
        payload: {
            data,
        },
    };
};

export const storeDASPopUpType = (data) => {
    return {
        type: ADD_DAS_POPTYPE,
        payload: {
            data,
        },
    };
};
