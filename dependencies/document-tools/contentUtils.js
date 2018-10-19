'use strict';

const documentUtils = require('./documentUtils');
const filemetaUtils = require('./filemetaUtils');

function buildTableOfContents(metaTree) {
    return metaTree
        .reduce(function (result, metaNode, index) {
            return `${result}\n- Chapter ${index + 1}: ${metaNode.filemeta.title}`
        }, '');
}

function constructFilemetaContent(contentType, filemeta) {
    return documentUtils.buildTitle(contentType, filemeta);
}

function buildFileContent(contentNode) {
    const filemeta = filemetaUtils.findFilemeta(contentNode);
    const stringValues = contentNode.sectionContent.filter(value => typeof value === 'string');
    const markdownContent = stringValues.join('\n');

    const titleContent = constructFilemetaContent(contentNode.sectionType, filemeta);

    return `
${titleContent}
${markdownContent}
    `;
}

function buildDocumentContent(contentNodes) {
    return contentNodes.reduce(function (result, contentNode) {
        const fileContent = buildFileContent(contentNode);
        return result.concat([fileContent]);
    }, []);
}

module.exports = {
    buildDocumentContent: buildDocumentContent,
    buildFileContent: buildFileContent,
    constructFilemetaContent: constructFilemetaContent,
    buildTableOfContents: buildTableOfContents
}

