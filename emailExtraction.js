const fs = require('fs');

const testFileData = fs.readFileSync('test.txt', {
    encoding: 'utf8',
    flag: 'r'
});

console.log('File contents:', testFileData);

