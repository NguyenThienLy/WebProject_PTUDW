var express = require('express');
var auth = require('../../middlewares/admin/auth.middleware');
var passport = require("passport");

var controller = require('../../controllers/admin/auth.controller');

var router = express.Router();

router.get('/login', auth.loggedIn, controller.login);

router.post('/login', controller.postLogin);

router.post('/logout', auth.requireAuth, controller.postLogout);

router.get('/google', auth.loggedIn, passport.authenticate('google-admin', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google-admin', { failureRedirect: '/admin/auth/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/admin/index');
});

router.get('/facebook', auth.loggedIn, passport.authenticate('facebook-admin'));

router.get('/facebook/callback', passport.authenticate('facebook-admin', { failureRedirect: '/admin/auth/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/admin/index');
});

module.exports = router;