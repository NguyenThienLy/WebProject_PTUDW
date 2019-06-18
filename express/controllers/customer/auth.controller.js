var bcrypt = require("bcrypt");
var customerModel = require("../../models/customer.model");
var passport = require("passport");
var moment = require("moment");
var nodemailer = require("nodemailer");
var async = require("async");
var crypto = require("crypto");

module.exports.postRegister = (req, res, next) => {
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.PASSWORD, saltRounds);
  // console.log(req.body.PASSWORD);
  // console.log(hash);
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
    CUSTOMERTYPEID: 2,
    STATUS: 1
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
    ID: req.body.ID,
    FULLNAME: req.body.FULLNAME,
    EMAIL: req.body.EMAIL,
    PHONE: req.body.PHONE
  };

  //Gọi hàm update
  customerModel.updateInfoCustomer(infoCustomer).then(value => {
    res.send({ success: true });
  }).catch(next);
};

//Kiểm tra mật khẩu có chính xác hay không
module.exports.IsPasswork = (req, res, next) => {
  bcrypt.compare(req.query.OLDPASSWORD, res.locals.authUser.PASSWORD).then((value) => {
    if (value) {
      res.json(true);
    } else {
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
    ID: req.body.ID,
    PASSWORD: hashpass
  };
  //Gọi hàm update
  customerModel.updateInfoCustomer(infoCustomer).then(value => {
    res.send({ success: true });
  }).catch(next);
};

//Gửi mail xác nhận
module.exports.SendMail = (req, res, next) => {
  //Lấy ra địa chỉ mail
  var Email = req.body.EMAIL;

  //Kiểm lấy ra id user tương ứng để gửi email
  customerModel.idOfEmailUser(Email).then(rows => {
    if (rows.length > 0) {
      var IDuser = rows[0].ID;

      async.waterfall([
        //Tạo token để tạo đường link gửi mail
        (done) => {
          crypto.randomBytes(20, (err, buf) => {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        (token, done) => {
          //Cập nhật token và thời gian hết hạn cho người dùng
          var lastime = Date.now()+3600000;
          var stringdate = new Date(lastime);
        //  console.log(stringdate);
          //format qua mysql
          var mysqlDatetime = moment(stringdate,'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');

        //  console.log(mysqlDatetime);
          var updateToken = {
            ID: IDuser,
            RESETPASSWORDTOKEN: token,
            RESETPASSWORDEXPIRES:mysqlDatetime
          };
        //  console.log('tao xong token')
          customerModel.updateInfoCustomer(updateToken).then(rows => {
            //Tạo mới tài khoản để gửi mail
            var transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'qui0210982@gmail.com', // generated ethereal user
                pass: '01647846483' // generated ethereal password
              }
            });

            //Tạo nội dung email để gửi
            var mailOption = {
              from: '"qui0210982@gmail.com',
              to: Email,
              subject: "Oragnic - Password reset",
              text: "Chúng tôi gửi yêu cầu này đến bạn vì nhận được yêu cầu reset mật khẩu từ bạn (hoặc ai khác)\n"
                + "Vui lòng bấm vào đường đường dẫn dưới đây để đổi mật khẩu\n"
                + 'http://' + req.headers.host + '/customer/auth/reset/' + token + '\n\n' +
                'Nếu yêu cầu này không phải của bạn, vui lòng kiểm tra lại hoạt động tài khoản của mình'
            };

            console.log('tao thanh cong noi dung email', mailOption);

            transporter.sendMail(mailOption, (err) => {
              console.log('Đã gửi mail');
              done(err, 'done');
            });
          })
        },
      ], (err) => {
        if (err) {
          console.log('co loi xay ra', err);
          res.send({ success: false });

        }
        else {
          res.send({ success: true });
        }
      })
    }
    else {
      console.log('khong ton tai mail de de gui ve');
      res.send({ success: false });
    }
  });
};

//Trả về trang cập nhật mật khẩu mới khi reset
module.exports.renderResetPage = (req, res, next) => {
  //Kiểm tra token còn tồn tại và còn đủ thời gian hay không
  
  customerModel.idOfToken(req.params.token).then(rows => {
    console.log(req.params.token);
    console.log(rows);
      if(rows.length>0){
        
        res.render("customer/forgot-pass", { token: req.params.token });
      }else{
        next();
      }
  });
  
};

//Xử lý cập nhật mật khẩu khi reset pass
module.exports.resetPass = (req, res, next) => {
  //lấy ra id của khách hàng có token và đổi mật khẩu
  customerModel.idOfToken(req.params.token).then(rows => {
    if (rows.length > 0) {
      //Mã hóa mật khẩu

      //Mã hóa mk
      var saltRounds = 10;
      var hashpass = bcrypt.hashSync(req.body.NEWPASSWORD, saltRounds);
      var resetDate = moment([1998, 1, 1, 0, 0, 0, 0]).format('YYYY-MM-DD hh:mm:ss');
      console.log(resetDate);
      var updatePass = {
        ID: rows[0].ID,
        PASSWORD: hashpass,
        RESETPASSWORDTOKEN:"",
        RESETPASSWORDEXPIRES:resetDate
      };

      customerModel.updateInfoCustomer(updatePass).then(rows=>{
        
        res.redirect('/customer/index');

      }).catch(next);
    } else {
      next();
    }
  }).catch(next);
};

//Kiểm tra mật khẩu có chính xác hay không
module.exports.IsAvailaleMail = (req, res, next) => {
  customerModel.idOfEmailUser(req.query.EMAIL).then(rows => {
    if (rows.length > 0) {
      return res.json(true);
    }else{
      return res.json(false);
    }
  })
};
