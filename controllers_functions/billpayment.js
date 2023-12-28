const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave("public key", "secret key");
const axios = require("axios");
const { FLUTTER_BILL_CAT_URL } = require("../conts");
const { Transfer } = require("../utils");
const { Scheduler } = require("node-schedule");
const {
  TRANSACTION,WALLET,WALLET_BALANCE
} = require("../database");
let TRANSACTION_DB = new TRANSACTION()
let WALLET_BALANCE_DB = new WALLET_BALANCE()

// FLUTTER_BILL_CAT_URL

//  flw.VirtualAcct.fetch

/**type @ */










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const  billcat = async (data_) => {
  let cat = ["airtime", "data_bundle", "internet", "power", "cable"];

  if (!data_.params.billCat in cat) {
    // res.status(202).json();
    throw ({ data: "invalid credentials" })
  }

 
    let data = {};
    data[data_.params.billCat] = 1;
    let v = await flw.Bills.fetch_bills_Cat(data);
    return v;
 
};










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const billStatus =async  (data_) => {
  const options = {
    method: "GET",
    url: "",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

let v = await axios
    .request(options)
  return v
    // .then(function (response) {
    //   res.json(response);
    // })
    // .catch(function (error) {
    //   res.status(202);
    // });
};









///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const validateAirtime =async (data_) => {
  const detail = {
    item_code: data_.body.item_code,
    code: data_.body.biller_code,
    customer: data_.body.phoneNumber,
  };

 let v = await  flw.Bills.validate(detail)
  if (!v) {
     throw(false)
   }
};

export const airtime = async (data_) => {
  // save information in my database with status as pending
  // the bill amount will be freezed in your account, you wont be able to perform transaction with it
  // when status is succesfull , it will be unfreezed and send to the main wallet
  // if main wallet has les money

  // await Transfer({}).then(e=>{}).catch(e=>{})

  let v = validateAirtime(data_)
 
  let reference = generateTransactionReference();

  const details = {
    country: data_.body.country,
    customer: data_.body.phoneNumber,
    amount: data_.body.amount,
    type: "AIRTIME",
    reference,
  };
 let e = await  flw.Bills.create_bill(details)
  
      // updae to database

  if (e.status == "pending") {
    TRANSACTION_DB.INSERT_TRANSACTION(
      ref,
      e.data.biller_name,
      data_.user.wallet.mainbal,
      data_.user.userId,
      e.data.amount,
      "pending",
      e.data.created_at,
      "billpayment"
    );
        new Scheduler((schedule) => {
          let ref = reference;

          flw.Bills.fetch_status({ ref })
            .then((e) => {
              if (e.status == "successful") {
                TRANSACTION_DB.UPDATE_TRANSACTION({ columns: { status: "successful" }, conditions: { ref } });
                WALLET_BALANCE_DB.UPDATE_WALLET_BALANCE(
                  {
                    conditions: { userId: data_.user.Id },
                    columns: { prevbal: data_.user.wallet.mainbal, mainbal: data_.user.wallet.mainbal - (e.data.amount + e.data.fee) }
                  }
                  
                 
                 
                );

                schedule.cancel();
              } else if (e.status == "failed") {
                TRANSACTION_DB.UPDATE_TRANSACTION({columns:{ status: "failed" }, conditions: { ref }});

                schedule.cancel();
              }
            })
            .catch(() => {});
        }, 5).schedule;

        return({ status: "pending",reference });
      } else if(e.status =="successful"){
        TRANSACTION_DB.INSERT_TRANSACTION(
          ref,
          e.data.biller_name,
          data_.user.wallet.mainbal,
          data_.user.userId,
          e.data.amount,
          "successful",
          e.data.created_at,
          "billpayment"
        );
        return({ status: "success",reference });
  }
  else if (e.status == "failed") {
   return ({ status: "failed" });
    
  }
   
};










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const validateData = async (data_) => {
  const detail = {
    item_code: data_.body.item_code,
    code: data_.body.biller_code,
    customer: data_.body.phoneNumber,
  };

  let v = await  flw.Bills.validate(detail)
  if (!v) {
     throw(false)
   }
};
export const data = (data_, res) => {
  let reference = generateTransactionReference();

  const details = {
    country: "NG",
    customer: data_.body.phoneNumber,
    amount: data_.body.amount,
    type: data_.body.biller_name,
    reference: reference,
  };

  let v = validateData(data_)
  flw.Bills.create_bill(details)
    .then((e) => {
      
      if (e.status == "pending") {
        TRANSACTION_DB.INSERT_TRANSACTION(
          ref,
          e.data.biller_name,
          data_.user.wallet.mainbal,
          data_.user.userId,
          e.data.amount,
          "pending",
          e.data.created_at,
          "billpayment"
        );
        new Scheduler((schedule) => {
          let ref = reference;

          flw.Bills.fetch_status({ ref })
          .then((e) => {
            if (e.status == "successful") {
              TRANSACTION_DB.UPDATE_TRANSACTION({ columns: { status: "successful" }, conditions: { ref } });
              WALLET_BALANCE_DB.UPDATE_WALLET_BALANCE(
                {
                  conditions: { userId: data_.user.Id },
                  columns: { prevbal: data_.user.wallet.mainbal, mainbal: data_.user.wallet.mainbal - (e.data.amount + e.data.fee) }
                }
                
               
               
              );

              schedule.cancel();
            } else if (e.status == "failed") {
              TRANSACTION_DB.UPDATE_TRANSACTION({columns:{ status: "failed" }, conditions: { ref }});

              schedule.cancel();
            }
          })
            .catch(() => {});
        }, 5).schedule;

        return({ status: "pending" ,reference});
      } else if(e.status == "successful"){
        TRANSACTION_DB.INSERT_TRANSACTION(
          ref,
          e.data.biller_name,
          data_.user.wallet.mainbal,
          data_.user.userId,
          e.data.amount,
          "successful",
          e.data.created_at,
          "billpayment"
        );
       return({ status: "success" ,reference });
      } else if (e.status == "failed") {
        return ({ status: "failed",reference });
        
      }
    })
    
    .catch((e) => res.status(202));
};










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const validateCable = async (data_) => {
  
  const detail = {
    item_code: data_.body.item_code,
    code: data_.body.biller_code,
    customer: data_.body.cableNumber,
  };

  let v = await  flw.Bills.validate(detail)
  if (!v) {
     throw(false)
   }
};
export const cable = async (data_) => {
  let v = validateCable(data_)
  let reference = generateTransactionReference();
  const details = {
    country: data_.body.country,
    customer: data_.body.cableNumber,
    amount: data_.body.amount,
    type: data_.body.biller_name,
    reference: reference,
  };
 let e = await flw.Bills.create_bill(details)
  
  if (e.status == "pending") {
    TRANSACTION_DB.INSERT_TRANSACTION(
      ref,
      e.data.biller_name,
      data_.user.wallet.mainbal,
      data_.user.userId,
      e.data.amount,
      "pending",
      e.data.created_at,
      "billpayment"
    );
        new Scheduler((schedule) => {
          let ref = reference;

          flw.Bills.fetch_status({ ref })
          .then((e) => {
            if (e.status == "successful") {
              TRANSACTION_DB.UPDATE_TRANSACTION({ columns: { status: "successful" }, conditions: { ref } });
              WALLET_BALANCE_DB.UPDATE_WALLET_BALANCE(
                {
                  conditions: { userId: data_.user.Id },
                  columns: { prevbal: data_.user.wallet.mainbal, mainbal: data_.user.wallet.mainbal - (e.data.amount + e.data.fee) }
                }
                
               
               
              );

              schedule.cancel();
            } else if (e.status == "failed") {
              TRANSACTION_DB.UPDATE_TRANSACTION({columns:{ status: "failed" }, conditions: { ref }});

              schedule.cancel();
            }
          })
            .catch(() => {});
        }, 5).schedule;

        return({ status: "pending" ,reference});
      } else if (e.status == "successful") {
        TRANSACTION_DB.INSERT_TRANSACTION(
          ref,
          e.data.biller_name,
          data_.user.wallet.mainbal,
          data_.user.userId,
          e.data.amount,
          "successful",
          e.data.created_at,
          "billpayment"
        );
       return({ status: "success"  ,reference});
      }
      else if (e.status = "failed") {
        return ({ status: "failed",reference });
        
      }
   
};









///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const validateElectricity = async (data_) => {
  const detail = {
    item_code: data_.body.item_code,
    code: data_.body.code,
    customer: data_.body.meterNumber,
  };

  let v = await  flw.Bills.validate(detail)
  if (!v) {
     throw(false)
   }
};
export const electricity = async (data_) => {
  let v = validateElectricity(data_)
  let reference = generateTransactionReference();

  const details = {
    country: data_.body.country,
    customer: data_.body.meterNumber,
    amount: data_.body.amount,
    type: data_.body.biller_name,
    reference: reference,
  };
  let e  = await flw.Bills.create_bill(details)
   
      if (e.status == "pending") {
        TRANSACTION_DB.INSERT_TRANSACTION(
          ref,
          e.data.biller_name,
          data_.user.wallet.mainbal,
          data_.user.userId,
          e.data.amount,
          "pending",
          e.data.created_at,
          "billpayment"
        );
        new Scheduler((schedule) => {
          let ref = reference;

          
          flw.Bills.fetch_status({ ref })
          .then((e) => {
            if (e.status == "successful") {
              TRANSACTION_DB.UPDATE_TRANSACTION({ columns: { status: "successful" }, conditions: { ref } });
              WALLET_BALANCE_DB.UPDATE_WALLET_BALANCE(
                {
                  conditions: { userId: data_.user.Id },
                  columns: { prevbal: data_.user.wallet.mainbal, mainbal: data_.user.wallet.mainbal - (e.data.amount + e.data.fee) }
                }
                
               
               
              );

              schedule.cancel();
            } else if (e.status == "failed") {
              TRANSACTION_DB.UPDATE_TRANSACTION({columns:{ status: "failed" }, conditions: { ref }});

              schedule.cancel();
            }
          })
            .catch(() => {});
        }, 5).schedule;

        res.json({ status: "pending" });
      } else if(e.status = "successful") {
        TRANSACTION_DB.INSERT_TRANSACTION(
          ref,
          e.data.biller_name,
          data_.user.wallet.mainbal,
          data_.user.userId,
          e.data.amount,
          "successful",
          e.data.created_at,
          "billpayment"
        );
        res.json({ status: "success" });
  }
  else if (e.status = "failed") {
  return ({ status: "failed", reference });
}
  
};
