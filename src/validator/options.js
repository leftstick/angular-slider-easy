import {isNumber, isPositiveInt} from '../utils/detect';

let validateHandles = function(options) {
    if (options.handles && typeof options.handles[0] !== 'undefined') {
        if (!isNumber(options.handles[0])) {
            throw new Error('handles[0] must be number');
        }
        if (options.handles[0] < options.start || options.handles[0] > options.end) {
            throw new Error('handles[0] must be in [start, end]');
        }
    }
    if (options.handles && typeof options.handles[1] !== 'undefined') {
        if (!isNumber(options.handles[1])) {
            throw new Error('handles[1] must be number');
        }
        if (options.handles[1] < options.start || options.handles[1] > options.end) {
            throw new Error('handles[1] must be in [start, end]');
        }
    }
};

export const validate = function(options) {
    if (!isNumber(options.start)) {
        throw new Error('start must be number');
    }
    if (!isNumber(options.end)) {
        throw new Error('end must be number');
    }
    if (options.start >= options.end) {
        throw new Error('end must be bigger than start');
    }
    if (!isPositiveInt(options.decimals)) {
        throw new Error('decimals must be +int');
    }
    validateHandles(options);
};
