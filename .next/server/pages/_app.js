(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8301:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Inter_890fff', '__Inter_Fallback_890fff'","fontStyle":"normal"},
	"className": "__className_890fff"
};


/***/ }),

/***/ 4399:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Open_Sans_c98d3b', '__Open_Sans_Fallback_c98d3b'","fontStyle":"normal"},
	"className": "__className_c98d3b"
};


/***/ }),

/***/ 3589:
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

/***/ 5128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "h": () => (/* binding */ store)
});

// UNUSED EXPORTS: dispatch, persistor

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
var actionTypes = __webpack_require__(3589);
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


/***/ }),

/***/ 2730:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _next_font_google_target_css_path_src_pages_app_js_import_Inter_arguments_weight_300_400_500_600_700_800_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8301);
/* harmony import */ var _next_font_google_target_css_path_src_pages_app_js_import_Inter_arguments_weight_300_400_500_600_700_800_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_next_font_google_target_css_path_src_pages_app_js_import_Inter_arguments_weight_300_400_500_600_700_800_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _next_font_google_target_css_path_src_pages_app_js_import_Open_Sans_arguments_weight_300_400_500_600_700_800_variableName_openSans___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4399);
/* harmony import */ var _next_font_google_target_css_path_src_pages_app_js_import_Open_Sans_arguments_weight_300_400_500_600_700_800_variableName_openSans___WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_next_font_google_target_css_path_src_pages_app_js_import_Open_Sans_arguments_weight_300_400_500_600_700_800_variableName_openSans___WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(108);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _vercel_analytics_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9752);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Redux_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5128);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_vercel_analytics_react__WEBPACK_IMPORTED_MODULE_3__]);
_vercel_analytics_react__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








const App = (props)=>{
    const { Component , pageProps  } = props;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_redux__WEBPACK_IMPORTED_MODULE_4__.Provider, {
        store: _Redux_store__WEBPACK_IMPORTED_MODULE_5__/* .store */ .h,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
            className: `${(_next_font_google_target_css_path_src_pages_app_js_import_Inter_arguments_weight_300_400_500_600_700_800_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_6___default().className)} ${(_next_font_google_target_css_path_src_pages_app_js_import_Open_Sans_arguments_weight_300_400_500_600_700_800_variableName_openSans___WEBPACK_IMPORTED_MODULE_7___default().className)}`,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_vercel_analytics_react__WEBPACK_IMPORTED_MODULE_3__.Analytics, {})
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 108:
/***/ (() => {



/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9752:
/***/ ((module) => {

"use strict";
module.exports = import("@vercel/analytics/react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2730));
module.exports = __webpack_exports__;

})();