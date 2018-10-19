#!/usr/bin/env node

'use strict';

const fs = require('fs');
const { pipe } = require('./dependencies/core/utils');

const parser = require('./dependencies/document-tools/document-parser');
const renderer = require('./dependencies/document-tools/documentRenderer');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (typeof inputFile !== 'string') {
    throw new Error('Booklisp requires an input file path');
}

if (typeof outputFile !== 'string') {
    throw new Error('Booklisp requires an output file path');
}

const fileContent = fs.readFileSync(inputFile, { encoding: 'utf8' });

pipe(
    fileContent,
    (fileContent) => parser.parse(fileContent),
    (parsedContent) => renderer.render(parsedContent),
    (renderedContent) => fs.writeFileSync(outputFile, renderedContent)
);

