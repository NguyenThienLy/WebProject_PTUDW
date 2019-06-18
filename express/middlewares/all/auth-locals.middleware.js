module.exports = (req, res, next) => {
    if (req.user) {
      res.locals.isAuthenticated = true;
      res.locals.authUser = req.user;
      
      //Lưu lại trạng thái đăng nhập
      res.locals.typeLogin = req.user.typeLogin;

     
    }
    next();
  }