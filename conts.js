export const WALLET_CREATION_URL_FLUTTERWAVE ="https://api.flutterwave.com/v3/payout-subaccounts"

export const WALLET_DEATAILS_URL_FLUTTERWAVE = (ref)=>(`https://api.flutterwave.com/v3/virtual-account-numbers/${ref}`)

export const WALLET_UPDATE_URL_FLUTTERWAVE =   (ref)=>( `https://api.flutterwave.com/v3/payout-subaccounts/:${ref}`)

export const WALLET_TRANSACTIONS_URL_FLUTTERWAVE =   "https://api.flutterwave.com/v3/transactions"

export const WALLET_BALANCE_URL_FLUTTERWAVE =   (ref)=>( `https://api.flutterwave.com/v3/payout-subaccounts/:${ref}/balance`)

export const WALLET_VIRTUAL_ACCOUNT_URL_FLUTTERWAVE =   (ref)=>( `https://api.flutterwave.com/v3/payout-subaccounts/:${ref}/static-account`)

export const FLUTTER_BILL_CAT_URL =(cat)=>(`https://api.flutterwave.com/v3/bill-categories?${cat}=1`)

export const FLUTTER_BILL_STATUS_URL =(ref)=>(`https://api.flutterwave.com/v3/bills/${ref}`)

export const FLUTTER_TRANSFER_URL ="https://api.flutterwave.com/v3/transfers"