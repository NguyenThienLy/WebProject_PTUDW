var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var bcrypt = require("bcrypt");
var customerModel = require("../../models/customer.model");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  var ls = new LocalStrategy(
    {
      usernameField: "USERNAME",
      passwordField: "PASSWORD"
    },
    (username, password, done) => {
        customerModel
        .singleByUserName(username)
        .then(customers => {
          if (customers.length === 0) {
            return done(null, false, {
              message: "Tên đăng nhập không hợp lệ.",
              userName: username,
              passWord: password
            });
          }

          var user = customers[0];
          user.avatar = customers[0].IMAGE;
          var ret = bcrypt.compareSync(password, customers[0].PASSWORD);
          if (ret) {
            return done(null, user);
          }

          return done(null, false, {
            message: "Mật khẩu không hợp lệ.",
            userName: username,
            passWord: password
          });
        })
        .catch(err => {
          return done(err, false);
        });
    }
  );

  var gs = new GoogleStrategy(
    {
      clientID:
        "321925154122-hsdouqlj1sd8a9pr6goj83d78nln212f.apps.googleusercontent.com",
      clientSecret: "Yz3lTy5hxlg2AtqlLG3DVjrE",
      callbackURL: "http://localhost:3000/customer/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      customerModel
        .singleByUserName(profile.id)
        .then(customers => {
          if (customers.length === 0) {
            var newCustomer = {
              USERNAME: profile.id,
              IMAGE: profile._json["picture"],
              PASSWORD: "Google",
              FULLNAME: profile.displayName,
              EMAIL: profile.emails[0].value,
              BIRTHDATE: null,
              CASH: 0,
              CUSTOMERTYPEID: 2,
              STATUS: 1
            };

            customerModel
              .addCustomer(newCustomer)
              .then(newCustomerId => {
                newCustomer.avatar = profile._json["picture"];
                newCustomer.typeLogin = "google";
                return cb(null, newCustomer);
              })
              .catch(err => {
                return cb(err, null);
              });
          } else {
            customers[0].avatar = profile._json["picture"];
            customers[0].typeLogin = "google";
            return cb(null, customers[0]);
          }
        })
        .catch(err => {
          return cb(err, null);
        });
    }
  );

  var fs = new FacebookStrategy(
    {
      clientID: "419876272073569",
      clientSecret: "ae3ca4faa46b2c772d6add8e11d562b3",
      callbackURL: "http://localhost:3000/customer/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'emails', 'photos']
    },
    function(accessToken, refreshToken, profile, cb) {

      customerModel
        .singleByUserName(profile.id)
        .then(customers => {
          if (customers.length === 0) {
              var newCustomer = {
                USERNAME: profile.id,
                IMAGE: profile.photos[0].value,
                PASSWORD: "Facebook",
                FULLNAME: profile.displayName,
                EMAIL: profile.emails[0].value,
                BIRTHDATE: null,
                CASH: 0,
                CUSTOMERTYPEID: 2,
                STATUS: 1
              };
  
              customerModel
                .addCustomer(newCustomer)
                .then(newCustomerId => {
                  newCustomer.avatar = profile.photos[0].value;
                  newCustomer.typeLogin = "facebook";
                  return cb(null, newCustomer);
                })
                .catch(err => {
                  return cb(err, null);
                });
          } else {
            customers[0].avatar = profile.photos[0].value;
            customers[0].typeLogin = "facebook";
            return cb(null, customers[0]);
          }
        })
        .catch(err => {
          return cb(err, null);
        });
    }
  );

  passport.use('local-customer', ls);
  passport.use('google-customer', gs);
  passport.use('facebook-customer', fs);

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};
