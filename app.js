const express = require('express');
const expressError = require('./expressError');
const itemRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  apply a prefix to every route in itemRoutes
app.use("/items", itemRoutes);
// end itemRoutes

const SHOPPING_LIST = [
    { id: 1, item: 'socks', price: 11.95 },
    { id: 2, item: 'shirt', price: 28.89 },
    { id: 3, item: 'hat', price: 25.15 }
]

app.get('/', function(req, res) {
    console.log('root route');
    console.log(SHOPPING_LIST);
    return res.send('Shopping List');
});

app.listen(3000, function() {
    console.log('Server started on port 3000.');
});