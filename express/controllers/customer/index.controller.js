// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");
// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// Gọi newsModel
var newsModel = require("../../models/news.model")
 
module.exports.indexShow = function(req, res) {
  var dataProducts = productModel.top8ProductForIndex();
  var dataProductsCombo = productComboModel.top6ProductComboForIndex();
  var dataCategories = categoryModel.allCategory_lv1();
  var dataNews = newsModel.top3PopularNewsIndexForIndex();

  Promise.all([dataProducts, dataProductsCombo, dataCategories, dataNews])
    .then(values => {
      console.log(values[3]);
      
      res.render("customer/index", {
        layout: "main-customer.hbs",
        products: values[0],
        productsCombo: values[1],
        categories: values[2],
        news: values[3]
      });
    })
    .catch(err => {
      console.log(err);
    });
};
