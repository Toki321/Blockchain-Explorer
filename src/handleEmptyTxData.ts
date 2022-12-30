require('dotenv').config({ path: '../.env' });
import { ethers } from 'ethers';

const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_API_KEY
);

export async function handleEmptyTxData(fromAddress, toAddress) {
  const isFromAddressContract = await provider.getCode(fromAddress);
  const isToAddressContract = await provider.getCode(toAddress);
  if (isFromAddressContract == '0x' && isToAddressContract == '0x') {
    console.log(`eth transfer`);
  } else if (isFromAddressContract == '0x' && isToAddressContract != '0x') {
    console.log('eth transfer from wallet to contract');
  } else if (isFromAddressContract != '0x' && isToAddressContract == '0x') {
    console.log('eth transfer from contract to wallet');
  }
}
