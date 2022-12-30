require('dotenv').config({ path: '../.env' });
const axios = require('axios').default;

const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

export async function getContractAbi(contractAddress: string) {
  try {
    const response = await axios.get(
      `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanApiKey}`
    );

    if (response.data.status != 0) {
      // console.log('start data');
      // console.log(response.data.result);
      // console.log('end data');

      return response.data.result;
    } else {
      // console.log('start data');
      console.log('status is 0, goerli call');
      // console.log('end data');
    }
  } catch (error) {
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanApiKey}`
      );

      if (response.data.status != 0) {
        // console.log('start data');
        // console.log(response.data.result);
        // console.log('end data');

        return response.data.result;
      }
      {
        // console.log('start data');
        console.log('status is 0, mainnet call');
        // console.log('end data');
      }
    } catch (error) {
      console.log("isn't verified");
    }
  }
}
