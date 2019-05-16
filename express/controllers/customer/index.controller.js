// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");
// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// Gọi newsModel
var newsModel = require("../../models/news.model");

module.exports.indexShow = function(req, res) {
  var dataProducts = productModel.top8ProductForIndex();
  var dataProductsCombo = productComboModel.top6ProductComboForIndex();
  var dataCategories = categoryModel.allCategory();
  var dataNews = newsModel.top3PopularNewsIndexForIndex();

  Promise.all([dataProducts, dataProductsCombo, dataCategories, dataNews])
    .then(values => {
      console.log(values[3]);

      res.render("customer/index", {
        layout: "main-customer.hbs",
        products: values[0],
        productsCombo: values[1],
        categories: values[2],
        news: values[3],
        helpers: {
          // Hàm chuyển đổi qua kiểu ngày
          convertToDate: function(value) {
            return value.toLocaleDateString();
          },
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: function(value) {
            if (value.length > 36) return value.substr(0, 36) + "...";

            return value;
          },
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: function(value) {
            if (value.length > 52) return value.substr(0, 52) + "...";

            return value;
          },
          // Hàm định dạng title của info lấy 85 kí tự
          formatTitleInfo: function(value) {
            if (value.length > 85) return value.substr(0, 85) + "...";

            return value;
          },
          // Hàm định dạng short content của info lấy 320 kí tự
          formatShortContentInfo: function(value) {
            if (value.length > 320) return value.substr(0, 320) + "...";

            return value;
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};
