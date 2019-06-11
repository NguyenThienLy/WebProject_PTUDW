var customerModel = require("../../models/customer.model");
var formatPriceHelper = require("../../helpers/format_price.helper");

module.exports.customerShow = function(req, res, next) {
  var getAllCustomers = customerModel.allCustomers();

  getAllCustomers
    .then(customers => {
      res.locals.sidebar[1].active = true;

      res.render("admin/customer", {
        layout: "main-admin.hbs",
        customers: customers,
        helpers: {
          // Hàm định dạng lại price dấu cách giữa ba kí tự
          formatPrice: formatPriceHelper
        }
      });
    }).catch(next);
};
