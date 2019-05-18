'use strict';

const fs = require('fs');
const path = require('path');
const container = require('../../container');

const parser = container.build('documentParser');

const coreEnvironmentFactory = container.build('coreEnvironmentFactory');
const coreDefinitions = container.build('coreDefinitions');
const extensionDefinitionsFactory = container.build('extensionDefinitionsFactory');

require('../utils/approvals')();

describe('Document Evaluator', function () {

    let sourceContent;
    let parsedDocument;
    let sourcePath;

    beforeEach(function () {
        const cwd = process.cwd();
        sourcePath = path.normalize(`${cwd}/tests/fixtures/`);

        const sourceFilePath = `${sourcePath}document-parser.md`;

        sourceContent = fs.readFileSync(sourceFilePath, { encoding: 'utf8' });
        parsedDocument = parser.parse(sourceContent);
    });

    it('produces a document object', function () {
        const extensionDefinitions = extensionDefinitionsFactory.getExtensionDefinitions(sourcePath);
        const documentEnvironment = coreEnvironmentFactory(sourcePath)
            ._merge(coreDefinitions)
            ._merge(extensionDefinitions);

        const result = parsedDocument.evaluate(documentEnvironment);

        this.verify(JSON.stringify(result, null, 4));
    });
});
