/*!
 * Flex.io Javascript SDK v1.4.1 (https://github.com/flexiodata/flexio-sdk-js)
 * (c) 2017 Gold Prairie LLC
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["flexio"] = factory();
	else
		root["flexio"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flexio = undefined;

var _flexio = __webpack_require__(1);

var _flexio2 = _interopRequireDefault(_flexio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined') {
  window.Flexio = _flexio2.default;
}

exports.Flexio = _flexio2.default;
exports.default = _flexio2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _version = __webpack_require__(2).version;

exports.default = {
  version: function version() {
    return 'Flex.io Javascript SDK v' + _version;
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"flexio-sdk-js","version":"1.4.1","description":"Javascript SDK for managing Flex.io resources and services","author":"David Z. Williams <dave@flex.io>","main":"dist/flexio.js","scripts":{"build:debug":"cross-env NODE_ENV=debug webpack --config build/webpack.dist.js","build:release":"cross-env NODE_ENV=production webpack --config build/webpack.dist.js","build":"npm run build:debug && npm run build:release","test":"echo \"Error: no test specified\" && exit 1"},"repository":{"type":"git","url":"git+https://github.com/flexiodata/flexio-sdk-js.git"},"keywords":[],"license":"Apache-2.0","bugs":{"url":"https://github.com/flexiodata/flexio-sdk-js/issues"},"homepage":"https://github.com/flexiodata/flexio-sdk-js/","dependencies":{"form-data":">=2.2.0"},"devDependencies":{"babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-plugin-transform-es2015-destructuring":"^6.23.0","babel-plugin-transform-es2015-parameters":"^6.24.1","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-plugin-transform-runtime":"^6.23.0","babel-preset-env":"^1.6.0","babel-preset-es2015":"^6.24.1","babel-preset-stage-2":"^6.24.1","cross-env":"^5.0.5","deep-assign":"^2.0.0","webpack":"^3.5.5"}}

/***/ })
/******/ ]);
});