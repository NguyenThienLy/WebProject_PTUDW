// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi categoryModel
var categoryModel = require("../../models/category.model");

module.exports.indexShow = function(req, res) {
  var dataProducts = productModel.top8ProductForIndex();
  var dataCategories = categoryModel.allCategory_lv1();

  // lấy ra 8 sản phẩm sale nhiều nhất.
  dataProducts
    .then(products => {
      dataCategories.then(categories => {
        res.render("customer/index", {
          layout: "main-customer.hbs",
          products: products,
          categories: categories
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};
