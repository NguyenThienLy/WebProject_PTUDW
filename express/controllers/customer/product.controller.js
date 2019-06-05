// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");
// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// Gọi newsModel
var newsModel = require("../../models/news.model");
// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");
// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");
// Gọi brandModel
var brandModel = require("../../models/brand.model");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");

// Loại sắp xếp
var typeSort = 0;
// Danh mục bộ lọc
var catFilter = 0;
// Danh mục con bộ lọc
var subFilter = 0;
// Thương hiệu bộ lọc
var brandFilter = 0;
// Khoảng giá bộ lọc
var priceFilter = 0;

// Mảng sort của product show
var typeSortArray = [
  { selected: false, name: "Hàng mới nhất", value: 0 },
  { selected: false, name: "Hàng cũ nhất", value: 1 },
  { selected: false, name: "Giá tăng dần", value: 2 },
  { selected: false, name: "Giá giảm dần", value: 3 }
];

// Mảng giá filter của product show
var priceFilterArray = [
  { selected: false, name: "Giá dưới 100,000đ", value: 1 },
  { selected: false, name: "100,000đ - 200,000đ", value: 2 },
  { selected: false, name: "200,000đ - 300,000đ", value: 3 },
  { selected: false, name: "300,000đ - 500,000đ", value: 4 },
  { selected: false, name: "500,000đ - 1,000,000đ", value: 5 },
  { selected: false, name: "Giá trên 1.000.000đ", value: 6 }
];

function funcGetKeyFilterForAll(req) {
  // Loại sắp xếp
  // 1 sản phẩm mới nhất
  // 2 sản phẩm cũ nhất
  // 3 sản phẩm giá tăng dần
  // 4 sản phẩm giá giảm dần

  // Lấy giá trị của radio hoặc select tùy theo responsive
  //typeSort = +req.body.radioSortProductShow || +req.body.selectSortInfoShow;
  typeSort = +req.body.radioSortProductShow;

  // catFilter = 0;

  // subFilter = 0;

  brandFilter = 0;

  priceFilter = 0;

  // Phục hồi select = false của typeSortArray
  for (type of typeSortArray) type.selected = false;
  // Gán radio đó dược selected
  typeSortArray[typeSort].selected = true;

  // Phục hồi select = false của priceFilterArray
  for (price of priceFilterArray) price.selected = false;
  // Gán check đó dược selected
  priceFilterArray[priceFilter].selected = true;
}

function funcPostKeyFilter(req) {
  // Loại sắp xếp
  // 1 sản phẩm mới nhất
  // 2 sản phẩm cũ nhất
  // 3 sản phẩm giá tăng dần
  // 4 sản phẩm giá giảm dần

  // Lấy giá trị của radio hoặc select tùy theo responsive
  typeSort = +req.body.radioSortProductShow;

  catFilter = +req.body.checkboxCategory;

  subFilter = +req.body.checkboxSubCategory;

  brandFilter = +req.body.checkboxBrand;

  priceFilter = +req.body.checkboxPrice;

  // Nếu typeSort là NaN thì gán mặc định bằng 0
  if (isNaN(typeSort) == true) typeSort = 0;
  // Nếu catFilter là NaN thì gán mặc định bằng 0
  if (isNaN(catFilter) == true) catFilter = 0;
  // Nếu subFilter là NaN thì gán mặc định bằng 0
  if (isNaN(subFilter) == true) subFilter = 0;
  // Nếu brandFilter là NaN thì gán mặc định bằng 0
  if (isNaN(brandFilter) == true) brandFilter = 0;
  // Nếu priceFilter là NaN thì gán mặc định bằng 0
  if (isNaN(priceFilter) == true) priceFilter = 0;

  // Phục hồi checked = false
  for (type of typeSortArray) type.selected = false;
  // Gán radio đó dược checked
  typeSortArray[typeSort].selected = true;

  // Phục hồi select = false của priceFilterArray
  for (price of priceFilterArray) price.selected = false;
  // Gán radio đó dược selected
  priceFilterArray[priceFilter].selected = true;
}

module.exports.productDetail = function(req, res) {
  res.render("customer/product-detail", { layout: "main-customer.hbs" });
};

// Hàm hiển thị product simple và product combo
module.exports.productAllShow = function(req, res, next) {
  try {
    typeSort = 0;

    catFilter = 0;

    subFilter = 0;

    brandFilter = 0;

    priceFilter = 0;

    // Phục hồi select = false của typeSortArray
    for (type of typeSortArray) type.selected = false;
    // Gán radio đó dược selected
    typeSortArray[typeSort].selected = true;

    // Phục hồi select = false của priceFilterArray
    for (price of priceFilterArray) price.selected = false;
    // // Gán radio đó dược selected
    // priceFilterArray[priceFilter].selected = true;

    Promise.all([
      productModel.topNProductFollowTypeSortAndBrandAndPrice(
        typeSort,
        brandFilter,
        priceFilter,
        8
      ),
      productComboModel.topNProductComboFollowTypeSortAndPrice(
        typeSort,
        priceFilter,
        6
      ),
      brandModel.allBrandWithDetail()
    ]).then(values => {
      // Đang hiện tất cả
      for (product of values[0]) {
        product.isSelectAll = true;
        product.CATEGORYID = 0;
        product.SUBCATEGORYID = 0;
      }

      // Đang hiện tất cả
      for (productCombo of values[1]) {
        productCombo.isSelectAll = true;
      }

      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        products: values[0],
        productsCombo: values[1],
        brands: values[2],
        isSelectAllCategory: true,
        isSelectAllSort: true,
        isSelectAllBrand: true,
        isSelectAllPrice: true,
        isShowSimple: true,
        isShowCombo: true,
        typeSorts: typeSortArray,
        priceFilters: priceFilterArray,
        helpers: {
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

// Hàm hiển thị product compo
module.exports.productComboShow = function(req, res, next) {
  try {
    /* filter */
    typeSort = 0;

    catFilter = -1;

    subFilter = 0;

    brandFilter = 0;

    priceFilter = 0;

    // Phục hồi select = false của typeSortArray
    for (type of typeSortArray) type.selected = false;
    // Gán radio đó dược selected
    typeSortArray[typeSort].selected = true;

    // Phục hồi select = false của priceFilterArray
    for (price of priceFilterArray) price.selected = false;
    // // Gán radio đó dược selected
    // priceFilterArray[priceFilter].selected = true;
    /* filter */

    Promise.all([
      productComboModel.topNProductComboFollowTypeSortAndPrice(
        typeSort,
        priceFilter,
        12
      ),
      brandModel.allBrandWithDetail()
    ]).then(values => {
      // Không phải đang hiện tất cả
      for (productCombo of values[0]) {
        productCombo.isSelectAll = false;
      }

      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        productsCombo: values[0],
        brands: values[1],
        isShowSimple: false,
        isShowCombo: true,
        isSelectComboCategory: true,
        isSelectComboSort: true,
        isSelectAllBrand: true,
        isSelectAllPrice: true,
        typeSorts: typeSortArray,
        priceFilters: priceFilterArray,
        helpers: {
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

// Hàm hiển thị product theo id category và id sub category
module.exports.productShowFollowIdCatAndIdSub = function(req, res, next) {
  try {
    // Lấy id của category
    var idCat = +req.params.idCat;
    // Lấy id của sub category
    var idSub = +req.params.idSub;

    /* filter */
    typeSort = 0;

    catFilter = idCat;

    subFilter = idSub;

    brandFilter = 0;

    priceFilter = 0;

    // Phục hồi select = false của typeSortArray
    for (type of typeSortArray) type.selected = false;
    // Gán radio đó dược selected
    typeSortArray[typeSort].selected = true;

    // Phục hồi select = false của priceFilterArray
    for (price of priceFilterArray) price.selected = false;
    // Gán radio đó dược selected
    // priceFilterArray[priceFilter].selected = true;
    /* filter */

    Promise.all([
      productModel.topNProductFollowTypeSortAndIdCatAndIdSubAndBrandAndPrice(
        typeSort,
        catFilter,
        subFilter,
        brandFilter,
        priceFilter,
        12
      ),
      brandModel.allBrandWithDetail()
    ]).then(values => {
      // Cài đặt các thuộc tính hỗ trợ
      for (product of values[0]) {
        product.SUBCATEGORYID = idSub;
        product.isSelectAll = false;
      }

      // id cat và id sub đang được chọn
      for (category of res.locals.lcCategories) {
        // Gán cho id category
        if (category.IDCAT === +idCat) {
          category.isChoose = true;

          // Gán cho id sub category
          for (subCategory of category.SUB)
            if (subCategory.IDSUB === +idSub) subCategory.isChoose = true;
        }
      }

      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        products: values[0],
        brands: values[1],
        isShowSimple: true,
        isShowCombo: false,
        isSelectSimpleCategory: true,
        isSelectSimpleSort: true,
        isSelectAllBrand: true,
        isSelectAllPrice: true,
        idCategory: idCat,
        idSubCategory: idSub,
        typeSorts: typeSortArray,
        priceFilters: priceFilterArray,
        helpers: {
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

// Hàm xử lí khi người dùng post các giá trị lọc
module.exports.applyPostValuesFilter = function(req, res, next) {
  try {
    var isSelectAllBrands = false;
    var isSelectAllPrices = false;
    // Loại sắp xếp
    // 1 sản phẩm mới nhất
    // 2 sản phẩm cũ nhất
    // 3 sản phẩm giá tăng dần
    // 4 sản phẩm giá giảm dần

    // Lấy giá trị của radio hoặc select tùy theo responsive
    typeSort = +req.body.radioSortProductShow;

    catFilter = +req.body.checkboxCategory;

    subFilter = +req.body.checkboxSubCategory;

    brandFilter = +req.body.checkboxBrand;

    priceFilter = +req.body.checkboxPrice;

    // Nếu typeSort là NaN thì gán mặc định bằng 0
    if (isNaN(typeSort) == true) typeSort = 0;
    // Nếu catFilter là NaN thì gán mặc định bằng 0
    if (isNaN(catFilter) == true) catFilter = 0;
    // Nếu subFilter là NaN thì gán mặc định bằng 0
    if (isNaN(subFilter) == true) subFilter = 0;
    // Nếu brandFilter là NaN thì gán mặc định bằng 0
    if (isNaN(brandFilter) == true) brandFilter = 0;
    // Nếu priceFilter là NaN thì gán mặc định bằng 0
    if (isNaN(priceFilter) == true) priceFilter = 0;

    // Phục hồi checked = false
    for (type of typeSortArray) type.selected = false;
    // Gán radio đó dược checked
    typeSortArray[typeSort].selected = true;

    // Phục hồi select = false của priceFilterArray
    for (price of priceFilterArray) price.selected = false;
    // Gán radio đó dược selected
    if (priceFilter > 0) {
      isSelectAllPrices = false;
      priceFilterArray[priceFilter - 1].selected = true;
    }
    else {
      isSelectAllPrices = true;
    }

    // Show all product
    if (catFilter === 0) {
      Promise.all([
        productModel.topNProductFollowTypeSortAndBrandAndPrice(
          typeSort,
          brandFilter,
          priceFilter,
          8
        ),
        productComboModel.topNProductComboFollowTypeSortAndPrice(
          typeSort,
          priceFilter,
          6
        ),
        brandModel.allBrandWithDetail()
      ]).then(values => {
        // Đang hiện tất cả
        for (product of values[0]) {
          product.isSelectAll = true;
          product.CATEGORYID = 0;
          product.SUBCATEGORYID = 0;
        }

        // Đang hiện tất cả
        for (productCombo of values[1]) {
          productCombo.isSelectAll = true;
        }

        if (brandFilter > 0) {
          isSelectAllBrands = false;
          // Đang hiện thị tại brand nào
          values[2][brandFilter - 1].selected = true;
        } else {
          isSelectAllBrands = true;
        }

        res.render("customer/product-show", {
          layout: "main-customer.hbs",
          products: values[0],
          productsCombo: values[1],
          brands: values[2],
          isSelectAllCategory: true,
          isSelectAllSort: true,
          isSelectAllBrand: isSelectAllBrands,
          isSelectAllPrice: isSelectAllPrices,
          isShowSimple: true,
          isShowCombo: true,
          typeSorts: typeSortArray,
          priceFilters: priceFilterArray,
          helpers: {
            // Hàm định dạng title của product simple lấy 36 kí tự
            formatTitleProductSimple:
              formatStringHelper.formatTitleProductSimple,
            // Hàm định dạng title của product combo lấy 52 kí tự
            formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
          }
        });
      });
    }
    // Show product combo
    else if (catFilter === -1) {
      Promise.all([
        productComboModel.topNProductComboFollowTypeSortAndPrice(
          typeSort,
          priceFilter,
          12
        ),
        brandModel.allBrandWithDetail()
      ]).then(values => {
        // Không phải đang hiện tất cả
        for (productCombo of values[0]) {
          productCombo.isSelectAll = false;
        }

        if (brandFilter > 0) {
          isSelectAllBrands = false;
          // Đang hiện thị tại brand nào
          values[1][brandFilter - 1].selected = true;
        } else {
          isSelectAllBrands = true;
        }

        res.render("customer/product-show", {
          layout: "main-customer.hbs",
          productsCombo: values[0],
          brands: values[1],
          isShowSimple: false,
          isShowCombo: true,
          isSelectComboCategory: true,
          isSelectComboSort: true,
          isSelectAllBrand: isSelectAllBrands,
          isSelectAllPrice: isSelectAllPrices,
          typeSorts: typeSortArray,
          priceFilters: priceFilterArray,
          helpers: {
            // Hàm định dạng title của product combo lấy 52 kí tự
            formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
          }
        });
      });
    } else {
      Promise.all([
        productModel.topNProductFollowTypeSortAndIdCatAndIdSubAndBrandAndPrice(
          typeSort,
          catFilter,
          subFilter,
          brandFilter,
          priceFilter,
          12
        ),
        brandModel.allBrandWithDetail()
      ]).then(values => {
        // Cài đặt các thuộc tính hỗ trợ
        for (product of values[0]) {
          product.SUBCATEGORYID = subFilter;
          product.isSelectAll = false;
        }

        // id cat và id sub đang được chọn
        for (category of res.locals.lcCategories) {
          // Gán cho id category
          if (category.IDCAT === +catFilter) {
            category.isChoose = true;

            // Gán cho id sub category
            for (subCategory of category.SUB)
              if (subCategory.IDSUB === +subFilter) subCategory.isChoose = true;
          }
        }

        if (brandFilter > 0) {
          isSelectAllBrands = false;
          // Đang hiện thị tại brand nào
          values[1][brandFilter - 1].selected = true;
        } else {
          isSelectAllBrands = true;
        }

        res.render("customer/product-show", {
          layout: "main-customer.hbs",
          products: values[0],
          brands: values[1],
          isShowSimple: true,
          isShowCombo: false,
          isSelectSimpleSort: true,
          isSelectAllBrand: isSelectAllBrands,
          isSelectAllPrice: isSelectAllPrices,
          idCategory: catFilter,
          idSubCategory: subFilter,
          typeSorts: typeSortArray,
          priceFilters: priceFilterArray,
          helpers: {
            // Hàm định dạng title của product simple lấy 36 kí tự
            formatTitleProductSimple:
              formatStringHelper.formatTitleProductSimple
          }
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

// Hàm xử lí khi người dùng post các giá trị lọc
module.exports.applyGetValuesFilter = function(req, res, next) {
  try {
    var isSelectAllBrands = false;
    var isSelectAllPrices = false;
   
    // Phục hồi checked = false
    for (type of typeSortArray) type.selected = false;
    // Gán radio đó dược checked
    typeSortArray[typeSort].selected = true;

    // Phục hồi select = false của priceFilterArray
    for (price of priceFilterArray) price.selected = false;
    // Gán radio đó dược selected
    if (priceFilter > 0) {
      isSelectAllPrices = false;
      priceFilterArray[priceFilter - 1].selected = true;
    }
    else {
      isSelectAllPrices = true;
    }

    // Show all product
    if (catFilter === 0) {
      Promise.all([
        productModel.topNProductFollowTypeSortAndBrandAndPrice(
          typeSort,
          brandFilter,
          priceFilter,
          8
        ),
        productComboModel.topNProductComboFollowTypeSortAndPrice(
          typeSort,
          priceFilter,
          6
        ),
        brandModel.allBrandWithDetail()
      ]).then(values => {
        // Đang hiện tất cả
        for (product of values[0]) {
          product.isSelectAll = true;
          product.CATEGORYID = 0;
          product.SUBCATEGORYID = 0;
        }

        // Đang hiện tất cả
        for (productCombo of values[1]) {
          productCombo.isSelectAll = true;
        }

        console.log(brandFilter);

        if (brandFilter > 0) {
          isSelectAllBrands = false;
          // Đang hiện thị tại brand nào
          values[2][brandFilter - 1].selected = true;
        } else {
          isSelectAllBrands = true;
        }

        res.render("customer/product-show", {
          layout: "main-customer.hbs",
          products: values[0],
          productsCombo: values[1],
          brands: values[2],
          isSelectAllCategory: true,
          isSelectAllSort: true,
          isSelectAllBrand: isSelectAllBrands,
          isSelectAllPrice: isSelectAllPrices,
          isShowSimple: true,
          isShowCombo: true,
          typeSorts: typeSortArray,
          priceFilters: priceFilterArray,
          helpers: {
            // Hàm định dạng title của product simple lấy 36 kí tự
            formatTitleProductSimple:
              formatStringHelper.formatTitleProductSimple,
            // Hàm định dạng title của product combo lấy 52 kí tự
            formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
          }
        });
      });
    }
    // Show product combo
    else if (catFilter === -1) {
      Promise.all([
        productComboModel.topNProductComboFollowTypeSortAndPrice(
          typeSort,
          priceFilter,
          12
        ),
        brandModel.allBrandWithDetail()
      ]).then(values => {
        // Không phải đang hiện tất cả
        for (productCombo of values[0]) {
          productCombo.isSelectAll = false;
        }

        res.render("customer/product-show", {
          layout: "main-customer.hbs",
          productsCombo: values[0],
          brands: values[1],
          isShowSimple: false,
          isShowCombo: true,
          isSelectComboCategory: true,
          isSelectComboSort: true,
          isSelectAllBrand: true,
          isSelectAllPrice: true,
          typeSorts: typeSortArray,
          priceFilters: priceFilterArray,
          helpers: {
            // Hàm định dạng title của product combo lấy 52 kí tự
            formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
          }
        });
      });
    } else {
      Promise.all([
        productModel.topNProductFollowTypeSortAndIdCatAndIdSubAndBrandAndPrice(
          typeSort,
          catFilter,
          subFilter,
          brandFilter,
          priceFilter,
          12
        ),
        brandModel.allBrandWithDetail()
      ]).then(values => {
        // Cài đặt các thuộc tính hỗ trợ
        for (product of values[0]) {
          product.SUBCATEGORYID = subFilter;
          product.isSelectAll = false;
        }

        // id cat và id sub đang được chọn
        for (category of res.locals.lcCategories) {
          // Gán cho id category
          if (category.IDCAT === +catFilter) {
            category.isChoose = true;

            // Gán cho id sub category
            for (subCategory of category.SUB)
              if (subCategory.IDSUB === +subFilter) subCategory.isChoose = true;
          }
        }

        if (brandFilter > 0) {
          isSelectAllBrands = false;
          // Đang hiện thị tại brand nào
          values[2][brandFilter - 1].selected = true;
        } else {
          isSelectAllBrands = true;
        }

        res.render("customer/product-show", {
          layout: "main-customer.hbs",
          products: values[0],
          brands: values[1],
          isShowSimple: true,
          isShowCombo: false,
          isSelectSimpleSort: true,
          isSelectAllBrand: isSelectAllBrands,
          isSelectAllPrice: isSelectAllPrices,
          idCategory: catFilter,
          idSubCategory: subFilter,
          typeSorts: typeSortArray,
          priceFilters: priceFilterArray,
          helpers: {
            // Hàm định dạng title của product simple lấy 36 kí tự
            formatTitleProductSimple:
              formatStringHelper.formatTitleProductSimple
          }
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

// Hàm xử lí reset các giá trị lọc
module.exports.cancelPostValuesFilter = function(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
};

// Hàm thêm sản phẩm simple vào session cart
module.exports.addProductFollowIdCatAndIdSubToSession = function(
  req,
  res,
  next
) {
  try {
    // Lấy ID của category
    var idCat = +req.params.idCat;
    // Lấy ID của sub category
    var idSub = +req.params.idSub;
    // Lấy isSelectAll
    var isSelectAll = req.params.isSelectAll;
    // Lấy ID của product simple
    var productId = req.params.idProSimple;
    // Lấy ID signed cookies combo
    var sessionId = req.signedCookies.sessionId;

    // Đối tượng session cart danh cho product
    var session_cart = {
      ID: sessionId,
      PRODUCT_ID: productId,
      PRODUCT_COMBO_ID: 0,
      QUANTITY: 1,
      IS_LOGIN: 0
    };

    sessionCartModel.allRowFollowID(sessionId).then(sessionCarts => {
      // var isFind = false;
      var index = sessionCarts.findIndex(
        sessionCart =>
          sessionCart.PRODUCT_COMBO_ID == session_cart.PRODUCT_COMBO_ID &&
          sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
          sessionCart.ID == session_cart.ID
      );

      // Thêm mới sản phẩm trong giỏ hàng
      if (index === -1) {
        sessionCartModel.addSessionCart(session_cart).then(result => {
          // Nếu đang show toàn bộ thì chuyển lại về trang show toàn bộ
          if (isSelectAll) res.redirect("/customer/product/product-all-show");
          // Nếu đang show simple thì chuyển lại về trang show simple theo id cat và id sub
          else {
            if (idSub === 0)
              res.redirect("/customer/product/product-show/" + idCat);
            else
              res.redirect(
                "/customer/product/product-show/" + idCat + "/" + idSub
              );
          }
        });
        // Tăng số lượng sản phẩm trong giỏ hàng
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          // Nếu đang show toàn bộ thì chuyển lại về trang show toàn bộ
          if (isSelectAll) res.redirect("/customer/product/product-all-show");
          // Nếu đang show simple thì chuyển lại về trang show simple theo id cat và id sub
          else {
            if (idSub === 0)
              res.redirect("/customer/product/product-show/" + idCat);
            else
              res.redirect(
                "/customer/product/product-show/" + idCat + "/" + idSub
              );
          }
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

// Hàm thêm sản phẩm combo vào session cart
module.exports.addProductComboToSession = function(req, res, next) {
  try {
    // Lấy isSelectAll
    var isSelectAll = req.params.isSelectAll;
    // Lấy ID của product combo
    var productComboId = req.params.idProCombo;
    // Lấy ID signed cookies combo
    var sessionId = req.signedCookies.sessionId;

    // Đối tượng session cart danh cho product
    var session_cart = {
      ID: sessionId,
      PRODUCT_ID: 0,
      PRODUCT_COMBO_ID: productComboId,
      QUANTITY: 1,
      IS_LOGIN: 0
    };

    sessionCartModel.allRowFollowID(sessionId).then(sessionCarts => {
      var index = sessionCarts.findIndex(
        sessionCart =>
          sessionCart.PRODUCT_COMBO_ID == session_cart.PRODUCT_COMBO_ID &&
          sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
          sessionCart.ID == session_cart.ID
      );

      // Thêm mới sản phẩm vào giỏ hàng
      if (index === -1) {
        sessionCartModel.addSessionCart(session_cart).then(result => {
          // Nếu đang show toàn bộ thì chuyển lại về trang show toàn bộ
          // Nếu đang show combo thì chuyển lại về trang show combo
          if (isSelectAll === true)
            res.redirect("/customer/product/product-all-show");
          else res.redirect("/customer/product/product-combo-show");
        });
        // Tăng số lượng sản phẩm  trong giỏ hàng
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          // Nếu đang show toàn bộ thì chuyển lại về trang show toàn bộ
          // Nếu đang show combo thì chuyển lại về trang show combo
          if (isSelectAll == true)
            res.redirect("/customer/product/product-all-show");
          else res.redirect("/customer/product/product-combo-show");
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
