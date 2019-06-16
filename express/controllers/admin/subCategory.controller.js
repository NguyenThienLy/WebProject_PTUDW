var categoryModel = require("../../models/category.model");
var subCategoryModel = require("../../models/sub_category.model");
var productModel = require("../../models/product.model");

module.exports.subCategoryShow = function(req, res, next) {
  var getAllCategories = categoryModel.allCategory();
  var getAllSubCategories = subCategoryModel.allSubCategory();

  Promise.all([getAllCategories, getAllSubCategories])
    .then(values => {
      res.locals.sidebar[9].active = true;

      var listCategories = values[0];
      var listSubCategories = values[1];

      listCategories.forEach(category => {
        category.SUBCATEGORIES = [];
        listSubCategories.forEach(subCategory => {
          if (subCategory.CATEGORYID === category.ID) {
            category.SUBCATEGORIES.push(subCategory);
          }
        });
      });

      res.render("admin/category-show", {
        layout: "main-admin.hbs",
        categories: listCategories
      });
    })
    .catch(next);
};

module.exports.subCategoryAdd = function(req, res, next) {
  res.locals.sidebar[9].active = true;

  res.render("admin/category-add", {
    layout: "main-admin.hbs"
  });
};

module.exports.postSubCategoryAdd = function(req, res, next) {
  var subCategories = req.body.SUBCATEGORIES;

  var newCategory = {
    NAME: req.body.NAME
  };
  categoryModel.addCategory(newCategory).then(newCategoryId => {
    subCategoryModel.addSubCategoriesForCategory(newCategoryId, subCategories);
    res.redirect("/admin/category/category-add");
  });
};

module.exports.subCategoryUpdate = function(req, res, next) {
  var categoryId = req.params.id;
  var dataCategory = categoryModel.singleById(categoryId);
  var dataSubCategories = subCategoryModel.allSubCategoryByCategoryId(
    categoryId
  );

  Promise.all([dataCategory, dataSubCategories]).then(values => {
    res.locals.sidebar[9].active = true;

    res.render("admin/category-update", {
      layout: "main-admin.hbs",
      category: values[0][0],
      subCategories: values[1]
    });
  });
};

module.exports.postSubCategoryUpdate = function(req, res, next) {
  var category = {
    ID: req.body.ID,
    NAME: req.body.NAME
  };

  var listSubCategories = req.body.SUBCATEGORIES;
  var listOldSubCategories = req.body.OLDSUBCATEGORIES;
  var listNewSubCategories = [];
  var listDeleteSubCategories = [];

  // tìm những danh mục con mới
  listSubCategories.forEach(subCategory => {
    if (listOldSubCategories.indexOf(subCategory) == -1) {
      listNewSubCategories.push(subCategory);
    }
  });

  // tìm những danh mục con cũ bị xóa
  listOldSubCategories.forEach(oldSubCategory => {
    if (listSubCategories.indexOf(oldSubCategory) == -1) {
      listDeleteSubCategories.push(oldSubCategory);
    }
  });
  
  res.redirect("/admin/category/category-show");

  // categoryModel.updateCategory(category).then(changedRowsNumber => {
  //   subCategoryModel.deleteSubCategories(listDeleteSubCategories);
  //   subCategoryModel.addSubCategoriesForCategory(req.body.ID, listNewSubCategories);

  //   res.redirect("/admin/category/category-show");
  // }).catch(next);
};

// Xóa danh mục
module.exports.postDeleteSubCategory = (req, res, next) => {
  var categoryId = req.body.CategoryID;

  productModel
    .productQuantityByCategoryId(categoryId)
    .then(quantity => {
      if (quantity[0].QUANTITY > 0) {
        res.send(false);
      } else {
        subCategoryModel
          .deleteSubCategoriesByCategoryId(categoryId)
          .then(affectedRowsNumber1 => {
            categoryModel
              .deleteCategoryByCategoryId(categoryId)
              .then(affectedRowsNumber2 => {
                res.send(true);
              })
              .catch(next);
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

    for(var i = 0; i < listSubCategories.length; i++) {
        var subCategoryId = listSubCategories[i];
        var quantity = await productModel.productQuantityBySubCategoryId(subCategoryId);
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
}