// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");
// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// Gọi newsModel
var newsModel = require("../../models/news.model");

// Gọi formaPriceHelper
var formatPriceHelper = require("../../helpers/format_price.helper");
// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi convertToDateHelper
var convertToDateHelper = require("../../helpers/convert_to_date.helper");

module.exports.indexShow = function(req, res) {
  var dataProducts = productModel.top8ProductForIndex();
  var dataProductsCombo = productComboModel.top6ProductComboForIndex();
  var dataCategories = categoryModel.allCategory();
  var dataNews = newsModel.top3PopularNewsIndexForIndex();

  Promise.all([dataProducts, dataProductsCombo, dataCategories, dataNews])
    .then(values => {
      res.render("customer/index", {
        layout: "main-customer.hbs",
        products: values[0],
        productsCombo: values[1],
        categories: values[2],
        news: values[3],
        helpers: {
          // Hàm chuyển đổi qua kiểu ngày
          convertToDate: convertToDateHelper,
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo:  formatStringHelper.formatTitleProductCombo,
          // Hàm định dạng title của info lấy 85 kí tự
          formatTitleInfo:  formatStringHelper.formatTitleInfo,
          // Hàm định dạng short content của info lấy 320 kí tự
          formatShortContentInfo: formatStringHelper.formatShortContentInfo,
          // Hàm định dạng lại price dấu cách giữa ba kí tự
          formatPrice: formatPriceHelper
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};
