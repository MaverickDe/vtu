// const Flutterwave = require("flutterwave-node-v3");
// const dotenv = require("dotenv")
// dotenv.config()

// console.log(process.env.FLUTTERWAVE_PUBLIC_KEY,process.env.FLUTTERWAVE_SECRET_KEY )
// const flw = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY);
// (

//     async () => {
        

//         let v = await flw.Bills.fetch_bills_Cat({data_bundle:1});
//         console.log(v)
//     }
// )()
const  { WALLET } = require( "./database");

// new WALLET().INSERT_WALLET("aS","as")
new WALLET().GET_WALLET({})
// new WALLET().UPDATE_WALLET({columns:{ref:"bbbb"}})