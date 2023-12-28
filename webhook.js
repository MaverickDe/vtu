const { INSERT_TRANSACTION, UPDATE_WALLET_BALANCE, GET_TRANSACTION, UPDATE_TRANSACTION } = require("./database");

let webhook = async (req, res) => {




    console.log(req.body)
    
    res.status(200).json({ss:"S"})
    // let data = req.body
    // const secretHash = process.env.FLW_SECRET_HASH;
    // const signature = req.headers["verif-hash"];
    // if (!signature || (signature !== secretHash)) {
    //     // This request isn't from Flutterwave; discard
    //     res.status(401).end();
    // }
    
    // const payload = req.body;
    
    // const response = await flw.Transaction.verify({ id: payload.id });
    // let d = response.data
    // if (payload["event.type"] == "BANK_TRANSFER_TRANSACTION") {
        
    //     if (
    //         d.status === "successful"
           
    //         && d.currency === "NGN") {
    //             let transaction = SELECT_TRANSACTION(d.tx_ref)
    //             if (transaction) {
                    
    //                 UPDATE_TRANSACTION([{ field: "status", data: d.status }], transaction.userId)
    //                 UPDATE_WALLET_BALANCE([{ field: "", data: d.status }], transaction.userId)
    //             } else {
              
                        
    //                     INSERT_TRANSACTION(d.tx_ref,response.event_type,req.user.wallet.newbal,req.user.userId,d.amount,d.status,d.created_at,"transfer")
                    
    //             }
            
            
    //         // Success! Confirm the customer's payment
    //     }
    //     else if (d.status === "pending"
           
    //     && d.currency === "NGN"){
    //         try {
    //             let transaction = GET_TRANSACTION("*", [{ ref: d.tx_ref }])
                
    //             if (!transaction) {
                    
    //                 INSERT_TRANSACTION(d.tx_ref,response.event_type,req.user.wallet.newbal,req.user.userId,d.amount,d.status,d.created_at,"transfer")
    //             }
    //         } catch (e) {
    //             INSERT_TRANSACTION(d.tx_ref,response.event_type,req.user.wallet.newbal,req.user.userId,d.amount,d.status,d.created_at,"transfer")
                
    //         }
            
    //         // Inform the customer their payment was unsuccessful
    //     }
    //     else if (d.status === "failed"
           
    //         && d.currency === "NGN") {
    //             try {
    //                 let transaction = GET_TRANSACTION("*", [{ ref: d.tx_ref }])
                    
    //                 if (transaction) {
    //                     UPDATE_TRANSACTION([{ status: "failed" }], [{ref: d.tx_ref} ])
                        
    //                     // INSERT_TRANSACTION(d.tx_ref,response.event_type,req.user.wallet.newbal,req.user.userId,d.amount,d.status,d.created_at,"transfer")
    //                 }
    //             } catch (e) {
    //                 // INSERT_TRANSACTION(d.tx_ref,response.event_type,req.user.wallet.newbal,req.user.userId,d.amount,d.status,d.created_at,"transfer")
                    
    //             }
    //         // SELECT_TRANSACTION([],[])
    //         // INSERT_TRANSACTION(d.tx_ref,response.event_type,req.user.wallet.newbal,req.user.userId,d.amount,d.status,d.created_at,"transfer")
            
    //         // Inform the customer their payment was unsuccessful
    //     }
    // }
        
    
}

module.exports =webhook