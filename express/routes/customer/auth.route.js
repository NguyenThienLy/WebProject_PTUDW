var express = require("express");
var auth = require("../../middlewares/customer/auth.middleware");
var passport = require("passport");

var controller = require("../../controllers/customer/auth.controller");
var router = express.Router();

router.post("/register", controller.postRegister);

router.get("/is-available", controller.isAvailable);

router.post("/login", controller.postLogin);

router.post("/logout", controller.postLogout);

router.get("/google", auth.loggedIn, passport.authenticate("google-customer", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google-customer", { failureRedirect: "/customer/index" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/customer/index");
  }
);

router.get("/facebook", auth.loggedIn, passport.authenticate("facebook-customer", { scope : ['email'] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook-customer", { failureRedirect: "/customer/index" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/customer/index');
  }
);

// Hàm kiểm tra xem người có đăng nhập chưa
router.post("/check-is-login", controller.checkIsLogin);

//Nhận về post update
router.post('/update', controller.updateInfo);

//Kiểm tra mật khẩu có đúng hay không
router.get('/is-password', controller.IsPasswork);

//Cập nhật mật khẩu mới
router.post('/update-password', controller.UpdatePassWord);

//Quên mật khẩu
router.post('/forgot-pass', controller.SendMail);

//Nhận về đường dẫn để trả về trang cập nhật mật khẩu
router.get('/reset/:token',controller.renderResetPage);

router.post('/reset-pass/:token',controller.resetPass);

//Kiểm tra mail có tồn tại hay không
router.get('/is-available-mail', controller.IsAvailaleMail);


module.exports = router;
