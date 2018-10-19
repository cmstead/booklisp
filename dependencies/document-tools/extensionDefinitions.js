'use strict';

const documentEnvironmentFactory = require('./documentEnvironmentFactory');
const documentParser = require('./document-parser');
const filemetaUtils = require('./filemetaUtils');
const contentUtils = require('./contentUtils');
const fs = require('fs');

const extensionDefinitions = {
    filemeta: function (...args) {
        const metadata = this._get('dict').apply(this, args);
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
    },

    'table-of-contents': function (value) {
        const metaTree = filemetaUtils.buildMetaTree(value);
        const tableOfContentsResult = contentUtils.buildTableOfContents(metaTree);
        const documentContent = contentUtils.buildDocumentContent(value);

        return `
## Table Of Contents ##
${tableOfContentsResult}
${documentContent.join('\n')}
`;
    },

    chapter: function (value) {
        const parsedContent = this._get('import-file')(value);

        return this._get('dict')(
            this._get('tag')('sectionType', 'chapter'),
            this._get('tag')('sectionContent', parsedContent),
        );
    },

    'import-file': function (value) {
        const fileContent = fs.readFileSync(value, { encoding: 'utf8' });
        const environment = documentEnvironmentFactory
            .buildBaseEnvironment()
            ._merge(extensionDefinitions);

        return documentParser.parse(fileContent).evaluate(environment);
    },

    'set-content-node!': function (dict, type, contentNode) {
        const contentNodes = this.get(dict, type, []);

        contentNodes.push(contentNode);

        this.get('set!')(dict, type, contentNodes);

        return dict;
    }
};

module.exports = extensionDefinitions