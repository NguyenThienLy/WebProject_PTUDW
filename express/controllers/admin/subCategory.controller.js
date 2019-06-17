var categoryModel = require("../../models/category.model");
var subCategoryModel = require("../../models/sub_category.model");
var productModel = require("../../models/product.model");
var productInfoHistory = require("../../models/product_info_history");
// Gọi selected helper
var selectedHelper = require("../../helpers/selected_selector.helper");

module.exports.subCategoryShow = function(req, res, next) {
  var getAllSubCategories = subCategoryModel.allSubCategory();

  getAllSubCategories
    .then(subCategories => {
      res.locals.sidebar[10].active = true;

      res.render("admin/subCategory-show", {
        layout: "main-admin.hbs",
        subCategories: subCategories
      });
    })
    .catch(next);
};

module.exports.subCategoryAdd = function(req, res, next) {
  categoryModel.allCategory().then(categories => {
    res.locals.sidebar[10].active = true;

    res.render("admin/subCategory-add", {
      layout: "main-admin.hbs",
      categories: categories
    });
  });
};

module.exports.postSubCategoryAdd = function(req, res, next) {
  var newSubCategory = {
    NAME: req.body.NAME,
    CATEGORYID: req.body.CATEGORYID
  };

  subCategoryModel.addSubCategory(newSubCategory).then(subCategoryId => {
    res.redirect("/admin/subCategory/subCategory-add");
  })
};

module.exports.subCategoryUpdate = function(req, res, next) {
  var subCategoryId = req.params.id;
  var dataSubCategory = subCategoryModel.singleById(subCategoryId);
  var dataCategories = categoryModel.allCategory();

  Promise.all([dataSubCategory, dataCategories]).then(values => {
    res.locals.sidebar[9].active = true;

    res.render("admin/subCategory-update", {
      layout: "main-admin.hbs",
      subCategory: values[0][0],
      categories: values[1],
      helpers: {
        isSelected: selectedHelper.isSelected
      }
    });
  });
};

module.exports.postSubCategoryUpdate = function(req, res, next) {
  var subCategory = {
    ID: req.body.ID,
    CATEGORYID: req.body.CATEGORYID,
    NAME: req.body.NAME
  };

  var oldCategoryId = req.body.OLDCATEGORYID;

  subCategoryModel.updateSubCategory(subCategory).then(changedRowsNumber => {
    if (req.body.CATEGORYID !== oldCategoryId) {
      var updateProduct = {
        SUBCATEGORYID: req.body.ID,
        CATEGORYID: req.body.CATEGORYID
      }

      productModel.updateCategoryIdBySubCategoryIdForProduct(updateProduct).then(changedRowsNumber => {
        res.redirect(req.get("referer"));
      }).catch(next);
    }
  }).catch(next);
};

// Xóa danh mục phụ
module.exports.postDeleteSubCategory = (req, res, next) => {
  var subCategoryId = req.body.SubCategoryID;

  productModel
    .productQuantityBySubCategoryId(subCategoryId)
    .then(quantity => {
      if (quantity[0].QUANTITY > 0) {
        res.send(false);
      } else {
        subCategoryModel
          .deleteSubCategoryById(subCategoryId)
          .then(affectedRowsNumber => {
            res.send(true);
          })
          .catch(next);
      }
    })
    .catch(next);
};

// Xóa danh mục
module.exports.postIsValidDeleteSubCategory = async (req, res, next) => {
  var listSubCategories = req.body.SUBCATEGORIES;
  var isValidToDelete = true;

  for (var i = 0; i < listSubCategories.length; i++) {
    var subCategoryId = listSubCategories[i];
    var quantity = await productModel.productQuantityBySubCategoryId(
      subCategoryId
    );
    if (quantity[0].QUANTITY > 0) {
      isValidToDelete = false;
      break;
    }
  }

  if (isValidToDelete) {
    res.send(true);
  } else {
    res.send(false);
  }
};
