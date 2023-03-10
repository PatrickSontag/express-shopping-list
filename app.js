const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require("./routes/items");
const middleware = require("./middleware");
const items = require('./fakeDb');

const app = express();

app.use(express.json());
app.use(middleware.logger);
app.use(express.urlencoded({ extended: true }));

//  apply a prefix to every route in itemRoutes
app.use("/items", itemRoutes);
// end itemRoutes

app.get('/', function(req, res) {
    return res.json(items);
});

// 404 handler
app.use(function(req, res) {
    return new ExpressError("Not Found", 404);
  });

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.json({
			error: err.message,
	});
});


module.exports = app;