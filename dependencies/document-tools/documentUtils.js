'use strict';

const titleFormatters = {
    document: '#',
    chapter: '##',
    section: '###',
    subtitle: '####'
}

function buildTitleString(type, value) {
    const titleFormatter = titleFormatters[type];

    return `${titleFormatter} ${value} ${titleFormatter}`;
}

function buildTitle(contentType, filemeta) {
    const titleFormatter = contentType === 'chapter' ? '##' : '###';
    const subtitleFormatter = '####';

    let titleValues = [];

    if (typeof filemeta.filemeta.title === 'string') {
        const titleString = buildTitleString(contentType, filemeta.filemeta.title);
        titleValues.push(titleString);
    }

    if (typeof filemeta.filemeta.subtitle === 'string') {
        const subtitleString = buildTitleString('subtitle', filemeta.filemeta.subtitle);;
        titleValues.push(subtitleString);
    }

    return titleValues.join('\n');
}

module.exports = {
    buildTitle: buildTitle
}

