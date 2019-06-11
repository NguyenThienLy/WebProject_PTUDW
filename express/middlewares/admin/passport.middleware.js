var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var bcrypt = require("bcrypt");
var adminModel = require("../../models/admin.model");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  var ls = new LocalStrategy(
    {
      usernameField: "USERNAME",
      passwordField: "PASSWORD"
    },
    (username, password, done) => {
      adminModel
        .singleByUserName(username)
        .then(admins => {
          if (admins.length === 0) {
            return done(null, false, {
              message: "Tên đăng nhập không hợp lệ.",
              userName: username,
              passWord: password
            });
          }

          var user = admins[0];
          user.name = admins[0].USERNAME;
          var ret = bcrypt.compareSync(password, admins[0].PASSWORD);
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
        "321925154122-bs5vipc3ghdk6hqchcbijpf81705b0eh.apps.googleusercontent.com",
      clientSecret: "XuMmWfgQJY1RE_m9ctQ5-kGA",
      callbackURL: "http://localhost:3000/admin/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      adminModel
        .singleByUserName(profile.id)
        .then(admins => {
          if (admins.length === 0) {
            var newAdmin = {
              USERNAME: profile.id,
              PASSWORD: "Google"
            };

            adminModel
              .addAdmin(newAdmin)
              .then(newAdminId => {
                newAdmin.avatar = profile._json["picture"];
                newAdmin.name = profile.displayName;
                return cb(null, newAdmin);
              })
              .catch(err => {
                return cb(err, null);
              });
          } else {
            admins[0].avatar = profile._json["picture"];
            admins[0].name = profile.displayName;
            return cb(null, admins[0]);
          }
        })
        .catch(err => {
          return cb(err, null);
        });
    }
  );

  var fs = new FacebookStrategy(
    {
      clientID: "2359533340799370",
      clientSecret: "48afdd14ae21dc8490e090a25ebfaf71",
      callbackURL: "http://localhost:3000/admin/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      adminModel
        .singleByUserName(profile.id)
        .then(admins => {
          if (admins.length === 0) {
            var newAdmin = {
              USERNAME: profile.id,
              PASSWORD: "Facebook"
            };

            adminModel
              .addAdmin(newAdmin)
              .then(newAdminId => {
                newAdmin.avatar = profile._json["picture"];
                newAdmin.name = profile.displayName;
                return cb(null, newAdmin);
              })
              .catch(err => {
                return cb(err, null);
              });
          } else {
            admins[0].avatar = profile._json["picture"];
            admins[0].name = profile.displayName;
            return cb(null, admins[0]);
          }
        })
        .catch(err => {
          return cb(err, null);
        });
    }
  );

  passport.use('local-admin', ls);
  passport.use('google-admin', gs);
  passport.use('facebook-admin', fs);

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};
