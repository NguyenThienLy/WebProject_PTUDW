var commentModel = require("../../models/comment.model");
var productModel = require("../../models/product.model");

module.exports.productCommentShow = async function(req, res) {
  var products = await productModel.allProductWithCommentQuantity();

  res.locals.sidebar[8].active = true;

  res.render("admin/product-comment", {
    layout: "main-admin.hbs",
    products: products
  });
};

module.exports.commentOfProductShow = async function(req, res) {
  var productId = req.params.id;
  var commentsOfProduct = await commentModel.allCommentsOfProduct(productId);
  var commentsCustomerBuyProduct = await commentModel.commentsCustomerBuyProduct();

  res.locals.sidebar[8].active = true;

  // xét xem ng bình luận có mua sản phẩm chưa, gán giá trị cho BOUGHT
  for (var comment of commentsOfProduct) {
    var customer = commentsCustomerBuyProduct.find((value, index, array) => {
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
    comments: commentsOfProduct
  });
};
