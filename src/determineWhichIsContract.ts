import { ethers } from 'ethers';
require('dotenv').config({ path: '../.env' });

const provider = new ethers.providers.InfuraProvider(
  'goerli',
  process.env.INFURA_API_KEY
);

export async function determineWhichIsContract(fromAddress, toAddress) {
  if (toAddress == null) {
    console.log('contract creation done by ', fromAddress);

    return;
  }

  const isToAddressContract = await provider.getCode(toAddress);

  if (isToAddressContract != '0x') {
    return toAddress;
  } else {
    return fromAddress;
  }
}
