function app(
    fs,
    utils,
    documentParser,
    documentRenderer
) {
    'use strict';

    const { pipe } = utils;

    function run() {
        const inputFile = process.argv[2];
        const outputFile = process.argv[3];

        if (typeof inputFile !== 'string') {
            throw new Error('Booklisp requires an input file path');
        }

        if (typeof outputFile !== 'string') {
            throw new Error('Booklisp requires an output file path');
        }

        const fileContent = fs.readFileSync(inputFile, { encoding: 'utf8' });
        const pathTokens = inputFile.split(/(\/|\\)/);
        const filePath = pathTokens
            .slice(0, pathTokens.length - 1)
            .join('/');

        pipe(
            fileContent,
            (fileContent) => documentParser.parse(fileContent),
            (parsedContent) => documentRenderer.render(parsedContent, filePath),
            (renderedContent) => fs.writeFileSync(outputFile, renderedContent)
        );
    }

    return {
        run: run
    };
}

module.exports = app;
