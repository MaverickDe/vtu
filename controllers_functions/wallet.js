const Flutterwave = require("flutterwave-node-v3");
const dotenv = require("dotenv");
dotenv.config();

console.log(
  process.env.FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);
const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);
const axios = require("axios");
import { GET_WALLET_BALANCE, INSERT_WALLET } from "../database";
// import PRO

import {
  WALLET_CREATION_URL_FLUTTERWAVE,
  WALLET_BALANCE_URL_FLUTTERWAVE,
  WALLET_DEATAILS_URL_FLUTTERWAVE,
  WALLET_TRANSACTIONS_URL_FLUTTERWAVE,
} from "../conts";

let createwallet = async (req, res) => {
  let tx_ref = generateTransactionReference();

  let e = await flw.VirtualAcct({
    email: req.user.email,
    bvn: process.env.BVN,
    tx_ref: tx_ref,
    narration: `${req.user.userId}`,
  });
  
  INSERT_WALLET(tx_ref, req.user.userId, e.data.order_ref);
  return e

 
};
export const walletDetails = async (ref) => {
  let response = await axios.get(
    WALLET_DEATAILS_URL_FLUTTERWAVE(ref),
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );
  // .then(response => {
  return response;
  // })
  // .catch(error => {
  //  throw(e)
  // });
};

export const walletTansaction = async (data) => {

  // const payload = {
  //   "from": "2020-01-01",
  //   "to": "2020-05-05"
  // };
  
  const response = await flw.Transaction.fetch(data);
  return response
     
};

// let walletBalance_f = async (req) => {
 
//     axios
//       .get(
//         WALLET_BALANCE_URL_FLUTTERWAVE(req.params.ref),
//         { email: req.user.email, status: successful },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
//           },
//         }
//       )
//       .then((response) => {
//         let totalbal = response.reduce((acc, total) => {
//           total += acc.data.amount;

//           return total;
//         }, 0);
//         let { usedBal } = GET_WALLET_BALANCE(req.user.id);

//         bal = totalbal - usedbal;
//         res.json({ bal });
//       })
//       .catch((error) => {
//         res.status(202);
//       });

// };

export const walletBalance = async (req) => {


    let bal = GET_WALLET_BALANCE(req.user.id)
   return  bal

    

}
