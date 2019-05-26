// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");
// Gọi productModel
var productModel = require("../../models/product.model");
// // Gọi subCategoryModel
// var subCategoryModel = require("../../models/sub_category.model");

// Load lên các giá trị của catogory và sub category
module.exports = (req, res, next) => {
  try {
    Promise.all([
      categoryModel.allWithDetailQuantity(),
      productModel.quantityProduct(),
      productComboModel.quantityProductCombo()
    ]).then(values => {
      var groups = {};
      for (var i = 0; i < values[0].length; i++) {
        // Tạo category hiện tại
        var category = {
          IDCAT: values[0][i].IDCAT,
          NAMECAT: values[0][i].NAMECAT,
          QUANTITYCAT: values[0][i].QUANTITYCAT
        };

        var groupName = category.IDCAT;

        // Kiểm tra category này tồn tại chưa
        if (!groups[groupName]) {
          groups[groupName] = [];
          groups[groupName].push(category);
        }

        // Tạo sub category con
        var subCategory = {
          IDCAT: values[0][i].IDCAT,
          IDSUB: values[0][i].IDSUB,
          NAMESUB: values[0][i].NAMESUB,
          QUANTITYSUB: values[0][i].QUANTITYSUB
        };

        groups[groupName].push(subCategory);
      }
      var categoriesDetail = [];
      for (var groupName in groups) {
        // Lấy phần tử đầu
        var category = groups[groupName][0];
        // Bỏ quả phần tử đầu
        groups[groupName].shift();

        categoriesDetail.push({
          IDCAT: category.IDCAT,
          NAMECAT: category.NAMECAT,
          QUANTITYCAT: category.QUANTITYCAT,
          SUB: groups[groupName]
        });
      }

      // Gán danh mục categories vào locals
      res.locals.lcCategories = categoriesDetail;

      // Kiểm tra xem giá trị trả về có phải là số không
      if (isNaN(+values[1][0].QUANTITY) == true) values[1][0].QUANTITY = 0;
      if (isNaN(+values[2][0].QUANTITY) == true) values[2][0].QUANTITY = 0;

      // Gán số lượng của tổng số sản phẩm và tổng số sản phẩm combo vào locals
      res.locals.lcSumQuantityProductAll = +values[1][0].QUANTITY + +values[2][0].QUANTITY;
      res.locals.lcSumQuantityProductCombo = +values[2][0].QUANTITY;

      next();
    });
  } catch (error) {
    next(error);
  }
};
