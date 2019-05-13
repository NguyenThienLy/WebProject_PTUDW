var indexModel = require("../models/customer.index.model");

module.exports.indexShow = function(req, res) {
  var products = indexModel.getProductForIndex();
  var categories = indexModel.getCategoryLv1ForIndex();

  // Promise.all([
  //   products
  //   .then(rows => {
  //     res.render("customer/index", {
  //       layout: "main-customer.hbs",
  //       products: rows
  //     });
  //   }),
  //   categories
  //   .then(rows => {
      
  //   })
  // ])



  // // lấy ra 10 sản phẩm sale nhiều nhất.
  // products
  //   .then(rows => {
  //     res.render("customer/index", {
  //       layout: "main-customer.hbs",
  //       products: rows
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // // lấy ra danh mục cấp 1
  // categories
  //   .then(rows => {
  //     res.render("customer/index", {
  //       layout: "main-customer.hbs",
  //       categories: rows
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};
