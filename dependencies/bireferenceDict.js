'use strict';

function bireferenceDict(values) {
    return values.reduce(function (result, value, index) {
        result[value] = index;
        result[index] = value;

        return result;
    }, {});
}

module.exports = bireferenceDict;