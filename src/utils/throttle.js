

export const throttle = function(func, wait) {
    var last,
        timer;
    return function() {
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
        timer = setTimeout(function() {
            last = new Date().getTime();
            func.apply(_this, args);
        }, wait + last - now);
    };
};
