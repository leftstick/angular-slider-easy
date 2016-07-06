import angular from 'angular';

import {validate} from './validator/options';

import {getEvent, preventDefault} from './utils/event';
import {throttle} from './utils/throttle';

import {getMovement, setHintPosition, setValue, setOutput, setSelction} from './style/oper';

import {defaults} from './defaults';

import {refresh, initClick} from './slider';

import './angular-slider-easy.less';

export const sliderEasy = (function() {

    var mod = angular.module('angular-slider-easy', []);

    var dir = function($timeout) {
        return {
            restrict: 'E',
            scope: {
                option: '=',
                value: '='
            },
            link: function($scope, element) {

                var $doc = angular.element(document);
                var $win = angular.element(window);

                var _options = angular.extend({}, defaults, $scope.option);

                validate(_options);

                if (!_options.handles || _options.handles.length === 0) {
                    _options.handles = [];
                    _options.handles[0] = _options.start;
                }

                var offset = 0;
                var activeHandle;
                var $handles = [];
                var handlePos = {};

                var move = function(event) {
                    var e = getEvent(event);
                    var movement = handlePos[activeHandle.attr('id')] + e.clientX - offset;
                    if (movement >= minPoint && movement <= maxPoint) {
                        activeHandle.css('left', movement + 'px');
                        if ($handles[1]) {
                            setSelction($selection, $handles[0], $handles[1]);
                        }
                        setHintPosition($hint, $handles[0], $handles[1]);
                        $scope.$apply(function() {
                            setValue(len, width, _options.decimals, $scope.value, $handles[0], $handles[1], _options);
                            setOutput($scope, _options);
                        });
                    }
                    preventDefault(event);
                };

                var end = function(event) {
                    offset = 0;
                    handlePos[activeHandle.attr('id')] = getMovement(activeHandle);
                    activeHandle = undefined;
                    $doc.off('mousemove touchmove', move);
                    $doc.off('mouseup touchend', end);
                    preventDefault(event);
                };

                var getStart = function(prehandle) {
                    return function(event) {
                        var e = getEvent(event);
                        activeHandle = prehandle;
                        offset = e.clientX;
                        $doc.on('mousemove touchmove', move);
                        $doc.on('mouseup touchend', end);
                        preventDefault(event);
                    };
                };

                let {$track, $hint, $selection, len, width, minPoint, maxPoint} = refresh($scope, element, _options, $handles, handlePos);

                $timeout(angular.noop)
                    .then(function() {
                        var start0 = getStart($handles[0]);
                        var start1 = getStart($handles[1]);
                        initClick($selection, $track, $handles, $hint, len, width, _options, $scope, handlePos);

                        $handles[0].on('mousedown touchstart', start0);
                        if ($handles[1]) {
                            $handles[1].on('mousedown touchstart', start1);
                        }
                    });

                var onResize = throttle(function() {
                    let result = refresh($scope, element, _options, $handles, handlePos);
                    $track = result.$track;
                    $hint = result.$hint;
                    $selection = result.$selection;
                    len = result.len;
                    width = result.width;
                    minPoint = result.minPoint;
                    maxPoint = result.maxPoint;
                }, 500);

                $win.on('resize', onResize);

                $scope.$on('$destroy', function() {
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

}());
