const express = require('express');
const expressError = require('./expressError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    console.log('root route');
    return res.send('Shopping List');
});

app.listen(3000, function() {
    console.log('Server started on port 3000.');
});