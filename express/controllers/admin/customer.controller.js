var customerModel = require("../../models/customer.model");

module.exports.customerShow = async function(req, res) {
  var customers = await customerModel.allCustomers();

  res.locals.sidebar[1].active = true;

  res.render("admin/customer", {
    layout: "main-admin.hbs",
    customers: customers
  });
};
