import {
    ADD_DASLINK_DATA,
    ADD_DASBANNER_DATA,
    ADD_DAS_POPTYPE,
} from "../../actionTypes/index";

const INITIAL_STATE = {
    dasLink: [],
    dasBanner: [],
    dasPoptype: [],
};

const dasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_DASLINK_DATA:
            return {
                ...state,
                dasLink: action.payload.data,
            };

        case ADD_DASBANNER_DATA:
            return {
                ...state,
                dasBanner: action.payload.data,
            };

        case ADD_DAS_POPTYPE:
            return {
                ...state,
                dasPoptype: action.payload.data,
            };
        default:
            return state;
    }
};

export default dasReducer;
