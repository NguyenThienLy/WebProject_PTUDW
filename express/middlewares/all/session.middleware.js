var session = require('express-session');

module.exports = function (app) {
  app.use(session({
    secret: 'fgzaaflpt20imorsst20',
    resave: true,
    saveUninitialized: true
  }));
}