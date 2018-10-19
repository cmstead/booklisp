'use strict';

const booklispParser = require('../interpreter/parser');

const nodeTypes = {
    document: 'document',
    executionBlock: 'executionBlock',
    content: 'content'
};

const nodeEvaluators = {
    [nodeTypes.document]: function (node) {
        return function (context) {
            return node.content
                .map(contentNode => contentNode.evaluate(context));
        }
    },
    [nodeTypes.executionBlock]: function (node) {
        return function (context) {
            return node.content.evaluate(context);
        }
    },
    [nodeTypes.content]: function (node) {
        return function () {
            return node.content;
        }
    }
}

function buildDocumentNode(content, type) {
    let documentNode = {
        type: type,
        content: content
    };

    documentNode.evaluate = nodeEvaluators[type](documentNode);

    return documentNode;
}

function rtrim(value) {
    return typeof value === 'string' ? value.replace(/\s*$/, '') : null;
}

function getIterableSourceLines(sourceText) {
    let sourceTokens = sourceText.split(/\r?\n/).reverse();

    return {
        next: () => rtrim(sourceTokens.pop())
    }
}

function prepareContent(currentBlock, nodeType) {
    const sourceString = currentBlock.join('\n');

    if (nodeType === 'content') {
        return sourceString;
    } else {
        return booklispParser.parse(sourceString);
    }
}

function addNewNode(documentNodes, currentBlock, nodeType) {
    if (currentBlock.length > 0) {
        const blockString = prepareContent(currentBlock, nodeType);
        const blockNode = buildDocumentNode(blockString, nodeType);
        documentNodes.push(blockNode);
    }
}

function parse(sourceText) {
    const iterableSourceLines = getIterableSourceLines(sourceText);
    let currentToken = iterableSourceLines.next();
    let currentBlock = [];
    let documentNodes = [];

    while (currentToken !== null) {
        if (currentToken.trim() === '<!--bl') {
            addNewNode(documentNodes, currentBlock, nodeTypes.content);
            currentBlock = [];
        } else if (currentToken.trim() === '/bl-->') {
            addNewNode(documentNodes, currentBlock, nodeTypes.executionBlock);
            currentBlock = [];
        } else {
            currentBlock.push(currentToken);
        }

        currentToken = iterableSourceLines.next();
    }

    addNewNode(documentNodes, currentBlock, nodeTypes.content);

    return buildDocumentNode(documentNodes, 'document');
}

module.exports = {
    parse: parse
};