'use strict';

const coreEnvironmentFactory = require('../core/coreEnvironmentFactory');
const coreDefinitions = require('../core/coreDefinitions');
const extensionDefinitions = require('./extensionDefinitions');

const filemetaUtils = require('./filemetaUtils');
const documentUtils = require('./documentUtils');
const contentUtils = require('./contentUtils');

function evaluateUnrenderedContent(value) {
    if (typeof value === 'string') {
        return value;
    } else if (typeof value === 'object' && value !== null && typeof value.sectionType === 'string') {
        return contentUtils.buildFileContent(value);
    } else {
        return null;
    }
}

function isContentString(contentValue) {
    return typeof contentValue === 'string'
}

function appendContentValue(result, contentValue) {
    let bodyValues;

    if (typeof contentValue === 'string') {
        bodyValues = [contentValue]
    } else {
        bodyValues = contentValue
            .map(evaluateUnrenderedContent)
            .filter(isContentString);
    }

    return result.concat(bodyValues);
}

function render(parsedDocument) {
    const documentEnvironment = coreEnvironmentFactory()
        ._merge(coreDefinitions)
        ._merge(extensionDefinitions);

    const evaluatedDocument = parsedDocument.evaluate(documentEnvironment);
    const documentMeta = filemetaUtils.findFilemeta({ sectionContent: evaluatedDocument });

    const titleString = documentUtils.buildTitle('document', documentMeta);
    const bodyString = evaluatedDocument
        .reduce(appendContentValue, [])
        .join('\n');

    return `
${titleString}
${bodyString}
    `;
}

module.exports = {
    render: render
}