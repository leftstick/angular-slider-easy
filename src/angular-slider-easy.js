/**
 * slider-easy is such a directive which generate a slider bar, and
 * helps developer select the desired value
 *
 *
 *
 *
 *
 **/
(function(angular) {
    'use strict';

    var mod = angular.module('angular-slider-easy', []);

    var handle = '<div class="slider-handle"></div>';

    var defaults = {
        start: 0,
        end: 100,
        decimals: 0,
        handles: [0]
    };


    var _defaults = function(dest, src) {
        var dst = dest || {};
        if (!src || typeof src !== 'object') {
            return dst;
        }
        for (var i in src) {
            if (!dst[i]) {
                dst[i] = src[i];
            }
        }
        return dst;
    };

    var getPoint = function(len, width, num) {
        return (num / len) * width;
    };

    var getValue = function(len, width, mov, decimals) {
        return ((mov / width) * len).toFixed(decimals);
    };

    var setHintPosition = function($hint, $handle0, $handle1) {
        var handle0 = parseInt($handle0.css('left'));
        if (!$handle1) {
            $hint.css('left', (handle0 - 3 - $hint.prop('clientWidth') / 2) + 'px');
            return;
        }
        var handle1 = parseInt($handle1.css('left'));
        var max = Math.max(handle0, handle1);
        var min = Math.min(handle0, handle1);
        $hint.css('left', ((max - min) / 2 + min - 3 - $hint.prop('clientWidth') / 2) + 'px');
    };

    var setSelction = function($selection, $handle0, $handle1) {
        var handle0 = parseInt($handle0.css('left'));
        var handle1 = parseInt($handle1.css('left'));
        var max = Math.max(handle0, handle1);
        var min = Math.min(handle0, handle1);
        var wid = max - min;
        $selection.css('left', min + 'px').css('width', wid + 'px');
    };

    var dir = function() {
        return {
            restrict: 'E',
            scope: {
                option: '=',
                value: '='
            },
            link: function($scope, element, attr) {

                var $doc = angular.element(document);

                var opts = _defaults($scope.option, defaults);

                var $slider = angular.element(element.children()[0]);
                var $track = angular.element($slider.children()[0]);
                var $hint = angular.element($slider.children()[1]);
                var $selection = angular.element($track.children()[0]);

                var len = opts.end - opts.start;
                var width = $slider.prop('clientWidth');

                var minPoint = getPoint(len, width, opts.start);
                var maxPoint = getPoint(len, width, opts.end);

                var $handle0 = angular.element(handle);
                $track.append($handle0);
                var initPoint0 = getPoint(len, width, opts.handles[0]);
                $handle0.css('left', initPoint0 + 'px');
                setHintPosition($hint, $handle0);

                var $handle1;
                if (opts.handles[1]) {
                    $handle1 = angular.element(handle);
                    $track.append($handle1);
                    var initPoint1 = getPoint(len, width, opts.handles[1]);
                    $handle1.css('left', initPoint1 + 'px');
                    setHintPosition($hint, $handle0, $handle1);
                    setSelction($selection, $handle0, $handle1);
                }


                var startPoint = 0;
                var offset = initPoint0;

                var move = function(event) {
                    var movement = offset + event.clientX - startPoint;
                    if (movement >= minPoint && movement <= maxPoint) {
                        $handle0.css('left', movement + 'px');
                        setHintPosition($hint, $handle0);
                        if ($handle1) {
                            setSelction($selection, $handle0, $handle1);
                            setHintPosition($hint, $handle0, $handle1);
                        }
                        $scope.$apply(function() {
                            $scope.value.point = getValue(len, width, movement, opts.decimals);
                        });
                    }
                    event.stopPropagation();
                    event.preventDefault();
                };

                var end = function() {
                    startPoint = 0;
                    offset = parseInt($handle0.css('left'));
                    $doc.off('mousemove', move);
                    $doc.off('mouseup', end);
                    event.stopPropagation();
                    event.preventDefault();
                };


                var start = function(event) {
                    startPoint = event.clientX;
                    $doc.on('mousemove', move);
                    $doc.on('mouseup', end);
                    event.stopPropagation();
                    event.preventDefault();
                };

                $handle0.on('mousedown', start);
            },
            template: '<div class="slider"><div class="slider-track"><div class="slider-selection"></div></div><div class="hint"><div class="hint-arrow"></div><div class="hint-inner">{{ value }}</div></div></div>'
        };
    };

    mod.directive('sliderEasy', [dir]);


}(angular));