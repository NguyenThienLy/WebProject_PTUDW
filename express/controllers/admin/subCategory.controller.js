var categoryModel = require("../../models/category.model");
var subCategoryModel = require("../../models/sub_category.model");
var productModel = require("../../models/product.model");
var productInfoHistory = require("../../models/product_info_history");
// Gọi selected helper
var selectedHelper = require("../../helpers/selected_selector.helper");
// Gọi createquery helper
var createQuery = require("../../helpers/create_query.helper");

module.exports.subCategoryShow = function(req, res, next) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 5;

  var name = req.query.name || "";

  var objQuery = {
    Name: name
  };

  if (page < 1) {
    page = 1;
  }

  if (page < 1) {
    limit = 5;
  }

  var offset = (page - 1) * limit;

  var dataSubCategories = subCategoryModel.pageAllSubCategoryFilter(limit, offset, objQuery);

  var numberPage = subCategoryModel.quantitySubCategoryActive(objQuery);

  Promise.all([dataSubCategories, numberPage])
    .then(values => {
      res.locals.sidebar[10].active = true;

      var total = values[1][0].QUANTITY;
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

      res.render("admin/subCategory-show", {
        layout: "main-admin.hbs",
        subCategories: values[0],
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
