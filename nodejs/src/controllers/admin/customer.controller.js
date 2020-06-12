var customerModel = require("../../models/customer.model");
var commentModel = require("../../models/comment.model");
var commentReactionModel = require("../../models/comment_reaction.model");
var customerViewModel = require("../../models/customer_view.model");
var orderInfoModel = require("../../models/order_info.model");

var formatPriceHelper = require("../../helpers/format_price.helper");
// Gọi createquery helper
var createQuery = require("../../helpers/create_query.helper");

module.exports.customerShow = function(req, res, next) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 3;

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
    limit = 3;
  }

  var offset = (page - 1) * limit;

  var dataCustomers = customerModel.pageAllCustomerFilter(limit, offset, objQuery);

  var numberPage = customerModel.quantityCustomerActive(objQuery);

  Promise.all([dataCustomers, numberPage])
    .then(values => {
      res.locals.sidebar[1].active = true;

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

      res.render("admin/customer", {
        layout: "main-admin.hbs",
        customers: values[0],
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

module.exports.customerInfo = function(req, res, next) {
  var dataCustomer = customerModel.singleById(req.body.CustomerID);
  dataCustomer
    .then(customer => {
      customerModel
        .customerType(customer[0].CUSTOMERTYPEID)
        .then(customerType => {
          res.send({ customer: customer[0], customerType: customerType });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.postCustomerTypeUpdate = (req, res, next) => {
  var customerId = req.body.CustomerID;
  var customerTypeId = req.body.CustomerTypeID;

  var updateCustomer = {
    ID: customerId,
    CUSTOMERTYPEID: customerTypeId
  };

  customerModel
    .updateCustomer(updateCustomer)
    .then(changedRowsNumber => {
      res.send(true);
    })
    .catch(err => {
      res.send(false);
    });
};

//Xóa sản phẩm, xóa những sản phẩm không có trong combo
module.exports.postDeleteCustomer = (req, res, next) => {
  var customerID = req.body.CustomerID;

  var deleteCommentReaction = commentReactionModel.deleteCommentReactionByCustomerId(
    customerID
  );
  var deleteComment = commentModel.deleteCommentByCustomerId(customerID);
  // var deleteCustomerView = customerViewModel.deleteCustomerViewByCustomerId(
  //   customerID
  // );

  var updateOrderInfo = {
    CUSTOMERID: customerID,
    STATUS: 0
  };
  var deleteOrderInfo = orderInfoModel.deleteOrderInfo(updateOrderInfo);

  Promise.all([deleteCommentReaction, deleteOrderInfo])
    .then(values => {
      var updateCustomer = {
        ID: customerID,
        STATUS: 0
      };
      var deleteCustomer = customerModel.deleteCustomer(updateCustomer);

      Promise.all([deleteComment, deleteCustomer])
        .then(values => {
          res.send(true);
        })
        .catch(err => {
          res.send(false);
        });
    })
    .catch(err => {
      res.send(false);
    });
};
