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
    '0xe2633d6a87ce3833c99b569727420efe3b2f8747d007f5012e563e6042a233ca';

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

  // let decodedData = iface.parseTransaction({ data: tx.data, value: tx.value });

  // console.log('decoded data:', decodedData.args.data);

  // const newDecodedData = iface.decodefu({
  //   data: decodedData.args.data[2],
  // });

  // console.log(newDecodedData);

  const calldataArray = iface.decodeFunctionData(tx.data.slice(0, 10), tx.data);
  console.log(calldataArray);

  // for (const calldata of calldataArray) {
  //   // decoding each log. if you don't have the function in the uniswapInterface, this would throw
  //   console.log(iface.decodeFunctionData(calldata.slice(0, 10), calldata));
  // }

  calldataArray[1].forEach((element) => {
    console.log(iface.decodeFunctionData(element.slice(0, 10), element));
    // console.log(element);
  });
}

decodeTxData(' ');
