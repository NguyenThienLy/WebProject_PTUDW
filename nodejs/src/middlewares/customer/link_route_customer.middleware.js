var customerIndexRoute = require("../../routes/customer/index.route");
var customerProductRoute = require("../../routes/customer/product.route");
var customerInfoRoute = require("../../routes/customer/info.route");
var customerCartRoute = require("../../routes/customer/cart.route");
var customerAuthRoute = require("../../routes/customer/auth.route");
var customerOrderRoute = require("../../routes/customer/order.route");

var customerCategoryMiddleware = require("../../middlewares/customer/category.middleware");
var customerSessionMiddleware = require("../../middlewares/customer/session.middleware");
var customerShowFastCartMiddleware = require("../../middlewares/customer/show_fast_cart.middleware");
var authLocal = require("../all/auth-locals.middleware");

module.exports = function(app) {
  app.use(authLocal);

  app.use(
    "/customer/auth",
    customerSessionMiddleware,
    customerCategoryMiddleware,
    customerShowFastCartMiddleware,
    customerAuthRoute
  );

  app.use(
    "/customer/index",
    customerSessionMiddleware,
    customerCategoryMiddleware,
    customerShowFastCartMiddleware,
    customerIndexRoute
  );
  app.use(
    "/customer/product",
    customerSessionMiddleware,
    customerCategoryMiddleware,
    customerShowFastCartMiddleware,
    customerProductRoute
  );
  app.use(
    "/customer/info",
    customerSessionMiddleware,
    customerCategoryMiddleware,
    customerShowFastCartMiddleware,
    customerInfoRoute
  );

  app.use(
    "/customer/cart",
    customerSessionMiddleware,
    customerCategoryMiddleware,
    customerShowFastCartMiddleware,
    customerCartRoute
  );

  app.use(
    "/customer/order",
    customerSessionMiddleware,
    customerCategoryMiddleware,
    customerShowFastCartMiddleware,
    customerOrderRoute
  );
};
