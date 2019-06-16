var db = require("../utils/db");

module.exports.deleteCustomerViewByCustomerId = customerId => {
  return db.delete("customer_view", "CUSTOMERID", customerId);
};