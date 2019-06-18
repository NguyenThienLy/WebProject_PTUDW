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
// Gọi brandModel
var brandModel = require("../../models/brand.model");
// Gọi productImageModel
var productImageModel = require("../../models/product_image.model");
// Gọi commentModel
var commentModel = require("../../models/comment.model");
// Gọi commentReactionModel
var commentReactionModel = require("../../models/comment_reaction.model");
// Gọi orderInfoModel
var orderInfoModel = require("../../models/order_info.model");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi convertToDateHelper
var convertToDateHelper = require("../../helpers/convert_to_date.helper");

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

function funcCategory(categories) {
  var groups = {};
  for (var i = 0; i < categories.length; i++) {
    // Tạo category hiện tại
    var category = {
      IDCAT: categories[i].IDCAT,
      NAMECAT: categories[i].NAMECAT,
      QUANTITYCAT: categories[i].QUANTITYCAT
    };

    var groupName = category.IDCAT;

    // Kiểm tra category này tồn tại chưa
    if (!groups[groupName]) {
      groups[groupName] = [];
      groups[groupName].push(category);
    }

    // Tạo sub category con
    var subCategory = {
      IDCAT: categories[i].IDCAT,
      IDSUB: categories[i].IDSUB,
      NAMESUB: categories[i].NAMESUB,
      QUANTITYSUB: categories[i].QUANTITYSUB
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

  // id cat và id sub đang được chọn
  for (category of categoriesDetail) {
    // Gán cho id category
    if (category.IDCAT === +catFilter) {
      category.isChoose = true;

      // Gán cho id sub category
      for (subCategory of category.SUB)
        if (subCategory.IDSUB === +subFilter) subCategory.isChoose = true;
    }
  }

  return categoriesDetail;
}

module.exports.productSimpleDetail = function(req, res, next) {
  try {
    // Lấy id của product simple hiện tại
    var idProduct = req.params.idProduct;

    var isHaveTheSameProduct = true;
    var isHaveBestSalerProduct = true;

    Promise.all([
      productModel.top1ProductFollowId(idProduct),
      productModel.topNProductTheSameFollowOffsetFollowIdPro(idProduct, 4, 0),
      productModel.topNProductBestSalerFollowOffset(4, 0),
      productImageModel.topNProductImageFollowIdPro(idProduct, 5),
      commentModel.topNCommentsOfProductFollowCreatedAndLimitAndOffsetAndTypeProduct(
        idProduct,
        5,
        0,
        1
      ),
      commentModel.commentsQuantityFollowIdProductAndTypeProduct(idProduct, 1),
      commentModel.groupStarQuantityFollowProductIdAndTypeProduct(idProduct, 1)
    ]).then(values => {
      if (values[1].length === 0) isHaveTheSameProduct = false;
      if (values[2].length === 0) isHaveBestSalerProduct = false;

      var arrStarProduct = [];
      var arrStarUnCheckProduct = [];
      var arrShortDescription = [];
      var arrShorts = values[0][0].SHORTDESCRIPTION.split(".");

      // Lấy phần giới thiệu về sản phẩm
      for (short of arrShorts) {
        if (short.length > 0) {
          var shortDescription = {};
          shortDescription.content = short;

          arrShortDescription.push(shortDescription);
        }
      }

      if (values[0][0].SHORTDESCRIPTION.length === 0) {
        var shortDescription = {};
        shortDescription.content = "Sản phẩm này chưa có phần giới thiệu";

        arrShortDescription.push(shortDescription);
      }

      /* Đánh giá sao cho sản phẩm */
      for (var i = 0; i < values[0][0].RATE; i++) arrStarProduct.push(i);

      for (var i = values[0][0].RATE; i < 5; i++) arrStarUnCheckProduct.push(i);
      /* Đánh giá sao cho sản phẩm */

      /* Đánh giá sao cho bình luận */
      for (commentRate of values[4]) {
        var arrStar = [];
        var arrStarUnCheck = [];

        for (var i = 0; i < commentRate.STARS; i++) arrStar.push(i);

        for (var i = commentRate.STARS; i < 5; i++) arrStarUnCheck.push(i);

        commentRate.rateStar = arrStar;
        commentRate.rateStarUncheck = arrStarUnCheck;
      }
      /* Đánh giá sao cho bình luận */

      /* Tính lượng % đánh giá của người dùng */
      // Thêm các phần tử thiếu

      // Nếu mảng trống
      if (values[6].length === 0) {
        for (var i = 1; i <= 5; i++) {
          var star = { STARS: i, QUANTITY: 0, percent: 0 };

          values[6].push(star);
        }
      } else {
        var arrStarRateTemp = [
          { STARS: 1, QUANTITY: 0 },
          { STARS: 2, QUANTITY: 0 },
          { STARS: 3, QUANTITY: 0 },
          { STARS: 4, QUANTITY: 0 },
          { STARS: 5, QUANTITY: 0 }
        ];

        for (var rateStar of values[6]) {
          arrStarRateTemp[rateStar.STARS - 1].QUANTITY = rateStar.QUANTITY;
        }

        values[6] = arrStarRateTemp;

        // Sắp xếp lại
        values[6].sort(function(star1, star2) {
          return star1.STARS < star2.STARS;
        });

        var sumQuantity = values[6].reduce(function(sum, star) {
          return sum + +star.QUANTITY;
        }, 0);

        // Thêm thuộc tính phần trăm
        for (var star of values[6]) {
          star.percent = Math.round((star.QUANTITY / sumQuantity) * 100);
        }
      }
      /* Tính lượng % đánh giá của người dùng */

      res.render("customer/product-simple-detail", {
        layout: "main-customer.hbs",
        arrStarInRate: arrStarProduct,
        arrStarInRateUnCheck: arrStarUnCheckProduct,
        arrShortDescription: arrShortDescription,
        productsTheSame: values[1],
        productsBestSaler: values[2],
        productSimpleImages: values[3],
        productComments: values[4],
        productCommentsQuantity: values[5][0].COMMENT_QUANTITY,
        productStarPercentInRate: values[6],
        productId: idProduct,
        isSimple: true,
        isHaveTheSameProduct: isHaveTheSameProduct,
        isHaveBestSalerProduct: isHaveBestSalerProduct,
        productRateStar: values[0][0].RATE,
        productName: values[0][0].NAME,
        productPrice: values[0][0].PRICE,
        productSale: values[0][0].SALE,
        productSalePrice: values[0][0].SALEPRICE,
        productBrandName: values[0][0].BRANDNAME,
        productInventory: values[0][0].INVENTORY,
        productOrigin: values[0][0].ORIGIN,
        productKilogram: values[0][0].KILOGRAM,
        productImage: values[0][0].IMAGE,
        productDescription: values[0][0].DESCRIPTION,
        productCategoryId: values[0][0].CATEGORYID,
        productSubCategoryId: values[0][0].SUBCATEGORYID,
        productCategoryName: values[0][0].CATEGORYNAME,
        productSubCategoryName: values[0][0].SUBCATEGORYNAME,
        helpers: {
          // Hàm chuyển đổi qua kiểu ngày
          convertToDate: convertToDateHelper,
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo,
          // Hàm định dạng title của info lấy 85 kí tự
          formatTitleInfo: formatStringHelper.formatTitleInfo,
          // Hàm định dạng trong breadcrumb lấy 30 kí tự
          formatTitleInBreadCrumb: formatStringHelper.formatTitleInBreadCrumb
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.productComboDetail = function(req, res, next) {
  try {
    // Lấy id của product simple hiện tại
    var idProduct = req.params.idProduct;

    var isHaveTheSameProduct = true;
    var isHaveBestSalerProduct = true;

    Promise.all([
      productComboModel.top1ProductComboFollowId(idProduct),
      productComboModel.topNProductComboNewestFollowOffsetFollowIdPro(
        idProduct,
        3,
        0
      ),
      productComboModel.topNProductComboBestSalerFollowOffset(3, 0),
      commentModel.topNCommentsOfProductFollowCreatedAndLimitAndOffsetAndTypeProduct(
        idProduct,
        5,
        0,
        0
      ),
      commentModel.commentsQuantityFollowIdProductAndTypeProduct(idProduct, 0),
      commentModel.groupStarQuantityFollowProductIdAndTypeProduct(idProduct, 0)
    ]).then(values => {
      if (values[1].length === 0) isHaveTheSameProduct = false;
      if (values[2].length === 0) isHaveBestSalerProduct = false;

      var arrStarProduct = [];
      var arrStarUnCheckProduct = [];
      var arrShortDescription = [];
      var arrShorts = values[0][0].SHORTDESCRIPTION.split(".");

      // Lấy phần giới thiệu về sản phẩm
      for (short of arrShorts) {
        if (short.length > 0) {
          var shortDescription = {};
          shortDescription.content = short;

          arrShortDescription.push(shortDescription);
        }
      }

      if (values[0][0].SHORTDESCRIPTION.length === 0) {
        var shortDescription = {};
        shortDescription.content = "Sản phẩm này chưa có phần giới thiệu";

        arrShortDescription.push(shortDescription);
      }

      //arrShortDescription
      // console.log(
      //   "TCL: module.exports.productComboDetail -> arrShortDescription",
      //   arrShortDescription
      // );

      /* Đánh giá sao cho sản phẩm */
      for (var i = 0; i < values[0][0].RATE; i++) arrStarProduct.push(i);

      for (var i = values[0][0].RATE; i < 5; i++) arrStarUnCheckProduct.push(i);
      /* Đánh giá sao cho sản phẩm */

      /* Đánh giá sao cho bình luận */
      for (commentRate of values[3]) {
        var arrStar = [];
        var arrStarUnCheck = [];

        for (var i = 0; i < commentRate.STARS; i++) arrStar.push(i);

        for (var i = commentRate.STARS; i < 5; i++) arrStarUnCheck.push(i);

        commentRate.rateStar = arrStar;
        commentRate.rateStarUncheck = arrStarUnCheck;
      }
      /* Đánh giá sao cho bình luận */

      /* Tính lượng % đánh giá của người dùng */
      // Thêm các phần tử thiếu
      // Nếu mảng trống
      if (values[5].length === 0) {
        for (var i = 1; i <= 5; i++) {
          var star = { STARS: i, QUANTITY: 0, percent: 0 };

          values[5].push(star);
        }
      } else {
        var arrStarRateTemp = [
          { STARS: 1, QUANTITY: 0 },
          { STARS: 2, QUANTITY: 0 },
          { STARS: 3, QUANTITY: 0 },
          { STARS: 4, QUANTITY: 0 },
          { STARS: 5, QUANTITY: 0 }
        ];

        for (var rateStar of values[5]) {
          arrStarRateTemp[rateStar.STARS - 1].QUANTITY = rateStar.QUANTITY;
        }

        values[5] = arrStarRateTemp;

        // Sắp xếp lại
        values[5].sort(function(star1, star2) {
          return star1.STARS < star2.STARS;
        });

        var sumQuantity = values[5].reduce(function(sum, star) {
          return sum + +star.QUANTITY;
        }, 0);

        // Thêm thuộc tính phần trăm
        for (var star of values[5]) {
          star.percent = Math.round((star.QUANTITY / sumQuantity) * 100);
        }
      }
      /* Tính lượng % đánh giá của người dùng */

      res.render("customer/product-combo-detail", {
        layout: "main-customer.hbs",
        arrStarInRate: arrStarProduct,
        arrStarInRateUnCheck: arrStarUnCheckProduct,
        arrShortDescription: arrShortDescription,
        productsTheSame: values[1],
        productsBestSaler: values[2],
        productComments: values[3],
        productCommentsQuantity: values[4][0].COMMENT_QUANTITY,
        productStarPercentInRate: values[5],
        isHaveTheSameProduct: isHaveTheSameProduct,
        isHaveBestSalerProduct: isHaveBestSalerProduct,
        productRateStar: values[0][0].RATE,
        productImage1: values[0][0].IMAGE1,
        productImage2: values[0][0].IMAGE2,
        productImage3: values[0][0].IMAGE3,
        productId1: values[0][0].ID1,
        productId2: values[0][0].ID2,
        productId3: values[0][0].ID3,
        productName1: values[0][0].NAME1,
        productName2: values[0][0].NAME2,
        productName3: values[0][0].NAME3,
        productId: idProduct,
        isSimple: false,
        productName: values[0][0].NAME,
        productPrice: values[0][0].SALE,
        productSalePrice: values[0][0].SALEPRICE,
        productInventory: values[0][0].INVENTORY,
        productKilogram: values[0][0].KILOGRAM,
        productImage: values[0][0].IMAGE,
        productDescription: values[0][0].DESCRIPTION,
        helpers: {
          // Hàm chuyển đổi qua kiểu ngày
          convertToDate: convertToDateHelper,
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo,
          // Hàm định dạng title của info lấy 85 kí tự
          formatTitleInfo: formatStringHelper.formatTitleInfo,
          // Hàm định dạng trong breadcrumb lấy 30 kí tự
          formatTitleInBreadCrumb: formatStringHelper.formatTitleInBreadCrumb
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.postCommentProductDetail = function(req, res, next) {
  try {
    // Lấy ID của product simple
    var idProduct = req.body.idProduct;
    // Kiểm tra xem người dùng thêm simple hay combo
    var isSimple = req.body.isSimple === "true";
    // Lấy đánh giá sao
    var starComment = req.body.starComment;
    // Lấy tiêu đề
    var titleComment = req.body.titleComment;
    // Lấy nội dung bình luận
    var contentComment = req.body.contentComment;
    // Lấy người dùng hiện tại
    var customer = res.locals.authUser;

    if (isSimple === true) {
      var comment = {
        CUSTOMERID: customer.ID,
        PRODUCTID: idProduct,
        CREATED: null,
        TITLE: titleComment,
        COMMENT: contentComment,
        STARS: starComment,
        LIKES: 0,
        VERIFYCATION: 0,
        ISSIMPLE: 1
      };

      orderInfoModel
        .checkVerifyProductFollowProductIdAndCustomerIdAndTypeProduct(
          comment.PRODUCTID,
          comment.CUSTOMERID,
          comment.ISSIMPLE
        )
        .then(quantity => {
          // Nếu khách hàng đã mua sản phẩm
          if (+quantity[0].QUANTITY > 0) {
            comment.VERIFYCATION = 1;
          }

          commentModel
            .addComment(comment)
            .then(successAdd => {
              // Cập nhật đánh giá
              productModel
                .updateRateFollowProductId(idProduct)
                .then(successUpdate => {
                  Promise.all([
                    commentModel.topNCommentsOfProductFollowCreatedAndLimitAndOffsetAndTypeProduct(
                      idProduct,
                      5,
                      0,
                      comment.ISSIMPLE
                    ),
                    commentModel.groupStarQuantityFollowProductIdAndTypeProduct(
                      idProduct,
                      comment.ISSIMPLE
                    ),
                    productModel.getRateProductSimpleFollowProductId(idProduct),
                    commentModel.commentsQuantityFollowIdProductAndTypeProduct(
                      idProduct,
                      comment.ISSIMPLE
                    )
                  ])
                    .then(values => {
                      var arrStar = [];
                      var arrStarUnCheck = [];

                      /* Đánh giá sao cho bình luận */
                      for (commentRate of values[0]) {
                        var arrStar = [];
                        var arrStarUnCheck = [];

                        for (var i = 0; i < commentRate.STARS; i++)
                          arrStar.push(i);

                        for (var i = commentRate.STARS; i < 5; i++)
                          arrStarUnCheck.push(i);

                        commentRate.rateStar = arrStar;
                        commentRate.rateStarUncheck = arrStarUnCheck;
                      }
                      /* Đánh giá sao cho bình luận */

                      /* Tính lượng % đánh giá của người dùng */
                      // Thêm các phần tử thiếu
                      if (values[1].length === 0) {
                        for (var i = 1; i <= 5; i++) {
                          var star = { STARS: i, QUANTITY: 0, percent: 0 };

                          values[1].push(star);
                        }
                      } else {
                        var arrStarRateTemp = [
                          { STARS: 1, QUANTITY: 0 },
                          { STARS: 2, QUANTITY: 0 },
                          { STARS: 3, QUANTITY: 0 },
                          { STARS: 4, QUANTITY: 0 },
                          { STARS: 5, QUANTITY: 0 }
                        ];

                        for (var rateStar of values[1]) {
                          arrStarRateTemp[rateStar.STARS - 1].QUANTITY =
                            rateStar.QUANTITY;
                        }

                        values[1] = arrStarRateTemp;

                        // Sắp xếp lại
                        values[1].sort(function(star1, star2) {
                          return star1.STARS < star2.STARS;
                        });

                        var sumQuantity = values[1].reduce(function(sum, star) {
                          return sum + +star.QUANTITY;
                        }, 0);

                        // Thêm thuộc tính phần trăm
                        for (var star of values[1]) {
                          star.percent = Math.round(
                            (+star.QUANTITY / sumQuantity) * 100
                          );
                        }
                      }
                      /* Tính lượng % đánh giá của người dùng */
                      //values[0]
                      //console.log("TCL: module.exports.postCommentProductDetail -> values[0]", values[0])
                      //values[1]
                      //console.log("TCL: module.exports.postCommentProductDetail ->  values[1]",  values[1])
                      //values[2].RATE
                      // console.log("TCL: module.exports.postCommentProductDetail -> values[2].RATE", values[2][0].RATE)
                      // //values[2].COMMENT_QUANTITY
                      // console.log("TCL: module.exports.postCommentProductDetail -> values[2].COMMENT_QUANTITY", values[3][0].COMMENT_QUANTITY)
                      res.json({
                        comments: JSON.stringify(values[0]),
                        percentsStar: JSON.stringify(values[1]),
                        rate: JSON.stringify(values[2][0].RATE),
                        quantityComment: JSON.stringify(
                          values[3][0].COMMENT_QUANTITY
                        )
                      });
                    })
                    .catch(err => {
                      res.send("fail");
                    });
                })
                .catch(err => {
                  res.send("fail");
                });
            })
            .catch(err => {
              res.send("fail");
            });
        })
        .catch(err => {
          res.send("fail");
        });
    } else {
      var comment = {
        CUSTOMERID: customer.ID,
        PRODUCTID: idProduct,
        CREATED: null,
        TITLE: titleComment,
        COMMENT: contentComment,
        STARS: starComment,
        LIKES: 0,
        VERIFYCATION: 0,
        ISSIMPLE: 0
      };

      orderInfoModel
        .checkVerifyProductFollowProductIdAndCustomerIdAndTypeProduct(
          comment.PRODUCTID,
          comment.CUSTOMERID,
          comment.ISSIMPLE
        )
        .then(quantity => {
          // Nếu khách hàng đã mua sản phẩm
          if (+quantity[0].QUANTITY > 0) {
            comment.VERIFYCATION = 1;
          }
          commentModel
            .addComment(comment)
            .then(successAdd => {
              // Cập nhật đánh giá
              productComboModel
                .updateRateFollowProductId(idProduct)
                .then(successUpdate => {
                  Promise.all([
                    commentModel.topNCommentsOfProductFollowCreatedAndLimitAndOffsetAndTypeProduct(
                      idProduct,
                      5,
                      0,
                      comment.ISSIMPLE
                    ),
                    commentModel.groupStarQuantityFollowProductIdAndTypeProduct(
                      idProduct,
                      comment.ISSIMPLE
                    ),
                    productComboModel.getRateProductComboFollowProductId(
                      idProduct
                    ),
                    commentModel.commentsQuantityFollowIdProductAndTypeProduct(
                      idProduct,
                      comment.ISSIMPLE
                    )
                  ])
                    .then(values => {
                      var arrStar = [];
                      var arrStarUnCheck = [];

                      /* Đánh giá sao cho bình luận */
                      for (commentRate of values[0]) {
                        var arrStar = [];
                        var arrStarUnCheck = [];

                        for (var i = 0; i < commentRate.STARS; i++)
                          arrStar.push(i);

                        for (var i = commentRate.STARS; i < 5; i++)
                          arrStarUnCheck.push(i);

                        commentRate.rateStar = arrStar;
                        commentRate.rateStarUncheck = arrStarUnCheck;
                      }
                      /* Đánh giá sao cho bình luận */

                      /* Tính lượng % đánh giá của người dùng */
                      // Thêm các phần tử thiếu
                      if (values[1].length === 0) {
                        for (var i = 1; i <= 5; i++) {
                          var star = { STARS: i, QUANTITY: 0, percent: 0 };

                          values[1].push(star);
                        }
                      } else {
                        var arrStarRateTemp = [
                          { STARS: 1, QUANTITY: 0 },
                          { STARS: 2, QUANTITY: 0 },
                          { STARS: 3, QUANTITY: 0 },
                          { STARS: 4, QUANTITY: 0 },
                          { STARS: 5, QUANTITY: 0 }
                        ];

                        for (var rateStar of values[1]) {
                          arrStarRateTemp[rateStar.STARS - 1].QUANTITY =
                            rateStar.QUANTITY;
                        }

                        values[1] = arrStarRateTemp;

                        // Sắp xếp lại
                        values[1].sort(function(star1, star2) {
                          return star1.STARS < star2.STARS;
                        });

                        var sumQuantity = values[1].reduce(function(sum, star) {
                          return sum + +star.QUANTITY;
                        }, 0);

                        // Thêm thuộc tính phần trăm
                        for (var star of values[1]) {
                          star.percent = Math.round(
                            (+star.QUANTITY / sumQuantity) * 100
                          );
                        }
                      }
                      /* Tính lượng % đánh giá của người dùng */
                      //   //values[0]
                      //   console.log("TCL: module.exports.postCommentProductDetail -> values[0]", values[0])
                      //   //values[1]
                      //   console.log("TCL: module.exports.postCommentProductDetail ->  values[1]",  values[1])
                      //  // values[2].RATE
                      //   console.log("TCL: module.exports.postCommentProductDetail -> values[2].RATE", values[2][0].RATE)
                      //   //values[2].COMMENT_QUANTITY
                      //   console.log("TCL: module.exports.postCommentProductDetail -> values[2].COMMENT_QUANTITY", values[3][0].COMMENT_QUANTITY)
                      res.json({
                        comments: JSON.stringify(values[0]),
                        percentsStar: JSON.stringify(values[1]),
                        rate: JSON.stringify(values[2][0].RATE),
                        quantityComment: JSON.stringify(
                          values[3][0].COMMENT_QUANTITY
                        )
                      });
                    })
                    .catch(err => {
                      res.send("fail");
                    });
                })
                .catch(err => {
                  res.send("fail");
                });
            })
            .catch(err => {
              res.send("fail");
            });
        })
        .catch(err => {
          res.send("fail");
        });
    }
  } catch (error) {
    next(error);
  }
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
      brandModel.allBrandWithDetail(),
      categoryModel.allWithDetailQuantity()
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

      var categoriesFilter = funcCategory(values[3], -1, -1);

      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        products: values[0],
        productsCombo: values[1],
        brands: values[2],
        categoriesFilter: categoriesFilter,
        isSelectAllCategory: true,
        isSelectAllSort: true,
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
      console.log(
        "TCL: module.exports.productShowFollowIdCatAndIdSub -> values",
        values[0]
      );
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
module.exports.applyPostForProductAllShow = function(req, res, next) {
  try {
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
      priceFilterArray[priceFilter - 1].selected = true;
    }

    Promise.all([
      productModel.topNProductFollowTypeSortAndIdCatAndIdSubAndBrandAndPrice(
        typeSort,
        catFilter,
        subFilter,
        brandFilter,
        priceFilter,
        8
      ),
      productComboModel.topNProductComboFollowTypeSortAndPrice(
        typeSort,
        priceFilter,
        6
      ),
      brandModel.allBrandWithDetail(),
      categoryModel.allWithDetailQuantity()
    ]).then(values => {
      console.log(
        "TCL: module.exports.applyPostForProductAllShow -> products",
        values[0]
      );

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
        // Đang hiện thị tại brand nào
        values[2][brandFilter - 1].selected = true;
      }

      var categoriesFilter = funcCategory(values[3], catFilter, subFilter);

      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        products: values[0],
        productsCombo: values[1],
        brands: values[2],
        categoriesFilter: categoriesFilter,
        isSelectAllCategory: true,
        isSelectAllSort: true,
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

// Hàm xử lí khi người dùng post các giá trị lọc
module.exports.applyPostForProductComboShow = function(req, res, next) {
  try {
    // Loại sắp xếp
    // 1 sản phẩm mới nhất
    // 2 sản phẩm cũ nhất
    // 3 sản phẩm giá tăng dần
    // 4 sản phẩm giá giảm dần

    // Lấy giá trị của radio hoặc select tùy theo responsive
    typeSort = +req.body.radioSortProductShow;

    priceFilter = +req.body.checkboxPrice;

    // Nếu typeSort là NaN thì gán mặc định bằng 0
    if (isNaN(typeSort) == true) typeSort = 0;
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
      priceFilterArray[priceFilter - 1].selected = true;
    }

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
        // Đang hiện thị tại brand nào
        values[1][brandFilter - 1].selected = true;
      }

      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        productsCombo: values[0],
        brands: values[1],
        isShowSimple: false,
        isShowCombo: true,
        isSelectComboCategory: true,
        isSelectComboSort: true,
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

// Hàm xử lí khi người dùng post các giá trị lọc
module.exports.applyPostForProductShow = function(req, res, next) {
  try {
    // Lấy id của category
    var idCat = +req.params.idCat;
    // Lấy id của sub category
    var idSub = +req.params.idSub;

    // Loại sắp xếp
    // 1 sản phẩm mới nhất
    // 2 sản phẩm cũ nhất
    // 3 sản phẩm giá tăng dần
    // 4 sản phẩm giá giảm dần

    // Lấy giá trị của radio hoặc select tùy theo responsive
    typeSort = +req.body.radioSortProductShow;

    catFilter = idCat;

    subFilter = idSub;

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
      priceFilterArray[priceFilter - 1].selected = true;
    }

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

      if (brandFilter > 0) {
        // Đang hiện thị tại brand nào
        values[1][brandFilter - 1].selected = true;
      }

      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        products: values[0],
        brands: values[1],
        isShowSimple: true,
        isShowCombo: false,
        isSelectSimpleSort: true,
        idCategory: catFilter,
        idSubCategory: subFilter,
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
    } else {
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

// // Hàm thêm sản phẩm simple vào session cart
// module.exports.addProductFollowIdCatAndIdSubToSession = function(
//   req,
//   res,
//   next
// ) {
//   try {
//     // Lấy ID của category
//     var idCat = +req.params.idCat;
//     // Lấy ID của sub category
//     var idSub = +req.params.idSub;
//     // Lấy isSelectAll
//     var isSelectAll = req.params.isSelectAll;
//     // Lấy ID của product simple
//     var productId = req.params.idProSimple;
//     // Lấy ID signed cookies combo
//     var sessionId = req.signedCookies.sessionId;

//     // Đối tượng session cart danh cho product
//     var session_cart = {
//       ID: sessionId,
//       PRODUCT_ID: productId,
//       PRODUCT_COMBO_ID: 0,
//       QUANTITY: 1,
//       IS_LOGIN: 0
//     };

//     sessionCartModel.allRowFollowID(sessionId).then(sessionCarts => {
//       // var isFind = false;
//       var index = sessionCarts.findIndex(
//         sessionCart =>
//           sessionCart.PRODUCT_COMBO_ID == session_cart.PRODUCT_COMBO_ID &&
//           sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
//           sessionCart.ID == session_cart.ID
//       );

//       // Thêm mới sản phẩm trong giỏ hàng
//       if (index === -1) {
//         sessionCartModel.addSessionCart(session_cart).then(result => {
//           // Nếu đang show toàn bộ thì chuyển lại về trang show toàn bộ
//           if (isSelectAll) res.redirect("/customer/product/product-all-show");
//           // Nếu đang show simple thì chuyển lại về trang show simple theo id cat và id sub
//           else {
//             if (idSub === 0)
//               res.redirect("/customer/product/product-show/" + idCat);
//             else
//               res.redirect(
//                 "/customer/product/product-show/" + idCat + "/" + idSub
//               );
//           }
//         });
//         // Tăng số lượng sản phẩm trong giỏ hàng
//       } else {
//         // Tăng quantity lên 1 đơn vị
//         session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

//         sessionCartModel.update3PrimaryKey(session_cart).then(result => {
//           // Nếu đang show toàn bộ thì chuyển lại về trang show toàn bộ
//           if (isSelectAll) res.redirect("/customer/product/product-all-show");
//           // Nếu đang show simple thì chuyển lại về trang show simple theo id cat và id sub
//           else {
//             if (idSub === 0)
//               res.redirect("/customer/product/product-show/" + idCat);
//             else
//               res.redirect(
//                 "/customer/product/product-show/" + idCat + "/" + idSub
//               );
//           }
//         });
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Hàm thêm sản phẩm combo vào session cart
// module.exports.addProductComboToSession = function(req, res, next) {
//   try {
//     // Lấy isSelectAll
//     var isSelectAll = req.params.isSelectAll;
//     // Lấy ID của product combo
//     var productComboId = req.params.idProCombo;
//     // Lấy ID signed cookies combo
//     var sessionId = req.signedCookies.sessionId;

//     // Đối tượng session cart danh cho product
//     var session_cart = {
//       ID: sessionId,
//       PRODUCT_ID: 0,
//       PRODUCT_COMBO_ID: productComboId,
//       QUANTITY: 1,
//       IS_LOGIN: 0
//     };

//     sessionCartModel.allRowFollowID(sessionId).then(sessionCarts => {
//       var index = sessionCarts.findIndex(
//         sessionCart =>
//           sessionCart.PRODUCT_COMBO_ID == session_cart.PRODUCT_COMBO_ID &&
//           sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
//           sessionCart.ID == session_cart.ID
//       );

//       // Thêm mới sản phẩm vào giỏ hàng
//       if (index === -1) {
//         sessionCartModel.addSessionCart(session_cart).then(result => {
//           // Nếu đang show toàn bộ thì chuyển lại về trang show toàn bộ
//           // Nếu đang show combo thì chuyển lại về trang show combo
//           if (isSelectAll === true)
//             res.redirect("/customer/product/product-all-show");
//           else res.redirect("/customer/product/product-combo-show");
//         });
//         // Tăng số lượng sản phẩm  trong giỏ hàng
//       } else {
//         // Tăng quantity lên 1 đơn vị
//         session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

//         sessionCartModel.update3PrimaryKey(session_cart).then(result => {
//           // Nếu đang show toàn bộ thì chuyển lại về trang show toàn bộ
//           // Nếu đang show combo thì chuyển lại về trang show combo
//           if (isSelectAll == true)
//             res.redirect("/customer/product/product-all-show");
//           else res.redirect("/customer/product/product-combo-show");
//         });
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };
