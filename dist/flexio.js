/*!
 * Flex.io Javascript SDK v1.28.2 (https://github.com/flexiodata/flexio-sdk-js)
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function getProp(object, path, defaultVal) {
  var _path = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, '.$2').split('.').filter(function (i) {
    return i.length;
  });
  if (!_path.length) {
    return object === undefined ? defaultVal : object;
  }
  if (!isPlainObject(object) && !Array.isArray(object)) {
    return defaultVal;
  }
  return getProp(object[_path.shift()], _path, defaultVal);
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
  isPlainObject: isPlainObject, assign: assign, pick: pick, get: getProp,

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
  has: function has(obj, value) {
    return obj.hasOwnProperty(value);
  },
  cloneDeep: function cloneDeep(value) {
    return JSON.parse(JSON.stringify(value));
  } };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

util.toBase64 = function (str) {
  try {
    if (util.isNodeJs()) {
      return Buffer(str, 'utf8').toString('base64');
    } else {
      return btoa(unescape(encodeURIComponent(str)));
    }
  } catch (e) {
    return e;
  }
};

util.fromBase64 = function (str) {
  try {
    if (util.isNodeJs()) {
      return Buffer.from(str, 'base64').toString('utf8');
    } else {
      return decodeURIComponent(escape(atob(str)));
    }
  } catch (e) {
    return e;
  }
};

util.queryString = function (obj) {
  if (util.isNodeJs()) {
    return __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"querystring\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).stringify(obj);
  } else {
    return Object.keys(obj).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
  }
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

util.getTaskParams = function (task) {
  var ret = JSON.parse(JSON.stringify(task));
  delete ret['op'];
  delete ret['eid'];
  return ret;
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var Flexio = __webpack_require__(3);

exports.default = Flexio;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var task = __webpack_require__(4);

var Flexio = {
  _init: function _init() {

    this.config = {
      token: '',
      host: 'api.flex.io',
      insecure: false,
      debug: false
    };

    this.connections = __webpack_require__(30).getConnectionsObject(this);
    this.pipes = __webpack_require__(31).getPipesObject(this);
    this.util = __webpack_require__(1).getUtilObject(this);
    this._http = null;
    this.version = this.util.isNodeJs() ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../package.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).version : "1.28.2";

    var getPipeConstructor = __webpack_require__(32).getPipeConstructor;
    this.pipe = getPipeConstructor(this);

    var getConnectionConstructor = __webpack_require__(33).getConnectionConstructor;
    this.connection = getConnectionConstructor(this);
  },
  setup: function setup(token, params) {
    delete this.config.baseUrl;
    _.assign(this.config, { token: token }, params);
    this._http = null;
    this._createHttp();
    return this;
  },
  getConfig: function getConfig() {
    if (!this.config.baseUrl) {
      var baseUrl = 'https://' + this.config.host + '/v1';
      _.assign(this.config, { baseUrl: baseUrl });
    }
    return _.assign({}, this.config);
  },
  http: function http() {
    if (!this._http) this._createHttp();

    return this._http;
  },


  task: task,

  _createHttp: function _createHttp() {
    var cfg = this.getConfig();

    var http_opts = {
      baseURL: cfg.baseUrl,
      headers: { 'Authorization': 'Bearer ' + cfg.token },
      insecure: cfg.insecure === true ? true : false
    };

    this._http = __webpack_require__(34).create(http_opts);
  }
};

Flexio._init();

module.exports = Flexio;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

var connectFn = __webpack_require__(5);
var convertFn = __webpack_require__(6);
var copyFn = __webpack_require__(7);
var createFn = __webpack_require__(8);
var dumpFn = __webpack_require__(9);
var echoFn = __webpack_require__(10);
var emailFn = __webpack_require__(11);
var executeFn = __webpack_require__(12);
var filterFn = __webpack_require__(13);
var foreachFn = __webpack_require__(14);
var insertFn = __webpack_require__(15);
var limitFn = __webpack_require__(16);
var mergeFn = __webpack_require__(17);
var mkdirFn = __webpack_require__(18);
var listFn = __webpack_require__(19);
var readFn = __webpack_require__(20);
var renderFn = __webpack_require__(21);
var requestFn = __webpack_require__(22);
var selectFn = __webpack_require__(23);
var sequenceFn = __webpack_require__(24);
var setFn = __webpack_require__(25);
var sleepFn = __webpack_require__(26);
var taskFn = __webpack_require__(27);
var transformFn = __webpack_require__(28);
var writeFn = __webpack_require__(29);

var toCode = function toCode(json, Flexio) {
  var op = _.get(json, 'op', '');

  switch (op) {
    default:
      return taskFn.toCode(json);

    case 'connect':
      return connectFn.toCode(json, Flexio);
    case 'convert':
      return convertFn.toCode(json, Flexio);
    case 'copy':
      return copyFn.toCode(json, Flexio);
    case 'create':
      return createFn.toCode(json, Flexio);
    case 'dump':
      return dumpFn.toCode(json, Flexio);
    case 'echo':
      return echoFn.toCode(json, Flexio);
    case 'email':
      return emailFn.toCode(json, Flexio);
    case 'execute':
      return executeFn.toCode(json, Flexio);
    case 'filter':
      return filterFn.toCode(json, Flexio);
    case 'foreach':
      return foreachFn.toCode(json, Flexio);
    case 'insert':
      return insertFn.toCode(json, Flexio);
    case 'limit':
      return limitFn.toCode(json, Flexio);
    case 'list':
      return listFn.toCode(json, Flexio);
    case 'merge':
      return mergeFn.toCode(json, Flexio);
    case 'mkdir':
      return mkdirFn.toCode(json, Flexio);
    case 'read':
      return readFn.toCode(json, Flexio);
    case 'render':
      return renderFn.toCode(json, Flexio);
    case 'request':
      return requestFn.toCode(json, Flexio);
    case 'select':
      return selectFn.toCode(json, Flexio);
    case 'sequence':
      return sequenceFn.toCode(json, Flexio);
    case 'set':
      return setFn.toCode(json, Flexio);
    case 'sleep':
      return sleepFn.toCode(json, Flexio);
    case 'transform':
      return transformFn.toCode(json, Flexio);
    case 'write':
      return writeFn.toCode(json, Flexio);
  }
};

module.exports = {

  connect: connectFn,
  convert: convertFn,
  copy: copyFn,
  create: createFn,
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var connect = function connect(params) {
  return _.assign({}, params, { op: 'connect' });
};

connect.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  return 'connect(' + JSON.stringify(params) + ')';
};

module.exports = connect;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var convert = function convert(input, output) {

  var params = {
    input: input,
    output: output
  };

  return _.assign({}, params, { op: 'convert' });
};

convert.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var input = _.get(params, 'input', {});
  var output = _.get(params, 'output', {});
  return 'convert(' + JSON.stringify(input) + ', ' + JSON.stringify(output) + ')';
};

module.exports = convert;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var copy = function copy(from, to, options) {
  var params = {
    from: from,
    to: to
  };

  if (_.isPlainObject(options)) {
    params.options = options;
  }

  return _.assign({}, params, { op: 'copy' });
};

copy.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var create = function create(p0, p1) {

  if (Array.isArray(p0)) {
    var params = {
      content_type: "application/vnd.flexio.table",
      columns: p0
    };
  } else {

    var params = {
      path: p0
    };

    if (p1 !== undefined) {
      if (Array.isArray(p1)) {
        params.columns = p1;
      } else {
        params.content_type = p1;
      }
    }

    return _.assign({}, params, { op: 'create' });
  }
};

create.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var dump = function dump(msg) {
  return _.assign({}, { msg: msg }, { op: 'dump' });
};

dump.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var msg = JSON.stringify(params.msg) || '""';
  return 'dump(' + msg + ')';
};

module.exports = dump;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var echo = function echo(msg) {
  return _.assign({}, { msg: msg }, { op: 'echo' });
};

echo.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var msg = JSON.stringify(params.msg) || '""';
  return 'echo(' + msg + ')';
};

module.exports = echo;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var email = function email(p0, p1) {

  var params = {};

  if (_.isPlainObject(p0)) {
    _.assign(params, p0);
  } else {
    params.connection = p0;
  }

  if (_.isPlainObject(p1)) {
    _.assign(params, p1);
  }

  return _.assign({}, params, { op: 'email' });
};

email.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  return 'email(' + JSON.stringify(params, null, 2) + ')';
};

module.exports = email;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

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
  var param0 = _.get(args, '[0]');
  var param1 = _.get(args, '[1]');
  var param2 = _.get(args, '[2]');
  var lang, code, check;
  var params = {};

  if (param0 == 'python' || param0 == 'javascript') {
    lang = param0;
    code = param1;
    check = param2;
  } else {
    lang = 'javascript';
    code = param0;
    check = param1;
  }

  if (!code) {
    code = '';
  }

  if (lang == 'javascript') {
    code = getJsExport(code);
  }

  params.lang = lang;

  var http_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  if (code.match(http_regex)) {
    params.path = code;
  } else {
    params.code = util.toBase64(code);
  }

  if (check) {
    params.integrity = check;
  }

  return _.assign({}, params, { op: 'execute' });
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
  var params = util.getTaskParams(json);
  var lang = params.lang || '';
  var code = util.fromBase64(params.code || '');

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var filter = function filter(where) {
  return _.assign({}, { where: where }, { op: 'filter' });
};

filter.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var where = JSON.stringify(params.where) || '""';
  return 'filter(' + where + ')';
};

module.exports = filter;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var foreach = function foreach(p0, p1) {

  var params = {};

  if (typeof p0 === 'string' || p0 instanceof String) {
    params.spec = p0;
  }

  if (util.isPipeObject(p0)) {
    params.run = p0.pipe.task;
  } else if (util.isPipeObject(p1)) {
    params.run = p1.pipe.task;
  }

  return _.assign({}, params, { op: 'foreach' });
};

foreach.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json),
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var insert = function insert(path, values) {

  var data;
  if (Array.isArray(values)) data = values;else data = [values];

  return _.assign({}, { path: path, values: data }, { op: 'insert' });
};

insert.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var path = _.get(params, 'path', undefined);
  var values = _.get(params, 'values', undefined);

  if (!Array.isArray(values)) values = [values];

  path = JSON.stringify(path);
  values = JSON.stringify(values);

  return 'insert(' + path + ', ' + values + ')';
};

module.exports = insert;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var limit = function limit(value) {
  return _.assign({}, { value: value }, { op: 'limit' });
};

limit.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var val = JSON.stringify(params.value) || '';
  return 'limit(' + val + ')';
};

module.exports = limit;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var merge = function merge(path) {

  if (Array.isArray(path)) {
    var files = path;
  } else {
    var files = [];
    for (var i = 0; i < arguments.length; ++i) {
      files.push(arguments[i]);
    }
  }

  return _.assign({}, { files: files }, { op: 'merge' });
};

merge.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var mkdir = function mkdir(path) {
  return _.assign({}, { path: path }, { op: 'mkdir' });
};

mkdir.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var path = JSON.stringify(params.path) || '""';
  return 'mkdir(' + path + ')';
};

module.exports = mkdir;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var list = function list(path) {
  return _.assign({}, { path: path }, { op: 'list' });
};

list.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var path = JSON.stringify(params.path) || '""';
  return 'list(' + path + ')';
};

module.exports = list;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var read = function read(path) {
  return _.assign({}, { path: path }, { op: 'read' });
};

read.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var path = JSON.stringify(params.path) || '""';
  return 'read(' + path + ')';
};

module.exports = read;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

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

  return _.assign({}, params, { op: 'render' });
};

render.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var url = JSON.stringify(params.url) || '';
  delete params['url'];

  if (Object.keys(params).length == 0) return 'render(' + url + ')';else return 'render(' + url + ', ' + JSON.stringify(params, null, 2) + ')';
};

module.exports = render;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var request = function request() {
  var args = Array.from(arguments);
  var url = _.get(args, '[0]', '');
  var params = _.get(args, '[1]', {});

  if (_.isPlainObject(_.get(args, '[0]', {}))) {
    params = _.get(args, '[0]', {});
  } else {
    params = _.assign({}, { url: url }, params);
  }

  return _.assign({}, params, { op: 'request' });
};

request.toCode = function (json, Flexio) {

  var params = util.getTaskParams(json);
  var url = _.get(params, 'url', '');

  var keys = Object.keys(params);
  if (keys.length == 1 && keys[0] == 'url') return 'request(' + JSON.stringify(url) + ')';else return 'request(' + JSON.stringify(params, null, 2) + ')';
};

module.exports = request;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var select = function select() {
  var columns = Array.from(arguments);

  if (columns.length == 1 && Array.isArray(_.get(columns, '[0]'))) columns = _.get(columns, '[0]', []);

  return _.assign({}, { columns: columns }, { op: 'select' });
};

select.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var cols = JSON.stringify(params.columns) || '';
  if (cols.indexOf('[') != -1 && cols.indexOf(']') != -1) cols = cols.substring(1, cols.length - 1);
  return 'select(' + cols + ')';
};

module.exports = select;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var sequence = function sequence(steps) {
  return _.assign({}, { steps: steps }, { op: 'sequence' });
};

sequence.toCode = function (json, Flexio) {

  var params = util.getTaskParams(json);
  var retval = [];

  for (var i = 0; i < params.items.length; ++i) {
    var task = params.items[i];

    var cmd_str = Flexio.task.toCode(task, Flexio);

    if (task.hasOwnProperty('params') && task.params.hasOwnProperty('lang') && task.params.lang != 'python') cmd_str = cmd_str.replace(/\n/g, '\n  ');

    retval.push(cmd_str);
  }

  var retval = ['Flexio.pipe()'].concat(retval);

  return retval.join('\n  .');
};

module.exports = sequence;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var set = function set(variable, value) {

  if (util.isPipeObject(value)) value = value.pipe.task;

  return _.assign({}, { "var": variable, "value": value }, { op: 'set' });
};

set.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var variable = _.get(params, 'var', '');
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var sleep = function sleep(value) {
  return _.assign({}, { value: value }, { op: 'sleep' });
};

sleep.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var val = JSON.stringify(params.value) || '';
  return 'sleep(' + val + ')';
};

module.exports = sleep;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var task = function task(json) {
  return json;
};

task.toCode = function (json, Flexio) {
  var params = JSON.parse(JSON.stringify(json));
  delete params['eid'];
  return 'task(' + JSON.stringify(params, null, 2) + ')';
};

module.exports = task;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

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
  } else {
    params = { columns: columns, operations: operations };
  }

  return _.assign({}, params, { op: 'transform' });
};

transform.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  if (!_.has(params, 'columns') && _.has(params, 'operations') && Array.isArray(params.operations) && params.operations.length == 1) {
    return "transform(" + JSON.stringify(params.operations[0]) + ")";
  } else {
    return "transform(" + JSON.stringify(params) + ")";
  }
};

module.exports = transform;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

var write = function write(path) {
  return _.assign({}, { path: path }, { op: 'write' });
};

write.toCode = function (json, Flexio) {
  var params = util.getTaskParams(json);
  var path = JSON.stringify(params.path) || '""';
  return 'write(' + path + ')';
};

module.exports = write;

/***/ }),
/* 30 */
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
        Flexio.http().post('/me/connections', data).then(function (response) {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback);
        }).catch(function (error) {
          Flexio.util.debug('Flexio.connections.create(): Failed.');
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
        });
      });
    };

    this.remove = function (identifier, callback) {

      return new Promise(function (resolve, reject) {
        Flexio.http().request({ method: 'DELETE', url: '/me/connections/' + identifier }).then(function (response) {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback);
        }).catch(function (error) {
          Flexio.util.debug('Flexio.connections.remove(): Failed.');
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
        });
      });
    };

    this.list = function (callback) {
      var args = Array.from(arguments);
      var callback = _.get(args, '[0]');

      return new Promise(function (resolve, reject) {
        Flexio.util.debug('Requesting Connections...');
        Flexio.http().get('/me/connections').then(function (response) {
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var util = __webpack_require__(1);

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
        Flexio.http().post('/me/pipes', data).then(function (response) {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback);
        }).catch(function (error) {
          Flexio.util.debug('Flexio.pipes.create(): Failed.');
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
        });
      });
    };

    this.remove = function (identifier, callback) {

      return new Promise(function (resolve, reject) {
        Flexio.http().request({ method: 'DELETE', url: '/me/pipes/' + identifier }).then(function (response) {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback);
        }).catch(function (error) {
          Flexio.util.debug('Flexio.pipes.remove(): Failed.');
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback);
        });
      });
    };

    this.list = function (callback) {
      var args = Array.from(arguments);
      var callback = _.get(args, '[0]');

      return new Promise(function (resolve, reject) {
        Flexio.util.debug('Requesting Pipes...');

        Flexio.http().get('/me/pipes').then(function (response) {
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

          Flexio.http().post('/me/processes', create_params).then(function (response) {
            var obj = _.get(response, 'data', {});
            var process_eid = _.get(obj, 'eid', '');
            Flexio.util.debug('Created Process.');

            var http_config = {
              method: 'post',
              url: '/me/processes/' + process_eid + '/run',
              responseType: 'arraybuffer'
            };

            if (_.has(run_params, 'data')) {
              http_config.data = run_params.data;
              if (_.isString(run_params.data)) {
                http_config.headers = { 'Content-Type': 'text/plain' };
              }
            }

            if (_.has(run_params, 'form')) {
              http_config.data = util.queryString(run_params.form);
              http_config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            }

            if (_.has(run_params, 'query')) {
              http_config.params = run_params.query;
            }

            if (_.has(run_params, 'content_type')) {
              http_config.headers = { 'Content-Type': run_params.content_type };
            }

            var http = Flexio.http();

            http.request(http_config).then(function (response) {
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
            url: '/me/pipes/' + pipe_identifier + '/run',
            responseType: 'arraybuffer'
          };

          if (_.has(run_params, 'data')) {
            http_config.data = run_params.data;
          }

          if (_.has(run_params, 'form')) {
            http_config.data = util.queryString(run_params.form);
            http_config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
          }

          if (_.has(run_params, 'query')) {
            http_config.params = run_params.query;
          }

          if (_.has(run_params, 'content_type')) {
            http_config.headers = { 'Content-Type': run_params.content_type };
          }

          var http = Flexio.http();

          http.request(http_config).then(function (response) {
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
/* 32 */
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
        task: { op: 'sequence', items: [] }
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
        this.pipe.task.items.push(task);
        return this;
      },
      clearTasks: function clearTasks() {
        this.pipe.task.items = [];
        return this;
      },
      getTasks: function getTasks() {
        return this.pipe.task.items;
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

        Flexio.http().get('/me/pipes/' + identifier).then(function (response) {
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
          _.assign(this.pipe, _.pick(params, ['name', 'description', 'alias', 'task', 'schedule', 'schedule_status']));
          callback = _.get(args, '[1]');
        }

        this.saving = true;
        Flexio.util.debug('Saving Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...');

        Flexio.http().post('/me/pipes', this.pipe).then(function (response) {
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

    for (var task_name in Flexio.task) {

      (function (task_name, task_func) {
        if (Flexio.task.hasOwnProperty(task_name) && task_name != 'toCode') {
          pipeobj[task_name] = function () {
            return pipeobj.addTask(task_func.apply(pipeobj, arguments));
          };
        }
      })(task_name, Flexio.task[task_name]);
    }


    if (pipeconstruct_param !== undefined) {
      if (typeof pipeconstruct_param === 'string' || pipeconstruct_param instanceof String) {
        pipeobj.pipe.eid = pipeconstruct_param;
      } else if ((typeof pipeconstruct_param === 'undefined' ? 'undefined' : _typeof(pipeconstruct_param)) === 'object') {
        pipeconstruct_param = _.cloneDeep(pipeconstruct_param);
        if (pipeconstruct_param.hasOwnProperty('pipe')) {
          pipeobj.pipe = pipeconstruct_param.pipe;
        } else if (pipeconstruct_param.hasOwnProperty('task')) {
          pipeobj.pipe = pipeconstruct_param;
        } else if (pipeconstruct_param.hasOwnProperty('op')) {
          pipeobj.pipe.task = pipeconstruct_param;
        }
      }
    }

    return pipeobj;
  };
};

/***/ }),
/* 33 */
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

        Flexio.http().get('/me/connections/' + identifier).then(function (response) {
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
          _.assign(this.connection, _.pick(params, ['name', 'description', 'alias']));
          callback = _.get(args, '[1]');
        }

        this.saving = true;
        Flexio.util.debug('Saving Connection `' + _.get(this.connection, 'name', 'Untitled Connection') + '`...');

        Flexio.http().post('/me/connections', this.connection).then(function (response) {
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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(0);
var util = __webpack_require__(1);

function HttpClient(options) {

    this.options = _.isPlainObject(options) ? options : {};

    this.post = function (url, data, config) {
        return this.request(_.assign(config || {}, { method: 'POST', url: url, data: data }));
    };

    this.get = function (url, config) {
        return this.request(_.assign(config || {}, { method: 'GET', url: url }));
    };

    this.isFormData = function (val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    };

    this.isBlob = function (val) {
        return typeof Blob !== 'undefined' && val instanceof Blob;
    };

    this.isStream = function (val) {
        return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && typeof val.pipe === 'function';
    };

    this.request = function (config) {

        var finalurl = _.get(this.options, 'baseURL', '');

        var url = _.get(config, 'url', '');

        if (url.indexOf('://') != -1) {
            finalurl = url;
        } else {
            url = url.substr(0, 1) == '/' ? url.substr(1) : url;
            if (finalurl.slice(-1) != '/') {
                finalurl += '/';
            }
            finalurl += url;
        }

        config = _.assign({}, config, { url: finalurl });

        function setContentTypeNotSet(value) {
            if (!_.has(config, 'headers')) {
                config.headers = {};
            }
            if (!_.has(config.headers, 'Content-Type')) {
                config.headers['Content-Type'] = value;
            }
        }

        var form_mime_type = 'application/x-www-form-urlencoded';
        var data = _.get(config, 'data', null);

        if (this.isFormData(data) || this.isBlob(data) || this.isStream(data) || data instanceof ArrayBuffer) {} else if (data !== null && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
            if (_.get(config, 'headers.Content-Type', '') == form_mime_type) {
                config.data = util.queryString(config.data);
            } else {
                config.data = JSON.stringify(data);
                setContentTypeNotSet('application/json');
            }
        } else {
            var m = _.get(config, 'method', '').toUpperCase();
            if (m == 'POST' || m == 'PUT' || m == 'PATCH') {
                setContentTypeNotSet(form_mime_type);
            }
        }

        if (util.isNodeJs()) {
            return __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./http-node\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).apply(this, [config]);
        } else {
            return __webpack_require__(35).apply(this, [config]);
        }
    };
}

module.exports = {
    create: function create(params) {
        return new HttpClient(params);
    }
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

function requestXHR(config) {

    function parseResponseHeaders(headerstr) {
        var headers = {};
        var pairs = headerstr ? headerstr.split('\r\n') : [];
        for (var i = 0, len = pairs.length; i < len; i++) {
            var comma = pairs[i].indexOf(':');
            if (comma > 0) {
                headers[pairs[i].substr(0, comma).trim()] = pairs[i].substr(comma + 1).trim();
            }
        }
        return headers;
    }

    var headers = _.assign({}, _.get(this.options, 'headers', {}), _.get(config, 'headers', {}));
    var postdata = _.get(config, 'data', null);

    if (typeof FormData !== 'undefined' && postdata instanceof FormData) {
        delete headers['Content-Type'];
    }

    var url = config.url;
    if (config.params) {
        var qs = Object.keys(config.params).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(config.params[k]);
        }).join('&');
        url += url.indexOf('?') < 0 ? '?' + qs : '&' + qs;
    }

    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open(config.method.toUpperCase(), url, true);

        if (config.responseType) {
            xhr.responseType = config.responseType;
        }

        if (Object.keys(headers).length > 0) {
            for (var k in headers) {
                if (headers.hasOwnProperty(k)) {
                    xhr.setRequestHeader(k, headers[k]);
                }
            }
        }

        function getResData(req) {
            var resData = !config.responseType || config.responseType === 'text' ? req.responseText : req.response;
            if (typeof resData === 'string') {
                try {
                    resData = JSON.parse(resData);
                } catch (e) {}
            }
            return resData;
        }

        xhr.onload = function () {

            var resData = getResData(xhr);

            var response = {
                data: resData,
                status: xhr.status === 1223 ? 204 : xhr.status,
                statusText: xhr.status === 1223 ? 'No Content' : xhr.statusText,
                headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
                config: config,
                request: xhr
            };

            resolve(response);

            xhr = null;
        };

        xhr.onerror = function handleError() {

            var resData = getResData(xhr);

            var response = {
                data: resData,
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
                config: config,
                request: xhr
            };

            reject(response);

            xhr = null;
        };

        xhr.send(postdata);
    });
}

module.exports = requestXHR;

/***/ })
/******/ ])["default"];
});