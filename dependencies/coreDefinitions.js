'use strict';

module.exports = {
    "define!": function(key, value) {
        this._define(key, () => value);
    },

    dict: function(...args) {
        return args.reduce(function(fileMetadata, metaTuple){
            const key = metaTuple[0];
            const value = metaTuple[1];

            fileMetadata[key] = value;

            return fileMetadata;
        }, {});
    },

    tag: function(key, value) {
        return [key, value];
    }
}