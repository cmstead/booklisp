'use strict';

const fs = require('fs');

const parser = require('../../dependencies/document-tools/document-parser');

const coreEnvironmentFactory = require('../../dependencies/core/coreEnvironmentFactory');
const coreDefinitions = require('../../dependencies/core/coreDefinitions');
const extensionDefinitions = require('../../dependencies/document-tools/extensionDefinitions');

require('../utils/approvals')();

describe('Document Evaluator', function () {

    let sourceContent;
    let parsedDocument;

    beforeEach(function () {
        const cwd = process.cwd();
        const sourcePath = `${cwd}/tests/fixtures/document-parser.md`;
        sourceContent = fs.readFileSync(sourcePath, { encoding: 'utf8' });
        parsedDocument = parser.parse(sourceContent);
    });

    it('produces a document object', function () {
        const documentEnvironment = coreEnvironmentFactory()
            ._merge(coreDefinitions)
            ._merge(extensionDefinitions);

        const result = parsedDocument.evaluate(documentEnvironment);

        this.verify(JSON.stringify(result, null, 4));
    });
});
