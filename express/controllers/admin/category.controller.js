var categoryModel = require("../../models/category.model");
var subCategoryModel = require("../../models/sub_category.model");
var productModel = require("../../models/product.model");

// Gọi createquery helper
var createQuery = require("../../helpers/create_query.helper");

module.exports.categoryShow = function(req, res, next) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 5;

  var name = req.query.name || "";

  var objQuery = {
    Name: name
  };

  if (isNaN(page)) {
    page = 1;
  }

  if (page < 1) {
    page = 1;
  }

  if (page < 1) {
    limit = 5;
  }

  var offset = (page - 1) * limit;

  var dataCategories = categoryModel.pageAllCategoryFilter(limit, offset, objQuery);

  var numberPage = categoryModel.quantityCategoryActive(objQuery);

  var dataSubCategories = subCategoryModel.allSubCategory();

  Promise.all([dataCategories, dataSubCategories, numberPage])
    .then(values => {
      res.locals.sidebar[9].active = true;

      var total = values[2][0].QUANTITY;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;

      var pages = createArrPage(nPages, page);

      var prePage = {
        value: 0,
        active: false
      };
      if (page > 1) {
        prePage.value = page - 1
        prePage.active = true;
      } else {
        prePage.value = 0
        prePage.active = false;
      }

      var nextPage = {
        value: 0,
        active: false
      }

      if (page < nPages) {
        nextPage.value = parseInt(page) + 1
        nextPage.active = true;
      } else {
        nextPage.value = 0
        nextPage.active = false;
      }

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
        categories: listCategories,
        pages: pages,
        prePage: prePage,
        nextPage: nextPage,
        name: name,
        helpers: {
          createQueryCustomer: createQuery.createQueryCustomer
        }
      });
    })
    .catch(next);
};

//Hàm tạo mảng trang
function createArrPage(nPages, page) {
  var pages = [];
  //Chỉ hiện tối đa 5 trang
  var start = end = 0;
  if (nPages <= 5) {
    start = 1;
    end = nPages;
  } else {
    if (page == 1) {
      start = 1;
      end = 5;
    }
    else if (page == nPages) {
      start = nPages - 5;
      end = nPages;
    }
    else {
      if (page - 2 >= 1 && parseInt(page) + 2 <= nPages) {
        start = page - 2;
        end = parseInt(page) + 2;
      } else {
        if (page - 2 == 0) {
          start = page - 1;
          end = parseInt(page) + 3;
        } else {
          start = page - 3;
          end = parseInt(page) + 1;
        }
      }
    }
  }
  for (i = start; i <= end; i++) {
    var obj = {
      value: i,
      active: i === +page
    };
    pages.push(obj);
  }

  return pages;
}

module.exports.categoryAdd = function(req, res, next) {
  res.locals.sidebar[9].active = true;

  res.render("admin/category-add", {
    layout: "main-admin.hbs"
  });
};

module.exports.postCategoryAdd = function(req, res, next) {
  var subCategories = req.body.SUBCATEGORIES;

  var newCategory = {
    NAME: req.body.NAME
  };
  categoryModel.addCategory(newCategory).then(newCategoryId => {
    subCategoryModel.addSubCategoriesForCategory(newCategoryId, subCategories);
    res.redirect("/admin/category/category-add");
  });
};

module.exports.categoryUpdate = function(req, res, next) {
  var categoryId = req.params.id;
  var dataCategory = categoryModel.singleById(categoryId);
  var dataSubCategories = subCategoryModel.allSubCategoryByCategoryId(
    categoryId
  );

  if (isNaN(categoryId)) {
    categoryId = 0;
  }

  Promise.all([dataCategory, dataSubCategories]).then(values => {
    if (values[0][0]) {
      res.locals.sidebar[9].active = true;

      res.render("admin/category-update", {
        layout: "main-admin.hbs",
        category: values[0][0],
        subCategories: values[1]
      });
    } else {
      res.redirect("/admin/category/category-show");
    }
  });
};

module.exports.postCategoryUpdate = function(req, res, next) {
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

  categoryModel.updateCategory(category).then(changedRowsNumber => {
    subCategoryModel.deleteSubCategories(listDeleteSubCategories);
    subCategoryModel.addSubCategoriesForCategory(req.body.ID, listNewSubCategories);

    res.send(true);
  }).catch(err => {
    res.send(false);
  });
};

// Xóa danh mục
module.exports.postDeleteCategory = (req, res, next) => {
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
              .catch(err => {
                res.send(false);
              });
          })
          .catch(err => {
            res.send(false);
          });
      }
    })
    .catch(err => {
      res.send(false);
    });
};
