require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var createError = require('http-errors');

var port = 3001;

var app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

// view engine middleware
require("./middlewares/all/view_engine.middleware")(app);

require('./middlewares/all/session.middleware')(app);

require('./middlewares/admin/passport.middleware')(app);
require('./middlewares/customer/passport.middleware')(app);

// customer middleware
require("./middlewares/customer/link_route_customer.middleware")(app);

// admin middleware
require("./middlewares/admin/link_route_admin.middleware")(app);

app.use((req, res, next) => {
  next(createError(404));
})

app.use((err, req, res, next) => {
  var status = err.status || 500;
  var errorView = 'customer/error';
  if (status === 404)
    errorView = 'customer/404';

  var msg = err.message;
  var error = err;
  res.status(status).render(errorView, {
    layout: false,
    msg,
    error
  })
})

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
