require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");

var port = 3000;

var app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

// view engine middleware
require("./middlewares/all/view_engine.middleware")(app);

// customer middleware
require("./middlewares/customer/link_route_customer.middleware")(app);

// admin middleware
require("./middlewares/admin/link_route_admin.middleware")(app);

app.listen(port, function() {
  console.log("Server listening on port" + port);
});
