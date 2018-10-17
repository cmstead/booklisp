'use strict';

const parser = require('../interpreter/parser');
const fs = require('fs');

module.exports = {
    filemeta: function(...args) {
        const metadata = this.dict.apply(this, args);
        return this._get('dict')(['filemeta', metadata]);
    },

    title: function (value) {
        return this._get('tag')('title', value);
    },

    subtitle: function (value) {
        return this._get('tag')('subtitle', value);
    },

    authors: function (value) {
        return this._get('tag')('authors', value);
    }
}