'use strict';

const tokenizer = require('./tokenizer');
const nodeTypes = require('./nodeTypes');
const { lex } = require('./lexer');
const nodeBuilder = require('./nodeBuilderFactory')(lex);

function parse(source) {
    const sourceTokens = tokenizer.tokenize(source);
    const executableNode = nodeBuilder.buildNode(nodeTypes.Executable);

    executableNode.childNodes = lex(sourceTokens);

    return executableNode;
}

module.exports = {
    parse: parse
}