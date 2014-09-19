/**
 * slider-easy is such a directive which generate a slider bar, and
 * helps developer select the desired value
 *
 * @param option[expression]
 *              start[number]: a number of start point
 *              end[number]: a number of end point
 *              handles[array]: init points. if you want a range returned, this 
 *                              has to be set
 *              decimals[int]: the number you want to keep as decimal
 *              outFormatter[function]: the function used to format the text at
 *                                      hint area
 * @author Howard.Zuo
 * @date   Sep 19th, 2014
 *
 **/
(function(angular, document, window) {
    'use strict';

    var mod = angular.module('angular-slider-easy', []);

    var handle = '<div class="slider-handle"></div>';

    var defaults = {
        start: 0,
        end: 100,
        decimals: 0,
        outFormatter: function(value) {
            if (value.point) {
                return 'Point is: ' + value.point;
            } else {
                return 'Range is: ' + (value.end - value.start);
            }
        }
    };


    var _defaults = function(dest, src) {
        var dst = dest || {};
        if (!src || typeof src !== 'object') {
            return dst;
        }
        for (var i in src) {
            if (!dst[i] && typeof src[i] !== undefined & src[i] !== null) {
                dst[i] = src[i];
            }
        }
        return dst;
    };

    var isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var isPositiveInt = function(n) {
        return n === parseInt(n) && n === Math.abs(n);
    };

    var validate = function(options) {
        if (!isNumber(options.start)) {
            throw new Error('start must be number');
        }
        if (!isNumber(options.end)) {
            throw new Error('end must be number');
        }
        if (!isPositiveInt(options.decimals)) {
            throw new Error('decimals must be +int');
        }
        if (options.handles && !isNumber(options.handles[0])) {
            throw new Error('init 0 must be number');
        }
        if (options.handles && options.handles[1] && !isNumber(options.handles[1])) {
            throw new Error('init 1 must be number');
        }
    };

    var getEvent = function(e) {
        if (e.touches && e.touches.length > 0) {
            return e.touches[0];
        }
        return e;
    };

    var preventDefault = function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
    };

    var getMovement = function(element) {
        return parseInt(element.css('left'));
    };

    var getPoint = function(len, width, num) {
        return (num / len) * width;
    };

    var getValue = function(len, width, mov, decimals) {
        return ((mov / width) * len).toFixed(decimals);
    };

    var setHintPosition = function($hint, $handle0, $handle1) {
        var handle0 = getMovement($handle0);
        if (!$handle1) {
            $hint.css('left', (handle0 - 3 - $hint.prop('clientWidth') / 2) + 'px');
            return;
        }
        var handle1 = getMovement($handle1);
        var max = Math.max(handle0, handle1);
        var min = Math.min(handle0, handle1);
        $hint.css('left', ((max - min) / 2 + min - 3 - $hint.prop('clientWidth') / 2) + 'px');
    };

    var setValue = function(len, width, decimals, value, $handle0, $handle1) {
        if ($handle1) {
            setRange(len, width, decimals, value, $handle0, $handle1);
        } else {
            value.point = getValue(len, width, getMovement($handle0), decimals);
        }
    };

    var setOutput = function($scope, value, outFormatter) {
        $scope.output = outFormatter(value);
    };

    var setSelction = function($selection, $handle0, $handle1) {
        var handle0 = getMovement($handle0);
        var handle1 = getMovement($handle1);
        var max = Math.max(handle0, handle1);
        var min = Math.min(handle0, handle1);
        var wid = max - min;
        $selection.css('left', min + 'px').css('width', wid + 'px');
    };

    var setRange = function(len, width, decimals, value, $handle0, $handle1) {
        var handle0 = getMovement($handle0);
        var handle1 = getMovement($handle1);
        var max = Math.max(handle0, handle1);
        var min = Math.min(handle0, handle1);
        value.start = getValue(len, width, min, decimals);
        value.end = getValue(len, width, max, decimals);
    };

    var dir = function() {
        return {
            restrict: 'E',
            scope: {
                option: '=',
                value: '='
            },
            link: function($scope, element) {

                var $doc = angular.element(document);
                var $win = angular.element(window);

                var _options = _defaults($scope.option, defaults);

                validate(_options);

                if (!_options.handles) {
                    _options.handles = [];
                    _options.handles[0] = _options.start;
                }

                var $slider, $track, $hint, $selection;
                var len, width;
                var minPoint, maxPoint;
                var $handle0, $handle1;
                var initPoint0, initPoint1;

                var offset = 0;
                var activeHandle;
                var handlePos = {};

                var refresh = function() {
                    $slider = angular.element(element.children()[0]);
                    $track = angular.element($slider.children()[0]);
                    $hint = angular.element($slider.children()[1]);
                    $selection = angular.element($track.children()[0]);

                    len = _options.end - _options.start;
                    width = $slider.prop('clientWidth');

                    minPoint = getPoint(len, width, _options.start);
                    maxPoint = getPoint(len, width, _options.end);

                    if (!$handle0) {
                        $handle0 = angular.element(handle);
                        $track.append($handle0);
                        $handle0.attr('id', 'handle0');
                    }
                    initPoint0 = getPoint(len, width, _options.handles[0]);
                    if (typeof $scope.value.start !== 'undefined') {
                        $handle0.css('left', getPoint(len, width, $scope.value.start) + 'px');
                        handlePos.handle0 = getPoint(len, width, $scope.value.start);
                    } else if (typeof $scope.value.point !== 'undefined') {
                        $handle0.css('left', getPoint(len, width, $scope.value.point) + 'px');
                        handlePos.handle0 = getPoint(len, width, $scope.value.point);
                    } else {
                        $handle0.css('left', initPoint0 + 'px');
                        handlePos.handle0 = initPoint0;
                    }
                    setHintPosition($hint, $handle0);

                    if (_options.handles[1]) {
                        if (!$handle1) {
                            $handle1 = angular.element(handle);
                            $track.append($handle1);
                            $handle1.attr('id', 'handle1');
                        }
                        initPoint1 = getPoint(len, width, _options.handles[1]);
                        if (typeof $scope.value.end !== 'undefined') {
                            $handle1.css('left', getPoint(len, width, $scope.value.end) + 'px');
                            handlePos.handle1 = getPoint(len, width, $scope.value.end);
                        } else {
                            $handle1.css('left', initPoint1 + 'px');
                            handlePos.handle1 = initPoint1;
                        }
                        setHintPosition($hint, $handle0, $handle1);
                        setSelction($selection, $handle0, $handle1);
                    }
                    setValue(len, width, _options.decimals, $scope.value, $handle0, $handle1);
                    setOutput($scope, $scope.value, _options.outFormatter);
                };


                refresh();

                var move = function(event) {
                    var e = getEvent(event);
                    var movement = handlePos[activeHandle.attr('id')] + e.clientX - offset;
                    if (movement >= minPoint && movement <= maxPoint) {
                        activeHandle.css('left', movement + 'px');
                        if ($handle1) {
                            setSelction($selection, $handle0, $handle1);
                        }
                        setHintPosition($hint, $handle0, $handle1);
                        $scope.$apply(function() {
                            setValue(len, width, _options.decimals, $scope.value, $handle0, $handle1);
                            setOutput($scope, $scope.value, _options.outFormatter);
                        });
                    }
                    preventDefault(e);
                };

                var end = function(event) {
                    var e = getEvent(event);
                    offset = 0;
                    handlePos[activeHandle.attr('id')] = getMovement(activeHandle);
                    activeHandle = undefined;
                    $doc.off('mousemove touchmove', move);
                    $doc.off('mouseup touchend', end);
                    preventDefault(e);
                };

                var getStart = function(handle) {
                    return function(event) {
                        var e = getEvent(event);
                        activeHandle = handle;
                        offset = e.clientX;
                        $doc.on('mousemove touchmove', move);
                        $doc.on('mouseup touchend', end);
                        preventDefault(e);
                    };
                };

                var start0 = getStart($handle0);
                var start1 = getStart($handle1);

                $handle0.on('mousedown touchstart', start0);
                if ($handle1) {
                    $handle1.on('mousedown touchstart', start1);
                }

                $win.on('resize', refresh);

                $scope.$on('$destroy', function() {
                    $handle0.off('mousedown touchstart', start0);
                    if ($handle1) {
                        $handle1.off('mousedown touchstart', start1);
                    }
                    $doc.off('mousemove touchmove', move);
                    $doc.off('mouseup touchend', end);
                });
            },
            template: '<div class="slider"><div class="slider-track"><div class="slider-selection"></div></div><div class="hint"><div class="hint-arrow"></div><div class="hint-inner">{{ output }}</div></div></div>'
        };
    };

    mod.directive('sliderEasy', [dir]);


}(angular, document, window));