const express = require("express");
// const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;
const cookieparser = require("cookie-parser");
app.use(cookieparser("29i2009i41i92093902032903921"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'yourpassword',
//   database: "ExpressIntegration"
// });

// open the MySQL connection

// const wallet = require("./controllers/wallet.js");
// const bill = require("./controllers/billpayment.js");
const webhook = require("./webhook.js");
// const user = ("./controllers/user.js")

// app.use("/user", things);
// app.use("/user/wallet", wallet);
// app.use("/user/bill", bill);
app.use("/", (req, res, next) => {
  console.log(req,req.body)
  next()
});


app.post("/webhook",webhook)
// app.POST("/webhook",webhook)


  //If Everything goes correct, Then start Express Server
  app.listen(PORT, () => {
    console.log(
      "Database connection is Ready and " + "Server is Listening on Port ",
      PORT
    );
  });

