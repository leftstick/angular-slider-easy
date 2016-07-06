import angular from 'angular';

import {getEvent} from './utils/event';

import {setValue, getPoint, getMovement, setHintPosition, setSelction, setOutput} from './style/oper';

const handle = '<div class="slider-handle"></div>';

const retrieveElms = function(element) {
    let $slider = angular.element(element.children()[0]);
    let $track = angular.element($slider.children()[0]);
    let $hint = angular.element($slider.children()[1]);
    let $selection = angular.element($track.children()[0]);
    return {
        $slider,
        $track,
        $hint,
        $selection
    };
};

const initHandle0 = function(_options, $track, len, width, $hint, $scope, handlePos, $handles) {
    if (!$handles[0]) {
        $handles[0] = angular.element(handle);
        $track.append($handles[0]);
        $handles[0].attr('id', 'handle0');
    }
    let initPoint0 = getPoint(len, width, _options.handles[0] - _options.start);

    if (typeof $scope.value.start !== 'undefined') {
        $handles[0].css('left', getPoint(len, width, $scope.value.start - _options.start) + 'px');
        handlePos.handle0 = getPoint(len, width, $scope.value.start - _options.start);
    } else if (typeof $scope.value.point !== 'undefined') {
        $handles[0].css('left', getPoint(len, width, $scope.value.point - _options.start) + 'px');
        handlePos.handle0 = getPoint(len, width, $scope.value.point);
    } else {
        $handles[0].css('left', initPoint0 + 'px');
        handlePos.handle0 = initPoint0;
    }
    setHintPosition($hint, $handles[0]);
};

const initHandle1 = function(_options, $track, $selection, len, width, $hint, $scope, handlePos, $handles) {
    let initPoint1;
    if (_options.handles[1]) {
        if (!$handles[1]) {
            $handles[1] = angular.element(handle);
            $track.append($handles[1]);
            $handles[1].attr('id', 'handle1');
        }
        initPoint1 = getPoint(len, width, _options.handles[1] - _options.start);
        if (typeof $scope.value.end !== 'undefined') {
            $handles[1].css('left', getPoint(len, width, $scope.value.end - _options.start) + 'px');
            handlePos.handle1 = getPoint(len, width, $scope.value.end - _options.start);
        } else {
            $handles[1].css('left', initPoint1 + 'px');
            handlePos.handle1 = initPoint1;
        }
        setHintPosition($hint, $handles[0], $handles[1]);
        setSelction($selection, $handles[0], $handles[1]);
    }
};

export const refresh = function($scope, element, _options, $handles, handlePos) {
    let {$slider, $track, $hint, $selection} = retrieveElms(element);

    let len = _options.end - _options.start;
    let width = $slider.prop('clientWidth');

    let minPoint = getPoint(len, width, 0);
    let maxPoint = getPoint(len, width, _options.end - _options.start);

    initHandle0(_options, $track, len, width, $hint, $scope, handlePos, $handles);

    initHandle1(_options, $track, $selection, len, width, $hint, $scope, handlePos, $handles);

    setValue(len, width, _options.decimals, $scope.value, $handles[0], $handles[1], _options);
    setOutput($scope, _options);

    return {
        $track,
        $hint,
        $selection,
        len,
        width,
        minPoint,
        maxPoint
    };
};

export const initClick = function($selection, $track, $handles, $hint, len, width, _options, $scope, handlePos) {
    $track.on('click', function(event) {
        if (!event.target.classList.contains('slider-track') && !event.target.classList.contains('slider-selection')) {
            return;
        }
        var e = getEvent(event);
        var target = event.target.classList.contains('slider-track') ? event.target : event.target.parentNode;
        var clickedPosition = e.clientX - target.getBoundingClientRect().left;
        if ($handles.length === 1) {
            $handles[0].css('left', clickedPosition + 'px');
            setHintPosition($hint, $handles[0], $handles[1]);
            handlePos.handle0 = getMovement($handles[0]);
            $scope.$apply(function() {
                setValue(len, width, _options.decimals, $scope.value, $handles[0], $handles[1], _options);
                setOutput($scope, _options);
            });
        } else {
            var rightHandle = $handles.reduce((pre, $handle) => getMovement($handle) > getMovement(pre) ? $handle : pre);
            var leftHandle = $handles.reduce((pre, $handle) => getMovement($handle) < getMovement(pre) ? $handle : pre);
            if (getMovement(rightHandle) < clickedPosition) {
                rightHandle.css('left', clickedPosition + 'px');
                handlePos[rightHandle.attr('id')] = getMovement(rightHandle);
            } else if (getMovement(leftHandle) > clickedPosition) {
                leftHandle.css('left', clickedPosition + 'px');
                handlePos[leftHandle.attr('id')] = getMovement(leftHandle);
            } else if (getMovement(rightHandle) - clickedPosition < clickedPosition - getMovement(leftHandle)) {
                rightHandle.css('left', clickedPosition + 'px');
                handlePos[rightHandle.attr('id')] = getMovement(rightHandle);
            } else if (getMovement(rightHandle) - clickedPosition >= clickedPosition - getMovement(leftHandle)) {
                leftHandle.css('left', clickedPosition + 'px');
                handlePos[leftHandle.attr('id')] = getMovement(leftHandle);
            }
            setHintPosition($hint, $handles[0], $handles[1]);
            $scope.$apply(function() {
                setValue(len, width, _options.decimals, $scope.value, $handles[0], $handles[1], _options);
                setOutput($scope, _options);
            });
            setSelction($selection, $handles[0], $handles[1]);
        }
    });
};
