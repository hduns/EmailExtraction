const fs = require('fs');

const testFileData = fs.readFileSync('test.txt', {
    encoding: 'utf8',
    flag: 'r'
});

function countSoftwireEmails(input) {
    const re = /[\w.'_%+-]*@softwire.com/gi;
    const emailsArr = input.match(re);
    console.log(emailsArr);
    // console.log(input.match(re));
    return emailsArr.length;
}


let noOfSoftwireEmails = countSoftwireEmails(testFileData);

console.log(noOfSoftwireEmails);