
export const getEvent = function(e) {
    if (e.touches && e.touches.length > 0) {
        return e.touches[0];
    }
    if (window.jQuery
        && window.jQuery.Event
        && e instanceof window.jQuery.Event
        && e.originalEvent.touches
        && e.originalEvent.touches.length > 0) {
        return e.originalEvent.touches[0];
    }
    return e;
};

export const preventDefault = function(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (e.preventDefault) {
        e.preventDefault();
    }
};
