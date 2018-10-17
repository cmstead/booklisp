'use strict';

const fs = require('fs');

const parser = require('../../dependencies/document-tools/document-parser');

require('../utils/approvals')();

describe('evaluate', function () {

    let sourceContent;

    beforeEach(function () {
        const cwd = process.cwd();
        const sourcePath = `${cwd}/tests/fixtures/document-parser.md`;
        sourceContent = fs.readFileSync(sourcePath, { encoding: 'utf8' });
    });

    it('parses a markdown file into consumable chunks', function () {
        const parsedDocument = parser.parse(sourceContent);
        this.verify(JSON.stringify(parsedDocument, null, 4));
    });
});