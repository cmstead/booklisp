'use strict';

function pipe(...args) {
    const value = args.shift();

    return args.reduce(function (result, action) {
        return action(result);
    }, value);
}

module.exports = {
    pipe: pipe
}

