var commentModel = require("../../models/comment.model");
var commentReactionModel = require("../../models/comment_reaction.model");
var productModel = require("../../models/product.model");
var productComboModel = require("../../models/product_combo.model");

var commentStarsHelper = require("../../helpers/comment_stars.helper");
// Gọi createquery helper
var createQuery = require("../../helpers/create_query.helper");

module.exports.productCommentShowSimple = function(req, res, next) {
  // simple
  var pageSimple = req.query.page || 1;
  var limitSimple = req.query.limit || 3;

  var nameSimple = req.query.name || "";

  var objQuerySimple = {
    Name: nameSimple
  };

  if (pageSimple < 1) {
    pageSimple = 1;
  }

  if (pageSimple < 1) {
    limitSimple = 3;
  }

  var offsetSimple = (pageSimple - 1) * limitSimple;

  // combo
  var pageCombo = 1;
  var limitCombo = 3;
  var offsetCombo = 0;
  var nameCombo = "";

  var objQueryCombo = {
    Name: nameCombo
  };

  // Lấy dữ liệu sản phẩm
  var productsWithCommentQuantity = productModel.pageAllProductCommentSimpleFilter(limitSimple, offsetSimple, objQuerySimple);

  // Lấy dữ liệu sản phẩm combo
  var productCombosWithCommentQuantity = productComboModel.pageAllProductCommentComboFilter(limitCombo, offsetCombo, objQueryCombo);

  var numberPageSimple = productModel.quantityProductCommentSimpleActive(objQuerySimple);

  var numberPageCombo = productComboModel.quantityProductCommentComboActive(objQueryCombo);

  Promise.all([productsWithCommentQuantity, productCombosWithCommentQuantity, numberPageSimple, numberPageCombo])
    .then(values => {
      res.locals.sidebar[8].active = true;

      // simple
      var totalSimple = values[2][0].QUANTITY;
      var nPagesSimple = Math.floor(totalSimple / limitSimple);
      if (totalSimple % limitSimple > 0) nPagesSimple++;

      var pagesSimple = createArrPage(nPagesSimple, pageSimple);

      var prePageSimple = {
        value: 0,
        active: false
      };
      if (pageSimple > 1) {
        prePageSimple.value = pageSimple - 1
        prePageSimple.active = true;
      } else {
        prePageSimple.value = 0
        prePageSimple.active = false;
      }

      var nextPageSimple = {
        value: 0,
        active: false
      }

      if (pageSimple < nPagesSimple) {
        nextPageSimple.value = parseInt(pageSimple) + 1
        nextPageSimple.active = true;
      } else {
        nextPageSimple.value = 0
        nextPageSimple.active = false;
      }

      // combo
      var totalCombo = values[3][0].QUANTITY;
      var nPagesCombo = Math.floor(totalCombo / limitCombo);
      if (totalCombo % limitCombo > 0) nPagesCombo++;

      var pagesCombo = createArrPage(nPagesCombo, pageCombo);

      var prePageCombo = {
        value: 0,
        active: false
      };
      if (pageCombo > 1) {
        prePageCombo.value = pageCombo - 1
        prePageCombo.active = true;
      } else {
        prePageCombo.value = 0
        prePageCombo.active = false;
      }

      var nextPageCombo = {
        value: 0,
        active: false
      }

      if (pageCombo < nPagesCombo) {
        nextPageCombo.value = parseInt(pageCombo) + 1
        nextPageCombo.active = true;
      } else {
        nextPageCombo.value = 0
        nextPageCombo.active = false;
      }

      res.render("admin/product-comment", {
        layout: "main-admin.hbs",
        products: values[0],
        productCombos: values[1],
        pagesSimple: pagesSimple,
        pagesCombo: pagesCombo,
        prePageSimple: prePageSimple,
        nextPageSimple: nextPageSimple,
        prePageCombo: prePageCombo,
        nextPageCombo: nextPageCombo,
        nameSimple: nameSimple,
        nameCombo: nameCombo,
        helpers: {
          createQueryCustomer: createQuery.createQueryCustomer
        }
      });
    })
    .catch(next);
};

module.exports.productCommentShowCombo = function(req, res, next) {
  // combo
  var pageCombo = req.query.page || 1;
  var limitCombo = req.query.limit || 3;

  var name = req.query.name || "";

  var objQueryCombo = {
    Name: name
  };

  if (pageCombo < 1) {
    pageCombo = 1;
  }

  if (pageCombo < 1) {
    limitCombo = 3;
  }

  var offsetCombo = (pageCombo - 1) * limitCombo;

  // simple
  var pageSimple = 1;
  var limitSimple =  3;
  var offsetSimple = 0;
  var nameSimple = "";

  var objQuerySimple = {
    Name: nameSimple
  };

  // Lấy dữ liệu sản phẩm
  var productsWithCommentQuantity = productModel.pageAllProductCommentSimpleFilter(limitSimple, offsetSimple, objQuerySimple);

  // Lấy dữ liệu sản phẩm combo
  var productCombosWithCommentQuantity = productComboModel.pageAllProductCommentComboFilter(limitCombo, offsetCombo, objQueryCombo);

  var numberPageSimple = productModel.quantityProductCommentSimpleActive(objQuerySimple);

  var numberPageCombo = productComboModel.quantityProductCommentComboActive(objQueryCombo);

  Promise.all([productsWithCommentQuantity, productCombosWithCommentQuantity, numberPageCombo, numberPageSimple])
    .then(values => {
      res.locals.sidebar[8].active = true;

      // combo
      var totalCombo = values[2][0].QUANTITY;
      var nPagesCombo = Math.floor(totalCombo / limitCombo);
      if (totalCombo % limitCombo > 0) nPagesCombo++;

      var pagesCombo = createArrPage(nPagesCombo, pageCombo);

      var prePageCombo = {
        value: 0,
        active: false
      };
      if (pageCombo > 1) {
        prePageCombo.value = pageCombo - 1
        prePageCombo.active = true;
      } else {
        prePageCombo.value = 0
        prePageCombo.active = false;
      }

      var nextPageCombo = {
        value: 0,
        active: false
      }

      if (pageCombo < nPagesCombo) {
        nextPageCombo.value = parseInt(pageCombo) + 1
        nextPageCombo.active = true;
      } else {
        nextPageCombo.value = 0
        nextPageCombo.active = false;
      }

     // simple
     var totalSimple = values[3][0].QUANTITY;
     var nPagesSimple = Math.floor(totalSimple / limitSimple);
     if (totalSimple % limitSimple > 0) nPagesSimple++;

     var pagesSimple = createArrPage(nPagesSimple, pageSimple);

     var prePageSimple = {
       value: 0,
       active: false
     };
     if (pageSimple > 1) {
       prePageSimple.value = pageSimple - 1
       prePageSimple.active = true;
     } else {
       prePageSimple.value = 0
       prePageSimple.active = false;
     }

     var nextPageSimple = {
       value: 0,
       active: false
     }

     if (pageSimple < nPagesSimple) {
       nextPageSimple.value = parseInt(pageSimple) + 1
       nextPageSimple.active = true;
     } else {
       nextPageSimple.value = 0
       nextPageSimple.active = false;
     }

      res.render("admin/product-comment", {
        layout: "main-admin.hbs",
        products: values[0],
        productCombos: values[1],
        pagesCombo: pagesCombo,
        pagesSimple: pagesSimple,
        prePageSimple: prePageSimple,
        nextPageSimple: nextPageSimple,
        prePageCombo: prePageCombo,
        nextPageCombo: nextPageCombo,
        nameSimple: nameSimple,
        nameCombo: name,
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

module.exports.commentOfProductSimpleShow = function(req, res, next) {
  var productId = req.params.id;
  var commentsOfProduct = commentModel.allCommentsOfProductSimple(productId);
  var commentsCustomerBuyProduct = commentModel.commentsCustomerBuyProductSimple();

  Promise.all([commentsOfProduct, commentsCustomerBuyProduct])
    .then(values => {
      res.locals.sidebar[8].active = true;

      // xét xem ng bình luận có mua sản phẩm chưa, gán giá trị cho BOUGHT
      for (var comment of values[0]) {
        var customer = values[1].find((value, index, array) => {
          if (
            value.CUSTOMERID === comment.CUSTOMERID &&
            value.PRODUCTID === comment.PRODUCTID
          ) {
            return value.CUSTOMERID;
          } else {
            return null;
          }
        });

        if (customer) {
          comment.BOUGHT = true;
        } else {
          comment.BOUGHT = false;
        }
      }

      res.render("admin/comment", {
        layout: "main-admin.hbs",
        comments: values[0],
        productId: productId,
        helpers: {
          commentStars: commentStarsHelper
        }
      });
    })
    .catch(next);
};

module.exports.commentOfProductComboShow = function(req, res, next) {
  var productComboId = req.params.id;
  var commentsOfProductCombo = commentModel.allCommentsOfProductCombo(
    productComboId
  );
  var commentsCustomerBuyProductCombo = commentModel.commentsCustomerBuyProductCombo();

  Promise.all([commentsOfProductCombo, commentsCustomerBuyProductCombo])
    .then(values => {
      res.locals.sidebar[8].active = true;

      // xét xem ng bình luận có mua sản phẩm chưa, gán giá trị cho BOUGHT
      for (var comment of values[0]) {
        var customer = values[1].find((value, index, array) => {
          if (
            value.CUSTOMERID === comment.CUSTOMERID &&
            value.PRODUCTID === comment.PRODUCTID
          ) {
            return value.CUSTOMERID;
          } else {
            return null;
          }
        });

        if (customer) {
          comment.BOUGHT = true;
        } else {
          comment.BOUGHT = false;
        }
      }

      res.render("admin/comment", {
        layout: "main-admin.hbs",
        comments: values[0],
        productComboId: productComboId,
        helpers: {
          commentStars: commentStarsHelper
        }
      });
    })
    .catch(next);
};

module.exports.postDeleteComment = (req, res, next) => {
  var commentID = req.body.CommentID;

  commentReactionModel
    .deleteCommentReactionByCommentId(commentID)
    .then(affectedRowsNumber => {
      commentModel
        .deleteCommentById(commentID)
        .then(affectedRowsNumber => {
          res.send(true);
        })
        .catch(next);
    })
    .catch(next);
};
