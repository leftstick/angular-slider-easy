export const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

export const isPositiveInt = function(n) {
    return n === parseInt(n) && n === Math.abs(n);
};
