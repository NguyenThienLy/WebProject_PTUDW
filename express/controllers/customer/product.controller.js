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

var typeSort = 0;

// Mảng sort của product show
var typeSortArray = [
  { checked: false, name: "Hàng mới nhất", value: 0 },
  { checked: false, name: "Hàng cũ nhất", value: 1 },
  { checked: false, name: "Giá tăng dần", value: 2 },
  { checked: false, name: "Giá giảm dần", value: 3 }
];

// Mảng giá filter của product show
var priceFilterArray = [
  { checked: false, name: "Giá dưới 100,000đ", value: 1 },
  { checked: false, name: "100,000đ - 200,000đ", value: 2 },
  { checked: false, name: "200,000đ - 300,000đ", value: 3 },
  { checked: false, name: "300,000đ - 500,000đ", value: 4 },
  { checked: false, name: "500,000đ - 1,000,000đ", value: 5 },
  { checked: false, name: "Giá trên 1.000.000đ", value: 6 }
];

function funcTypeSort(req) {
  // Loại sắp xếp
  // 1 sản phẩm mới nhất
  // 2 sản phẩm cũ nhất
  // 3 sản phẩm giá tăng dần
  // 4 sản phẩm giá giảm dần
  var typeSort = 0;

  typeSort = +req.body.radioSortProductShow;

  // Nếu không phải là các trường hợp sort thì gán mặc định bằng 0
  if (isNaN(typeSort) == true) typeSort = 0;

  // Phục hồi checked = false
  for (type of typeSortArray) type.checked = false;
  // Gán radio đó dược checked
  typeSortArray[typeSort].checked = true;

  return typeSort;
}

module.exports.productDetail = function(req, res) {
  res.render("customer/product-detail", { layout: "main-customer.hbs" });
};

// Hàm hiển thị product simple và product combo
module.exports.productAllShow = function(req, res, next) {
  try {
    // // Lấy id của category
    // var idCat = req.params.idCat;

    // Hàm dùng để xử lí các kiểu sắp xếp sản phẩm
    typeSort = funcTypeSort(req);

    Promise.all([
      productModel.topNProductAscCreated(typeSort, 8),
      productComboModel.topNProductComboAscCreated(typeSort, 6),
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
    // // Lấy id của category
    // var idCat = req.params.idCat;

    // Hàm dùng để xử lí các kiểu sắp xếp sản phẩm
    typeSort = funcTypeSort(req);

    Promise.all([
      productComboModel.topNProductComboAscCreated(typeSort, 12),
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

    // Hàm dùng để xử lí các kiểu sắp xếp sản phẩm
    typeSort = funcTypeSort(req);

    Promise.all([
      productModel.topNProductFollowIdCatAndIdSub(idCat, idSub, typeSort, 16),
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
