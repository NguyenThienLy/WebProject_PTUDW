module.exports.loggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect('/customer/index');
  }
  else next();
}



