'use strict';

const fs = require('fs');

const parser = require('../dependencies/parser');
const coreEnvironmentFactory = require('../dependencies/coreEnvironmentFactory');
const coreDefinitions = require('../dependencies/coreDefinitions');
const extensionDefinitions = require('../dependencies/extensionDefinitions');

require('./utils/approvals')();

describe('evaluate', function () {

    let filemetaSource;
    let filemetaAST;

    beforeEach(function () {
        const cwd = process.cwd();
        const sourceFilePath = `${cwd}/tests/fixtures/filemeta.bl`;

        filemetaSource = fs.readFileSync(sourceFilePath, { encoding: 'utf8' });
        filemetaAST = parser.parse(filemetaSource);
    });

    
    describe('AST evaluate', function () {

        it('runs evaluate on a single execution path', function () {
            const startingEnvironment = coreEnvironmentFactory()
                ._merge(coreDefinitions)
                ._merge(extensionDefinitions);

            const result = filemetaAST.evaluate(startingEnvironment);

            this.verify(JSON.stringify(result, null, 4));
        });

    });
    
});