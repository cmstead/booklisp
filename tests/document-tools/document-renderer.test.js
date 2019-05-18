'use strict';

const fs = require('fs');
const path = require('path');
const container = require('../../container');

const parser = container.build('documentParser');
const renderer = container.build('documentRenderer');

require('../utils/approvals')();

describe('Document Renderer', function () {

    let sourceContent;
    let sourcePath = path.normalize(`${process.cwd()}/tests/fixtures/`);

    beforeEach(function () {
        const sourceFilePath = `${sourcePath}document-parser.md`;
        sourceContent = fs.readFileSync(sourceFilePath, { encoding: 'utf8' });
    });

    it('produces a compiled markdown string', function () {
        const parsedDocument = parser.parse(sourceContent);
        const compiledMarkdown = renderer.render(parsedDocument, sourcePath);

        this.verify(JSON.stringify(compiledMarkdown, null, 4));
    });
});
