const { seedPhrase } = require('./config');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compile = require('./compile');
const interface = compile.contracts['Inbox.sol'].Inbox.abi;
const bytecode = compile.contracts['Inbox.sol'].Inbox.evm.bytecode.object;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: seedPhrase,
  },
  providerOrUrl:
    'https://rinkeby.infura.io/v3/bbf22df30c904062a4fdee2adbb6b333',
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  // await window.ethereum.enable();

  try {
    const result = await new web3.eth.Contract(interface)
      .deploy({ data: bytecode, arguments: ['Hi there!!'] })
      .send({ from: accounts[0], gas: 1000000 });
    console.log('ok');
    console.log('Contract deployed to: ', result.options.address);
  } catch (e) {
    console.log('error', e);
  }
};

deploy();
