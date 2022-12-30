import { determineAction } from './determineActionOnTxData';

import { ethers } from 'ethers';
require('dotenv').config({ path: '../.env' });

const etherscanProvider = new ethers.providers.EtherscanProvider(
  'goerli',
  process.env.ETHERSCAN_API_KEY
);

const walletAddresss = '0xE9Fad814dfCa0b7B3C0a8049C42FD92daff80713';

async function getTxsForAddress(walletAddresss: string) {
  const txHistory = await etherscanProvider.getHistory(walletAddresss);

  return txHistory;
}

async function checkEachTx() {
  const txs = await getTxsForAddress(walletAddresss);

  let i = 0;

  txs.forEach((txObject) => {
    console.log(i);

    determineAction(txObject);

    console.log(txObject);

    i++;
  });
}

checkEachTx();

export {};
