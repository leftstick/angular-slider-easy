(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("angular")) : factory(root["angular"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sliderEasy = undefined;
	
	var _angular = __webpack_require__(2);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _options2 = __webpack_require__(3);
	
	var _event = __webpack_require__(5);
	
	var _throttle = __webpack_require__(6);
	
	var _oper = __webpack_require__(7);
	
	var _defaults = __webpack_require__(8);
	
	var _slider = __webpack_require__(9);
	
	__webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sliderEasy = exports.sliderEasy = function () {
	
	    var mod = _angular2.default.module('angular-slider-easy', []);
	
	    var dir = function dir($timeout) {
	        return {
	            restrict: 'E',
	            scope: {
	                option: '=',
	                value: '='
	            },
	            link: function link($scope, element) {
	
	                var $doc = _angular2.default.element(document);
	                var $win = _angular2.default.element(window);
	
	                var _options = _angular2.default.extend({}, _defaults.defaults, $scope.option);
	
	                (0, _options2.validate)(_options);
	
	                if (!_options.handles || _options.handles.length === 0) {
	                    _options.handles = [];
	                    _options.handles[0] = _options.start;
	                }
	
	                var offset = 0;
	                var activeHandle;
	                var $handles = [];
	                var handlePos = {};
	
	                var move = function move(event) {
	                    var e = (0, _event.getEvent)(event);
	                    var movement = handlePos[activeHandle.attr('id')] + e.clientX - offset;
	                    if (movement >= minPoint && movement <= maxPoint) {
	                        activeHandle.css('left', movement + 'px');
	                        if ($handles[1]) {
	                            (0, _oper.setSelction)($selection, $handles[0], $handles[1]);
	                        }
	                        (0, _oper.setHintPosition)($hint, $handles[0], $handles[1]);
	                        $scope.$apply(function () {
	                            (0, _oper.setValue)(len, width, _options.decimals, $scope.value, $handles[0], $handles[1], _options);
	                            (0, _oper.setOutput)($scope, _options);
	                        });
	                    }
	                    (0, _event.preventDefault)(event);
	                };
	
	                var end = function end(event) {
	                    offset = 0;
	                    handlePos[activeHandle.attr('id')] = (0, _oper.getMovement)(activeHandle);
	                    activeHandle = undefined;
	                    $doc.off('mousemove touchmove', move);
	                    $doc.off('mouseup touchend', end);
	                    (0, _event.preventDefault)(event);
	                };
	
	                var getStart = function getStart(prehandle) {
	                    return function (event) {
	                        var e = (0, _event.getEvent)(event);
	                        activeHandle = prehandle;
	                        offset = e.clientX;
	                        $doc.on('mousemove touchmove', move);
	                        $doc.on('mouseup touchend', end);
	                        (0, _event.preventDefault)(event);
	                    };
	                };
	
	                var _refresh = (0, _slider.refresh)($scope, element, _options, $handles, handlePos);
	
	                var $track = _refresh.$track;
	                var $hint = _refresh.$hint;
	                var $selection = _refresh.$selection;
	                var len = _refresh.len;
	                var width = _refresh.width;
	                var minPoint = _refresh.minPoint;
	                var maxPoint = _refresh.maxPoint;
	
	
	                $timeout(_angular2.default.noop).then(function () {
	                    var start0 = getStart($handles[0]);
	                    var start1 = getStart($handles[1]);
	                    (0, _slider.initClick)($selection, $track, $handles, $hint, len, width, _options, $scope, handlePos);
	
	                    $handles[0].on('mousedown touchstart', start0);
	                    if ($handles[1]) {
	                        $handles[1].on('mousedown touchstart', start1);
	                    }
	                });
	
	                var onResize = (0, _throttle.throttle)(function () {
	                    var result = (0, _slider.refresh)($scope, element, _options, $handles, handlePos);
	                    $track = result.$track;
	                    $hint = result.$hint;
	                    $selection = result.$selection;
	                    len = result.len;
	                    width = result.width;
	                    minPoint = result.minPoint;
	                    maxPoint = result.maxPoint;
	                }, 500);
	
	                $win.on('resize', onResize);
	
	                $scope.$on('$destroy', function () {
	                    $handles[0].off('mousedown touchstart', start0);
	                    if ($handles[1]) {
	                        $handles[1].off('mousedown touchstart', start1);
	                    }
	                    $doc.off('mousemove touchmove', move);
	                    $doc.off('mouseup touchend', end);
	                });
	            },
	            template: '<div class="slider"><div class="slider-track"><div class="slider-selection"></div></div><div class="hint"><div class="hint-arrow"></div><div class="hint-inner">{{ output }}</div></div></div>'
	        };
	    };
	
	    mod.directive('sliderEasy', ['$timeout', dir]);
	
	    return 'angular-slider-easy';
	}();

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.validate = undefined;
	
	var _detect = __webpack_require__(4);
	
	var validateHandles = function validateHandles(options) {
	    if (options.handles && typeof options.handles[0] !== 'undefined') {
	        if (!(0, _detect.isNumber)(options.handles[0])) {
	            throw new Error('handles[0] must be number');
	        }
	        if (options.handles[0] < options.start || options.handles[0] > options.end) {
	            throw new Error('handles[0] must be in [start, end]');
	        }
	    }
	    if (options.handles && typeof options.handles[1] !== 'undefined') {
	        if (!(0, _detect.isNumber)(options.handles[1])) {
	            throw new Error('handles[1] must be number');
	        }
	        if (options.handles[1] < options.start || options.handles[1] > options.end) {
	            throw new Error('handles[1] must be in [start, end]');
	        }
	    }
	};
	
	var validate = exports.validate = function validate(options) {
	    if (!(0, _detect.isNumber)(options.start)) {
	        throw new Error('start must be number');
	    }
	    if (!(0, _detect.isNumber)(options.end)) {
	        throw new Error('end must be number');
	    }
	    if (options.start >= options.end) {
	        throw new Error('end must be bigger than start');
	    }
	    if (!(0, _detect.isPositiveInt)(options.decimals)) {
	        throw new Error('decimals must be +int');
	    }
	    validateHandles(options);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var isNumber = exports.isNumber = function isNumber(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	};
	
	var isPositiveInt = exports.isPositiveInt = function isPositiveInt(n) {
	    return n === parseInt(n) && n === Math.abs(n);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var getEvent = exports.getEvent = function getEvent(e) {
	    if (e.touches && e.touches.length > 0) {
	        return e.touches[0];
	    }
	    if (window.jQuery && window.jQuery.Event && e instanceof window.jQuery.Event && e.originalEvent.touches && e.originalEvent.touches.length > 0) {
	        return e.originalEvent.touches[0];
	    }
	    return e;
	};
	
	var preventDefault = exports.preventDefault = function preventDefault(e) {
	    if (e.stopPropagation) {
	        e.stopPropagation();
	    }
	    if (e.preventDefault) {
	        e.preventDefault();
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var throttle = exports.throttle = function throttle(func, wait) {
	    var last, timer;
	    return function () {
	        var args = Array.prototype.slice.call(arguments);
	        var _this = this,
	            now = new Date().getTime();
	        if (typeof last === 'undefined') {
	            last = now;
	            return func.apply(_this, args);
	        }
	        clearTimeout(timer);
	        if (now - last > wait) {
	            last = new Date().getTime();
	            return func.apply(_this, args);
	        }
	        timer = setTimeout(function () {
	            last = new Date().getTime();
	            func.apply(_this, args);
	        }, wait + last - now);
	    };
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var getMovement = exports.getMovement = function getMovement(element) {
	    return parseInt(element.css('left'));
	};
	
	var getPoint = exports.getPoint = function getPoint(len, width, num) {
	    return num / len * width;
	};
	
	var getValue = function getValue(len, width, mov, decimals, opts) {
	    return (mov / width * len + opts.start).toFixed(decimals);
	};
	
	var setRange = function setRange(len, width, decimals, value, $handle0, $handle1, opts) {
	    var handle0 = getMovement($handle0);
	    var handle1 = getMovement($handle1);
	    var max = Math.max(handle0, handle1);
	    var min = Math.min(handle0, handle1);
	    value.start = getValue(len, width, min, decimals, opts);
	    value.end = getValue(len, width, max, decimals, opts);
	};
	
	var setHintPosition = exports.setHintPosition = function setHintPosition($hint, $handle0, $handle1) {
	    var handle0 = getMovement($handle0);
	    if (!$handle1) {
	        $hint.css('left', handle0 - 3 - $hint.prop('clientWidth') / 2 + 'px');
	        return;
	    }
	    var handle1 = getMovement($handle1);
	    var max = Math.max(handle0, handle1);
	    var min = Math.min(handle0, handle1);
	    $hint.css('left', (max - min) / 2 + min - 3 - $hint.prop('clientWidth') / 2 + 'px');
	};
	
	var setValue = exports.setValue = function setValue(len, width, decimals, value, $handle0, $handle1, opts) {
	    if ($handle1) {
	        return setRange(len, width, decimals, value, $handle0, $handle1, opts);
	    }
	    value.point = getValue(len, width, getMovement($handle0), decimals, opts);
	};
	
	var setOutput = exports.setOutput = function setOutput($scope, _options) {
	    $scope.output = _options.outFormatter($scope.value);
	};
	
	var setSelction = exports.setSelction = function setSelction($selection, $handle0, $handle1) {
	    var handle0 = getMovement($handle0);
	    var handle1 = getMovement($handle1);
	    var max = Math.max(handle0, handle1);
	    var min = Math.min(handle0, handle1);
	    var wid = max - min;
	    $selection.css('left', min + 'px').css('width', wid + 'px');
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var defaults = exports.defaults = {
	    start: 0,
	    end: 100,
	    decimals: 0,
	    outFormatter: function outFormatter(value, decimals) {
	        if (value.point) {
	            return 'Point is: ' + value.point;
	        }
	        return 'Range is: ' + (value.end - value.start).toFixed(decimals);
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initClick = exports.refresh = undefined;
	
	var _angular = __webpack_require__(2);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _event = __webpack_require__(5);
	
	var _oper = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var handle = '<div class="slider-handle"></div>';
	
	var retrieveElms = function retrieveElms(element) {
	    var $slider = _angular2.default.element(element.children()[0]);
	    var $track = _angular2.default.element($slider.children()[0]);
	    var $hint = _angular2.default.element($slider.children()[1]);
	    var $selection = _angular2.default.element($track.children()[0]);
	    return {
	        $slider: $slider,
	        $track: $track,
	        $hint: $hint,
	        $selection: $selection
	    };
	};
	
	var initHandle0 = function initHandle0(_options, $track, len, width, $hint, $scope, handlePos, $handles) {
	    if (!$handles[0]) {
	        $handles[0] = _angular2.default.element(handle);
	        $track.append($handles[0]);
	        $handles[0].attr('id', 'handle0');
	    }
	    var initPoint0 = (0, _oper.getPoint)(len, width, _options.handles[0] - _options.start);
	
	    if (typeof $scope.value.start !== 'undefined') {
	        $handles[0].css('left', (0, _oper.getPoint)(len, width, $scope.value.start - _options.start) + 'px');
	        handlePos.handle0 = (0, _oper.getPoint)(len, width, $scope.value.start - _options.start);
	    } else if (typeof $scope.value.point !== 'undefined') {
	        $handles[0].css('left', (0, _oper.getPoint)(len, width, $scope.value.point - _options.start) + 'px');
	        handlePos.handle0 = (0, _oper.getPoint)(len, width, $scope.value.point);
	    } else {
	        $handles[0].css('left', initPoint0 + 'px');
	        handlePos.handle0 = initPoint0;
	    }
	    (0, _oper.setHintPosition)($hint, $handles[0]);
	};
	
	var initHandle1 = function initHandle1(_options, $track, $selection, len, width, $hint, $scope, handlePos, $handles) {
	    var initPoint1 = void 0;
	    if (_options.handles[1]) {
	        if (!$handles[1]) {
	            $handles[1] = _angular2.default.element(handle);
	            $track.append($handles[1]);
	            $handles[1].attr('id', 'handle1');
	        }
	        initPoint1 = (0, _oper.getPoint)(len, width, _options.handles[1] - _options.start);
	        if (typeof $scope.value.end !== 'undefined') {
	            $handles[1].css('left', (0, _oper.getPoint)(len, width, $scope.value.end - _options.start) + 'px');
	            handlePos.handle1 = (0, _oper.getPoint)(len, width, $scope.value.end - _options.start);
	        } else {
	            $handles[1].css('left', initPoint1 + 'px');
	            handlePos.handle1 = initPoint1;
	        }
	        (0, _oper.setHintPosition)($hint, $handles[0], $handles[1]);
	        (0, _oper.setSelction)($selection, $handles[0], $handles[1]);
	    }
	};
	
	var refresh = exports.refresh = function refresh($scope, element, _options, $handles, handlePos) {
	    var _retrieveElms = retrieveElms(element);
	
	    var $slider = _retrieveElms.$slider;
	    var $track = _retrieveElms.$track;
	    var $hint = _retrieveElms.$hint;
	    var $selection = _retrieveElms.$selection;
	
	
	    var len = _options.end - _options.start;
	    var width = $slider.prop('clientWidth');
	
	    var minPoint = (0, _oper.getPoint)(len, width, 0);
	    var maxPoint = (0, _oper.getPoint)(len, width, _options.end - _options.start);
	
	    initHandle0(_options, $track, len, width, $hint, $scope, handlePos, $handles);
	
	    initHandle1(_options, $track, $selection, len, width, $hint, $scope, handlePos, $handles);
	
	    (0, _oper.setValue)(len, width, _options.decimals, $scope.value, $handles[0], $handles[1], _options);
	    (0, _oper.setOutput)($scope, _options);
	
	    return {
	        $track: $track,
	        $hint: $hint,
	        $selection: $selection,
	        len: len,
	        width: width,
	        minPoint: minPoint,
	        maxPoint: maxPoint
	    };
	};
	
	var initClick = exports.initClick = function initClick($selection, $track, $handles, $hint, len, width, _options, $scope, handlePos) {
	    $track.on('click', function (event) {
	        if (!event.target.classList.contains('slider-track') && !event.target.classList.contains('slider-selection')) {
	            return;
	        }
	        var e = (0, _event.getEvent)(event);
	        var target = event.target.classList.contains('slider-track') ? event.target : event.target.parentNode;
	        var clickedPosition = e.clientX - target.getBoundingClientRect().left;
	        if ($handles.length === 1) {
	            $handles[0].css('left', clickedPosition + 'px');
	            (0, _oper.setHintPosition)($hint, $handles[0], $handles[1]);
	            handlePos.handle0 = (0, _oper.getMovement)($handles[0]);
	            $scope.$apply(function () {
	                (0, _oper.setValue)(len, width, _options.decimals, $scope.value, $handles[0], $handles[1], _options);
	                (0, _oper.setOutput)($scope, _options);
	            });
	        } else {
	            var rightHandle = $handles.reduce(function (pre, $handle) {
	                return (0, _oper.getMovement)($handle) > (0, _oper.getMovement)(pre) ? $handle : pre;
	            });
	            var leftHandle = $handles.reduce(function (pre, $handle) {
	                return (0, _oper.getMovement)($handle) < (0, _oper.getMovement)(pre) ? $handle : pre;
	            });
	            if ((0, _oper.getMovement)(rightHandle) < clickedPosition) {
	                rightHandle.css('left', clickedPosition + 'px');
	                handlePos[rightHandle.attr('id')] = (0, _oper.getMovement)(rightHandle);
	            } else if ((0, _oper.getMovement)(leftHandle) > clickedPosition) {
	                leftHandle.css('left', clickedPosition + 'px');
	                handlePos[leftHandle.attr('id')] = (0, _oper.getMovement)(leftHandle);
	            } else if ((0, _oper.getMovement)(rightHandle) - clickedPosition < clickedPosition - (0, _oper.getMovement)(leftHandle)) {
	                rightHandle.css('left', clickedPosition + 'px');
	                handlePos[rightHandle.attr('id')] = (0, _oper.getMovement)(rightHandle);
	            } else if ((0, _oper.getMovement)(rightHandle) - clickedPosition >= clickedPosition - (0, _oper.getMovement)(leftHandle)) {
	                leftHandle.css('left', clickedPosition + 'px');
	                handlePos[leftHandle.attr('id')] = (0, _oper.getMovement)(leftHandle);
	            }
	            (0, _oper.setHintPosition)($hint, $handles[0], $handles[1]);
	            $scope.$apply(function () {
	                (0, _oper.setValue)(len, width, _options.decimals, $scope.value, $handles[0], $handles[1], _options);
	                (0, _oper.setOutput)($scope, _options);
	            });
	            (0, _oper.setSelction)($selection, $handles[0], $handles[1]);
	        }
	    });
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;