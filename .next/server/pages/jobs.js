(() => {
var exports = {};
exports.id = 142;
exports.ids = [142];
exports.modules = {

/***/ 662:
/***/ ((module) => {

// Exports
module.exports = {
	"jobCardContainer": "linkmid_jobCardContainer__Z9vgN",
	"modal_con": "linkmid_modal_con__EiUar",
	"modal_items": "linkmid_modal_items__QyGqp",
	"close_btn": "linkmid_close_btn__npA2l",
	"cross_icon": "linkmid_cross_icon__7zuUz",
	"bannerda_con": "linkmid_bannerda_con__oPGn7",
	"ad_text": "linkmid_ad_text__8qcyh"
};


/***/ }),

/***/ 860:
/***/ ((module) => {

// Exports
module.exports = {
	"jobCardContainer": "jobcard_jobCardContainer___Jnd2",
	"mainSection": "jobcard_mainSection__evZb0",
	"companyLogoContainer": "jobcard_companyLogoContainer__6Cv6M",
	"logotext": "jobcard_logotext__veSzi",
	"companyLogo": "jobcard_companyLogo__ok46l",
	"jobtitle": "jobcard_jobtitle__ZaGE0",
	"jobdetails": "jobcard_jobdetails__via_m",
	"jobdetailsItem": "jobcard_jobdetailsItem__j30nk",
	"chipContainer": "jobcard_chipContainer__AtMpI",
	"chip": "jobcard_chip__Ll9Gp",
	"chipIcon": "jobcard_chipIcon__fBNvf",
	"footerSection": "jobcard_footerSection__hxQob"
};


/***/ }),

/***/ 304:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _linkmid_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(662);
/* harmony import */ var _linkmid_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_linkmid_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Jobcard_Jobcard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(127);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Jobcard_Jobcard__WEBPACK_IMPORTED_MODULE_2__]);
_Jobcard_Jobcard__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


// import css

// import internal components and methods

const Linkmid = (props)=>{
    const { id , link , jdpage  } = props.data;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_linkmid_module_scss__WEBPACK_IMPORTED_MODULE_3___default().jobCardContainer),
            children: jdpage === "false" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                target: "_blank",
                rel: "noopener noreferrer",
                href: link,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Jobcard_Jobcard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    data: props.data
                })
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Linkmid);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 622:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Linkmid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(304);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Linkmid__WEBPACK_IMPORTED_MODULE_2__]);
_Linkmid__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


// import components

const JobList = (jobdata)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: jobdata && jobdata.jobdata.map((data)=>{
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Linkmid__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    data: data
                })
            }, data.id);
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JobList);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 127:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(860);
/* harmony import */ var _jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(563);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__]);
_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const Jobcard = (props)=>{
    const { title , degree , batch , imagePath , jobtype , location , experience , jdpage , createdAt , totalclick  } = props.data;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().jobCardContainer),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().mainSection),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().companyLogoContainer),
                        children: imagePath === "none" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().logotext),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: title[0]
                            })
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                            className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().companyLogo),
                            src: imagePath,
                            alt: "Company logo",
                            height: 44,
                            width: 44
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().jobtitle),
                        children: title
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().jobdetails),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().jobdetailsItem),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                        children: "Degree :"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: degree
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().jobdetailsItem),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                        children: "Batch :"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: batch
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().chipContainer),
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        jobtype !== "N" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            style: {
                                                backgroundColor: "#e1ebff",
                                                color: "#1d4ed8"
                                            },
                                            className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().chip),
                                            children: jobtype
                                        }),
                                        location !== "N" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            style: {
                                                backgroundColor: "#def7ec",
                                                color: "#046C4E"
                                            },
                                            className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().chip),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                                                    className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().chipIcon),
                                                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faLocationDot
                                                }),
                                                location
                                            ]
                                        }),
                                        experience !== "N" && experience.length < 12 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            style: {
                                                backgroundColor: "#F0ECFF",
                                                color: "#6B46C1"
                                            },
                                            className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().chip),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                                                    className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().chipIcon),
                                                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faClock
                                                }),
                                                experience
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().footerSection),
                children: [
                    totalclick && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                                className: (_jobcard_module_scss__WEBPACK_IMPORTED_MODULE_5___default().chipIcon),
                                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faEye
                            }),
                            totalclick + 200,
                            " impressions"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: createdAt && createdAt !== "null" ? createdAt.slice(0, 10).split("-").reverse().join("-") : ""
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Jobcard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 477:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ax": () => (/* binding */ getJobListData)
/* harmony export */ });
/* unused harmony exports getAlljdData, getcompanynamedata, getjdBatchData, getjdDegreeData, getjdJobtypeData, gettypeofad, countClickinJd */
/* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(781);

// get list of jobs available from database
const getJobListData = (pagenum)=>{
    return fetch(`${_backend__WEBPACK_IMPORTED_MODULE_0__/* .API */ .b}/jd/get?page=${pagenum}&size=10`, {
        method: "GET"
    }).then((res)=>{
        return res.json();
    }).catch((err)=>console.log(err));
};
const getAlljdData = (id)=>{
    return fetch(`${API}/jd/get/${id}`, {
        method: "GET"
    }).then((res)=>{
        return res.json();
    }).catch((err)=>console.log(err));
};
// get job dara based on batch
const getcompanynamedata = (companyname)=>{
    return fetch(`${API}/jd/get/companyname?companyname=${companyname}`, {
        method: "GET"
    }).then((res)=>{
        return res.json();
    }).catch((err)=>console.log(err));
};
// get job data based on batch
const getjdBatchData = (year)=>{
    return fetch(`${API}/jd/get/batch?year=${year}`, {
        method: "GET"
    }).then((res)=>{
        return res.json();
    }).catch((err)=>console.log(err));
};
// get job data based on Degree
const getjdDegreeData = (deg)=>{
    return fetch(`${API}/jd/get/degree?degree=${deg}`, {
        method: "GET"
    }).then((res)=>{
        return res.json();
    }).catch((err)=>console.log(err));
};
// get job data based on Role
const getjdJobtypeData = (role)=>{
    return fetch(`${API}/jd/get/jobtype?jobtype=${role}`, {
        method: "GET"
    }).then((res)=>{
        return res.json();
    }).catch((err)=>console.log(err));
};
// get type of ad need to show
const gettypeofad = (role)=>{
    return fetch(`${API}/showadpop/get`, {
        method: "GET"
    }).then((res)=>{
        return res.json();
    }).catch((err)=>console.log(err));
};
const countClickinJd = (id)=>{
    fetch(`${API}/jd/update/count/${id}`, {
        method: "PATCH"
    });
};


/***/ }),

/***/ 781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ API)
/* harmony export */ });
const API = "https://plankton-app-oedow.ondigitalocean.app/api";


/***/ }),

/***/ 967:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_JobList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(622);
/* harmony import */ var _components_common_Header_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(819);
/* harmony import */ var _core_apis_jobapicall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(477);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_JobList__WEBPACK_IMPORTED_MODULE_2__]);
_components_JobList__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const Jobs = (props)=>{
    const { jobdata  } = props;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_Header_header__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_JobList__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                jobdata: jobdata
            })
        ]
    });
};
const getServerSideProps = async (context)=>{
    const apiResponse = await (0,_core_apis_jobapicall__WEBPACK_IMPORTED_MODULE_4__/* .getJobListData */ .ax)(1);
    return {
        props: {
            jobdata: apiResponse.data
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Jobs);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 197:
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ 918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 563:
/***/ ((module) => {

"use strict";
module.exports = import("@fortawesome/free-solid-svg-icons");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [121,675,819], () => (__webpack_exec__(967)));
module.exports = __webpack_exports__;

})();