'use strict';

const nodeTypes = require('./nodeTypes');


function nodeBuilderFactory(lex) {
    function buildNode(nodeType) {
        return {
            type: nodeTypes[nodeType],
            value: null,
            childNodes: []
        };
    }

    function buildFunctionNode(sourceTokens) {
        const functionNode = buildNode(nodeTypes.FunctionIdentifier);

        functionNode.childNodes = lex(sourceTokens);

        return functionNode;
    }

    function buildVectorNode(sourceTokens) {
        const functionNode = buildNode(nodeTypes.VectorBlock);

        functionNode.childNodes = lex(sourceTokens);

        return functionNode;
    }

    function sanitizeString(stringToken) {
        return stringToken.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"');
    }

    function buildValueNode(nodeType, token) {
        const valueNode = buildNode(nodeType);

        if (nodeType === nodeTypes.String) {
            valueNode.value = sanitizeString(token);
        } else if (nodeType === nodeTypes.Number) {
            valueNode.value = Number(token);
        } else {
            valueNode.value = token;
        }

        return valueNode;
    }

    return {
        buildNode: buildNode,
        buildFunctionNode: buildFunctionNode,
        buildValueNode: buildValueNode,
        buildVectorNode: buildVectorNode
    };
}

module.exports = nodeBuilderFactory;