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
                let domainName = emailDomains[i].replace("@", "");
                Dictionary[domainName] = [];
            }
        }
    }
    addEmailDomainKeys(emailDomains);

    // Populate email keys with values
    for (let i = 0; i < emailsArr.length; i++) {
        const re = /@[\w.-]*/g;
        let domain = emailsArr[i].toString().match(re);
        domain = (domain[0].replace("@", ""));

        for (const key in Dictionary) {
            if(key.includes(domain)) {
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

function sortDictionaryByEmailCount(Dictionary) {
    let arr = [];

    for (let key in Dictionary) {
        let keyLength = Dictionary[key].length;
        arr.push([key, keyLength]);
    }
    arr = arr.sort((a, b) => b[1] - a[1]);
    return arr;
}

const topTenEmailDomains = Dictionary => {
    let sortedDictionary = sortDictionaryByEmailCount(Dictionary).slice(0, 10).map((element) => element[0]);
    return sortedDictionary;
}

console.log('top10domains:', topTenEmailDomains(Dictionary));

function domainsWithFrequencyOver(number) {
    let matchingDomains = [];
    let sortedDictionary = sortDictionaryByEmailCount(Dictionary);

    for (let i = 0; i < sortedDictionary.length; i++) {
        if (sortedDictionary[i][1] >= number) {
            matchingDomains.push(sortedDictionary[i])
        }
    }
    return matchingDomains.length > 0 ? convertEmailCountDictionaryToObject(matchingDomains) : `No domains have a frequency over ${number} in this database.`;
}

function convertEmailCountDictionaryToObject(dictionaryArr) {
    let dictionaryObject = {};
    for (let i = 0; i < dictionaryArr.length; i++) {
        dictionaryObject[dictionaryArr[i][0]] = dictionaryArr[i][1];
    }
    return dictionaryObject;
}


console.log('domainsWithFrequencyOver', domainsWithFrequencyOver(500));