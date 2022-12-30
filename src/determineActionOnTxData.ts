import { decodeTxData } from './decodeTxData';
import { handleEmptyTxData } from './handleEmptyTxData';

// shd export a function that checks if data is null, and if it's not call decodeData func
require('dotenv').config({ path: '../.env' });

export async function determineAction(tx) {
  if (tx.data == '0x') {
    try {
      handleEmptyTxData(tx.from, tx.to);
    } catch (e) {
      console.log('error is here empty data');
    }
  } else {
    try {
      decodeTxData(tx);
    } catch (e) {
      console.log('error is here NOT empty data');
    }
  }
}
