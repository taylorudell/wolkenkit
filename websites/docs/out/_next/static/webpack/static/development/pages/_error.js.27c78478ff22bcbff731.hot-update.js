webpackHotUpdate("static/development/pages/_error.js",{

/***/ "../../node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js":
false,

/***/ "../../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js":
false,

/***/ "../../node_modules/@babel/runtime-corejs2/helpers/createClass.js":
false,

/***/ "../../node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js":
false,

/***/ "../../node_modules/@babel/runtime-corejs2/helpers/inherits.js":
false,

/***/ "../../node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js":
false,

/***/ "../../node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js":
false,

/***/ "../../node_modules/@babel/runtime-corejs2/helpers/typeof.js":
false,

/***/ "../../node_modules/next-server/head.js":
false,

/***/ "../../node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=%2FUsers%2Fmatthiaswagler%2FDev%2Ftnw%2Fwolkenkit%2Fwebsites%2Fdocs%2Fpages%2F_error.jsx!./":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/matthiaswagler/Dev/tnw/wolkenkit/node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=%2FUsers%2Fmatthiaswagler%2FDev%2Ftnw%2Fwolkenkit%2Fwebsites%2Fdocs%2Fpages%2F_error.jsx ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/_error", function() {
      var page = __webpack_require__(/*! ./pages/_error.jsx */ "./pages/_error.jsx")
      if(true) {
        module.hot.accept(/*! ./pages/_error.jsx */ "./pages/_error.jsx", function() {
          if(!next.router.components["/_error"]) return
          var updatedPage = __webpack_require__(/*! ./pages/_error.jsx */ "./pages/_error.jsx")
          next.router.update("/_error", updatedPage.default || updatedPage)
        })
      }
      return { page: page.default || page }
    }]);
  

/***/ }),

/***/ "../../node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=next%2Fdist%2Fpages%2F_error!./":
false,

/***/ "../../node_modules/next/dist/pages/_error.js":
false,

/***/ "./pages/_error.jsx":
/*!**************************!*\
  !*** ./pages/_error.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Head_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Head.jsx */ "./components/Head.jsx");
/* harmony import */ var _components_Head_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_Head_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var thenativeweb_ux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! thenativeweb-ux */ "../../node_modules/thenativeweb-ux/dist/index.js");
/* harmony import */ var thenativeweb_ux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(thenativeweb_ux__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/matthiaswagler/Dev/tnw/wolkenkit/websites/docs/pages/_error.jsx";




var ErrorPage = function ErrorPage(_ref) {
  var statusCode = _ref.statusCode;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Head_jsx__WEBPACK_IMPORTED_MODULE_0___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, "404")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(thenativeweb_ux__WEBPACK_IMPORTED_MODULE_2__["View"], {
    orientation: "horizontal",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(thenativeweb_ux__WEBPACK_IMPORTED_MODULE_2__["View"], {
    orientation: "vertical",
    alignItems: "center",
    justifyContent: "center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(thenativeweb_ux__WEBPACK_IMPORTED_MODULE_2__["Headline"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, statusCode ? "A ".concat(statusCode, " error occurred on our server.") : 'An error occurred.'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, "Unfortunately, something went wrong while loading this page. Please ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "mailto:hello@thenativeweb.io",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "contact us"), " if this problem persists."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, "Meanwhile, you may ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "https://twitter.com/thenativeweb",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, "follow us on Twitter"), " or visit the ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "https://www.wolkenkit.io/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "wolkenkit website"), ".")))));
};

ErrorPage.getInitialProps = function (_ref2) {
  var res = _ref2.res,
      err = _ref2.err;

  if (res) {
    var statusCode = res.statusCode;
    return {
      statusCode: statusCode
    };
  }

  if (err) {
    var _statusCode = err.statusCode;
    return {
      statusCode: _statusCode
    };
  }

  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (ErrorPage);

/***/ }),

/***/ 1:
/*!***************************************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2F_error&absolutePagePath=%2FUsers%2Fmatthiaswagler%2FDev%2Ftnw%2Fwolkenkit%2Fwebsites%2Fdocs%2Fpages%2F_error.jsx ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2F_error&absolutePagePath=%2FUsers%2Fmatthiaswagler%2FDev%2Ftnw%2Fwolkenkit%2Fwebsites%2Fdocs%2Fpages%2F_error.jsx! */"../../node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=%2FUsers%2Fmatthiaswagler%2FDev%2Ftnw%2Fwolkenkit%2Fwebsites%2Fdocs%2Fpages%2F_error.jsx!./");


/***/ })

})
//# sourceMappingURL=_error.js.27c78478ff22bcbff731.hot-update.js.map