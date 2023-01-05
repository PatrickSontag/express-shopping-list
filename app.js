const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require("./routes");
const middleware = require("./middleware");
const items = require('./fakeDb');

const app = express();

app.use(express.json());
app.use(middleware.logger);
// app.use(express.urlencoded({ extended: true }));

//  apply a prefix to every route in itemRoutes
app.use("/items", itemRoutes);
// end itemRoutes

// const SHOPPING_LIST = [
//     { id: 1, item: 'socks', price: 11.95 },
//     { id: 2, item: 'shirt', price: 28.89 },
//     { id: 3, item: 'hat', price: 25.15 }
// ]

app.get('/', function(req, res) {
    return res.send("Shopping List");
});

// // generic error handler
// app.use(function(err, req, res, next) {
//     // the default status is 500 Internal Server Error
//     let status = err.status || 500;
//     console.log("ERROR 500")
  
//     // set the status and alert the user
//     return res.status(status).json({
//       error: {
//         message: err.message,
//         status: status
//       }
//     });
//   });
//   // end generic handler

// 404 handler
app.use(function(req, res) {
    // console.log("404")
    return new ExpressError("Not Found", 404);
  });

app.listen(3000, function() {
    console.log('Server started on port 3000.');
});