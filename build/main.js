require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "starter",
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "Nuxt.js project" }],
    link: [{ rel: "icon", type: "image/x-icon", href: "./static/favicon.ico" }],
    script: [{ src: "http://res.wx.qq.com/open/js/jweixin-1.2.0.js" }]
  },
  // 全部引用的时候需要用到
  // 'element-ui/lib/theme-chalk/index.css'
  css: [{ src: "~assets/sass/base.sass", lang: "sass" }, { src: "element-ui/lib/theme-chalk/index.css", lang: "css" }],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3B8070" },
  vender: ["element-ui", "axios"],
  babel: {
    plugins: [["component", [{
      libraryName: "element-ui",
      styleLibraryName: "theme-default"
    }, "transform-async-to-generator", "transform-runtime"]]],
    comments: true
  },
  plugins: [{ src: "~plugins/element-ui", ssr: true }]
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ },
/* 2 */
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("ramda");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_workDir_weixin_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_workDir_weixin_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_workDir_weixin_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_path__);


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// ramda



var r = function r(path) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_path__["resolve"])(__dirname, path);
};
var host = process.env.HOST || "127.0.0.1";
var port = process.env.PORT || 8080;

// Import and Set Nuxt.js options
var config = __webpack_require__(0);
config.dev = !(process.env === "production");

var MIDDLEWARES = ["database", "router"];

var Server = function () {
  function Server() {
    _classCallCheck(this, Server);

    // 将koa实例指向app
    this.app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
    // 调用中间键
    this.useMiddleWares(this.app)(MIDDLEWARES);
  }

  _createClass(Server, [{
    key: "useMiddleWares",
    value: function useMiddleWares(app) {
      // 中间件的个数不定，通过 Ramda 的特性，从右往左进行函数组合，右侧函数的返回结果总是左侧函数的输入参数
      // R.map(console.log)([1, 2, 3])
      // MIDDLEWARE 数组交给了 R.map
      // 分别拿到的单个数组中的值，我们可以通过 R.compose 再次进行组合。

      //1. 返回的依次顺序为 resolve(__dirname, path)/[database、router]
      //2. require(1返回的结果)
      //3. require(1返回的结果)(database,router) 取得middlewares文件夹中各个js中的export对象
      //4. 然后遍历js 并且向里面传  koa的实例对象
      return __WEBPACK_IMPORTED_MODULE_3_ramda___default.a.map(__WEBPACK_IMPORTED_MODULE_3_ramda___default.a.compose(__WEBPACK_IMPORTED_MODULE_3_ramda___default.a.map(function (i) {
        return i(app);
      }), !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), function (i) {
        return r("./middlewares") + "/" + i;
      }));
    }
  }, {
    key: "start",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_workDir_weixin_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
        var nuxt, builder;
        return __WEBPACK_IMPORTED_MODULE_0_D_workDir_weixin_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Instantiate nuxt.js
                nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);
                // Build in development

                if (config.dev) {
                  builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);


                  builder.build().catch(function (e) {
                    console.error(e); // eslint-disable-line no-console
                    process.exit(1);
                  });
                }
                this.app.use(function (ctx) {
                  ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                  return new Promise(function (resolve, reject) {
                    ctx.res.on("close", resolve);
                    ctx.res.on("finish", resolve);
                    nuxt.render(ctx.req, ctx.res, function (promise) {
                      // nuxt.render passes a rejected promise into callback on error.
                      promise.then(resolve).catch(reject);
                    });
                  });
                });
                this.app.listen(port, host);
                console.log("Server listening on " + host + ":" + port); // eslint-disable-line no-console

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }]);

  return Server;
}();

// 创建服务器实例


var app = new Server();

// 运行服务器实例
app.start();
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }
/******/ ]);
//# sourceMappingURL=main.map