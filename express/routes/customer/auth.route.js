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

module.exports = router;
