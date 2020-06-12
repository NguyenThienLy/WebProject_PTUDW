var customerModel = require("../../../models/customer.model");
var commentModel = require("../../../models/comment.model");
var newsModel = require("../../../models/news.model");
var productModel = require("../../../models/product.model");
var productComboModel = require("../../../models/product_combo.model");
var brandModel = require("../../../models/brand.model");
var categoryModel = require("../../../models/category.model");
var subCategoryModel = require("../../../models/sub_category.model");
var tagModel = require("../../../models/tag.model");
var orderInfoModel = require("../../../models/order_info.model");

// Đếm số lượng để gán value cho badge ở sidebar
module.exports = async function(req, res, next) {
  var customer_quantity = await customerModel.customersQuantity();
  var comment_quantity = await commentModel.commentsQuantity();
  var news_quantity = await newsModel.newsQuantity();
  var product_quantity = await productModel.productsQuantity();
  var productCombo_quantity = await productComboModel.productCombosQuantity();
  var brand_quantity = await brandModel.brandsQuantity();
  var category_quantity = await categoryModel.categoriesQuantity();
  var subCategory_quantity = await subCategoryModel.subCategoriesQuantity();
  var tag_quantity = await tagModel.tagsQuantity();
  var order_quantity = await orderInfoModel.ordersQuantity();

  res.locals.sidebar[1].quantity = customer_quantity[0].CUSTOMER_QUANTITY;
  res.locals.sidebar[3].quantity = order_quantity[0].ORDER_QUANTITY;
  res.locals.sidebar[4].quantity = product_quantity[0].PRODUCT_QUANTITY + productCombo_quantity[0].PRODUCTCOMBO_QUANTITY;
  res.locals.sidebar[6].quantity = news_quantity[0].NEWS_QUANTITY;
  res.locals.sidebar[8].quantity = comment_quantity[0].COMMENT_QUANTITY;
  res.locals.sidebar[9].quantity = category_quantity[0].CATEGORY_QUANTITY;
  res.locals.sidebar[10].quantity = subCategory_quantity[0].SUBCATEGORY_QUANTITY;
  res.locals.sidebar[11].quantity = tag_quantity[0].TAG_QUANTITY;
  res.locals.sidebar[12].quantity = brand_quantity[0].BRAND_QUANTITY;


  next();
};
