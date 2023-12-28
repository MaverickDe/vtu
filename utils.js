const Flutterwave = require('flutterwave-node-v3');
const { FLUTTER_TRANSFER_URL } = require('./conts');
    const axios = require("axios")
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
export const Transfer = async (data) => {
    const detail = {
        tx_ref: generateTransactionReference(),
        amount: amount,
        email: "johnmadakin@gmail.com",
        currency: "NGN",
    };
    const details = {
        account_bank: "flutterWave",
        "account_number": data.mainaccount,
        "amount": data.amount,
        "narration": data.biller_name,
        "currency": "NGN",
        "reference": generateTransactionReference(),
       
        "debit_currency": "NGN",
        "debit_subaccount": data.subaccount
    };
  return  axios.post(FLUTTER_TRANSFER_URL,details, { headers: { "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` } })

}