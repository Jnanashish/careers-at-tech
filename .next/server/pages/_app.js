(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 301:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Inter_826a92', '__Inter_Fallback_826a92'","fontStyle":"normal"},
	"className": "__className_826a92"
};


/***/ }),

/***/ 589:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fy": () => (/* binding */ ADD_DAS_POPTYPE),
/* harmony export */   "nM": () => (/* binding */ ADD_DASLINK_DATA),
/* harmony export */   "yH": () => (/* binding */ ADD_DASBANNER_DATA)
/* harmony export */ });
const ADD_DASLINK_DATA = "ADD_DASLINK_DATA";
const ADD_DASBANNER_DATA = "ADD_DASBANNER_DATA";
const ADD_DAS_POPTYPE = "ADD_DAS_POPTYPE";


/***/ }),

/***/ 260:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/@next/font/google/target.css?{"path":"src\\pages\\_app.js","import":"Inter","arguments":[{"weight":["300","400","500","600","700","800"],"subsets":["latin"]}],"variableName":"inter"}
var target_path_src_pages_app_js_import_Inter_arguments_weight_300_400_500_600_700_800_subsets_latin_variableName_inter_ = __webpack_require__(301);
var target_path_src_pages_app_js_import_Inter_arguments_weight_300_400_500_600_700_800_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(target_path_src_pages_app_js_import_Inter_arguments_weight_300_400_500_600_700_800_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(22);
;// CONCATENATED MODULE: external "redux-thunk"
const external_redux_thunk_namespaceObject = require("redux-thunk");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_namespaceObject);
;// CONCATENATED MODULE: external "redux-persist"
const external_redux_persist_namespaceObject = require("redux-persist");
;// CONCATENATED MODULE: external "@reduxjs/toolkit"
const toolkit_namespaceObject = require("@reduxjs/toolkit");
;// CONCATENATED MODULE: external "redux"
const external_redux_namespaceObject = require("redux");
;// CONCATENATED MODULE: external "redux-persist/lib/storage"
const storage_namespaceObject = require("redux-persist/lib/storage");
var storage_default = /*#__PURE__*/__webpack_require__.n(storage_namespaceObject);
;// CONCATENATED MODULE: ./src/Redux/service/reduxPersist.js


const persist = (persistConfig, reducer)=>(0,external_redux_persist_namespaceObject.persistReducer)({
        ...persistConfig,
        storage: (storage_default())
    }, reducer);

// EXTERNAL MODULE: ./src/Redux/actionTypes/index.js
var actionTypes = __webpack_require__(589);
;// CONCATENATED MODULE: ./src/Redux/reducers/rootReducers/dasReducers.js

const INITIAL_STATE = {
    dasLink: [],
    dasBanner: [],
    dasPoptype: []
};
const dasReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case actionTypes/* ADD_DASLINK_DATA */.nM:
            return {
                ...state,
                dasLink: action.payload.data
            };
        case actionTypes/* ADD_DASBANNER_DATA */.yH:
            return {
                ...state,
                dasBanner: action.payload.data
            };
        case actionTypes/* ADD_DAS_POPTYPE */.Fy:
            return {
                ...state,
                dasPoptype: action.payload.data
            };
        default:
            return state;
    }
};
/* harmony default export */ const dasReducers = (dasReducer);

;// CONCATENATED MODULE: ./src/Redux/reducers/index.js



const dasPersistConfig = {
    key: "dasStore"
};
/* harmony default export */ const reducers = ((0,external_redux_namespaceObject.combineReducers)({
    das: persist(dasPersistConfig, dasReducers)
}));

;// CONCATENATED MODULE: ./src/Redux/store.js




const store = (0,toolkit_namespaceObject.configureStore)({
    reducer: reducers,
    devTools: "production" != "production",
    middleware: [
        (external_redux_thunk_default())
    ]
});
const persistor = (0,external_redux_persist_namespaceObject.persistStore)(store);
const dispatch = store.dispatch;

// EXTERNAL MODULE: ./src/styles/globals.css
var globals = __webpack_require__(108);
;// CONCATENATED MODULE: ./src/pages/_app.js






const App = (props)=>{
    const { Component , pageProps  } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: store,
        children: /*#__PURE__*/ jsx_runtime_.jsx("main", {
            className: (target_path_src_pages_app_js_import_Inter_arguments_weight_300_400_500_600_700_800_subsets_latin_variableName_inter_default()).className,
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
};
/* harmony default export */ const _app = (App);


/***/ }),

/***/ 108:
/***/ (() => {



/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 22:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(260));
module.exports = __webpack_exports__;

})();