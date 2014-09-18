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

                var len = opts.end - opts.start;
                var width = $slider.prop('clientWidth');
                console.log(width);
                var minPoint = getPoint(len, width, opts.start);
                var maxPoint = getPoint(len, width, opts.end);
                var $handle0 = angular.element(handle);
                $track.append($handle0);
                $handle0.css('left', getPoint(len, width, opts.handles[0]) + 'px');

                var startPoint = 0;
                var offset = minPoint;

                var move = function(event) {
                    var movement = offset + event.clientX - startPoint;
                    if (movement >= minPoint && movement <= maxPoint) {
                        $handle0.css('left', movement + 'px');
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
            template: '<div class="slider"><div class="slider-track"><div class="slider-selection"></div></div><div class="tooltip bottom" style="top: 40px; left: 19.5px;"><div class="tooltip-arrow"></div><div class="tooltip-inner">{{ value }}</div></div></div>'
        };
    };

    mod.directive('sliderEasy', [dir]);


}(angular));