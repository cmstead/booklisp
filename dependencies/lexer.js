'use strict';

const nodeTypes = require('./nodeTypes');
const nodeBuilder = require('./nodeBuilderFactory')(lex);

const numberPattern = /^[0-9]*(\.[0-9]+)?$/;
const stringPattern = /^\".*\"$/;

function getNodeType(token) {
    if (numberPattern.test(token)) {
        return nodeTypes.Number;
    } else if (stringPattern.test(token)) {
        return nodeTypes.String;
    } else if (token === 'True' || token === 'False') {
        return nodeTypes.Boolean;
    } else {
        return nodeTypes.Identifier;
    }
}

function isClosingToken(token) {
    return token === ')' || token === ']';
}

function lex(sourceTokens) {
    let sourceNodes = [];
    let lastToken = null;
    let token = sourceTokens.shift();

    while (typeof token !== 'undefined') {
        lastToken = token;

        if (token === '(') {
            const functionNode = nodeBuilder.buildFunctionNode(sourceTokens);

            sourceNodes.push(functionNode);
        } else if (token === '[') {
            const vectorNode = nodeBuilder.buildVectorNode(sourceTokens);

            sourceNodes.push(vectorNode);
        } else if (isClosingToken(token)) {
            break;
        } else {
            const nodeType = getNodeType(token);
            const valueNode = nodeBuilder.buildValueNode(nodeType, token);

            sourceNodes.push(valueNode);
        }

        if(isClosingToken)

        token = sourceTokens.shift();
    }

    return sourceNodes;
}

module.exports = {
    lex: lex
}