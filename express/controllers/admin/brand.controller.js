var brandModel = require("../../models/brand.model");
var productModel = require("../../models/product.model");

module.exports.brandShow = function(req, res, next) {
  var getAllBrands = brandModel.allBrand();

  getAllBrands
    .then(brands => {
      res.locals.sidebar[12].active = true;

      res.render("admin/brand", {
        layout: "main-admin.hbs",
        brands: brands
      });
    })
    .catch(next);
};

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
      if (quantity[0].PRODUCT_QUANTITY > 0) {
          res.send(false);
      } else {
        brandModel.deleteBrandById(brandId).then(affectedRowNumber => {
            res.send(true);
        })
      }
  }).catch(next);
};
