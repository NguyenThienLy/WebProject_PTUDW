var commentModel = require("../../models/comment.model");
var productModel = require("../../models/product.model");

var commentStarsHelper = require("../../helpers/comment_stars.helper");

module.exports.productCommentShow = function(req, res) {
  var getProductsWithCommentQuantity = productModel.allProductWithCommentQuantity();

  getProductsWithCommentQuantity
    .then(products => {
      res.locals.sidebar[8].active = true;

      res.render("admin/product-comment", {
        layout: "main-admin.hbs",
        products: products
      });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.commentOfProductShow = function(req, res) {
  var productId = req.params.id;
  var commentsOfProduct = commentModel.allCommentsOfProduct(productId);
  var commentsCustomerBuyProduct = commentModel.commentsCustomerBuyProduct();

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
        helpers: {
          commentStars: commentStarsHelper
        }
      });
    })
    .catch(err => {
      next(err);
    });
};
