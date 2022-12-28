const { ethers, utils } = require('ethers');
require('dotenv').config({ path: '../.env' });

const provider = new ethers.providers.EtherscanProvider(
  'goerli',
  process.env.ETHERSCAN_API_KEY
);

async function getHistoryForAddress() {
  const txHistory = await provider.getHistory(
    '0x7d15661b775db93c6f914214a521AC9032C63764',
    8140810,
    8211345
  );

  console.log(txHistory);
}

getHistoryForAddress();
