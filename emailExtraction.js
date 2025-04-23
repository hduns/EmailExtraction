const fs = require('fs');

const testFileData = fs.readFileSync('test.txt', {
    encoding: 'utf8',
    flag: 'r'
});

const Dictionary = {};

function extractEmails(input) {
    const re = /[\w.'_%+-]*@[\w.-]*/g;
    const emailsArr = input.match(re);
    return emailsArr;
}

function createDictionary() {
    const emailsArr = extractEmails(testFileData);
    const emailDomains = getEmailDomains(emailsArr);

    // Add emails domains as keys to Dictionary Object
    const addEmailDomainKeys = emailDomains => {
        for (let i = 0; i < emailDomains.length; i++) {
            if (!(emailDomains[i] in Dictionary)) {
                Dictionary[emailDomains[i]] = [];
            }
        }
    }
    addEmailDomainKeys(emailDomains);

    // Populate email keys with values
    for (let i = 0; i < emailsArr.length; i++) {
        const re = /@[\w.-]*/g;
        let domain = emailsArr[i].toString().match(re);

        for (const key in Dictionary) {
            if(key == domain) {
                Dictionary[key].push(emailsArr[i]);
            }
        }
    }

}

function getEmailDomains(emailsArr) {
    const re = /@[\w.-]*/g;
    return emailsArr.toString().match(re);
}

createDictionary();
console.log(Dictionary);
console.log(Dictionary['@techswitch.co.uk'].length);
