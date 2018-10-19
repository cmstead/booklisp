'use strict';

const coreEnvironmentFactory = require('../core/coreEnvironmentFactory');
const coreDefinitions = require('../core/coreDefinitions');
const extensionDefinitions = require('./extensionDefinitions');

const filemetaUtils = require('./filemetaUtils');
const documentUtils = require('./documentUtils');

function render(parsedDocument) {
    const documentEnvironment = coreEnvironmentFactory()
        ._merge(coreDefinitions)
        ._merge(extensionDefinitions);

    const evaluatedDocument = parsedDocument.evaluate(documentEnvironment);
    const documentMeta = filemetaUtils.findFilemeta({ sectionContent: evaluatedDocument });

    const titleString = documentUtils.buildTitle('document', documentMeta);
    const bodyString = evaluatedDocument
        .reduce(function (result, contentValue) {
            const bodyValues = typeof contentValue === 'string'
                ? [contentValue]
                : contentValue.filter(value => typeof value === 'string');
            return result.concat(bodyValues);
        }, [])
        .join('\n');

    return `
${titleString}
${bodyString}
    `;
}

module.exports = {
    render: render
}