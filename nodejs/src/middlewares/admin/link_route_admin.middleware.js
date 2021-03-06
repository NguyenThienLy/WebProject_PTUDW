var adminIndexRoute = require("../../routes/admin/index.route");
var adminProductRoute = require("../../routes/admin/product.route");
var adminInfoRoute = require("../../routes/admin/info.route");
var adminCustomerRoute = require("../../routes/admin/customer.route");
var adminReportRoute = require("../../routes/admin/report.route");
var adminOrderRoute = require("../../routes/admin/order.route");
var adminCommentRoute = require("../../routes/admin/comment.route");
var adminTagRoute = require("../../routes/admin/tag.route");
var adminBrandRoute = require("../../routes/admin/brand.route");
var adminCategoryRoute = require("../../routes/admin/category.route");
var adminSubCategoryRoute = require("../../routes/admin/subCategory.route");
var adminAuthRoute = require("../../routes/admin/auth.route");

var adminAuthMiddleware = require("./auth.middleware");
var authLocal = require("../all/auth-locals.middleware");
var adminSidebarActiveMiddleware = require("./sidebar/active.middleware");
var adminSidebarQuantityBadgeMiddleware = require("./sidebar/quantity_badge.middleware");

module.exports = function(app) {
  app.use(authLocal);

  app.use("/admin/auth", adminAuthRoute);

  app.use(
    "/admin/index",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminIndexRoute
  );
  app.use(
    "/admin/product",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminProductRoute
  );
  app.use(
    "/admin/info",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminInfoRoute
  );
  app.use(
    "/admin/customer",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminCustomerRoute
  );
  app.use(
    "/admin/report",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminReportRoute
  );
  app.use(
    "/admin/order",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminOrderRoute
  );
  app.use(
    "/admin/comment",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminCommentRoute
  );
  app.use(
    "/admin/tag",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminTagRoute
  );
  app.use(
    "/admin/brand",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminBrandRoute
  );
  app.use(
    "/admin/category",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminCategoryRoute
  );
  app.use(
    "/admin/subCategory",
    adminAuthMiddleware.requireAuth,
    adminSidebarActiveMiddleware,
    adminSidebarQuantityBadgeMiddleware,
    adminSubCategoryRoute
  );
};
