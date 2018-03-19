/*!
 * Flex.io Javascript SDK v1.20.2 (https://github.com/flexiodata/flexio-sdk-js)
 * (c) 2018 Gold Prairie LLC
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Flexio"] = factory();
	else
		root["Flexio"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getprop(object, path, defaultVal) {
  var _path = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, '.$2').split('.').filter(function (i) {
    return i.length;
  });
  if (!_path.length) {
    return object === undefined ? defaultVal : object;
  }
  return getprop(object[_path.shift()], _path, defaultVal);
}

function assign(target, options) {
  var args = Array.from(arguments);
  args.shift();
  for (var i = 0; i < args.length; ++i) {
    for (var prop in args[i]) {
      if (args[i].hasOwnProperty(prop)) {
        target[prop] = args[i][prop];
      }
    }
  }
  return target;
}

function pick(src, want_array) {
  if (src == null || !Array.isArray(want_array)) {
    return {};
  }
  var ret = {},
      prop;
  for (var i = 0; i < want_array.length; ++i) {
    prop = want_array[i];
    if (src.hasOwnProperty(prop)) {
      ret[prop] = src[prop];
    }
  }
  return ret;
}

module.exports = {
  assign: assign,
  pick: pick,
  get: getprop,
  isString: function isString(value) {
    return typeof value === 'string' || value instanceof String;
  },
  isNumber: function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  isNil: function isNil(value) {
    return value == null;
  },
  defaultTo: function defaultTo(value, default_value) {
    return value == null || value !== value ? default_value : value;
  },
  last: function last(array) {
    var length = array == null ? 0 : array.length;return length ? array[length - 1] : undefined;
  },
  isFunction: function isFunction(value) {
    return value instanceof Function;
  },
  isPlainObject: __webpack_require__(13)
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var util = {};
module.exports = util;

util.isPipeObject = function (obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.hasOwnProperty('pipe') && _typeof(obj.pipe) === 'object';
};

util.isPipeJson = function (obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.hasOwnProperty('op') && obj.hasOwnProperty('params');
};

util.isNodeJs = function () {
  return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
};

util.arrayBufferToString = function (buf) {

  if (this.isNodeJs()) {
    if (buf instanceof Buffer) {
      return buf.toString('utf-8');
    } else {
      return Buffer.from(buf).toString('utf-8');
    }
  } else {
    if ("TextDecoder" in window) {
      return new TextDecoder('utf-8').decode(buf);
    } else {
      var uint8arr = new Uint8Array(buf);
      var utf8str = '';
      var i,
          len = uint8arr.length;
      for (i = 0; i < len; ++i) {
        utf8str += String.fromCharCode(uint8arr[i]);
      }
      return decodeURIComponent(escape(utf8str));
    }
  }
};

util.callbackAdapter = function (err, response, resolve, reject, callback) {
  if (typeof callback == 'function') {
    callback(err, response);
  } else {
    if (err) {
      reject(err);
    } else {
      resolve(response);
    }
  }
};

module.exports.getUtilObject = function (Flexio) {

  return new function () {

    for (var method in util) {
      if (util.hasOwnProperty(method)) {
        this[method] = util[method];
      }
    }

    this.debug = function (msg) {
      var cfg = Flexio.getConfig();
      if (cfg.debug) {
        var msg = 'flexio-sdk-js: ' + msg;

        console.log(msg);
      }
      return this;
    };
  }();
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  TASK_OP_CALC: 'calc',
  TASK_OP_COMMENT: 'comment',
  TASK_OP_CONVERT: 'convert',
  TASK_OP_COPY: 'copy',
  TASK_OP_CREATE: 'create',
  TASK_OP_CUSTOM: 'custom',
  TASK_OP_DISTINCT: 'distinct',
  TASK_OP_DUMP: 'dump',
  TASK_OP_DUPLICATE: 'duplicate',
  TASK_OP_ECHO: 'echo',
  TASK_OP_EMAIL_SEND: 'email',
  TASK_OP_EXECUTE: 'execute',
  TASK_OP_FIND_REPLACE: 'replace',
  TASK_OP_FILTER: 'filter',
  TASK_OP_FOREACH: 'foreach',
  TASK_OP_GROUP: 'group',
  TASK_OP_INSERT: 'insert',
  TASK_OP_LIMIT: 'limit',
  TASK_OP_LIST: 'list',
  TASK_OP_MERGE: 'merge',
  TASK_OP_MKDIR: 'mkdir',
  TASK_OP_NOP: 'nop',
  TASK_OP_PROMPT: 'prompt',
  TASK_OP_R: 'r',
  TASK_OP_READ: 'read',
  TASK_OP_RENAME: 'rename',
  TASK_OP_RENDER: 'render',
  TASK_OP_REQUEST: 'request',
  TASK_OP_SEARCH: 'search',
  TASK_OP_SELECT: 'select',
  TASK_OP_SEQUENCE: 'sequence',
  TASK_OP_SET: 'set',
  TASK_OP_SLEEP: 'sleep',
  TASK_OP_SORT: 'sort',
  TASK_OP_TRANSFORM: 'transform',
  TASK_OP_WRITE: 'write'
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(6);
var isBuffer = __webpack_require__(16);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var normalizeHeaderName = __webpack_require__(18);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(7);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(7);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var settle = __webpack_require__(19);
var buildURL = __webpack_require__(21);
var parseHeaders = __webpack_require__(22);
var isURLSameOrigin = __webpack_require__(23);
var createError = __webpack_require__(8);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(24);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(25);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(20);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var Flexio = __webpack_require__(12);

exports.default = Flexio;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _ = __webpack_require__(0);
var axios = __webpack_require__(14);
var task = __webpack_require__(33);

var base_url = 'https://www.flex.io/api/v1';

var cfg = {
  token: '',
  baseUrl: 'https://www.flex.io/api/v1',
  insecure: false,
  debug: false
};

var Flexio = {
  version: __webpack_require__(58).version,

  _init: function _init() {
    this.connections = __webpack_require__(59).getConnectionsObject(this);
    this.pipes = __webpack_require__(60).getPipesObject(this);
    this.util = __webpack_require__(1).getUtilObject(this);
    this._http = null;

    var getPipeConstructor = __webpack_require__(61).getPipeConstructor;
    this.pipe = getPipeConstructor(this);

    var getConnectionConstructor = __webpack_require__(62).getConnectionConstructor;
    this.connection = getConnectionConstructor(this);
  },
  setup: function setup(token, params) {
    cfg = _.assign(cfg, { token: token }, params);
    this._http = null;
    this._createHttp();
    return this;
  },
  getConfig: function getConfig() {
    return _.assign({}, cfg);
  },
  http: function http() {
    if (!this._http) this._createHttp();

    return this._http;
  },


  task: task,

  _createHttp: function _createHttp() {
    var axios_opts = {
      baseURL: cfg.baseUrl,
      headers: { 'Authorization': 'Bearer ' + cfg.token }
    };

    if (cfg.insecure === true) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    this._http = axios.create(axios_opts);
  }
};

Flexio._init();

module.exports = Flexio;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var bind = __webpack_require__(6);
var Axios = __webpack_require__(17);
var defaults = __webpack_require__(5);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(10);
axios.CancelToken = __webpack_require__(31);
axios.isCancel = __webpack_require__(9);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(32);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(5);
var utils = __webpack_require__(3);
var InterceptorManager = __webpack_require__(26);
var dispatchRequest = __webpack_require__(27);
var isAbsoluteURL = __webpack_require__(29);
var combineURLs = __webpack_require__(30);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(8);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var transformData = __webpack_require__(28);
var isCancel = __webpack_require__(9);
var defaults = __webpack_require__(5);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(10);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var taskOps = __webpack_require__(2);

var createFn = __webpack_require__(34);
var convertFn = __webpack_require__(35);
var copyFn = __webpack_require__(36);
var dumpFn = __webpack_require__(37);
var echoFn = __webpack_require__(38);
var emailFn = __webpack_require__(39);
var executeFn = __webpack_require__(40);
var filterFn = __webpack_require__(41);
var foreachFn = __webpack_require__(42);
var insertFn = __webpack_require__(43);
var limitFn = __webpack_require__(44);
var mergeFn = __webpack_require__(45);
var mkdirFn = __webpack_require__(46);
var listFn = __webpack_require__(47);
var readFn = __webpack_require__(48);
var renderFn = __webpack_require__(49);
var requestFn = __webpack_require__(50);
var selectFn = __webpack_require__(51);
var sequenceFn = __webpack_require__(52);
var setFn = __webpack_require__(53);
var sleepFn = __webpack_require__(54);
var taskFn = __webpack_require__(55);
var transformFn = __webpack_require__(56);
var writeFn = __webpack_require__(57);

var toCode = function toCode(json, Flexio) {
  var op = _.get(json, 'op', '');

  switch (op) {
    default:
      return taskFn.toCode(json);

    case taskOps.TASK_OP_CREATE:
      return createFn.toCode(json, Flexio);
    case taskOps.TASK_OP_CONVERT:
      return convertFn.toCode(json, Flexio);
    case taskOps.TASK_OP_COPY:
      return copyFn.toCode(json, Flexio);
    case taskOps.TASK_OP_DUMP:
      return dumpFn.toCode(json, Flexio);
    case taskOps.TASK_OP_ECHO:
      return echoFn.toCode(json, Flexio);
    case taskOps.TASK_OP_EMAIL_SEND:
      return emailFn.toCode(json, Flexio);
    case taskOps.TASK_OP_EXECUTE:
      return executeFn.toCode(json, Flexio);
    case taskOps.TASK_OP_FILTER:
      return filterFn.toCode(json, Flexio);
    case taskOps.TASK_OP_FOREACH:
      return foreachFn.toCode(json, Flexio);
    case taskOps.TASK_OP_INSERT:
      return insertFn.toCode(json, Flexio);
    case taskOps.TASK_OP_LIMIT:
      return limitFn.toCode(json, Flexio);
    case taskOps.TASK_OP_LIST:
      return listFn.toCode(json, Flexio);
    case taskOps.TASK_OP_MERGE:
      return mergeFn.toCode(json, Flexio);
    case taskOps.TASK_OP_MKDIR:
      return mkdirFn.toCode(json, Flexio);
    case taskOps.TASK_OP_READ:
      return readFn.toCode(json, Flexio);
    case taskOps.TASK_OP_RENDER:
      return renderFn.toCode(json, Flexio);
    case taskOps.TASK_OP_REQUEST:
      return requestFn.toCode(json, Flexio);
    case taskOps.TASK_OP_SELECT:
      return selectFn.toCode(json, Flexio);
    case taskOps.TASK_OP_SEQUENCE:
      return sequenceFn.toCode(json, Flexio);
    case taskOps.TASK_OP_SET:
      return setFn.toCode(json, Flexio);
    case taskOps.TASK_OP_SLEEP:
      return sleepFn.toCode(json, Flexio);
    case taskOps.TASK_OP_TRANSFORM:
      return transformFn.toCode(json, Flexio);
    case taskOps.TASK_OP_WRITE:
      return writeFn.toCode(json, Flexio);
  }
};

module.exports = {
  create: createFn,
  convert: convertFn,
  copy: copyFn,
  dump: dumpFn,
  echo: echoFn,
  email: emailFn,
  execute: executeFn.execute,
  insert: insertFn,
  filter: filterFn,

  foreach: foreachFn,
  javascript: executeFn.javascript,
  limit: limitFn,
  list: listFn,
  merge: mergeFn,
  mkdir: mkdirFn,
  python: executeFn.python,
  read: readFn,
  render: renderFn,
  request: requestFn,
  select: selectFn,
  sequence: sequenceFn,
  set: setFn,
  sleep: sleepFn,
  task: taskFn,
  transform: transformFn,
  write: writeFn,

  toCode: toCode
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var create = function create(p0, p1) {

  if (Array.isArray(p0)) {
    return {
      op: taskOps.TASK_OP_CREATE,
      params: {
        content_type: "application/vnd.flexio.table",
        columns: p0
      }
    };
  } else {
    var ret = {
      op: taskOps.TASK_OP_CREATE,
      params: {
        path: p0
      }
    };

    if (p1 !== undefined) {
      if (Array.isArray(p1)) {
        ret.params.columns = p1;
      } else {
        ret.params.content_type = p1;
      }
    }

    return ret;
  }
};

create.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var path = JSON.stringify(params.path) || undefined;
  var content_type = JSON.stringify(params.content_type) || undefined;
  var columns = JSON.stringify(params.columns) || undefined;

  if (path !== undefined) {

    if (columns !== undefined) {
      return 'create(' + path + ', ' + columns + ')';
    } else if (content_type !== undefined) {
      return 'create(' + path + ', ' + content_type + ')';
    } else {
      return 'create(' + path + ')';
    }
  } else {

    if (columns !== undefined) {
      return 'create(' + columns + ')';
    } else if (content_type !== undefined) {
      return '';
    }
  }
};

module.exports = create;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);

module.exports = convert;
var convert = function convert(input, output) {

  return {
    op: taskOps.TASK_OP_CONVERT,
    params: { input: input, output: output }
  };
};

convert.toCode = function (json, Flexio) {
  var input = _.get(json, 'params.input', {});
  var output = _.get(json, 'params.output', {});

  return 'convert(' + JSON.stringify(input) + ', ' + JSON.stringify(output) + ')';
};

module.exports = convert;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var copy = function copy(from, to, options) {
  var ret = {
    op: taskOps.TASK_OP_COPY,
    params: {
      from: from,
      to: to
    }
  };

  if (_.isPlainObject(options)) {
    ret.params.options = options;
  }
  return ret;
};

copy.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var from = JSON.stringify(params.from) || '""';
  var to = JSON.stringify(params.to) || '""';
  var options = params.hasOwnProperty('options') && _.isPlainObject(params.options) ? JSON.stringify(params.options) : null;

  var ret = 'copy(' + from + ', ' + to;
  if (options !== null) {
    ret += ', ' + options;
  }
  return ret + ')';
};

module.exports = copy;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var dump = function dump(msg) {
  return {
    op: taskOps.TASK_OP_DUMP,
    params: {
      msg: msg
    }
  };
};

dump.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var msg = JSON.stringify(params.msg) || '""';
  return 'dump(' + msg + ')';
};

module.exports = dump;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var echo = function echo(msg) {
  return {
    op: taskOps.TASK_OP_ECHO,
    params: {
      msg: msg
    }
  };
};

echo.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var msg = JSON.stringify(params.msg) || '""';
  return 'echo(' + msg + ')';
};

module.exports = echo;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var email = function email(params) {
  if (!_.isPlainObject(params)) throw 'The first function parameter must be an object';

  if (!params.hasOwnProperty('to')) throw 'The `to` parameter is required';

  if (!params.hasOwnProperty('body_text')) throw 'The `body_text` parameter is required';

  return {
    op: taskOps.TASK_OP_EMAIL_SEND,
    params: params
  };
};

email.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  return 'email(' + JSON.stringify(params, null, 2) + ')';
};

module.exports = email;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);

var isNodeJs = function isNodeJs() {
  return typeof process !== 'undefined';
};

var toBase64 = function toBase64(str) {
  try {
    if (isNodeJs()) {
      return Buffer(str, 'utf8').toString('base64');
    } else {
      return btoa(unescape(encodeURIComponent(str)));
    }
  } catch (e) {
    return e;
  }
};

var fromBase64 = function fromBase64(str) {
  try {
    if (isNodeJs()) {
      return Buffer.from(str, 'base64').toString('utf8');
    } else {
      return decodeURIComponent(escape(atob(str)));
    }
  } catch (e) {
    return e;
  }
};

var getJsFunctionBody = function getJsFunctionBody(f) {
  var body;

  try {
    body = f.toString();

    body = body.substring(body.indexOf('{') + 1, body.lastIndexOf('}'));
  } catch (e) {
    body = '';
  }

  return body;
};

var getJsExport = function getJsExport(f) {
  if (_.isString(f)) return f;

  if (_.isFunction(f)) {
    var body;

    if (f.length == 0) {
      body = getJsFunctionBody(f);
      return 'exports.flexio_handler = function(context) ' + body;
    } else {
      body = f.toString();
      if (body.substring(0, 8) == 'function') {
        body = body.slice(8);
      } else {
        var arrow = body.indexOf('=>');
        var brace = body.indexOf('{');

        if (arrow >= 0 && arrow < brace) {
          body = body.replace('=>\s*{', '{');
        }
      }
      return 'exports.flexio_handler = function' + body;
    }
  }
};

var execute = function execute() {
  var args = Array.from(arguments);
  var param0 = _.get(args, '[0]', null);
  var param1 = _.get(args, '[1]', null);
  var param2 = _.get(args, '[2]', null);
  var lang, code, check;

  var params = {};

  if (param0 == 'python' || param0 == 'javascript') {
    lang = param0;
    code = param1;
    if (code === null || code === undefined) {
      code = '';
    }
    check = param2;
  } else {
    lang = 'javascript';
    code = param0;
    check = param1;
  }

  if (lang == 'javascript') {
    code = getJsExport(code);
  }

  params.lang = lang;

  var http_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  if (code.match(http_regex)) {
    params.path = code;
  } else {
    params.code = toBase64(code);
  }

  if (check !== null) {
    params.integrity = check;
  }

  return {
    op: taskOps.TASK_OP_EXECUTE,
    params: params
  };
};

var javascript = function javascript() {
  var args = Array.from(arguments);
  args.unshift('javascript');
  return execute.apply(this, args);
};

var python = function python() {
  var args = Array.from(arguments);
  args.unshift('python');
  return execute.apply(this, args);
};

var toCode = function toCode(json) {
  var params = _.get(json, 'params', {});
  var lang = params.lang || '';
  var code = fromBase64(params.code || '');

  switch (lang) {
    case 'javascript':
      if (code.indexOf('exports.flexio_handler') != -1) {
        code = code.replace('exports.flexio_handler =', '');
        return 'javascript(' + code.trim() + ')';
      } else {
        return 'javascript(' + JSON.stringify(code.trim()) + ')';
      }

    case 'python':
      return 'python(`\n' + code + '\n`)';
    default:
      return 'execute(' + JSON.stringify(lang) + ', `\n' + code + '\n`)';
  }
};

module.exports = {
  execute: execute,
  javascript: javascript,
  python: python,
  toCode: toCode
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var filter = function filter(where) {

  if (_.isNil(where)) throw 'The `filter` parameter is required';

  return {
    op: taskOps.TASK_OP_FILTER,
    params: {
      where: where
    }
  };
};

filter.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var where = JSON.stringify(params.where) || '""';
  return 'filter(' + where + ')';
};

module.exports = filter;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var foreach = function foreach(p0, p1) {

  var res = {
    op: taskOps.TASK_OP_FOREACH,
    params: {}
  };

  if (typeof p0 === 'string' || p0 instanceof String) {
    res.params.spec = p0;
  }

  if (util.isPipeObject(p0)) {
    res.params.run = p0.pipe.task;
  } else if (util.isPipeObject(p1)) {
    res.params.run = p1.pipe.task;
  }

  return res;
};

foreach.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {}),
      p = [];
  if (params.hasOwnProperty('spec')) {
    p.push(JSON.stringify(params.spec));
  }
  if (params.hasOwnProperty('run')) {
    p.push(Flexio.task.toCode(params.run, Flexio));
  }

  return 'foreach(' + p.join(', ') + ')';
};

module.exports = foreach;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var insert = function insert(path, values) {

  var data;
  if (Array.isArray(values)) data = values;else data = [values];

  return {
    op: taskOps.TASK_OP_INSERT,
    params: {
      path: path,
      values: data
    }
  };
};

insert.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var path = _.get(params, 'path', undefined);
  var values = _.get(params, 'values', undefined);

  if (!Array.isArray(values)) values = [values];

  path = JSON.stringify(path);
  values = JSON.stringify(values);

  return 'insert(' + path + ', ' + values + ')';
};

module.exports = insert;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var limit = function limit(value) {
  value = _.defaultTo(value, 10);

  return {
    op: taskOps.TASK_OP_LIMIT,
    params: {
      value: value
    }
  };
};

limit.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var val = JSON.stringify(params.value) || '';
  return 'limit(' + val + ')';
};

module.exports = limit;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var merge = function merge(path) {

  if (Array.isArray(path)) {
    var files = path;
  } else {
    var files = [];
    for (var i = 0; i < arguments.length; ++i) {
      files.push(arguments[i]);
    }
  }

  return {
    op: taskOps.TASK_OP_MERGE,
    params: {
      files: files
    }
  };
};

merge.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var files = _.get(params, 'files', []);
  for (var i = 0; i < files.length; ++i) {
    if (typeof files[i] === 'string' || files[i] instanceof String) {
      files[i] = JSON.stringify(files[i]);
    } else {
      files[i] = Flexio.merge.toCode(files[i], Flexio);
    }
  }

  var param = files.length >= 10 ? '[' + files.join(', ') + ']' : files.join(', ');
  return 'merge(' + param + ')';
};

module.exports = merge;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var mkdir = function mkdir(path) {
  return {
    op: taskOps.TASK_OP_MKDIR,
    params: {
      path: path
    }
  };
};

mkdir.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var path = JSON.stringify(params.path) || '""';
  return 'mkdir(' + path + ')';
};

module.exports = mkdir;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var list = function list(path) {
  return {
    op: taskOps.TASK_OP_LIST,
    params: {
      path: path
    }
  };
};

list.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var path = JSON.stringify(params.path) || '""';
  return 'list(' + path + ')';
};

module.exports = list;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var read = function read(path) {
  return {
    op: taskOps.TASK_OP_READ,
    params: {
      path: path
    }
  };
};

read.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var path = JSON.stringify(params.path) || '""';
  return 'read(' + path + ')';
};

module.exports = read;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var render = function render(p0, p1) {

  var params = {};

  if (_.isPlainObject(p0)) {
    params = p0;
  } else if (_.isString(p0)) {
    params.url = p0;
  }

  if (_.isPlainObject(p1)) {
    _.assign(params, p1);
  }

  return {
    op: taskOps.TASK_OP_RENDER,
    params: params
  };
};

render.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var url = JSON.stringify(params.url) || '';
  delete params.url;

  if (Object.keys(params).length == 0) return 'render(' + url + ')';else return 'render(' + url + ', ' + JSON.stringify(params, null, 2) + ')';
};

module.exports = render;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var request = function request() {
  var args = Array.from(arguments);
  var url = _.get(args, '[0]', '');
  var params = _.get(args, '[1]', {});

  if (_.isPlainObject(_.get(args, '[0]', {}))) {
    params = _.get(args, '[0]', {});
  } else {
    params = _.assign({}, { url: url }, params);
  }

  return {
    op: taskOps.TASK_OP_REQUEST,
    params: params
  };
};

request.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var url = _.get(params, 'url', '');

  var keys = Object.keys(params);
  if (keys.length == 1 && keys[0] == 'url') return 'request(' + JSON.stringify(url) + ')';else return 'request(' + JSON.stringify(params, null, 2) + ')';
};

module.exports = request;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var select = function select() {
  var columns = Array.from(arguments);

  if (columns.length == 1 && Array.isArray(_.get(columns, '[0]'))) columns = _.get(columns, '[0]', []);

  return {
    op: taskOps.TASK_OP_SELECT,
    params: {
      columns: columns
    }
  };
};

select.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var cols = JSON.stringify(params.columns) || '';
  if (cols.indexOf('[') != -1 && cols.indexOf(']') != -1) cols = cols.substring(1, cols.length - 1);
  return 'select(' + cols + ')';
};

module.exports = select;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var sequence = function sequence(steps) {

  return {
    op: taskOps.TASK_OP_SEQUENCE,
    params: {
      steps: steps
    }
  };
};

sequence.toCode = function (json, Flexio) {

  var retval = [];

  for (var i = 0; i < json.params.items.length; ++i) {
    var task = json.params.items[i];

    var cmd_str = Flexio.task.toCode(task, Flexio);

    if (task.hasOwnProperty('params') && task.params.hasOwnProperty('lang') && task.params.lang != 'python') cmd_str = cmd_str.replace(/\n/g, '\n  ');

    retval.push(cmd_str);
  }

  var retval = ['Flexio.pipe()'].concat(retval);

  return retval.join('\n  .');
};

module.exports = sequence;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var set = function set(variable, value) {

  if (util.isPipeObject(value)) value = value.pipe.task;

  return {
    op: taskOps.TASK_OP_SET,
    params: {
      "var": variable,
      "value": value
    }
  };
};

set.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var variable = _.get(params, 'variable', '');
  var value = _.get(params, 'value', '');

  variable = JSON.stringify(variable);

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && value.hasOwnProperty('op')) {
    value = Flexio.task.toCode(value, Flexio);
  } else {
    value = JSON.stringify(value);
  }

  return 'set(' + variable + ', ' + value + ')';
};

module.exports = set;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var sleep = function sleep(value) {
  value = _.defaultTo(value, 10);

  return {
    op: taskOps.TASK_OP_SLEEP,
    params: {
      value: value
    }
  };
};

sleep.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var val = JSON.stringify(params.value) || '';
  return 'sleep(' + val + ')';
};

module.exports = sleep;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var task = function task(json) {
  return json;
};

task.toCode = function (json, Flexio) {
  return 'task(' + JSON.stringify(json, null, 2) + ')';
};

module.exports = task;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var transform = function transform(value) {
  var args = Array.from(arguments);

  var default_params = { operations: [] };
  var params = {};
  var columns = undefined;
  var operations = [];

  var arg1 = _.get(args, '[0]');

  if (_.isPlainObject(arg1)) {
    if (args.length == 1 && _.has(arg1, 'operations')) {
      params = _.pick(arg1, ['columns', 'operations']);
      params = _.assign(default_params, params);
    } else {
      operations = [].concat(args);
      params = { operations: operations };
    }

    return {
      op: taskOps.TASK_OP_TRANSFORM,
      params: params
    };
  }

  return {
    op: taskOps.TASK_OP_TRANSFORM,
    params: {
      columns: columns,
      operations: operations
    }
  };
};

transform.toCode = function (json, Flexio) {
  var params = json.hasOwnProperty('params') ? json.params : {};
  if (!params.hasOwnProperty('columns') && params.hasOwnProperty('operations') && Array.isArray(params.operations) && params.operations.length == 1) return "transform(" + JSON.stringify(params.operations[0]) + ")";
  return "transform(" + JSON.stringify(params) + ")";
};

module.exports = transform;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);
var taskOps = __webpack_require__(2);
var write = function write(path) {
  return {
    op: taskOps.TASK_OP_WRITE,
    params: {
      path: path
    }
  };
};

write.toCode = function (json, Flexio) {
  var params = _.get(json, 'params', {});
  var path = JSON.stringify(params.path) || '""';
  return 'write(' + path + ')';
};

module.exports = write;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {"name":"flexio-sdk-js","version":"1.20.2","description":"Javascript SDK for managing Flex.io resources and services","author":"David Z. Williams <dave@flex.io>","--main":"dist/flexio-node.js","main":"src/main.js","--browser":"src/main.js","browser":"dist/flexio.min.js","scripts":{"dev":"cross-env build=development webpack-dev-server --config ./build/webpack.dev.js --open --inline --https --hot","build:debug":"cross-env build=debug webpack --config build/webpack.dist.js","build:release":"cross-env build=production webpack --config build/webpack.dist.js","build:examples":"webpack --config build/webpack.examples.js","build":"npm run build:debug && npm run build:release && npm run build:examples","test":"jest"},"repository":{"type":"git","url":"git+https://github.com/flexiodata/flexio-sdk-js.git"},"keywords":[],"license":"Apache-2.0","bugs":{"url":"https://github.com/flexiodata/flexio-sdk-js/issues"},"homepage":"https://github.com/flexiodata/flexio-sdk-js/","dependencies":{"axios":"^0.16.2","lodash.isplainobject":"^4.0.6"},"devDependencies":{"autoprefixer":"^7.1.4","babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-plugin-transform-es2015-destructuring":"^6.23.0","babel-plugin-transform-es2015-parameters":"^6.24.1","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-plugin-transform-runtime":"^6.23.0","babel-preset-env":"^1.6.0","babel-preset-es2015":"^6.24.1","babel-preset-stage-2":"^6.24.1","cross-env":"^5.0.5","css-loader":"^0.28.7","deep-assign":"^2.0.0","jest":"^22.4.2","vue":"^2.4.4","vue-loader":"^13.0.4","vue-simple-spinner":"^1.2.7","vue-style-loader":"^3.0.3","vue-template-compiler":"^2.4.4","webpack":"^3.5.5","webpack-bundle-analyzer":"^2.11.1","webpack-dev-server":"^2.8.2"}}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

module.exports = {};
module.exports.getConnectionsObject = function (Flexio) {

  return new function () {

    this.create = function (conn, callback) {

      var data;
      if (_.isPlainObject(conn)) {
        data = conn;
      } else if (conn instanceof Flexio.connection) {
        data = conn.connection;
      } else {
        throw "Unknown connection object type";
      }

      return new Promise(function (resolve, reject) {
        Flexio.http().post('/connections', data).then(function (response) {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback);
        }).catch(function (error) {
          Flexio.util.debug('Flexio.connections.create(): Failed.');
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
        });
      });
    };

    this.list = function (callback) {
      var args = Array.from(arguments);
      var callback = _.get(args, '[0]');

      return new Promise(function (resolve, reject) {
        Flexio.util.debug('Requesting Connections...');
        Flexio.http().get('/connections').then(function (response) {
          var items = _.get(response, 'data', []);
          Flexio.util.debug('Success!');
          Flexio.util.callbackAdapter(null, items, resolve, reject, callback);
        }).catch(function (error) {
          Flexio.util.debug('Failed.');
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
        });
      });
    };
  }();
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

module.exports = {};
module.exports.getPipesObject = function (Flexio) {

  return new function () {

    this.create = function (pipe, callback) {

      var data;
      if (_.isPlainObject(pipe)) {
        data = pipe;
      } else if (pipe instanceof Flexio.pipe) {
        data = pipe.pipe;
      } else {
        throw "Unknown pipe object type";
      }

      return new Promise(function (resolve, reject) {
        Flexio.http().post('/pipes', data).then(function (response) {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback);
        }).catch(function (error) {
          Flexio.util.debug('Flexio.pipes.create(): Failed.');
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
        });
      });
    };

    this.list = function (callback) {
      var args = Array.from(arguments);
      var callback = _.get(args, '[0]');

      return new Promise(function (resolve, reject) {
        Flexio.util.debug('Requesting Pipes...');

        Flexio.http().get('/pipes').then(function (response) {
          var items = _.get(response, 'data', []);
          Flexio.util.debug('Success!');
          Flexio.util.callbackAdapter(null, items, resolve, reject, callback);
        }).catch(function (error) {
          Flexio.util.debug('Failed.');
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
        });
      });
    };

    this.run = function () {
      var args = Array.from(arguments);
      args.push(null, null, null);

      var run_params = {};
      var callback;
      var pipe_identifier;
      var tasks_array = null;

      if (args[0] instanceof Flexio.pipe) {
        pipe_identifier = _.get(args[0], 'pipe.eid', '');
        tasks_array = _.get(args[0], 'pipe.task', '');
      } else if (Array.isArray(args[0])) {
        pipe_identifier = '';
        tasks_array = args[0];
      } else {
        pipe_identifier = args[0];
      }

      if (_.isPlainObject(args[1])) {
        run_params = args[1];
      }

      if (_.isFunction(args[1])) {
        callback = args[1];
      } else if (_.isFunction(args[2])) {
        callback = args[2];
      } else {
        callback = null;
      }

      var getResponseObjectFromArrayBuffer = function getResponseObjectFromArrayBuffer(arraybuffer, content_type) {
        return {
          contentType: content_type,
          buffer: arraybuffer,
          get blob() {
            return new Blob([this.buffer], { "type": content_type });
          },
          get text() {
            return Flexio.util.arrayBufferToString(this.buffer);
          },
          get data() {
            try {
              return JSON.parse(Flexio.util.arrayBufferToString(this.buffer));
            } catch (e) {
              return null;
            }
          }
        };
      };

      return new Promise(function (resolve, reject) {

        Flexio.util.debug('Running Pipe `' + (pipe_identifier.length == 0 ? '[Pipe Object/Task Array]' : pipe_identifier) + '`...');

        if (pipe_identifier.length == 0) {

          var create_params = {
            name: 'SDK Pipe',
            description: 'SDK Pipe',
            task: tasks_array,

            process_mode: 'R'
          };

          Flexio.http().post('/processes', create_params).then(function (response) {
            var obj = _.get(response, 'data', {});
            var process_eid = _.get(obj, 'eid', '');
            Flexio.util.debug('Created Process.');

            var http_config = {
              method: 'post',
              url: '/processes/' + process_eid + '/run',
              responseType: 'arraybuffer'
            };

            if (run_params.hasOwnProperty('data')) {
              http_config.data = run_params.data;
            }

            if (run_params.hasOwnProperty('query')) {
              http_config.params = run_params.query;
            }

            var http = Flexio.http();
            http(http_config).then(function (response) {
              Flexio.util.debug('Process Complete.');
              var content_type = _.get(response, 'headers.content-type', 'text/plain');
              var response_object = getResponseObjectFromArrayBuffer(response.data, content_type);
              Flexio.util.callbackAdapter(null, response_object, resolve, reject, callback);
            }).catch(function (error) {
              Flexio.util.debug('Process Run Failed. ' + error);
              Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
            });
          }).catch(function (error) {
            Flexio.util.debug('Process Create Failed. ' + error);
            Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
          });
        } else {

          var http_config = {
            method: 'post',
            url: '/pipes/' + pipe_identifier + '/run',
            responseType: 'arraybuffer'
          };

          if (run_params.hasOwnProperty('data')) {
            http_config.data = run_params.data;
          }

          if (run_params.hasOwnProperty('query')) {
            http_config.params = run_params.query;
          }

          if (run_params.hasOwnProperty('contentType')) {
            http_config.headers = { 'Content-Type': run_params.contentType };
          } else {
            if (http_config.hasOwnProperty('data')) {
              if (_.isPlainObject(http_config.data)) {} else if (_.isString(http_config.data)) {
                http_config.headers = { 'Content-Type': 'text/plain' };
              } else {
                http_config.headers = { 'Content-Type': 'application/octet-stream' };
              }
            }
          }

          var http = Flexio.http();
          http(http_config).then(function (response) {
            Flexio.util.debug('Process Complete.');
            var content_type = _.get(response, 'headers.content-type', 'text/plain');
            var response_object = getResponseObjectFromArrayBuffer(response.data, content_type);
            Flexio.util.callbackAdapter(null, response_object, resolve, reject, callback);
          }).catch(function (error) {
            Flexio.util.debug('Pipe Run Call Failed. ' + error);
            Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
          });
        }
      });
    };
  }();
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(0);

module.exports = {};
module.exports.getPipeConstructor = function (Flexio) {

  return function (pipeconstruct_param) {

    if (!(this instanceof Flexio.pipe)) {
      return new Flexio.pipe(pipeconstruct_param);
    }

    var pipeobj = _.assign(this, {

      pipe: {
        name: 'Untitled',
        description: '',
        task: { op: 'sequence', params: { items: [] } }
      },
      processes: [],
      _params: {},
      loading: false,
      saving: false,
      running: false,

      getJSON: function getJSON() {
        return _.assign({}, this.pipe);
      },
      getProcesses: function getProcesses() {
        return [].concat(this.processes);
      },
      getLastProcess: function getLastProcess() {
        return _.last(this.processes);
      },
      addTask: function addTask(task) {
        this.pipe.task.params.items.push(task);
        return this;
      },
      clearTasks: function clearTasks() {
        this.pipe.task.params.items = [];
        return this;
      },
      getTasks: function getTasks() {
        return this.pipe.task.params.items;
      },
      load: function load() {
        var _this = this,
            _arguments = arguments;

        var args = Array.from(arguments);
        var identifier = _.get(args, '[0]');
        var callback = _.get(args, '[1]');

        if (this.loading === true || this.saving === true || this.running === true) {
          setTimeout(function () {
            _this.load.apply(_this, _arguments);
          }, 50);
          return this;
        }

        if (_.isNil(identifier)) return Flexio.util.debug("The `identifier` parameter is required. Either the pipe's eid or pipe's alias may be used.");

        this.loading = true;
        Flexio.util.debug('Loading Pipe `' + identifier + '`...');

        Flexio.http().get('/pipes/' + identifier).then(function (response) {
          var obj = _.get(response, 'data', {});
          _this.pipe = _.assign({}, obj);
          _this.loading = false;
          Flexio.util.debug('Pipe Loaded.');

          if (typeof callback == 'function') callback.call(_this, null, obj);
        }).catch(function (error) {
          _this.loading = false;
          Flexio.util.debug('Pipe Load Failed. ');

          if (typeof callback == 'function') callback.call(_this, error, null);
        });

        return this;
      },
      save: function save() {
        var _this2 = this,
            _arguments2 = arguments;

        var args = Array.from(arguments);
        var params = _.get(args, '[0]');
        var callback = _.get(args, '[0]');

        if (this.loading === true || this.saving === true || this.running === true) {
          setTimeout(function () {
            _this2.save.apply(_this2, _arguments2);
          }, 50);
          return this;
        }

        if (_.isPlainObject(params)) {
          _.assign(this.pipe, _.pick(params, ['name', 'description', 'ename']));
          callback = _.get(args, '[1]');
        }

        this.saving = true;
        Flexio.util.debug('Saving Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...');

        Flexio.http().post('/pipes', this.pipe).then(function (response) {
          var pipe = _.get(response, 'data', {});
          _this2.pipe = _.assign({}, pipe);
          _this2.saving = false;
          Flexio.util.debug('Pipe Saved.');

          if (typeof callback == 'function') callback.call(_this2, null, _this2.pipe);
        }).catch(function (error) {
          _this2.saving = false;
          Flexio.util.debug('Pipe Save Failed.');

          if (typeof callback == 'function') callback.call(_this2, error, null);
        });

        return this;
      },
      run: function run() {
        var args = Array.from(arguments);
        args.unshift(this);
        return Flexio.pipes.run.apply(null, args);
      },
      params: function params(_params) {
        this._params = _.assign({}, this.getParams(), _params);
        return this;
      },
      getParams: function getParams() {
        return _.assign({}, this._params);
      },
      toCode: function toCode(p) {
        return Flexio.task.toCode(this.pipe.task, Flexio);
      }
    });

    var forEachTask = function forEachTask(callback) {
      for (var task_name in Flexio.task) {
        if (Flexio.task.hasOwnProperty(task_name) && task_name != 'toCode') {
          callback(task_name, Flexio.task[task_name]);
        }
      }
    };

    forEachTask(function (task_name, task_func) {
      pipeobj[task_name] = function () {
        return pipeobj.addTask(task_func.apply(pipeobj, arguments));
      };
    });

    if (pipeconstruct_param !== undefined) {
      if (typeof pipeconstruct_param === 'string' || pipeconstruct_param instanceof String) {
        pipeobj.pipe.eid = pipeconstruct_param;
      } else if ((typeof pipeconstruct_param === 'undefined' ? 'undefined' : _typeof(pipeconstruct_param)) === 'object') {
        if (pipeconstruct_param.hasOwnProperty('pipe')) {
          pipeobj.pipe = JSON.parse(JSON.stringify(pipeconstruct_param.pipe));
        } else if (pipeconstruct_param.hasOwnProperty('task')) {
          pipeobj.pipe = JSON.parse(JSON.stringify(pipeconstruct_param));
        } else if (pipeconstruct_param.hasOwnProperty('op')) {
          pipeobj.pipe.task = pipeconstruct_param;
        }
      }
    }

    return pipeobj;
  };
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

var method_types = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
var allowed_auth = ['', 'basic', 'bearer', 'oauth2'];

function toBase64(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    return '';
  }
}

function fromBase64(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    return '';
  }
}

module.exports = {};
module.exports.getConnectionConstructor = function (Flexio) {

  return function () {

    if (!(this instanceof Flexio.connection)) {
      return new Flexio.connection();
    }

    var retval = _.assign(this, {

      connection: {
        name: 'Untitled',
        description: '',
        connection_type: "http",
        connection_info: {
          method: '',
          url: '',
          auth: '',
          username: '',
          password: '',
          token: '',
          access_token: '',
          refresh_token: '',
          expires: '',
          data: {},
          headers: {} }
      },
      loading: false,
      saving: false,
      running: false,

      getJSON: function getJSON() {
        return _.assign({}, this.connection);
      },
      name: function name(value) {
        this.connection.name = value;
        return this;
      },
      description: function description(value) {
        this.connection.description = value;
        return this;
      },
      method: function method() {
        var args = Array.from(arguments);
        var method = _.get(args, '[0]');

        if (!_.isString(method)) throw 'Invalid/empty method';

        if (method_types.indexOf(method) == -1) throw 'Invalid method';

        return this._setInfo('method', method);
      },
      url: function url() {
        var args = Array.from(arguments);
        var url = _.get(args, '[0]');

        if (!_.isString(url)) return this;

        return this._setInfo('url', url);
      },
      auth: function auth() {
        var args = Array.from(arguments);
        var auth = _.get(args, '[0]');

        if (!_.isString(auth)) throw 'Invalid/empty auth';

        if (allowed_auth.indexOf(auth) == -1) throw 'Invalid auth';

        if (auth == 'none') auth = '';

        return this._setInfo('auth', auth);
      },
      username: function username() {
        var args = Array.from(arguments);
        var username = _.get(args, '[0]');

        if (!_.isString(username)) return this;

        return this._setInfo('username', username);
      },
      password: function password() {
        var args = Array.from(arguments);
        var password = _.get(args, '[0]');

        if (!_.isString(password)) return this;

        return this._setInfo('password', password);
      },
      token: function token() {
        var args = Array.from(arguments);
        var token = _.get(args, '[0]');

        if (!_.isString(token)) return this;

        return this._setInfo('token', token);
      },
      accessToken: function accessToken() {
        var args = Array.from(arguments);
        var token = _.get(args, '[0]');

        if (!_.isString(token)) return this;

        return this._setInfo('access_token', token);
      },
      refreshToken: function refreshToken() {
        var args = Array.from(arguments);
        var token = _.get(args, '[0]');

        if (!_.isString(token)) return this;

        return this._setInfo('refresh_token', token);
      },
      expires: function expires() {
        var args = Array.from(arguments);
        var expires = _.get(args, '[0]');

        if (_.isNumber(expires)) expires = '' + expires;

        if (!_.isString(expires)) return this;

        return this._setInfo('expires', expires);
      },
      data: function data() {
        var args = Array.from(arguments);
        var data = _.get(args, '[0]');

        if (!_.isPlainObject(data)) return this;

        var existing_data = this._getInfo('data', {});
        data = _.assign({}, existing_data, data);

        return this._setInfo('data', data);
      },
      headers: function headers() {
        var args = Array.from(arguments);
        var headers = _.get(args, '[0]');

        if (!_.isPlainObject(headers)) return this;

        var existing_headers = this._getInfo('headers', {});
        headers = _.assign({}, existing_headers, headers);

        return this._setInfo('headers', headers);
      },
      load: function load() {
        var _this = this,
            _arguments = arguments;

        var args = Array.from(arguments);
        var identifier = _.get(args, '[0]');
        var callback = _.get(args, '[1]');

        if (this.loading === true || this.saving === true || this.running === true) {
          setTimeout(function () {
            _this.load.apply(_this, _arguments);
          }, 50);
          return this;
        }

        if (_.isNil(identifier)) return Flexio.util.debug("The `identifier` parameter is required. Either the connection's eid or connection's alias may be used.");

        this.loading = true;
        Flexio.util.debug('Loading Connection `' + identifier + '`...');

        Flexio.http().get('/connections/' + identifier).then(function (response) {
          var connection = _.get(response, 'data', {});
          _this.connection = _.assign({}, connection);
          _this.loading = false;
          Flexio.util.debug('Connection Loaded.');

          if (typeof callback == 'function') callback.call(_this, null, connection);
        }).catch(function (error) {
          _this.loading = false;
          Flexio.util.debug('Connection Load Failed.');

          if (typeof callback == 'function') callback.call(_this, error, null);
        });

        return this;
      },
      save: function save() {
        var _this2 = this,
            _arguments2 = arguments;

        var args = Array.from(arguments);
        var params = _.get(args, '[0]');
        var callback = _.get(args, '[0]');

        if (this.loading === true || this.saving === true || this.running === true) {
          setTimeout(function () {
            _this2.save.apply(_this2, _arguments2);
          }, 50);
          return this;
        }

        if (_.isPlainObject(params)) {
          _.assign(this.connection, _.pick(params, ['name', 'description', 'ename']));
          callback = _.get(args, '[1]');
        }

        this.saving = true;
        Flexio.util.debug('Saving Connection `' + _.get(this.connection, 'name', 'Untitled Connection') + '`...');

        Flexio.http().post('/connections', this.connection).then(function (response) {
          var connection = _.get(response, 'data', {});
          _this2.connection = _.assign({}, connection);
          _this2.saving = false;
          Flexio.util.debug('Connection Saved.');

          if (typeof callback == 'function') callback.call(_this2, null, _this2.connection);
        }).catch(function (error) {
          _this2.saving = false;
          Flexio.util.debug('Connection Save Failed.');

          if (typeof callback == 'function') callback.call(_this2, error, null);
        });

        return this;
      },
      _getInfo: function _getInfo(key, default_val) {
        return _.get(this.connection, 'connection_info.' + key, default_val);
      },
      _setInfo: function _setInfo(key, val) {
        if (!this.connection.hasOwnProperty('connection_info')) {
          this.connection.connection_info = {};
        }
        this.connection.connection_info[key] = val;
        return this;
      }
    });

    return retval;
  };
};

/***/ })
/******/ ])["default"];
});