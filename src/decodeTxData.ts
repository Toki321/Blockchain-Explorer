// should decode data to determine if transfer or swap or sth else, export this func and use on determineAction
require('dotenv').config({ path: '../.env' });

import { ethers } from 'ethers';
import { determineWhichIsContract } from './determineWhichIsContract';
import { getContractAbi } from './getContractAbi';

const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_API_KEY
);

export async function decodeTxData(tx) {
  const txHash =
    '0xc2e8b909b6e2b6ca2aac2b520a81cdec59aef78102eeff39434ad2915059f99e';

  tx = await provider.getTransaction(txHash);

  const contractAddress = await determineWhichIsContract(tx.from, tx.to);

  let abiEtherscanCall;

  try {
    abiEtherscanCall = await getContractAbi(contractAddress);
  } catch (e) {}

  let iface;

  if (abiEtherscanCall != null) {
    iface = new ethers.utils.Interface(abiEtherscanCall);
  } else {
    return;
  }

  let decodedData = iface.parseTransaction({ data: tx.data, value: tx.value });

  console.log('decoded data:', decodedData.args.data);

  const newDecodedData = iface.parseTransaction({
    data: decodedData.args.data[2],
  });

  console.log(newDecodedData);
}

decodeTxData(' ');
