var brandModel = require("../../models/brand.model");
var productModel = require("../../models/product.model");

// Gọi createquery helper
var createQuery = require("../../helpers/create_query.helper");

module.exports.brandShow = function(req, res, next) {
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

  var dataBrands = brandModel.pageAllBrandFilter(limit, offset, objQuery);

  var numberPage = brandModel.quantityBrandActive(objQuery);

  Promise.all([dataBrands, numberPage])
    .then(values => {
      res.locals.sidebar[12].active = true;

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

      res.render("admin/brand", {
        layout: "main-admin.hbs",
        brands: values[0],
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

module.exports.brandInfo = function(req, res, next) {
  var dataBrand = brandModel.singleByBrandId(req.body.BrandID);
  dataBrand
    .then(brand => {
      res.send({ brand: brand[0] });
    })
    .catch(next);
};

module.exports.postAddBrand = (req, res, next) => {
  var newBrandName = req.body.BrandName;
  
  var newBrand = {
    NAME: newBrandName
  };

  brandModel
    .addBrand(newBrand)
    .then(brandID => {
      res.send(true);
    })
    .catch(next);
};

module.exports.postBrandNameUpdate = (req, res, next) => {
  var brandId = req.body.BrandID;
  var brandName = req.body.UpdateBrandName;

  var updateBrand = {
    ID: brandId,
    NAME: brandName
  };

  brandModel
    .updateBrand(updateBrand)
    .then(changedRowsNumber => {
      res.send(true);
    })
    .catch(next);
};

module.exports.postDeleteBrand = (req, res, next) => {
  var brandId = req.body.BrandID;
  
  productModel.productQuantityByBrandId(brandId).then(quantity => {
      if (quantity[0].QUANTITY > 0) {
          res.send(false);
      } else {
        brandModel.deleteBrandById(brandId).then(affectedRowNumber => {
            res.send(true);
        })
      }
  }).catch(next);
};
