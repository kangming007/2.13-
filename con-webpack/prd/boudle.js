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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
		angular.module("myApp", ["ui.router"]);
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/guide");
	$stateProvider.state("index", {
		url: "/index",
		templateUrl: "./tpls/index.html",
		controller: "homeController"
	}).state("index.home", {
		url: "/home",
		templateUrl: "./tpls/home.html",
		controller: "homeController"
	}).state("index.search", {
		url: "/search",
		templateUrl: "./tpls/search.html",
		controller: "homeController"
	}).state("index.my", {
		url: "/my",
		templateUrl: "./tpls/my.html",
		controller: "homeController"
	}).state("guide", {
		url: "/guide",
		templateUrl: "./tpls/guide.html",
		controller: "guidController"
	});
}
angular.module("myApp").config(config);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function homeController($scope, getVal) {
	var mainSwiper = new Swiper("#home-container", {
		onSlideChangeStart: function onSlideChangeStart(swiper) {
			var $el = $("#title span").eq(swiper.activeIndex);
			$el.addClass("active").siblings().removeClass();
		}
	});
	var conSwiper = new Swiper("#con-container", {
		onSlideChangeStart: function onSlideChangeStart(swiper) {
			var $el = $("#nav li").eq(swiper.activeIndex);
			$el.addClass("active").siblings().removeClass();
		}
	});
	var dataFormat = function dataFormat(data) {
		var tempArr = [];
		for (var i = 0, len = Math.ceil(data.length / 2); i < len; i++) {
			tempArr[i] = [];
			tempArr[i].push(data[i * 2]);
			data[i * 2 + 1] && tempArr[i].push(data[i * 2 + 1]);
		}
		return tempArr;
	};
	getVal.success(function (data) {
		$scope.obj = dataFormat(data.data);
	});
}
function guidController($scope) {
	var mySwiper = new Swiper("#swiper-container");
}
angular.module("myApp").controller("homeController", homeController).controller("guidController", guidController);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hello() {
	return {
		restrict: "EA",
		link: function link(scope, ele) {

			/*$(ele).on("click","li",function(){
   	alert(1)
   	var ind=$(this).index()
   	$(this).addClass("active").siblings().removeClass("active")
   })*/

		}
	};
}
angular.module("myApp").directive("hello", hello);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module("myApp").factory("getVal", function ($http) {
	return $http.get("./mock/livelist.json");
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * State-based routing for AngularJS
 * @version v0.3.2
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), function (a, b, c) {
  "use strict";
  function d(a, b) {
    return S(new (S(function () {}, { prototype: a }))(), b);
  }function e(a) {
    return R(arguments, function (b) {
      b !== a && R(b, function (b, c) {
        a.hasOwnProperty(c) || (a[c] = b);
      });
    }), a;
  }function f(a, b) {
    var c = [];for (var d in a.path) {
      if (a.path[d] !== b.path[d]) break;c.push(a.path[d]);
    }return c;
  }function g(a) {
    if (Object.keys) return Object.keys(a);var b = [];return R(a, function (a, c) {
      b.push(c);
    }), b;
  }function h(a, b) {
    if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);var c = a.length >>> 0,
        d = Number(arguments[2]) || 0;for (d = d < 0 ? Math.ceil(d) : Math.floor(d), d < 0 && (d += c); d < c; d++) {
      if (d in a && a[d] === b) return d;
    }return -1;
  }function i(a, b, c, d) {
    var e,
        i = f(c, d),
        j = {},
        k = [];for (var l in i) {
      if (i[l] && i[l].params && (e = g(i[l].params), e.length)) for (var m in e) {
        h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
      }
    }return S({}, j, b);
  }function j(a, b, c) {
    if (!c) {
      c = [];for (var d in a) {
        c.push(d);
      }
    }for (var e = 0; e < c.length; e++) {
      var f = c[e];if (a[f] != b[f]) return !1;
    }return !0;
  }function k(a, b) {
    var c = {};return R(a, function (a) {
      c[a] = b[a];
    }), c;
  }function l(a) {
    var b = {},
        c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));return R(c, function (c) {
      c in a && (b[c] = a[c]);
    }), b;
  }function m(a) {
    var b = {},
        c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));for (var d in a) {
      h(c, d) == -1 && (b[d] = a[d]);
    }return b;
  }function n(a, b) {
    var c = Q(a),
        d = c ? [] : {};return R(a, function (a, e) {
      b(a, e) && (d[c ? d.length : e] = a);
    }), d;
  }function o(a, b) {
    var c = Q(a) ? [] : {};return R(a, function (a, d) {
      c[d] = b(a, d);
    }), c;
  }function p(a) {
    return a.then(c, function () {}) && a;
  }function q(a, b) {
    var d = 1,
        f = 2,
        i = {},
        j = [],
        k = i,
        l = S(a.when(i), { $$promises: i, $$values: i });this.study = function (i) {
      function n(a, c) {
        if (s[c] !== f) {
          if (r.push(c), s[c] === d) throw r.splice(0, h(r, c)), new Error("Cyclic dependency: " + r.join(" -> "));if (s[c] = d, O(a)) q.push(c, [function () {
            return b.get(a);
          }], j);else {
            var e = b.annotate(a);R(e, function (a) {
              a !== c && i.hasOwnProperty(a) && n(i[a], a);
            }), q.push(c, a, e);
          }r.pop(), s[c] = f;
        }
      }function o(a) {
        return P(a) && a.then && a.$$promises;
      }if (!P(i)) throw new Error("'invocables' must be an object");var p = g(i || {}),
          q = [],
          r = [],
          s = {};return R(i, n), i = r = s = null, function (d, f, g) {
        function h() {
          --u || (v || e(t, f.$$values), r.$$values = t, r.$$promises = r.$$promises || !0, delete r.$$inheritedValues, n.resolve(t));
        }function i(a) {
          r.$$failure = a, n.reject(a);
        }function j(c, e, f) {
          function j(a) {
            l.reject(a), i(a);
          }function k() {
            if (!M(r.$$failure)) try {
              l.resolve(b.invoke(e, g, t)), l.promise.then(function (a) {
                t[c] = a, h();
              }, j);
            } catch (a) {
              j(a);
            }
          }var l = a.defer(),
              m = 0;R(f, function (a) {
            s.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, s[a].then(function (b) {
              t[a] = b, --m || k();
            }, j));
          }), m || k(), s[c] = l.promise;
        }if (o(d) && g === c && (g = f, f = d, d = null), d) {
          if (!P(d)) throw new Error("'locals' must be an object");
        } else d = k;if (f) {
          if (!o(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()");
        } else f = l;var n = a.defer(),
            r = n.promise,
            s = r.$$promises = {},
            t = S({}, d),
            u = 1 + q.length / 3,
            v = !1;if (M(f.$$failure)) return i(f.$$failure), r;f.$$inheritedValues && e(t, m(f.$$inheritedValues, p)), S(s, f.$$promises), f.$$values ? (v = e(t, m(f.$$values, p)), r.$$inheritedValues = m(f.$$values, p), h()) : (f.$$inheritedValues && (r.$$inheritedValues = m(f.$$inheritedValues, p)), f.then(h, i));for (var w = 0, x = q.length; w < x; w += 3) {
          d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
        }return r;
      };
    }, this.resolve = function (a, b, c, d) {
      return this.study(a)(b, c, d);
    };
  }function r(a, b, c) {
    this.fromConfig = function (a, b, c) {
      return M(a.template) ? this.fromString(a.template, b) : M(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : M(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null;
    }, this.fromString = function (a, b) {
      return N(a) ? a(b) : a;
    }, this.fromUrl = function (c, d) {
      return N(c) && (c = c(d)), null == c ? null : a.get(c, { cache: b, headers: { Accept: "text/html" } }).then(function (a) {
        return a.data;
      });
    }, this.fromProvider = function (a, b, d) {
      return c.invoke(a, null, d || { params: b });
    };
  }function s(a, b, e) {
    function f(b, c, d, e) {
      if (q.push(b), o[b]) return o[b];if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");if (p[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");return p[b] = new V.Param(b, c, d, e), p[b];
    }function g(a, b, c, d) {
      var e = ["", ""],
          f = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");if (!b) return f;switch (c) {case !1:
          e = ["(", ")" + (d ? "?" : "")];break;case !0:
          f = f.replace(/\/$/, ""), e = ["(?:/(", ")|/)?"];break;default:
          e = ["(" + c + "|", ")?"];}return f + e[0] + b + e[1];
    }function h(e, f) {
      var g, h, i, j, k;return g = e[2] || e[3], k = b.params[g], i = a.substring(m, e.index), h = f ? e[4] : e[4] || ("*" == e[1] ? ".*" : null), h && (j = V.type(h) || d(V.type("string"), { pattern: new RegExp(h, b.caseInsensitive ? "i" : c) })), { id: g, regexp: h, segment: i, type: j, cfg: k };
    }b = S({ params: {} }, P(b) ? b : {});var i,
        j = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
        k = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
        l = "^",
        m = 0,
        n = this.segments = [],
        o = e ? e.params : {},
        p = this.params = e ? e.params.$$new() : new V.ParamSet(),
        q = [];this.source = a;for (var r, s, t; (i = j.exec(a)) && (r = h(i, !1), !(r.segment.indexOf("?") >= 0));) {
      s = f(r.id, r.type, r.cfg, "path"), l += g(r.segment, s.type.pattern.source, s.squash, s.isOptional), n.push(r.segment), m = j.lastIndex;
    }t = a.substring(m);var u = t.indexOf("?");if (u >= 0) {
      var v = this.sourceSearch = t.substring(u);if (t = t.substring(0, u), this.sourcePath = a.substring(0, m + u), v.length > 0) for (m = 0; i = k.exec(v);) {
        r = h(i, !0), s = f(r.id, r.type, r.cfg, "search"), m = j.lastIndex;
      }
    } else this.sourcePath = a, this.sourceSearch = "";l += g(t) + (b.strict === !1 ? "/?" : "") + "$", n.push(t), this.regexp = new RegExp(l, b.caseInsensitive ? "i" : c), this.prefix = n[0], this.$$paramNames = q;
  }function t(a) {
    S(this, a);
  }function u() {
    function a(a) {
      return null != a ? a.toString().replace(/(~|\/)/g, function (a) {
        return { "~": "~~", "/": "~2F" }[a];
      }) : a;
    }function e(a) {
      return null != a ? a.toString().replace(/(~~|~2F)/g, function (a) {
        return { "~~": "~", "~2F": "/" }[a];
      }) : a;
    }function f() {
      return { strict: p, caseInsensitive: m };
    }function i(a) {
      return N(a) || Q(a) && N(a[a.length - 1]);
    }function j() {
      for (; w.length;) {
        var a = w.shift();if (a.pattern) throw new Error("You cannot override a type's .pattern at runtime.");b.extend(r[a.name], l.invoke(a.def));
      }
    }function k(a) {
      S(this, a || {});
    }V = this;var l,
        m = !1,
        p = !0,
        q = !1,
        r = {},
        v = !0,
        w = [],
        x = { string: { encode: a, decode: e, is: function is(a) {
          return null == a || !M(a) || "string" == typeof a;
        }, pattern: /[^\/]*/ }, int: { encode: a, decode: function decode(a) {
          return parseInt(a, 10);
        }, is: function is(a) {
          return M(a) && this.decode(a.toString()) === a;
        }, pattern: /\d+/ }, bool: { encode: function encode(a) {
          return a ? 1 : 0;
        }, decode: function decode(a) {
          return 0 !== parseInt(a, 10);
        }, is: function is(a) {
          return a === !0 || a === !1;
        }, pattern: /0|1/ }, date: { encode: function encode(a) {
          return this.is(a) ? [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("-") : c;
        }, decode: function decode(a) {
          if (this.is(a)) return a;var b = this.capture.exec(a);return b ? new Date(b[1], b[2] - 1, b[3]) : c;
        }, is: function is(a) {
          return a instanceof Date && !isNaN(a.valueOf());
        }, equals: function equals(a, b) {
          return this.is(a) && this.is(b) && a.toISOString() === b.toISOString();
        }, pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/, capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/ }, json: { encode: b.toJson, decode: b.fromJson, is: b.isObject, equals: b.equals, pattern: /[^\/]*/ }, any: { encode: b.identity, decode: b.identity, equals: b.equals, pattern: /.*/ } };u.$$getDefaultValue = function (a) {
      if (!i(a.value)) return a.value;if (!l) throw new Error("Injectable functions cannot be called at configuration time");return l.invoke(a.value);
    }, this.caseInsensitive = function (a) {
      return M(a) && (m = a), m;
    }, this.strictMode = function (a) {
      return M(a) && (p = a), p;
    }, this.defaultSquashPolicy = function (a) {
      if (!M(a)) return q;if (a !== !0 && a !== !1 && !O(a)) throw new Error("Invalid squash policy: " + a + ". Valid policies: false, true, arbitrary-string");return q = a, a;
    }, this.compile = function (a, b) {
      return new s(a, S(f(), b));
    }, this.isMatcher = function (a) {
      if (!P(a)) return !1;var b = !0;return R(s.prototype, function (c, d) {
        N(c) && (b = b && M(a[d]) && N(a[d]));
      }), b;
    }, this.type = function (a, b, c) {
      if (!M(b)) return r[a];if (r.hasOwnProperty(a)) throw new Error("A type named '" + a + "' has already been defined.");return r[a] = new t(S({ name: a }, b)), c && (w.push({ name: a, def: c }), v || j()), this;
    }, R(x, function (a, b) {
      r[b] = new t(S({ name: b }, a));
    }), r = d(r, {}), this.$get = ["$injector", function (a) {
      return l = a, v = !1, j(), R(x, function (a, b) {
        r[b] || (r[b] = new t(a));
      }), this;
    }], this.Param = function (a, d, e, f) {
      function j(a) {
        var b = P(a) ? g(a) : [],
            c = h(b, "value") === -1 && h(b, "type") === -1 && h(b, "squash") === -1 && h(b, "array") === -1;return c && (a = { value: a }), a.$$fn = i(a.value) ? a.value : function () {
          return a.value;
        }, a;
      }function k(c, d, e) {
        if (c.type && d) throw new Error("Param '" + a + "' has two type configurations.");return d ? d : c.type ? b.isString(c.type) ? r[c.type] : c.type instanceof t ? c.type : new t(c.type) : "config" === e ? r.any : r.string;
      }function m() {
        var b = { array: "search" === f && "auto" },
            c = a.match(/\[\]$/) ? { array: !0 } : {};return S(b, c, e).array;
      }function p(a, b) {
        var c = a.squash;if (!b || c === !1) return !1;if (!M(c) || null == c) return q;if (c === !0 || O(c)) return c;throw new Error("Invalid squash policy: '" + c + "'. Valid policies: false, true, or arbitrary string");
      }function s(a, b, d, e) {
        var f,
            g,
            i = [{ from: "", to: d || b ? c : "" }, { from: null, to: d || b ? c : "" }];return f = Q(a.replace) ? a.replace : [], O(e) && f.push({ from: e, to: c }), g = o(f, function (a) {
          return a.from;
        }), n(i, function (a) {
          return h(g, a.from) === -1;
        }).concat(f);
      }function u() {
        if (!l) throw new Error("Injectable functions cannot be called at configuration time");var a = l.invoke(e.$$fn);if (null !== a && a !== c && !x.type.is(a)) throw new Error("Default value (" + a + ") for parameter '" + x.id + "' is not an instance of Type (" + x.type.name + ")");return a;
      }function v(a) {
        function b(a) {
          return function (b) {
            return b.from === a;
          };
        }function c(a) {
          var c = o(n(x.replace, b(a)), function (a) {
            return a.to;
          });return c.length ? c[0] : a;
        }return a = c(a), M(a) ? x.type.$normalize(a) : u();
      }function w() {
        return "{Param:" + a + " " + d + " squash: '" + A + "' optional: " + z + "}";
      }var x = this;e = j(e), d = k(e, d, f);var y = m();d = y ? d.$asArray(y, "search" === f) : d, "string" !== d.name || y || "path" !== f || e.value !== c || (e.value = "");var z = e.value !== c,
          A = p(e, z),
          B = s(e, y, z, A);S(this, { id: a, type: d, location: f, array: y, squash: A, replace: B, isOptional: z, value: v, dynamic: c, config: e, toString: w });
    }, k.prototype = { $$new: function $$new() {
        return d(this, S(new k(), { $$parent: this }));
      }, $$keys: function $$keys() {
        for (var a = [], b = [], c = this, d = g(k.prototype); c;) {
          b.push(c), c = c.$$parent;
        }return b.reverse(), R(b, function (b) {
          R(g(b), function (b) {
            h(a, b) === -1 && h(d, b) === -1 && a.push(b);
          });
        }), a;
      }, $$values: function $$values(a) {
        var b = {},
            c = this;return R(c.$$keys(), function (d) {
          b[d] = c[d].value(a && a[d]);
        }), b;
      }, $$equals: function $$equals(a, b) {
        var c = !0,
            d = this;return R(d.$$keys(), function (e) {
          var f = a && a[e],
              g = b && b[e];d[e].type.equals(f, g) || (c = !1);
        }), c;
      }, $$validates: function $$validates(a) {
        var d,
            e,
            f,
            g,
            h,
            i = this.$$keys();for (d = 0; d < i.length && (e = this[i[d]], f = a[i[d]], f !== c && null !== f || !e.isOptional); d++) {
          if (g = e.type.$normalize(f), !e.type.is(g)) return !1;if (h = e.type.encode(g), b.isString(h) && !e.type.pattern.exec(h)) return !1;
        }return !0;
      }, $$parent: c }, this.ParamSet = k;
  }function v(a, d) {
    function e(a) {
      var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null != b ? b[1].replace(/\\(.)/g, "$1") : "";
    }function f(a, b) {
      return a.replace(/\$(\$|\d{1,2})/, function (a, c) {
        return b["$" === c ? 0 : Number(c)];
      });
    }function g(a, b, c) {
      if (!c) return !1;var d = a.invoke(b, b, { $match: c });return !M(d) || d;
    }function h(d, e, f, g, h) {
      function m(a, b, c) {
        return "/" === q ? a : b ? q.slice(0, -1) + a : c ? q.slice(1) + a : a;
      }function n(a) {
        function b(a) {
          var b = a(f, d);return !!b && (O(b) && d.replace().url(b), !0);
        }if (!a || !a.defaultPrevented) {
          p && d.url() === p;p = c;var e,
              g = j.length;for (e = 0; e < g; e++) {
            if (b(j[e])) return;
          }k && b(k);
        }
      }function o() {
        return i = i || e.$on("$locationChangeSuccess", n);
      }var p,
          q = g.baseHref(),
          r = d.url();return l || o(), { sync: function sync() {
          n();
        }, listen: function listen() {
          return o();
        }, update: function update(a) {
          return a ? void (r = d.url()) : void (d.url() !== r && (d.url(r), d.replace()));
        }, push: function push(a, b, e) {
          var f = a.format(b || {});null !== f && b && b["#"] && (f += "#" + b["#"]), d.url(f), p = e && e.$$avoidResync ? d.url() : c, e && e.replace && d.replace();
        }, href: function href(c, e, f) {
          if (!c.validates(e)) return null;var g = a.html5Mode();b.isObject(g) && (g = g.enabled), g = g && h.history;var i = c.format(e);if (f = f || {}, g || null === i || (i = "#" + a.hashPrefix() + i), null !== i && e && e["#"] && (i += "#" + e["#"]), i = m(i, g, f.absolute), !f.absolute || !i) return i;var j = !g && i ? "/" : "",
              k = d.port();return k = 80 === k || 443 === k ? "" : ":" + k, [d.protocol(), "://", d.host(), k, j, i].join("");
        } };
    }var i,
        j = [],
        k = null,
        l = !1;this.rule = function (a) {
      if (!N(a)) throw new Error("'rule' must be a function");return j.push(a), this;
    }, this.otherwise = function (a) {
      if (O(a)) {
        var b = a;a = function a() {
          return b;
        };
      } else if (!N(a)) throw new Error("'rule' must be a function");return k = a, this;
    }, this.when = function (a, b) {
      var c,
          h = O(b);if (O(a) && (a = d.compile(a)), !h && !N(b) && !Q(b)) throw new Error("invalid 'handler' in when()");var i = { matcher: function matcher(a, b) {
          return h && (c = d.compile(b), b = ["$match", function (a) {
            return c.format(a);
          }]), S(function (c, d) {
            return g(c, b, a.exec(d.path(), d.search()));
          }, { prefix: O(a.prefix) ? a.prefix : "" });
        }, regex: function regex(a, b) {
          if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");return h && (c = b, b = ["$match", function (a) {
            return f(c, a);
          }]), S(function (c, d) {
            return g(c, b, a.exec(d.path()));
          }, { prefix: e(a) });
        } },
          j = { matcher: d.isMatcher(a), regex: a instanceof RegExp };for (var k in j) {
        if (j[k]) return this.rule(i[k](a, b));
      }throw new Error("invalid 'what' in when()");
    }, this.deferIntercept = function (a) {
      a === c && (a = !0), l = a;
    }, this.$get = h, h.$inject = ["$location", "$rootScope", "$injector", "$browser", "$sniffer"];
  }function w(a, e) {
    function f(a) {
      return 0 === a.indexOf(".") || 0 === a.indexOf("^");
    }function m(a, b) {
      if (!a) return c;var d = O(a),
          e = d ? a : a.name,
          g = f(e);if (g) {
        if (!b) throw new Error("No reference point given for path '" + e + "'");b = m(b);for (var h = e.split("."), i = 0, j = h.length, k = b; i < j; i++) {
          if ("" !== h[i] || 0 !== i) {
            if ("^" !== h[i]) break;if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");k = k.parent;
          } else k = b;
        }h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h;
      }var l = A[e];return !l || !d && (d || l !== a && l.self !== a) ? c : l;
    }function n(a, b) {
      B[a] || (B[a] = []), B[a].push(b);
    }function q(a) {
      for (var b = B[a] || []; b.length;) {
        r(b.shift());
      }
    }function r(b) {
      b = d(b, { self: b, resolve: b.resolve || {}, toString: function toString() {
          return this.name;
        } });var c = b.name;if (!O(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");if (A.hasOwnProperty(c)) throw new Error("State '" + c + "' is already defined");var e = c.indexOf(".") !== -1 ? c.substring(0, c.lastIndexOf(".")) : O(b.parent) ? b.parent : P(b.parent) && O(b.parent.name) ? b.parent.name : "";if (e && !A[e]) return n(e, b.self);for (var f in D) {
        N(D[f]) && (b[f] = D[f](b, D.$delegates[f]));
      }return A[c] = b, !b[C] && b.url && a.when(b.url, ["$match", "$stateParams", function (a, c) {
        z.$current.navigable == b && j(a, c) || z.transitionTo(b, a, { inherit: !0, location: !1 });
      }]), q(c), b;
    }function s(a) {
      return a.indexOf("*") > -1;
    }function t(a) {
      for (var b = a.split("."), c = z.$current.name.split("."), d = 0, e = b.length; d < e; d++) {
        "*" === b[d] && (c[d] = "*");
      }return "**" === b[0] && (c = c.slice(h(c, b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length == c.length && c.join("") === b.join("");
    }function u(a, b) {
      return O(a) && !M(b) ? D[a] : N(b) && O(a) ? (D[a] && !D.$delegates[a] && (D.$delegates[a] = D[a]), D[a] = b, this) : this;
    }function v(a, b) {
      return P(a) ? b = a : b.name = a, r(b), this;
    }function w(a, e, f, h, l, n, q, r, u) {
      function v(b, c, d, f) {
        var g = a.$broadcast("$stateNotFound", b, c, d);if (g.defaultPrevented) return q.update(), F;if (!g.retry) return null;if (f.$retry) return q.update(), G;var h = z.transition = e.when(g.retry);return h.then(function () {
          return h !== z.transition ? (a.$broadcast("$stateChangeCancel", b.to, b.toParams, c, d), D) : (b.options.$retry = !0, z.transitionTo(b.to, b.toParams, b.options));
        }, function () {
          return F;
        }), q.update(), h;
      }function w(a, c, d, g, i, j) {
        function m() {
          var c = [];return R(a.views, function (d, e) {
            var g = d.resolve && d.resolve !== a.resolve ? d.resolve : {};g.$template = [function () {
              return f.load(e, { view: d, locals: i.globals, params: n, notify: j.notify }) || "";
            }], c.push(l.resolve(g, i.globals, i.resolve, a).then(function (c) {
              if (N(d.controllerProvider) || Q(d.controllerProvider)) {
                var f = b.extend({}, g, i.globals);c.$$controller = h.invoke(d.controllerProvider, null, f);
              } else c.$$controller = d.controller;c.$$state = a, c.$$controllerAs = d.controllerAs, c.$$resolveAs = d.resolveAs, i[e] = c;
            }));
          }), e.all(c).then(function () {
            return i.globals;
          });
        }var n = d ? c : k(a.params.$$keys(), c),
            o = { $stateParams: n };i.resolve = l.resolve(a.resolve, o, i.resolve, a);var p = [i.resolve.then(function (a) {
          i.globals = a;
        })];return g && p.push(g), e.all(p).then(m).then(function (a) {
          return i;
        });
      }var B = new Error("transition superseded"),
          D = p(e.reject(B)),
          E = p(e.reject(new Error("transition prevented"))),
          F = p(e.reject(new Error("transition aborted"))),
          G = p(e.reject(new Error("transition failed")));return y.locals = { resolve: null, globals: { $stateParams: {} } }, z = { params: {}, current: y.self, $current: y, transition: null }, z.reload = function (a) {
        return z.transitionTo(z.current, n, { reload: a || !0, inherit: !1, notify: !0 });
      }, z.go = function (a, b, c) {
        return z.transitionTo(a, b, S({ inherit: !0, relative: z.$current }, c));
      }, z.transitionTo = function (b, c, f) {
        c = c || {}, f = S({ location: !0, inherit: !1, relative: null, notify: !0, reload: !1, $retry: !1 }, f || {});var g,
            j = z.$current,
            l = z.params,
            o = j.path,
            p = m(b, f.relative),
            r = c["#"];if (!M(p)) {
          var s = { to: b, toParams: c, options: f },
              t = v(s, j.self, l, f);if (t) return t;if (b = s.to, c = s.toParams, f = s.options, p = m(b, f.relative), !M(p)) {
            if (!f.relative) throw new Error("No such state '" + b + "'");throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'");
          }
        }if (p[C]) throw new Error("Cannot transition to abstract state '" + b + "'");if (f.inherit && (c = i(n, c || {}, z.$current, p)), !p.params.$$validates(c)) return G;c = p.params.$$values(c), b = p;var u = b.path,
            A = 0,
            F = u[A],
            H = y.locals,
            I = [];if (f.reload) {
          if (O(f.reload) || P(f.reload)) {
            if (P(f.reload) && !f.reload.name) throw new Error("Invalid reload state object");var J = f.reload === !0 ? o[0] : m(f.reload);if (f.reload && !J) throw new Error("No such reload state '" + (O(f.reload) ? f.reload : f.reload.name) + "'");for (; F && F === o[A] && F !== J;) {
              H = I[A] = F.locals, A++, F = u[A];
            }
          }
        } else for (; F && F === o[A] && F.ownParams.$$equals(c, l);) {
          H = I[A] = F.locals, A++, F = u[A];
        }if (x(b, c, j, l, H, f)) return r && (c["#"] = r), z.params = c, T(z.params, n), T(k(b.params.$$keys(), n), b.locals.globals.$stateParams), f.location && b.navigable && b.navigable.url && (q.push(b.navigable.url, c, { $$avoidResync: !0, replace: "replace" === f.location }), q.update(!0)), z.transition = null, e.when(z.current);if (c = k(b.params.$$keys(), c || {}), r && (c["#"] = r), f.notify && a.$broadcast("$stateChangeStart", b.self, c, j.self, l, f).defaultPrevented) return a.$broadcast("$stateChangeCancel", b.self, c, j.self, l), null == z.transition && q.update(), E;for (var K = e.when(H), L = A; L < u.length; L++, F = u[L]) {
          H = I[L] = d(H), K = w(F, c, F === b, K, H, f);
        }var N = z.transition = K.then(function () {
          var d, e, g;if (z.transition !== N) return a.$broadcast("$stateChangeCancel", b.self, c, j.self, l), D;for (d = o.length - 1; d >= A; d--) {
            g = o[d], g.self.onExit && h.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
          }for (d = A; d < u.length; d++) {
            e = u[d], e.locals = I[d], e.self.onEnter && h.invoke(e.self.onEnter, e.self, e.locals.globals);
          }return z.transition !== N ? (a.$broadcast("$stateChangeCancel", b.self, c, j.self, l), D) : (z.$current = b, z.current = b.self, z.params = c, T(z.params, n), z.transition = null, f.location && b.navigable && q.push(b.navigable.url, b.navigable.locals.globals.$stateParams, { $$avoidResync: !0, replace: "replace" === f.location }), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, j.self, l), q.update(!0), z.current);
        }).then(null, function (d) {
          return d === B ? D : z.transition !== N ? (a.$broadcast("$stateChangeCancel", b.self, c, j.self, l), D) : (z.transition = null, g = a.$broadcast("$stateChangeError", b.self, c, j.self, l, d), g.defaultPrevented || q.update(), e.reject(d));
        });return N;
      }, z.is = function (a, b, d) {
        d = S({ relative: z.$current }, d || {});var e = m(a, d.relative);return M(e) ? z.$current === e && (!b || j(e.params.$$values(b), n)) : c;
      }, z.includes = function (a, b, d) {
        if (d = S({ relative: z.$current }, d || {}), O(a) && s(a)) {
          if (!t(a)) return !1;a = z.$current.name;
        }var e = m(a, d.relative);if (!M(e)) return c;if (!M(z.$current.includes[e.name])) return !1;if (!b) return !0;for (var f = g(b), h = 0; h < f.length; h++) {
          var i = f[h],
              j = e.params[i];if (j && !j.type.equals(n[i], b[i])) return !1;
        }return !0;
      }, z.href = function (a, b, d) {
        d = S({ lossy: !0, inherit: !0, absolute: !1, relative: z.$current }, d || {});var e = m(a, d.relative);if (!M(e)) return null;d.inherit && (b = i(n, b || {}, z.$current, e));var f = e && d.lossy ? e.navigable : e;return f && f.url !== c && null !== f.url ? q.href(f.url, k(e.params.$$keys().concat("#"), b || {}), { absolute: d.absolute }) : null;
      }, z.get = function (a, b) {
        if (0 === arguments.length) return o(g(A), function (a) {
          return A[a].self;
        });var c = m(a, b || z.$current);return c && c.self ? c.self : null;
      }, z;
    }function x(a, b, c, d, e, f) {
      function g(a, b, c) {
        function d(b) {
          return "search" != a.params[b].location;
        }var e = a.params.$$keys().filter(d),
            f = l.apply({}, [a.params].concat(e)),
            g = new V.ParamSet(f);return g.$$equals(b, c);
      }if (!f.reload && a === c && (e === c.locals || a.self.reloadOnSearch === !1 && g(c, d, b))) return !0;
    }var y,
        z,
        A = {},
        B = {},
        C = "abstract",
        D = { parent: function parent(a) {
        if (M(a.parent) && a.parent) return m(a.parent);var b = /^(.+)\.[^.]+$/.exec(a.name);return b ? m(b[1]) : y;
      }, data: function data(a) {
        return a.parent && a.parent.data && (a.data = a.self.data = d(a.parent.data, a.data)), a.data;
      }, url: function url(a) {
        var b = a.url,
            c = { params: a.params || {} };if (O(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || y).url.concat(b, c);if (!b || e.isMatcher(b)) return b;throw new Error("Invalid url '" + b + "' in state '" + a + "'");
      }, navigable: function navigable(a) {
        return a.url ? a : a.parent ? a.parent.navigable : null;
      }, ownParams: function ownParams(a) {
        var b = a.url && a.url.params || new V.ParamSet();return R(a.params || {}, function (a, c) {
          b[c] || (b[c] = new V.Param(c, null, a, "config"));
        }), b;
      }, params: function params(a) {
        var b = l(a.ownParams, a.ownParams.$$keys());return a.parent && a.parent.params ? S(a.parent.params.$$new(), b) : new V.ParamSet();
      }, views: function views(a) {
        var b = {};return R(M(a.views) ? a.views : { "": a }, function (c, d) {
          d.indexOf("@") < 0 && (d += "@" + a.parent.name), c.resolveAs = c.resolveAs || a.resolveAs || "$resolve", b[d] = c;
        }), b;
      }, path: function path(a) {
        return a.parent ? a.parent.path.concat(a) : [];
      }, includes: function includes(a) {
        var b = a.parent ? S({}, a.parent.includes) : {};return b[a.name] = !0, b;
      }, $delegates: {} };y = r({ name: "", url: "^", views: null, abstract: !0 }), y.navigable = null, this.decorator = u, this.state = v, this.$get = w, w.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory"];
  }function x() {
    function a(a, b) {
      return { load: function load(a, c) {
          var d,
              e = { template: null, controller: null, view: null, locals: null, notify: !0, async: !0, params: {} };return c = S(e, c), c.view && (d = b.fromConfig(c.view, c.params, c.locals)), d;
        } };
    }this.$get = a, a.$inject = ["$rootScope", "$templateFactory"];
  }function y() {
    var a = !1;this.useAnchorScroll = function () {
      a = !0;
    }, this.$get = ["$anchorScroll", "$timeout", function (b, c) {
      return a ? b : function (a) {
        return c(function () {
          a[0].scrollIntoView();
        }, 0, !1);
      };
    }];
  }function z(a, c, d, e, f) {
    function g() {
      return c.has ? function (a) {
        return c.has(a) ? c.get(a) : null;
      } : function (a) {
        try {
          return c.get(a);
        } catch (a) {
          return null;
        }
      };
    }function h(a, c) {
      var d = function d() {
        return { enter: function enter(a, b, c) {
            b.after(a), c();
          }, leave: function leave(a, b) {
            a.remove(), b();
          } };
      };if (k) return { enter: function enter(a, c, d) {
          b.version.minor > 2 ? k.enter(a, null, c).then(d) : k.enter(a, null, c, d);
        }, leave: function leave(a, c) {
          b.version.minor > 2 ? k.leave(a).then(c) : k.leave(a, c);
        } };if (j) {
        var e = j && j(c, a);return { enter: function enter(a, b, c) {
            e.enter(a, null, b), c();
          }, leave: function leave(a, b) {
            e.leave(a), b();
          } };
      }return d();
    }var i = g(),
        j = i("$animator"),
        k = i("$animate"),
        l = { restrict: "ECA", terminal: !0, priority: 400, transclude: "element", compile: function compile(c, g, i) {
        return function (c, g, j) {
          function k() {
            if (m && (m.remove(), m = null), o && (o.$destroy(), o = null), n) {
              var a = n.data("$uiViewAnim");s.leave(n, function () {
                a.$$animLeave.resolve(), m = null;
              }), m = n, n = null;
            }
          }function l(h) {
            var l,
                m = B(c, j, g, e),
                t = m && a.$current && a.$current.locals[m];if (h || t !== p) {
              l = c.$new(), p = a.$current.locals[m], l.$emit("$viewContentLoading", m);var u = i(l, function (a) {
                var e = f.defer(),
                    h = f.defer(),
                    i = { $animEnter: e.promise, $animLeave: h.promise, $$animLeave: h };a.data("$uiViewAnim", i), s.enter(a, g, function () {
                  e.resolve(), o && o.$emit("$viewContentAnimationEnded"), (b.isDefined(r) && !r || c.$eval(r)) && d(a);
                }), k();
              });n = u, o = l, o.$emit("$viewContentLoaded", m), o.$eval(q);
            }
          }var m,
              n,
              o,
              p,
              q = j.onload || "",
              r = j.autoscroll,
              s = h(j, c);g.inheritedData("$uiView");c.$on("$stateChangeSuccess", function () {
            l(!1);
          }), l(!0);
        };
      } };return l;
  }function A(a, c, d, e) {
    return { restrict: "ECA", priority: -400, compile: function compile(f) {
        var g = f.html();return function (f, h, i) {
          var j = d.$current,
              k = B(f, i, h, e),
              l = j && j.locals[k];if (l) {
            h.data("$uiView", { name: k, state: l.$$state }), h.html(l.$template ? l.$template : g);var m = b.extend({}, l);f[l.$$resolveAs] = m;var n = a(h.contents());if (l.$$controller) {
              l.$scope = f, l.$element = h;var o = c(l.$$controller, l);l.$$controllerAs && (f[l.$$controllerAs] = o, f[l.$$controllerAs][l.$$resolveAs] = m), N(o.$onInit) && o.$onInit(), h.data("$ngControllerController", o), h.children().data("$ngControllerController", o);
            }n(f);
          }
        };
      } };
  }function B(a, b, c, d) {
    var e = d(b.uiView || b.name || "")(a),
        f = c.inheritedData("$uiView");return e.indexOf("@") >= 0 ? e : e + "@" + (f ? f.state.name : "");
  }function C(a, b) {
    var c,
        d = a.match(/^\s*({[^}]*})\s*$/);if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length) throw new Error("Invalid state ref '" + a + "'");return { state: c[1], paramExpr: c[3] || null };
  }function D(a) {
    var b = a.parent().inheritedData("$uiView");if (b && b.state && b.state.name) return b.state;
  }function E(a) {
    var b = "[object SVGAnimatedString]" === Object.prototype.toString.call(a.prop("href")),
        c = "FORM" === a[0].nodeName;return { attr: c ? "action" : b ? "xlink:href" : "href", isAnchor: "A" === a.prop("tagName").toUpperCase(), clickable: !c };
  }function F(a, b, c, d, e) {
    return function (f) {
      var g = f.which || f.button,
          h = e();if (!(g > 1 || f.ctrlKey || f.metaKey || f.shiftKey || a.attr("target"))) {
        var i = c(function () {
          b.go(h.state, h.params, h.options);
        });f.preventDefault();var j = d.isAnchor && !h.href ? 1 : 0;f.preventDefault = function () {
          j-- <= 0 && c.cancel(i);
        };
      }
    };
  }function G(a, b) {
    return { relative: D(a) || b.$current, inherit: !0 };
  }function H(a, c) {
    return { restrict: "A", require: ["?^uiSrefActive", "?^uiSrefActiveEq"], link: function link(d, e, f, g) {
        var h,
            i = C(f.uiSref, a.current.name),
            j = { state: i.state, href: null, params: null },
            k = E(e),
            l = g[1] || g[0],
            m = null;j.options = S(G(e, a), f.uiSrefOpts ? d.$eval(f.uiSrefOpts) : {});var n = function n(c) {
          c && (j.params = b.copy(c)), j.href = a.href(i.state, j.params, j.options), m && m(), l && (m = l.$$addStateInfo(i.state, j.params)), null !== j.href && f.$set(k.attr, j.href);
        };i.paramExpr && (d.$watch(i.paramExpr, function (a) {
          a !== j.params && n(a);
        }, !0), j.params = b.copy(d.$eval(i.paramExpr))), n(), k.clickable && (h = F(e, a, c, k, function () {
          return j;
        }), e[e.on ? "on" : "bind"]("click", h), d.$on("$destroy", function () {
          e[e.off ? "off" : "unbind"]("click", h);
        }));
      } };
  }function I(a, b) {
    return { restrict: "A", require: ["?^uiSrefActive", "?^uiSrefActiveEq"], link: function link(c, d, e, f) {
        function g(b) {
          m.state = b[0], m.params = b[1], m.options = b[2], m.href = a.href(m.state, m.params, m.options), n && n(), j && (n = j.$$addStateInfo(m.state, m.params)), m.href && e.$set(i.attr, m.href);
        }var h,
            i = E(d),
            j = f[1] || f[0],
            k = [e.uiState, e.uiStateParams || null, e.uiStateOpts || null],
            l = "[" + k.map(function (a) {
          return a || "null";
        }).join(", ") + "]",
            m = { state: null, params: null, options: null, href: null },
            n = null;c.$watch(l, g, !0), g(c.$eval(l)), i.clickable && (h = F(d, a, b, i, function () {
          return m;
        }), d[d.on ? "on" : "bind"]("click", h), c.$on("$destroy", function () {
          d[d.off ? "off" : "unbind"]("click", h);
        }));
      } };
  }function J(a, b, c) {
    return { restrict: "A", controller: ["$scope", "$element", "$attrs", "$timeout", function (b, d, e, f) {
        function g(b, c, e) {
          var f = a.get(b, D(d)),
              g = h(b, c),
              i = { state: f || { name: b }, params: c, hash: g };return p.push(i), q[g] = e, function () {
            var a = p.indexOf(i);a !== -1 && p.splice(a, 1);
          };
        }function h(a, c) {
          if (!O(a)) throw new Error("state should be a string");return P(c) ? a + U(c) : (c = b.$eval(c), P(c) ? a + U(c) : a);
        }function i() {
          for (var a = 0; a < p.length; a++) {
            l(p[a].state, p[a].params) ? j(d, q[p[a].hash]) : k(d, q[p[a].hash]), m(p[a].state, p[a].params) ? j(d, n) : k(d, n);
          }
        }function j(a, b) {
          f(function () {
            a.addClass(b);
          });
        }function k(a, b) {
          a.removeClass(b);
        }function l(b, c) {
          return a.includes(b.name, c);
        }function m(b, c) {
          return a.is(b.name, c);
        }var n,
            o,
            p = [],
            q = {};n = c(e.uiSrefActiveEq || "", !1)(b);try {
          o = b.$eval(e.uiSrefActive);
        } catch (a) {}o = o || c(e.uiSrefActive || "", !1)(b), P(o) && R(o, function (c, d) {
          if (O(c)) {
            var e = C(c, a.current.name);g(e.state, b.$eval(e.paramExpr), d);
          }
        }), this.$$addStateInfo = function (a, b) {
          if (!(P(o) && p.length > 0)) {
            var c = g(a, b, o);return i(), c;
          }
        }, b.$on("$stateChangeSuccess", i), i();
      }] };
  }function K(a) {
    var b = function b(_b, c) {
      return a.is(_b, c);
    };return b.$stateful = !0, b;
  }function L(a) {
    var b = function b(_b2, c, d) {
      return a.includes(_b2, c, d);
    };return b.$stateful = !0, b;
  }var M = b.isDefined,
      N = b.isFunction,
      O = b.isString,
      P = b.isObject,
      Q = b.isArray,
      R = b.forEach,
      S = b.extend,
      T = b.copy,
      U = b.toJson;b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), q.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", q), r.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", r);var V;s.prototype.concat = function (a, b) {
    var c = { caseInsensitive: V.caseInsensitive(), strict: V.strictMode(), squash: V.defaultSquashPolicy() };return new s(this.sourcePath + a + this.sourceSearch, S(c, b), this);
  }, s.prototype.toString = function () {
    return this.source;
  }, s.prototype.exec = function (a, b) {
    function c(a) {
      function b(a) {
        return a.split("").reverse().join("");
      }function c(a) {
        return a.replace(/\\-/g, "-");
      }var d = b(a).split(/-(?!\\)/),
          e = o(d, b);return o(e, c).reverse();
    }var d = this.regexp.exec(a);if (!d) return null;b = b || {};var e,
        f,
        g,
        h = this.parameters(),
        i = h.length,
        j = this.segments.length - 1,
        k = {};if (j !== d.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");var l, m;for (e = 0; e < j; e++) {
      for (g = h[e], l = this.params[g], m = d[e + 1], f = 0; f < l.replace.length; f++) {
        l.replace[f].from === m && (m = l.replace[f].to);
      }m && l.array === !0 && (m = c(m)), M(m) && (m = l.type.decode(m)), k[g] = l.value(m);
    }for (; e < i; e++) {
      for (g = h[e], k[g] = this.params[g].value(b[g]), l = this.params[g], m = b[g], f = 0; f < l.replace.length; f++) {
        l.replace[f].from === m && (m = l.replace[f].to);
      }M(m) && (m = l.type.decode(m)), k[g] = l.value(m);
    }return k;
  }, s.prototype.parameters = function (a) {
    return M(a) ? this.params[a] || null : this.$$paramNames;
  }, s.prototype.validates = function (a) {
    return this.params.$$validates(a);
  }, s.prototype.format = function (a) {
    function b(a) {
      return encodeURIComponent(a).replace(/-/g, function (a) {
        return "%5C%" + a.charCodeAt(0).toString(16).toUpperCase();
      });
    }a = a || {};var c = this.segments,
        d = this.parameters(),
        e = this.params;if (!this.validates(a)) return null;var f,
        g = !1,
        h = c.length - 1,
        i = d.length,
        j = c[0];for (f = 0; f < i; f++) {
      var k = f < h,
          l = d[f],
          m = e[l],
          n = m.value(a[l]),
          p = m.isOptional && m.type.equals(m.value(), n),
          q = !!p && m.squash,
          r = m.type.encode(n);if (k) {
        var s = c[f + 1],
            t = f + 1 === h;if (q === !1) null != r && (j += Q(r) ? o(r, b).join("-") : encodeURIComponent(r)), j += s;else if (q === !0) {
          var u = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;j += s.match(u)[1];
        } else O(q) && (j += q + s);t && m.squash === !0 && "/" === j.slice(-1) && (j = j.slice(0, -1));
      } else {
        if (null == r || p && q !== !1) continue;if (Q(r) || (r = [r]), 0 === r.length) continue;r = o(r, encodeURIComponent).join("&" + l + "="), j += (g ? "&" : "?") + (l + "=" + r), g = !0;
      }
    }return j;
  }, t.prototype.is = function (a, b) {
    return !0;
  }, t.prototype.encode = function (a, b) {
    return a;
  }, t.prototype.decode = function (a, b) {
    return a;
  }, t.prototype.equals = function (a, b) {
    return a == b;
  }, t.prototype.$subPattern = function () {
    var a = this.pattern.toString();return a.substr(1, a.length - 2);
  }, t.prototype.pattern = /.*/, t.prototype.toString = function () {
    return "{Type:" + this.name + "}";
  }, t.prototype.$normalize = function (a) {
    return this.is(a) ? a : this.decode(a);
  }, t.prototype.$asArray = function (a, b) {
    function d(a, b) {
      function d(a, b) {
        return function () {
          return a[b].apply(a, arguments);
        };
      }function e(a) {
        return Q(a) ? a : M(a) ? [a] : [];
      }function f(a) {
        switch (a.length) {case 0:
            return c;case 1:
            return "auto" === b ? a[0] : a;default:
            return a;}
      }function g(a) {
        return !a;
      }function h(a, b) {
        return function (c) {
          if (Q(c) && 0 === c.length) return c;c = e(c);var d = o(c, a);return b === !0 ? 0 === n(d, g).length : f(d);
        };
      }function i(a) {
        return function (b, c) {
          var d = e(b),
              f = e(c);if (d.length !== f.length) return !1;for (var g = 0; g < d.length; g++) {
            if (!a(d[g], f[g])) return !1;
          }return !0;
        };
      }this.encode = h(d(a, "encode")), this.decode = h(d(a, "decode")), this.is = h(d(a, "is"), !0), this.equals = i(d(a, "equals")), this.pattern = a.pattern, this.$normalize = h(d(a, "$normalize")), this.name = a.name, this.$arrayMode = b;
    }if (!a) return this;if ("auto" === a && !b) throw new Error("'auto' array mode is for query parameters only");return new d(this, a);
  }, b.module("ui.router.util").provider("$urlMatcherFactory", u), b.module("ui.router.util").run(["$urlMatcherFactory", function (a) {}]), v.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", v), w.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.state").factory("$stateParams", function () {
    return {};
  }).constant("$state.runtime", { autoinject: !0 }).provider("$state", w).run(["$injector", function (a) {
    a.get("$state.runtime").autoinject && a.get("$state");
  }]), x.$inject = [], b.module("ui.router.state").provider("$view", x), b.module("ui.router.state").provider("$uiViewScroll", y), z.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate", "$q"], A.$inject = ["$compile", "$controller", "$state", "$interpolate"], b.module("ui.router.state").directive("uiView", z), b.module("ui.router.state").directive("uiView", A), H.$inject = ["$state", "$timeout"], I.$inject = ["$state", "$timeout"], J.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", H).directive("uiSrefActive", J).directive("uiSrefActiveEq", J).directive("uiState", I), K.$inject = ["$state"], L.$inject = ["$state"], b.module("ui.router.state").filter("isState", K).filter("includedByState", L);
}(window, window.angular);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 AngularJS v1.5.9
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (B) {
  'use strict';
  function N(a) {
    return function () {
      var b = arguments[0],
          d;d = "[" + (a ? a + ":" : "") + b + "] http://errors.angularjs.org/1.5.9/" + (a ? a + "/" : "") + b;for (b = 1; b < arguments.length; b++) {
        d = d + (1 == b ? "?" : "&") + "p" + (b - 1) + "=";var c = encodeURIComponent,
            e;e = arguments[b];e = "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e;d += c(e);
      }return Error(d);
    };
  }function ra(a) {
    if (null == a || Xa(a)) return !1;if (K(a) || H(a) || E && a instanceof E) return !0;
    var b = "length" in Object(a) && a.length;return Z(b) && (0 <= b && (b - 1 in a || a instanceof Array) || "function" === typeof a.item);
  }function q(a, b, d) {
    var c, e;if (a) if (F(a)) for (c in a) {
      "prototype" === c || "length" === c || "name" === c || a.hasOwnProperty && !a.hasOwnProperty(c) || b.call(d, a[c], c, a);
    } else if (K(a) || ra(a)) {
      var f = "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a));c = 0;for (e = a.length; c < e; c++) {
        (f || c in a) && b.call(d, a[c], c, a);
      }
    } else if (a.forEach && a.forEach !== q) a.forEach(b, d, a);else if (zc(a)) for (c in a) {
      b.call(d, a[c], c, a);
    } else if ("function" === typeof a.hasOwnProperty) for (c in a) {
      a.hasOwnProperty(c) && b.call(d, a[c], c, a);
    } else for (c in a) {
      sa.call(a, c) && b.call(d, a[c], c, a);
    }return a;
  }function Ac(a, b, d) {
    for (var c = Object.keys(a).sort(), e = 0; e < c.length; e++) {
      b.call(d, a[c[e]], c[e]);
    }return c;
  }function Bc(a) {
    return function (b, d) {
      a(d, b);
    };
  }function me() {
    return ++sb;
  }function Sb(a, b, d) {
    for (var c = a.$$hashKey, e = 0, f = b.length; e < f; ++e) {
      var g = b[e];if (I(g) || F(g)) for (var h = Object.keys(g), k = 0, l = h.length; k < l; k++) {
        var m = h[k],
            n = g[m];d && I(n) ? ba(n) ? a[m] = new Date(n.valueOf()) : Ya(n) ? a[m] = new RegExp(n) : n.nodeName ? a[m] = n.cloneNode(!0) : Tb(n) ? a[m] = n.clone() : (I(a[m]) || (a[m] = K(n) ? [] : {}), Sb(a[m], [n], !0)) : a[m] = n;
      }
    }c ? a.$$hashKey = c : delete a.$$hashKey;return a;
  }function R(a) {
    return Sb(a, ta.call(arguments, 1), !1);
  }function ne(a) {
    return Sb(a, ta.call(arguments, 1), !0);
  }function aa(a) {
    return parseInt(a, 10);
  }function Ub(a, b) {
    return R(Object.create(a), b);
  }function C() {}function Za(a) {
    return a;
  }function ma(a) {
    return function () {
      return a;
    };
  }function Cc(a) {
    return F(a.toString) && a.toString !== na;
  }function z(a) {
    return "undefined" === typeof a;
  }function u(a) {
    return "undefined" !== typeof a;
  }function I(a) {
    return null !== a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a));
  }function zc(a) {
    return null !== a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && !Dc(a);
  }function H(a) {
    return "string" === typeof a;
  }function Z(a) {
    return "number" === typeof a;
  }function ba(a) {
    return "[object Date]" === na.call(a);
  }function F(a) {
    return "function" === typeof a;
  }function Ya(a) {
    return "[object RegExp]" === na.call(a);
  }function Xa(a) {
    return a && a.window === a;
  }function $a(a) {
    return a && a.$evalAsync && a.$watch;
  }function Ia(a) {
    return "boolean" === typeof a;
  }function oe(a) {
    return a && Z(a.length) && pe.test(na.call(a));
  }function Tb(a) {
    return !(!a || !(a.nodeName || a.prop && a.attr && a.find));
  }function qe(a) {
    var b = {};a = a.split(",");var d;for (d = 0; d < a.length; d++) {
      b[a[d]] = !0;
    }return b;
  }function ua(a) {
    return P(a.nodeName || a[0] && a[0].nodeName);
  }function ab(a, b) {
    var d = a.indexOf(b);0 <= d && a.splice(d, 1);return d;
  }function pa(a, b) {
    function d(a, b) {
      var d = b.$$hashKey,
          e;if (K(a)) {
        e = 0;for (var f = a.length; e < f; e++) {
          b.push(c(a[e]));
        }
      } else if (zc(a)) for (e in a) {
        b[e] = c(a[e]);
      } else if (a && "function" === typeof a.hasOwnProperty) for (e in a) {
        a.hasOwnProperty(e) && (b[e] = c(a[e]));
      } else for (e in a) {
        sa.call(a, e) && (b[e] = c(a[e]));
      }d ? b.$$hashKey = d : delete b.$$hashKey;return b;
    }function c(a) {
      if (!I(a)) return a;var b = f.indexOf(a);if (-1 !== b) return g[b];if (Xa(a) || $a(a)) throw va("cpws");var b = !1,
          c = e(a);void 0 === c && (c = K(a) ? [] : Object.create(Dc(a)), b = !0);f.push(a);g.push(c);return b ? d(a, c) : c;
    }function e(a) {
      switch (na.call(a)) {case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":
          return new a.constructor(c(a.buffer), a.byteOffset, a.length);case "[object ArrayBuffer]":
          if (!a.slice) {
            var b = new ArrayBuffer(a.byteLength);new Uint8Array(b).set(new Uint8Array(a));return b;
          }return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":
          return new a.constructor(a.valueOf());case "[object RegExp]":
          return b = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex, b;case "[object Blob]":
          return new a.constructor([a], { type: a.type });}if (F(a.cloneNode)) return a.cloneNode(!0);
    }
    var f = [],
        g = [];if (b) {
      if (oe(b) || "[object ArrayBuffer]" === na.call(b)) throw va("cpta");if (a === b) throw va("cpi");K(b) ? b.length = 0 : q(b, function (a, d) {
        "$$hashKey" !== d && delete b[d];
      });f.push(a);g.push(b);return d(a, b);
    }return c(a);
  }function oa(a, b) {
    if (a === b) return !0;if (null === a || null === b) return !1;if (a !== a && b !== b) return !0;var d = typeof a === "undefined" ? "undefined" : _typeof(a),
        c;if (d === (typeof b === "undefined" ? "undefined" : _typeof(b)) && "object" === d) if (K(a)) {
      if (!K(b)) return !1;if ((d = a.length) === b.length) {
        for (c = 0; c < d; c++) {
          if (!oa(a[c], b[c])) return !1;
        }return !0;
      }
    } else {
      if (ba(a)) return ba(b) ? oa(a.getTime(), b.getTime()) : !1;if (Ya(a)) return Ya(b) ? a.toString() === b.toString() : !1;if ($a(a) || $a(b) || Xa(a) || Xa(b) || K(b) || ba(b) || Ya(b)) return !1;d = S();for (c in a) {
        if ("$" !== c.charAt(0) && !F(a[c])) {
          if (!oa(a[c], b[c])) return !1;d[c] = !0;
        }
      }for (c in b) {
        if (!(c in d) && "$" !== c.charAt(0) && u(b[c]) && !F(b[c])) return !1;
      }return !0;
    }return !1;
  }function bb(a, b, d) {
    return a.concat(ta.call(b, d));
  }function cb(a, b) {
    var d = 2 < arguments.length ? ta.call(arguments, 2) : [];return !F(b) || b instanceof RegExp ? b : d.length ? function () {
      return arguments.length ? b.apply(a, bb(d, arguments, 0)) : b.apply(a, d);
    } : function () {
      return arguments.length ? b.apply(a, arguments) : b.call(a);
    };
  }function re(a, b) {
    var d = b;"string" === typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? d = void 0 : Xa(b) ? d = "$WINDOW" : b && B.document === b ? d = "$DOCUMENT" : $a(b) && (d = "$SCOPE");return d;
  }function db(a, b) {
    if (!z(a)) return Z(b) || (b = b ? 2 : null), JSON.stringify(a, re, b);
  }function Ec(a) {
    return H(a) ? JSON.parse(a) : a;
  }function Fc(a, b) {
    a = a.replace(se, "");var d = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6E4;return X(d) ? b : d;
  }function Vb(a, b, d) {
    d = d ? -1 : 1;var c = a.getTimezoneOffset();b = Fc(b, c);d *= b - c;a = new Date(a.getTime());a.setMinutes(a.getMinutes() + d);return a;
  }function wa(a) {
    a = E(a).clone();try {
      a.empty();
    } catch (b) {}var d = E("<div>").append(a).html();try {
      return a[0].nodeType === Ma ? P(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
        return "<" + P(b);
      });
    } catch (c) {
      return P(d);
    }
  }function Gc(a) {
    try {
      return decodeURIComponent(a);
    } catch (b) {}
  }function Hc(a) {
    var b = {};q((a || "").split("&"), function (a) {
      var c, e, f;a && (e = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (e = a.substring(0, c), f = a.substring(c + 1)), e = Gc(e), u(e) && (f = u(f) ? Gc(f) : !0, sa.call(b, e) ? K(b[e]) ? b[e].push(f) : b[e] = [b[e], f] : b[e] = f));
    });return b;
  }function Wb(a) {
    var b = [];q(a, function (a, c) {
      K(a) ? q(a, function (a) {
        b.push(ca(c, !0) + (!0 === a ? "" : "=" + ca(a, !0)));
      }) : b.push(ca(c, !0) + (!0 === a ? "" : "=" + ca(a, !0)));
    });return b.length ? b.join("&") : "";
  }function tb(a) {
    return ca(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
  }function ca(a, b) {
    return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+");
  }function te(a, b) {
    var d,
        c,
        e = Na.length;for (c = 0; c < e; ++c) {
      if (d = Na[c] + b, H(d = a.getAttribute(d))) return d;
    }return null;
  }function ue(a, b) {
    var d,
        c,
        e = {};q(Na, function (b) {
      b += "app";!d && a.hasAttribute && a.hasAttribute(b) && (d = a, c = a.getAttribute(b));
    });q(Na, function (b) {
      b += "app";var e;!d && (e = a.querySelector("[" + b.replace(":", "\\:") + "]")) && (d = e, c = e.getAttribute(b));
    });d && (ve ? (e.strictDi = null !== te(d, "strict-di"), b(d, c ? [c] : [], e)) : B.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match."));
  }function Ic(a, b, d) {
    I(d) || (d = {});d = R({ strictDi: !1 }, d);var c = function c() {
      a = E(a);if (a.injector()) {
        var c = a[0] === B.document ? "document" : wa(a);throw va("btstrpd", c.replace(/</, "&lt;").replace(/>/, "&gt;"));
      }b = b || [];b.unshift(["$provide", function (b) {
        b.value("$rootElement", a);
      }]);d.debugInfoEnabled && b.push(["$compileProvider", function (a) {
        a.debugInfoEnabled(!0);
      }]);
      b.unshift("ng");c = eb(b, d.strictDi);c.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function (a, b, c, d) {
        a.$apply(function () {
          b.data("$injector", d);c(b)(a);
        });
      }]);return c;
    },
        e = /^NG_ENABLE_DEBUG_INFO!/,
        f = /^NG_DEFER_BOOTSTRAP!/;B && e.test(B.name) && (d.debugInfoEnabled = !0, B.name = B.name.replace(e, ""));if (B && !f.test(B.name)) return c();B.name = B.name.replace(f, "");ga.resumeBootstrap = function (a) {
      q(a, function (a) {
        b.push(a);
      });return c();
    };F(ga.resumeDeferredBootstrap) && ga.resumeDeferredBootstrap();
  }function we() {
    B.name = "NG_ENABLE_DEBUG_INFO!" + B.name;B.location.reload();
  }function xe(a) {
    a = ga.element(a).injector();if (!a) throw va("test");return a.get("$$testability");
  }function Jc(a, b) {
    b = b || "_";return a.replace(ye, function (a, c) {
      return (c ? b : "") + a.toLowerCase();
    });
  }function ze() {
    var a;if (!Kc) {
      var b = ub();(xa = z(b) ? B.jQuery : b ? B[b] : void 0) && xa.fn.on ? (E = xa, R(xa.fn, { scope: Oa.scope, isolateScope: Oa.isolateScope, controller: Oa.controller, injector: Oa.injector, inheritedData: Oa.inheritedData }), a = xa.cleanData, xa.cleanData = function (b) {
        for (var c, e = 0, f; null != (f = b[e]); e++) {
          (c = xa._data(f, "events")) && c.$destroy && xa(f).triggerHandler("$destroy");
        }a(b);
      }) : E = T;ga.element = E;Kc = !0;
    }
  }function vb(a, b, d) {
    if (!a) throw va("areq", b || "?", d || "required");return a;
  }function Pa(a, b, d) {
    d && K(a) && (a = a[a.length - 1]);vb(F(a), b, "not a function, got " + (a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) ? a.constructor.name || "Object" : typeof a === "undefined" ? "undefined" : _typeof(a)));return a;
  }function Qa(a, b) {
    if ("hasOwnProperty" === a) throw va("badname", b);
  }function Lc(a, b, d) {
    if (!b) return a;b = b.split(".");for (var c, e = a, f = b.length, g = 0; g < f; g++) {
      c = b[g], a && (a = (e = a)[c]);
    }return !d && F(a) ? cb(e, a) : a;
  }function wb(a) {
    for (var b = a[0], d = a[a.length - 1], c, e = 1; b !== d && (b = b.nextSibling); e++) {
      if (c || a[e] !== b) c || (c = E(ta.call(a, 0, e))), c.push(b);
    }return c || a;
  }function S() {
    return Object.create(null);
  }function Ae(a) {
    function b(a, b, c) {
      return a[b] || (a[b] = c());
    }var d = N("$injector"),
        c = N("ng");a = b(a, "angular", Object);a.$$minErr = a.$$minErr || N;return b(a, "module", function () {
      var a = {};return function (f, g, h) {
        if ("hasOwnProperty" === f) throw c("badname", "module");g && a.hasOwnProperty(f) && (a[f] = null);return b(a, f, function () {
          function a(b, d, e, f) {
            f || (f = c);return function () {
              f[e || "push"]([b, d, arguments]);return J;
            };
          }function b(a, d) {
            return function (b, e) {
              e && F(e) && (e.$$moduleName = f);c.push([a, d, arguments]);return J;
            };
          }if (!g) throw d("nomod", f);var c = [],
              e = [],
              p = [],
              x = a("$injector", "invoke", "push", e),
              J = { _invokeQueue: c, _configBlocks: e, _runBlocks: p, requires: g, name: f, provider: b("$provide", "provider"), factory: b("$provide", "factory"), service: b("$provide", "service"), value: a("$provide", "value"), constant: a("$provide", "constant", "unshift"), decorator: b("$provide", "decorator"), animation: b("$animateProvider", "register"), filter: b("$filterProvider", "register"), controller: b("$controllerProvider", "register"), directive: b("$compileProvider", "directive"), component: b("$compileProvider", "component"), config: x, run: function run(a) {
              p.push(a);return this;
            } };h && x(h);return J;
        });
      };
    });
  }function ia(a, b) {
    if (K(a)) {
      b = b || [];for (var d = 0, c = a.length; d < c; d++) {
        b[d] = a[d];
      }
    } else if (I(a)) for (d in b = b || {}, a) {
      if ("$" !== d.charAt(0) || "$" !== d.charAt(1)) b[d] = a[d];
    }return b || a;
  }function Be(a) {
    R(a, { bootstrap: Ic, copy: pa, extend: R, merge: ne, equals: oa, element: E, forEach: q, injector: eb, noop: C, bind: cb, toJson: db, fromJson: Ec, identity: Za, isUndefined: z, isDefined: u, isString: H, isFunction: F, isObject: I, isNumber: Z, isElement: Tb, isArray: K, version: Ce, isDate: ba, lowercase: P, uppercase: xb, callbacks: { $$counter: 0 }, getTestability: xe, $$minErr: N, $$csp: ya, reloadWithDebugInfo: we });Xb = Ae(B);Xb("ng", ["ngLocale"], ["$provide", function (a) {
      a.provider({ $$sanitizeUri: De });a.provider("$compile", Mc).directive({ a: Ee,
        input: Nc, textarea: Nc, form: Fe, script: Ge, select: He, option: Ie, ngBind: Je, ngBindHtml: Ke, ngBindTemplate: Le, ngClass: Me, ngClassEven: Ne, ngClassOdd: Oe, ngCloak: Pe, ngController: Qe, ngForm: Re, ngHide: Se, ngIf: Te, ngInclude: Ue, ngInit: Ve, ngNonBindable: We, ngPluralize: Xe, ngRepeat: Ye, ngShow: Ze, ngStyle: $e, ngSwitch: af, ngSwitchWhen: bf, ngSwitchDefault: cf, ngOptions: df, ngTransclude: ef, ngModel: ff, ngList: gf, ngChange: hf, pattern: Oc, ngPattern: Oc, required: Pc, ngRequired: Pc, minlength: Qc, ngMinlength: Qc, maxlength: Rc, ngMaxlength: Rc, ngValue: jf,
        ngModelOptions: kf }).directive({ ngInclude: lf }).directive(yb).directive(Sc);a.provider({ $anchorScroll: mf, $animate: nf, $animateCss: of, $$animateJs: pf, $$animateQueue: qf, $$AnimateRunner: rf, $$animateAsyncRun: sf, $browser: tf, $cacheFactory: uf, $controller: vf, $document: wf, $exceptionHandler: xf, $filter: Tc, $$forceReflow: yf, $interpolate: zf, $interval: Af, $http: Bf, $httpParamSerializer: Cf, $httpParamSerializerJQLike: Df, $httpBackend: Ef, $xhrFactory: Ff, $jsonpCallbacks: Gf, $location: Hf, $log: If, $parse: Jf, $rootScope: Kf, $q: Lf,
        $$q: Mf, $sce: Nf, $sceDelegate: Of, $sniffer: Pf, $templateCache: Qf, $templateRequest: Rf, $$testability: Sf, $timeout: Tf, $window: Uf, $$rAF: Vf, $$jqLite: Wf, $$HashMap: Xf, $$cookieReader: Yf });
    }]);
  }function fb(a) {
    return a.replace(Zf, function (a, d, c, e) {
      return e ? c.toUpperCase() : c;
    }).replace($f, "Moz$1");
  }function Uc(a) {
    a = a.nodeType;return 1 === a || !a || 9 === a;
  }function Vc(a, b) {
    var d,
        c,
        e = b.createDocumentFragment(),
        f = [];if (Yb.test(a)) {
      d = e.appendChild(b.createElement("div"));c = (ag.exec(a) || ["", ""])[1].toLowerCase();c = ja[c] || ja._default;
      d.innerHTML = c[1] + a.replace(bg, "<$1></$2>") + c[2];for (c = c[0]; c--;) {
        d = d.lastChild;
      }f = bb(f, d.childNodes);d = e.firstChild;d.textContent = "";
    } else f.push(b.createTextNode(a));e.textContent = "";e.innerHTML = "";q(f, function (a) {
      e.appendChild(a);
    });return e;
  }function Wc(a, b) {
    var d = a.parentNode;d && d.replaceChild(b, a);b.appendChild(a);
  }function T(a) {
    if (a instanceof T) return a;var b;H(a) && (a = U(a), b = !0);if (!(this instanceof T)) {
      if (b && "<" !== a.charAt(0)) throw Zb("nosel");return new T(a);
    }if (b) {
      b = B.document;var d;a = (d = cg.exec(a)) ? [b.createElement(d[1])] : (d = Vc(a, b)) ? d.childNodes : [];
    }Xc(this, a);
  }function $b(a) {
    return a.cloneNode(!0);
  }function zb(a, b) {
    b || gb(a);if (a.querySelectorAll) for (var d = a.querySelectorAll("*"), c = 0, e = d.length; c < e; c++) {
      gb(d[c]);
    }
  }function Yc(a, b, d, c) {
    if (u(c)) throw Zb("offargs");var e = (c = Ab(a)) && c.events,
        f = c && c.handle;if (f) if (b) {
      var g = function g(b) {
        var c = e[b];u(d) && ab(c || [], d);u(d) && c && 0 < c.length || (a.removeEventListener(b, f, !1), delete e[b]);
      };q(b.split(" "), function (a) {
        g(a);Bb[a] && g(Bb[a]);
      });
    } else for (b in e) {
      "$destroy" !== b && a.removeEventListener(b, f, !1), delete e[b];
    }
  }function gb(a, b) {
    var d = a.ng339,
        c = d && hb[d];c && (b ? delete c.data[b] : (c.handle && (c.events.$destroy && c.handle({}, "$destroy"), Yc(a)), delete hb[d], a.ng339 = void 0));
  }function Ab(a, b) {
    var d = a.ng339,
        d = d && hb[d];b && !d && (a.ng339 = d = ++dg, d = hb[d] = { events: {}, data: {}, handle: void 0 });return d;
  }function ac(a, b, d) {
    if (Uc(a)) {
      var c = u(d),
          e = !c && b && !I(b),
          f = !b;a = (a = Ab(a, !e)) && a.data;if (c) a[b] = d;else {
        if (f) return a;if (e) return a && a[b];R(a, b);
      }
    }
  }function Cb(a, b) {
    return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1;
  }function Db(a, b) {
    b && a.setAttribute && q(b.split(" "), function (b) {
      a.setAttribute("class", U((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + U(b) + " ", " ")));
    });
  }function Eb(a, b) {
    if (b && a.setAttribute) {
      var d = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");q(b.split(" "), function (a) {
        a = U(a);-1 === d.indexOf(" " + a + " ") && (d += a + " ");
      });a.setAttribute("class", U(d));
    }
  }function Xc(a, b) {
    if (b) if (b.nodeType) a[a.length++] = b;else {
      var d = b.length;if ("number" === typeof d && b.window !== b) {
        if (d) for (var c = 0; c < d; c++) {
          a[a.length++] = b[c];
        }
      } else a[a.length++] = b;
    }
  }function Zc(a, b) {
    return Fb(a, "$" + (b || "ngController") + "Controller");
  }function Fb(a, b, d) {
    9 === a.nodeType && (a = a.documentElement);for (b = K(b) ? b : [b]; a;) {
      for (var c = 0, e = b.length; c < e; c++) {
        if (u(d = E.data(a, b[c]))) return d;
      }a = a.parentNode || 11 === a.nodeType && a.host;
    }
  }function $c(a) {
    for (zb(a, !0); a.firstChild;) {
      a.removeChild(a.firstChild);
    }
  }function Gb(a, b) {
    b || zb(a);var d = a.parentNode;d && d.removeChild(a);
  }
  function eg(a, b) {
    b = b || B;if ("complete" === b.document.readyState) b.setTimeout(a);else E(b).on("load", a);
  }function ad(a, b) {
    var d = Hb[b.toLowerCase()];return d && bd[ua(a)] && d;
  }function fg(a, b) {
    var d = function d(c, _d) {
      c.isDefaultPrevented = function () {
        return c.defaultPrevented;
      };var f = b[_d || c.type],
          g = f ? f.length : 0;if (g) {
        if (z(c.immediatePropagationStopped)) {
          var h = c.stopImmediatePropagation;c.stopImmediatePropagation = function () {
            c.immediatePropagationStopped = !0;c.stopPropagation && c.stopPropagation();h && h.call(c);
          };
        }c.isImmediatePropagationStopped = function () {
          return !0 === c.immediatePropagationStopped;
        };var k = f.specialHandlerWrapper || gg;1 < g && (f = ia(f));for (var l = 0; l < g; l++) {
          c.isImmediatePropagationStopped() || k(a, c, f[l]);
        }
      }
    };d.elem = a;return d;
  }function gg(a, b, d) {
    d.call(a, b);
  }function hg(a, b, d) {
    var c = b.relatedTarget;c && (c === a || ig.call(a, c)) || d.call(a, b);
  }function Wf() {
    this.$get = function () {
      return R(T, { hasClass: function hasClass(a, b) {
          a.attr && (a = a[0]);return Cb(a, b);
        }, addClass: function addClass(a, b) {
          a.attr && (a = a[0]);return Eb(a, b);
        }, removeClass: function removeClass(a, b) {
          a.attr && (a = a[0]);
          return Db(a, b);
        } });
    };
  }function za(a, b) {
    var d = a && a.$$hashKey;if (d) return "function" === typeof d && (d = a.$$hashKey()), d;d = typeof a === "undefined" ? "undefined" : _typeof(a);return d = "function" === d || "object" === d && null !== a ? a.$$hashKey = d + ":" + (b || me)() : d + ":" + a;
  }function Ra(a, b) {
    if (b) {
      var d = 0;this.nextUid = function () {
        return ++d;
      };
    }q(a, this.put, this);
  }function cd(a) {
    a = (Function.prototype.toString.call(a) + " ").replace(jg, "");return a.match(kg) || a.match(lg);
  }function mg(a) {
    return (a = cd(a)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
  }function eb(a, b) {
    function d(a) {
      return function (b, c) {
        if (I(b)) q(b, Bc(a));else return a(b, c);
      };
    }function c(a, b) {
      Qa(a, "service");if (F(b) || K(b)) b = p.instantiate(b);if (!b.$get) throw Da("pget", a);return n[a + "Provider"] = b;
    }function e(a, b) {
      return function () {
        var c = t.invoke(b, this);if (z(c)) throw Da("undef", a);return c;
      };
    }function f(a, b, d) {
      return c(a, { $get: !1 !== d ? e(a, b) : b });
    }function g(a) {
      vb(z(a) || K(a), "modulesToLoad", "not an array");var b = [],
          c;q(a, function (a) {
        function d(a) {
          var b, c;b = 0;for (c = a.length; b < c; b++) {
            var e = a[b],
                f = p.get(e[0]);f[e[1]].apply(f, e[2]);
          }
        }if (!m.get(a)) {
          m.put(a, !0);try {
            H(a) ? (c = Xb(a), b = b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), d(c._configBlocks)) : F(a) ? b.push(p.invoke(a)) : K(a) ? b.push(p.invoke(a)) : Pa(a, "module");
          } catch (e) {
            throw K(a) && (a = a[a.length - 1]), e.message && e.stack && -1 === e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), Da("modulerr", a, e.stack || e.message || e);
          }
        }
      });return b;
    }function h(a, c) {
      function d(b, e) {
        if (a.hasOwnProperty(b)) {
          if (a[b] === k) throw Da("cdep", b + " <- " + l.join(" <- "));return a[b];
        }try {
          return l.unshift(b), a[b] = k, a[b] = c(b, e), a[b];
        } catch (f) {
          throw a[b] === k && delete a[b], f;
        } finally {
          l.shift();
        }
      }function e(a, c, f) {
        var g = [];a = eb.$$annotate(a, b, f);for (var h = 0, k = a.length; h < k; h++) {
          var l = a[h];if ("string" !== typeof l) throw Da("itkn", l);g.push(c && c.hasOwnProperty(l) ? c[l] : d(l, f));
        }return g;
      }return { invoke: function invoke(a, b, c, d) {
          "string" === typeof c && (d = c, c = null);c = e(a, c, d);K(a) && (a = a[a.length - 1]);d = 11 >= Fa ? !1 : "function" === typeof a && /^(?:class\b|constructor\()/.test(Function.prototype.toString.call(a) + " ");return d ? (c.unshift(null), new (Function.prototype.bind.apply(a, c))()) : a.apply(b, c);
        }, instantiate: function instantiate(a, b, c) {
          var d = K(a) ? a[a.length - 1] : a;a = e(a, b, c);a.unshift(null);return new (Function.prototype.bind.apply(d, a))();
        }, get: d, annotate: eb.$$annotate, has: function has(b) {
          return n.hasOwnProperty(b + "Provider") || a.hasOwnProperty(b);
        } };
    }b = !0 === b;var k = {},
        l = [],
        m = new Ra([], !0),
        n = { $provide: { provider: d(c), factory: d(f), service: d(function (a, b) {
          return f(a, ["$injector", function (a) {
            return a.instantiate(b);
          }]);
        }), value: d(function (a, b) {
          return f(a, ma(b), !1);
        }), constant: d(function (a, b) {
          Qa(a, "constant");
          n[a] = b;x[a] = b;
        }), decorator: function decorator(a, b) {
          var c = p.get(a + "Provider"),
              d = c.$get;c.$get = function () {
            var a = t.invoke(d, c);return t.invoke(b, null, { $delegate: a });
          };
        } } },
        p = n.$injector = h(n, function (a, b) {
      ga.isString(b) && l.push(b);throw Da("unpr", l.join(" <- "));
    }),
        x = {},
        J = h(x, function (a, b) {
      var c = p.get(a + "Provider", b);return t.invoke(c.$get, c, void 0, a);
    }),
        t = J;n.$injectorProvider = { $get: ma(J) };var s = g(a),
        t = J.get("$injector");t.strictDi = b;q(s, function (a) {
      a && t.invoke(a);
    });return t;
  }function mf() {
    var a = !0;this.disableAutoScrolling = function () {
      a = !1;
    };this.$get = ["$window", "$location", "$rootScope", function (b, d, c) {
      function e(a) {
        var b = null;Array.prototype.some.call(a, function (a) {
          if ("a" === ua(a)) return b = a, !0;
        });return b;
      }function f(a) {
        if (a) {
          a.scrollIntoView();var c;c = g.yOffset;F(c) ? c = c() : Tb(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : Z(c) || (c = 0);c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c));
        } else b.scrollTo(0, 0);
      }function g(a) {
        a = H(a) ? a : d.hash();var b;a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null);
      }var h = b.document;a && c.$watch(function () {
        return d.hash();
      }, function (a, b) {
        a === b && "" === a || eg(function () {
          c.$evalAsync(g);
        });
      });return g;
    }];
  }function jb(a, b) {
    if (!a && !b) return "";if (!a) return b;if (!b) return a;K(a) && (a = a.join(" "));K(b) && (b = b.join(" "));return a + " " + b;
  }function ng(a) {
    H(a) && (a = a.split(" "));var b = S();q(a, function (a) {
      a.length && (b[a] = !0);
    });return b;
  }function Ea(a) {
    return I(a) ? a : {};
  }function og(a, b, d, c) {
    function e(a) {
      try {
        a.apply(null, ta.call(arguments, 1));
      } finally {
        if (J--, 0 === J) for (; t.length;) {
          try {
            t.pop()();
          } catch (b) {
            d.error(b);
          }
        }
      }
    }function f() {
      w = null;g();h();
    }function g() {
      s = O();s = z(s) ? null : s;oa(s, A) && (s = A);A = s;
    }function h() {
      if (y !== k.url() || D !== s) y = k.url(), D = s, q(L, function (a) {
        a(k.url(), s);
      });
    }var k = this,
        l = a.location,
        m = a.history,
        n = a.setTimeout,
        p = a.clearTimeout,
        x = {};k.isMock = !1;var J = 0,
        t = [];k.$$completeOutstandingRequest = e;k.$$incOutstandingRequestCount = function () {
      J++;
    };k.notifyWhenNoOutstandingRequests = function (a) {
      0 === J ? a() : t.push(a);
    };var s,
        D,
        y = l.href,
        ib = b.find("base"),
        w = null,
        O = c.history ? function () {
      try {
        return m.state;
      } catch (a) {}
    } : C;g();D = s;k.url = function (b, d, e) {
      z(e) && (e = null);l !== a.location && (l = a.location);m !== a.history && (m = a.history);if (b) {
        var f = D === e;if (y === b && (!c.history || f)) return k;var h = y && Ja(y) === Ja(b);y = b;D = e;!c.history || h && f ? (h || (w = b), d ? l.replace(b) : h ? (d = l, e = b.indexOf("#"), e = -1 === e ? "" : b.substr(e), d.hash = e) : l.href = b, l.href !== b && (w = b)) : (m[d ? "replaceState" : "pushState"](e, "", b), g(), D = s);w && (w = b);return k;
      }return w || l.href.replace(/%27/g, "'");
    };
    k.state = function () {
      return s;
    };var L = [],
        Q = !1,
        A = null;k.onUrlChange = function (b) {
      if (!Q) {
        if (c.history) E(a).on("popstate", f);E(a).on("hashchange", f);Q = !0;
      }L.push(b);return b;
    };k.$$applicationDestroyed = function () {
      E(a).off("hashchange popstate", f);
    };k.$$checkUrlChange = h;k.baseHref = function () {
      var a = ib.attr("href");return a ? a.replace(/^(https?:)?\/\/[^\/]*/, "") : "";
    };k.defer = function (a, b) {
      var c;J++;c = n(function () {
        delete x[c];e(a);
      }, b || 0);x[c] = !0;return c;
    };k.defer.cancel = function (a) {
      return x[a] ? (delete x[a], p(a), e(C), !0) : !1;
    };
  }function tf() {
    this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, d, c) {
      return new og(a, c, b, d);
    }];
  }function uf() {
    this.$get = function () {
      function a(a, c) {
        function e(a) {
          a !== n && (p ? p === a && (p = a.n) : p = a, f(a.n, a.p), f(a, n), n = a, n.n = null);
        }function f(a, b) {
          a !== b && (a && (a.p = b), b && (b.n = a));
        }if (a in b) throw N("$cacheFactory")("iid", a);var g = 0,
            h = R({}, c, { id: a }),
            k = S(),
            l = c && c.capacity || Number.MAX_VALUE,
            m = S(),
            n = null,
            p = null;return b[a] = { put: function put(a, b) {
            if (!z(b)) {
              if (l < Number.MAX_VALUE) {
                var c = m[a] || (m[a] = { key: a });
                e(c);
              }a in k || g++;k[a] = b;g > l && this.remove(p.key);return b;
            }
          }, get: function get(a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];if (!b) return;e(b);
            }return k[a];
          }, remove: function remove(a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];if (!b) return;b === n && (n = b.p);b === p && (p = b.n);f(b.n, b.p);delete m[a];
            }a in k && (delete k[a], g--);
          }, removeAll: function removeAll() {
            k = S();g = 0;m = S();n = p = null;
          }, destroy: function destroy() {
            m = h = k = null;delete b[a];
          }, info: function info() {
            return R({}, h, { size: g });
          } };
      }var b = {};a.info = function () {
        var a = {};q(b, function (b, e) {
          a[e] = b.info();
        });return a;
      };a.get = function (a) {
        return b[a];
      };return a;
    };
  }function Qf() {
    this.$get = ["$cacheFactory", function (a) {
      return a("templates");
    }];
  }function Mc(a, b) {
    function d(a, b, c) {
      var d = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/,
          e = S();q(a, function (a, f) {
        if (a in n) e[f] = n[a];else {
          var g = a.match(d);if (!g) throw da("iscp", b, f, a, c ? "controller bindings definition" : "isolate scope definition");e[f] = { mode: g[1][0], collection: "*" === g[2], optional: "?" === g[3], attrName: g[4] || f };g[4] && (n[a] = e[f]);
        }
      });return e;
    }function c(a) {
      var b = a.charAt(0);if (!b || b !== P(b)) throw da("baddir", a);if (a !== a.trim()) throw da("baddir", a);
    }function e(a) {
      var b = a.require || a.controller && a.name;!K(b) && I(b) && q(b, function (a, c) {
        var d = a.match(l);a.substring(d[0].length) || (b[c] = d[0] + c);
      });return b;
    }var f = {},
        g = /^\s*directive:\s*([\w\-]+)\s+(.*)$/,
        h = /(([\w\-]+)(?::([^;]+))?;?)/,
        k = qe("ngSrc,ngSrcset,src,srcset"),
        l = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
        m = /^(on[a-z]+|formaction)$/,
        n = S();this.directive = function D(b, d) {
      Qa(b, "directive");H(b) ? (c(b), vb(d, "directiveFactory"), f.hasOwnProperty(b) || (f[b] = [], a.factory(b + "Directive", ["$injector", "$exceptionHandler", function (a, c) {
        var d = [];q(f[b], function (f, g) {
          try {
            var h = a.invoke(f);F(h) ? h = { compile: ma(h) } : !h.compile && h.link && (h.compile = ma(h.link));h.priority = h.priority || 0;h.index = g;h.name = h.name || b;h.require = e(h);h.restrict = h.restrict || "EA";h.$$moduleName = f.$$moduleName;d.push(h);
          } catch (k) {
            c(k);
          }
        });return d;
      }])), f[b].push(d)) : q(b, Bc(D));return this;
    };this.component = function (a, b) {
      function c(a) {
        function e(b) {
          return F(b) || K(b) ? function (c, d) {
            return a.invoke(b, this, { $element: c, $attrs: d });
          } : b;
        }var f = b.template || b.templateUrl ? b.template : "",
            g = { controller: d, controllerAs: dd(b.controller) || b.controllerAs || "$ctrl", template: e(f), templateUrl: e(b.templateUrl), transclude: b.transclude, scope: {}, bindToController: b.bindings || {}, restrict: "E", require: b.require };q(b, function (a, b) {
          "$" === b.charAt(0) && (g[b] = a);
        });return g;
      }var d = b.controller || function () {};q(b, function (a, b) {
        "$" === b.charAt(0) && (c[b] = a, F(d) && (d[b] = a));
      });c.$inject = ["$injector"];return this.directive(a, c);
    };this.aHrefSanitizationWhitelist = function (a) {
      return u(a) ? (b.aHrefSanitizationWhitelist(a), this) : b.aHrefSanitizationWhitelist();
    };this.imgSrcSanitizationWhitelist = function (a) {
      return u(a) ? (b.imgSrcSanitizationWhitelist(a), this) : b.imgSrcSanitizationWhitelist();
    };var p = !0;this.debugInfoEnabled = function (a) {
      return u(a) ? (p = a, this) : p;
    };var x = 10;this.onChangesTtl = function (a) {
      return arguments.length ? (x = a, this) : x;
    };var J = !0;this.commentDirectivesEnabled = function (a) {
      return arguments.length ? (J = a, this) : J;
    };var t = !0;this.cssClassDirectivesEnabled = function (a) {
      return arguments.length ? (t = a, this) : t;
    };this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function (a, b, c, e, n, L, Q, A, G, v) {
      function M() {
        try {
          if (! --qa) throw fa = void 0, da("infchng", x);Q.$apply(function () {
            for (var a = [], b = 0, c = fa.length; b < c; ++b) {
              try {
                fa[b]();
              } catch (d) {
                a.push(d);
              }
            }fa = void 0;if (a.length) throw a;
          });
        } finally {
          qa++;
        }
      }function bc(a, b) {
        if (b) {
          var c = Object.keys(b),
              d,
              e,
              f;d = 0;for (e = c.length; d < e; d++) {
            f = c[d], this[f] = b[f];
          }
        } else this.$attr = {};this.$$element = a;
      }function r(a, b, c) {
        pa.innerHTML = "<span " + b + ">";b = pa.firstChild.attributes;var d = b[0];b.removeNamedItem(d.name);d.value = c;a.attributes.setNamedItem(d);
      }function Ha(a, b) {
        try {
          a.addClass(b);
        } catch (c) {}
      }function $(a, b, c, d, e) {
        a instanceof E || (a = E(a));for (var f = /\S+/, g = 0, h = a.length; g < h; g++) {
          var k = a[g];k.nodeType === Ma && k.nodeValue.match(f) && Wc(k, a[g] = B.document.createElement("span"));
        }var l = Aa(a, b, a, c, d, e);$.$$addScopeClass(a);var m = null;return function (b, c, d) {
          vb(b, "scope");e && e.needsNewScope && (b = b.$parent.$new());
          d = d || {};var f = d.parentBoundTranscludeFn,
              g = d.transcludeControllers;d = d.futureParentElement;f && f.$$boundTransclude && (f = f.$$boundTransclude);m || (m = (d = d && d[0]) ? "foreignobject" !== ua(d) && na.call(d).match(/SVG/) ? "svg" : "html" : "html");d = "html" !== m ? E(ba(m, E("<div>").append(a).html())) : c ? Oa.clone.call(a) : a;if (g) for (var h in g) {
            d.data("$" + h + "Controller", g[h].instance);
          }$.$$addScopeInfo(d, b);c && c(d, b);l && l(b, d, d, f);return d;
        };
      }function Aa(a, b, c, d, e, f) {
        function g(a, c, d, e) {
          var f, k, l, m, p, y, x;if (n) for (x = Array(c.length), m = 0; m < h.length; m += 3) {
            f = h[m], x[f] = c[f];
          } else x = c;m = 0;for (p = h.length; m < p;) {
            k = x[h[m++]], c = h[m++], f = h[m++], c ? (c.scope ? (l = a.$new(), $.$$addScopeInfo(E(k), l)) : l = a, y = c.transcludeOnThisElement ? ha(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? ha(a, b) : null, c(f, l, k, d, y)) : f && f(a, k.childNodes, void 0, e);
          }
        }for (var h = [], k, l, m, p, n, y = 0; y < a.length; y++) {
          k = new bc();l = dc(a[y], [], k, 0 === y ? d : void 0, e);(f = l.length ? Sa(l, a[y], k, b, c, null, [], [], f) : null) && f.scope && $.$$addScopeClass(k.$$element);k = f && f.terminal || !(m = a[y].childNodes) || !m.length ? null : Aa(m, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b);if (f || k) h.push(y, f, k), p = !0, n = n || f;f = null;
        }return p ? g : null;
      }function ha(a, b, c) {
        function d(e, f, g, h, k) {
          e || (e = a.$new(!1, k), e.$$transcluded = !0);return b(e, f, { parentBoundTranscludeFn: c, transcludeControllers: g, futureParentElement: h });
        }var e = d.$$slots = S(),
            f;for (f in b.$$slots) {
          e[f] = b.$$slots[f] ? ha(a, b.$$slots[f], c) : null;
        }return d;
      }function dc(a, b, c, d, e) {
        var f = c.$attr,
            g;switch (a.nodeType) {case 1:
            g = ua(a);V(b, Ba(g), "E", d, e);for (var k, l, m, p, n = a.attributes, y = 0, x = n && n.length; y < x; y++) {
              var A = !1,
                  L = !1;k = n[y];l = k.name;m = U(k.value);k = Ba(l);(p = Da.test(k)) && (l = l.replace(ed, "").substr(8).replace(/_(.)/g, function (a, b) {
                return b.toUpperCase();
              }));(k = k.match(Ea)) && Y(k[1]) && (A = l, L = l.substr(0, l.length - 5) + "end", l = l.substr(0, l.length - 6));k = Ba(l.toLowerCase());f[k] = l;if (p || !c.hasOwnProperty(k)) c[k] = m, ad(a, k) && (c[k] = !0);ma(a, b, m, k, p);V(b, k, "A", d, e, A, L);
            }"input" === g && "hidden" === a.getAttribute("type") && a.setAttribute("autocomplete", "off");
            if (!Ca) break;f = a.className;I(f) && (f = f.animVal);if (H(f) && "" !== f) for (; a = h.exec(f);) {
              k = Ba(a[2]), V(b, k, "C", d, e) && (c[k] = U(a[3])), f = f.substr(a.index + a[0].length);
            }break;case Ma:
            if (11 === Fa) for (; a.parentNode && a.nextSibling && a.nextSibling.nodeType === Ma;) {
              a.nodeValue += a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling);
            }ga(b, a.nodeValue);break;case 8:
            if (!xa) break;N(a, b, c, d, e);}b.sort(ea);return b;
      }function N(a, b, c, d, e) {
        try {
          var f = g.exec(a.nodeValue);if (f) {
            var h = Ba(f[1]);V(b, h, "M", d, e) && (c[h] = U(f[2]));
          }
        } catch (k) {}
      }
      function fd(a, b, c) {
        var d = [],
            e = 0;if (b && a.hasAttribute && a.hasAttribute(b)) {
          do {
            if (!a) throw da("uterdir", b, c);1 === a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);d.push(a);a = a.nextSibling;
          } while (0 < e);
        } else d.push(a);return E(d);
      }function gd(a, b, c) {
        return function (d, e, f, g, h) {
          e = fd(e[0], b, c);return a(d, e, f, g, h);
        };
      }function fc(a, b, c, d, e, f) {
        var g;return a ? $(b, c, d, e, f) : function () {
          g || (g = $(b, c, d, e, f), b = c = f = null);return g.apply(this, arguments);
        };
      }function Sa(a, b, d, e, f, g, h, k, l) {
        function m(a, b, c, d) {
          if (a) {
            c && (a = gd(a, c, d));a.require = v.require;a.directiveName = w;if (A === v || v.$$isolateScope) a = ja(a, { isolateScope: !0 });h.push(a);
          }if (b) {
            c && (b = gd(b, c, d));b.require = v.require;b.directiveName = w;if (A === v || v.$$isolateScope) b = ja(b, { isolateScope: !0 });k.push(b);
          }
        }function p(a, e, f, g, l) {
          function m(a, b, c, d) {
            var e;$a(a) || (d = c, c = b, b = a, a = void 0);J && (e = D);c || (c = J ? M.parent() : M);if (d) {
              var f = l.$$slots[d];if (f) return f(a, b, e, c, r);if (z(f)) throw da("noslot", d, wa(M));
            } else return l(a, b, e, c, r);
          }var n, v, t, G, Q, D, w, M;b === f ? (g = d, M = d.$$element) : (M = E(f), g = new bc(M, d));Q = e;A ? G = e.$new(!0) : y && (Q = e.$parent);l && (w = m, w.$$boundTransclude = l, w.isSlotFilled = function (a) {
            return !!l.$$slots[a];
          });x && (D = T(M, g, w, x, G, e, A));A && ($.$$addScopeInfo(M, G, !0, !(L && (L === A || L === A.$$originalDirective))), $.$$addScopeClass(M, !0), G.$$isolateBindings = A.$$isolateBindings, v = ka(e, g, G, G.$$isolateBindings, A), v.removeWatches && G.$on("$destroy", v.removeWatches));for (n in D) {
            v = x[n];t = D[n];var cc = v.$$bindings.bindToController;t.bindingInfo = t.identifier && cc ? ka(Q, g, t.instance, cc, v) : {};var O = t();O !== t.instance && (t.instance = O, M.data("$" + v.name + "Controller", O), t.bindingInfo.removeWatches && t.bindingInfo.removeWatches(), t.bindingInfo = ka(Q, g, t.instance, cc, v));
          }q(x, function (a, b) {
            var c = a.require;a.bindToController && !K(c) && I(c) && R(D[b].instance, kb(b, c, M, D));
          });q(D, function (a) {
            var b = a.instance;if (F(b.$onChanges)) try {
              b.$onChanges(a.bindingInfo.initialChanges);
            } catch (d) {
              c(d);
            }if (F(b.$onInit)) try {
              b.$onInit();
            } catch (e) {
              c(e);
            }F(b.$doCheck) && (Q.$watch(function () {
              b.$doCheck();
            }), b.$doCheck());F(b.$onDestroy) && Q.$on("$destroy", function () {
              b.$onDestroy();
            });
          });n = 0;for (v = h.length; n < v; n++) {
            t = h[n], la(t, t.isolateScope ? G : e, M, g, t.require && kb(t.directiveName, t.require, M, D), w);
          }var r = e;A && (A.template || null === A.templateUrl) && (r = G);a && a(r, f.childNodes, void 0, l);for (n = k.length - 1; 0 <= n; n--) {
            t = k[n], la(t, t.isolateScope ? G : e, M, g, t.require && kb(t.directiveName, t.require, M, D), w);
          }q(D, function (a) {
            a = a.instance;F(a.$postLink) && a.$postLink();
          });
        }l = l || {};for (var n = -Number.MAX_VALUE, y = l.newScopeDirective, x = l.controllerDirectives, A = l.newIsolateScopeDirective, L = l.templateDirective, t = l.nonTlbTranscludeDirective, Q = !1, D = !1, J = l.hasElementTranscludeDirective, G = d.$$element = E(b), v, w, M, O = e, r, Ga = !1, Ha = !1, u, C = 0, Aa = a.length; C < Aa; C++) {
          v = a[C];var B = v.$$start,
              H = v.$$end;B && (G = fd(b, B, H));M = void 0;if (n > v.priority) break;if (u = v.scope) v.templateUrl || (I(u) ? (X("new/isolated scope", A || y, v, G), A = v) : X("new/isolated scope", A, v, G)), y = y || v;w = v.name;if (!Ga && (v.replace && (v.templateUrl || v.template) || v.transclude && !v.$$tlb)) {
            for (u = C + 1; Ga = a[u++];) {
              if (Ga.transclude && !Ga.$$tlb || Ga.replace && (Ga.templateUrl || Ga.template)) {
                Ha = !0;break;
              }
            }Ga = !0;
          }!v.templateUrl && v.controller && (u = v.controller, x = x || S(), X("'" + w + "' controller", x[w], v, G), x[w] = v);if (u = v.transclude) if (Q = !0, v.$$tlb || (X("transclusion", t, v, G), t = v), "element" === u) J = !0, n = v.priority, M = G, G = d.$$element = E($.$$createComment(w, d[w])), b = G[0], ca(f, ta.call(M, 0), b), M[0].$$parentNode = M[0].parentNode, O = fc(Ha, M, e, n, g && g.name, { nonTlbTranscludeDirective: t });else {
            var ha = S();M = E($b(b)).contents();if (I(u)) {
              M = [];var N = S(),
                  P = S();q(u, function (a, b) {
                var c = "?" === a.charAt(0);a = c ? a.substring(1) : a;N[a] = b;ha[b] = null;P[b] = c;
              });q(G.contents(), function (a) {
                var b = N[Ba(ua(a))];b ? (P[b] = !0, ha[b] = ha[b] || [], ha[b].push(a)) : M.push(a);
              });q(P, function (a, b) {
                if (!a) throw da("reqslot", b);
              });for (var Sa in ha) {
                ha[Sa] && (ha[Sa] = fc(Ha, ha[Sa], e));
              }
            }G.empty();O = fc(Ha, M, e, void 0, void 0, { needsNewScope: v.$$isolateScope || v.$$newScope });O.$$slots = ha;
          }if (v.template) if (D = !0, X("template", L, v, G), L = v, u = F(v.template) ? v.template(G, d) : v.template, u = za(u), v.replace) {
            g = v;M = Yb.test(u) ? hd(ba(v.templateNamespace, U(u))) : [];b = M[0];if (1 !== M.length || 1 !== b.nodeType) throw da("tplrt", w, "");ca(f, G, b);Aa = { $attr: {} };u = dc(b, [], Aa);var V = a.splice(C + 1, a.length - (C + 1));(A || y) && W(u, A, y);a = a.concat(u).concat(V);Z(d, Aa);Aa = a.length;
          } else G.html(u);if (v.templateUrl) D = !0, X("template", L, v, G), L = v, v.replace && (g = v), p = aa(a.splice(C, a.length - C), G, d, f, Q && O, h, k, { controllerDirectives: x, newScopeDirective: y !== v && y, newIsolateScopeDirective: A, templateDirective: L, nonTlbTranscludeDirective: t }), Aa = a.length;else if (v.compile) try {
            r = v.compile(G, d, O);var ec = v.$$originalDirective || v;F(r) ? m(null, cb(ec, r), B, H) : r && m(cb(ec, r.pre), cb(ec, r.post), B, H);
          } catch (Y) {
            c(Y, wa(G));
          }v.terminal && (p.terminal = !0, n = Math.max(n, v.priority));
        }p.scope = y && !0 === y.scope;p.transcludeOnThisElement = Q;p.templateOnThisElement = D;p.transclude = O;l.hasElementTranscludeDirective = J;return p;
      }function kb(a, b, c, d) {
        var e;if (H(b)) {
          var f = b.match(l);b = b.substring(f[0].length);var g = f[1] || f[3],
              f = "?" === f[2];"^^" === g ? c = c.parent() : e = (e = d && d[b]) && e.instance;if (!e) {
            var h = "$" + b + "Controller";e = g ? c.inheritedData(h) : c.data(h);
          }if (!e && !f) throw da("ctreq", b, a);
        } else if (K(b)) for (e = [], g = 0, f = b.length; g < f; g++) {
          e[g] = kb(a, b[g], c, d);
        } else I(b) && (e = {}, q(b, function (b, f) {
          e[f] = kb(a, b, c, d);
        }));return e || null;
      }function T(a, b, c, d, e, f, g) {
        var h = S(),
            k;for (k in d) {
          var l = d[k],
              m = { $scope: l === g || l.$$isolateScope ? e : f, $element: a, $attrs: b, $transclude: c },
              p = l.controller;"@" === p && (p = b[l.name]);m = L(p, m, !0, l.controllerAs);h[l.name] = m;a.data("$" + l.name + "Controller", m.instance);
        }return h;
      }function W(a, b, c) {
        for (var d = 0, e = a.length; d < e; d++) {
          a[d] = Ub(a[d], { $$isolateScope: b, $$newScope: c });
        }
      }function V(b, e, g, h, k, l, m) {
        if (e === k) return null;k = null;if (f.hasOwnProperty(e)) {
          var p;e = a.get(e + "Directive");for (var n = 0, y = e.length; n < y; n++) {
            try {
              if (p = e[n], (z(h) || h > p.priority) && -1 !== p.restrict.indexOf(g)) {
                l && (p = Ub(p, { $$start: l, $$end: m }));if (!p.$$bindings) {
                  var x = p,
                      v = p,
                      A = p.name,
                      t = { isolateScope: null, bindToController: null };I(v.scope) && (!0 === v.bindToController ? (t.bindToController = d(v.scope, A, !0), t.isolateScope = {}) : t.isolateScope = d(v.scope, A, !1));I(v.bindToController) && (t.bindToController = d(v.bindToController, A, !0));if (I(t.bindToController)) {
                    var L = v.controller,
                        G = v.controllerAs;if (!L) throw da("noctrl", A);if (!dd(L, G)) throw da("noident", A);
                  }var Q = x.$$bindings = t;I(Q.isolateScope) && (p.$$isolateBindings = Q.isolateScope);
                }b.push(p);k = p;
              }
            } catch (J) {
              c(J);
            }
          }
        }return k;
      }function Y(b) {
        if (f.hasOwnProperty(b)) for (var c = a.get(b + "Directive"), d = 0, e = c.length; d < e; d++) {
          if (b = c[d], b.multiElement) return !0;
        }return !1;
      }function Z(a, b) {
        var c = b.$attr,
            d = a.$attr;q(a, function (d, e) {
          "$" !== e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]));
        });q(b, function (b, e) {
          a.hasOwnProperty(e) || "$" === e.charAt(0) || (a[e] = b, "class" !== e && "style" !== e && (d[e] = c[e]));
        });
      }function aa(a, b, c, d, f, g, h, k) {
        var l = [],
            m,
            p,
            n = b[0],
            y = a.shift(),
            x = Ub(y, { templateUrl: null, transclude: null, replace: null, $$originalDirective: y }),
            v = F(y.templateUrl) ? y.templateUrl(b, c) : y.templateUrl,
            A = y.templateNamespace;b.empty();e(v).then(function (e) {
          var t, L;e = za(e);if (y.replace) {
            e = Yb.test(e) ? hd(ba(A, U(e))) : [];t = e[0];if (1 !== e.length || 1 !== t.nodeType) throw da("tplrt", y.name, v);e = { $attr: {} };ca(d, b, t);var G = dc(t, [], e);I(y.scope) && W(G, !0);a = G.concat(a);Z(c, e);
          } else t = n, b.html(e);a.unshift(x);m = Sa(a, t, c, f, b, y, g, h, k);q(d, function (a, c) {
            a === t && (d[c] = b[0]);
          });for (p = Aa(b[0].childNodes, f); l.length;) {
            e = l.shift();L = l.shift();var Q = l.shift(),
                D = l.shift(),
                G = b[0];if (!e.$$destroyed) {
              if (L !== n) {
                var J = L.className;k.hasElementTranscludeDirective && y.replace || (G = $b(t));ca(Q, E(L), G);Ha(E(G), J);
              }L = m.transcludeOnThisElement ? ha(e, m.transclude, D) : D;m(p, e, G, d, L);
            }
          }l = null;
        });return function (a, b, c, d, e) {
          a = e;b.$$destroyed || (l ? l.push(b, c, d, a) : (m.transcludeOnThisElement && (a = ha(b, m.transclude, e)), m(p, b, c, d, a)));
        };
      }function ea(a, b) {
        var c = b.priority - a.priority;return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
      }function X(a, b, c, d) {
        function e(a) {
          return a ? " (module: " + a + ")" : "";
        }if (b) throw da("multidir", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, wa(d));
      }function ga(a, c) {
        var d = b(c, !0);d && a.push({ priority: 0, compile: function compile(a) {
            a = a.parent();var b = !!a.length;
            b && $.$$addBindingClass(a);return function (a, c) {
              var e = c.parent();b || $.$$addBindingClass(e);$.$$addBindingInfo(e, d.expressions);a.$watch(d, function (a) {
                c[0].nodeValue = a;
              });
            };
          } });
      }function ba(a, b) {
        a = P(a || "html");switch (a) {case "svg":case "math":
            var c = B.document.createElement("div");c.innerHTML = "<" + a + ">" + b + "</" + a + ">";return c.childNodes[0].childNodes;default:
            return b;}
      }function ia(a, b) {
        if ("srcdoc" === b) return A.HTML;var c = ua(a);if ("src" === b || "ngSrc" === b) {
          if (-1 === ["img", "video", "audio", "source", "track"].indexOf(c)) return A.RESOURCE_URL;
        } else if ("xlinkHref" === b || "form" === c && "action" === b) return A.RESOURCE_URL;
      }function ma(a, c, d, e, f) {
        var g = ia(a, e);f = k[e] || f;var h = b(d, !0, g, f);if (h) {
          if ("multiple" === e && "select" === ua(a)) throw da("selmulti", wa(a));c.push({ priority: 100, compile: function compile() {
              return { pre: function pre(a, c, k) {
                  c = k.$$observers || (k.$$observers = S());if (m.test(e)) throw da("nodomevents");var l = k[e];l !== d && (h = l && b(l, !0, g, f), d = l);h && (k[e] = h(a), (c[e] || (c[e] = [])).$$inter = !0, (k.$$observers && k.$$observers[e].$$scope || a).$watch(h, function (a, b) {
                    "class" === e && a !== b ? k.$updateClass(a, b) : k.$set(e, a);
                  }));
                } };
            } });
        }
      }function ca(a, b, c) {
        var d = b[0],
            e = b.length,
            f = d.parentNode,
            g,
            h;if (a) for (g = 0, h = a.length; g < h; g++) {
          if (a[g] === d) {
            a[g++] = c;h = g + e - 1;for (var k = a.length; g < k; g++, h++) {
              h < k ? a[g] = a[h] : delete a[g];
            }a.length -= e - 1;a.context === d && (a.context = c);break;
          }
        }f && f.replaceChild(c, d);a = B.document.createDocumentFragment();for (g = 0; g < e; g++) {
          a.appendChild(b[g]);
        }E.hasData(d) && (E.data(c, E.data(d)), E(d).off("$destroy"));E.cleanData(a.querySelectorAll("*"));for (g = 1; g < e; g++) {
          delete b[g];
        }b[0] = c;b.length = 1;
      }function ja(a, b) {
        return R(function () {
          return a.apply(null, arguments);
        }, a, b);
      }function la(a, b, d, e, f, g) {
        try {
          a(b, d, e, f, g);
        } catch (h) {
          c(h, wa(d));
        }
      }function ka(a, c, d, e, f) {
        function g(b, c, e) {
          F(d.$onChanges) && c !== e && (fa || (a.$$postDigest(M), fa = []), m || (m = {}, fa.push(h)), m[b] && (e = m[b].previousValue), m[b] = new Ib(e, c));
        }function h() {
          d.$onChanges(m);m = void 0;
        }var k = [],
            l = {},
            m;q(e, function (e, h) {
          var m = e.attrName,
              p = e.optional,
              x,
              v,
              t,
              A;switch (e.mode) {case "@":
              p || sa.call(c, m) || (d[h] = c[m] = void 0);c.$observe(m, function (a) {
                if (H(a) || Ia(a)) g(h, a, d[h]), d[h] = a;
              });c.$$observers[m].$$scope = a;x = c[m];H(x) ? d[h] = b(x)(a) : Ia(x) && (d[h] = x);l[h] = new Ib(gc, d[h]);break;case "=":
              if (!sa.call(c, m)) {
                if (p) break;c[m] = void 0;
              }if (p && !c[m]) break;v = n(c[m]);A = v.literal ? oa : function (a, b) {
                return a === b || a !== a && b !== b;
              };t = v.assign || function () {
                x = d[h] = v(a);throw da("nonassign", c[m], m, f.name);
              };x = d[h] = v(a);p = function p(b) {
                A(b, d[h]) || (A(b, x) ? t(a, b = d[h]) : d[h] = b);return x = b;
              };p.$stateful = !0;p = e.collection ? a.$watchCollection(c[m], p) : a.$watch(n(c[m], p), null, v.literal);k.push(p);break;
            case "<":
              if (!sa.call(c, m)) {
                if (p) break;c[m] = void 0;
              }if (p && !c[m]) break;v = n(c[m]);var L = d[h] = v(a);l[h] = new Ib(gc, d[h]);p = a.$watch(v, function (a, b) {
                if (b === a) {
                  if (b === L) return;b = L;
                }g(h, a, b);d[h] = a;
              }, v.literal);k.push(p);break;case "&":
              v = c.hasOwnProperty(m) ? n(c[m]) : C;if (v === C && p) break;d[h] = function (b) {
                return v(a, b);
              };}
        });return { initialChanges: l, removeWatches: k.length && function () {
            for (var a = 0, b = k.length; a < b; ++a) {
              k[a]();
            }
          } };
      }var ra = /^\w/,
          pa = B.document.createElement("div"),
          xa = J,
          Ca = t,
          qa = x,
          fa;bc.prototype = { $normalize: Ba,
        $addClass: function $addClass(a) {
          a && 0 < a.length && G.addClass(this.$$element, a);
        }, $removeClass: function $removeClass(a) {
          a && 0 < a.length && G.removeClass(this.$$element, a);
        }, $updateClass: function $updateClass(a, b) {
          var c = id(a, b);c && c.length && G.addClass(this.$$element, c);(c = id(b, a)) && c.length && G.removeClass(this.$$element, c);
        }, $set: function $set(a, b, d, e) {
          var f = ad(this.$$element[0], a),
              g = jd[a],
              h = a;f ? (this.$$element.prop(a, b), e = f) : g && (this[g] = b, h = g);this[a] = b;e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = Jc(a, "-"));f = ua(this.$$element);if ("a" === f && ("href" === a || "xlinkHref" === a) || "img" === f && "src" === a) this[a] = b = v(b, "src" === a);else if ("img" === f && "srcset" === a && u(b)) {
            for (var f = "", g = U(b), k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, k = /\s/.test(g) ? k : /(,)/, g = g.split(k), k = Math.floor(g.length / 2), l = 0; l < k; l++) {
              var m = 2 * l,
                  f = f + v(U(g[m]), !0),
                  f = f + (" " + U(g[m + 1]));
            }g = U(g[2 * l]).split(/\s/);f += v(U(g[0]), !0);2 === g.length && (f += " " + U(g[1]));this[a] = b = f;
          }!1 !== d && (null === b || z(b) ? this.$$element.removeAttr(e) : ra.test(e) ? this.$$element.attr(e, b) : r(this.$$element[0], e, b));(a = this.$$observers) && q(a[h], function (a) {
            try {
              a(b);
            } catch (d) {
              c(d);
            }
          });
        }, $observe: function $observe(a, b) {
          var c = this,
              d = c.$$observers || (c.$$observers = S()),
              e = d[a] || (d[a] = []);e.push(b);Q.$evalAsync(function () {
            e.$$inter || !c.hasOwnProperty(a) || z(c[a]) || b(c[a]);
          });return function () {
            ab(e, b);
          };
        } };var va = b.startSymbol(),
          ya = b.endSymbol(),
          za = "{{" === va && "}}" === ya ? Za : function (a) {
        return a.replace(/\{\{/g, va).replace(/}}/g, ya);
      },
          Da = /^ngAttr[A-Z]/,
          Ea = /^(.+)Start$/;$.$$addBindingInfo = p ? function (a, b) {
        var c = a.data("$binding") || [];K(b) ? c = c.concat(b) : c.push(b);a.data("$binding", c);
      } : C;$.$$addBindingClass = p ? function (a) {
        Ha(a, "ng-binding");
      } : C;$.$$addScopeInfo = p ? function (a, b, c, d) {
        a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b);
      } : C;$.$$addScopeClass = p ? function (a, b) {
        Ha(a, b ? "ng-isolate-scope" : "ng-scope");
      } : C;$.$$createComment = function (a, b) {
        var c = "";p && (c = " " + (a || "") + ": ", b && (c += b + " "));return B.document.createComment(c);
      };return $;
    }];
  }function Ib(a, b) {
    this.previousValue = a;this.currentValue = b;
  }function Ba(a) {
    return fb(a.replace(ed, ""));
  }function id(a, b) {
    var d = "",
        c = a.split(/\s+/),
        e = b.split(/\s+/),
        f = 0;a: for (; f < c.length; f++) {
      for (var g = c[f], h = 0; h < e.length; h++) {
        if (g === e[h]) continue a;
      }d += (0 < d.length ? " " : "") + g;
    }return d;
  }function hd(a) {
    a = E(a);var b = a.length;if (1 >= b) return a;for (; b--;) {
      8 === a[b].nodeType && pg.call(a, b, 1);
    }return a;
  }function dd(a, b) {
    if (b && H(b)) return b;if (H(a)) {
      var d = kd.exec(a);if (d) return d[3];
    }
  }function vf() {
    var a = {},
        b = !1;this.has = function (b) {
      return a.hasOwnProperty(b);
    };this.register = function (b, c) {
      Qa(b, "controller");I(b) ? R(a, b) : a[b] = c;
    };this.allowGlobals = function () {
      b = !0;
    };this.$get = ["$injector", "$window", function (d, c) {
      function e(a, b, c, d) {
        if (!a || !I(a.$scope)) throw N("$controller")("noscp", d, b);a.$scope[b] = c;
      }return function (f, g, h, k) {
        var l, m, n;h = !0 === h;k && H(k) && (n = k);if (H(f)) {
          k = f.match(kd);if (!k) throw qg("ctrlfmt", f);m = k[1];n = n || k[3];f = a.hasOwnProperty(m) ? a[m] : Lc(g.$scope, m, !0) || (b ? Lc(c, m, !0) : void 0);Pa(f, m, !0);
        }if (h) return h = (K(f) ? f[f.length - 1] : f).prototype, l = Object.create(h || null), n && e(g, n, l, m || f.name), R(function () {
          var a = d.invoke(f, l, g, m);a !== l && (I(a) || F(a)) && (l = a, n && e(g, n, l, m || f.name));return l;
        }, { instance: l, identifier: n });l = d.instantiate(f, g, m);n && e(g, n, l, m || f.name);return l;
      };
    }];
  }function wf() {
    this.$get = ["$window", function (a) {
      return E(a.document);
    }];
  }function xf() {
    this.$get = ["$log", function (a) {
      return function (b, d) {
        a.error.apply(a, arguments);
      };
    }];
  }function hc(a) {
    return I(a) ? ba(a) ? a.toISOString() : db(a) : a;
  }function Cf() {
    this.$get = function () {
      return function (a) {
        if (!a) return "";var b = [];Ac(a, function (a, c) {
          null === a || z(a) || (K(a) ? q(a, function (a) {
            b.push(ca(c) + "=" + ca(hc(a)));
          }) : b.push(ca(c) + "=" + ca(hc(a))));
        });return b.join("&");
      };
    };
  }function Df() {
    this.$get = function () {
      return function (a) {
        function b(a, e, f) {
          null === a || z(a) || (K(a) ? q(a, function (a, c) {
            b(a, e + "[" + (I(a) ? c : "") + "]");
          }) : I(a) && !ba(a) ? Ac(a, function (a, c) {
            b(a, e + (f ? "" : "[") + c + (f ? "" : "]"));
          }) : d.push(ca(e) + "=" + ca(hc(a))));
        }if (!a) return "";var d = [];b(a, "", !0);return d.join("&");
      };
    };
  }function ic(a, b) {
    if (H(a)) {
      var d = a.replace(rg, "").trim();if (d) {
        var c = b("Content-Type");(c = c && 0 === c.indexOf(ld)) || (c = (c = d.match(sg)) && tg[c[0]].test(d));c && (a = Ec(d));
      }
    }return a;
  }function md(a) {
    var b = S(),
        d;H(a) ? q(a.split("\n"), function (a) {
      d = a.indexOf(":");var e = P(U(a.substr(0, d)));a = U(a.substr(d + 1));e && (b[e] = b[e] ? b[e] + ", " + a : a);
    }) : I(a) && q(a, function (a, d) {
      var f = P(d),
          g = U(a);f && (b[f] = b[f] ? b[f] + ", " + g : g);
    });return b;
  }function nd(a) {
    var b;return function (d) {
      b || (b = md(a));return d ? (d = b[P(d)], void 0 === d && (d = null), d) : b;
    };
  }function od(a, b, d, c) {
    if (F(c)) return c(a, b, d);q(c, function (c) {
      a = c(a, b, d);
    });return a;
  }function Bf() {
    var a = this.defaults = { transformResponse: [ic], transformRequest: [function (a) {
        return I(a) && "[object File]" !== na.call(a) && "[object Blob]" !== na.call(a) && "[object FormData]" !== na.call(a) ? db(a) : a;
      }], headers: { common: { Accept: "application/json, text/plain, */*" }, post: ia(jc), put: ia(jc), patch: ia(jc) }, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", paramSerializer: "$httpParamSerializer" },
        b = !1;this.useApplyAsync = function (a) {
      return u(a) ? (b = !!a, this) : b;
    };var d = !0;this.useLegacyPromiseExtensions = function (a) {
      return u(a) ? (d = !!a, this) : d;
    };var c = this.interceptors = [];this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function (e, f, g, h, k, l) {
      function m(b) {
        function c(a, b) {
          for (var d = 0, e = b.length; d < e;) {
            var f = b[d++],
                g = b[d++];a = a.then(f, g);
          }b.length = 0;return a;
        }function e(a, b) {
          var c,
              d = {};q(a, function (a, e) {
            F(a) ? (c = a(b), null != c && (d[e] = c)) : d[e] = a;
          });return d;
        }function f(a) {
          var b = R({}, a);b.data = od(a.data, a.headers, a.status, g.transformResponse);a = a.status;return 200 <= a && 300 > a ? b : k.reject(b);
        }if (!I(b)) throw N("$http")("badreq", b);if (!H(b.url)) throw N("$http")("badreq", b.url);var g = R({ method: "get", transformRequest: a.transformRequest, transformResponse: a.transformResponse, paramSerializer: a.paramSerializer }, b);g.headers = function (b) {
          var c = a.headers,
              d = R({}, b.headers),
              f,
              g,
              h,
              c = R({}, c.common, c[P(b.method)]);a: for (f in c) {
            g = P(f);for (h in d) {
              if (P(h) === g) continue a;
            }d[f] = c[f];
          }return e(d, ia(b));
        }(b);g.method = xb(g.method);g.paramSerializer = H(g.paramSerializer) ? l.get(g.paramSerializer) : g.paramSerializer;var h = [],
            m = [],
            p = k.when(g);q(J, function (a) {
          (a.request || a.requestError) && h.unshift(a.request, a.requestError);(a.response || a.responseError) && m.push(a.response, a.responseError);
        });p = c(p, h);p = p.then(function (b) {
          var c = b.headers,
              d = od(b.data, nd(c), void 0, b.transformRequest);z(d) && q(c, function (a, b) {
            "content-type" === P(b) && delete c[b];
          });z(b.withCredentials) && !z(a.withCredentials) && (b.withCredentials = a.withCredentials);return n(b, d).then(f, f);
        });p = c(p, m);d ? (p.success = function (a) {
          Pa(a, "fn");p.then(function (b) {
            a(b.data, b.status, b.headers, g);
          });return p;
        }, p.error = function (a) {
          Pa(a, "fn");p.then(null, function (b) {
            a(b.data, b.status, b.headers, g);
          });return p;
        }) : (p.success = pd("success"), p.error = pd("error"));return p;
      }function n(c, d) {
        function g(a) {
          if (a) {
            var c = {};q(a, function (a, d) {
              c[d] = function (c) {
                function d() {
                  a(c);
                }b ? h.$applyAsync(d) : h.$$phase ? d() : h.$apply(d);
              };
            });return c;
          }
        }function l(a, c, d, e) {
          function f() {
            n(c, a, d, e);
          }A && (200 <= a && 300 > a ? A.put(M, [a, c, md(d), e]) : A.remove(M));b ? h.$applyAsync(f) : (f(), h.$$phase || h.$apply());
        }function n(a, b, d, e) {
          b = -1 <= b ? b : 0;(200 <= b && 300 > b ? L.resolve : L.reject)({ data: a,
            status: b, headers: nd(d), config: c, statusText: e });
        }function J(a) {
          n(a.data, a.status, ia(a.headers()), a.statusText);
        }function O() {
          var a = m.pendingRequests.indexOf(c);-1 !== a && m.pendingRequests.splice(a, 1);
        }var L = k.defer(),
            Q = L.promise,
            A,
            G,
            v = c.headers,
            M = p(c.url, c.paramSerializer(c.params));m.pendingRequests.push(c);Q.then(O, O);!c.cache && !a.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (A = I(c.cache) ? c.cache : I(a.cache) ? a.cache : x);A && (G = A.get(M), u(G) ? G && F(G.then) ? G.then(J, J) : K(G) ? n(G[1], G[0], ia(G[2]), G[3]) : n(G, 200, {}, "OK") : A.put(M, Q));z(G) && ((G = qd(c.url) ? f()[c.xsrfCookieName || a.xsrfCookieName] : void 0) && (v[c.xsrfHeaderName || a.xsrfHeaderName] = G), e(c.method, M, d, l, v, c.timeout, c.withCredentials, c.responseType, g(c.eventHandlers), g(c.uploadEventHandlers)));return Q;
      }function p(a, b) {
        0 < b.length && (a += (-1 === a.indexOf("?") ? "?" : "&") + b);return a;
      }var x = g("$http");a.paramSerializer = H(a.paramSerializer) ? l.get(a.paramSerializer) : a.paramSerializer;var J = [];q(c, function (a) {
        J.unshift(H(a) ? l.get(a) : l.invoke(a));
      });m.pendingRequests = [];(function (a) {
        q(arguments, function (a) {
          m[a] = function (b, c) {
            return m(R({}, c || {}, { method: a, url: b }));
          };
        });
      })("get", "delete", "head", "jsonp");(function (a) {
        q(arguments, function (a) {
          m[a] = function (b, c, d) {
            return m(R({}, d || {}, { method: a, url: b, data: c }));
          };
        });
      })("post", "put", "patch");m.defaults = a;return m;
    }];
  }function Ff() {
    this.$get = function () {
      return function () {
        return new B.XMLHttpRequest();
      };
    };
  }function Ef() {
    this.$get = ["$browser", "$jsonpCallbacks", "$document", "$xhrFactory", function (a, b, d, c) {
      return ug(a, c, a.defer, b, d[0]);
    }];
  }
  function ug(a, b, d, c, e) {
    function f(a, b, d) {
      a = a.replace("JSON_CALLBACK", b);var f = e.createElement("script"),
          _m = null;f.type = "text/javascript";f.src = a;f.async = !0;_m = function m(a) {
        f.removeEventListener("load", _m, !1);f.removeEventListener("error", _m, !1);e.body.removeChild(f);f = null;var g = -1,
            x = "unknown";a && ("load" !== a.type || c.wasCalled(b) || (a = { type: "error" }), x = a.type, g = "error" === a.type ? 404 : 200);d && d(g, x);
      };f.addEventListener("load", _m, !1);f.addEventListener("error", _m, !1);e.body.appendChild(f);return _m;
    }return function (e, h, k, l, m, n, p, x, J, t) {
      function s() {
        ib && ib();w && w.abort();
      }function D(b, c, e, f, g) {
        u(L) && d.cancel(L);ib = w = null;b(c, e, f, g);a.$$completeOutstandingRequest(C);
      }a.$$incOutstandingRequestCount();h = h || a.url();if ("jsonp" === P(e)) var y = c.createCallback(h),
          ib = f(h, y, function (a, b) {
        var d = 200 === a && c.getResponse(y);D(l, a, d, "", b);c.removeCallback(y);
      });else {
        var w = b(e, h);w.open(e, h, !0);q(m, function (a, b) {
          u(a) && w.setRequestHeader(b, a);
        });w.onload = function () {
          var a = w.statusText || "",
              b = "response" in w ? w.response : w.responseText,
              c = 1223 === w.status ? 204 : w.status;0 === c && (c = b ? 200 : "file" === Ca(h).protocol ? 404 : 0);D(l, c, b, w.getAllResponseHeaders(), a);
        };e = function e() {
          D(l, -1, null, null, "");
        };w.onerror = e;w.onabort = e;w.ontimeout = e;q(J, function (a, b) {
          w.addEventListener(b, a);
        });q(t, function (a, b) {
          w.upload.addEventListener(b, a);
        });p && (w.withCredentials = !0);if (x) try {
          w.responseType = x;
        } catch (O) {
          if ("json" !== x) throw O;
        }w.send(z(k) ? null : k);
      }if (0 < n) var L = d(s, n);else n && F(n.then) && n.then(s);
    };
  }function zf() {
    var a = "{{",
        b = "}}";this.startSymbol = function (b) {
      return b ? (a = b, this) : a;
    };this.endSymbol = function (a) {
      return a ? (b = a, this) : b;
    };this.$get = ["$parse", "$exceptionHandler", "$sce", function (d, c, e) {
      function f(a) {
        return "\\\\\\" + a;
      }function g(c) {
        return c.replace(n, a).replace(p, b);
      }function h(a, b, c, d) {
        var e = a.$watch(function (a) {
          e();return d(a);
        }, b, c);return e;
      }function k(f, k, p, n) {
        function D(a) {
          try {
            var b = a;a = p ? e.getTrusted(p, b) : e.valueOf(b);var d;if (n && !u(a)) d = a;else if (null == a) d = "";else {
              switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "string":
                  break;case "number":
                  a = "" + a;break;default:
                  a = db(a);}d = a;
            }return d;
          } catch (g) {
            c(Ka.interr(f, g));
          }
        }if (!f.length || -1 === f.indexOf(a)) {
          var y;k || (k = g(f), y = ma(k), y.exp = f, y.expressions = [], y.$$watchDelegate = h);return y;
        }n = !!n;var q,
            w,
            O = 0,
            L = [],
            Q = [];y = f.length;for (var A = [], G = []; O < y;) {
          if (-1 !== (q = f.indexOf(a, O)) && -1 !== (w = f.indexOf(b, q + l))) O !== q && A.push(g(f.substring(O, q))), O = f.substring(q + l, w), L.push(O), Q.push(d(O, D)), O = w + m, G.push(A.length), A.push("");else {
            O !== y && A.push(g(f.substring(O)));break;
          }
        }p && 1 < A.length && Ka.throwNoconcat(f);if (!k || L.length) {
          var v = function v(a) {
            for (var b = 0, c = L.length; b < c; b++) {
              if (n && z(a[b])) return;A[G[b]] = a[b];
            }return A.join("");
          };return R(function (a) {
            var b = 0,
                d = L.length,
                e = Array(d);try {
              for (; b < d; b++) {
                e[b] = Q[b](a);
              }return v(e);
            } catch (g) {
              c(Ka.interr(f, g));
            }
          }, { exp: f, expressions: L, $$watchDelegate: function $$watchDelegate(a, b) {
              var c;return a.$watchGroup(Q, function (d, e) {
                var f = v(d);F(b) && b.call(this, f, d !== e ? c : f, a);c = f;
              });
            } });
        }
      }var l = a.length,
          m = b.length,
          n = new RegExp(a.replace(/./g, f), "g"),
          p = new RegExp(b.replace(/./g, f), "g");k.startSymbol = function () {
        return a;
      };k.endSymbol = function () {
        return b;
      };return k;
    }];
  }function Af() {
    this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function (a, b, d, c, e) {
      function f(f, k, l, m) {
        function n() {
          p ? f.apply(null, x) : f(s);
        }var p = 4 < arguments.length,
            x = p ? ta.call(arguments, 4) : [],
            J = b.setInterval,
            t = b.clearInterval,
            s = 0,
            D = u(m) && !m,
            y = (D ? c : d).defer(),
            q = y.promise;l = u(l) ? l : 0;q.$$intervalId = J(function () {
          D ? e.defer(n) : a.$evalAsync(n);y.notify(s++);0 < l && s >= l && (y.resolve(s), t(q.$$intervalId), delete g[q.$$intervalId]);D || a.$apply();
        }, k);g[q.$$intervalId] = y;return q;
      }var g = {};f.cancel = function (a) {
        return a && a.$$intervalId in g ? (g[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete g[a.$$intervalId], !0) : !1;
      };return f;
    }];
  }function kc(a) {
    a = a.split("/");for (var b = a.length; b--;) {
      a[b] = tb(a[b]);
    }return a.join("/");
  }function rd(a, b) {
    var d = Ca(a);b.$$protocol = d.protocol;b.$$host = d.hostname;b.$$port = aa(d.port) || vg[d.protocol] || null;
  }function sd(a, b) {
    if (wg.test(a)) throw lb("badpath", a);var d = "/" !== a.charAt(0);d && (a = "/" + a);var c = Ca(a);b.$$path = decodeURIComponent(d && "/" === c.pathname.charAt(0) ? c.pathname.substring(1) : c.pathname);b.$$search = Hc(c.search);b.$$hash = decodeURIComponent(c.hash);b.$$path && "/" !== b.$$path.charAt(0) && (b.$$path = "/" + b.$$path);
  }function ka(a, b) {
    if (0 === b.lastIndexOf(a, 0)) return b.substr(a.length);
  }function Ja(a) {
    var b = a.indexOf("#");return -1 === b ? a : a.substr(0, b);
  }function mb(a) {
    return a.replace(/(#.+)|#$/, "$1");
  }function lc(a, b, d) {
    this.$$html5 = !0;d = d || "";rd(a, this);this.$$parse = function (a) {
      var d = ka(b, a);if (!H(d)) throw lb("ipthprfx", a, b);sd(d, this);this.$$path || (this.$$path = "/");this.$$compose();
    };
    this.$$compose = function () {
      var a = Wb(this.$$search),
          d = this.$$hash ? "#" + tb(this.$$hash) : "";this.$$url = kc(this.$$path) + (a ? "?" + a : "") + d;this.$$absUrl = b + this.$$url.substr(1);
    };this.$$parseLinkUrl = function (c, e) {
      if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;var f, g;u(f = ka(a, c)) ? (g = f, g = d && u(f = ka(d, f)) ? b + (ka("/", f) || f) : a + g) : u(f = ka(b, c)) ? g = b + f : b === c + "/" && (g = b);g && this.$$parse(g);return !!g;
    };
  }function mc(a, b, d) {
    rd(a, this);this.$$parse = function (c) {
      var e = ka(a, c) || ka(b, c),
          f;z(e) || "#" !== e.charAt(0) ? this.$$html5 ? f = e : (f = "", z(e) && (a = c, this.replace())) : (f = ka(d, e), z(f) && (f = e));sd(f, this);c = this.$$path;var e = a,
          g = /^\/[A-Z]:(\/.*)/;0 === f.lastIndexOf(e, 0) && (f = f.replace(e, ""));g.exec(f) || (c = (f = g.exec(c)) ? f[1] : c);this.$$path = c;this.$$compose();
    };this.$$compose = function () {
      var b = Wb(this.$$search),
          e = this.$$hash ? "#" + tb(this.$$hash) : "";this.$$url = kc(this.$$path) + (b ? "?" + b : "") + e;this.$$absUrl = a + (this.$$url ? d + this.$$url : "");
    };this.$$parseLinkUrl = function (b, d) {
      return Ja(a) === Ja(b) ? (this.$$parse(b), !0) : !1;
    };
  }function td(a, b, d) {
    this.$$html5 = !0;mc.apply(this, arguments);this.$$parseLinkUrl = function (c, e) {
      if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;var f, g;a === Ja(c) ? f = c : (g = ka(b, c)) ? f = a + d + g : b === c + "/" && (f = b);f && this.$$parse(f);return !!f;
    };this.$$compose = function () {
      var b = Wb(this.$$search),
          e = this.$$hash ? "#" + tb(this.$$hash) : "";this.$$url = kc(this.$$path) + (b ? "?" + b : "") + e;this.$$absUrl = a + d + this.$$url;
    };
  }function Jb(a) {
    return function () {
      return this[a];
    };
  }function ud(a, b) {
    return function (d) {
      if (z(d)) return this[a];this[a] = b(d);this.$$compose();return this;
    };
  }
  function Hf() {
    var a = "",
        b = { enabled: !1, requireBase: !0, rewriteLinks: !0 };this.hashPrefix = function (b) {
      return u(b) ? (a = b, this) : a;
    };this.html5Mode = function (a) {
      return Ia(a) ? (b.enabled = a, this) : I(a) ? (Ia(a.enabled) && (b.enabled = a.enabled), Ia(a.requireBase) && (b.requireBase = a.requireBase), Ia(a.rewriteLinks) && (b.rewriteLinks = a.rewriteLinks), this) : b;
    };this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function (d, c, e, f, g) {
      function h(a, b, d) {
        var e = l.url(),
            f = l.$$state;try {
          c.url(a, b, d), l.$$state = c.state();
        } catch (g) {
          throw l.url(e), l.$$state = f, g;
        }
      }function k(a, b) {
        d.$broadcast("$locationChangeSuccess", l.absUrl(), a, l.$$state, b);
      }var l, m;m = c.baseHref();var n = c.url(),
          p;if (b.enabled) {
        if (!m && b.requireBase) throw lb("nobase");p = n.substring(0, n.indexOf("/", n.indexOf("//") + 2)) + (m || "/");m = e.history ? lc : td;
      } else p = Ja(n), m = mc;var x = p.substr(0, Ja(p).lastIndexOf("/") + 1);l = new m(p, x, "#" + a);l.$$parseLinkUrl(n, n);l.$$state = c.state();var J = /^\s*(javascript|mailto):/i;f.on("click", function (a) {
        if (b.rewriteLinks && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 !== a.which && 2 !== a.button) {
          for (var e = E(a.target); "a" !== ua(e[0]);) {
            if (e[0] === f[0] || !(e = e.parent())[0]) return;
          }var h = e.prop("href"),
              k = e.attr("href") || e.attr("xlink:href");I(h) && "[object SVGAnimatedString]" === h.toString() && (h = Ca(h.animVal).href);J.test(h) || !h || e.attr("target") || a.isDefaultPrevented() || !l.$$parseLinkUrl(h, k) || (a.preventDefault(), l.absUrl() !== c.url() && (d.$apply(), g.angular["ff-684208-preventDefault"] = !0));
        }
      });mb(l.absUrl()) !== mb(n) && c.url(l.absUrl(), !0);var t = !0;c.onUrlChange(function (a, b) {
        z(ka(x, a)) ? g.location.href = a : (d.$evalAsync(function () {
          var c = l.absUrl(),
              e = l.$$state,
              f;a = mb(a);l.$$parse(a);l.$$state = b;f = d.$broadcast("$locationChangeStart", a, c, b, e).defaultPrevented;l.absUrl() === a && (f ? (l.$$parse(c), l.$$state = e, h(c, !1, e)) : (t = !1, k(c, e)));
        }), d.$$phase || d.$digest());
      });d.$watch(function () {
        var a = mb(c.url()),
            b = mb(l.absUrl()),
            f = c.state(),
            g = l.$$replace,
            m = a !== b || l.$$html5 && e.history && f !== l.$$state;if (t || m) t = !1, d.$evalAsync(function () {
          var b = l.absUrl(),
              c = d.$broadcast("$locationChangeStart", b, a, l.$$state, f).defaultPrevented;l.absUrl() === b && (c ? (l.$$parse(a), l.$$state = f) : (m && h(b, g, f === l.$$state ? null : l.$$state), k(a, f)));
        });l.$$replace = !1;
      });return l;
    }];
  }function If() {
    var a = !0,
        b = this;this.debugEnabled = function (b) {
      return u(b) ? (a = b, this) : a;
    };this.$get = ["$window", function (d) {
      function c(a) {
        a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));return a;
      }function e(a) {
        var b = d.console || {},
            e = b[a] || b.log || C;a = !1;try {
          a = !!e.apply;
        } catch (k) {}return a ? function () {
          var a = [];q(arguments, function (b) {
            a.push(c(b));
          });return e.apply(b, a);
        } : function (a, b) {
          e(a, null == b ? "" : b);
        };
      }return { log: e("log"), info: e("info"), warn: e("warn"), error: e("error"), debug: function () {
          var c = e("debug");return function () {
            a && c.apply(b, arguments);
          };
        }() };
    }];
  }function Ta(a, b) {
    if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw ea("isecfld", b);return a;
  }function xg(a) {
    return a + "";
  }function qa(a, b) {
    if (a) {
      if (a.constructor === a) throw ea("isecfn", b);if (a.window === a) throw ea("isecwindow", b);if (a.children && (a.nodeName || a.prop && a.attr && a.find)) throw ea("isecdom", b);if (a === Object) throw ea("isecobj", b);
    }return a;
  }function vd(a, b) {
    if (a) {
      if (a.constructor === a) throw ea("isecfn", b);if (a === yg || a === zg || a === Ag) throw ea("isecff", b);
    }
  }function Kb(a, b) {
    if (a && (a === wd || a === xd || a === yd || a === zd || a === Ad || a === Bd || a === Bg || a === Cg || a === Lb || a === Dg || a === Cd || a === Eg)) throw ea("isecaf", b);
  }function Fg(a, b) {
    return "undefined" !== typeof a ? a : b;
  }function Dd(a, b) {
    return "undefined" === typeof a ? b : "undefined" === typeof b ? a : a + b;
  }function W(a, b) {
    var d, c, e;switch (a.type) {case r.Program:
        d = !0;q(a.body, function (a) {
          W(a.expression, b);d = d && a.expression.constant;
        });a.constant = d;break;case r.Literal:
        a.constant = !0;a.toWatch = [];break;case r.UnaryExpression:
        W(a.argument, b);a.constant = a.argument.constant;a.toWatch = a.argument.toWatch;break;case r.BinaryExpression:
        W(a.left, b);W(a.right, b);a.constant = a.left.constant && a.right.constant;a.toWatch = a.left.toWatch.concat(a.right.toWatch);
        break;case r.LogicalExpression:
        W(a.left, b);W(a.right, b);a.constant = a.left.constant && a.right.constant;a.toWatch = a.constant ? [] : [a];break;case r.ConditionalExpression:
        W(a.test, b);W(a.alternate, b);W(a.consequent, b);a.constant = a.test.constant && a.alternate.constant && a.consequent.constant;a.toWatch = a.constant ? [] : [a];break;case r.Identifier:
        a.constant = !1;a.toWatch = [a];break;case r.MemberExpression:
        W(a.object, b);a.computed && W(a.property, b);a.constant = a.object.constant && (!a.computed || a.property.constant);a.toWatch = [a];break;case r.CallExpression:
        d = e = a.filter ? !b(a.callee.name).$stateful : !1;c = [];q(a.arguments, function (a) {
          W(a, b);d = d && a.constant;a.constant || c.push.apply(c, a.toWatch);
        });a.constant = d;a.toWatch = e ? c : [a];break;case r.AssignmentExpression:
        W(a.left, b);W(a.right, b);a.constant = a.left.constant && a.right.constant;a.toWatch = [a];break;case r.ArrayExpression:
        d = !0;c = [];q(a.elements, function (a) {
          W(a, b);d = d && a.constant;a.constant || c.push.apply(c, a.toWatch);
        });a.constant = d;a.toWatch = c;break;case r.ObjectExpression:
        d = !0;c = [];q(a.properties, function (a) {
          W(a.value, b);d = d && a.value.constant && !a.computed;a.value.constant || c.push.apply(c, a.value.toWatch);
        });a.constant = d;a.toWatch = c;break;case r.ThisExpression:
        a.constant = !1;a.toWatch = [];break;case r.LocalsExpression:
        a.constant = !1, a.toWatch = [];}
  }function Ed(a) {
    if (1 === a.length) {
      a = a[0].expression;var b = a.toWatch;return 1 !== b.length ? b : b[0] !== a ? b : void 0;
    }
  }function Fd(a) {
    return a.type === r.Identifier || a.type === r.MemberExpression;
  }function Gd(a) {
    if (1 === a.body.length && Fd(a.body[0].expression)) return { type: r.AssignmentExpression,
      left: a.body[0].expression, right: { type: r.NGValueParameter }, operator: "=" };
  }function Hd(a) {
    return 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === r.Literal || a.body[0].expression.type === r.ArrayExpression || a.body[0].expression.type === r.ObjectExpression);
  }function Id(a, b) {
    this.astBuilder = a;this.$filter = b;
  }function Jd(a, b) {
    this.astBuilder = a;this.$filter = b;
  }function Mb(a) {
    return "constructor" === a;
  }function nc(a) {
    return F(a.valueOf) ? a.valueOf() : Gg.call(a);
  }function Jf() {
    var a = S(),
        b = S(),
        d = { "true": !0,
      "false": !1, "null": null, undefined: void 0 },
        c,
        e;this.addLiteral = function (a, b) {
      d[a] = b;
    };this.setIdentifierFns = function (a, b) {
      c = a;e = b;return this;
    };this.$get = ["$filter", function (f) {
      function g(c, d, e) {
        var g, k, J;e = e || D;switch (typeof c === "undefined" ? "undefined" : _typeof(c)) {case "string":
            J = c = c.trim();var A = e ? b : a;g = A[J];if (!g) {
              ":" === c.charAt(0) && ":" === c.charAt(1) && (k = !0, c = c.substring(2));g = e ? s : t;var G = new oc(g);g = new pc(G, f, g).parse(c);g.constant ? g.$$watchDelegate = p : k ? g.$$watchDelegate = g.literal ? n : m : g.inputs && (g.$$watchDelegate = l);e && (g = h(g));A[J] = g;
            }return x(g, d);case "function":
            return x(c, d);default:
            return x(C, d);}
      }function h(a) {
        function b(c, d, e, f) {
          var g = D;D = !0;try {
            return a(c, d, e, f);
          } finally {
            D = g;
          }
        }if (!a) return a;b.$$watchDelegate = a.$$watchDelegate;b.assign = h(a.assign);b.constant = a.constant;b.literal = a.literal;for (var c = 0; a.inputs && c < a.inputs.length; ++c) {
          a.inputs[c] = h(a.inputs[c]);
        }b.inputs = a.inputs;return b;
      }function k(a, b) {
        return null == a || null == b ? a === b : "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && (a = nc(a), "object" === (typeof a === "undefined" ? "undefined" : _typeof(a))) ? !1 : a === b || a !== a && b !== b;
      }function l(a, b, c, d, e) {
        var f = d.inputs,
            g;if (1 === f.length) {
          var h = k,
              f = f[0];return a.$watch(function (a) {
            var b = f(a);k(b, h) || (g = d(a, void 0, void 0, [b]), h = b && nc(b));return g;
          }, b, c, e);
        }for (var l = [], m = [], p = 0, n = f.length; p < n; p++) {
          l[p] = k, m[p] = null;
        }return a.$watch(function (a) {
          for (var b = !1, c = 0, e = f.length; c < e; c++) {
            var h = f[c](a);if (b || (b = !k(h, l[c]))) m[c] = h, l[c] = h && nc(h);
          }b && (g = d(a, void 0, void 0, m));return g;
        }, b, c, e);
      }function m(a, b, c, d) {
        var e, f;return e = a.$watch(function (a) {
          return d(a);
        }, function (a, c, d) {
          f = a;F(b) && b.apply(this, arguments);u(a) && d.$$postDigest(function () {
            u(f) && e();
          });
        }, c);
      }function n(a, b, c, d) {
        function e(a) {
          var b = !0;q(a, function (a) {
            u(a) || (b = !1);
          });return b;
        }var f, g;return f = a.$watch(function (a) {
          return d(a);
        }, function (a, c, d) {
          g = a;F(b) && b.call(this, a, c, d);e(a) && d.$$postDigest(function () {
            e(g) && f();
          });
        }, c);
      }function p(a, b, c, d) {
        var e = a.$watch(function (a) {
          e();return d(a);
        }, b, c);return e;
      }function x(a, b) {
        if (!b) return a;var c = a.$$watchDelegate,
            d = !1,
            c = c !== n && c !== m ? function (c, e, f, g) {
          f = d && g ? g[0] : a(c, e, f, g);return b(f, c, e);
        } : function (c, d, e, f) {
          e = a(c, d, e, f);c = b(e, c, d);return u(e) ? c : e;
        };a.$$watchDelegate && a.$$watchDelegate !== l ? c.$$watchDelegate = a.$$watchDelegate : b.$stateful || (c.$$watchDelegate = l, d = !a.inputs, c.inputs = a.inputs ? a.inputs : [a]);return c;
      }var J = ya().noUnsafeEval,
          t = { csp: J, expensiveChecks: !1, literals: pa(d), isIdentifierStart: F(c) && c, isIdentifierContinue: F(e) && e },
          s = { csp: J, expensiveChecks: !0, literals: pa(d), isIdentifierStart: F(c) && c, isIdentifierContinue: F(e) && e },
          D = !1;g.$$runningExpensiveChecks = function () {
        return D;
      };return g;
    }];
  }function Lf() {
    this.$get = ["$rootScope", "$exceptionHandler", function (a, b) {
      return Kd(function (b) {
        a.$evalAsync(b);
      }, b);
    }];
  }function Mf() {
    this.$get = ["$browser", "$exceptionHandler", function (a, b) {
      return Kd(function (b) {
        a.defer(b);
      }, b);
    }];
  }function Kd(a, b) {
    function d() {
      this.$$state = { status: 0 };
    }function c(a, b) {
      return function (c) {
        b.call(a, c);
      };
    }function e(c) {
      !c.processScheduled && c.pending && (c.processScheduled = !0, a(function () {
        var a, d, e;e = c.pending;c.processScheduled = !1;c.pending = void 0;for (var f = 0, g = e.length; f < g; ++f) {
          d = e[f][0];a = e[f][c.status];
          try {
            F(a) ? d.resolve(a(c.value)) : 1 === c.status ? d.resolve(c.value) : d.reject(c.value);
          } catch (h) {
            d.reject(h), b(h);
          }
        }
      }));
    }function f() {
      this.promise = new d();
    }var g = N("$q", TypeError),
        h = function h() {
      var a = new f();a.resolve = c(a, a.resolve);a.reject = c(a, a.reject);a.notify = c(a, a.notify);return a;
    };R(d.prototype, { then: function then(a, b, c) {
        if (z(a) && z(b) && z(c)) return this;var d = new f();this.$$state.pending = this.$$state.pending || [];this.$$state.pending.push([d, a, b, c]);0 < this.$$state.status && e(this.$$state);return d.promise;
      }, "catch": function _catch(a) {
        return this.then(null, a);
      }, "finally": function _finally(a, b) {
        return this.then(function (b) {
          return l(b, !0, a);
        }, function (b) {
          return l(b, !1, a);
        }, b);
      } });R(f.prototype, { resolve: function resolve(a) {
        this.promise.$$state.status || (a === this.promise ? this.$$reject(g("qcycle", a)) : this.$$resolve(a));
      }, $$resolve: function $$resolve(a) {
        function d(a) {
          k || (k = !0, h.$$resolve(a));
        }function f(a) {
          k || (k = !0, h.$$reject(a));
        }var g,
            h = this,
            k = !1;try {
          if (I(a) || F(a)) g = a && a.then;F(g) ? (this.promise.$$state.status = -1, g.call(a, d, f, c(this, this.notify))) : (this.promise.$$state.value = a, this.promise.$$state.status = 1, e(this.promise.$$state));
        } catch (l) {
          f(l), b(l);
        }
      }, reject: function reject(a) {
        this.promise.$$state.status || this.$$reject(a);
      }, $$reject: function $$reject(a) {
        this.promise.$$state.value = a;this.promise.$$state.status = 2;e(this.promise.$$state);
      }, notify: function notify(c) {
        var d = this.promise.$$state.pending;0 >= this.promise.$$state.status && d && d.length && a(function () {
          for (var a, e, f = 0, g = d.length; f < g; f++) {
            e = d[f][0];a = d[f][3];try {
              e.notify(F(a) ? a(c) : c);
            } catch (h) {
              b(h);
            }
          }
        });
      } });var k = function k(a, b) {
      var c = new f();b ? c.resolve(a) : c.reject(a);return c.promise;
    },
        l = function l(a, b, c) {
      var d = null;try {
        F(c) && (d = c());
      } catch (e) {
        return k(e, !1);
      }return d && F(d.then) ? d.then(function () {
        return k(a, b);
      }, function (a) {
        return k(a, !1);
      }) : k(a, b);
    },
        m = function m(a, b, c, d) {
      var e = new f();e.resolve(a);return e.promise.then(b, c, d);
    },
        n = function n(a) {
      if (!F(a)) throw g("norslvr", a);var b = new f();a(function (a) {
        b.resolve(a);
      }, function (a) {
        b.reject(a);
      });return b.promise;
    };n.prototype = d.prototype;n.defer = h;n.reject = function (a) {
      var b = new f();b.reject(a);return b.promise;
    };n.when = m;n.resolve = m;n.all = function (a) {
      var b = new f(),
          c = 0,
          d = K(a) ? [] : {};q(a, function (a, e) {
        c++;m(a).then(function (a) {
          d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
        }, function (a) {
          d.hasOwnProperty(e) || b.reject(a);
        });
      });0 === c && b.resolve(d);return b.promise;
    };n.race = function (a) {
      var b = h();q(a, function (a) {
        m(a).then(b.resolve, b.reject);
      });return b.promise;
    };return n;
  }function Vf() {
    this.$get = ["$window", "$timeout", function (a, b) {
      var d = a.requestAnimationFrame || a.webkitRequestAnimationFrame,
          c = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
          e = !!d,
          f = e ? function (a) {
        var b = d(a);return function () {
          c(b);
        };
      } : function (a) {
        var c = b(a, 16.66, !1);return function () {
          b.cancel(c);
        };
      };f.supported = e;return f;
    }];
  }function Kf() {
    function a(a) {
      function b() {
        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;this.$$listeners = {};this.$$listenerCount = {};this.$$watchersCount = 0;this.$id = ++sb;this.$$ChildScope = null;
      }b.prototype = a;return b;
    }var b = 10,
        d = N("$rootScope"),
        c = null,
        e = null;this.digestTtl = function (a) {
      arguments.length && (b = a);return b;
    };this.$get = ["$exceptionHandler", "$parse", "$browser", function (f, g, h) {
      function k(a) {
        a.currentScope.$$destroyed = !0;
      }function l(a) {
        9 === Fa && (a.$$childHead && l(a.$$childHead), a.$$nextSibling && l(a.$$nextSibling));a.$parent = a.$$nextSibling = a.$$prevSibling = a.$$childHead = a.$$childTail = a.$root = a.$$watchers = null;
      }function m() {
        this.$id = ++sb;this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;this.$root = this;this.$$destroyed = !1;this.$$listeners = {};this.$$listenerCount = {};this.$$watchersCount = 0;this.$$isolateBindings = null;
      }function n(a) {
        if (D.$$phase) throw d("inprog", D.$$phase);D.$$phase = a;
      }function p(a, b) {
        do {
          a.$$watchersCount += b;
        } while (a = a.$parent);
      }function x(a, b, c) {
        do {
          a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
        } while (a = a.$parent);
      }function J() {}function t() {
        for (; w.length;) {
          try {
            w.shift()();
          } catch (a) {
            f(a);
          }
        }e = null;
      }function s() {
        null === e && (e = h.defer(function () {
          D.$apply(t);
        }));
      }m.prototype = { constructor: m, $new: function $new(b, c) {
          var d;c = c || this;b ? (d = new m(), d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), d = new this.$$ChildScope());d.$parent = c;d.$$prevSibling = c.$$childTail;c.$$childHead ? (c.$$childTail.$$nextSibling = d, c.$$childTail = d) : c.$$childHead = c.$$childTail = d;(b || c !== this) && d.$on("$destroy", k);return d;
        }, $watch: function $watch(a, b, d, e) {
          var f = g(a);if (f.$$watchDelegate) return f.$$watchDelegate(this, b, d, f, a);var h = this,
              k = h.$$watchers,
              l = { fn: b, last: J, get: f, exp: e || a, eq: !!d };c = null;F(b) || (l.fn = C);k || (k = h.$$watchers = []);k.unshift(l);p(this, 1);return function () {
            0 <= ab(k, l) && p(h, -1);c = null;
          };
        }, $watchGroup: function $watchGroup(a, b) {
          function c() {
            h = !1;k ? (k = !1, b(e, e, g)) : b(e, d, g);
          }var d = Array(a.length),
              e = Array(a.length),
              f = [],
              g = this,
              h = !1,
              k = !0;if (!a.length) {
            var l = !0;g.$evalAsync(function () {
              l && b(e, e, g);
            });return function () {
              l = !1;
            };
          }if (1 === a.length) return this.$watch(a[0], function (a, c, f) {
            e[0] = a;d[0] = c;b(e, a === c ? e : d, f);
          });q(a, function (a, b) {
            var k = g.$watch(a, function (a, f) {
              e[b] = a;d[b] = f;h || (h = !0, g.$evalAsync(c));
            });f.push(k);
          });return function () {
            for (; f.length;) {
              f.shift()();
            }
          };
        },
        $watchCollection: function $watchCollection(a, b) {
          function c(a) {
            e = a;var b, d, g, h;if (!z(e)) {
              if (I(e)) {
                if (ra(e)) for (f !== n && (f = n, s = f.length = 0, l++), a = e.length, s !== a && (l++, f.length = s = a), b = 0; b < a; b++) {
                  h = f[b], g = e[b], d = h !== h && g !== g, d || h === g || (l++, f[b] = g);
                } else {
                  f !== p && (f = p = {}, s = 0, l++);a = 0;for (b in e) {
                    sa.call(e, b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, d || h === g || (l++, f[b] = g)) : (s++, f[b] = g, l++));
                  }if (s > a) for (b in l++, f) {
                    sa.call(e, b) || (s--, delete f[b]);
                  }
                }
              } else f !== e && (f = e, l++);return l;
            }
          }c.$stateful = !0;var d = this,
              e,
              f,
              h,
              k = 1 < b.length,
              l = 0,
              m = g(a, c),
              n = [],
              p = {},
              x = !0,
              s = 0;return this.$watch(m, function () {
            x ? (x = !1, b(e, e, d)) : b(e, h, d);if (k) if (I(e)) {
              if (ra(e)) {
                h = Array(e.length);for (var a = 0; a < e.length; a++) {
                  h[a] = e[a];
                }
              } else for (a in h = {}, e) {
                sa.call(e, a) && (h[a] = e[a]);
              }
            } else h = e;
          });
        }, $digest: function $digest() {
          var a,
              g,
              k,
              l,
              m,
              p,
              x,
              s,
              q = b,
              w,
              u = [],
              z,
              C;n("$digest");h.$$checkUrlChange();this === D && null !== e && (h.defer.cancel(e), t());c = null;do {
            s = !1;w = this;for (p = 0; p < y.length; p++) {
              try {
                C = y[p], C.scope.$eval(C.expression, C.locals);
              } catch (B) {
                f(B);
              }c = null;
            }y.length = 0;a: do {
              if (p = w.$$watchers) for (x = p.length; x--;) {
                try {
                  if (a = p[x]) if (m = a.get, (g = m(w)) !== (k = a.last) && !(a.eq ? oa(g, k) : X(g) && X(k))) s = !0, c = a, a.last = a.eq ? pa(g, null) : g, l = a.fn, l(g, k === J ? g : k, w), 5 > q && (z = 4 - q, u[z] || (u[z] = []), u[z].push({ msg: F(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp, newVal: g, oldVal: k }));else if (a === c) {
                    s = !1;break a;
                  }
                } catch (E) {
                  f(E);
                }
              }if (!(p = w.$$watchersCount && w.$$childHead || w !== this && w.$$nextSibling)) for (; w !== this && !(p = w.$$nextSibling);) {
                w = w.$parent;
              }
            } while (w = p);if ((s || y.length) && !q--) throw D.$$phase = null, d("infdig", b, u);
          } while (s || y.length);for (D.$$phase = null; O < r.length;) {
            try {
              r[O++]();
            } catch (H) {
              f(H);
            }
          }r.length = O = 0;
        }, $destroy: function $destroy() {
          if (!this.$$destroyed) {
            var a = this.$parent;this.$broadcast("$destroy");this.$$destroyed = !0;this === D && h.$$applicationDestroyed();p(this, -this.$$watchersCount);for (var b in this.$$listenerCount) {
              x(this, this.$$listenerCount[b], b);
            }a && a.$$childHead === this && (a.$$childHead = this.$$nextSibling);a && a.$$childTail === this && (a.$$childTail = this.$$prevSibling);this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling);
            this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling);this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = C;this.$on = this.$watch = this.$watchGroup = function () {
              return C;
            };this.$$listeners = {};this.$$nextSibling = null;l(this);
          }
        }, $eval: function $eval(a, b) {
          return g(a)(this, b);
        }, $evalAsync: function $evalAsync(a, b) {
          D.$$phase || y.length || h.defer(function () {
            y.length && D.$digest();
          });y.push({ scope: this, expression: g(a), locals: b });
        }, $$postDigest: function $$postDigest(a) {
          r.push(a);
        }, $apply: function $apply(a) {
          try {
            n("$apply");
            try {
              return this.$eval(a);
            } finally {
              D.$$phase = null;
            }
          } catch (b) {
            f(b);
          } finally {
            try {
              D.$digest();
            } catch (c) {
              throw f(c), c;
            }
          }
        }, $applyAsync: function $applyAsync(a) {
          function b() {
            c.$eval(a);
          }var c = this;a && w.push(b);a = g(a);s();
        }, $on: function $on(a, b) {
          var c = this.$$listeners[a];c || (this.$$listeners[a] = c = []);c.push(b);var d = this;do {
            d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++;
          } while (d = d.$parent);var e = this;return function () {
            var d = c.indexOf(b);-1 !== d && (c[d] = null, x(e, 1, a));
          };
        }, $emit: function $emit(a, b) {
          var c = [],
              d,
              e = this,
              g = !1,
              h = { name: a, targetScope: e, stopPropagation: function stopPropagation() {
              g = !0;
            }, preventDefault: function preventDefault() {
              h.defaultPrevented = !0;
            }, defaultPrevented: !1 },
              k = bb([h], arguments, 1),
              l,
              m;do {
            d = e.$$listeners[a] || c;h.currentScope = e;l = 0;for (m = d.length; l < m; l++) {
              if (d[l]) try {
                d[l].apply(null, k);
              } catch (n) {
                f(n);
              } else d.splice(l, 1), l--, m--;
            }if (g) return h.currentScope = null, h;e = e.$parent;
          } while (e);h.currentScope = null;return h;
        }, $broadcast: function $broadcast(a, b) {
          var c = this,
              d = this,
              e = { name: a, targetScope: this, preventDefault: function preventDefault() {
              e.defaultPrevented = !0;
            },
            defaultPrevented: !1 };if (!this.$$listenerCount[a]) return e;for (var g = bb([e], arguments, 1), h, k; c = d;) {
            e.currentScope = c;d = c.$$listeners[a] || [];h = 0;for (k = d.length; h < k; h++) {
              if (d[h]) try {
                d[h].apply(null, g);
              } catch (l) {
                f(l);
              } else d.splice(h, 1), h--, k--;
            }if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (; c !== this && !(d = c.$$nextSibling);) {
              c = c.$parent;
            }
          }e.currentScope = null;return e;
        } };var D = new m(),
          y = D.$$asyncQueue = [],
          r = D.$$postDigestQueue = [],
          w = D.$$applyAsyncQueue = [],
          O = 0;return D;
    }];
  }function De() {
    var a = /^\s*(https?|ftp|mailto|tel|file):/,
        b = /^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist = function (b) {
      return u(b) ? (a = b, this) : a;
    };this.imgSrcSanitizationWhitelist = function (a) {
      return u(a) ? (b = a, this) : b;
    };this.$get = function () {
      return function (d, c) {
        var e = c ? b : a,
            f;f = Ca(d).href;return "" === f || f.match(e) ? d : "unsafe:" + f;
      };
    };
  }function Hg(a) {
    if ("self" === a) return a;if (H(a)) {
      if (-1 < a.indexOf("***")) throw fa("iwcard", a);a = Ld(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");return new RegExp("^" + a + "$");
    }if (Ya(a)) return new RegExp("^" + a.source + "$");throw fa("imatcher");
  }function Md(a) {
    var b = [];u(a) && q(a, function (a) {
      b.push(Hg(a));
    });return b;
  }function Of() {
    this.SCE_CONTEXTS = la;var a = ["self"],
        b = [];this.resourceUrlWhitelist = function (b) {
      arguments.length && (a = Md(b));return a;
    };this.resourceUrlBlacklist = function (a) {
      arguments.length && (b = Md(a));return b;
    };this.$get = ["$injector", function (d) {
      function c(a, b) {
        return "self" === a ? qd(b) : !!a.exec(b.href);
      }function e(a) {
        var b = function b(a) {
          this.$$unwrapTrustedValue = function () {
            return a;
          };
        };a && (b.prototype = new a());b.prototype.valueOf = function () {
          return this.$$unwrapTrustedValue();
        };b.prototype.toString = function () {
          return this.$$unwrapTrustedValue().toString();
        };return b;
      }var f = function f(a) {
        throw fa("unsafe");
      };d.has("$sanitize") && (f = d.get("$sanitize"));var g = e(),
          h = {};h[la.HTML] = e(g);h[la.CSS] = e(g);h[la.URL] = e(g);h[la.JS] = e(g);h[la.RESOURCE_URL] = e(h[la.URL]);return { trustAs: function trustAs(a, b) {
          var c = h.hasOwnProperty(a) ? h[a] : null;if (!c) throw fa("icontext", a, b);if (null === b || z(b) || "" === b) return b;if ("string" !== typeof b) throw fa("itype", a);return new c(b);
        }, getTrusted: function getTrusted(d, e) {
          if (null === e || z(e) || "" === e) return e;var g = h.hasOwnProperty(d) ? h[d] : null;if (g && e instanceof g) return e.$$unwrapTrustedValue();if (d === la.RESOURCE_URL) {
            var g = Ca(e.toString()),
                n,
                p,
                x = !1;n = 0;for (p = a.length; n < p; n++) {
              if (c(a[n], g)) {
                x = !0;break;
              }
            }if (x) for (n = 0, p = b.length; n < p; n++) {
              if (c(b[n], g)) {
                x = !1;break;
              }
            }if (x) return e;throw fa("insecurl", e.toString());
          }if (d === la.HTML) return f(e);throw fa("unsafe");
        }, valueOf: function valueOf(a) {
          return a instanceof g ? a.$$unwrapTrustedValue() : a;
        } };
    }];
  }function Nf() {
    var a = !0;this.enabled = function (b) {
      arguments.length && (a = !!b);return a;
    };this.$get = ["$parse", "$sceDelegate", function (b, d) {
      if (a && 8 > Fa) throw fa("iequirks");var c = ia(la);c.isEnabled = function () {
        return a;
      };c.trustAs = d.trustAs;c.getTrusted = d.getTrusted;c.valueOf = d.valueOf;a || (c.trustAs = c.getTrusted = function (a, b) {
        return b;
      }, c.valueOf = Za);c.parseAs = function (a, d) {
        var e = b(d);return e.literal && e.constant ? e : b(d, function (b) {
          return c.getTrusted(a, b);
        });
      };var e = c.parseAs,
          f = c.getTrusted,
          g = c.trustAs;q(la, function (a, b) {
        var d = P(b);c[fb("parse_as_" + d)] = function (b) {
          return e(a, b);
        };c[fb("get_trusted_" + d)] = function (b) {
          return f(a, b);
        };c[fb("trust_as_" + d)] = function (b) {
          return g(a, b);
        };
      });return c;
    }];
  }function Pf() {
    this.$get = ["$window", "$document", function (a, b) {
      var d = {},
          c = !(a.chrome && (a.chrome.app && a.chrome.app.runtime || !a.chrome.app && a.chrome.runtime && a.chrome.runtime.id)) && a.history && a.history.pushState,
          e = aa((/android (\d+)/.exec(P((a.navigator || {}).userAgent)) || [])[1]),
          f = /Boxee/i.test((a.navigator || {}).userAgent),
          g = b[0] || {},
          h,
          k = /^(Moz|webkit|ms)(?=[A-Z])/,
          l = g.body && g.body.style,
          m = !1,
          n = !1;if (l) {
        for (var p in l) {
          if (m = k.exec(p)) {
            h = m[0];h = h[0].toUpperCase() + h.substr(1);break;
          }
        }h || (h = "WebkitOpacity" in l && "webkit");m = !!("transition" in l || h + "Transition" in l);n = !!("animation" in l || h + "Animation" in l);!e || m && n || (m = H(l.webkitTransition), n = H(l.webkitAnimation));
      }return { history: !(!c || 4 > e || f), hasEvent: function hasEvent(a) {
          if ("input" === a && 11 >= Fa) return !1;if (z(d[a])) {
            var b = g.createElement("div");d[a] = "on" + a in b;
          }return d[a];
        },
        csp: ya(), vendorPrefix: h, transitions: m, animations: n, android: e };
    }];
  }function Rf() {
    var a;this.httpOptions = function (b) {
      return b ? (a = b, this) : a;
    };this.$get = ["$templateCache", "$http", "$q", "$sce", function (b, d, c, e) {
      function f(g, h) {
        f.totalPendingRequests++;if (!H(g) || z(b.get(g))) g = e.getTrustedResourceUrl(g);var k = d.defaults && d.defaults.transformResponse;K(k) ? k = k.filter(function (a) {
          return a !== ic;
        }) : k === ic && (k = null);return d.get(g, R({ cache: b, transformResponse: k }, a))["finally"](function () {
          f.totalPendingRequests--;
        }).then(function (a) {
          b.put(g, a.data);return a.data;
        }, function (a) {
          if (!h) throw Ig("tpload", g, a.status, a.statusText);return c.reject(a);
        });
      }f.totalPendingRequests = 0;return f;
    }];
  }function Sf() {
    this.$get = ["$rootScope", "$browser", "$location", function (a, b, d) {
      return { findBindings: function findBindings(a, b, d) {
          a = a.getElementsByClassName("ng-binding");var g = [];q(a, function (a) {
            var c = ga.element(a).data("$binding");c && q(c, function (c) {
              d ? new RegExp("(^|\\s)" + Ld(b) + "(\\s|\\||$)").test(c) && g.push(a) : -1 !== c.indexOf(b) && g.push(a);
            });
          });return g;
        }, findModels: function findModels(a, b, d) {
          for (var g = ["ng-", "data-ng-", "ng\\:"], h = 0; h < g.length; ++h) {
            var k = a.querySelectorAll("[" + g[h] + "model" + (d ? "=" : "*=") + '"' + b + '"]');if (k.length) return k;
          }
        }, getLocation: function getLocation() {
          return d.url();
        }, setLocation: function setLocation(b) {
          b !== d.url() && (d.url(b), a.$digest());
        }, whenStable: function whenStable(a) {
          b.notifyWhenNoOutstandingRequests(a);
        } };
    }];
  }function Tf() {
    this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function (a, b, d, c, e) {
      function f(f, k, l) {
        F(f) || (l = k, k = f, f = C);var m = ta.call(arguments, 3),
            n = u(l) && !l,
            p = (n ? c : d).defer(),
            x = p.promise,
            q;q = b.defer(function () {
          try {
            p.resolve(f.apply(null, m));
          } catch (b) {
            p.reject(b), e(b);
          } finally {
            delete g[x.$$timeoutId];
          }n || a.$apply();
        }, k);x.$$timeoutId = q;g[q] = p;return x;
      }var g = {};f.cancel = function (a) {
        return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1;
      };return f;
    }];
  }function Ca(a) {
    Fa && (V.setAttribute("href", a), a = V.href);V.setAttribute("href", a);return { href: V.href, protocol: V.protocol ? V.protocol.replace(/:$/, "") : "", host: V.host,
      search: V.search ? V.search.replace(/^\?/, "") : "", hash: V.hash ? V.hash.replace(/^#/, "") : "", hostname: V.hostname, port: V.port, pathname: "/" === V.pathname.charAt(0) ? V.pathname : "/" + V.pathname };
  }function qd(a) {
    a = H(a) ? Ca(a) : a;return a.protocol === Nd.protocol && a.host === Nd.host;
  }function Uf() {
    this.$get = ma(B);
  }function Od(a) {
    function b(a) {
      try {
        return decodeURIComponent(a);
      } catch (b) {
        return a;
      }
    }var d = a[0] || {},
        c = {},
        e = "";return function () {
      var a, g, h, k, l;a = d.cookie || "";if (a !== e) for (e = a, a = e.split("; "), c = {}, h = 0; h < a.length; h++) {
        g = a[h], k = g.indexOf("="), 0 < k && (l = b(g.substring(0, k)), z(c[l]) && (c[l] = b(g.substring(k + 1))));
      }return c;
    };
  }function Yf() {
    this.$get = Od;
  }function Tc(a) {
    function b(d, c) {
      if (I(d)) {
        var e = {};q(d, function (a, c) {
          e[c] = b(c, a);
        });return e;
      }return a.factory(d + "Filter", c);
    }this.register = b;this.$get = ["$injector", function (a) {
      return function (b) {
        return a.get(b + "Filter");
      };
    }];b("currency", Pd);b("date", Qd);b("filter", Jg);b("json", Kg);b("limitTo", Lg);b("lowercase", Mg);b("number", Rd);b("orderBy", Sd);b("uppercase", Ng);
  }function Jg() {
    return function (a, b, d, c) {
      if (!ra(a)) {
        if (null == a) return a;throw N("filter")("notarray", a);
      }c = c || "$";var e;switch (qc(b)) {case "function":
          break;case "boolean":case "null":case "number":case "string":
          e = !0;case "object":
          b = Og(b, d, c, e);break;default:
          return a;}return Array.prototype.filter.call(a, b);
    };
  }function Og(a, b, d, c) {
    var e = I(a) && d in a;!0 === b ? b = oa : F(b) || (b = function b(a, _b) {
      if (z(a)) return !1;if (null === a || null === _b) return a === _b;if (I(_b) || I(a) && !Cc(a)) return !1;a = P("" + a);_b = P("" + _b);return -1 !== a.indexOf(_b);
    });return function (f) {
      return e && !I(f) ? La(f, a[d], b, d, !1) : La(f, a, b, d, c);
    };
  }function La(a, b, d, c, e, f) {
    var g = qc(a),
        h = qc(b);if ("string" === h && "!" === b.charAt(0)) return !La(a, b.substring(1), d, c, e);if (K(a)) return a.some(function (a) {
      return La(a, b, d, c, e);
    });switch (g) {case "object":
        var k;if (e) {
          for (k in a) {
            if ("$" !== k.charAt(0) && La(a[k], b, d, c, !0)) return !0;
          }return f ? !1 : La(a, b, d, c, !1);
        }if ("object" === h) {
          for (k in b) {
            if (f = b[k], !F(f) && !z(f) && (g = k === c, !La(g ? a : a[k], f, d, c, g, g))) return !1;
          }return !0;
        }return d(a, b);case "function":
        return !1;default:
        return d(a, b);}
  }function qc(a) {
    return null === a ? "null" : typeof a === "undefined" ? "undefined" : _typeof(a);
  }function Pd(a) {
    var b = a.NUMBER_FORMATS;return function (a, c, e) {
      z(c) && (c = b.CURRENCY_SYM);z(e) && (e = b.PATTERNS[1].maxFrac);return null == a ? a : Td(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, e).replace(/\u00A4/g, c);
    };
  }function Rd(a) {
    var b = a.NUMBER_FORMATS;return function (a, c) {
      return null == a ? a : Td(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c);
    };
  }function Pg(a) {
    var b = 0,
        d,
        c,
        e,
        f,
        g;-1 < (c = a.indexOf(Ud)) && (a = a.replace(Ud, ""));0 < (e = a.search(/e/i)) ? (0 > c && (c = e), c += +a.slice(e + 1), a = a.substring(0, e)) : 0 > c && (c = a.length);for (e = 0; a.charAt(e) === rc; e++) {}if (e === (g = a.length)) d = [0], c = 1;else {
      for (g--; a.charAt(g) === rc;) {
        g--;
      }c -= e;d = [];for (f = 0; e <= g; e++, f++) {
        d[f] = +a.charAt(e);
      }
    }c > Vd && (d = d.splice(0, Vd - 1), b = c - 1, c = 1);return { d: d, e: b, i: c };
  }function Qg(a, b, d, c) {
    var e = a.d,
        f = e.length - a.i;b = z(b) ? Math.min(Math.max(d, f), c) : +b;d = b + a.i;c = e[d];if (0 < d) {
      e.splice(Math.max(a.i, d));for (var g = d; g < e.length; g++) {
        e[g] = 0;
      }
    } else for (f = Math.max(0, f), a.i = 1, e.length = Math.max(1, d = b + 1), e[0] = 0, g = 1; g < d; g++) {
      e[g] = 0;
    }if (5 <= c) if (0 > d - 1) {
      for (c = 0; c > d; c--) {
        e.unshift(0), a.i++;
      }e.unshift(1);a.i++;
    } else e[d - 1]++;for (; f < Math.max(0, b); f++) {
      e.push(0);
    }if (b = e.reduceRight(function (a, b, c, d) {
      b += a;d[c] = b % 10;return Math.floor(b / 10);
    }, 0)) e.unshift(b), a.i++;
  }function Td(a, b, d, c, e) {
    if (!H(a) && !Z(a) || isNaN(a)) return "";var f = !isFinite(a),
        g = !1,
        h = Math.abs(a) + "",
        k = "";if (f) k = "\u221E";else {
      g = Pg(h);Qg(g, e, b.minFrac, b.maxFrac);k = g.d;h = g.i;e = g.e;f = [];for (g = k.reduce(function (a, b) {
        return a && !b;
      }, !0); 0 > h;) {
        k.unshift(0), h++;
      }0 < h ? f = k.splice(h, k.length) : (f = k, k = [0]);h = [];for (k.length >= b.lgSize && h.unshift(k.splice(-b.lgSize, k.length).join("")); k.length > b.gSize;) {
        h.unshift(k.splice(-b.gSize, k.length).join(""));
      }k.length && h.unshift(k.join(""));k = h.join(d);f.length && (k += c + f.join(""));e && (k += "e+" + e);
    }return 0 > a && !g ? b.negPre + k + b.negSuf : b.posPre + k + b.posSuf;
  }function Nb(a, b, d, c) {
    var e = "";if (0 > a || c && 0 >= a) c ? a = -a + 1 : (a = -a, e = "-");for (a = "" + a; a.length < b;) {
      a = rc + a;
    }d && (a = a.substr(a.length - b));return e + a;
  }function Y(a, b, d, c, e) {
    d = d || 0;return function (f) {
      f = f["get" + a]();if (0 < d || f > -d) f += d;0 === f && -12 === d && (f = 12);return Nb(f, b, c, e);
    };
  }function nb(a, b, d) {
    return function (c, e) {
      var f = c["get" + a](),
          g = xb((d ? "STANDALONE" : "") + (b ? "SHORT" : "") + a);return e[g][f];
    };
  }function Wd(a) {
    var b = new Date(a, 0, 1).getDay();return new Date(a, 0, (4 >= b ? 5 : 12) - b);
  }function Xd(a) {
    return function (b) {
      var d = Wd(b.getFullYear());b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +d;b = 1 + Math.round(b / 6048E5);return Nb(b, a);
    };
  }function sc(a, b) {
    return 0 >= a.getFullYear() ? b.ERAS[0] : b.ERAS[1];
  }function Qd(a) {
    function b(a) {
      var b;if (b = a.match(d)) {
        a = new Date(0);var f = 0,
            g = 0,
            h = b[8] ? a.setUTCFullYear : a.setFullYear,
            k = b[8] ? a.setUTCHours : a.setHours;b[9] && (f = aa(b[9] + b[10]), g = aa(b[9] + b[11]));h.call(a, aa(b[1]), aa(b[2]) - 1, aa(b[3]));f = aa(b[4] || 0) - f;g = aa(b[5] || 0) - g;h = aa(b[6] || 0);b = Math.round(1E3 * parseFloat("0." + (b[7] || 0)));k.call(a, f, g, h, b);
      }return a;
    }var d = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function (c, d, f) {
      var g = "",
          h = [],
          k,
          l;d = d || "mediumDate";d = a.DATETIME_FORMATS[d] || d;H(c) && (c = Rg.test(c) ? aa(c) : b(c));Z(c) && (c = new Date(c));if (!ba(c) || !isFinite(c.getTime())) return c;for (; d;) {
        (l = Sg.exec(d)) ? (h = bb(h, l, 1), d = h.pop()) : (h.push(d), d = null);
      }var m = c.getTimezoneOffset();f && (m = Fc(f, m), c = Vb(c, f, !0));q(h, function (b) {
        k = Tg[b];g += k ? k(c, a.DATETIME_FORMATS, m) : "''" === b ? "'" : b.replace(/(^'|'$)/g, "").replace(/''/g, "'");
      });return g;
    };
  }function Kg() {
    return function (a, b) {
      z(b) && (b = 2);return db(a, b);
    };
  }function Lg() {
    return function (a, b, d) {
      b = Infinity === Math.abs(Number(b)) ? Number(b) : aa(b);if (X(b)) return a;Z(a) && (a = a.toString());if (!ra(a)) return a;
      d = !d || isNaN(d) ? 0 : aa(d);d = 0 > d ? Math.max(0, a.length + d) : d;return 0 <= b ? tc(a, d, d + b) : 0 === d ? tc(a, b, a.length) : tc(a, Math.max(0, d + b), d);
    };
  }function tc(a, b, d) {
    return H(a) ? a.slice(b, d) : ta.call(a, b, d);
  }function Sd(a) {
    function b(b) {
      return b.map(function (b) {
        var c = 1,
            d = Za;if (F(b)) d = b;else if (H(b)) {
          if ("+" === b.charAt(0) || "-" === b.charAt(0)) c = "-" === b.charAt(0) ? -1 : 1, b = b.substring(1);if ("" !== b && (d = a(b), d.constant)) var e = d(),
              d = function d(a) {
            return a[e];
          };
        }return { get: d, descending: c };
      });
    }function d(a) {
      switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "number":case "boolean":case "string":
          return !0;
        default:
          return !1;}
    }function c(a, b) {
      var c = 0,
          d = a.type,
          k = b.type;if (d === k) {
        var k = a.value,
            l = b.value;"string" === d ? (k = k.toLowerCase(), l = l.toLowerCase()) : "object" === d && (I(k) && (k = a.index), I(l) && (l = b.index));k !== l && (c = k < l ? -1 : 1);
      } else c = d < k ? -1 : 1;return c;
    }return function (a, f, g, h) {
      if (null == a) return a;if (!ra(a)) throw N("orderBy")("notarray", a);K(f) || (f = [f]);0 === f.length && (f = ["+"]);var k = b(f),
          l = g ? -1 : 1,
          m = F(h) ? h : c;a = Array.prototype.map.call(a, function (a, b) {
        return { value: a, tieBreaker: { value: b, type: "number", index: b }, predicateValues: k.map(function (c) {
            var e = c.get(a);c = typeof e === "undefined" ? "undefined" : _typeof(e);if (null === e) c = "string", e = "null";else if ("object" === c) a: {
              if (F(e.valueOf) && (e = e.valueOf(), d(e))) break a;Cc(e) && (e = e.toString(), d(e));
            }return { value: e, type: c, index: b };
          }) };
      });a.sort(function (a, b) {
        for (var c = 0, d = k.length; c < d; c++) {
          var e = m(a.predicateValues[c], b.predicateValues[c]);if (e) return e * k[c].descending * l;
        }return m(a.tieBreaker, b.tieBreaker) * l;
      });return a = a.map(function (a) {
        return a.value;
      });
    };
  }function Ua(a) {
    F(a) && (a = { link: a });a.restrict = a.restrict || "AC";return ma(a);
  }function Yd(a, b, d, c, e) {
    var f = this,
        g = [];f.$error = {};f.$$success = {};f.$pending = void 0;f.$name = e(b.name || b.ngForm || "")(d);f.$dirty = !1;f.$pristine = !0;f.$valid = !0;f.$invalid = !1;f.$submitted = !1;f.$$parentForm = Ob;f.$rollbackViewValue = function () {
      q(g, function (a) {
        a.$rollbackViewValue();
      });
    };f.$commitViewValue = function () {
      q(g, function (a) {
        a.$commitViewValue();
      });
    };f.$addControl = function (a) {
      Qa(a.$name, "input");g.push(a);a.$name && (f[a.$name] = a);a.$$parentForm = f;
    };f.$$renameControl = function (a, b) {
      var c = a.$name;f[c] === a && delete f[c];f[b] = a;a.$name = b;
    };f.$removeControl = function (a) {
      a.$name && f[a.$name] === a && delete f[a.$name];q(f.$pending, function (b, c) {
        f.$setValidity(c, null, a);
      });q(f.$error, function (b, c) {
        f.$setValidity(c, null, a);
      });q(f.$$success, function (b, c) {
        f.$setValidity(c, null, a);
      });ab(g, a);a.$$parentForm = Ob;
    };Zd({ ctrl: this, $element: a, set: function set(a, b, c) {
        var d = a[b];d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [c];
      }, unset: function unset(a, b, c) {
        var d = a[b];d && (ab(d, c), 0 === d.length && delete a[b]);
      }, $animate: c });f.$setDirty = function () {
      c.removeClass(a, Va);c.addClass(a, Pb);f.$dirty = !0;f.$pristine = !1;f.$$parentForm.$setDirty();
    };f.$setPristine = function () {
      c.setClass(a, Va, Pb + " ng-submitted");f.$dirty = !1;f.$pristine = !0;f.$submitted = !1;q(g, function (a) {
        a.$setPristine();
      });
    };f.$setUntouched = function () {
      q(g, function (a) {
        a.$setUntouched();
      });
    };f.$setSubmitted = function () {
      c.addClass(a, "ng-submitted");f.$submitted = !0;f.$$parentForm.$setSubmitted();
    };
  }function uc(a) {
    a.$formatters.push(function (b) {
      return a.$isEmpty(b) ? b : b.toString();
    });
  }function Wa(a, b, d, c, e, f) {
    var g = P(b[0].type);if (!e.android) {
      var h = !1;b.on("compositionstart", function () {
        h = !0;
      });b.on("compositionend", function () {
        h = !1;l();
      });
    }var k,
        l = function l(a) {
      k && (f.defer.cancel(k), k = null);if (!h) {
        var e = b.val();a = a && a.type;"password" === g || d.ngTrim && "false" === d.ngTrim || (e = U(e));(c.$viewValue !== e || "" === e && c.$$hasNativeValidators) && c.$setViewValue(e, a);
      }
    };if (e.hasEvent("input")) b.on("input", l);else {
      var m = function m(a, b, c) {
        k || (k = f.defer(function () {
          k = null;b && b.value === c || l(a);
        }));
      };b.on("keydown", function (a) {
        var b = a.keyCode;91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b || m(a, this, this.value);
      });if (e.hasEvent("paste")) b.on("paste cut", m);
    }b.on("change", l);if ($d[g] && c.$$hasNativeValidators && g === d.type) b.on("keydown wheel mousedown", function (a) {
      if (!k) {
        var b = this.validity,
            c = b.badInput,
            d = b.typeMismatch;k = f.defer(function () {
          k = null;b.badInput === c && b.typeMismatch === d || l(a);
        });
      }
    });c.$render = function () {
      var a = c.$isEmpty(c.$viewValue) ? "" : c.$viewValue;b.val() !== a && b.val(a);
    };
  }function Qb(a, b) {
    return function (d, c) {
      var e, f;if (ba(d)) return d;if (H(d)) {
        '"' === d.charAt(0) && '"' === d.charAt(d.length - 1) && (d = d.substring(1, d.length - 1));if (Ug.test(d)) return new Date(d);a.lastIndex = 0;if (e = a.exec(d)) return e.shift(), f = c ? { yyyy: c.getFullYear(), MM: c.getMonth() + 1, dd: c.getDate(), HH: c.getHours(), mm: c.getMinutes(), ss: c.getSeconds(), sss: c.getMilliseconds() / 1E3 } : { yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0 }, q(e, function (a, c) {
          c < b.length && (f[b[c]] = +a);
        }), new Date(f.yyyy, f.MM - 1, f.dd, f.HH, f.mm, f.ss || 0, 1E3 * f.sss || 0);
      }return NaN;
    };
  }function ob(a, b, d, c) {
    return function (e, f, g, h, k, l, m) {
      function n(a) {
        return a && !(a.getTime && a.getTime() !== a.getTime());
      }function p(a) {
        return u(a) && !ba(a) ? d(a) || void 0 : a;
      }vc(e, f, g, h);Wa(e, f, g, h, k, l);var x = h && h.$options && h.$options.timezone,
          q;h.$$parserName = a;h.$parsers.push(function (a) {
        if (h.$isEmpty(a)) return null;if (b.test(a)) return a = d(a, q), x && (a = Vb(a, x)), a;
      });h.$formatters.push(function (a) {
        if (a && !ba(a)) throw pb("datefmt", a);if (n(a)) return (q = a) && x && (q = Vb(q, x, !0)), m("date")(a, c, x);q = null;return "";
      });if (u(g.min) || g.ngMin) {
        var t;h.$validators.min = function (a) {
          return !n(a) || z(t) || d(a) >= t;
        };g.$observe("min", function (a) {
          t = p(a);h.$validate();
        });
      }if (u(g.max) || g.ngMax) {
        var s;h.$validators.max = function (a) {
          return !n(a) || z(s) || d(a) <= s;
        };g.$observe("max", function (a) {
          s = p(a);h.$validate();
        });
      }
    };
  }function vc(a, b, d, c) {
    (c.$$hasNativeValidators = I(b[0].validity)) && c.$parsers.push(function (a) {
      var c = b.prop("validity") || {};return c.badInput || c.typeMismatch ? void 0 : a;
    });
  }function ae(a) {
    a.$$parserName = "number";a.$parsers.push(function (b) {
      if (a.$isEmpty(b)) return null;if (Vg.test(b)) return parseFloat(b);
    });a.$formatters.push(function (b) {
      if (!a.$isEmpty(b)) {
        if (!Z(b)) throw pb("numfmt", b);b = b.toString();
      }return b;
    });
  }function qb(a) {
    u(a) && !Z(a) && (a = parseFloat(a));return X(a) ? void 0 : a;
  }function wc(a) {
    var b = a.toString(),
        d = b.indexOf(".");return -1 === d ? -1 < a && 1 > a && (a = /e-(\d+)$/.exec(b)) ? Number(a[1]) : 0 : b.length - d - 1;
  }function be(a, b, d, c, e) {
    if (u(c)) {
      a = a(c);if (!a.constant) throw pb("constexpr", d, c);return a(b);
    }return e;
  }function xc(a, b) {
    a = "ngClass" + a;return ["$animate", function (d) {
      function c(a, b) {
        var c = [],
            d = 0;a: for (; d < a.length; d++) {
          for (var e = a[d], m = 0; m < b.length; m++) {
            if (e === b[m]) continue a;
          }c.push(e);
        }return c;
      }
      function e(a) {
        var b = [];return K(a) ? (q(a, function (a) {
          b = b.concat(e(a));
        }), b) : H(a) ? a.split(" ") : I(a) ? (q(a, function (a, c) {
          a && (b = b.concat(c.split(" ")));
        }), b) : a;
      }return { restrict: "AC", link: function link(f, g, h) {
          function k(a) {
            a = l(a, 1);h.$addClass(a);
          }function l(a, b) {
            var c = g.data("$classCounts") || S(),
                d = [];q(a, function (a) {
              if (0 < b || c[a]) c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a);
            });g.data("$classCounts", c);return d.join(" ");
          }function m(a, b) {
            var e = c(b, a),
                f = c(a, b),
                e = l(e, 1),
                f = l(f, -1);e && e.length && d.addClass(g, e);f && f.length && d.removeClass(g, f);
          }function n(a) {
            if (!0 === b || (f.$index & 1) === b) {
              var c = e(a || []);if (!p) k(c);else if (!oa(a, p)) {
                var d = e(p);m(d, c);
              }
            }p = K(a) ? a.map(function (a) {
              return ia(a);
            }) : ia(a);
          }var p;f.$watch(h[a], n, !0);h.$observe("class", function (b) {
            n(f.$eval(h[a]));
          });"ngClass" !== a && f.$watch("$index", function (c, d) {
            var g = c & 1;if (g !== (d & 1)) {
              var m = e(f.$eval(h[a]));g === b ? k(m) : (g = l(m, -1), h.$removeClass(g));
            }
          });
        } };
    }];
  }function Zd(a) {
    function b(a, b) {
      b && !f[a] ? (k.addClass(e, a), f[a] = !0) : !b && f[a] && (k.removeClass(e, a), f[a] = !1);
    }function d(a, c) {
      a = a ? "-" + Jc(a, "-") : "";b(rb + a, !0 === c);b(ce + a, !1 === c);
    }var c = a.ctrl,
        e = a.$element,
        f = {},
        g = a.set,
        h = a.unset,
        k = a.$animate;f[ce] = !(f[rb] = e.hasClass(rb));c.$setValidity = function (a, e, f) {
      z(e) ? (c.$pending || (c.$pending = {}), g(c.$pending, a, f)) : (c.$pending && h(c.$pending, a, f), de(c.$pending) && (c.$pending = void 0));Ia(e) ? e ? (h(c.$error, a, f), g(c.$$success, a, f)) : (g(c.$error, a, f), h(c.$$success, a, f)) : (h(c.$error, a, f), h(c.$$success, a, f));c.$pending ? (b(ee, !0), c.$valid = c.$invalid = void 0, d("", null)) : (b(ee, !1), c.$valid = de(c.$error), c.$invalid = !c.$valid, d("", c.$valid));e = c.$pending && c.$pending[a] ? void 0 : c.$error[a] ? !1 : c.$$success[a] ? !0 : null;d(a, e);c.$$parentForm.$setValidity(a, e, c);
    };
  }function de(a) {
    if (a) for (var b in a) {
      if (a.hasOwnProperty(b)) return !1;
    }return !0;
  }var Wg = /^\/(.+)\/([a-z]*)$/,
      sa = Object.prototype.hasOwnProperty,
      P = function P(a) {
    return H(a) ? a.toLowerCase() : a;
  },
      xb = function xb(a) {
    return H(a) ? a.toUpperCase() : a;
  },
      Fa,
      E,
      xa,
      ta = [].slice,
      pg = [].splice,
      Xg = [].push,
      na = Object.prototype.toString,
      Dc = Object.getPrototypeOf,
      va = N("ng"),
      ga = B.angular || (B.angular = {}),
      Xb,
      sb = 0;Fa = B.document.documentMode;var X = Number.isNaN || function (a) {
    return a !== a;
  };C.$inject = [];Za.$inject = [];var K = Array.isArray,
      pe = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,
      U = function U(a) {
    return H(a) ? a.trim() : a;
  },
      Ld = function Ld(a) {
    return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
  },
      ya = function ya() {
    if (!u(ya.rules)) {
      var a = B.document.querySelector("[ng-csp]") || B.document.querySelector("[data-ng-csp]");if (a) {
        var b = a.getAttribute("ng-csp") || a.getAttribute("data-ng-csp");ya.rules = { noUnsafeEval: !b || -1 !== b.indexOf("no-unsafe-eval"), noInlineStyle: !b || -1 !== b.indexOf("no-inline-style") };
      } else {
        a = ya;try {
          new Function(""), b = !1;
        } catch (d) {
          b = !0;
        }a.rules = { noUnsafeEval: b, noInlineStyle: !1 };
      }
    }return ya.rules;
  },
      ub = function ub() {
    if (u(ub.name_)) return ub.name_;var a,
        b,
        d = Na.length,
        c,
        e;for (b = 0; b < d; ++b) {
      if (c = Na[b], a = B.document.querySelector("[" + c.replace(":", "\\:") + "jq]")) {
        e = a.getAttribute(c + "jq");break;
      }
    }return ub.name_ = e;
  },
      se = /:/g,
      Na = ["ng-", "data-ng-", "ng:", "x-ng-"],
      ve = function (a) {
    if (!a.currentScript) return !0;var b = a.currentScript.getAttribute("src"),
        d = a.createElement("a");d.href = b;b = d.protocol;if (a.location.protocol === b) return !0;switch (b) {case "http:":case "https:":case "ftp:":case "blob:":case "file:":case "data:":
        return !0;default:
        return !1;}
  }(B.document),
      ye = /[A-Z]/g,
      Kc = !1,
      Ma = 3,
      Ce = { full: "1.5.9", major: 1, minor: 5, dot: 9, codeName: "timeturning-lockdown" };T.expando = "ng339";var hb = T.cache = {},
      dg = 1;T._data = function (a) {
    return this.cache[a[this.expando]] || {};
  };var Zf = /([:\-_]+(.))/g,
      $f = /^moz([A-Z])/,
      Bb = { mouseleave: "mouseout", mouseenter: "mouseover" },
      Zb = N("jqLite"),
      cg = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      Yb = /<|&#?\w+;/,
      ag = /<([\w:-]+)/,
      bg = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      ja = { option: [1, '<select multiple="multiple">', "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ja.optgroup = ja.option;ja.tbody = ja.tfoot = ja.colgroup = ja.caption = ja.thead;ja.th = ja.td;var ig = B.Node.prototype.contains || function (a) {
    return !!(this.compareDocumentPosition(a) & 16);
  },
      Oa = T.prototype = { ready: function ready(a) {
      function b() {
        d || (d = !0, a());
      }var d = !1;"complete" === B.document.readyState ? B.setTimeout(b) : (this.on("DOMContentLoaded", b), T(B).on("load", b));
    }, toString: function toString() {
      var a = [];q(this, function (b) {
        a.push("" + b);
      });return "[" + a.join(", ") + "]";
    }, eq: function eq(a) {
      return 0 <= a ? E(this[a]) : E(this[this.length + a]);
    }, length: 0, push: Xg, sort: [].sort, splice: [].splice },
      Hb = {};q("multiple selected checked disabled readOnly required open".split(" "), function (a) {
    Hb[P(a)] = a;
  });var bd = {};q("input select option textarea button form details".split(" "), function (a) {
    bd[a] = !0;
  });var jd = { ngMinlength: "minlength", ngMaxlength: "maxlength", ngMin: "min", ngMax: "max", ngPattern: "pattern" };q({ data: ac, removeData: gb, hasData: function hasData(a) {
      for (var b in hb[a.ng339]) {
        return !0;
      }return !1;
    }, cleanData: function cleanData(a) {
      for (var b = 0, d = a.length; b < d; b++) {
        gb(a[b]);
      }
    } }, function (a, b) {
    T[b] = a;
  });q({ data: ac, inheritedData: Fb, scope: function scope(a) {
      return E.data(a, "$scope") || Fb(a.parentNode || a, ["$isolateScope", "$scope"]);
    }, isolateScope: function isolateScope(a) {
      return E.data(a, "$isolateScope") || E.data(a, "$isolateScopeNoTemplate");
    }, controller: Zc, injector: function injector(a) {
      return Fb(a, "$injector");
    }, removeAttr: function removeAttr(a, b) {
      a.removeAttribute(b);
    }, hasClass: Cb, css: function css(a, b, d) {
      b = fb(b);if (u(d)) a.style[b] = d;else return a.style[b];
    }, attr: function attr(a, b, d) {
      var c = a.nodeType;if (c !== Ma && 2 !== c && 8 !== c) if (c = P(b), Hb[c]) {
        if (u(d)) d ? (a[b] = !0, a.setAttribute(b, c)) : (a[b] = !1, a.removeAttribute(c));else return a[b] || (a.attributes.getNamedItem(b) || C).specified ? c : void 0;
      } else if (u(d)) a.setAttribute(b, d);else if (a.getAttribute) return a = a.getAttribute(b, 2), null === a ? void 0 : a;
    }, prop: function prop(a, b, d) {
      if (u(d)) a[b] = d;else return a[b];
    }, text: function () {
      function a(a, d) {
        if (z(d)) {
          var c = a.nodeType;return 1 === c || c === Ma ? a.textContent : "";
        }a.textContent = d;
      }a.$dv = "";return a;
    }(), val: function val(a, b) {
      if (z(b)) {
        if (a.multiple && "select" === ua(a)) {
          var d = [];q(a.options, function (a) {
            a.selected && d.push(a.value || a.text);
          });return 0 === d.length ? null : d;
        }return a.value;
      }a.value = b;
    }, html: function html(a, b) {
      if (z(b)) return a.innerHTML;zb(a, !0);a.innerHTML = b;
    }, empty: $c }, function (a, b) {
    T.prototype[b] = function (b, c) {
      var e,
          f,
          g = this.length;if (a !== $c && z(2 === a.length && a !== Cb && a !== Zc ? b : c)) {
        if (I(b)) {
          for (e = 0; e < g; e++) {
            if (a === ac) a(this[e], b);else for (f in b) {
              a(this[e], f, b[f]);
            }
          }return this;
        }e = a.$dv;g = z(e) ? Math.min(g, 1) : g;for (f = 0; f < g; f++) {
          var h = a(this[f], b, c);e = e ? e + h : h;
        }return e;
      }for (e = 0; e < g; e++) {
        a(this[e], b, c);
      }return this;
    };
  });q({ removeData: gb, on: function on(a, b, d, c) {
      if (u(c)) throw Zb("onargs");if (Uc(a)) {
        c = Ab(a, !0);var e = c.events,
            f = c.handle;f || (f = c.handle = fg(a, e));c = 0 <= b.indexOf(" ") ? b.split(" ") : [b];for (var g = c.length, h = function h(b, c, g) {
          var h = e[b];h || (h = e[b] = [], h.specialHandlerWrapper = c, "$destroy" === b || g || a.addEventListener(b, f, !1));h.push(d);
        }; g--;) {
          b = c[g], Bb[b] ? (h(Bb[b], hg), h(b, void 0, !0)) : h(b);
        }
      }
    }, off: Yc, one: function one(a, b, d) {
      a = E(a);a.on(b, function e() {
        a.off(b, d);a.off(b, e);
      });a.on(b, d);
    }, replaceWith: function replaceWith(a, b) {
      var d,
          c = a.parentNode;zb(a);q(new T(b), function (b) {
        d ? c.insertBefore(b, d.nextSibling) : c.replaceChild(b, a);d = b;
      });
    }, children: function children(a) {
      var b = [];q(a.childNodes, function (a) {
        1 === a.nodeType && b.push(a);
      });return b;
    }, contents: function contents(a) {
      return a.contentDocument || a.childNodes || [];
    }, append: function append(a, b) {
      var d = a.nodeType;if (1 === d || 11 === d) {
        b = new T(b);for (var d = 0, c = b.length; d < c; d++) {
          a.appendChild(b[d]);
        }
      }
    }, prepend: function prepend(a, b) {
      if (1 === a.nodeType) {
        var d = a.firstChild;q(new T(b), function (b) {
          a.insertBefore(b, d);
        });
      }
    },
    wrap: function wrap(a, b) {
      Wc(a, E(b).eq(0).clone()[0]);
    }, remove: Gb, detach: function detach(a) {
      Gb(a, !0);
    }, after: function after(a, b) {
      var d = a,
          c = a.parentNode;b = new T(b);for (var e = 0, f = b.length; e < f; e++) {
        var g = b[e];c.insertBefore(g, d.nextSibling);d = g;
      }
    }, addClass: Eb, removeClass: Db, toggleClass: function toggleClass(a, b, d) {
      b && q(b.split(" "), function (b) {
        var e = d;z(e) && (e = !Cb(a, b));(e ? Eb : Db)(a, b);
      });
    }, parent: function parent(a) {
      return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
    }, next: function next(a) {
      return a.nextElementSibling;
    }, find: function find(a, b) {
      return a.getElementsByTagName ? a.getElementsByTagName(b) : [];
    }, clone: $b, triggerHandler: function triggerHandler(a, b, d) {
      var c,
          e,
          f = b.type || b,
          g = Ab(a);if (g = (g = g && g.events) && g[f]) c = { preventDefault: function preventDefault() {
          this.defaultPrevented = !0;
        }, isDefaultPrevented: function isDefaultPrevented() {
          return !0 === this.defaultPrevented;
        }, stopImmediatePropagation: function stopImmediatePropagation() {
          this.immediatePropagationStopped = !0;
        }, isImmediatePropagationStopped: function isImmediatePropagationStopped() {
          return !0 === this.immediatePropagationStopped;
        }, stopPropagation: C, type: f, target: a }, b.type && (c = R(c, b)), b = ia(g), e = d ? [c].concat(d) : [c], q(b, function (b) {
        c.isImmediatePropagationStopped() || b.apply(a, e);
      });
    } }, function (a, b) {
    T.prototype[b] = function (b, c, e) {
      for (var f, g = 0, h = this.length; g < h; g++) {
        z(f) ? (f = a(this[g], b, c, e), u(f) && (f = E(f))) : Xc(f, a(this[g], b, c, e));
      }return u(f) ? f : this;
    };T.prototype.bind = T.prototype.on;T.prototype.unbind = T.prototype.off;
  });Ra.prototype = { put: function put(a, b) {
      this[za(a, this.nextUid)] = b;
    }, get: function get(a) {
      return this[za(a, this.nextUid)];
    }, remove: function remove(a) {
      var b = this[a = za(a, this.nextUid)];delete this[a];return b;
    } };var Xf = [function () {
    this.$get = [function () {
      return Ra;
    }];
  }],
      kg = /^([^\(]+?)=>/,
      lg = /^[^\(]*\(\s*([^\)]*)\)/m,
      Yg = /,/,
      Zg = /^\s*(_?)(\S+?)\1\s*$/,
      jg = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
      Da = N("$injector");eb.$$annotate = function (a, b, d) {
    var c;if ("function" === typeof a) {
      if (!(c = a.$inject)) {
        c = [];if (a.length) {
          if (b) throw H(d) && d || (d = a.name || mg(a)), Da("strictdi", d);b = cd(a);q(b[1].split(Yg), function (a) {
            a.replace(Zg, function (a, b, d) {
              c.push(d);
            });
          });
        }a.$inject = c;
      }
    } else K(a) ? (b = a.length - 1, Pa(a[b], "fn"), c = a.slice(0, b)) : Pa(a, "fn", !0);return c;
  };var fe = N("$animate"),
      pf = function pf() {
    this.$get = C;
  },
      qf = function qf() {
    var a = new Ra(),
        b = [];this.$get = ["$$AnimateRunner", "$rootScope", function (d, c) {
      function e(a, b, c) {
        var d = !1;b && (b = H(b) ? b.split(" ") : K(b) ? b : [], q(b, function (b) {
          b && (d = !0, a[b] = c);
        }));return d;
      }function f() {
        q(b, function (b) {
          var c = a.get(b);if (c) {
            var d = ng(b.attr("class")),
                e = "",
                f = "";q(c, function (a, b) {
              a !== !!d[b] && (a ? e += (e.length ? " " : "") + b : f += (f.length ? " " : "") + b);
            });q(b, function (a) {
              e && Eb(a, e);f && Db(a, f);
            });a.remove(b);
          }
        });b.length = 0;
      }return { enabled: C, on: C, off: C, pin: C, push: function push(g, h, k, l) {
          l && l();k = k || {};k.from && g.css(k.from);
          k.to && g.css(k.to);if (k.addClass || k.removeClass) if (h = k.addClass, l = k.removeClass, k = a.get(g) || {}, h = e(k, h, !0), l = e(k, l, !1), h || l) a.put(g, k), b.push(g), 1 === b.length && c.$$postDigest(f);g = new d();g.complete();return g;
        } };
    }];
  },
      nf = ["$provide", function (a) {
    var b = this;this.$$registeredAnimations = Object.create(null);this.register = function (d, c) {
      if (d && "." !== d.charAt(0)) throw fe("notcsel", d);var e = d + "-animation";b.$$registeredAnimations[d.substr(1)] = e;a.factory(e, c);
    };this.classNameFilter = function (a) {
      if (1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null) && /(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString())) throw fe("nongcls", "ng-animate");return this.$$classNameFilter;
    };this.$get = ["$$animateQueue", function (a) {
      function b(a, c, d) {
        if (d) {
          var h;a: {
            for (h = 0; h < d.length; h++) {
              var k = d[h];if (1 === k.nodeType) {
                h = k;break a;
              }
            }h = void 0;
          }!h || h.parentNode || h.previousElementSibling || (d = null);
        }d ? d.after(a) : c.prepend(a);
      }return { on: a.on, off: a.off, pin: a.pin, enabled: a.enabled, cancel: function cancel(a) {
          a.end && a.end();
        },
        enter: function enter(e, f, g, h) {
          f = f && E(f);g = g && E(g);f = f || g.parent();b(e, f, g);return a.push(e, "enter", Ea(h));
        }, move: function move(e, f, g, h) {
          f = f && E(f);g = g && E(g);f = f || g.parent();b(e, f, g);return a.push(e, "move", Ea(h));
        }, leave: function leave(b, c) {
          return a.push(b, "leave", Ea(c), function () {
            b.remove();
          });
        }, addClass: function addClass(b, c, g) {
          g = Ea(g);g.addClass = jb(g.addclass, c);return a.push(b, "addClass", g);
        }, removeClass: function removeClass(b, c, g) {
          g = Ea(g);g.removeClass = jb(g.removeClass, c);return a.push(b, "removeClass", g);
        }, setClass: function setClass(b, c, g, h) {
          h = Ea(h);
          h.addClass = jb(h.addClass, c);h.removeClass = jb(h.removeClass, g);return a.push(b, "setClass", h);
        }, animate: function animate(b, c, g, h, k) {
          k = Ea(k);k.from = k.from ? R(k.from, c) : c;k.to = k.to ? R(k.to, g) : g;k.tempClasses = jb(k.tempClasses, h || "ng-inline-animate");return a.push(b, "animate", k);
        } };
    }];
  }],
      sf = function sf() {
    this.$get = ["$$rAF", function (a) {
      function b(b) {
        d.push(b);1 < d.length || a(function () {
          for (var a = 0; a < d.length; a++) {
            d[a]();
          }d = [];
        });
      }var d = [];return function () {
        var a = !1;b(function () {
          a = !0;
        });return function (d) {
          a ? d() : b(d);
        };
      };
    }];
  },
      rf = function rf() {
    this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function (a, b, d, c, e) {
      function f(a) {
        this.setHost(a);var b = d();this._doneCallbacks = [];this._tick = function (a) {
          var d = c[0];d && d.hidden ? e(a, 0, !1) : b(a);
        };this._state = 0;
      }f.chain = function (a, b) {
        function c() {
          if (d === a.length) b(!0);else a[d](function (a) {
            !1 === a ? b(!1) : (d++, c());
          });
        }var d = 0;c();
      };f.all = function (a, b) {
        function c(f) {
          e = e && f;++d === a.length && b(e);
        }var d = 0,
            e = !0;q(a, function (a) {
          a.done(c);
        });
      };f.prototype = { setHost: function setHost(a) {
          this.host = a || {};
        }, done: function done(a) {
          2 === this._state ? a() : this._doneCallbacks.push(a);
        }, progress: C, getPromise: function getPromise() {
          if (!this.promise) {
            var b = this;this.promise = a(function (a, c) {
              b.done(function (b) {
                !1 === b ? c() : a();
              });
            });
          }return this.promise;
        }, then: function then(a, b) {
          return this.getPromise().then(a, b);
        }, "catch": function _catch(a) {
          return this.getPromise()["catch"](a);
        }, "finally": function _finally(a) {
          return this.getPromise()["finally"](a);
        }, pause: function pause() {
          this.host.pause && this.host.pause();
        }, resume: function resume() {
          this.host.resume && this.host.resume();
        }, end: function end() {
          this.host.end && this.host.end();this._resolve(!0);
        }, cancel: function cancel() {
          this.host.cancel && this.host.cancel();this._resolve(!1);
        }, complete: function complete(a) {
          var b = this;0 === b._state && (b._state = 1, b._tick(function () {
            b._resolve(a);
          }));
        }, _resolve: function _resolve(a) {
          2 !== this._state && (q(this._doneCallbacks, function (b) {
            b(a);
          }), this._doneCallbacks.length = 0, this._state = 2);
        } };return f;
    }];
  },
      of = function of() {
    this.$get = ["$$rAF", "$q", "$$AnimateRunner", function (a, b, d) {
      return function (b, e) {
        function f() {
          a(function () {
            g.addClass && (b.addClass(g.addClass), g.addClass = null);g.removeClass && (b.removeClass(g.removeClass), g.removeClass = null);g.to && (b.css(g.to), g.to = null);h || k.complete();h = !0;
          });return k;
        }var g = e || {};g.$$prepared || (g = pa(g));g.cleanupStyles && (g.from = g.to = null);g.from && (b.css(g.from), g.from = null);var h,
            k = new d();return { start: f, end: f };
      };
    }];
  },
      da = N("$compile"),
      gc = new function () {}();Mc.$inject = ["$provide", "$$sanitizeUriProvider"];Ib.prototype.isFirstChange = function () {
    return this.previousValue === gc;
  };var ed = /^((?:x|data)[:\-_])/i,
      qg = N("$controller"),
      kd = /^(\S+)(\s+as\s+([\w$]+))?$/,
      yf = function yf() {
    this.$get = ["$document", function (a) {
      return function (b) {
        b ? !b.nodeType && b instanceof E && (b = b[0]) : b = a[0].body;return b.offsetWidth + 1;
      };
    }];
  },
      ld = "application/json",
      jc = { "Content-Type": ld + ";charset=utf-8" },
      sg = /^\[|^\{(?!\{)/,
      tg = { "[": /]$/, "{": /}$/ },
      rg = /^\)\]\}',?\n/,
      $g = N("$http"),
      pd = function pd(a) {
    return function () {
      throw $g("legacy", a);
    };
  },
      Ka = ga.$interpolateMinErr = N("$interpolate");Ka.throwNoconcat = function (a) {
    throw Ka("noconcat", a);
  };Ka.interr = function (a, b) {
    return Ka("interr", a, b.toString());
  };var Gf = function Gf() {
    this.$get = ["$window", function (a) {
      function b(a) {
        var b = function b(a) {
          b.data = a;b.called = !0;
        };b.id = a;return b;
      }var d = a.angular.callbacks,
          c = {};return { createCallback: function createCallback(a) {
          a = "_" + (d.$$counter++).toString(36);var f = "angular.callbacks." + a,
              g = b(a);c[f] = d[a] = g;return f;
        }, wasCalled: function wasCalled(a) {
          return c[a].called;
        }, getResponse: function getResponse(a) {
          return c[a].data;
        }, removeCallback: function removeCallback(a) {
          delete d[c[a].id];delete c[a];
        } };
    }];
  },
      ah = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
      vg = { http: 80, https: 443, ftp: 21 },
      lb = N("$location"),
      wg = /^\s*[\\/]{2,}/,
      bh = { $$absUrl: "", $$html5: !1, $$replace: !1, absUrl: Jb("$$absUrl"), url: function url(a) {
      if (z(a)) return this.$$url;var b = ah.exec(a);(b[1] || "" === a) && this.path(decodeURIComponent(b[1]));(b[2] || b[1] || "" === a) && this.search(b[3] || "");this.hash(b[5] || "");return this;
    }, protocol: Jb("$$protocol"), host: Jb("$$host"), port: Jb("$$port"), path: ud("$$path", function (a) {
      a = null !== a ? a.toString() : "";return "/" === a.charAt(0) ? a : "/" + a;
    }), search: function search(a, b) {
      switch (arguments.length) {case 0:
          return this.$$search;case 1:
          if (H(a) || Z(a)) a = a.toString(), this.$$search = Hc(a);else if (I(a)) a = pa(a, {}), q(a, function (b, c) {
            null == b && delete a[c];
          }), this.$$search = a;else throw lb("isrcharg");break;default:
          z(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b;}this.$$compose();return this;
    }, hash: ud("$$hash", function (a) {
      return null !== a ? a.toString() : "";
    }), replace: function replace() {
      this.$$replace = !0;return this;
    } };q([td, mc, lc], function (a) {
    a.prototype = Object.create(bh);a.prototype.state = function (b) {
      if (!arguments.length) return this.$$state;if (a !== lc || !this.$$html5) throw lb("nostate");
      this.$$state = z(b) ? null : b;return this;
    };
  });var ea = N("$parse"),
      wd = [].constructor,
      xd = (!1).constructor,
      yd = Function.constructor,
      zd = 0 .constructor,
      Ad = {}.constructor,
      Bd = "".constructor,
      Bg = wd.prototype,
      Cg = xd.prototype,
      Lb = yd.prototype,
      Dg = zd.prototype,
      Cd = Ad.prototype,
      Eg = Bd.prototype,
      yg = Lb.call,
      zg = Lb.apply,
      Ag = Lb.bind,
      Gg = Cd.valueOf,
      Rb = S();q("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (a) {
    Rb[a] = !0;
  });var ch = { n: "\n", f: "\f", r: "\r", t: "\t", v: "\v", "'": "'", '"': '"' },
      oc = function oc(a) {
    this.options = a;
  };
  oc.prototype = { constructor: oc, lex: function lex(a) {
      this.text = a;this.index = 0;for (this.tokens = []; this.index < this.text.length;) {
        if (a = this.text.charAt(this.index), '"' === a || "'" === a) this.readString(a);else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber();else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent();else if (this.is(a, "(){}[].,;:?")) this.tokens.push({ index: this.index, text: a }), this.index++;else if (this.isWhitespace(a)) this.index++;else {
          var b = a + this.peek(),
              d = b + this.peek(2),
              c = Rb[b],
              e = Rb[d];Rb[a] || c || e ? (a = e ? d : c ? b : a, this.tokens.push({ index: this.index, text: a, operator: !0 }), this.index += a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1);
        }
      }return this.tokens;
    }, is: function is(a, b) {
      return -1 !== b.indexOf(a);
    }, peek: function peek(a) {
      a = a || 1;return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
    }, isNumber: function isNumber(a) {
      return "0" <= a && "9" >= a && "string" === typeof a;
    }, isWhitespace: function isWhitespace(a) {
      return " " === a || "\r" === a || "\t" === a || "\n" === a || "\v" === a || "\xA0" === a;
    }, isIdentifierStart: function isIdentifierStart(a) {
      return this.options.isIdentifierStart ? this.options.isIdentifierStart(a, this.codePointAt(a)) : this.isValidIdentifierStart(a);
    }, isValidIdentifierStart: function isValidIdentifierStart(a) {
      return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a;
    }, isIdentifierContinue: function isIdentifierContinue(a) {
      return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(a, this.codePointAt(a)) : this.isValidIdentifierContinue(a);
    }, isValidIdentifierContinue: function isValidIdentifierContinue(a, b) {
      return this.isValidIdentifierStart(a, b) || this.isNumber(a);
    },
    codePointAt: function codePointAt(a) {
      return 1 === a.length ? a.charCodeAt(0) : (a.charCodeAt(0) << 10) + a.charCodeAt(1) - 56613888;
    }, peekMultichar: function peekMultichar() {
      var a = this.text.charAt(this.index),
          b = this.peek();if (!b) return a;var d = a.charCodeAt(0),
          c = b.charCodeAt(0);return 55296 <= d && 56319 >= d && 56320 <= c && 57343 >= c ? a + b : a;
    }, isExpOperator: function isExpOperator(a) {
      return "-" === a || "+" === a || this.isNumber(a);
    }, throwError: function throwError(a, b, d) {
      d = d || this.index;b = u(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, d) + "]" : " " + d;throw ea("lexerr", a, b, this.text);
    }, readNumber: function readNumber() {
      for (var a = "", b = this.index; this.index < this.text.length;) {
        var d = P(this.text.charAt(this.index));if ("." === d || this.isNumber(d)) a += d;else {
          var c = this.peek();if ("e" === d && this.isExpOperator(c)) a += d;else if (this.isExpOperator(d) && c && this.isNumber(c) && "e" === a.charAt(a.length - 1)) a += d;else if (!this.isExpOperator(d) || c && this.isNumber(c) || "e" !== a.charAt(a.length - 1)) break;else this.throwError("Invalid exponent");
        }this.index++;
      }this.tokens.push({ index: b, text: a, constant: !0, value: Number(a) });
    },
    readIdent: function readIdent() {
      var a = this.index;for (this.index += this.peekMultichar().length; this.index < this.text.length;) {
        var b = this.peekMultichar();if (!this.isIdentifierContinue(b)) break;this.index += b.length;
      }this.tokens.push({ index: a, text: this.text.slice(a, this.index), identifier: !0 });
    }, readString: function readString(a) {
      var b = this.index;this.index++;for (var d = "", c = a, e = !1; this.index < this.text.length;) {
        var f = this.text.charAt(this.index),
            c = c + f;if (e) "u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), this.index += 4, d += String.fromCharCode(parseInt(e, 16))) : d += ch[f] || f, e = !1;else if ("\\" === f) e = !0;else {
          if (f === a) {
            this.index++;this.tokens.push({ index: b, text: c, constant: !0, value: d });return;
          }d += f;
        }this.index++;
      }this.throwError("Unterminated quote", b);
    } };var r = function r(a, b) {
    this.lexer = a;this.options = b;
  };r.Program = "Program";r.ExpressionStatement = "ExpressionStatement";r.AssignmentExpression = "AssignmentExpression";r.ConditionalExpression = "ConditionalExpression";
  r.LogicalExpression = "LogicalExpression";r.BinaryExpression = "BinaryExpression";r.UnaryExpression = "UnaryExpression";r.CallExpression = "CallExpression";r.MemberExpression = "MemberExpression";r.Identifier = "Identifier";r.Literal = "Literal";r.ArrayExpression = "ArrayExpression";r.Property = "Property";r.ObjectExpression = "ObjectExpression";r.ThisExpression = "ThisExpression";r.LocalsExpression = "LocalsExpression";r.NGValueParameter = "NGValueParameter";r.prototype = { ast: function ast(a) {
      this.text = a;this.tokens = this.lexer.lex(a);
      a = this.program();0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);return a;
    }, program: function program() {
      for (var a = [];;) {
        if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), !this.expect(";")) return { type: r.Program, body: a };
      }
    }, expressionStatement: function expressionStatement() {
      return { type: r.ExpressionStatement, expression: this.filterChain() };
    }, filterChain: function filterChain() {
      for (var a = this.expression(); this.expect("|");) {
        a = this.filter(a);
      }return a;
    }, expression: function expression() {
      return this.assignment();
    },
    assignment: function assignment() {
      var a = this.ternary();this.expect("=") && (a = { type: r.AssignmentExpression, left: a, right: this.assignment(), operator: "=" });return a;
    }, ternary: function ternary() {
      var a = this.logicalOR(),
          b,
          d;return this.expect("?") && (b = this.expression(), this.consume(":")) ? (d = this.expression(), { type: r.ConditionalExpression, test: a, alternate: b, consequent: d }) : a;
    }, logicalOR: function logicalOR() {
      for (var a = this.logicalAND(); this.expect("||");) {
        a = { type: r.LogicalExpression, operator: "||", left: a, right: this.logicalAND() };
      }return a;
    }, logicalAND: function logicalAND() {
      for (var a = this.equality(); this.expect("&&");) {
        a = { type: r.LogicalExpression, operator: "&&", left: a, right: this.equality() };
      }return a;
    }, equality: function equality() {
      for (var a = this.relational(), b; b = this.expect("==", "!=", "===", "!==");) {
        a = { type: r.BinaryExpression, operator: b.text, left: a, right: this.relational() };
      }return a;
    }, relational: function relational() {
      for (var a = this.additive(), b; b = this.expect("<", ">", "<=", ">=");) {
        a = { type: r.BinaryExpression, operator: b.text, left: a, right: this.additive() };
      }return a;
    }, additive: function additive() {
      for (var a = this.multiplicative(), b; b = this.expect("+", "-");) {
        a = { type: r.BinaryExpression, operator: b.text, left: a, right: this.multiplicative() };
      }return a;
    }, multiplicative: function multiplicative() {
      for (var a = this.unary(), b; b = this.expect("*", "/", "%");) {
        a = { type: r.BinaryExpression, operator: b.text, left: a, right: this.unary() };
      }return a;
    }, unary: function unary() {
      var a;return (a = this.expect("+", "-", "!")) ? { type: r.UnaryExpression, operator: a.text, prefix: !0, argument: this.unary() } : this.primary();
    }, primary: function primary() {
      var a;this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? a = pa(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? a = { type: r.Literal, value: this.options.literals[this.consume().text] } : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());for (var b; b = this.expect("(", "[", ".");) {
        "(" === b.text ? (a = { type: r.CallExpression,
          callee: a, arguments: this.parseArguments() }, this.consume(")")) : "[" === b.text ? (a = { type: r.MemberExpression, object: a, property: this.expression(), computed: !0 }, this.consume("]")) : "." === b.text ? a = { type: r.MemberExpression, object: a, property: this.identifier(), computed: !1 } : this.throwError("IMPOSSIBLE");
      }return a;
    }, filter: function filter(a) {
      a = [a];for (var b = { type: r.CallExpression, callee: this.identifier(), arguments: a, filter: !0 }; this.expect(":");) {
        a.push(this.expression());
      }return b;
    }, parseArguments: function parseArguments() {
      var a = [];if (")" !== this.peekToken().text) {
        do {
          a.push(this.filterChain());
        } while (this.expect(","));
      }return a;
    }, identifier: function identifier() {
      var a = this.consume();a.identifier || this.throwError("is not a valid identifier", a);return { type: r.Identifier, name: a.text };
    }, constant: function constant() {
      return { type: r.Literal, value: this.consume().value };
    }, arrayDeclaration: function arrayDeclaration() {
      var a = [];if ("]" !== this.peekToken().text) {
        do {
          if (this.peek("]")) break;a.push(this.expression());
        } while (this.expect(","));
      }this.consume("]");return { type: r.ArrayExpression, elements: a };
    },
    object: function object() {
      var a = [],
          b;if ("}" !== this.peekToken().text) {
        do {
          if (this.peek("}")) break;b = { type: r.Property, kind: "init" };this.peek().constant ? (b.key = this.constant(), b.computed = !1, this.consume(":"), b.value = this.expression()) : this.peek().identifier ? (b.key = this.identifier(), b.computed = !1, this.peek(":") ? (this.consume(":"), b.value = this.expression()) : b.value = b.key) : this.peek("[") ? (this.consume("["), b.key = this.expression(), this.consume("]"), b.computed = !0, this.consume(":"), b.value = this.expression()) : this.throwError("invalid key", this.peek());a.push(b);
        } while (this.expect(","));
      }this.consume("}");return { type: r.ObjectExpression, properties: a };
    }, throwError: function throwError(a, b) {
      throw ea("syntax", b.text, a, b.index + 1, this.text, this.text.substring(b.index));
    }, consume: function consume(a) {
      if (0 === this.tokens.length) throw ea("ueoe", this.text);var b = this.expect(a);b || this.throwError("is unexpected, expecting [" + a + "]", this.peek());return b;
    }, peekToken: function peekToken() {
      if (0 === this.tokens.length) throw ea("ueoe", this.text);return this.tokens[0];
    }, peek: function peek(a, b, d, c) {
      return this.peekAhead(0, a, b, d, c);
    }, peekAhead: function peekAhead(a, b, d, c, e) {
      if (this.tokens.length > a) {
        a = this.tokens[a];var f = a.text;if (f === b || f === d || f === c || f === e || !(b || d || c || e)) return a;
      }return !1;
    }, expect: function expect(a, b, d, c) {
      return (a = this.peek(a, b, d, c)) ? (this.tokens.shift(), a) : !1;
    }, selfReferential: { "this": { type: r.ThisExpression }, $locals: { type: r.LocalsExpression } } };Id.prototype = { compile: function compile(a, b) {
      var d = this,
          c = this.astBuilder.ast(a);this.state = { nextId: 0, filters: {}, expensiveChecks: b, fn: { vars: [], body: [], own: {} },
        assign: { vars: [], body: [], own: {} }, inputs: [] };W(c, d.$filter);var e = "",
          f;this.stage = "assign";if (f = Gd(c)) this.state.computing = "assign", e = this.nextId(), this.recurse(f, e), this.return_(e), e = "fn.assign=" + this.generateFunction("assign", "s,v,l");f = Ed(c.body);d.stage = "inputs";q(f, function (a, b) {
        var c = "fn" + b;d.state[c] = { vars: [], body: [], own: {} };d.state.computing = c;var e = d.nextId();d.recurse(a, e);d.return_(e);d.state.inputs.push(c);a.watchId = b;
      });this.state.computing = "fn";this.stage = "main";this.recurse(c);e = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + e + this.watchFns() + "return fn;";e = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", e)(this.$filter, Ta, qa, vd, xg, Kb, Fg, Dd, a);this.state = this.stage = void 0;e.literal = Hd(c);e.constant = c.constant;return e;
    }, USE: "use", STRICT: "strict", watchFns: function watchFns() {
      var a = [],
          b = this.state.inputs,
          d = this;q(b, function (b) {
        a.push("var " + b + "=" + d.generateFunction(b, "s"));
      });b.length && a.push("fn.inputs=[" + b.join(",") + "];");return a.join("");
    }, generateFunction: function generateFunction(a, b) {
      return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) + "};";
    }, filterPrefix: function filterPrefix() {
      var a = [],
          b = this;q(this.state.filters, function (d, c) {
        a.push(d + "=$filter(" + b.escape(c) + ")");
      });return a.length ? "var " + a.join(",") + ";" : "";
    }, varsPrefix: function varsPrefix(a) {
      return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : "";
    }, body: function body(a) {
      return this.state[a].body.join("");
    },
    recurse: function recurse(a, b, d, c, e, f) {
      var g,
          h,
          k = this,
          l,
          m,
          n;c = c || C;if (!f && u(a.watchId)) b = b || this.nextId(), this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, d, c, e, !0));else switch (a.type) {case r.Program:
          q(a.body, function (b, c) {
            k.recurse(b.expression, void 0, void 0, function (a) {
              h = a;
            });c !== a.body.length - 1 ? k.current().body.push(h, ";") : k.return_(h);
          });break;case r.Literal:
          m = this.escape(a.value);this.assign(b, m);c(m);break;case r.UnaryExpression:
          this.recurse(a.argument, void 0, void 0, function (a) {
            h = a;
          });m = a.operator + "(" + this.ifDefined(h, 0) + ")";this.assign(b, m);c(m);break;case r.BinaryExpression:
          this.recurse(a.left, void 0, void 0, function (a) {
            g = a;
          });this.recurse(a.right, void 0, void 0, function (a) {
            h = a;
          });m = "+" === a.operator ? this.plus(g, h) : "-" === a.operator ? this.ifDefined(g, 0) + a.operator + this.ifDefined(h, 0) : "(" + g + ")" + a.operator + "(" + h + ")";this.assign(b, m);c(m);break;case r.LogicalExpression:
          b = b || this.nextId();k.recurse(a.left, b);k.if_("&&" === a.operator ? b : k.not(b), k.lazyRecurse(a.right, b));
          c(b);break;case r.ConditionalExpression:
          b = b || this.nextId();k.recurse(a.test, b);k.if_(b, k.lazyRecurse(a.alternate, b), k.lazyRecurse(a.consequent, b));c(b);break;case r.Identifier:
          b = b || this.nextId();d && (d.context = "inputs" === k.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), d.computed = !1, d.name = a.name);Ta(a.name);k.if_("inputs" === k.stage || k.not(k.getHasOwnProperty("l", a.name)), function () {
            k.if_("inputs" === k.stage || "s", function () {
              e && 1 !== e && k.if_(k.not(k.nonComputedMember("s", a.name)), k.lazyAssign(k.nonComputedMember("s", a.name), "{}"));k.assign(b, k.nonComputedMember("s", a.name));
            });
          }, b && k.lazyAssign(b, k.nonComputedMember("l", a.name)));(k.state.expensiveChecks || Mb(a.name)) && k.addEnsureSafeObject(b);c(b);break;case r.MemberExpression:
          g = d && (d.context = this.nextId()) || this.nextId();b = b || this.nextId();k.recurse(a.object, g, void 0, function () {
            k.if_(k.notNull(g), function () {
              e && 1 !== e && k.addEnsureSafeAssignContext(g);if (a.computed) h = k.nextId(), k.recurse(a.property, h), k.getStringValue(h), k.addEnsureSafeMemberName(h), e && 1 !== e && k.if_(k.not(k.computedMember(g, h)), k.lazyAssign(k.computedMember(g, h), "{}")), m = k.ensureSafeObject(k.computedMember(g, h)), k.assign(b, m), d && (d.computed = !0, d.name = h);else {
                Ta(a.property.name);e && 1 !== e && k.if_(k.not(k.nonComputedMember(g, a.property.name)), k.lazyAssign(k.nonComputedMember(g, a.property.name), "{}"));m = k.nonComputedMember(g, a.property.name);if (k.state.expensiveChecks || Mb(a.property.name)) m = k.ensureSafeObject(m);k.assign(b, m);d && (d.computed = !1, d.name = a.property.name);
              }
            }, function () {
              k.assign(b, "undefined");
            });c(b);
          }, !!e);break;case r.CallExpression:
          b = b || this.nextId();a.filter ? (h = k.filter(a.callee.name), l = [], q(a.arguments, function (a) {
            var b = k.nextId();k.recurse(a, b);l.push(b);
          }), m = h + "(" + l.join(",") + ")", k.assign(b, m), c(b)) : (h = k.nextId(), g = {}, l = [], k.recurse(a.callee, h, g, function () {
            k.if_(k.notNull(h), function () {
              k.addEnsureSafeFunction(h);q(a.arguments, function (a) {
                k.recurse(a, k.nextId(), void 0, function (a) {
                  l.push(k.ensureSafeObject(a));
                });
              });g.name ? (k.state.expensiveChecks || k.addEnsureSafeObject(g.context), m = k.member(g.context, g.name, g.computed) + "(" + l.join(",") + ")") : m = h + "(" + l.join(",") + ")";m = k.ensureSafeObject(m);k.assign(b, m);
            }, function () {
              k.assign(b, "undefined");
            });c(b);
          }));break;case r.AssignmentExpression:
          h = this.nextId();g = {};if (!Fd(a.left)) throw ea("lval");this.recurse(a.left, void 0, g, function () {
            k.if_(k.notNull(g.context), function () {
              k.recurse(a.right, h);k.addEnsureSafeObject(k.member(g.context, g.name, g.computed));k.addEnsureSafeAssignContext(g.context);m = k.member(g.context, g.name, g.computed) + a.operator + h;k.assign(b, m);c(b || m);
            });
          }, 1);break;case r.ArrayExpression:
          l = [];q(a.elements, function (a) {
            k.recurse(a, k.nextId(), void 0, function (a) {
              l.push(a);
            });
          });m = "[" + l.join(",") + "]";this.assign(b, m);c(m);break;case r.ObjectExpression:
          l = [];n = !1;q(a.properties, function (a) {
            a.computed && (n = !0);
          });n ? (b = b || this.nextId(), this.assign(b, "{}"), q(a.properties, function (a) {
            a.computed ? (g = k.nextId(), k.recurse(a.key, g)) : g = a.key.type === r.Identifier ? a.key.name : "" + a.key.value;h = k.nextId();k.recurse(a.value, h);k.assign(k.member(b, g, a.computed), h);
          })) : (q(a.properties, function (b) {
            k.recurse(b.value, a.constant ? void 0 : k.nextId(), void 0, function (a) {
              l.push(k.escape(b.key.type === r.Identifier ? b.key.name : "" + b.key.value) + ":" + a);
            });
          }), m = "{" + l.join(",") + "}", this.assign(b, m));c(b || m);break;case r.ThisExpression:
          this.assign(b, "s");c("s");break;case r.LocalsExpression:
          this.assign(b, "l");c("l");break;case r.NGValueParameter:
          this.assign(b, "v"), c("v");}
    }, getHasOwnProperty: function getHasOwnProperty(a, b) {
      var d = a + "." + b,
          c = this.current().own;c.hasOwnProperty(d) || (c[d] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " + a + ")"));return c[d];
    }, assign: function assign(a, b) {
      if (a) return this.current().body.push(a, "=", b, ";"), a;
    }, filter: function filter(a) {
      this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0));return this.state.filters[a];
    }, ifDefined: function ifDefined(a, b) {
      return "ifDefined(" + a + "," + this.escape(b) + ")";
    }, plus: function plus(a, b) {
      return "plus(" + a + "," + b + ")";
    }, return_: function return_(a) {
      this.current().body.push("return ", a, ";");
    }, if_: function if_(a, b, d) {
      if (!0 === a) b();else {
        var c = this.current().body;
        c.push("if(", a, "){");b();c.push("}");d && (c.push("else{"), d(), c.push("}"));
      }
    }, not: function not(a) {
      return "!(" + a + ")";
    }, notNull: function notNull(a) {
      return a + "!=null";
    }, nonComputedMember: function nonComputedMember(a, b) {
      var d = /[^$_a-zA-Z0-9]/g;return (/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b) ? a + "." + b : a + '["' + b.replace(d, this.stringEscapeFn) + '"]'
      );
    }, computedMember: function computedMember(a, b) {
      return a + "[" + b + "]";
    }, member: function member(a, b, d) {
      return d ? this.computedMember(a, b) : this.nonComputedMember(a, b);
    }, addEnsureSafeObject: function addEnsureSafeObject(a) {
      this.current().body.push(this.ensureSafeObject(a), ";");
    }, addEnsureSafeMemberName: function addEnsureSafeMemberName(a) {
      this.current().body.push(this.ensureSafeMemberName(a), ";");
    }, addEnsureSafeFunction: function addEnsureSafeFunction(a) {
      this.current().body.push(this.ensureSafeFunction(a), ";");
    }, addEnsureSafeAssignContext: function addEnsureSafeAssignContext(a) {
      this.current().body.push(this.ensureSafeAssignContext(a), ";");
    }, ensureSafeObject: function ensureSafeObject(a) {
      return "ensureSafeObject(" + a + ",text)";
    }, ensureSafeMemberName: function ensureSafeMemberName(a) {
      return "ensureSafeMemberName(" + a + ",text)";
    }, ensureSafeFunction: function ensureSafeFunction(a) {
      return "ensureSafeFunction(" + a + ",text)";
    },
    getStringValue: function getStringValue(a) {
      this.assign(a, "getStringValue(" + a + ")");
    }, ensureSafeAssignContext: function ensureSafeAssignContext(a) {
      return "ensureSafeAssignContext(" + a + ",text)";
    }, lazyRecurse: function lazyRecurse(a, b, d, c, e, f) {
      var g = this;return function () {
        g.recurse(a, b, d, c, e, f);
      };
    }, lazyAssign: function lazyAssign(a, b) {
      var d = this;return function () {
        d.assign(a, b);
      };
    }, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function stringEscapeFn(a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }, escape: function escape(a) {
      if (H(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";if (Z(a)) return a.toString();if (!0 === a) return "true";if (!1 === a) return "false";if (null === a) return "null";if ("undefined" === typeof a) return "undefined";throw ea("esc");
    }, nextId: function nextId(a, b) {
      var d = "v" + this.state.nextId++;a || this.current().vars.push(d + (b ? "=" + b : ""));return d;
    }, current: function current() {
      return this.state[this.state.computing];
    } };Jd.prototype = { compile: function compile(a, b) {
      var d = this,
          c = this.astBuilder.ast(a);this.expression = a;this.expensiveChecks = b;W(c, d.$filter);var e, f;if (e = Gd(c)) f = this.recurse(e);e = Ed(c.body);
      var g;e && (g = [], q(e, function (a, b) {
        var c = d.recurse(a);a.input = c;g.push(c);a.watchId = b;
      }));var h = [];q(c.body, function (a) {
        h.push(d.recurse(a.expression));
      });e = 0 === c.body.length ? C : 1 === c.body.length ? h[0] : function (a, b) {
        var c;q(h, function (d) {
          c = d(a, b);
        });return c;
      };f && (e.assign = function (a, b, c) {
        return f(a, c, b);
      });g && (e.inputs = g);e.literal = Hd(c);e.constant = c.constant;return e;
    }, recurse: function recurse(a, b, d) {
      var c,
          e,
          f = this,
          g;if (a.input) return this.inputs(a.input, a.watchId);switch (a.type) {case r.Literal:
          return this.value(a.value, b);case r.UnaryExpression:
          return e = this.recurse(a.argument), this["unary" + a.operator](e, b);case r.BinaryExpression:
          return c = this.recurse(a.left), e = this.recurse(a.right), this["binary" + a.operator](c, e, b);case r.LogicalExpression:
          return c = this.recurse(a.left), e = this.recurse(a.right), this["binary" + a.operator](c, e, b);case r.ConditionalExpression:
          return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b);case r.Identifier:
          return Ta(a.name, f.expression), f.identifier(a.name, f.expensiveChecks || Mb(a.name), b, d, f.expression);case r.MemberExpression:
          return c = this.recurse(a.object, !1, !!d), a.computed || (Ta(a.property.name, f.expression), e = a.property.name), a.computed && (e = this.recurse(a.property)), a.computed ? this.computedMember(c, e, b, d, f.expression) : this.nonComputedMember(c, e, f.expensiveChecks, b, d, f.expression);case r.CallExpression:
          return g = [], q(a.arguments, function (a) {
            g.push(f.recurse(a));
          }), a.filter && (e = this.$filter(a.callee.name)), a.filter || (e = this.recurse(a.callee, !0)), a.filter ? function (a, c, d, f) {
            for (var n = [], p = 0; p < g.length; ++p) {
              n.push(g[p](a, c, d, f));
            }a = e.apply(void 0, n, f);return b ? { context: void 0, name: void 0, value: a } : a;
          } : function (a, c, d, m) {
            var n = e(a, c, d, m),
                p;if (null != n.value) {
              qa(n.context, f.expression);vd(n.value, f.expression);p = [];for (var q = 0; q < g.length; ++q) {
                p.push(qa(g[q](a, c, d, m), f.expression));
              }p = qa(n.value.apply(n.context, p), f.expression);
            }return b ? { value: p } : p;
          };case r.AssignmentExpression:
          return c = this.recurse(a.left, !0, 1), e = this.recurse(a.right), function (a, d, g, m) {
            var n = c(a, d, g, m);a = e(a, d, g, m);qa(n.value, f.expression);Kb(n.context);n.context[n.name] = a;return b ? { value: a } : a;
          };case r.ArrayExpression:
          return g = [], q(a.elements, function (a) {
            g.push(f.recurse(a));
          }), function (a, c, d, e) {
            for (var f = [], p = 0; p < g.length; ++p) {
              f.push(g[p](a, c, d, e));
            }return b ? { value: f } : f;
          };case r.ObjectExpression:
          return g = [], q(a.properties, function (a) {
            a.computed ? g.push({ key: f.recurse(a.key), computed: !0, value: f.recurse(a.value) }) : g.push({ key: a.key.type === r.Identifier ? a.key.name : "" + a.key.value, computed: !1, value: f.recurse(a.value) });
          }), function (a, c, d, e) {
            for (var f = {}, p = 0; p < g.length; ++p) {
              g[p].computed ? f[g[p].key(a, c, d, e)] = g[p].value(a, c, d, e) : f[g[p].key] = g[p].value(a, c, d, e);
            }return b ? { value: f } : f;
          };case r.ThisExpression:
          return function (a) {
            return b ? { value: a } : a;
          };case r.LocalsExpression:
          return function (a, c) {
            return b ? { value: c } : c;
          };case r.NGValueParameter:
          return function (a, c, d) {
            return b ? { value: d } : d;
          };}
    }, "unary+": function unary(a, b) {
      return function (d, c, e, f) {
        d = a(d, c, e, f);d = u(d) ? +d : 0;return b ? { value: d } : d;
      };
    }, "unary-": function unary(a, b) {
      return function (d, c, e, f) {
        d = a(d, c, e, f);d = u(d) ? -d : 0;return b ? { value: d } : d;
      };
    }, "unary!": function unary(a, b) {
      return function (d, c, e, f) {
        d = !a(d, c, e, f);return b ? { value: d } : d;
      };
    }, "binary+": function binary(a, b, d) {
      return function (c, e, f, g) {
        var h = a(c, e, f, g);c = b(c, e, f, g);h = Dd(h, c);return d ? { value: h } : h;
      };
    }, "binary-": function binary(a, b, d) {
      return function (c, e, f, g) {
        var h = a(c, e, f, g);c = b(c, e, f, g);h = (u(h) ? h : 0) - (u(c) ? c : 0);return d ? { value: h } : h;
      };
    }, "binary*": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) * b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary/": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) / b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary%": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) % b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary===": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) === b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary!==": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) !== b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary==": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) == b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary!=": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) != b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary<": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) < b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary>": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) > b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary<=": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) <= b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary>=": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) >= b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary&&": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) && b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "binary||": function binary(a, b, d) {
      return function (c, e, f, g) {
        c = a(c, e, f, g) || b(c, e, f, g);return d ? { value: c } : c;
      };
    }, "ternary?:": function ternary(a, b, d, c) {
      return function (e, f, g, h) {
        e = a(e, f, g, h) ? b(e, f, g, h) : d(e, f, g, h);return c ? { value: e } : e;
      };
    }, value: function value(a, b) {
      return function () {
        return b ? { context: void 0, name: void 0, value: a } : a;
      };
    }, identifier: function identifier(a, b, d, c, e) {
      return function (f, g, h, k) {
        f = g && a in g ? g : f;c && 1 !== c && f && !f[a] && (f[a] = {});g = f ? f[a] : void 0;b && qa(g, e);return d ? { context: f, name: a,
          value: g } : g;
      };
    }, computedMember: function computedMember(a, b, d, c, e) {
      return function (f, g, h, k) {
        var l = a(f, g, h, k),
            m,
            n;null != l && (m = b(f, g, h, k), m += "", Ta(m, e), c && 1 !== c && (Kb(l), l && !l[m] && (l[m] = {})), n = l[m], qa(n, e));return d ? { context: l, name: m, value: n } : n;
      };
    }, nonComputedMember: function nonComputedMember(a, b, d, c, e, f) {
      return function (g, h, k, l) {
        g = a(g, h, k, l);e && 1 !== e && (Kb(g), g && !g[b] && (g[b] = {}));h = null != g ? g[b] : void 0;(d || Mb(b)) && qa(h, f);return c ? { context: g, name: b, value: h } : h;
      };
    }, inputs: function inputs(a, b) {
      return function (d, c, e, f) {
        return f ? f[b] : a(d, c, e);
      };
    } };var pc = function pc(a, b, d) {
    this.lexer = a;this.$filter = b;this.options = d;this.ast = new r(a, d);this.astCompiler = d.csp ? new Jd(this.ast, b) : new Id(this.ast, b);
  };pc.prototype = { constructor: pc, parse: function parse(a) {
      return this.astCompiler.compile(a, this.options.expensiveChecks);
    } };var fa = N("$sce"),
      la = { HTML: "html", CSS: "css", URL: "url", RESOURCE_URL: "resourceUrl", JS: "js" },
      Ig = N("$compile"),
      V = B.document.createElement("a"),
      Nd = Ca(B.location.href);Od.$inject = ["$document"];Tc.$inject = ["$provide"];var Vd = 22,
      Ud = ".",
      rc = "0";Pd.$inject = ["$locale"];
  Rd.$inject = ["$locale"];var Tg = { yyyy: Y("FullYear", 4, 0, !1, !0), yy: Y("FullYear", 2, 0, !0, !0), y: Y("FullYear", 1, 0, !1, !0), MMMM: nb("Month"), MMM: nb("Month", !0), MM: Y("Month", 2, 1), M: Y("Month", 1, 1), LLLL: nb("Month", !1, !0), dd: Y("Date", 2), d: Y("Date", 1), HH: Y("Hours", 2), H: Y("Hours", 1), hh: Y("Hours", 2, -12), h: Y("Hours", 1, -12), mm: Y("Minutes", 2), m: Y("Minutes", 1), ss: Y("Seconds", 2), s: Y("Seconds", 1), sss: Y("Milliseconds", 3), EEEE: nb("Day"), EEE: nb("Day", !0), a: function a(_a, b) {
      return 12 > _a.getHours() ? b.AMPMS[0] : b.AMPMS[1];
    }, Z: function Z(a, b, d) {
      a = -1 * d;return a = (0 <= a ? "+" : "") + (Nb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Nb(Math.abs(a % 60), 2));
    }, ww: Xd(2), w: Xd(1), G: sc, GG: sc, GGG: sc, GGGG: function GGGG(a, b) {
      return 0 >= a.getFullYear() ? b.ERANAMES[0] : b.ERANAMES[1];
    } },
      Sg = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
      Rg = /^\-?\d+$/;Qd.$inject = ["$locale"];var Mg = ma(P),
      Ng = ma(xb);Sd.$inject = ["$parse"];var Ee = ma({ restrict: "E", compile: function compile(a, b) {
      if (!b.href && !b.xlinkHref) return function (a, b) {
        if ("a" === b[0].nodeName.toLowerCase()) {
          var e = "[object SVGAnimatedString]" === na.call(b.prop("href")) ? "xlink:href" : "href";b.on("click", function (a) {
            b.attr(e) || a.preventDefault();
          });
        }
      };
    } }),
      yb = {};q(Hb, function (a, b) {
    function d(a, d, e) {
      a.$watch(e[c], function (a) {
        e.$set(b, !!a);
      });
    }if ("multiple" !== a) {
      var c = Ba("ng-" + b),
          e = d;"checked" === a && (e = function e(a, b, _e) {
        _e.ngModel !== _e[c] && d(a, b, _e);
      });yb[c] = function () {
        return { restrict: "A", priority: 100, link: e };
      };
    }
  });q(jd, function (a, b) {
    yb[b] = function () {
      return { priority: 100, link: function link(a, c, e) {
          if ("ngPattern" === b && "/" === e.ngPattern.charAt(0) && (c = e.ngPattern.match(Wg))) {
            e.$set("ngPattern", new RegExp(c[1], c[2]));return;
          }a.$watch(e[b], function (a) {
            e.$set(b, a);
          });
        } };
    };
  });q(["src", "srcset", "href"], function (a) {
    var b = Ba("ng-" + a);yb[b] = function () {
      return { priority: 99, link: function link(d, c, e) {
          var f = a,
              g = a;"href" === a && "[object SVGAnimatedString]" === na.call(c.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null);e.$observe(b, function (b) {
            b ? (e.$set(g, b), Fa && f && c.prop(f, e[g])) : "href" === a && e.$set(g, null);
          });
        } };
    };
  });var Ob = { $addControl: C, $$renameControl: function $$renameControl(a, b) {
      a.$name = b;
    }, $removeControl: C, $setValidity: C, $setDirty: C, $setPristine: C, $setSubmitted: C };Yd.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];var ge = function ge(a) {
    return ["$timeout", "$parse", function (b, d) {
      function c(a) {
        return "" === a ? d('this[""]').assign : d(a).assign || C;
      }return { name: "form", restrict: a ? "EAC" : "E", require: ["form", "^^?form"], controller: Yd, compile: function compile(d, f) {
          d.addClass(Va).addClass(rb);var g = f.name ? "name" : a && f.ngForm ? "ngForm" : !1;return { pre: function pre(a, d, e, f) {
              var n = f[0];if (!("action" in e)) {
                var p = function p(b) {
                  a.$apply(function () {
                    n.$commitViewValue();n.$setSubmitted();
                  });b.preventDefault();
                };d[0].addEventListener("submit", p, !1);d.on("$destroy", function () {
                  b(function () {
                    d[0].removeEventListener("submit", p, !1);
                  }, 0, !1);
                });
              }(f[1] || n.$$parentForm).$addControl(n);var q = g ? c(n.$name) : C;g && (q(a, n), e.$observe(g, function (b) {
                n.$name !== b && (q(a, void 0), n.$$parentForm.$$renameControl(n, b), q = c(n.$name), q(a, n));
              }));d.on("$destroy", function () {
                n.$$parentForm.$removeControl(n);q(a, void 0);R(n, Ob);
              });
            } };
        } };
    }];
  },
      Fe = ge(),
      Re = ge(!0),
      Ug = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,
      dh = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
      eh = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
      Vg = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
      he = /^(\d{4,})-(\d{2})-(\d{2})$/,
      ie = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
      yc = /^(\d{4,})-W(\d\d)$/,
      je = /^(\d{4,})-(\d\d)$/,
      ke = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
      $d = S();q(["date", "datetime-local", "month", "time", "week"], function (a) {
    $d[a] = !0;
  });var le = { text: function text(a, b, d, c, e, f) {
      Wa(a, b, d, c, e, f);uc(c);
    }, date: ob("date", he, Qb(he, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"), "datetime-local": ob("datetimelocal", ie, Qb(ie, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"), time: ob("time", ke, Qb(ke, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"), week: ob("week", yc, function (a, b) {
      if (ba(a)) return a;if (H(a)) {
        yc.lastIndex = 0;var d = yc.exec(a);if (d) {
          var c = +d[1],
              e = +d[2],
              f = d = 0,
              g = 0,
              h = 0,
              k = Wd(c),
              e = 7 * (e - 1);b && (d = b.getHours(), f = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds());return new Date(c, 0, k.getDate() + e, d, f, g, h);
        }
      }return NaN;
    }, "yyyy-Www"), month: ob("month", je, Qb(je, ["yyyy", "MM"]), "yyyy-MM"), number: function number(a, b, d, c, e, f) {
      vc(a, b, d, c);Wa(a, b, d, c, e, f);ae(c);var g, h;if (u(d.min) || d.ngMin) c.$validators.min = function (a) {
        return c.$isEmpty(a) || z(g) || a >= g;
      }, d.$observe("min", function (a) {
        g = qb(a);c.$validate();
      });if (u(d.max) || d.ngMax) c.$validators.max = function (a) {
        return c.$isEmpty(a) || z(h) || a <= h;
      }, d.$observe("max", function (a) {
        h = qb(a);c.$validate();
      });
    }, url: function url(a, b, d, c, e, f) {
      Wa(a, b, d, c, e, f);uc(c);c.$$parserName = "url";c.$validators.url = function (a, b) {
        var d = a || b;return c.$isEmpty(d) || dh.test(d);
      };
    }, email: function email(a, b, d, c, e, f) {
      Wa(a, b, d, c, e, f);uc(c);c.$$parserName = "email";c.$validators.email = function (a, b) {
        var d = a || b;return c.$isEmpty(d) || eh.test(d);
      };
    },
    radio: function radio(a, b, d, c) {
      z(d.name) && b.attr("name", ++sb);b.on("click", function (a) {
        b[0].checked && c.$setViewValue(d.value, a && a.type);
      });c.$render = function () {
        b[0].checked = d.value === c.$viewValue;
      };d.$observe("value", c.$render);
    }, range: function range(a, b, d, c, e, f) {
      function g(a, c) {
        b.attr(a, d[a]);d.$observe(a, c);
      }function h(a) {
        n = qb(a);X(c.$modelValue) || (m ? (a = b.val(), n > a && (a = n, b.val(a)), c.$setViewValue(a)) : c.$validate());
      }function k(a) {
        p = qb(a);X(c.$modelValue) || (m ? (a = b.val(), p < a && (b.val(p), a = p < n ? n : p), c.$setViewValue(a)) : c.$validate());
      }function l(a) {
        q = qb(a);X(c.$modelValue) || (m && c.$viewValue !== b.val() ? c.$setViewValue(b.val()) : c.$validate());
      }vc(a, b, d, c);ae(c);Wa(a, b, d, c, e, f);var m = c.$$hasNativeValidators && "range" === b[0].type,
          n = m ? 0 : void 0,
          p = m ? 100 : void 0,
          q = m ? 1 : void 0,
          r = b[0].validity;a = u(d.min);e = u(d.max);f = u(d.step);var t = c.$render;c.$render = m && u(r.rangeUnderflow) && u(r.rangeOverflow) ? function () {
        t();c.$setViewValue(b.val());
      } : t;a && (c.$validators.min = m ? function () {
        return !0;
      } : function (a, b) {
        return c.$isEmpty(b) || z(n) || b >= n;
      }, g("min", h));e && (c.$validators.max = m ? function () {
        return !0;
      } : function (a, b) {
        return c.$isEmpty(b) || z(p) || b <= p;
      }, g("max", k));f && (c.$validators.step = m ? function () {
        return !r.stepMismatch;
      } : function (a, b) {
        var d;if (!(d = c.$isEmpty(b) || z(q))) {
          d = n || 0;var e = q,
              f = Number(b);if ((f | 0) !== f || (d | 0) !== d || (e | 0) !== e) {
            var g = Math.max(wc(f), wc(d), wc(e)),
                g = Math.pow(10, g),
                f = f * g;d *= g;e *= g;
          }d = 0 === (f - d) % e;
        }return d;
      }, g("step", l));
    }, checkbox: function checkbox(a, b, d, c, e, f, g, h) {
      var k = be(h, a, "ngTrueValue", d.ngTrueValue, !0),
          l = be(h, a, "ngFalseValue", d.ngFalseValue, !1);b.on("click", function (a) {
        c.$setViewValue(b[0].checked, a && a.type);
      });c.$render = function () {
        b[0].checked = c.$viewValue;
      };c.$isEmpty = function (a) {
        return !1 === a;
      };c.$formatters.push(function (a) {
        return oa(a, k);
      });c.$parsers.push(function (a) {
        return a ? k : l;
      });
    }, hidden: C, button: C, submit: C, reset: C, file: C },
      Nc = ["$browser", "$sniffer", "$filter", "$parse", function (a, b, d, c) {
    return { restrict: "E", require: ["?ngModel"], link: { pre: function pre(e, f, g, h) {
          if (h[0]) {
            var k = P(g.type);"range" !== k || g.hasOwnProperty("ngInputRange") || (k = "text");
            (le[k] || le.text)(e, f, g, h[0], b, a, d, c);
          }
        } } };
  }],
      fh = /^(true|false|\d+)$/,
      jf = function jf() {
    return { restrict: "A", priority: 100, compile: function compile(a, b) {
        return fh.test(b.ngValue) ? function (a, b, e) {
          e.$set("value", a.$eval(e.ngValue));
        } : function (a, b, e) {
          a.$watch(e.ngValue, function (a) {
            e.$set("value", a);
          });
        };
      } };
  },
      Je = ["$compile", function (a) {
    return { restrict: "AC", compile: function compile(b) {
        a.$$addBindingClass(b);return function (b, c, e) {
          a.$$addBindingInfo(c, e.ngBind);c = c[0];b.$watch(e.ngBind, function (a) {
            c.textContent = z(a) ? "" : a;
          });
        };
      } };
  }],
      Le = ["$interpolate", "$compile", function (a, b) {
    return { compile: function compile(d) {
        b.$$addBindingClass(d);return function (c, d, f) {
          c = a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d, c.expressions);d = d[0];f.$observe("ngBindTemplate", function (a) {
            d.textContent = z(a) ? "" : a;
          });
        };
      } };
  }],
      Ke = ["$sce", "$parse", "$compile", function (a, b, d) {
    return { restrict: "A", compile: function compile(c, e) {
        var f = b(e.ngBindHtml),
            g = b(e.ngBindHtml, function (b) {
          return a.valueOf(b);
        });d.$$addBindingClass(c);return function (b, c, e) {
          d.$$addBindingInfo(c, e.ngBindHtml);
          b.$watch(g, function () {
            var d = f(b);c.html(a.getTrustedHtml(d) || "");
          });
        };
      } };
  }],
      hf = ma({ restrict: "A", require: "ngModel", link: function link(a, b, d, c) {
      c.$viewChangeListeners.push(function () {
        a.$eval(d.ngChange);
      });
    } }),
      Me = xc("", !0),
      Oe = xc("Odd", 0),
      Ne = xc("Even", 1),
      Pe = Ua({ compile: function compile(a, b) {
      b.$set("ngCloak", void 0);a.removeClass("ng-cloak");
    } }),
      Qe = [function () {
    return { restrict: "A", scope: !0, controller: "@", priority: 500 };
  }],
      Sc = {},
      gh = { blur: !0, focus: !0 };q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) {
    var b = Ba("ng-" + a);Sc[b] = ["$parse", "$rootScope", function (d, c) {
      return { restrict: "A", compile: function compile(e, f) {
          var g = d(f[b], null, !0);return function (b, d) {
            d.on(a, function (d) {
              var e = function e() {
                g(b, { $event: d });
              };gh[a] && c.$$phase ? b.$evalAsync(e) : b.$apply(e);
            });
          };
        } };
    }];
  });var Te = ["$animate", "$compile", function (a, b) {
    return { multiElement: !0, transclude: "element", priority: 600, terminal: !0, restrict: "A", $$tlb: !0, link: function link(d, c, e, f, g) {
        var h, k, l;d.$watch(e.ngIf, function (d) {
          d ? k || g(function (d, f) {
            k = f;d[d.length++] = b.$$createComment("end ngIf", e.ngIf);h = { clone: d };a.enter(d, c.parent(), c);
          }) : (l && (l.remove(), l = null), k && (k.$destroy(), k = null), h && (l = wb(h.clone), a.leave(l).then(function () {
            l = null;
          }), h = null));
        });
      } };
  }],
      Ue = ["$templateRequest", "$anchorScroll", "$animate", function (a, b, d) {
    return { restrict: "ECA", priority: 400, terminal: !0, transclude: "element", controller: ga.noop, compile: function compile(c, e) {
        var f = e.ngInclude || e.src,
            g = e.onload || "",
            h = e.autoscroll;return function (c, e, m, n, p) {
          var q = 0,
              r,
              t,
              s,
              D = function D() {
            t && (t.remove(), t = null);r && (r.$destroy(), r = null);s && (d.leave(s).then(function () {
              t = null;
            }), t = s, s = null);
          };c.$watch(f, function (f) {
            var m = function m() {
              !u(h) || h && !c.$eval(h) || b();
            },
                w = ++q;f ? (a(f, !0).then(function (a) {
              if (!c.$$destroyed && w === q) {
                var b = c.$new();n.template = a;a = p(b, function (a) {
                  D();d.enter(a, null, e).then(m);
                });r = b;s = a;r.$emit("$includeContentLoaded", f);c.$eval(g);
              }
            }, function () {
              c.$$destroyed || w !== q || (D(), c.$emit("$includeContentError", f));
            }), c.$emit("$includeContentRequested", f)) : (D(), n.template = null);
          });
        };
      } };
  }],
      lf = ["$compile", function (a) {
    return { restrict: "ECA",
      priority: -400, require: "ngInclude", link: function link(b, d, c, e) {
        na.call(d[0]).match(/SVG/) ? (d.empty(), a(Vc(e.template, B.document).childNodes)(b, function (a) {
          d.append(a);
        }, { futureParentElement: d })) : (d.html(e.template), a(d.contents())(b));
      } };
  }],
      Ve = Ua({ priority: 450, compile: function compile() {
      return { pre: function pre(a, b, d) {
          a.$eval(d.ngInit);
        } };
    } }),
      gf = function gf() {
    return { restrict: "A", priority: 100, require: "ngModel", link: function link(a, b, d, c) {
        var e = b.attr(d.$attr.ngList) || ", ",
            f = "false" !== d.ngTrim,
            g = f ? U(e) : e;c.$parsers.push(function (a) {
          if (!z(a)) {
            var b = [];a && q(a.split(g), function (a) {
              a && b.push(f ? U(a) : a);
            });return b;
          }
        });c.$formatters.push(function (a) {
          if (K(a)) return a.join(e);
        });c.$isEmpty = function (a) {
          return !a || !a.length;
        };
      } };
  },
      rb = "ng-valid",
      ce = "ng-invalid",
      Va = "ng-pristine",
      Pb = "ng-dirty",
      ee = "ng-pending",
      pb = N("ngModel"),
      hh = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function (a, b, d, c, e, f, g, h, k, l) {
    this.$modelValue = this.$viewValue = Number.NaN;this.$$rawModelValue = void 0;this.$validators = {};
    this.$asyncValidators = {};this.$parsers = [];this.$formatters = [];this.$viewChangeListeners = [];this.$untouched = !0;this.$touched = !1;this.$pristine = !0;this.$dirty = !1;this.$valid = !0;this.$invalid = !1;this.$error = {};this.$$success = {};this.$pending = void 0;this.$name = l(d.name || "", !1)(a);this.$$parentForm = Ob;var m = e(d.ngModel),
        n = m.assign,
        p = m,
        r = n,
        J = null,
        t,
        s = this;this.$$setOptions = function (a) {
      if ((s.$options = a) && a.getterSetter) {
        var b = e(d.ngModel + "()"),
            f = e(d.ngModel + "($$$p)");p = function p(a) {
          var c = m(a);F(c) && (c = b(a));
          return c;
        };r = function r(a, b) {
          F(m(a)) ? f(a, { $$$p: b }) : n(a, b);
        };
      } else if (!m.assign) throw pb("nonassign", d.ngModel, wa(c));
    };this.$render = C;this.$isEmpty = function (a) {
      return z(a) || "" === a || null === a || a !== a;
    };this.$$updateEmptyClasses = function (a) {
      s.$isEmpty(a) ? (f.removeClass(c, "ng-not-empty"), f.addClass(c, "ng-empty")) : (f.removeClass(c, "ng-empty"), f.addClass(c, "ng-not-empty"));
    };var D = 0;Zd({ ctrl: this, $element: c, set: function set(a, b) {
        a[b] = !0;
      }, unset: function unset(a, b) {
        delete a[b];
      }, $animate: f });this.$setPristine = function () {
      s.$dirty = !1;s.$pristine = !0;f.removeClass(c, Pb);f.addClass(c, Va);
    };this.$setDirty = function () {
      s.$dirty = !0;s.$pristine = !1;f.removeClass(c, Va);f.addClass(c, Pb);s.$$parentForm.$setDirty();
    };this.$setUntouched = function () {
      s.$touched = !1;s.$untouched = !0;f.setClass(c, "ng-untouched", "ng-touched");
    };this.$setTouched = function () {
      s.$touched = !0;s.$untouched = !1;f.setClass(c, "ng-touched", "ng-untouched");
    };this.$rollbackViewValue = function () {
      g.cancel(J);s.$viewValue = s.$$lastCommittedViewValue;s.$render();
    };this.$validate = function () {
      if (!X(s.$modelValue)) {
        var a = s.$$rawModelValue,
            b = s.$valid,
            c = s.$modelValue,
            d = s.$options && s.$options.allowInvalid;s.$$runValidators(a, s.$$lastCommittedViewValue, function (e) {
          d || b === e || (s.$modelValue = e ? a : void 0, s.$modelValue !== c && s.$$writeModelToScope());
        });
      }
    };this.$$runValidators = function (a, b, c) {
      function d() {
        var c = !0;q(s.$validators, function (d, e) {
          var g = d(a, b);c = c && g;f(e, g);
        });return c ? !0 : (q(s.$asyncValidators, function (a, b) {
          f(b, null);
        }), !1);
      }function e() {
        var c = [],
            d = !0;q(s.$asyncValidators, function (e, g) {
          var h = e(a, b);if (!h || !F(h.then)) throw pb("nopromise", h);f(g, void 0);c.push(h.then(function () {
            f(g, !0);
          }, function () {
            d = !1;f(g, !1);
          }));
        });c.length ? k.all(c).then(function () {
          g(d);
        }, C) : g(!0);
      }function f(a, b) {
        h === D && s.$setValidity(a, b);
      }function g(a) {
        h === D && c(a);
      }D++;var h = D;(function () {
        var a = s.$$parserName || "parse";if (z(t)) f(a, null);else return t || (q(s.$validators, function (a, b) {
          f(b, null);
        }), q(s.$asyncValidators, function (a, b) {
          f(b, null);
        })), f(a, t), t;return !0;
      })() ? d() ? e() : g(!1) : g(!1);
    };this.$commitViewValue = function () {
      var a = s.$viewValue;g.cancel(J);if (s.$$lastCommittedViewValue !== a || "" === a && s.$$hasNativeValidators) s.$$updateEmptyClasses(a), s.$$lastCommittedViewValue = a, s.$pristine && this.$setDirty(), this.$$parseAndValidate();
    };this.$$parseAndValidate = function () {
      var b = s.$$lastCommittedViewValue;if (t = z(b) ? void 0 : !0) for (var c = 0; c < s.$parsers.length; c++) {
        if (b = s.$parsers[c](b), z(b)) {
          t = !1;break;
        }
      }X(s.$modelValue) && (s.$modelValue = p(a));var d = s.$modelValue,
          e = s.$options && s.$options.allowInvalid;s.$$rawModelValue = b;e && (s.$modelValue = b, s.$modelValue !== d && s.$$writeModelToScope());s.$$runValidators(b, s.$$lastCommittedViewValue, function (a) {
        e || (s.$modelValue = a ? b : void 0, s.$modelValue !== d && s.$$writeModelToScope());
      });
    };this.$$writeModelToScope = function () {
      r(a, s.$modelValue);q(s.$viewChangeListeners, function (a) {
        try {
          a();
        } catch (c) {
          b(c);
        }
      });
    };this.$setViewValue = function (a, b) {
      s.$viewValue = a;s.$options && !s.$options.updateOnDefault || s.$$debounceViewValueCommit(b);
    };this.$$debounceViewValueCommit = function (b) {
      var c = 0,
          d = s.$options;d && u(d.debounce) && (d = d.debounce, Z(d) ? c = d : Z(d[b]) ? c = d[b] : Z(d["default"]) && (c = d["default"]));
      g.cancel(J);c ? J = g(function () {
        s.$commitViewValue();
      }, c) : h.$$phase ? s.$commitViewValue() : a.$apply(function () {
        s.$commitViewValue();
      });
    };a.$watch(function () {
      var b = p(a);if (b !== s.$modelValue && (s.$modelValue === s.$modelValue || b === b)) {
        s.$modelValue = s.$$rawModelValue = b;t = void 0;for (var c = s.$formatters, d = c.length, e = b; d--;) {
          e = c[d](e);
        }s.$viewValue !== e && (s.$$updateEmptyClasses(e), s.$viewValue = s.$$lastCommittedViewValue = e, s.$render(), s.$$runValidators(s.$modelValue, s.$viewValue, C));
      }return b;
    });
  }],
      ff = ["$rootScope", function (a) {
    return { restrict: "A",
      require: ["ngModel", "^?form", "^?ngModelOptions"], controller: hh, priority: 1, compile: function compile(b) {
        b.addClass(Va).addClass("ng-untouched").addClass(rb);return { pre: function pre(a, b, e, f) {
            var g = f[0];b = f[1] || g.$$parentForm;g.$$setOptions(f[2] && f[2].$options);b.$addControl(g);e.$observe("name", function (a) {
              g.$name !== a && g.$$parentForm.$$renameControl(g, a);
            });a.$on("$destroy", function () {
              g.$$parentForm.$removeControl(g);
            });
          }, post: function post(b, c, e, f) {
            var g = f[0];if (g.$options && g.$options.updateOn) c.on(g.$options.updateOn, function (a) {
              g.$$debounceViewValueCommit(a && a.type);
            });c.on("blur", function () {
              g.$touched || (a.$$phase ? b.$evalAsync(g.$setTouched) : b.$apply(g.$setTouched));
            });
          } };
      } };
  }],
      ih = /(\s+|^)default(\s+|$)/,
      kf = function kf() {
    return { restrict: "A", controller: ["$scope", "$attrs", function (a, b) {
        var d = this;this.$options = pa(a.$eval(b.ngModelOptions));u(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = U(this.$options.updateOn.replace(ih, function () {
          d.$options.updateOnDefault = !0;return " ";
        }))) : this.$options.updateOnDefault = !0;
      }] };
  },
      We = Ua({ terminal: !0, priority: 1E3 }),
      jh = N("ngOptions"),
      kh = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
      df = ["$compile", "$document", "$parse", function (a, b, d) {
    function c(a, b, c) {
      function e(a, b, c, d, f) {
        this.selectValue = a;this.viewValue = b;this.label = c;this.group = d;this.disabled = f;
      }function f(a) {
        var b;if (!q && ra(a)) b = a;else {
          b = [];for (var c in a) {
            a.hasOwnProperty(c) && "$" !== c.charAt(0) && b.push(c);
          }
        }return b;
      }var n = a.match(kh);if (!n) throw jh("iexp", a, wa(b));var p = n[5] || n[7],
          q = n[6];a = / as /.test(n[0]) && n[1];var r = n[9];b = d(n[2] ? n[1] : p);var t = a && d(a) || b,
          s = r && d(r),
          u = r ? function (a, b) {
        return s(c, b);
      } : function (a) {
        return za(a);
      },
          y = function y(a, b) {
        return u(a, A(a, b));
      },
          z = d(n[2] || n[1]),
          w = d(n[3] || ""),
          C = d(n[4] || ""),
          F = d(n[8]),
          B = {},
          A = q ? function (a, b) {
        B[q] = b;B[p] = a;return B;
      } : function (a) {
        B[p] = a;return B;
      };return { trackBy: r, getTrackByValue: y, getWatchables: d(F, function (a) {
          var b = [];a = a || [];for (var d = f(a), e = d.length, g = 0; g < e; g++) {
            var h = a === d ? g : d[g],
                l = a[h],
                h = A(l, h),
                l = u(l, h);b.push(l);if (n[2] || n[1]) l = z(c, h), b.push(l);n[4] && (h = C(c, h), b.push(h));
          }return b;
        }), getOptions: function getOptions() {
          for (var a = [], b = {}, d = F(c) || [], g = f(d), h = g.length, n = 0; n < h; n++) {
            var p = d === g ? n : g[n],
                q = A(d[p], p),
                s = t(c, q),
                p = u(s, q),
                x = z(c, q),
                B = w(c, q),
                q = C(c, q),
                s = new e(p, s, x, B, q);a.push(s);b[p] = s;
          }return { items: a, selectValueMap: b, getOptionFromViewValue: function getOptionFromViewValue(a) {
              return b[y(a)];
            }, getViewValueFromOption: function getViewValueFromOption(a) {
              return r ? ga.copy(a.viewValue) : a.viewValue;
            } };
        } };
    }var e = B.document.createElement("option"),
        f = B.document.createElement("optgroup");return { restrict: "A", terminal: !0, require: ["select", "ngModel"], link: { pre: function pre(a, b, c, d) {
          d[0].registerOption = C;
        }, post: function post(d, h, k, l) {
          function m(a, b) {
            a.element = b;b.disabled = a.disabled;a.label !== b.label && (b.label = a.label, b.textContent = a.label);a.value !== b.value && (b.value = a.selectValue);
          }function n() {
            var a = w && p.readValue();if (w) for (var b = w.items.length - 1; 0 <= b; b--) {
              var c = w.items[b];u(c.group) ? Gb(c.element.parentNode) : Gb(c.element);
            }w = B.getOptions();var d = {};y && h.prepend(t);w.items.forEach(function (a) {
              var b;if (u(a.group)) {
                b = d[a.group];b || (b = f.cloneNode(!1), F.appendChild(b), b.label = null === a.group ? "null" : a.group, d[a.group] = b);var c = e.cloneNode(!1);
              } else b = F, c = e.cloneNode(!1);b.appendChild(c);m(a, c);
            });h[0].appendChild(F);r.$render();r.$isEmpty(a) || (b = p.readValue(), (B.trackBy || z ? oa(a, b) : a === b) || (r.$setViewValue(b), r.$render()));
          }var p = l[0],
              r = l[1],
              z = k.multiple,
              t;l = 0;for (var s = h.children(), D = s.length; l < D; l++) {
            if ("" === s[l].value) {
              t = s.eq(l);break;
            }
          }var y = !!t,
              C = E(e.cloneNode(!1));C.val("?");var w,
              B = c(k.ngOptions, h, d),
              F = b[0].createDocumentFragment(),
              H = function H() {
            y ? t.removeAttr("selected") : t.remove();
          };z ? (r.$isEmpty = function (a) {
            return !a || 0 === a.length;
          }, p.writeValue = function (a) {
            w.items.forEach(function (a) {
              a.element.selected = !1;
            });a && a.forEach(function (a) {
              if (a = w.getOptionFromViewValue(a)) a.element.selected = !0;
            });
          }, p.readValue = function () {
            var a = h.val() || [],
                b = [];q(a, function (a) {
              (a = w.selectValueMap[a]) && !a.disabled && b.push(w.getViewValueFromOption(a));
            });return b;
          }, B.trackBy && d.$watchCollection(function () {
            if (K(r.$viewValue)) return r.$viewValue.map(function (a) {
              return B.getTrackByValue(a);
            });
          }, function () {
            r.$render();
          })) : (p.writeValue = function (a) {
            var b = w.selectValueMap[h.val()],
                c = w.getOptionFromViewValue(a);b && b.element.removeAttribute("selected");c ? (h[0].value !== c.selectValue && (C.remove(), H(), h[0].value = c.selectValue, c.element.selected = !0), c.element.setAttribute("selected", "selected")) : null === a || y ? (C.remove(), y || h.prepend(t), h.val(""), t.prop("selected", !0), t.attr("selected", !0)) : (H(), h.prepend(C), h.val("?"), C.prop("selected", !0), C.attr("selected", !0));
          }, p.readValue = function () {
            var a = w.selectValueMap[h.val()];return a && !a.disabled ? (H(), C.remove(), w.getViewValueFromOption(a)) : null;
          }, B.trackBy && d.$watch(function () {
            return B.getTrackByValue(r.$viewValue);
          }, function () {
            r.$render();
          }));y ? (t.remove(), a(t)(d), t.removeClass("ng-scope")) : t = E(e.cloneNode(!1));h.empty();n();d.$watchCollection(B.getWatchables, n);
        } } };
  }],
      Xe = ["$locale", "$interpolate", "$log", function (a, b, d) {
    var c = /{}/g,
        e = /^when(Minus)?(.+)$/;return { link: function link(f, g, h) {
        function k(a) {
          g.text(a || "");
        }var l = h.count,
            m = h.$attr.when && g.attr(h.$attr.when),
            n = h.offset || 0,
            p = f.$eval(m) || {},
            r = {},
            u = b.startSymbol(),
            t = b.endSymbol(),
            s = u + l + "-" + n + t,
            D = ga.noop,
            y;q(h, function (a, b) {
          var c = e.exec(b);c && (c = (c[1] ? "-" : "") + P(c[2]), p[c] = g.attr(h.$attr[b]));
        });q(p, function (a, d) {
          r[d] = b(a.replace(c, s));
        });f.$watch(l, function (b) {
          var c = parseFloat(b),
              e = X(c);e || c in p || (c = a.pluralCat(c - n));c === y || e && X(y) || (D(), e = r[c], z(e) ? (null != b && d.debug("ngPluralize: no rule defined for '" + c + "' in " + m), D = C, k()) : D = f.$watch(e, k), y = c);
        });
      } };
  }],
      Ye = ["$parse", "$animate", "$compile", function (a, b, d) {
    var c = N("ngRepeat"),
        e = function e(a, b, c, d, _e2, m, n) {
      a[c] = d;_e2 && (a[_e2] = m);a.$index = b;a.$first = 0 === b;a.$last = b === n - 1;a.$middle = !(a.$first || a.$last);a.$odd = !(a.$even = 0 === (b & 1));
    };return { restrict: "A", multiElement: !0, transclude: "element", priority: 1E3, terminal: !0, $$tlb: !0, compile: function compile(f, g) {
        var h = g.ngRepeat,
            k = d.$$createComment("end ngRepeat", h),
            l = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
        if (!l) throw c("iexp", h);var m = l[1],
            n = l[2],
            p = l[3],
            r = l[4],
            l = m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if (!l) throw c("iidexp", m);var u = l[3] || l[1],
            t = l[2];if (p && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(p))) throw c("badident", p);var s,
            z,
            y,
            C,
            w = { $id: za };r ? s = a(r) : (y = function y(a, b) {
          return za(b);
        }, C = function C(a) {
          return a;
        });return function (a, d, f, g, l) {
          s && (z = function z(b, c, d) {
            t && (w[t] = b);w[u] = c;w.$index = d;return s(a, w);
          });var m = S();a.$watchCollection(n, function (f) {
            var g,
                n,
                s = d[0],
                r,
                x = S(),
                w,
                B,
                F,
                A,
                H,
                E,
                I;p && (a[p] = f);if (ra(f)) H = f, n = z || y;else for (I in n = z || C, H = [], f) {
              sa.call(f, I) && "$" !== I.charAt(0) && H.push(I);
            }w = H.length;I = Array(w);for (g = 0; g < w; g++) {
              if (B = f === H ? g : H[g], F = f[B], A = n(B, F, g), m[A]) E = m[A], delete m[A], x[A] = E, I[g] = E;else {
                if (x[A]) throw q(I, function (a) {
                  a && a.scope && (m[a.id] = a);
                }), c("dupes", h, A, F);I[g] = { id: A, scope: void 0, clone: void 0 };x[A] = !0;
              }
            }for (r in m) {
              E = m[r];A = wb(E.clone);b.leave(A);if (A[0].parentNode) for (g = 0, n = A.length; g < n; g++) {
                A[g].$$NG_REMOVED = !0;
              }E.scope.$destroy();
            }for (g = 0; g < w; g++) {
              if (B = f === H ? g : H[g], F = f[B], E = I[g], E.scope) {
                r = s;do {
                  r = r.nextSibling;
                } while (r && r.$$NG_REMOVED);E.clone[0] !== r && b.move(wb(E.clone), null, s);s = E.clone[E.clone.length - 1];e(E.scope, g, u, F, t, B, w);
              } else l(function (a, c) {
                E.scope = c;var d = k.cloneNode(!1);a[a.length++] = d;b.enter(a, null, s);s = d;E.clone = a;x[E.id] = E;e(E.scope, g, u, F, t, B, w);
              });
            }m = x;
          });
        };
      } };
  }],
      Ze = ["$animate", function (a) {
    return { restrict: "A", multiElement: !0, link: function link(b, d, c) {
        b.$watch(c.ngShow, function (b) {
          a[b ? "removeClass" : "addClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" });
        });
      } };
  }],
      Se = ["$animate", function (a) {
    return { restrict: "A", multiElement: !0, link: function link(b, d, c) {
        b.$watch(c.ngHide, function (b) {
          a[b ? "addClass" : "removeClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" });
        });
      } };
  }],
      $e = Ua(function (a, b, d) {
    a.$watch(d.ngStyle, function (a, d) {
      d && a !== d && q(d, function (a, c) {
        b.css(c, "");
      });a && b.css(a);
    }, !0);
  }),
      af = ["$animate", "$compile", function (a, b) {
    return { require: "ngSwitch", controller: ["$scope", function () {
        this.cases = {};
      }], link: function link(d, c, e, f) {
        var g = [],
            h = [],
            k = [],
            l = [],
            m = function m(a, b) {
          return function () {
            a.splice(b, 1);
          };
        };d.$watch(e.ngSwitch || e.on, function (c) {
          var d, e;d = 0;for (e = k.length; d < e; ++d) {
            a.cancel(k[d]);
          }d = k.length = 0;for (e = l.length; d < e; ++d) {
            var r = wb(h[d].clone);l[d].$destroy();(k[d] = a.leave(r)).then(m(k, d));
          }h.length = 0;l.length = 0;(g = f.cases["!" + c] || f.cases["?"]) && q(g, function (c) {
            c.transclude(function (d, e) {
              l.push(e);var f = c.element;d[d.length++] = b.$$createComment("end ngSwitchWhen");h.push({ clone: d });a.enter(d, f.parent(), f);
            });
          });
        });
      } };
  }],
      bf = Ua({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function link(a, b, d, c, e) {
      c.cases["!" + d.ngSwitchWhen] = c.cases["!" + d.ngSwitchWhen] || [];c.cases["!" + d.ngSwitchWhen].push({ transclude: e, element: b });
    } }),
      cf = Ua({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function link(a, b, d, c, e) {
      c.cases["?"] = c.cases["?"] || [];c.cases["?"].push({ transclude: e, element: b });
    } }),
      lh = N("ngTransclude"),
      ef = ["$compile", function (a) {
    return { restrict: "EAC", terminal: !0, compile: function compile(b) {
        var d = a(b.contents());b.empty();return function (a, b, f, g, h) {
          function k() {
            d(a, function (a) {
              b.append(a);
            });
          }if (!h) throw lh("orphan", wa(b));f.ngTransclude === f.$attr.ngTransclude && (f.ngTransclude = "");f = f.ngTransclude || f.ngTranscludeSlot;h(function (a, c) {
            a.length ? b.append(a) : (k(), c.$destroy());
          }, null, f);f && !h.isSlotFilled(f) && k();
        };
      } };
  }],
      Ge = ["$templateCache", function (a) {
    return { restrict: "E", terminal: !0, compile: function compile(b, d) {
        "text/ng-template" === d.type && a.put(d.id, b[0].text);
      } };
  }],
      mh = { $setViewValue: C, $render: C },
      nh = ["$element", "$scope", function (a, b) {
    var d = this,
        c = new Ra();d.ngModelCtrl = mh;d.unknownOption = E(B.document.createElement("option"));d.renderUnknownOption = function (b) {
      b = "? " + za(b) + " ?";d.unknownOption.val(b);a.prepend(d.unknownOption);a.val(b);
    };b.$on("$destroy", function () {
      d.renderUnknownOption = C;
    });d.removeUnknownOption = function () {
      d.unknownOption.parent() && d.unknownOption.remove();
    };d.readValue = function () {
      d.removeUnknownOption();return a.val();
    };d.writeValue = function (b) {
      d.hasOption(b) ? (d.removeUnknownOption(), a.val(b), "" === b && d.emptyOption.prop("selected", !0)) : null == b && d.emptyOption ? (d.removeUnknownOption(), a.val("")) : d.renderUnknownOption(b);
    };d.addOption = function (a, b) {
      if (8 !== b[0].nodeType) {
        Qa(a, '"option value"');"" === a && (d.emptyOption = b);var g = c.get(a) || 0;c.put(a, g + 1);d.ngModelCtrl.$render();b[0].hasAttribute("selected") && (b[0].selected = !0);
      }
    };d.removeOption = function (a) {
      var b = c.get(a);b && (1 === b ? (c.remove(a), "" === a && (d.emptyOption = void 0)) : c.put(a, b - 1));
    };d.hasOption = function (a) {
      return !!c.get(a);
    };d.registerOption = function (a, b, c, h, k) {
      if (h) {
        var l;c.$observe("value", function (a) {
          u(l) && d.removeOption(l);l = a;d.addOption(a, b);
        });
      } else k ? a.$watch(k, function (a, e) {
        c.$set("value", a);e !== a && d.removeOption(e);d.addOption(a, b);
      }) : d.addOption(c.value, b);b.on("$destroy", function () {
        d.removeOption(c.value);d.ngModelCtrl.$render();
      });
    };
  }],
      He = function He() {
    return { restrict: "E", require: ["select", "?ngModel"], controller: nh, priority: 1, link: { pre: function pre(a, b, d, c) {
          var e = c[1];if (e) {
            var f = c[0];f.ngModelCtrl = e;b.on("change", function () {
              a.$apply(function () {
                e.$setViewValue(f.readValue());
              });
            });
            if (d.multiple) {
              f.readValue = function () {
                var a = [];q(b.find("option"), function (b) {
                  b.selected && a.push(b.value);
                });return a;
              };f.writeValue = function (a) {
                var c = new Ra(a);q(b.find("option"), function (a) {
                  a.selected = u(c.get(a.value));
                });
              };var g,
                  h = NaN;a.$watch(function () {
                h !== e.$viewValue || oa(g, e.$viewValue) || (g = ia(e.$viewValue), e.$render());h = e.$viewValue;
              });e.$isEmpty = function (a) {
                return !a || 0 === a.length;
              };
            }
          }
        }, post: function post(a, b, d, c) {
          var e = c[1];if (e) {
            var f = c[0];e.$render = function () {
              f.writeValue(e.$viewValue);
            };
          }
        } } };
  },
      Ie = ["$interpolate", function (a) {
    return { restrict: "E", priority: 100, compile: function compile(b, d) {
        if (u(d.value)) var c = a(d.value, !0);else {
          var e = a(b.text(), !0);e || d.$set("value", b.text());
        }return function (a, b, d) {
          var k = b.parent();(k = k.data("$selectController") || k.parent().data("$selectController")) && k.registerOption(a, b, d, c, e);
        };
      } };
  }],
      Pc = function Pc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        c && (d.required = !0, c.$validators.required = function (a, b) {
          return !d.required || !c.$isEmpty(b);
        }, d.$observe("required", function () {
          c.$validate();
        }));
      } };
  },
      Oc = function Oc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var e,
              f = d.ngPattern || d.pattern;d.$observe("pattern", function (a) {
            H(a) && 0 < a.length && (a = new RegExp("^" + a + "$"));if (a && !a.test) throw N("ngPattern")("noregexp", f, a, wa(b));e = a || void 0;c.$validate();
          });c.$validators.pattern = function (a, b) {
            return c.$isEmpty(b) || z(e) || e.test(b);
          };
        }
      } };
  },
      Rc = function Rc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var e = -1;d.$observe("maxlength", function (a) {
            a = aa(a);e = X(a) ? -1 : a;c.$validate();
          });
          c.$validators.maxlength = function (a, b) {
            return 0 > e || c.$isEmpty(b) || b.length <= e;
          };
        }
      } };
  },
      Qc = function Qc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var e = 0;d.$observe("minlength", function (a) {
            e = aa(a) || 0;c.$validate();
          });c.$validators.minlength = function (a, b) {
            return c.$isEmpty(b) || b.length >= e;
          };
        }
      } };
  };B.angular.bootstrap ? B.console && console.log("WARNING: Tried to load angular more than once.") : (ze(), Be(ga), ga.module("ngLocale", [], ["$provide", function (a) {
    function b(a) {
      a += "";var b = a.indexOf(".");
      return -1 == b ? 0 : a.length - b - 1;
    }a.value("$locale", { DATETIME_FORMATS: { AMPMS: ["AM", "PM"], DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), ERANAMES: ["Before Christ", "Anno Domini"], ERAS: ["BC", "AD"], FIRSTDAYOFWEEK: 6, MONTH: "January February March April May June July August September October November December".split(" "), SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "), SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), STANDALONEMONTH: "January February March April May June July August September October November December".split(" "),
        WEEKENDRANGE: [5, 6], fullDate: "EEEE, MMMM d, y", longDate: "MMMM d, y", medium: "MMM d, y h:mm:ss a", mediumDate: "MMM d, y", mediumTime: "h:mm:ss a", "short": "M/d/yy h:mm a", shortDate: "M/d/yy", shortTime: "h:mm a" }, NUMBER_FORMATS: { CURRENCY_SYM: "$", DECIMAL_SEP: ".", GROUP_SEP: ",", PATTERNS: [{ gSize: 3, lgSize: 3, maxFrac: 3, minFrac: 0, minInt: 1, negPre: "-", negSuf: "", posPre: "", posSuf: "" }, { gSize: 3, lgSize: 3, maxFrac: 2, minFrac: 2, minInt: 1, negPre: "-\xA4", negSuf: "", posPre: "\xA4", posSuf: "" }] }, id: "en-us", localeID: "en_US", pluralCat: function pluralCat(a, c) {
        var e = a | 0,
            f = c;void 0 === f && (f = Math.min(b(a), 3));Math.pow(10, f);return 1 == e && 0 == f ? "one" : "other";
      } });
  }]), E(B.document).ready(function () {
    ue(B.document, Ic);
  }));
})(window);!window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Swiper 3.3.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 7, 2016
 */
!function () {
  "use strict";
  function e(e) {
    e.fn.swiper = function (a) {
      var r;return e(this).each(function () {
        var e = new t(this, a);r || (r = e);
      }), r;
    };
  }var a,
      t = function t(e, i) {
    function s(e) {
      return Math.floor(e);
    }function n() {
      b.autoplayTimeoutId = setTimeout(function () {
        b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? i.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b));
      }, b.params.autoplay);
    }function o(e, t) {
      var r = a(e.target);if (!r.is(t)) if ("string" == typeof t) r = r.parents(t);else if (t.nodeType) {
        var i;return r.parents().each(function (e, a) {
          a === t && (i = t);
        }), i ? t : void 0;
      }if (0 !== r.length) return r[0];
    }function l(e, a) {
      a = a || {};var t = window.MutationObserver || window.WebkitMutationObserver,
          r = new t(function (e) {
        e.forEach(function (e) {
          b.onResize(!0), b.emit("onObserverUpdate", b, e);
        });
      });r.observe(e, { attributes: "undefined" == typeof a.attributes ? !0 : a.attributes, childList: "undefined" == typeof a.childList ? !0 : a.childList, characterData: "undefined" == typeof a.characterData ? !0 : a.characterData }), b.observers.push(r);
    }function p(e) {
      e.originalEvent && (e = e.originalEvent);var a = e.keyCode || e.charCode;if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a)) return !1;if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a)) return !1;if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
        if (37 === a || 39 === a || 38 === a || 40 === a) {
          var t = !1;if (b.container.parents(".swiper-slide").length > 0 && 0 === b.container.parents(".swiper-slide-active").length) return;var r = { left: window.pageXOffset, top: window.pageYOffset },
              i = window.innerWidth,
              s = window.innerHeight,
              n = b.container.offset();b.rtl && (n.left = n.left - b.container[0].scrollLeft);for (var o = [[n.left, n.top], [n.left + b.width, n.top], [n.left, n.top + b.height], [n.left + b.width, n.top + b.height]], l = 0; l < o.length; l++) {
            var p = o[l];p[0] >= r.left && p[0] <= r.left + i && p[1] >= r.top && p[1] <= r.top + s && (t = !0);
          }if (!t) return;
        }b.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev());
      }
    }function d(e) {
      e.originalEvent && (e = e.originalEvent);var a = b.mousewheel.event,
          t = 0,
          r = b.rtl ? -1 : 1;if ("mousewheel" === a) {
        if (b.params.mousewheelForceToAxis) {
          if (b.isHorizontal()) {
            if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;t = e.wheelDeltaX * r;
          } else {
            if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;t = e.wheelDeltaY;
          }
        } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY;
      } else if ("DOMMouseScroll" === a) t = -e.detail;else if ("wheel" === a) if (b.params.mousewheelForceToAxis) {
        if (b.isHorizontal()) {
          if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;t = -e.deltaX * r;
        } else {
          if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;t = -e.deltaY;
        }
      } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;if (0 !== t) {
        if (b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
          var i = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity,
              s = b.isBeginning,
              n = b.isEnd;if (i >= b.minTranslate() && (i = b.minTranslate()), i <= b.maxTranslate() && (i = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(i), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
            b.slideReset();
          }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === i || i === b.maxTranslate()) return;
        } else {
          if (new window.Date().getTime() - b.mousewheel.lastScrollTime > 60) if (0 > t) {
            if (b.isEnd && !b.params.loop || b.animating) {
              if (b.params.mousewheelReleaseOnEdges) return !0;
            } else b.slideNext();
          } else if (b.isBeginning && !b.params.loop || b.animating) {
            if (b.params.mousewheelReleaseOnEdges) return !0;
          } else b.slidePrev();b.mousewheel.lastScrollTime = new window.Date().getTime();
        }return b.params.autoplay && b.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1;
      }
    }function u(e, t) {
      e = a(e);var r,
          i,
          s,
          n = b.rtl ? -1 : 1;r = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), i || s ? (i = i || "0", s = s || "0") : b.isHorizontal() ? (i = r, s = "0") : (s = r, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", e.transform("translate3d(" + i + ", " + s + ",0px)");
    }function c(e) {
      return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e;
    }if (!(this instanceof t)) return new t(e, i);var m = { direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, autoplay: !1, autoplayDisableOnInteraction: !0, autoplayStopOnLast: !1, iOSEdgeSwipeDetection: !1, iOSEdgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 }, flip: { slideShadows: !0, limitRotation: !0 }, cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 }, fade: { crossFade: !1 }, parallax: !1, scrollbar: null, scrollbarHide: !0, scrollbarDraggable: !1, scrollbarSnapOnRelease: !1, keyboardControl: !1, mousewheelControl: !1, mousewheelReleaseOnEdges: !1, mousewheelInvert: !1, mousewheelForceToAxis: !1, mousewheelSensitivity: 1, hashnav: !1, breakpoints: void 0, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, onlyExternal: !1, threshold: 0, touchMoveStopPropagation: !0, uniqueNavElements: !0, pagination: null, paginationElement: "span", paginationClickable: !1, paginationHide: !1, paginationBulletRender: null, paginationProgressRender: null, paginationFractionRender: null, paginationCustomRender: null, paginationType: "bullets", resistance: !0, resistanceRatio: .85, nextButton: null, prevButton: null, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, lazyLoading: !1, lazyLoadingInPrevNext: !1, lazyLoadingInPrevNextAmount: 1, lazyLoadingOnTransitionStart: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, control: void 0, controlInverse: !1, controlBy: "slide", allowSwipeToPrev: !0, allowSwipeToNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slidePrevClass: "swiper-slide-prev", wrapperClass: "swiper-wrapper", bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", buttonDisabledClass: "swiper-button-disabled", paginationCurrentClass: "swiper-pagination-current", paginationTotalClass: "swiper-pagination-total", paginationHiddenClass: "swiper-pagination-hidden", paginationProgressbarClass: "swiper-pagination-progressbar", observer: !1, observeParents: !1, a11y: !1, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", runCallbacksOnInit: !0 },
        h = i && i.virtualTranslate;i = i || {};var f = {};for (var g in i) {
      if ("object" != _typeof(i[g]) || null === i[g] || i[g].nodeType || i[g] === window || i[g] === document || "undefined" != typeof r && i[g] instanceof r || "undefined" != typeof jQuery && i[g] instanceof jQuery) f[g] = i[g];else {
        f[g] = {};for (var v in i[g]) {
          f[g][v] = i[g][v];
        }
      }
    }for (var w in m) {
      if ("undefined" == typeof i[w]) i[w] = m[w];else if ("object" == _typeof(i[w])) for (var y in m[w]) {
        "undefined" == typeof i[w][y] && (i[w][y] = m[w][y]);
      }
    }var b = this;if (b.params = i, b.originalParams = f, b.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function () {
      if (!b.params.breakpoints) return !1;var e,
          a = !1,
          t = [];for (e in b.params.breakpoints) {
        b.params.breakpoints.hasOwnProperty(e) && t.push(e);
      }t.sort(function (e, a) {
        return parseInt(e, 10) > parseInt(a, 10);
      });for (var r = 0; r < t.length; r++) {
        e = t[r], e >= window.innerWidth && !a && (a = e);
      }return a || "max";
    }, b.setBreakpoint = function () {
      var e = b.getActiveBreakpoint();if (e && b.currentBreakpoint !== e) {
        var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
            t = b.params.loop && a.slidesPerView !== b.params.slidesPerView;for (var r in a) {
          b.params[r] = a[r];
        }b.currentBreakpoint = e, t && b.destroyLoop && b.reLoop(!0);
      }
    }, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
      if (b.container.length > 1) {
        var x = [];return b.container.each(function () {
          x.push(new t(this, i));
        }), x;
      }b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push("swiper-container-" + b.params.direction), b.params.freeMode && b.classNames.push("swiper-container-free-mode"), b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push("swiper-container-autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), ("fade" === b.params.effect || "flip" === b.params.effect) && (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof h && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = a(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = a(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function () {
        return "horizontal" === b.params.direction;
      }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push("swiper-container-rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push("swiper-container-multirow"), b.device.android && b.classNames.push("swiper-container-android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function () {
        b.params.allowSwipeToNext = !1;
      }, b.lockSwipeToPrev = function () {
        b.params.allowSwipeToPrev = !1;
      }, b.lockSwipes = function () {
        b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1;
      }, b.unlockSwipeToNext = function () {
        b.params.allowSwipeToNext = !0;
      }, b.unlockSwipeToPrev = function () {
        b.params.allowSwipeToPrev = !0;
      }, b.unlockSwipes = function () {
        b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0;
      }, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab"), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function (e, a, t, r, i) {
        function s() {
          i && i();
        }var n;e.complete && r ? s() : a ? (n = new window.Image(), n.onload = s, n.onerror = s, t && (n.srcset = t), a && (n.src = a)) : s();
      }, b.preloadImages = function () {
        function e() {
          "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)));
        }b.imagesToLoad = b.container.find("img");for (var a = 0; a < b.imagesToLoad.length; a++) {
          b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), !0, e);
        }
      }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function () {
        return "undefined" != typeof b.autoplayTimeoutId ? !1 : b.params.autoplay ? b.autoplaying ? !1 : (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n()) : !1;
      }, b.stopAutoplay = function (e) {
        b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b));
      }, b.pauseAutoplay = function (e) {
        b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function () {
          b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay());
        }));
      }, b.minTranslate = function () {
        return -b.snapGrid[0];
      }, b.maxTranslate = function () {
        return -b.snapGrid[b.snapGrid.length - 1];
      }, b.updateAutoHeight = function () {
        var e = b.slides.eq(b.activeIndex)[0];if ("undefined" != typeof e) {
          var a = e.offsetHeight;a && b.wrapper.css("height", a + "px");
        }
      }, b.updateContainerSize = function () {
        var e, a;e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height);
      }, b.updateSlidesSize = function () {
        b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];var e,
            a = b.params.spaceBetween,
            t = -b.params.slidesOffsetBefore,
            r = 0,
            i = 0;if ("undefined" != typeof b.size) {
          "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.rtl ? b.slides.css({ marginLeft: "", marginTop: "" }) : b.slides.css({ marginRight: "", marginBottom: "" });var n;b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));var o,
              l = b.params.slidesPerColumn,
              p = n / l,
              d = p - (b.params.slidesPerColumn * p - b.slides.length);for (e = 0; e < b.slides.length; e++) {
            o = 0;var u = b.slides.eq(e);if (b.params.slidesPerColumn > 1) {
              var c, m, h;"column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({ "-webkit-box-ordinal-group": c, "-moz-box-ordinal-group": c, "-ms-flex-order": c, "-webkit-order": c, order: c })) : (h = Math.floor(e / p), m = e - h * p), u.css({ "margin-top": 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px" }).attr("data-swiper-column", m).attr("data-swiper-row", h);
            }"none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = s(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = s(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + r / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, r = o, i++);
          }b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;var f;if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }), (!b.support.flexbox || b.params.setWrapperSize) && (b.isHorizontal() ? b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }) : b.wrapper.css({ height: b.virtualSize + b.params.spaceBetween + "px" })), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({ width: b.virtualSize + b.params.spaceBetween + "px" }), b.params.centeredSlides)) {
            for (f = [], e = 0; e < b.snapGrid.length; e++) {
              b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && f.push(b.snapGrid[e]);
            }b.snapGrid = f;
          }if (!b.params.centeredSlides) {
            for (f = [], e = 0; e < b.snapGrid.length; e++) {
              b.snapGrid[e] <= b.virtualSize - b.size && f.push(b.snapGrid[e]);
            }b.snapGrid = f, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size);
          }0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({ marginLeft: a + "px" }) : b.slides.css({ marginRight: a + "px" }) : b.slides.css({ marginBottom: a + "px" })), b.params.watchSlidesProgress && b.updateSlidesOffset();
        }
      }, b.updateSlidesOffset = function () {
        for (var e = 0; e < b.slides.length; e++) {
          b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop;
        }
      }, b.updateSlidesProgress = function (e) {
        if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
          "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();var a = -e;b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);for (var t = 0; t < b.slides.length; t++) {
            var r = b.slides[t],
                i = (a - r.swiperSlideOffset) / (r.swiperSlideSize + b.params.spaceBetween);if (b.params.watchSlidesVisibility) {
              var s = -(a - r.swiperSlideOffset),
                  n = s + b.slidesSizesGrid[t],
                  o = s >= 0 && s < b.size || n > 0 && n <= b.size || 0 >= s && n >= b.size;o && b.slides.eq(t).addClass(b.params.slideVisibleClass);
            }r.progress = b.rtl ? -i : i;
          }
        }
      }, b.updateProgress = function (e) {
        "undefined" == typeof e && (e = b.translate || 0);var a = b.maxTranslate() - b.minTranslate(),
            t = b.isBeginning,
            r = b.isEnd;0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !r && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress);
      }, b.updateActiveIndex = function () {
        var e,
            a,
            t,
            r = b.rtl ? b.translate : -b.translate;for (a = 0; a < b.slidesGrid.length; a++) {
          "undefined" != typeof b.slidesGrid[a + 1] ? r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] && (e = a + 1) : r >= b.slidesGrid[a] && (e = a);
        }(0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses());
      }, b.updateClasses = function () {
        b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass);var e = b.slides.eq(b.activeIndex);e.addClass(b.params.slideActiveClass);var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);b.params.loop && 0 === t.length && b.slides.eq(0).addClass(b.params.slideNextClass);var r = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);if (b.params.loop && 0 === r.length && b.slides.eq(-1).addClass(b.params.slidePrevClass), b.paginationContainer && b.paginationContainer.length > 0) {
          var i,
              s = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;if (b.params.loop ? (i = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), i > b.slides.length - 1 - 2 * b.loopedSlides && (i -= b.slides.length - 2 * b.loopedSlides), i > s - 1 && (i -= s), 0 > i && "bullets" !== b.params.paginationType && (i = s + i)) : i = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function () {
            a(this).index() === i && a(this).addClass(b.params.bulletActiveClass);
          }) : b.bullets.eq(i).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(i + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(s)), "progress" === b.params.paginationType) {
            var n = (i + 1) / s,
                o = n,
                l = 1;b.isHorizontal() || (l = n, o = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(b.params.speed);
          }"custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, i + 1, s)), b.emit("onPaginationRendered", b, b.paginationContainer[0]));
        }b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))));
      }, b.updatePagination = function () {
        if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
          var e = "";if ("bullets" === b.params.paginationType) {
            for (var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, t = 0; a > t; t++) {
              e += b.params.paginationBulletRender ? b.params.paginationBulletRender(t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
            }b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination();
          }"fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0]);
        }
      }, b.update = function (e) {
        function a() {
          r = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(r), b.updateActiveIndex(), b.updateClasses();
        }if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
          var t, r;b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a());
        } else b.params.autoHeight && b.updateAutoHeight();
      }, b.onResize = function (e) {
        b.params.breakpoints && b.setBreakpoint();var a = b.params.allowSwipeToPrev,
            t = b.params.allowSwipeToNext;b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);var r = !1;if (b.params.freeMode) {
          var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight();
        } else b.updateClasses(), r = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);b.params.lazyLoading && !r && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t;
      };var T = ["mousedown", "mousemove", "mouseup"];window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.touchEvents = { start: b.support.touch || !b.params.simulateTouch ? "touchstart" : T[0], move: b.support.touch || !b.params.simulateTouch ? "touchmove" : T[1], end: b.support.touch || !b.params.simulateTouch ? "touchend" : T[2] }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function (e) {
        var a = e ? "off" : "on",
            t = e ? "removeEventListener" : "addEventListener",
            r = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
            s = b.support.touch ? r : document,
            n = b.params.nested ? !0 : !1;b.browser.ie ? (r[t](b.touchEvents.start, b.onTouchStart, !1), s[t](b.touchEvents.move, b.onTouchMove, n), s[t](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (r[t](b.touchEvents.start, b.onTouchStart, !1), r[t](b.touchEvents.move, b.onTouchMove, n), r[t](b.touchEvents.end, b.onTouchEnd, !1)), !i.simulateTouch || b.device.ios || b.device.android || (r[t]("mousedown", b.onTouchStart, !1), document[t]("mousemove", b.onTouchMove, n), document[t]("mouseup", b.onTouchEnd, !1))), window[t]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[a]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[a]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[a]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[a]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[a]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[a]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && r[t]("click", b.preventClicks, !0);
      }, b.attachEvents = function () {
        b.initEvents();
      }, b.detachEvents = function () {
        b.initEvents(!0);
      }, b.allowClick = !0, b.preventClicks = function (e) {
        b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
      }, b.onClickNext = function (e) {
        e.preventDefault(), (!b.isEnd || b.params.loop) && b.slideNext();
      }, b.onClickPrev = function (e) {
        e.preventDefault(), (!b.isBeginning || b.params.loop) && b.slidePrev();
      }, b.onClickIndex = function (e) {
        e.preventDefault();var t = a(this).index() * b.params.slidesPerGroup;b.params.loop && (t += b.loopedSlides), b.slideTo(t);
      }, b.updateClickedSlide = function (e) {
        var t = o(e, "." + b.params.slideClass),
            r = !1;if (t) for (var i = 0; i < b.slides.length; i++) {
          b.slides[i] === t && (r = !0);
        }if (!t || !r) return b.clickedSlide = void 0, void (b.clickedIndex = void 0);if (b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
          var s,
              n = b.clickedIndex;if (b.params.loop) {
            if (b.animating) return;s = a(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? n < b.loopedSlides - b.params.slidesPerView / 2 || n > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
              b.slideTo(n);
            }, 0)) : b.slideTo(n) : n > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
              b.slideTo(n);
            }, 0)) : b.slideTo(n);
          } else b.slideTo(n);
        }
      };var S,
          C,
          z,
          M,
          E,
          P,
          k,
          I,
          L,
          B,
          D = "input, select, textarea, button",
          H = Date.now(),
          A = [];b.animating = !1, b.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };var G, O;if (b.onTouchStart = function (e) {
        if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
          if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass)) return void (b.allowClick = !0);if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                r = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
              if (S = !0, C = !1, z = !0, E = void 0, O = void 0, b.touches.startX = t, b.touches.startY = r, M = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (I = !1), "touchstart" !== e.type) {
                var i = !0;a(e.target).is(D) && (i = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), i && e.preventDefault();
              }b.emit("onTouchStart", b, e);
            }
          }
        }
      }, b.onTouchMove = function (e) {
        if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
          if (e.preventedByNestedSwiper) return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void (b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);if (b.params.onlyExternal) return b.allowClick = !1, void (S && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, M = Date.now()));if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D)) return C = !0, void (b.allowClick = !1);if (z && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof E) {
              var t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;E = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle;
            }if (E && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof O && b.browser.ieTouch && (b.touches.currentX !== b.touches.startX || b.touches.currentY !== b.touches.startY) && (O = !0), S) {
              if (E) return void (S = !1);if (O || !b.browser.ieTouch) {
                b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), C || (i.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing", b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing")), C = !0;var r = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;r *= b.params.touchRatio, b.rtl && (r = -r), b.swipeDirection = r > 0 ? "prev" : "next", P = r + k;var s = !0;if (r > 0 && P > b.minTranslate() ? (s = !1, b.params.resistance && (P = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + r, b.params.resistanceRatio))) : 0 > r && P < b.maxTranslate() && (s = !1, b.params.resistance && (P = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - r, b.params.resistanceRatio))), s && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && k > P && (P = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && P > k && (P = k), b.params.followFinger) {
                  if (b.params.threshold > 0) {
                    if (!(Math.abs(r) > b.params.threshold || I)) return void (P = k);if (!I) return I = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, P = k, void (b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY);
                  }(b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === A.length && A.push({ position: b.touches[b.isHorizontal() ? "startX" : "startY"], time: M }), A.push({ position: b.touches[b.isHorizontal() ? "currentX" : "currentY"], time: new window.Date().getTime() })), b.updateProgress(P), b.setWrapperTranslate(P);
                }
              }
            }
          }
        }
      }, b.onTouchEnd = function (e) {
        if (e.originalEvent && (e = e.originalEvent), z && b.emit("onTouchEnd", b, e), z = !1, S) {
          b.params.grabCursor && C && S && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");var t = Date.now(),
              r = t - M;if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), 300 > r && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function () {
            b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e));
          }, 300)), 300 > r && 300 > t - H && (L && clearTimeout(L), b.emit("onDoubleTap", b, e))), H = Date.now(), setTimeout(function () {
            b && (b.allowClick = !0);
          }, 0), !S || !C || !b.swipeDirection || 0 === b.touches.diff || P === k) return void (S = C = !1);S = C = !1;var i;if (i = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -P, b.params.freeMode) {
            if (i < -b.minTranslate()) return void b.slideTo(b.activeIndex);if (i > -b.maxTranslate()) return void (b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));if (b.params.freeModeMomentum) {
              if (A.length > 1) {
                var s = A.pop(),
                    n = A.pop(),
                    o = s.position - n.position,
                    l = s.time - n.time;b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || new window.Date().getTime() - s.time > 300) && (b.velocity = 0);
              } else b.velocity = 0;A.length = 0;var p = 1e3 * b.params.freeModeMomentumRatio,
                  d = b.velocity * p,
                  u = b.translate + d;b.rtl && (u = -u);var c,
                  m = !1,
                  h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate();else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate();else if (b.params.freeModeSticky) {
                var f,
                    g = 0;for (g = 0; g < b.snapGrid.length; g += 1) {
                  if (b.snapGrid[g] > -u) {
                    f = g;break;
                  }
                }u = Math.abs(b.snapGrid[f] - u) < Math.abs(b.snapGrid[f - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (u = -u);
              }if (0 !== b.velocity) p = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity);else if (b.params.freeModeSticky) return void b.slideReset();b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
                b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function () {
                  b && b.onTransitionEnd();
                }));
              })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                b && b.onTransitionEnd();
              }))) : b.updateProgress(u), b.updateActiveIndex();
            }return void ((!b.params.freeModeMomentum || r >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()));
          }var v,
              w = 0,
              y = b.slidesSizesGrid[0];for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) {
            "undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? i >= b.slidesGrid[v] && i < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : i >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
          }var x = (i - b.slidesGrid[w]) / y;if (r > b.params.longSwipesMs) {
            if (!b.params.longSwipes) return void b.slideTo(b.activeIndex);"next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w));
          } else {
            if (!b.params.shortSwipes) return void b.slideTo(b.activeIndex);"next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w);
          }
        }
      }, b._slideTo = function (e, a) {
        return b.slideTo(e, a, !0, !0);
      }, b.slideTo = function (e, a, t, r) {
        "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);var i = -b.snapGrid[b.snapIndex];b.params.autoplay && b.autoplaying && (r || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(i);for (var s = 0; s < b.slidesGrid.length; s++) {
          -Math.floor(100 * i) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
        }return !b.params.allowSwipeToNext && i < b.translate && i < b.minTranslate() ? !1 : !b.params.allowSwipeToPrev && i > b.translate && i > b.maxTranslate() && (b.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.rtl && -i === b.translate || !b.rtl && i === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(i), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a ? (b.setWrapperTranslate(i), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(i), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
          b && b.onTransitionEnd(t);
        }))), !0));
      }, b.onTransitionStart = function (e) {
        "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)));
      }, b.onTransitionEnd = function (e) {
        b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.hashnav && b.hashnav && b.hashnav.setHash();
      }, b.slideNext = function (e, a, t) {
        if (b.params.loop) {
          if (b.animating) return !1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t);
        }return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t);
      }, b._slideNext = function (e) {
        return b.slideNext(!0, e, !0);
      }, b.slidePrev = function (e, a, t) {
        if (b.params.loop) {
          if (b.animating) return !1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex - 1, a, e, t);
        }return b.slideTo(b.activeIndex - 1, a, e, t);
      }, b._slidePrev = function (e) {
        return b.slidePrev(!0, e, !0);
      }, b.slideReset = function (e, a, t) {
        return b.slideTo(b.activeIndex, a, e);
      }, b.setWrapperTransition = function (e, a) {
        b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e);
      }, b.setWrapperTranslate = function (e, a, t) {
        var r = 0,
            i = 0,
            n = 0;b.isHorizontal() ? r = b.rtl ? -e : e : i = e, b.params.roundLengths && (r = s(r), i = s(i)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + r + "px, " + i + "px, " + n + "px)") : b.wrapper.transform("translate(" + r + "px, " + i + "px)")), b.translate = b.isHorizontal() ? r : i;var o,
            l = b.maxTranslate() - b.minTranslate();o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate);
      }, b.getTranslate = function (e, a) {
        var t, r, i, s;return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = i.transform || i.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
          return e.replace(",", ".");
        }).join(", ")), s = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (s = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = s.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? s.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (r = window.WebKitCSSMatrix ? s.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), b.rtl && r && (r = -r), r || 0);
      }, b.getWrapperTranslate = function (e) {
        return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e);
      }, b.observers = [], b.initObservers = function () {
        if (b.params.observeParents) for (var e = b.container.parents(), a = 0; a < e.length; a++) {
          l(e[a]);
        }l(b.container[0], { childList: !1 }), l(b.wrapper[0], { attributes: !1 });
      }, b.disconnectObservers = function () {
        for (var e = 0; e < b.observers.length; e++) {
          b.observers[e].disconnect();
        }b.observers = [];
      }, b.createLoop = function () {
        b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();var e = b.wrapper.children("." + b.params.slideClass);"auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);var t,
            r = [],
            i = [];for (e.each(function (t, s) {
          var n = a(this);t < b.loopedSlides && i.push(s), t < e.length && t >= e.length - b.loopedSlides && r.push(s), n.attr("data-swiper-slide-index", t);
        }), t = 0; t < i.length; t++) {
          b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
        }for (t = r.length - 1; t >= 0; t--) {
          b.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
        }
      }, b.destroyLoop = function () {
        b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index");
      }, b.reLoop = function (e) {
        var a = b.activeIndex - b.loopedSlides;b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(a + b.loopedSlides, 0, !1);
      }, b.fixLoop = function () {
        var e;b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0));
      }, b.appendSlide = function (e) {
        if (b.params.loop && b.destroyLoop(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) for (var a = 0; a < e.length; a++) {
          e[a] && b.wrapper.append(e[a]);
        } else b.wrapper.append(e);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0);
      }, b.prependSlide = function (e) {
        b.params.loop && b.destroyLoop();var a = b.activeIndex + 1;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
          for (var t = 0; t < e.length; t++) {
            e[t] && b.wrapper.prepend(e[t]);
          }a = b.activeIndex + e.length;
        } else b.wrapper.prepend(e);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1);
      }, b.removeSlide = function (e) {
        b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));var a,
            t = b.activeIndex;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
          for (var r = 0; r < e.length; r++) {
            a = e[r], b.slides[a] && b.slides.eq(a).remove(), t > a && t--;
          }t = Math.max(t, 0);
        } else a = e, b.slides[a] && b.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1);
      }, b.removeAllSlides = function () {
        for (var e = [], a = 0; a < b.slides.length; a++) {
          e.push(a);
        }b.removeSlide(e);
      }, b.effects = { fade: { setTranslate: function setTranslate() {
            for (var e = 0; e < b.slides.length; e++) {
              var a = b.slides.eq(e),
                  t = a[0].swiperSlideOffset,
                  r = -t;b.params.virtualTranslate || (r -= b.translate);var i = 0;b.isHorizontal() || (i = r, r = 0);var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);a.css({ opacity: s }).transform("translate3d(" + r + "px, " + i + "px, 0px)");
            }
          }, setTransition: function setTransition(e) {
            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
              var a = !1;b.slides.transitionEnd(function () {
                if (!a && b) {
                  a = !0, b.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) {
                    b.wrapper.trigger(e[t]);
                  }
                }
              });
            }
          } }, flip: { setTranslate: function setTranslate() {
            for (var e = 0; e < b.slides.length; e++) {
              var t = b.slides.eq(e),
                  r = t[0].progress;b.params.flip.limitRotation && (r = Math.max(Math.min(t[0].progress, 1), -1));var i = t[0].swiperSlideOffset,
                  s = -180 * r,
                  n = s,
                  o = 0,
                  l = -i,
                  p = 0;if (b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(r)) + b.slides.length, b.params.flip.slideShadows) {
                var d = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                    u = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0));
              }t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
            }
          }, setTransition: function setTransition(e) {
            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
              var t = !1;b.slides.eq(b.activeIndex).transitionEnd(function () {
                if (!t && b && a(this).hasClass(b.params.slideActiveClass)) {
                  t = !0, b.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], r = 0; r < e.length; r++) {
                    b.wrapper.trigger(e[r]);
                  }
                }
              });
            }
          } }, cube: { setTranslate: function setTranslate() {
            var e,
                t = 0;b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({ height: b.width + "px" })) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));for (var r = 0; r < b.slides.length; r++) {
              var i = b.slides.eq(r),
                  s = 90 * r,
                  n = Math.floor(s / 360);b.rtl && (s = -s, n = Math.floor(-s / 360));var o = Math.max(Math.min(i[0].progress, 1), -1),
                  l = 0,
                  p = 0,
                  d = 0;r % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (r - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (r - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (r - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);var u = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";if (1 >= o && o > -1 && (t = 90 * r + 90 * o, b.rtl && (t = 90 * -r - 90 * o)), i.transform(u), b.params.cube.slideShadows) {
                var c = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                    m = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0));
              }
            }if (b.wrapper.css({ "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px", "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px", "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px", "transform-origin": "50% 50% -" + b.size / 2 + "px" }), b.params.cube.shadow) if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");else {
              var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                  f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                  g = b.params.cube.shadowScale,
                  v = b.params.cube.shadowScale / f,
                  w = b.params.cube.shadowOffset;e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)");
            }var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)");
          }, setTransition: function setTransition(e) {
            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e);
          } }, coverflow: { setTranslate: function setTranslate() {
            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, r = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, i = b.params.coverflow.depth, s = 0, n = b.slides.length; n > s; s++) {
              var o = b.slides.eq(s),
                  l = b.slidesSizesGrid[s],
                  p = o[0].swiperSlideOffset,
                  d = (t - p - l / 2) / l * b.params.coverflow.modifier,
                  u = b.isHorizontal() ? r * d : 0,
                  c = b.isHorizontal() ? 0 : r * d,
                  m = -i * Math.abs(d),
                  h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
                  f = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);var g = "translate3d(" + f + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
                var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                    w = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0);
              }
            }if (b.browser.ie) {
              var y = b.wrapper[0].style;y.perspectiveOrigin = t + "px 50%";
            }
          }, setTransition: function setTransition(e) {
            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
          } } }, b.lazy = { initialImageLoaded: !1, loadImageInSlide: function loadImageInSlide(e, t) {
          if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
            var r = b.slides.eq(e),
                i = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || (i = i.add(r[0])), 0 !== i.length && i.each(function () {
              var e = a(this);e.addClass("swiper-lazy-loading");var i = e.attr("data-background"),
                  s = e.attr("data-src"),
                  n = e.attr("data-srcset");b.loadImage(e[0], s || i, n, !1, function () {
                if (i ? (e.css("background-image", 'url("' + i + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), b.params.loop && t) {
                  var a = r.attr("data-swiper-slide-index");if (r.hasClass(b.params.slideDuplicateClass)) {
                    var o = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");b.lazy.loadImageInSlide(o.index(), !1);
                  } else {
                    var l = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');b.lazy.loadImageInSlide(l.index(), !1);
                  }
                }b.emit("onLazyImageReady", b, r[0], e[0]);
              }), b.emit("onLazyImageLoad", b, r[0], e[0]);
            });
          }
        }, load: function load() {
          var e;if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
            b.lazy.loadImageInSlide(a(this).index());
          });else if (b.params.slidesPerView > 1) for (e = b.activeIndex; e < b.activeIndex + b.params.slidesPerView; e++) {
            b.slides[e] && b.lazy.loadImageInSlide(e);
          } else b.lazy.loadImageInSlide(b.activeIndex);if (b.params.lazyLoadingInPrevNext) if (b.params.slidesPerView > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
            var t = b.params.lazyLoadingInPrevNextAmount,
                r = b.params.slidesPerView,
                i = Math.min(b.activeIndex + r + Math.max(t, r), b.slides.length),
                s = Math.max(b.activeIndex - Math.max(r, t), 0);for (e = b.activeIndex + b.params.slidesPerView; i > e; e++) {
              b.slides[e] && b.lazy.loadImageInSlide(e);
            }for (e = s; e < b.activeIndex; e++) {
              b.slides[e] && b.lazy.loadImageInSlide(e);
            }
          } else {
            var n = b.wrapper.children("." + b.params.slideNextClass);n.length > 0 && b.lazy.loadImageInSlide(n.index());var o = b.wrapper.children("." + b.params.slidePrevClass);o.length > 0 && b.lazy.loadImageInSlide(o.index());
          }
        }, onTransitionStart: function onTransitionStart() {
          b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load();
        }, onTransitionEnd: function onTransitionEnd() {
          b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load();
        } }, b.scrollbar = { isTouched: !1, setDragPosition: function setDragPosition(e) {
          var a = b.scrollbar,
              t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
              r = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
              i = -b.minTranslate() * a.moveDivider,
              s = -b.maxTranslate() * a.moveDivider;i > r ? r = i : r > s && (r = s), r = -r / a.moveDivider, b.updateProgress(r), b.setWrapperTranslate(r, !0);
        }, dragStart: function dragStart(e) {
          var a = b.scrollbar;a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b);
        }, dragMove: function dragMove(e) {
          var a = b.scrollbar;a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b));
        }, dragEnd: function dragEnd(e) {
          var a = b.scrollbar;a.isTouched && (a.isTouched = !1, b.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
            a.track.css("opacity", 0), a.track.transition(400);
          }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset());
        }, enableDraggable: function enableDraggable() {
          var e = b.scrollbar,
              t = b.support.touch ? e.track : document;a(e.track).on(b.touchEvents.start, e.dragStart), a(t).on(b.touchEvents.move, e.dragMove), a(t).on(b.touchEvents.end, e.dragEnd);
        }, disableDraggable: function disableDraggable() {
          var e = b.scrollbar,
              t = b.support.touch ? e.track : document;a(e.track).off(b.touchEvents.start, e.dragStart), a(t).off(b.touchEvents.move, e.dragMove), a(t).off(b.touchEvents.end, e.dragEnd);
        }, set: function set() {
          if (b.params.scrollbar) {
            var e = b.scrollbar;e.track = a(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0);
          }
        }, setTranslate: function setTranslate() {
          if (b.params.scrollbar) {
            var e,
                a = b.scrollbar,
                t = (b.translate || 0, a.dragSize);e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
              a.track[0].style.opacity = 0, a.track.transition(400);
            }, 1e3));
          }
        }, setTransition: function setTransition(e) {
          b.params.scrollbar && b.scrollbar.drag.transition(e);
        } }, b.controller = { LinearSpline: function LinearSpline(e, a) {
          this.x = e, this.y = a, this.lastIndex = e.length - 1;var t, r;this.x.length;this.interpolate = function (e) {
            return e ? (r = i(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0;
          };var i = function () {
            var e, a, t;return function (r, i) {
              for (a = -1, e = r.length; e - a > 1;) {
                r[t = e + a >> 1] <= i ? a = t : e = t;
              }return e;
            };
          }();
        }, getInterpolateFunction: function getInterpolateFunction(e) {
          b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid));
        }, setTranslate: function setTranslate(e, a) {
          function r(a) {
            e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * i + a.minTranslate()), b.params.controlInverse && (s = a.maxTranslate() - s), a.updateProgress(s), a.setWrapperTranslate(s, !1, b), a.updateActiveIndex();
          }var i,
              s,
              n = b.params.control;if (b.isArray(n)) for (var o = 0; o < n.length; o++) {
            n[o] !== a && n[o] instanceof t && r(n[o]);
          } else n instanceof t && a !== n && r(n);
        }, setTransition: function setTransition(e, a) {
          function r(a) {
            a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
              s && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd());
            }));
          }var i,
              s = b.params.control;if (b.isArray(s)) for (i = 0; i < s.length; i++) {
            s[i] !== a && s[i] instanceof t && r(s[i]);
          } else s instanceof t && a !== s && r(s);
        } }, b.hashnav = { init: function init() {
          if (b.params.hashnav) {
            b.hashnav.initialized = !0;var e = document.location.hash.replace("#", "");if (e) for (var a = 0, t = 0, r = b.slides.length; r > t; t++) {
              var i = b.slides.eq(t),
                  s = i.attr("data-hash");if (s === e && !i.hasClass(b.params.slideDuplicateClass)) {
                var n = i.index();b.slideTo(n, a, b.params.runCallbacksOnInit, !0);
              }
            }
          }
        }, setHash: function setHash() {
          b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "");
        } }, b.disableKeyboardControl = function () {
        b.params.keyboardControl = !1, a(document).off("keydown", p);
      }, b.enableKeyboardControl = function () {
        b.params.keyboardControl = !0, a(document).on("keydown", p);
      }, b.mousewheel = { event: !1, lastScrollTime: new window.Date().getTime() }, b.params.mousewheelControl) {
        try {
          new window.WheelEvent("wheel"), b.mousewheel.event = "wheel";
        } catch (N) {
          (window.WheelEvent || b.container[0] && "wheel" in b.container[0]) && (b.mousewheel.event = "wheel");
        }!b.mousewheel.event && window.WheelEvent, b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel"), b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll");
      }b.disableMousewheelControl = function () {
        return b.mousewheel.event ? (b.container.off(b.mousewheel.event, d), !0) : !1;
      }, b.enableMousewheelControl = function () {
        return b.mousewheel.event ? (b.container.on(b.mousewheel.event, d), !0) : !1;
      }, b.parallax = { setTranslate: function setTranslate() {
          b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
            u(this, b.progress);
          }), b.slides.each(function () {
            var e = a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
              var a = Math.min(Math.max(e[0].progress, -1), 1);u(this, a);
            });
          });
        }, setTransition: function setTransition(e) {
          "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
            var t = a(this),
                r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;0 === e && (r = 0), t.transition(r);
          });
        } }, b._plugins = [];for (var R in b.plugins) {
        var W = b.plugins[R](b, b.params[R]);W && b._plugins.push(W);
      }return b.callPlugins = function (e) {
        for (var a = 0; a < b._plugins.length; a++) {
          e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
      }, b.emitterEventListeners = {}, b.emit = function (e) {
        b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);var a;if (b.emitterEventListeners[e]) for (a = 0; a < b.emitterEventListeners[e].length; a++) {
          b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      }, b.on = function (e, a) {
        return e = c(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b;
      }, b.off = function (e, a) {
        var t;if (e = c(e), "undefined" == typeof a) return b.emitterEventListeners[e] = [], b;if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
          for (t = 0; t < b.emitterEventListeners[e].length; t++) {
            b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
          }return b;
        }
      }, b.once = function (e, a) {
        e = c(e);var t = function t() {
          a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t);
        };return b.on(e, t), b;
      }, b.a11y = { makeFocusable: function makeFocusable(e) {
          return e.attr("tabIndex", "0"), e;
        }, addRole: function addRole(e, a) {
          return e.attr("role", a), e;
        }, addLabel: function addLabel(e, a) {
          return e.attr("aria-label", a), e;
        }, disable: function disable(e) {
          return e.attr("aria-disabled", !0), e;
        }, enable: function enable(e) {
          return e.attr("aria-disabled", !1), e;
        }, onEnterKey: function onEnterKey(e) {
          13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click());
        }, liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'), notify: function notify(e) {
          var a = b.a11y.liveRegion;0 !== a.length && (a.html(""), a.html(e));
        }, init: function init() {
          b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), a(b.container).append(b.a11y.liveRegion);
        }, initPagination: function initPagination() {
          b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
            var e = a(this);b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1));
          });
        }, destroy: function destroy() {
          b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove();
        } }, b.init = function () {
        b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b);
      }, b.cleanupStyles = function () {
        b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"));
      }, b.destroy = function (e, a) {
        b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.emit("onDestroy"), e !== !1 && (b = null);
      }, b.init(), b;
    }
  };t.prototype = { isSafari: function () {
      var e = navigator.userAgent.toLowerCase();return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
    }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent), isArray: function isArray(e) {
      return "[object Array]" === Object.prototype.toString.apply(e);
    }, browser: { ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled, ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1 }, device: function () {
      var e = navigator.userAgent,
          a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
          t = e.match(/(iPad).*OS\s([\d_]+)/),
          r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
          i = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);return { ios: t || i || r, android: a };
    }(), support: { touch: window.Modernizr && Modernizr.touch === !0 || function () {
        return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
      }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
        var e = document.createElement("div").style;return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
      }(), flexbox: function () {
        for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) {
          if (a[t] in e) return !0;
        }
      }(), observer: function () {
        return "MutationObserver" in window || "WebkitMutationObserver" in window;
      }() }, plugins: {} };for (var r = function () {
    var e = function e(_e) {
      var a = this,
          t = 0;for (t = 0; t < _e.length; t++) {
        a[t] = _e[t];
      }return a.length = _e.length, this;
    },
        a = function a(_a, t) {
      var r = [],
          i = 0;if (_a && !t && _a instanceof e) return _a;if (_a) if ("string" == typeof _a) {
        var s,
            n,
            o = _a.trim();if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
          var l = "div";for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = _a, i = 0; i < n.childNodes.length; i++) {
            r.push(n.childNodes[i]);
          }
        } else for (s = t || "#" !== _a[0] || _a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(_a) : [document.getElementById(_a.split("#")[1])], i = 0; i < s.length; i++) {
          s[i] && r.push(s[i]);
        }
      } else if (_a.nodeType || _a === window || _a === document) r.push(_a);else if (_a.length > 0 && _a[0].nodeType) for (i = 0; i < _a.length; i++) {
        r.push(_a[i]);
      }return new e(r);
    };return e.prototype = { addClass: function addClass(e) {
        if ("undefined" == typeof e) return this;for (var a = e.split(" "), t = 0; t < a.length; t++) {
          for (var r = 0; r < this.length; r++) {
            this[r].classList.add(a[t]);
          }
        }return this;
      }, removeClass: function removeClass(e) {
        for (var a = e.split(" "), t = 0; t < a.length; t++) {
          for (var r = 0; r < this.length; r++) {
            this[r].classList.remove(a[t]);
          }
        }return this;
      }, hasClass: function hasClass(e) {
        return this[0] ? this[0].classList.contains(e) : !1;
      }, toggleClass: function toggleClass(e) {
        for (var a = e.split(" "), t = 0; t < a.length; t++) {
          for (var r = 0; r < this.length; r++) {
            this[r].classList.toggle(a[t]);
          }
        }return this;
      }, attr: function attr(e, a) {
        if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;for (var t = 0; t < this.length; t++) {
          if (2 === arguments.length) this[t].setAttribute(e, a);else for (var r in e) {
            this[t][r] = e[r], this[t].setAttribute(r, e[r]);
          }
        }return this;
      }, removeAttr: function removeAttr(e) {
        for (var a = 0; a < this.length; a++) {
          this[a].removeAttribute(e);
        }return this;
      }, data: function data(e, a) {
        if ("undefined" != typeof a) {
          for (var t = 0; t < this.length; t++) {
            var r = this[t];r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a;
          }return this;
        }if (this[0]) {
          var i = this[0].getAttribute("data-" + e);return i ? i : this[0].dom7ElementDataStorage && (e in this[0].dom7ElementDataStorage) ? this[0].dom7ElementDataStorage[e] : void 0;
        }
      }, transform: function transform(e) {
        for (var a = 0; a < this.length; a++) {
          var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
        }return this;
      }, transition: function transition(e) {
        "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
          var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
        }return this;
      }, on: function on(e, t, r, i) {
        function s(e) {
          var i = e.target;if (a(i).is(t)) r.call(i, e);else for (var s = a(i).parents(), n = 0; n < s.length; n++) {
            a(s[n]).is(t) && r.call(s[n], e);
          }
        }var n,
            o,
            l = e.split(" ");for (n = 0; n < this.length; n++) {
          if ("function" == typeof t || t === !1) for ("function" == typeof t && (r = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++) {
            this[n].addEventListener(l[o], r, i);
          } else for (o = 0; o < l.length; o++) {
            this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({ listener: r, liveListener: s }), this[n].addEventListener(l[o], s, i);
          }
        }return this;
      }, off: function off(e, a, t, r) {
        for (var i = e.split(" "), s = 0; s < i.length; s++) {
          for (var n = 0; n < this.length; n++) {
            if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], r = arguments[2] || !1), this[n].removeEventListener(i[s], t, r);else if (this[n].dom7LiveListeners) for (var o = 0; o < this[n].dom7LiveListeners.length; o++) {
              this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[s], this[n].dom7LiveListeners[o].liveListener, r);
            }
          }
        }return this;
      }, once: function once(e, a, t, r) {
        function i(n) {
          t(n), s.off(e, a, i, r);
        }var s = this;"function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), s.on(e, a, i, r);
      }, trigger: function trigger(e, a) {
        for (var t = 0; t < this.length; t++) {
          var r;try {
            r = new window.CustomEvent(e, { detail: a, bubbles: !0, cancelable: !0 });
          } catch (i) {
            r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a;
          }this[t].dispatchEvent(r);
        }return this;
      }, transitionEnd: function transitionEnd(e) {
        function a(s) {
          if (s.target === this) for (e.call(this, s), t = 0; t < r.length; t++) {
            i.off(r[t], a);
          }
        }var t,
            r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            i = this;if (e) for (t = 0; t < r.length; t++) {
          i.on(r[t], a);
        }return this;
      }, width: function width() {
        return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null;
      }, outerWidth: function outerWidth(e) {
        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
      }, height: function height() {
        return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null;
      }, outerHeight: function outerHeight(e) {
        return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null;
      }, offset: function offset() {
        if (this.length > 0) {
          var e = this[0],
              a = e.getBoundingClientRect(),
              t = document.body,
              r = e.clientTop || t.clientTop || 0,
              i = e.clientLeft || t.clientLeft || 0,
              s = window.pageYOffset || e.scrollTop,
              n = window.pageXOffset || e.scrollLeft;return { top: a.top + s - r, left: a.left + n - i };
        }return null;
      }, css: function css(e, a) {
        var t;if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (t = 0; t < this.length; t++) {
              for (var r in e) {
                this[t].style[r] = e[r];
              }
            }return this;
          }if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e);
        }if (2 === arguments.length && "string" == typeof e) {
          for (t = 0; t < this.length; t++) {
            this[t].style[e] = a;
          }return this;
        }return this;
      }, each: function each(e) {
        for (var a = 0; a < this.length; a++) {
          e.call(this[a], a, this[a]);
        }return this;
      }, html: function html(e) {
        if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;for (var a = 0; a < this.length; a++) {
          this[a].innerHTML = e;
        }return this;
      }, text: function text(e) {
        if ("undefined" == typeof e) return this[0] ? this[0].textContent.trim() : null;for (var a = 0; a < this.length; a++) {
          this[a].textContent = e;
        }return this;
      }, is: function is(t) {
        if (!this[0]) return !1;var r, i;if ("string" == typeof t) {
          var s = this[0];if (s === document) return t === document;if (s === window) return t === window;if (s.matches) return s.matches(t);if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);if (s.mozMatchesSelector) return s.mozMatchesSelector(t);if (s.msMatchesSelector) return s.msMatchesSelector(t);for (r = a(t), i = 0; i < r.length; i++) {
            if (r[i] === this[0]) return !0;
          }return !1;
        }if (t === document) return this[0] === document;if (t === window) return this[0] === window;if (t.nodeType || t instanceof e) {
          for (r = t.nodeType ? [t] : t, i = 0; i < r.length; i++) {
            if (r[i] === this[0]) return !0;
          }return !1;
        }return !1;
      }, index: function index() {
        if (this[0]) {
          for (var e = this[0], a = 0; null !== (e = e.previousSibling);) {
            1 === e.nodeType && a++;
          }return a;
        }
      }, eq: function eq(a) {
        if ("undefined" == typeof a) return this;var t,
            r = this.length;return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]]);
      }, append: function append(a) {
        var t, r;for (t = 0; t < this.length; t++) {
          if ("string" == typeof a) {
            var i = document.createElement("div");for (i.innerHTML = a; i.firstChild;) {
              this[t].appendChild(i.firstChild);
            }
          } else if (a instanceof e) for (r = 0; r < a.length; r++) {
            this[t].appendChild(a[r]);
          } else this[t].appendChild(a);
        }return this;
      }, prepend: function prepend(a) {
        var t, r;for (t = 0; t < this.length; t++) {
          if ("string" == typeof a) {
            var i = document.createElement("div");for (i.innerHTML = a, r = i.childNodes.length - 1; r >= 0; r--) {
              this[t].insertBefore(i.childNodes[r], this[t].childNodes[0]);
            }
          } else if (a instanceof e) for (r = 0; r < a.length; r++) {
            this[t].insertBefore(a[r], this[t].childNodes[0]);
          } else this[t].insertBefore(a, this[t].childNodes[0]);
        }return this;
      }, insertBefore: function insertBefore(e) {
        for (var t = a(e), r = 0; r < this.length; r++) {
          if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0]);else if (t.length > 1) for (var i = 0; i < t.length; i++) {
            t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i]);
          }
        }
      }, insertAfter: function insertAfter(e) {
        for (var t = a(e), r = 0; r < this.length; r++) {
          if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0].nextSibling);else if (t.length > 1) for (var i = 0; i < t.length; i++) {
            t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i].nextSibling);
          }
        }
      }, next: function next(t) {
        return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : []);
      }, nextAll: function nextAll(t) {
        var r = [],
            i = this[0];if (!i) return new e([]);for (; i.nextElementSibling;) {
          var s = i.nextElementSibling;t ? a(s).is(t) && r.push(s) : r.push(s), i = s;
        }return new e(r);
      }, prev: function prev(t) {
        return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : []);
      }, prevAll: function prevAll(t) {
        var r = [],
            i = this[0];if (!i) return new e([]);for (; i.previousElementSibling;) {
          var s = i.previousElementSibling;t ? a(s).is(t) && r.push(s) : r.push(s), i = s;
        }return new e(r);
      }, parent: function parent(e) {
        for (var t = [], r = 0; r < this.length; r++) {
          e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode);
        }return a(a.unique(t));
      }, parents: function parents(e) {
        for (var t = [], r = 0; r < this.length; r++) {
          for (var i = this[r].parentNode; i;) {
            e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
          }
        }return a(a.unique(t));
      }, find: function find(a) {
        for (var t = [], r = 0; r < this.length; r++) {
          for (var i = this[r].querySelectorAll(a), s = 0; s < i.length; s++) {
            t.push(i[s]);
          }
        }return new e(t);
      }, children: function children(t) {
        for (var r = [], i = 0; i < this.length; i++) {
          for (var s = this[i].childNodes, n = 0; n < s.length; n++) {
            t ? 1 === s[n].nodeType && a(s[n]).is(t) && r.push(s[n]) : 1 === s[n].nodeType && r.push(s[n]);
          }
        }return new e(a.unique(r));
      }, remove: function remove() {
        for (var e = 0; e < this.length; e++) {
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        }return this;
      }, add: function add() {
        var e,
            t,
            r = this;for (e = 0; e < arguments.length; e++) {
          var i = a(arguments[e]);for (t = 0; t < i.length; t++) {
            r[r.length] = i[t], r.length++;
          }
        }return r;
      } }, a.fn = e.prototype, a.unique = function (e) {
      for (var a = [], t = 0; t < e.length; t++) {
        -1 === a.indexOf(e[t]) && a.push(e[t]);
      }return a;
    }, a;
  }(), i = ["jQuery", "Zepto", "Dom7"], s = 0; s < i.length; s++) {
    window[i[s]] && e(window[i[s]]);
  }var n;n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function (e) {
    function a(s) {
      if (s.target === this) for (e.call(this, s), t = 0; t < r.length; t++) {
        i.off(r[t], a);
      }
    }var t,
        r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
        i = this;if (e) for (t = 0; t < r.length; t++) {
      i.on(r[t], a);
    }return this;
  }), "transform" in n.fn || (n.fn.transform = function (e) {
    for (var a = 0; a < this.length; a++) {
      var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
    }return this;
  }), "transition" in n.fn || (n.fn.transition = function (e) {
    "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
      var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
    }return this;
  })), window.Swiper = t;
}(),  true ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
  "use strict";
  return window.Swiper;
});
//# sourceMappingURL=maps/swiper.min.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function ($) {
  var touch = {},
      touchTimeout,
      tapTimeout,
      swipeTimeout,
      longTapTimeout,
      longTapDelay = 750,
      gesture;

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
  }

  function longTap() {
    longTapTimeout = null;
    if (touch.last) {
      touch.el.trigger('longTap');
      touch = {};
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout);
    longTapTimeout = null;
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout);
    if (tapTimeout) clearTimeout(tapTimeout);
    if (swipeTimeout) clearTimeout(swipeTimeout);
    if (longTapTimeout) clearTimeout(longTapTimeout);
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
    touch = {};
  }

  function isPrimaryTouch(event) {
    return (event.pointerType == 'touch' || event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary;
  }

  function isPointerEventType(e, type) {
    return e.type == 'pointer' + type || e.type.toLowerCase() == 'mspointer' + type;
  }

  $(document).ready(function () {
    var now,
        delta,
        deltaX = 0,
        deltaY = 0,
        firstTouch,
        _isPointerType;

    if ('MSGesture' in window) {
      gesture = new MSGesture();
      gesture.target = document.body;
    }

    $(document).bind('MSGestureEnd', function (e) {
      var swipeDirectionFromVelocity = e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
      if (swipeDirectionFromVelocity) {
        touch.el.trigger('swipe');
        touch.el.trigger('swipe' + swipeDirectionFromVelocity);
      }
    }).on('touchstart MSPointerDown pointerdown', function (e) {
      if ((_isPointerType = isPointerEventType(e, 'down')) && !isPrimaryTouch(e)) return;
      firstTouch = _isPointerType ? e : e.touches[0];
      if (e.touches && e.touches.length === 1 && touch.x2) {
        // Clear out touch movement data if we have it sticking around
        // This can occur if touchcancel doesn't fire due to preventDefault, etc.
        touch.x2 = undefined;
        touch.y2 = undefined;
      }
      now = Date.now();
      delta = now - (touch.last || now);
      touch.el = $('tagName' in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);
      touchTimeout && clearTimeout(touchTimeout);
      touch.x1 = firstTouch.pageX;
      touch.y1 = firstTouch.pageY;
      if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
      touch.last = now;
      longTapTimeout = setTimeout(longTap, longTapDelay);
      // adds the current touch contact for IE gesture recognition
      if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
    }).on('touchmove MSPointerMove pointermove', function (e) {
      if ((_isPointerType = isPointerEventType(e, 'move')) && !isPrimaryTouch(e)) return;
      firstTouch = _isPointerType ? e : e.touches[0];
      cancelLongTap();
      touch.x2 = firstTouch.pageX;
      touch.y2 = firstTouch.pageY;

      deltaX += Math.abs(touch.x1 - touch.x2);
      deltaY += Math.abs(touch.y1 - touch.y2);
    }).on('touchend MSPointerUp pointerup', function (e) {
      if ((_isPointerType = isPointerEventType(e, 'up')) && !isPrimaryTouch(e)) return;
      cancelLongTap();

      // swipe
      if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) swipeTimeout = setTimeout(function () {
        if (touch.el) {
          touch.el.trigger('swipe');
          touch.el.trigger('swipe' + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2));
        }
        touch = {};
      }, 0);

      // normal tap
      else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function () {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap');
              event.cancelTouch = cancelAll;
              // [by paper] fix -> "TypeError: 'undefined' is not an object (evaluating 'touch.el.trigger'), when double tap
              if (touch.el) touch.el.trigger(event);

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap');
                touch = {};
              }

              // trigger single tap after 250ms of inactivity
              else {
                  touchTimeout = setTimeout(function () {
                    touchTimeout = null;
                    if (touch.el) touch.el.trigger('singleTap');
                    touch = {};
                  }, 250);
                }
            }, 0);
          } else {
            touch = {};
          }
      deltaX = deltaY = 0;
    })
    // when the browser window loses focus,
    // for example when a modal dialog is shown,
    // cancel all ongoing events
    .on('touchcancel MSPointerCancel pointercancel', cancelAll);

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll);
  });['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function (eventName) {
    $.fn[eventName] = function (callback) {
      return this.on(eventName, callback);
    };
  });
})(Zepto);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */

var Zepto = function () {
  var undefined,
      key,
      $,
      classList,
      emptyArray = [],
      _slice = emptyArray.slice,
      _filter = emptyArray.filter,
      document = window.document,
      elementDisplay = {},
      classCache = {},
      cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
      fragmentRE = /^\s*<(\w+|!)[^>]*>/,
      singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
      rootNodeRE = /^(?:body|html)$/i,
      capitalRE = /([A-Z])/g,


  // special attributes that should be get/set via method calls
  methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
      adjacencyOperators = ['after', 'prepend', 'before', 'append'],
      table = document.createElement('table'),
      tableRow = document.createElement('tr'),
      containers = {
    'tr': document.createElement('tbody'),
    'tbody': table, 'thead': table, 'tfoot': table,
    'td': tableRow, 'th': tableRow,
    '*': document.createElement('div')
  },
      readyRE = /complete|loaded|interactive/,
      simpleSelectorRE = /^[\w-]*$/,
      class2type = {},
      toString = class2type.toString,
      zepto = {},
      camelize,
      uniq,
      tempParent = document.createElement('div'),
      propMap = {
    'tabindex': 'tabIndex',
    'readonly': 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    'maxlength': 'maxLength',
    'cellspacing': 'cellSpacing',
    'cellpadding': 'cellPadding',
    'rowspan': 'rowSpan',
    'colspan': 'colSpan',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'contenteditable': 'contentEditable'
  },
      isArray = Array.isArray || function (object) {
    return object instanceof Array;
  };

  zepto.matches = function (element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false;
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
    if (matchesSelector) return matchesSelector.call(element, selector);
    // fall back to performing a selector:
    var match,
        parent = element.parentNode,
        temp = !parent;
    if (temp) (parent = tempParent).appendChild(element);
    match = ~zepto.qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return match;
  };

  function type(obj) {
    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
  }

  function isFunction(value) {
    return type(value) == "function";
  }
  function isWindow(obj) {
    return obj != null && obj == obj.window;
  }
  function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
  }
  function isObject(obj) {
    return type(obj) == "object";
  }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  }
  function likeArray(obj) {
    return typeof obj.length == 'number';
  }

  function compact(array) {
    return _filter.call(array, function (item) {
      return item != null;
    });
  }
  function flatten(array) {
    return array.length > 0 ? $.fn.concat.apply([], array) : array;
  }
  camelize = function camelize(str) {
    return str.replace(/-+(.)?/g, function (match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  };
  function dasherize(str) {
    return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
  }
  uniq = function uniq(array) {
    return _filter.call(array, function (item, idx) {
      return array.indexOf(item) == idx;
    });
  };

  function classRE(name) {
    return name in classCache ? classCache[name] : classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)');
  }

  function maybeAddPx(name, value) {
    return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
  }

  function defaultDisplay(nodeName) {
    var element, display;
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName);
      document.body.appendChild(element);
      display = getComputedStyle(element, '').getPropertyValue("display");
      element.parentNode.removeChild(element);
      display == "none" && (display = "block");
      elementDisplay[nodeName] = display;
    }
    return elementDisplay[nodeName];
  }

  function _children(element) {
    return 'children' in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
      if (node.nodeType == 1) return node;
    });
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function (html, name, properties) {
    var dom, nodes, container;

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
      if (!(name in containers)) name = '*';

      container = containers[name];
      container.innerHTML = '' + html;
      dom = $.each(_slice.call(container.childNodes), function () {
        container.removeChild(this);
      });
    }

    if (isPlainObject(properties)) {
      nodes = $(dom);
      $.each(properties, function (key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value);else nodes.attr(key, value);
      });
    }

    return dom;
  };

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function (dom, selector) {
    dom = dom || [];
    dom.__proto__ = $.fn;
    dom.selector = selector || '';
    return dom;
  };

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function (object) {
    return object instanceof zepto.Z;
  };

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function (selector, context) {
    var dom;
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z();
    // Optimize for string selectors
    else if (typeof selector == 'string') {
        selector = selector.trim();
        // If it's a html fragment, create nodes from it
        // Note: In both Chrome 21 and Firefox 15, DOM error 12
        // is thrown if the fragment doesn't begin with <
        if (selector[0] == '<' && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
        // If there's a context, create a collection on that context first, and select
        // nodes from there
        else if (context !== undefined) return $(context).find(selector);
          // If it's a CSS selector, use it to select nodes.
          else dom = zepto.qsa(document, selector);
      }
      // If a function is given, call it when the DOM is ready
      else if (isFunction(selector)) return $(document).ready(selector);
        // If a Zepto collection is given, just return it
        else if (zepto.isZ(selector)) return selector;else {
            // normalize array if an array of nodes is given
            if (isArray(selector)) dom = compact(selector);
            // Wrap DOM nodes.
            else if (isObject(selector)) dom = [selector], selector = null;
              // If it's a html fragment, create nodes from it
              else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
                // If there's a context, create a collection on that context first, and select
                // nodes from there
                else if (context !== undefined) return $(context).find(selector);
                  // And last but no least, if it's a CSS selector, use it to select nodes.
                  else dom = zepto.qsa(document, selector);
          }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector);
  };

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function $(selector, context) {
    return zepto.init(selector, context);
  };

  function extend(target, source, deep) {
    for (key in source) {
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
        if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
        extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) target[key] = source[key];
    }
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function (target) {
    var deep,
        args = _slice.call(arguments, 1);
    if (typeof target == 'boolean') {
      deep = target;
      target = args.shift();
    }
    args.forEach(function (arg) {
      extend(target, arg, deep);
    });
    return target;
  };

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function (element, selector) {
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
        // Ensure that a 1 char tag name still gets checked
    isSimple = simpleSelectorRE.test(nameOnly);
    return isDocument(element) && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 ? [] : _slice.call(isSimple && !maybeID ? maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
    element.getElementsByTagName(selector) : // Or a tag
    element.querySelectorAll(selector) // Or it's not simple, and we need to query all
    );
  };

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector);
  }

  $.contains = document.documentElement.contains ? function (parent, node) {
    return parent !== node && parent.contains(node);
  } : function (parent, node) {
    while (node && (node = node.parentNode)) {
      if (node === parent) return true;
    }return false;
  };

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value) {
    var klass = node.className,
        svg = klass && klass.baseVal !== undefined;

    if (value === undefined) return svg ? klass.baseVal : klass;
    svg ? klass.baseVal = value : node.className = value;
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    var num;
    try {
      return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !/^0/.test(value) && !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
    } catch (e) {
      return value;
    }
  }

  $.type = type;
  $.isFunction = isFunction;
  $.isWindow = isWindow;
  $.isArray = isArray;
  $.isPlainObject = isPlainObject;

  $.isEmptyObject = function (obj) {
    var name;
    for (name in obj) {
      return false;
    }return true;
  };

  $.inArray = function (elem, array, i) {
    return emptyArray.indexOf.call(array, elem, i);
  };

  $.camelCase = camelize;
  $.trim = function (str) {
    return str == null ? "" : String.prototype.trim.call(str);
  };

  // plugin compatibility
  $.uuid = 0;
  $.support = {};
  $.expr = {};

  $.map = function (elements, callback) {
    var value,
        values = [],
        i,
        key;
    if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
      value = callback(elements[i], i);
      if (value != null) values.push(value);
    } else for (key in elements) {
      value = callback(elements[key], key);
      if (value != null) values.push(value);
    }
    return flatten(values);
  };

  $.each = function (elements, callback) {
    var i, key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++) {
        if (callback.call(elements[i], i, elements[i]) === false) return elements;
      }
    } else {
      for (key in elements) {
        if (callback.call(elements[key], key, elements[key]) === false) return elements;
      }
    }

    return elements;
  };

  $.grep = function (elements, callback) {
    return _filter.call(elements, callback);
  };

  if (window.JSON) $.parseJSON = JSON.parse;

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function map(fn) {
      return $($.map(this, function (el, i) {
        return fn.call(el, i, el);
      }));
    },
    slice: function slice() {
      return $(_slice.apply(this, arguments));
    },

    ready: function ready(callback) {
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($);else document.addEventListener('DOMContentLoaded', function () {
        callback($);
      }, false);
      return this;
    },
    get: function get(idx) {
      return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
    },
    toArray: function toArray() {
      return this.get();
    },
    size: function size() {
      return this.length;
    },
    remove: function remove() {
      return this.each(function () {
        if (this.parentNode != null) this.parentNode.removeChild(this);
      });
    },
    each: function each(callback) {
      emptyArray.every.call(this, function (el, idx) {
        return callback.call(el, idx, el) !== false;
      });
      return this;
    },
    filter: function filter(selector) {
      if (isFunction(selector)) return this.not(this.not(selector));
      return $(_filter.call(this, function (element) {
        return zepto.matches(element, selector);
      }));
    },
    add: function add(selector, context) {
      return $(uniq(this.concat($(selector, context))));
    },
    is: function is(selector) {
      return this.length > 0 && zepto.matches(this[0], selector);
    },
    not: function not(selector) {
      var nodes = [];
      if (isFunction(selector) && selector.call !== undefined) this.each(function (idx) {
        if (!selector.call(this, idx)) nodes.push(this);
      });else {
        var excludes = typeof selector == 'string' ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
        this.forEach(function (el) {
          if (excludes.indexOf(el) < 0) nodes.push(el);
        });
      }
      return $(nodes);
    },
    has: function has(selector) {
      return this.filter(function () {
        return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
      });
    },
    eq: function eq(idx) {
      return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
    },
    first: function first() {
      var el = this[0];
      return el && !isObject(el) ? el : $(el);
    },
    last: function last() {
      var el = this[this.length - 1];
      return el && !isObject(el) ? el : $(el);
    },
    find: function find(selector) {
      var result,
          $this = this;
      if (!selector) result = [];else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') result = $(selector).filter(function () {
        var node = this;
        return emptyArray.some.call($this, function (parent) {
          return $.contains(parent, node);
        });
      });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
        return zepto.qsa(this, selector);
      });
      return result;
    },
    closest: function closest(selector, context) {
      var node = this[0],
          collection = false;
      if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') collection = $(selector);
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
        node = node !== context && !isDocument(node) && node.parentNode;
      }return $(node);
    },
    parents: function parents(selector) {
      var ancestors = [],
          nodes = this;
      while (nodes.length > 0) {
        nodes = $.map(nodes, function (node) {
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        });
      }return filtered(ancestors, selector);
    },
    parent: function parent(selector) {
      return filtered(uniq(this.pluck('parentNode')), selector);
    },
    children: function children(selector) {
      return filtered(this.map(function () {
        return _children(this);
      }), selector);
    },
    contents: function contents() {
      return this.map(function () {
        return _slice.call(this.childNodes);
      });
    },
    siblings: function siblings(selector) {
      return filtered(this.map(function (i, el) {
        return _filter.call(_children(el.parentNode), function (child) {
          return child !== el;
        });
      }), selector);
    },
    empty: function empty() {
      return this.each(function () {
        this.innerHTML = '';
      });
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function pluck(property) {
      return $.map(this, function (el) {
        return el[property];
      });
    },
    show: function show() {
      return this.each(function () {
        this.style.display == "none" && (this.style.display = '');
        if (getComputedStyle(this, '').getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
      });
    },
    replaceWith: function replaceWith(newContent) {
      return this.before(newContent).remove();
    },
    wrap: function wrap(structure) {
      var func = isFunction(structure);
      if (this[0] && !func) var dom = $(structure).get(0),
          clone = dom.parentNode || this.length > 1;

      return this.each(function (index) {
        $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
      });
    },
    wrapAll: function wrapAll(structure) {
      if (this[0]) {
        $(this[0]).before(structure = $(structure));
        var children;
        // drill down to the inmost element
        while ((children = structure.children()).length) {
          structure = children.first();
        }$(structure).append(this);
      }
      return this;
    },
    wrapInner: function wrapInner(structure) {
      var func = isFunction(structure);
      return this.each(function (index) {
        var self = $(this),
            contents = self.contents(),
            dom = func ? structure.call(this, index) : structure;
        contents.length ? contents.wrapAll(dom) : self.append(dom);
      });
    },
    unwrap: function unwrap() {
      this.parent().each(function () {
        $(this).replaceWith($(this).children());
      });
      return this;
    },
    clone: function clone() {
      return this.map(function () {
        return this.cloneNode(true);
      });
    },
    hide: function hide() {
      return this.css("display", "none");
    },
    toggle: function toggle(setting) {
      return this.each(function () {
        var el = $(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
      });
    },
    prev: function prev(selector) {
      return $(this.pluck('previousElementSibling')).filter(selector || '*');
    },
    next: function next(selector) {
      return $(this.pluck('nextElementSibling')).filter(selector || '*');
    },
    html: function html(_html) {
      return 0 in arguments ? this.each(function (idx) {
        var originHtml = this.innerHTML;
        $(this).empty().append(funcArg(this, _html, idx, originHtml));
      }) : 0 in this ? this[0].innerHTML : null;
    },
    text: function text(_text) {
      return 0 in arguments ? this.each(function (idx) {
        var newText = funcArg(this, _text, idx, this.textContent);
        this.textContent = newText == null ? '' : '' + newText;
      }) : 0 in this ? this[0].textContent : null;
    },
    attr: function attr(name, value) {
      var result;
      return typeof name == 'string' && !(1 in arguments) ? !this.length || this[0].nodeType !== 1 ? undefined : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function (idx) {
        if (this.nodeType !== 1) return;
        if (isObject(name)) for (key in name) {
          setAttribute(this, key, name[key]);
        } else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
      });
    },
    removeAttr: function removeAttr(name) {
      return this.each(function () {
        this.nodeType === 1 && setAttribute(this, name);
      });
    },
    prop: function prop(name, value) {
      name = propMap[name] || name;
      return 1 in arguments ? this.each(function (idx) {
        this[name] = funcArg(this, value, idx, this[name]);
      }) : this[0] && this[0][name];
    },
    data: function data(name, value) {
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase();

      var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);

      return data !== null ? deserializeValue(data) : undefined;
    },
    val: function val(value) {
      return 0 in arguments ? this.each(function (idx) {
        this.value = funcArg(this, value, idx, this.value);
      }) : this[0] && (this[0].multiple ? $(this[0]).find('option').filter(function () {
        return this.selected;
      }).pluck('value') : this[0].value);
    },
    offset: function offset(coordinates) {
      if (coordinates) return this.each(function (index) {
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
          top: coords.top - parentOffset.top,
          left: coords.left - parentOffset.left
        };

        if ($this.css('position') == 'static') props['position'] = 'relative';
        $this.css(props);
      });
      if (!this.length) return null;
      var obj = this[0].getBoundingClientRect();
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      };
    },
    css: function css(property, value) {
      if (arguments.length < 2) {
        var element = this[0],
            computedStyle = getComputedStyle(element, '');
        if (!element) return;
        if (typeof property == 'string') return element.style[camelize(property)] || computedStyle.getPropertyValue(property);else if (isArray(property)) {
          var props = {};
          $.each(isArray(property) ? property : [property], function (_, prop) {
            props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
          });
          return props;
        }
      }

      var css = '';
      if (type(property) == 'string') {
        if (!value && value !== 0) this.each(function () {
          this.style.removeProperty(dasherize(property));
        });else css = dasherize(property) + ":" + maybeAddPx(property, value);
      } else {
        for (key in property) {
          if (!property[key] && property[key] !== 0) this.each(function () {
            this.style.removeProperty(dasherize(key));
          });else css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
        }
      }

      return this.each(function () {
        this.style.cssText += ';' + css;
      });
    },
    index: function index(element) {
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
    },
    hasClass: function hasClass(name) {
      if (!name) return false;
      return emptyArray.some.call(this, function (el) {
        return this.test(className(el));
      }, classRE(name));
    },
    addClass: function addClass(name) {
      if (!name) return this;
      return this.each(function (idx) {
        classList = [];
        var cls = className(this),
            newName = funcArg(this, name, idx, cls);
        newName.split(/\s+/g).forEach(function (klass) {
          if (!$(this).hasClass(klass)) classList.push(klass);
        }, this);
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
      });
    },
    removeClass: function removeClass(name) {
      return this.each(function (idx) {
        if (name === undefined) return className(this, '');
        classList = className(this);
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
          classList = classList.replace(classRE(klass), " ");
        });
        className(this, classList.trim());
      });
    },
    toggleClass: function toggleClass(name, when) {
      if (!name) return this;
      return this.each(function (idx) {
        var $this = $(this),
            names = funcArg(this, name, idx, className(this));
        names.split(/\s+/g).forEach(function (klass) {
          (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
        });
      });
    },
    scrollTop: function scrollTop(value) {
      if (!this.length) return;
      var hasScrollTop = 'scrollTop' in this[0];
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
      return this.each(hasScrollTop ? function () {
        this.scrollTop = value;
      } : function () {
        this.scrollTo(this.scrollX, value);
      });
    },
    scrollLeft: function scrollLeft(value) {
      if (!this.length) return;
      var hasScrollLeft = 'scrollLeft' in this[0];
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
      return this.each(hasScrollLeft ? function () {
        this.scrollLeft = value;
      } : function () {
        this.scrollTo(value, this.scrollY);
      });
    },
    position: function position() {
      if (!this.length) return;

      var elem = this[0],

      // Get *real* offsetParent
      offsetParent = this.offsetParent(),

      // Get correct offsets
      offset = this.offset(),
          parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top -= parseFloat($(elem).css('margin-top')) || 0;
      offset.left -= parseFloat($(elem).css('margin-left')) || 0;

      // Add offsetParent borders
      parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0;
      parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0;

      // Subtract the two offsets
      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var parent = this.offsetParent || document.body;
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
          parent = parent.offsetParent;
        }return parent;
      });
    }
  };

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function (dimension) {
    var dimensionProperty = dimension.replace(/./, function (m) {
      return m[0].toUpperCase();
    });

    $.fn[dimension] = function (value) {
      var offset,
          el = this[0];
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] : isDocument(el) ? el.documentElement['scroll' + dimensionProperty] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
        el = $(this);
        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
      });
    };
  });

  function traverseNode(node, fun) {
    fun(node);
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
      traverseNode(node.childNodes[i], fun);
    }
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function (operator, operatorIndex) {
    var inside = operatorIndex % 2; //=> prepend, append

    $.fn[operator] = function () {
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType,
          nodes = $.map(arguments, function (arg) {
        argType = type(arg);
        return argType == "object" || argType == "array" || arg == null ? arg : zepto.fragment(arg);
      }),
          parent,
          copyByClone = this.length > 1;
      if (nodes.length < 1) return this;

      return this.each(function (_, target) {
        parent = inside ? target : target.parentNode;

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;

        var parentInDocument = $.contains(document.documentElement, parent);

        nodes.forEach(function (node) {
          if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();

          parent.insertBefore(node, target);
          if (parentInDocument) traverseNode(node, function (el) {
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript') && !el.src) window['eval'].call(window, el.innerHTML);
          });
        });
      });
    };

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
      $(html)[operator](this);
      return this;
    };
  });

  zepto.Z.prototype = $.fn;

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq;
  zepto.deserializeValue = deserializeValue;
  $.zepto = zepto;

  return $;
}();

window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto);(function ($) {
  var _zid = 1,
      undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function isString(obj) {
    return typeof obj == 'string';
  },
      handlers = {},
      specialEvents = {},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

  function zid(element) {
    return element._zid || (element._zid = _zid++);
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event);
    if (event.ns) var matcher = matcherFor(event.ns);
    return (handlers[zid(element)] || []).filter(function (handler) {
      return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
    });
  }
  function parse(event) {
    var parts = ('' + event).split('.');
    return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
  }

  function eventCapture(handler, captureSetting) {
    return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
  }

  function realEvent(type) {
    return hover[type] || focusinSupported && focus[type] || type;
  }

  function add(element, events, fn, data, selector, delegator, capture) {
    var id = zid(element),
        set = handlers[id] || (handlers[id] = []);
    events.split(/\s/).forEach(function (event) {
      if (event == 'ready') return $(document).ready(fn);
      var handler = parse(event);
      handler.fn = fn;
      handler.sel = selector;
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function fn(e) {
        var related = e.relatedTarget;
        if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
      };
      handler.del = delegator;
      var callback = delegator || fn;
      handler.proxy = function (e) {
        e = compatible(e);
        if (e.isImmediatePropagationStopped()) return;
        e.data = data;
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
        if (result === false) e.preventDefault(), e.stopPropagation();
        return result;
      };
      handler.i = set.length;
      set.push(handler);
      if ('addEventListener' in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
    });
  }
  function remove(element, events, fn, selector, capture) {
    var id = zid(element);(events || '').split(/\s/).forEach(function (event) {
      findHandlers(element, event, fn, selector).forEach(function (handler) {
        delete handlers[id][handler.i];
        if ('removeEventListener' in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
      });
    });
  }

  $.event = { add: add, remove: remove };

  $.proxy = function (fn, context) {
    var args = 2 in arguments && slice.call(arguments, 2);
    if (isFunction(fn)) {
      var proxyFn = function proxyFn() {
        return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
      };
      proxyFn._zid = zid(fn);
      return proxyFn;
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn);
        return $.proxy.apply(null, args);
      } else {
        return $.proxy(fn[context], fn);
      }
    } else {
      throw new TypeError("expected function");
    }
  };

  $.fn.bind = function (event, data, callback) {
    return this.on(event, data, callback);
  };
  $.fn.unbind = function (event, callback) {
    return this.off(event, callback);
  };
  $.fn.one = function (event, selector, data, callback) {
    return this.on(event, selector, data, callback, 1);
  };

  var returnTrue = function returnTrue() {
    return true;
  },
      returnFalse = function returnFalse() {
    return false;
  },
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
    preventDefault: 'isDefaultPrevented',
    stopImmediatePropagation: 'isImmediatePropagationStopped',
    stopPropagation: 'isPropagationStopped'
  };

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event);

      $.each(eventMethods, function (name, predicate) {
        var sourceMethod = source[name];
        event[name] = function () {
          this[predicate] = returnTrue;
          return sourceMethod && sourceMethod.apply(source, arguments);
        };
        event[predicate] = returnFalse;
      });

      if (source.defaultPrevented !== undefined ? source.defaultPrevented : 'returnValue' in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
    }
    return event;
  }

  function createProxy(event) {
    var key,
        proxy = { originalEvent: event };
    for (key in event) {
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
    }return compatible(proxy, event);
  }

  $.fn.delegate = function (selector, event, callback) {
    return this.on(event, selector, callback);
  };
  $.fn.undelegate = function (selector, event, callback) {
    return this.off(event, selector, callback);
  };

  $.fn.live = function (event, callback) {
    $(document.body).delegate(this.selector, event, callback);
    return this;
  };
  $.fn.die = function (event, callback) {
    $(document.body).undelegate(this.selector, event, callback);
    return this;
  };

  $.fn.on = function (event, selector, data, callback, one) {
    var autoRemove,
        delegator,
        $this = this;
    if (event && !isString(event)) {
      $.each(event, function (type, fn) {
        $this.on(type, selector, data, fn, one);
      });
      return $this;
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
    if (isFunction(data) || data === false) callback = data, data = undefined;

    if (callback === false) callback = returnFalse;

    return $this.each(function (_, element) {
      if (one) autoRemove = function autoRemove(e) {
        remove(element, e.type, callback);
        return callback.apply(this, arguments);
      };

      if (selector) delegator = function delegator(e) {
        var evt,
            match = $(e.target).closest(selector, element).get(0);
        if (match && match !== element) {
          evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
        }
      };

      add(element, event, callback, data, selector, delegator || autoRemove);
    });
  };
  $.fn.off = function (event, selector, callback) {
    var $this = this;
    if (event && !isString(event)) {
      $.each(event, function (type, fn) {
        $this.off(type, selector, fn);
      });
      return $this;
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;

    if (callback === false) callback = returnFalse;

    return $this.each(function () {
      remove(this, event, callback, selector);
    });
  };

  $.fn.trigger = function (event, args) {
    event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
    event._args = args;
    return this.each(function () {
      // items in the collection might not be DOM elements
      if ('dispatchEvent' in this) this.dispatchEvent(event);else $(this).triggerHandler(event, args);
    });
  };

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function (event, args) {
    var e, result;
    this.each(function (i, element) {
      e = createProxy(isString(event) ? $.Event(event) : event);
      e._args = args;
      e.target = element;
      $.each(findHandlers(element, event.type || event), function (i, handler) {
        result = handler.proxy(e);
        if (e.isImmediatePropagationStopped()) return false;
      });
    });
    return result;
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select keydown keypress keyup error').split(' ').forEach(function (event) {
    $.fn[event] = function (callback) {
      return callback ? this.bind(event, callback) : this.trigger(event);
    };
  });['focus', 'blur'].forEach(function (name) {
    $.fn[name] = function (callback) {
      if (callback) this.bind(name, callback);else this.each(function () {
        try {
          this[name]();
        } catch (e) {}
      });
      return this;
    };
  });

  $.Event = function (type, props) {
    if (!isString(type)) props = type, type = props.type;
    var event = document.createEvent(specialEvents[type] || 'Events'),
        bubbles = true;
    if (props) for (var name in props) {
      name == 'bubbles' ? bubbles = !!props[name] : event[name] = props[name];
    }event.initEvent(type, bubbles, true);
    return compatible(event);
  };
})(Zepto);(function ($) {
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/;

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName);
    $(context).trigger(event, data);
    return !event.isDefaultPrevented();
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data);
  }

  // Number of active Ajax requests
  $.active = 0;

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
  }
  function ajaxStop(settings) {
    if (settings.global && ! --$.active) triggerGlobal(settings, null, 'ajaxStop');
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context;
    if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) return false;

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context,
        status = 'success';
    settings.success.call(context, data, status, xhr);
    if (deferred) deferred.resolveWith(context, [data, status, xhr]);
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
    ajaxComplete(status, xhr, settings);
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context;
    settings.error.call(context, xhr, type, error);
    if (deferred) deferred.rejectWith(context, [xhr, type, error]);
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
    ajaxComplete(type, xhr, settings);
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context;
    settings.complete.call(context, xhr, status);
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
    ajaxStop(settings);
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function (options, deferred) {
    if (!('type' in options)) return $.ajax(options);

    var _callbackName = options.jsonpCallback,
        callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || 'jsonp' + ++jsonpID,
        script = document.createElement('script'),
        originalCallback = window[callbackName],
        responseData,
        abort = function abort(errorType) {
      $(script).triggerHandler('error', errorType || 'abort');
    },
        xhr = { abort: abort },
        abortTimeout;

    if (deferred) deferred.promise(xhr);

    $(script).on('load error', function (e, errorType) {
      clearTimeout(abortTimeout);
      $(script).off().remove();

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred);
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred);
      }

      window[callbackName] = originalCallback;
      if (responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);

      originalCallback = responseData = undefined;
    });

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort');
      return xhr;
    }

    window[callbackName] = function () {
      responseData = arguments;
    };

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
    document.head.appendChild(script);

    if (options.timeout > 0) abortTimeout = setTimeout(function () {
      abort('timeout');
    }, options.timeout);

    return xhr;
  };

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function xhr() {
      return new window.XMLHttpRequest();
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json: jsonType,
      xml: 'application/xml, text/xml',
      html: htmlType,
      text: 'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  };

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0];
    return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
  }

  function appendQuery(url, query) {
    if (query == '') return url;
    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) options.url = appendQuery(options.url, options.data), options.data = undefined;
  }

  $.ajax = function (options) {
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred();
    for (key in $.ajaxSettings) {
      if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
    }ajaxStart(settings);

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host;

    if (!settings.url) settings.url = window.location.toString();
    serializeData(settings);

    var dataType = settings.dataType,
        hasPlaceholder = /\?.+=\?/.test(settings.url);
    if (hasPlaceholder) dataType = 'jsonp';

    if (settings.cache === false || (!options || options.cache !== true) && ('script' == dataType || 'jsonp' == dataType)) settings.url = appendQuery(settings.url, '_=' + Date.now());

    if ('jsonp' == dataType) {
      if (!hasPlaceholder) settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + '=?' : settings.jsonp === false ? '' : 'callback=?');
      return $.ajaxJSONP(settings, deferred);
    }

    var mime = settings.accepts[dataType],
        headers = {},
        setHeader = function setHeader(name, value) {
      headers[name.toLowerCase()] = [name, value];
    },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout;

    if (deferred) deferred.promise(xhr);

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
    setHeader('Accept', mime || '*/*');
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
      xhr.overrideMimeType && xhr.overrideMimeType(mime);
    }
    if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');

    if (settings.headers) for (name in settings.headers) {
      setHeader(name, settings.headers[name]);
    }xhr.setRequestHeader = setHeader;

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty;
        clearTimeout(abortTimeout);
        var result,
            error = false;
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
          result = xhr.responseText;

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script') (1, eval)(result);else if (dataType == 'xml') result = xhr.responseXML;else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
          } catch (e) {
            error = e;
          }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred);else ajaxSuccess(result, xhr, settings, deferred);
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
        }
      }
    };

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort();
      ajaxError(null, 'abort', xhr, settings, deferred);
      return xhr;
    }

    if (settings.xhrFields) for (name in settings.xhrFields) {
      xhr[name] = settings.xhrFields[name];
    }var async = 'async' in settings ? settings.async : true;
    xhr.open(settings.type, settings.url, async, settings.username, settings.password);

    for (name in headers) {
      nativeSetHeader.apply(xhr, headers[name]);
    }if (settings.timeout > 0) abortTimeout = setTimeout(function () {
      xhr.onreadystatechange = empty;
      xhr.abort();
      ajaxError(null, 'timeout', xhr, settings, deferred);
    }, settings.timeout);

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null);
    return xhr;
  };

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined;
    if (!$.isFunction(success)) dataType = success, success = undefined;
    return {
      url: url,
      data: data,
      success: success,
      dataType: dataType
    };
  }

  $.get = function () /* url, data, success, dataType */{
    return $.ajax(parseArguments.apply(null, arguments));
  };

  $.post = function () /* url, data, success, dataType */{
    var options = parseArguments.apply(null, arguments);
    options.type = 'POST';
    return $.ajax(options);
  };

  $.getJSON = function () /* url, data, success */{
    var options = parseArguments.apply(null, arguments);
    options.dataType = 'json';
    return $.ajax(options);
  };

  $.fn.load = function (url, data, success) {
    if (!this.length) return this;
    var self = this,
        parts = url.split(/\s/),
        selector,
        options = parseArguments(url, data, success),
        callback = options.success;
    if (parts.length > 1) options.url = parts[0], selector = parts[1];
    options.success = function (response) {
      self.html(selector ? $('<div>').html(response.replace(rscript, "")).find(selector) : response);
      callback && callback.apply(self, arguments);
    };
    $.ajax(options);
    return this;
  };

  var escape = encodeURIComponent;

  function serialize(params, obj, traditional, scope) {
    var type,
        array = $.isArray(obj),
        hash = $.isPlainObject(obj);
    $.each(obj, function (key, value) {
      type = $.type(value);
      if (scope) key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value);
      // recurse into nested objects
      else if (type == "array" || !traditional && type == "object") serialize(params, value, traditional, key);else params.add(key, value);
    });
  }

  $.param = function (obj, traditional) {
    var params = [];
    params.add = function (k, v) {
      this.push(escape(k) + '=' + escape(v));
    };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+');
  };
})(Zepto);(function ($) {
  $.fn.serializeArray = function () {
    var result = [],
        el;
    $([].slice.call(this.get(0).elements)).each(function () {
      el = $(this);
      var type = el.attr('type');
      if (this.nodeName.toLowerCase() != 'fieldset' && !this.disabled && type != 'submit' && type != 'reset' && type != 'button' && (type != 'radio' && type != 'checkbox' || this.checked)) result.push({
        name: el.attr('name'),
        value: el.val()
      });
    });
    return result;
  };

  $.fn.serialize = function () {
    var result = [];
    this.serializeArray().forEach(function (elm) {
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
    });
    return result.join('&');
  };

  $.fn.submit = function (callback) {
    if (callback) this.bind('submit', callback);else if (this.length) {
      var event = $.Event('submit');
      this.eq(0).trigger(event);
      if (!event.isDefaultPrevented()) this.get(0).submit();
    }
    return this;
  };
})(Zepto);(function ($) {
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z: function Z(dom, selector) {
        dom = dom || [];
        $.extend(dom, $.fn);
        dom.selector = selector || '';
        dom.__Z = true;
        return dom;
      },
      // this is a kludge but works
      isZ: function isZ(object) {
        return $.type(object) === 'array' && '__Z' in object;
      }
    });
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined);
  } catch (e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function (element) {
      try {
        return nativeGetComputedStyle(element);
      } catch (e) {
        return null;
      }
    };
  }
})(Zepto);(function ($) {
  var touch = {},
      touchTimeout,
      tapTimeout,
      swipeTimeout,
      longTapTimeout,
      longTapDelay = 750,
      gesture;

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
  }

  function longTap() {
    longTapTimeout = null;
    if (touch.last) {
      touch.el.trigger('longTap');
      touch = {};
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout);
    longTapTimeout = null;
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout);
    if (tapTimeout) clearTimeout(tapTimeout);
    if (swipeTimeout) clearTimeout(swipeTimeout);
    if (longTapTimeout) clearTimeout(longTapTimeout);
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
    touch = {};
  }

  function isPrimaryTouch(event) {
    return (event.pointerType == 'touch' || event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary;
  }

  function isPointerEventType(e, type) {
    return e.type == 'pointer' + type || e.type.toLowerCase() == 'mspointer' + type;
  }

  $(document).ready(function () {
    var now,
        delta,
        deltaX = 0,
        deltaY = 0,
        firstTouch,
        _isPointerType;

    if ('MSGesture' in window) {
      gesture = new MSGesture();
      gesture.target = document.body;
    }

    $(document).bind('MSGestureEnd', function (e) {
      var swipeDirectionFromVelocity = e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
      if (swipeDirectionFromVelocity) {
        touch.el.trigger('swipe');
        touch.el.trigger('swipe' + swipeDirectionFromVelocity);
      }
    }).on('touchstart MSPointerDown pointerdown', function (e) {
      if ((_isPointerType = isPointerEventType(e, 'down')) && !isPrimaryTouch(e)) return;
      firstTouch = _isPointerType ? e : e.touches[0];
      if (e.touches && e.touches.length === 1 && touch.x2) {
        // Clear out touch movement data if we have it sticking around
        // This can occur if touchcancel doesn't fire due to preventDefault, etc.
        touch.x2 = undefined;
        touch.y2 = undefined;
      }
      now = Date.now();
      delta = now - (touch.last || now);
      touch.el = $('tagName' in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);
      touchTimeout && clearTimeout(touchTimeout);
      touch.x1 = firstTouch.pageX;
      touch.y1 = firstTouch.pageY;
      if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
      touch.last = now;
      longTapTimeout = setTimeout(longTap, longTapDelay);
      // adds the current touch contact for IE gesture recognition
      if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
    }).on('touchmove MSPointerMove pointermove', function (e) {
      if ((_isPointerType = isPointerEventType(e, 'move')) && !isPrimaryTouch(e)) return;
      firstTouch = _isPointerType ? e : e.touches[0];
      cancelLongTap();
      touch.x2 = firstTouch.pageX;
      touch.y2 = firstTouch.pageY;

      deltaX += Math.abs(touch.x1 - touch.x2);
      deltaY += Math.abs(touch.y1 - touch.y2);
    }).on('touchend MSPointerUp pointerup', function (e) {
      if ((_isPointerType = isPointerEventType(e, 'up')) && !isPrimaryTouch(e)) return;
      cancelLongTap();

      // swipe
      if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) swipeTimeout = setTimeout(function () {
        touch.el.trigger('swipe');
        touch.el.trigger('swipe' + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2));
        touch = {};
      }, 0);

      // normal tap
      else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function () {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap');
              event.cancelTouch = cancelAll;
              touch.el.trigger(event);

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap');
                touch = {};
              }

              // trigger single tap after 250ms of inactivity
              else {
                  touchTimeout = setTimeout(function () {
                    touchTimeout = null;
                    if (touch.el) touch.el.trigger('singleTap');
                    touch = {};
                  }, 250);
                }
            }, 0);
          } else {
            touch = {};
          }
      deltaX = deltaY = 0;
    })
    // when the browser window loses focus,
    // for example when a modal dialog is shown,
    // cancel all ongoing events
    .on('touchcancel MSPointerCancel pointercancel', cancelAll);

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll);
  });['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function (eventName) {
    $.fn[eventName] = function (callback) {
      return this.on(eventName, callback);
    };
  });
})(Zepto);(function ($) {
  function detect(ua) {
    var os = this.os = {},
        browser = this.browser = {},
        webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        osx = !!ua.match(/\(Macintosh\; Intel /),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        wp = ua.match(/Windows Phone ([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/),
        kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/),
        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
        rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
        playbook = ua.match(/PlayBook/),
        chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        firefox = ua.match(/Firefox\/([\d.]+)/),
        ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
        webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
        safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1];

    if (android) os.android = true, os.version = android[2];
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    if (wp) os.wp = true, os.version = wp[1];
    if (webos) os.webos = true, os.version = webos[2];
    if (touchpad) os.touchpad = true;
    if (blackberry) os.blackberry = true, os.version = blackberry[2];
    if (bb10) os.bb10 = true, os.version = bb10[2];
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
    if (playbook) browser.playbook = true;
    if (kindle) os.kindle = true, os.version = kindle[1];
    if (silk) browser.silk = true, browser.version = silk[1];
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
    if (chrome) browser.chrome = true, browser.version = chrome[1];
    if (firefox) browser.firefox = true, browser.version = firefox[1];
    if (ie) browser.ie = true, browser.version = ie[1];
    if (safari && (osx || os.ios)) {
      browser.safari = true;if (osx) browser.version = safari[1];
    }
    if (webview) browser.webview = true;

    os.tablet = !!(ipad || playbook || android && !ua.match(/Mobile/) || firefox && ua.match(/Tablet/) || ie && !ua.match(/Phone/) && ua.match(/Touch/));
    os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 || chrome && ua.match(/Android/) || chrome && ua.match(/CriOS\/([\d.]+)/) || firefox && ua.match(/Mobile/) || ie && ua.match(/Touch/)));
  }

  detect.call($, navigator.userAgent);
  // make available to unit tests
  $.__detect = detect;
})(Zepto);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(14)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports
exports.i(__webpack_require__(13), "");

// module
exports.push([module.i, "@charset \"UTF-8\";\n/*CSS 的入口文件*/\n/**\n * Yo框架全局Variables\n -----------------------\n * Yo基础变量map，如果不想定义某属性，将其value设置为null；\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\n *\n * @class variables\n * @module Yo\n */\n/**\n * Yo框架全局基础方法\n -----------------------\n * Yo内置了包括响应式方案，CSS3兼容性方案，厂商前缀方案，iconfont方案，flex布局等全局方法\n *\n * @class classes\n * @module Yo\n */\n/**\n * 给需要的属性加厂家前缀\n * @method prefix\n * @param {String} $property 指定属性\n * @param {String} $value 指定属性值\n */\n/**\n * 四则运算\n * @method calc\n * @param {String} $property 指定需要进行计算的CSS属性\n * @param {String} $value 与原生CSS语法一致，使用方式如：@include calc(width, 100% - 0.1rem);\n */\n/**\n * 定义渐变色值\n * @method gradient\n * @param {String} $type 指定渐变的4种类型：linear, repeating-linear, radial, repeating-radial\n * @param {String} $gradient 指定渐变取值，与w3c最新原生语法一致\n */\n/**\n * 定义响应式方案\n * @method responsive\n * @param {String} $media 指定媒体查询条件\n */\n/**\n * 定义字体图标\n * @method yofont\n */\n/**\n * 滤镜\n * @method filter\n * @param {String} $filter 取值与原生语法一致\n */\n/**\n * 定义UA默认外观\n * @method appearance\n * @param {String} $appearance 指定UA外观类型\n */\n/**\n * 定义是否可以选中元素\n * @method user-select\n * @param {String} $user-select 指定是否可以选中\n */\n/**\n * 定义背景图像缩放（Android Browser2.3.*还需要厂商前缀）\n * @method background-size\n * @param {String | Length} $background-size 指定背景图缩放值\n */\n/**\n * 定义背景裁减（Android Browser2.3.*还需要厂商前缀）\n * @method background-clip\n * @param {String} $background-clip 指定背景图缩放值\n */\n/**\n * 定义背景显示区域（Android Browser2.3.*还需要厂商前缀）\n * @method background-origin\n * @param {String} $background-origin 指定背景图缩放值\n */\n/**\n * 定义盒模型\n * @method box-sizing\n * @param {String} $box-sizing 的2个值分别为：content-box(标准盒模型) | border-box(怪异盒模型)\n */\n/**\n * 定义圆角\n * @method border-radius\n * @param {String} $border-radius 取值与原生语法一致\n */\n/**\n * 定义简单变换\n * @method transform\n * @param {String} $transform 取值与原生语法一致\n */\n/**\n * 定义变换原点\n * @method transform-origin\n * @param {String} $transform-origin 取值与原生语法一致\n */\n/**\n * 定义动画\n * @method animation\n * @param {String} $animation 取值与原生语法一致\n */\n/**\n * 定义补间\n * @method transition\n * @param {String} $transition 取值与原生语法一致\n */\n/**\n * 定义显示类型为伸缩盒\n * @method flexbox\n * @param {String} $flexbox 默认值：flex，取值与最新原生语法一致\n */\n/**\n * 定义伸缩盒子元素如何分配空间\n * @method flex\n * @param {String} $flex 默认值：1，取值与最新原生语法一致\n * @param {String} $direction 默认值: row\n */\n/**\n * 定义伸缩盒子元素的排版顺序\n * @method order\n * @param {String} $order 默认值：1，取值与最新原生语法一致\n */\n/**\n * 定义伸缩盒子元素的流动方向\n * @method flex-direction\n * @param {String} $flex-direction 默认值：row，取值与最新原生语法一致\n */\n/**\n * 定义伸缩盒子元素溢出排版\n * @method flex-wrap\n * @param {String} $flex-wrap 默认值：nowrap，取值与最新原生语法一致\n */\n/**\n * 定义伸缩盒子元素的水平对齐方式\n * @method justify-content\n * @param {String} $justify-content 默认值：center，取值与最新原生语法一致\n */\n/**\n * 定义伸缩盒子元素的垂直对齐方式\n * @method align-items\n * @param {String} $align-items 默认值：center，取值与最新原生语法一致\n */\n/**\n * 定义伸缩盒子元素自身的垂直对齐方式\n * @method align-self\n * @param {String} $align-self 默认值：center，取值与最新原生语法一致\n */\n/**\n * 定义root root-scroll\n * @method root-scroll\n * @param {String} $root-scroll 指定scroll类型，取值overflow属性的标准值\n */\n/**\n * 定义是否有滚动条\n * @method overflow\n * @param {String} $overflow 默认值：auto，取值与最新原生语法一致\n */\n/**\n * 生成矩形方法\n * @method rect\n * @param {Length} $width 定义矩形的长度\n * @param {Length} $height 定义矩形的高度\n */\n/**\n * 生成正方形方法\n * @method square\n * @param {Length} $size 定义正方形的边长\n */\n/**\n * 生成圆形方法\n * @method circle\n * @param {Length} $size 定义圆的半径长度\n * @param {Length} $radius 定义圆的圆角半径长度\n */\n/**\n * 生成全屏方法\n * @method fullscreen\n * @param {Integer} $z-index 定义层叠级别\n */\n/**\n * 清除浮动方案\n * @method clearfix\n */\n/**\n * 链接处理方法\n * @method link\n * @param {Color} $color 定义链接颜色\n */\n/**\n * 强制换行方案\n * @method wrap\n */\n/**\n * 单行文本溢出显示方案\n * @method ellipsis\n * @param {Boolen} $ellipsis 定义是否需要省略号\n */\n/**\n * 文字隐藏方案\n * @method texthide\n */\n/**\n * 清除间隙方案-容器\n * @method killspace\n */\n/**\n * 清除间隙方案-子级\n * @method killspace-item\n */\n/**\n * 未知尺寸元素垂直居中解决方案-容器\n * @method valign\n */\n/**\n * 未知尺寸元素垂直居中解决方案-子级\n * @method valign-item\n */\n/**\n * 已经尺寸元素垂直居中解决方案\n * @method alignment\n * @param {Length} $width 居中元素的宽度\n * @param {Length} $height 居中元素的高度\n */\n/* border */\n/**\n * Yo框架全局Reset\n -----------------------\n * Yo重置Mobile及高级浏览器上常见的差异\n *\n * @class reset\n * @module Yo\n */\n*,\n::before,\n::after {\n  -webkit-tap-highlight-color: transparent; }\n\nhtml {\n  background-color: #fafafa;\n  color: #212121;\n  font-size: 100px;\n  -webkit-user-select: none;\n  user-select: none; }\n\nbody {\n  margin: 0;\n  font-size: 14px;\n  line-height: 1.5;\n  font-family: Helvetica Neue, Helvetica, STHeiTi, sans-serif; }\n\nul,\nol,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nfigure,\nform,\nfieldset,\nlegend,\ninput,\ntextarea,\nbutton,\np,\nblockquote,\nth,\ntd,\npre,\nxmp {\n  margin: 0;\n  padding: 0; }\n\ninput,\ntextarea,\nbutton,\nselect,\npre,\nxmp,\ntt,\ncode,\nkbd,\nsamp {\n  line-height: inherit;\n  font-family: inherit; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nsmall,\nbig,\ninput,\ntextarea,\nbutton,\nselect {\n  font-size: inherit; }\n\naddress,\ncite,\ndfn,\nem,\ni,\noptgroup,\nvar {\n  font-style: normal; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n  text-align: left; }\n\nul,\nol,\nmenu {\n  list-style: none; }\n\nfieldset,\nimg {\n  border: 0;\n  vertical-align: middle; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nvideo {\n  display: inline-block; }\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \" \"; }\n\ntextarea,\npre,\nxmp {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n\ntextarea {\n  resize: vertical; }\n\ninput,\ntextarea,\nbutton,\nselect\na {\n  outline: 0 none; }\n\ninput,\ntextarea,\nbutton,\nselect {\n  color: inherit; }\n  input:disabled,\n  textarea:disabled,\n  button:disabled,\n  select:disabled {\n    opacity: 1; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\ninput[type=\"button\"],\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"file\"]::-webkit-file-upload-button,\ninput[type=\"search\"]::-webkit-search-cancel-button {\n  -webkit-appearance: none;\n  appearance: none; }\n\nmark {\n  background-color: transparent; }\n\na,\nins,\ns,\nu,\ndel {\n  text-decoration: none; }\n\na,\nimg {\n  -webkit-touch-callout: none; }\n\na {\n  color: #00afc7; }\n\n.g-clear::after,\n.g-mod::after {\n  display: block;\n  overflow: hidden;\n  clear: both;\n  height: 0;\n  content: \" \"; }\n\n@font-face {\n  font-family: yofont;\n  src: url(\"http://source.qunarzz.com/fonts/yo/1.0.0/yofont.woff\") format(\"woff\"), url(\"http://source.qunarzz.com/fonts/yo/1.0.0/yofont.ttf\") format(\"truetype\"); }\n\n.yo-ico {\n  font-family: yofont !important;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  vertical-align: middle; }\n\n.swiper-container {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n  .swiper-container .swiper-wrapper {\n    width: 100%;\n    height: 100%; }\n    .swiper-container .swiper-wrapper .swiper-slide {\n      width: 100%;\n      height: 100%; }\n      .swiper-container .swiper-wrapper .swiper-slide img {\n        width: 100%; }\n      .swiper-container .swiper-wrapper .swiper-slide:last-child {\n        position: relative; }\n        .swiper-container .swiper-wrapper .swiper-slide:last-child p {\n          width: 1rem;\n          height: .3rem;\n          right: 21%;\n          position: absolute;\n          bottom: 14.3%; }\n\n.m-index {\n  font-size: .14rem;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  flex-direction: column; }\n\n.container {\n  overflow-y: auto;\n  flex: 1;\n  width: 100%;\n  position: relative; }\n\nfooter {\n  width: 100%;\n  height: .44rem;\n  z-index: 99990;\n  background: #fff; }\n  footer ul {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    position: relative; }\n    footer ul::after {\n      pointer-events: none;\n      position: absolute;\n      z-index: 999;\n      top: 0;\n      left: 0;\n      content: \" \";\n      border-color: #ccc;\n      border-style: solid;\n      border-width: 1px 0 0 0;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      -webkit-transform-origin: 0 0;\n      transform-origin: 0 0; }\n      @media screen and (orientation: portrait) {\n        footer ul::after {\n          width: 100%;\n          height: 100%; } }\n      @media (min--moz-device-pixel-ratio: 1.5), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) {\n        footer ul::after {\n          width: 200%;\n          height: 200%;\n          -webkit-transform: scale(0.5);\n          transform: scale(0.5); } }\n      @media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {\n        footer ul::after {\n          width: 300%;\n          height: 300%;\n          -webkit-transform: scale(0.33333);\n          transform: scale(0.33333); } }\n    footer ul li {\n      text-align: center;\n      font-size: 0.12rem;\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n      flex: 1;\n      width: .1px;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n      flex-direction: column; }\n      footer ul li:nth-child(3) {\n        position: relative; }\n        footer ul li:nth-child(3) i {\n          position: absolute !important;\n          left: 50%;\n          top: -0.1rem;\n          -webkit-transform: translate(-50%, 0);\n          width: 0.52rem;\n          height: 0.52rem;\n          border-radius: 50%;\n          background: #fff;\n          border: 1px solid #ccc;\n          font-size: 0.3rem;\n          z-index: 10000; }\n      footer ul li.active {\n        color: #519765; }\n      footer ul li i {\n        font-size: 0.18rem; }\n\n.m-home {\n  height: 100%;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  flex: 1;\n  width: .1px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  width: 100%;\n  position: absolute; }\n  .m-home .header {\n    width: 100%;\n    height: .44rem;\n    background: #0CC140;\n    color: #fff; }\n    .m-home .header ul {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: flex; }\n      .m-home .header ul li:not(:nth-child(2)) {\n        width: .44rem;\n        text-align: center;\n        line-height: .44rem; }\n      .m-home .header ul li:nth-child(2) {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n        flex: 1;\n        width: .1px;\n        text-align: center;\n        width: 100%; }\n        .m-home .header ul li:nth-child(2) p {\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: flex;\n          width: 1.02rem;\n          line-height: .22rem;\n          margin: 0.11rem auto;\n          border-radius: 0.5rem;\n          -webkit-background-clip: padding-box !important;\n          background-clip: padding-box !important;\n          overflow: hidden; }\n          .m-home .header ul li:nth-child(2) p span {\n            width: .51rem;\n            background: rgba(100, 217, 0, 0.7);\n            color: rgba(255, 255, 255, 0.7); }\n            .m-home .header ul li:nth-child(2) p span.active {\n              background: #64d900;\n              color: white; }\n  .m-home .home-section {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    flex: 1;\n    width: .1px;\n    width: 100%;\n    height: 100%;\n    position: absolute; }\n    .m-home .home-section .nav {\n      width: 100%;\n      height: .35rem; }\n      .m-home .home-section .nav ul {\n        height: .35rem;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex; }\n        .m-home .home-section .nav ul li {\n          line-height: .35rem;\n          text-align: center;\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          flex: 1;\n          width: .1px;\n          border-bottom: 1px solid #ccc;\n          -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n          .m-home .home-section .nav ul li.active {\n            border-bottom: 2px solid #519765;\n            color: #519765;\n            -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n    .m-home .home-section .con {\n      display: -webkit-flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n      flex-direction: column;\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n      flex: 1;\n      width: .1px;\n      width: 100%;\n      height: 100%;\n      overflow: hidden; }\n      .m-home .home-section .con ul {\n        padding-top: .1rem;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        width: 100%; }\n        .m-home .home-section .con ul li:not(:nth-child(2)) {\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          flex: 1;\n          width: .1px; }\n        .m-home .home-section .con ul li:nth-child(2) {\n          width: .05rem; }\n        .m-home .home-section .con ul li img {\n          width: 100%; }\n        .m-home .home-section .con ul li b {\n          width: 100%;\n          height: 0.25rem;\n          padding-left: 0.1rem;\n          line-height: 0.25rem; }\n      .m-home .home-section .con .head {\n        text-align: center;\n        height: .3rem;\n        line-height: .3rem; }\n        .m-home .home-section .con .head img {\n          width: .13rem;\n          height: .13rem;\n          margin-bottom: 0.02rem;\n          display: inline-block;\n          transform: rotate(180deg);\n          -webkit-transform: rotate(180deg);\n          transition: transform 150ms;\n          -webkit-transition: transform 150ms; }\n      .m-home .home-section .con .foot {\n        text-align: center;\n        height: .3rem;\n        line-height: .3rem; }\n        .m-home .home-section .con .foot img {\n          width: .13rem;\n          height: .13rem;\n          margin-bottom: 0.04rem;\n          display: inline-block;\n          transition: transform 150ms;\n          -webkit-transition: transform 150ms; }\n      .m-home .home-section .con .up {\n        transform: rotate(360deg) !important;\n        -webkit-transform: rotate(360deg) !important; }\n      .m-home .home-section .con .down {\n        transform: rotate(180deg) !important;\n        -webkit-transform: rotate(180deg) !important; }\n\nbody, html {\n  height: 100%;\n  width: 100%;\n  overflow: hidden; }\n\nhtml {\n  font-size: 100px; }\n\nbody {\n  background: #0ff;\n  font-size: 0.14rem; }\n\n@font-face {\n  font-family: yofont;\n  src: url(\"/images/iconfont/iconfont.woff\");\n  src: url(\"/images/iconfont/iconfont.ttf\"); }\n\nui-view {\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  background: #eceef0 !important;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  flex-direction: column; }\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/**\n * Swiper 3.3.1\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n *\n * http://www.idangero.us/swiper/\n *\n * Copyright 2016, Vladimir Kharlampidi\n * The iDangero.us\n * http://www.idangero.us/\n *\n * Licensed under MIT\n *\n * Released on: February 7, 2016\n */\n.swiper-container{margin:0 auto;position:relative;overflow:hidden;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-moz-box-orient:vertical;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-o-transform:translate(0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.swiper-container-multirow>.swiper-wrapper{-webkit-box-lines:multiple;-moz-box-lines:multiple;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{-webkit-flex-shrink:0;-ms-flex:0 0 auto;flex-shrink:0;width:100%;height:100%;position:relative}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-ms-flex-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-transition-property:-webkit-transform,height;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform,height}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-wp8-horizontal{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-wp8-vertical{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;-moz-background-size:27px 44px;-webkit-background-size:27px 44px;background-size:27px 44px;background-position:center;background-repeat:no-repeat}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");left:10px;right:auto}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");right:10px;left:auto}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s;-moz-transition:.3s;-o-transition:.3s;transition:.3s;-webkit-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-white .swiper-pagination-bullet{background:#fff}.swiper-pagination-bullet-active{opacity:1;background:#007aff}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);-moz-transform:translate3d(0,-50%,0);-o-transform:translate(0,-50%);-ms-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:5px 0;display:block}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 5px}.swiper-pagination-progress{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progress .swiper-pagination-progressbar{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);-ms-transform:scale(0);-o-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;-moz-transform-origin:left top;-ms-transform-origin:left top;-o-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar{-webkit-transform-origin:right top;-moz-transform-origin:right top;-ms-transform-origin:right top;-o-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progress{width:100%;height:4px;left:0;top:0}.swiper-container-vertical>.swiper-pagination-progress{width:4px;height:100%;left:0;top:0}.swiper-pagination-progress.swiper-pagination-white{background:rgba(255,255,255,.5)}.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar{background:#fff}.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar{background:#000}.swiper-container-3d{-webkit-perspective:1200px;-moz-perspective:1200px;-o-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,right top,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-coverflow .swiper-wrapper,.swiper-container-flip .swiper-wrapper{-ms-perspective:1200px}.swiper-container-cube,.swiper-container-flip{overflow:visible}.swiper-container-cube .swiper-slide,.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-cube .swiper-slide .swiper-slide,.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active,.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top,.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-slide{visibility:hidden;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;-moz-transform-origin:100% 0;-ms-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;-moz-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;-moz-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;-moz-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}.swiper-lazy-preloader:after{display:block;content:\"\";width:100%;height:100%;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");background-position:50%;-webkit-background-size:100%;background-size:100%;background-repeat:no-repeat}.swiper-lazy-preloader-white:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\")}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{transform:rotate(360deg)}}\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);

var _angularMin = __webpack_require__(7);

var _angularMin2 = _interopRequireDefault(_angularMin);

var _swiper331Min = __webpack_require__(8);

var _swiper331Min2 = _interopRequireDefault(_swiper331Min);

var _zeptoMin = __webpack_require__(10);

var _zeptoMin2 = _interopRequireDefault(_zeptoMin);

var _touch = __webpack_require__(9);

var _touch2 = _interopRequireDefault(_touch);

__webpack_require__(6);

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);
//# sourceMappingURL=boudle.js.map