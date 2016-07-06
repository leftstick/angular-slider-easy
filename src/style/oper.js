
export const getMovement = function(element) {
    return parseInt(element.css('left'));
};

export const getPoint = function(len, width, num) {
    return (num / len) * width;
};

const getValue = function(len, width, mov, decimals, opts) {
    return ((mov / width) * len + opts.start).toFixed(decimals);
};

const setRange = function(len, width, decimals, value, $handle0, $handle1, opts) {
    var handle0 = getMovement($handle0);
    var handle1 = getMovement($handle1);
    var max = Math.max(handle0, handle1);
    var min = Math.min(handle0, handle1);
    value.start = getValue(len, width, min, decimals, opts);
    value.end = getValue(len, width, max, decimals, opts);
};

export const setHintPosition = function($hint, $handle0, $handle1) {
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

export const setValue = function(len, width, decimals, value, $handle0, $handle1, opts) {
    if ($handle1) {
        return setRange(len, width, decimals, value, $handle0, $handle1, opts);
    }
    value.point = getValue(len, width, getMovement($handle0), decimals, opts);
};

export const setOutput = function($scope, _options) {
    $scope.output = _options.outFormatter($scope.value);
};

export const setSelction = function($selection, $handle0, $handle1) {
    var handle0 = getMovement($handle0);
    var handle1 = getMovement($handle1);
    var max = Math.max(handle0, handle1);
    var min = Math.min(handle0, handle1);
    var wid = max - min;
    $selection.css('left', min + 'px').css('width', wid + 'px');
};
