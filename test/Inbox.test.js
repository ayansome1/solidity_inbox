const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
// const { interface, bytecode } = require('../compile');

const compile = require('../compile');
const interface = compile.contracts['Inbox.sol'].Inbox.abi;
const bytecode = compile.contracts['Inbox.sol'].Inbox.evm.bytecode.object;

let accounts, inbox;
const INITIAL_STRING = 'hi there';

beforeEach(async () => {
  // async function
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // console.log(inbox.options.address);
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'bye');
  });
});

// class car {
//   get() {
//     return 'abc';
//   }
// }

// describe('car', () => {
//   it('can get', () => {
//     const res = new car();
//     assert.strictEqual('abc', res.get());
//   });
// });
