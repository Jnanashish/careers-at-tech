import { combineReducers } from "redux";
import { persist } from "../service/reduxPersist";

import dasReducer from "./rootReducers/dasReducers";

const dasPersistConfig = {
    key: "dasStore",
};

export default combineReducers({
    das: persist(dasPersistConfig, dasReducer),
});
