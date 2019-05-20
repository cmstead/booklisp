function extensionDefinitionsFactory(
    contentUtils,
    documentEnvironmentFactory,
    documentParser,
    filemetaUtils,
    fs,
    path
) {
    'use strict';

    function getExtensionDefinitions(currentPath) {
        function sectionContent(typeTag) {
            return function (relativeFilePath) {
                const basePath = typeof this.currentPath !== 'undefined'
                    ? this.currentPath
                    : currentPath;

                const parsedContent = this._get('import-file')(relativeFilePath, basePath);

                return this._get('dict')(
                    this._get('tag')('sectionType', typeTag),
                    this._get('tag')('sectionContent', parsedContent)
                );
            }
        }

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

            'build-message': function (message) {
                console.log(`
******** Build Message     ********

${message}

******** End Build Message ********
`);
            },

            'table-of-contents': function (...chapterValues) {
                const chapters = Array.isArray(chapterValues[0]) ? chapterValues[0] : chapterValues;

                const metaTree = filemetaUtils.buildMetaTree(chapters);
                const tableOfContentsResult = contentUtils.buildTableOfContents(metaTree);
                const documentContent = contentUtils.buildDocumentContent(chapters);

                return `
## Table Of Contents ##
${tableOfContentsResult}
${documentContent.join('\n')}
`;
            },

            chapter: sectionContent('chapter'),
            section: sectionContent('section'),
            "section-main": sectionContent('section-main'),
            subsection: sectionContent('subsection'),
            "subsection-minor": sectionContent('subsection-minor'),

            'import-file': function (filePath, basePath) {
                const resolvedFilePath = path.normalize(path.join(basePath, filePath));
                const fileContent = fs.readFileSync(resolvedFilePath, { encoding: 'utf8' });
                const nextPathTokens = resolvedFilePath.split(/(\\|\/)/);
                const nextPath = nextPathTokens.slice(0, nextPathTokens.length - 1).join('/');

                const environment = documentEnvironmentFactory
                    .buildBaseEnvironment()
                    ._merge(extensionDefinitions);

                environment.currentPath = nextPath;

                return documentParser
                    .parse(fileContent)
                    .evaluate(environment);
            }
        };

        return extensionDefinitions;
    }

    return {
        getExtensionDefinitions: getExtensionDefinitions
    };
}

module.exports = extensionDefinitionsFactory;