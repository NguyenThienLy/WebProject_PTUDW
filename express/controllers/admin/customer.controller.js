var customerModel = require("../../models/customer.model");
var commentModel = require("../../models/comment.model");
var commentReactionModel = require("../../models/comment_reaction.model");
var customerViewModel = require("../../models/customer_view.model");
var orderInfoModel = require("../../models/order_info.model");
var formatPriceHelper = require("../../helpers/format_price.helper");

module.exports.customerShow = function(req, res, next) {
  var getAllCustomers = customerModel.allCustomers();

  getAllCustomers
    .then(customers => {
      res.locals.sidebar[1].active = true;

      res.render("admin/customer", {
        layout: "main-admin.hbs",
        customers: customers
      });
    })
    .catch(next);
};

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
    .catch(next);
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
        .catch(next);
    })
    .catch(next);
};
