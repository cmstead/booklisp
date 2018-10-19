'use strict';

const childProcess = require('child_process');

childProcess.exec('booklisp ./readme-source/readme.md ./README.md', function(error) {
    if(error) {
        console.log('An error occurred: ', error.message);
    } else {
        console.log('Compile complete');
    }
});