var bcrypt = require("bcrypt");
var customerModel = require("../../models/customer.model");
var passport = require("passport");
var moment = require("moment");

module.exports.postRegister = (req, res, next) => {
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.PASSWORD, saltRounds);
  console.log(req.body.PASSWORD);
  console.log(hash);
  var dob = moment(req.body.BIRTHDATE, "DD/MM/YYYY").format("YYYY-MM-DD");
  var avatar =
    "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png";

  var newCustomer = {
    USERNAME: req.body.USERNAME,
    IMAGE: avatar,
    PASSWORD: hash,
    FULLNAME: req.body.FULLNAME,
    EMAIL: req.body.EMAIL,
    BIRTHDATE: dob,
    CASH: 0,
    CUSTOMERTYPEID: 2
  };

  customerModel
    .addCustomer(newCustomer)
    .then(newCustomerId => {
      res.send({ success: true });
    }).catch(next);
};

module.exports.isAvailable = (req, res, next) => {
  var user = req.query.USERNAME;
  customerModel.singleByUserName(user).then(customers => {
    if (customers.length > 0) return res.json(false);

    return res.json(true);
  });
};

module.exports.postLogin = (req, res, next) => {
  passport.authenticate("local-customer", (err, boolean_user, info) => {
    if (err) return next(err);

    if (!boolean_user) {
      //   return res.render("customer/index", {
      //     layout: "main-customer.hbs",
      //     err_message: info.message,
      //     username: info.userName,
      //     password: info.passWord
      //   });

      return res.send(info);
    }

    req.logIn(boolean_user, err => {
      if (err) return next(err);

      //return res.redirect("/customer/index");
      res.send({ valid: true });
    });
  })(req, res, next);
};

module.exports.postLogout = (req, res, next) => {
  var typeLogin = req.user.typeLogin;
  req.logout();
  if (typeLogin !== "facebook" && typeLogin !== "google") {
    res.send({ loggedOut: true });
  } else {
    res.redirect("/customer/index");
  }
};

module.exports.checkIsLogin = (req, res, next) => {
  try {
    if (res.locals.isAuthenticated === true) {
      res.send("true");
    }
    else {
      res.send("false");
    }
  }
  catch (error) {
    next(error);
  }
};

//Cập nhật thông tin cá nhân
module.exports.updateInfo = (req, res, next) => {
  console.log(req.body);

  //Trường hợp cập nhật thông tin cá nhân không bao gồm hình ảnh
  var infoCustomer = {
    ID:req.body.ID,
    FULLNAME:req.body.FULLNAME,
    EMAIL:req.body.EMAIL,
    PHONE:req.body.PHONE
  };

  //Gọi hàm update
  customerModel.updateInfoCustomer(infoCustomer).then(value=>{
    res.send({ success: true });
  }).catch(next);
};

//Kiểm tra mật khẩu có chính xác hay không
module.exports.IsPasswork = (req, res, next) => {
  bcrypt.compare(req.query.OLDPASSWORD,res.locals.authUser.PASSWORD).then((value)=>{
    if(value){
      res.json(true);
    }else{
      res.json(false);
    }   
  }) 
};

//Cập nhật mật khẩu mới
module.exports.UpdatePassWord = (req, res, next) => {
  //Mã hóa mk
  var saltRounds = 10;
  var hashpass = bcrypt.hashSync(req.body.NEWPASSWORD, saltRounds); 
 
  var infoCustomer = {
    ID:req.body.ID,
    PASSWORD:hashpass
  };
  //Gọi hàm update
  customerModel.updateInfoCustomer(infoCustomer).then(value=>{
    res.send({ success: true });
  }).catch(next);
};