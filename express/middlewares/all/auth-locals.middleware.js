module.exports = (req, res, next) => {
    if (req.user) {
      res.locals.isAuthenticated = true;
      res.locals.authUser = req.user;

      console.log('t da o day',res.locals.authUser);
    }
    next();
  }