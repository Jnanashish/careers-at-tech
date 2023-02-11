exports.id = 819;
exports.ids = [819];
exports.modules = {

/***/ 100:
/***/ ((module) => {

// Exports
module.exports = {
	"headerContainer": "header_headerContainer__9UYlN",
	"header": "header_header__ODQvh"
};


/***/ }),

/***/ 819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ header)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./src/components/common/Header/header.module.scss
var header_module = __webpack_require__(100);
var header_module_default = /*#__PURE__*/__webpack_require__.n(header_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/static/Image/logo.svg
/* harmony default export */ const logo = ({"src":"/_next/static/media/logo.7476c55b.svg","height":30,"width":200});
;// CONCATENATED MODULE: ./src/components/common/Header/header.jsx





const Header = ()=>{
    const handleLogoClick = ()=>{};
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (header_module_default()).headerContainer,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: (header_module_default()).header,
            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                onClick: ()=>{
                    handleLogoClick();
                },
                className: (header_module_default()).logo,
                src: logo,
                alt: "careersat tech logo",
                width: 150,
                height: 22
            })
        })
    });
};
/* harmony default export */ const header = (Header);


/***/ })

};
;