const fs = require('fs');

const testFileData = fs.readFileSync('test.txt', {
    encoding: 'utf8',
    flag: 'r'
});

function checkSoftwireEmails(input) {
    let counter = 0;
    for(let i = 0; i < input.length; i++) {
        if((input.substring(i, i+13)) === "@softwire.com") {
            counter++
        }
    }
    return counter;
}

let softwireEmails = checkSoftwireEmails(testFileData);
console.log(softwireEmails);