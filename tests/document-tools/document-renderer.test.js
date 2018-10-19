'use strict';

const fs = require('fs');

const parser = require('../../dependencies/document-tools/document-parser');
const renderer = require('../../dependencies/document-tools/documentRenderer');

require('../utils/approvals')();

describe('Document Renderer', function () {

    let sourceContent;

    beforeEach(function () {
        const cwd = process.cwd();
        const sourcePath = `${cwd}/tests/fixtures/document-parser.md`;
        sourceContent = fs.readFileSync(sourcePath, { encoding: 'utf8' });
    });

    it('produces a compiled markdown string', function () {
        const parsedDocument = parser.parse(sourceContent);
        const compiledMarkdown = renderer.render(parsedDocument);

        this.verify(JSON.stringify(compiledMarkdown, null, 4));
    });
});
