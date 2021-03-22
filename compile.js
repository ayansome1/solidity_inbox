const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'UTF-8');
// console.log(solc.compile(source, 1));

var input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const obj = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(obj.contracts['Inbox.sol'].Inbox);
module.exports = obj;
