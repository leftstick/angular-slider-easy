
export const defaults = {
    start: 0,
    end: 100,
    decimals: 0,
    outFormatter: function(value, decimals) {
        if (value.point) {
            return 'Point is: ' + value.point;
        }
        return 'Range is: ' + (value.end - value.start).toFixed(decimals);
    }
};
