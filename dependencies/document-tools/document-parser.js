'use strict';

const nodeTypes = {
    executable: 'executable',
    content: 'content'
};

function buildDocumentNode(content, type) {
    return {
        content: content,
        type: type
    };
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

function addNewNode(documentNodes, currentBlock, nodeType) {
    if (currentBlock.length > 0) {
        const blockString = currentBlock.join('\n');
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
        } else if(currentToken.trim() === '/bl-->') {
            addNewNode(documentNodes, currentBlock, nodeTypes.executable);
            currentBlock = [];
        } else {
            currentBlock.push(currentToken);
        }

        currentToken = iterableSourceLines.next();
    }

    addNewNode(documentNodes, currentBlock, nodeTypes.content);

    return documentNodes;
}

module.exports = {
    parse: parse
};