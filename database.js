// const express = require('express');
const mysql = require('mysql2');
 
// const app = express();
// const PORT = 3000;
 
// Create a connection to the database
 con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: "vtutest"       
});
 
// open the MySQL connection



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class TRANSACTION {


    columns = ["ref", "transactionName", "walletBalance", "userId", "amount", "status", "time", "status"]
    data = null
    



    
      INSERT_TRANSACTION = (ref,billName,walletBalance,userId,amount,status,time,type) => {
        con.query(`INSERT INTO Transaction (${this.column.join(",")}) VALUES ?`, [ref,billName,walletBalance,userId,amount,status,time,type], function (err, result) {
            if (err) throw err;
            // console.log("Number of records inserted: " + result.affectedRows);
          });
    }
    UPDATE_TRANSACTION = ({conditions=null,columns}) => {
        let cols = []
        let query2 = conditions && Object.keys(conditions).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                throw("error")
            }
            if (index == arr.length - 1) { 

                total += `${acc} = ? `
            } else {
                
                total += `${acc} = ?,`
            }
            console.log(columns[acc],"AAAAAAAAA",acc,arr[acc],arr)
            cols.push(conditions[acc])
    
            return total
        },"")
        let whereValues = []
        let query = Object.keys(columns).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                console.log(acc)
                throw ("error")
            }
            if (index == arr.length - 1) { 

                total += `${acc} = ? `
            } else {
                
                total += `${acc} = ? AND`
            }
            whereValues.push(columns[acc])
    
            return total
        },"")
        // console.log(`UPDATE   SET ${query} ${conditions?" WHERE " +query2:""} `,[...cols,...whereValues])
        con.query(`UPDATE  Transaction SET ${query} ${conditions?" WHERE " +query2:""} `,[...whereValues,...cols], function (err, result) {
            if (err) throw err;
            if (result) {
                console.log(result)
            }
            // console.log("Number of records inserted: " + result.affectedRows);
          });
    }

    GET_TRANSACTION = ({ columns = null, conditions = null }) => {
        
        let query = columns && columns.reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                console.log(acc,this.columns.includes(acc))
                throw("error")
            }
            if (index == arr.length - 1) {

                total+=`${acc} `
             } else {
                 total+=`${acc}, `
                
            }
    
            return total
        }, "") || "*"
        let whereValues = []
        let query2 = conditions && Object.keys(conditions).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                throw("error")
            }
            console.log(arr,"dd")
            if (index == arr.length - 1) {
                
                total += `${acc} = ?`
            } else {
                
                total += `${acc} = ? AND `
            }
            whereValues.push(conditions[acc])
    
            return total
        },"")
      
        con.query(`SELECT ${query} FROM Transaction   ${conditions?" WHERE " +query2:""}`, [...whereValues], function (err, result) {
            if (err) throw err;
            if (result) {
                console.log(result)
            }
            // console.log("Number of records inserted: " + result.affectedRows);
          });
    }

    
}








//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class WALLET {

    columns = ["ref","userId"]
    data = null

    
      INSERT_WALLET = (ref,userId) => {
        con.query(`INSERT INTO Wallet (${this.columns.join(",")}) VALUES (?,?)`, [ref,userId], function (err, result) {
            if (err) throw err;
            if (result) {
                console.log(result)
            }
            // console.log("Number of records inserted: " + result.affectedRows);
          });
    }

    UPDATE_WALLET = ({conditions=null,columns}) => {
        let cols = []
        let query2 = conditions && Object.keys(conditions).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                throw("error")
            }
            if (index == arr.length - 1) { 

                total += `${acc} = ? `
            } else {
                
                total += `${acc} = ?,`
            }
            console.log(columns[acc],"AAAAAAAAA",acc,arr[acc],arr)
            cols.push(conditions[acc])
    
            return total
        },"")
        let whereValues = []
        let query = Object.keys(columns).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                console.log(acc)
                throw ("error")
            }
            if (index == arr.length - 1) { 

                total += `${acc} = ? `
            } else {
                
                total += `${acc} = ? AND`
            }
            whereValues.push(columns[acc])
    
            return total
        },"")
        console.log(`UPDATE  Wallet SET ${query} ${conditions?" WHERE " +query2:""} `,[...cols,...whereValues])
        con.query(`UPDATE  Wallet SET ${query} ${conditions?" WHERE " +query2:""} `,[...whereValues,...cols], function (err, result) {
            if (err) throw err;
            if (result) {
                console.log(result)
            }
            // console.log("Number of records inserted: " + result.affectedRows);
          });
    }

    GET_WALLET = ({ columns = null, conditions = null }) => {
        
        let query = columns && columns.reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                console.log(acc,this.columns.includes(acc))
                throw("error")
            }
            if (index == arr.length - 1) {

                total+=`${acc} `
             } else {
                 total+=`${acc}, `
                
            }
    
            return total
        }, "") || "*"
        let whereValues = []
        let query2 = conditions && Object.keys(conditions).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                throw("error")
            }
            console.log(arr,"dd")
            if (index == arr.length - 1) {
                
                total += `${acc} = ?`
            } else {
                
                total += `${acc} = ? AND `
            }
            whereValues.push(conditions[acc])
    
            return total
        },"")
      
        con.query(`SELECT ${query} FROM Wallet   ${conditions?" WHERE " +query2:""}`, [...whereValues], function (err, result) {
            if (err) throw err;
            if (result) {
                console.log(result)
            }
            // console.log("Number of records inserted: " + result.affectedRows);
          });
    }
    
    // GET_WALLET = ({  userId=null ,ref=null }) => {
    //     // con.query("SELECT INTO Wallet (ref ,userId) VALUES (?,?)", [values], function (err, result) {
    //     //     if (err) throw err;
    //     //     // console.log("Number of records inserted: " + result.affectedRows);
    //      // });
         
       
        
        
        
    //     if (ref) {
           
    //         let v = con.query("SELECT * FROM Wallet WHERE ref = ? ",[ref] , function (err, result) {
    //             if (err) throw err;
    //             if (result) {
    //               console.log(result)
    //           }
    //               // console.log("Number of records inserted: " + result.affectedRows);
    //         });
    //     }
    //     if (userId) {
    //         let v = con.query("SELECT * FROM Wallet WHERE userId = ? ",[userId] , function (err, result) {
    //             if (err) throw err;
    //             if (result) {
    //               console.log(result)
    //           }
    //               // console.log("Number of records inserted: " + result.affectedRows);
    //         });
            
    //     }
        
    //     // console.log(v[0],"S")
    // }
    
    

}    






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class WALLET_BALANCE {
    columns =[ "ref" ,"userId", "prevbal","newbal"]

     INSERT_WALLET_BALANCE = (ref,userId,prevbal,newbal) => {
       con.query("INSERT INTO WalletBalnce (ref ,userId, prevbal,newbal) VALUES (?,?,?,?)", [ref,userId,prevbal,newbal], function (err, result) {
           if (err) throw err;
           // console.log("Number of records inserted: " + result.affectedRows);
         });
    }
 
    GET_WALLET_BALANCE = ({ columns = null, conditions = null }) => {
        
        let query = columns && columns.reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                console.log(acc,this.columns.includes(acc))
                throw("error")
            }
            if (index == arr.length - 1) {

                total+=`${acc} `
             } else {
                 total+=`${acc}, `
                
            }
    
            return total
        }, "") || "*"
        let whereValues = []
        let query2 = conditions && Object.keys(conditions).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                throw("error")
            }
            console.log(arr,"dd")
            if (index == arr.length - 1) {
                
                total += `${acc} = ?`
            } else {
                
                total += `${acc} = ? AND `
            }
            whereValues.push(conditions[acc])
    
            return total
        },"")
      
        con.query(`SELECT ${query} FROM WalletBalance   ${conditions?" WHERE " +query2:""}`, [...whereValues], function (err, result) {
            if (err) throw err;
            if (result) {
                console.log(result)
            }
            // console.log("Number of records inserted: " + result.affectedRows);
          });
    }

    UPDATE_WALLET_BALANCE = ({conditions=null,columns}) => {
        let cols = []
        let query2 = conditions && Object.keys(conditions).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                throw("error")
            }
            if (index == arr.length - 1) { 

                total += `${acc} = ? `
            } else {
                
                total += `${acc} = ?,`
            }
            console.log(columns[acc],"AAAAAAAAA",acc,arr[acc],arr)
            cols.push(conditions[acc])
    
            return total
        },"")
        let whereValues = []
        let query = Object.keys(columns).reduce((total, acc, index,arr) => {
            if (!this.columns.includes(acc)) {
                console.log(acc)
                throw ("error")
            }
            if (index == arr.length - 1) { 

                total += `${acc} = ? `
            } else {
                
                total += `${acc} = ? AND`
            }
            whereValues.push(columns[acc])
    
            return total
        },"")
        console.log(`UPDATE  WalletBalance SET ${query} ${conditions?" WHERE " +query2:""} `,[...cols,...whereValues])
        con.query(`UPDATE  WalletBalance SET ${query} ${conditions?" WHERE " +query2:""} `,[...whereValues,...cols], function (err, result) {
            if (err) throw err;
            if (result) {
                console.log(result)
            }
            // console.log("Number of records inserted: " + result.affectedRows);
          });
    }
  
}


module.exports = {WALLET,TRANSACTION,WALLET_BALANCE}