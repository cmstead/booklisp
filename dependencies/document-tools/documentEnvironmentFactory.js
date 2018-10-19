'use strict';

const coreEnvironmentFactory = require('../core/coreEnvironmentFactory');
const coreDefinitions = require('../core/coreDefinitions');


function buildBaseEnvironment() {
    return coreEnvironmentFactory()
        ._merge(coreDefinitions);
}

module.exports = {
    buildBaseEnvironment: buildBaseEnvironment
}
