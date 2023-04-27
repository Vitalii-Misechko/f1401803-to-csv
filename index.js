const { XMLParser } = require('fast-xml-parser');
const fs = require('fs');

const xmlDataStr = fs.readFileSync('./F1401803.xml');

const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_",
    numberParseOptions: {
        leadingZeros: false
    }
};
const parser = new XMLParser(options);
const output = parser.parse(xmlDataStr);

const body = output.DECLAR.DECLARBODY;

let rowCount = 0;

const columns = Object.keys(body)
    .map(tag => {
        if (!tag.startsWith('T1RXXXX')) return null;

        if (!rowCount) rowCount = body[tag].length;

        const result = Array(rowCount+1);

        const column = Array.isArray(body[tag]) ? body[tag] : [body[tag]];
        column.forEach(row => {
            result[row['@_ROWNUM']] = row['#text'];
        });

        return result;
    })
    .filter(column => column);

const csvData = [];
for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row = columns.map(column => column[rowIndex+1]);
    csvData.push(row);
}

let csv = csvData.map(row => row.join(',')).join('\n');

console.log(csv);