// Tạo ra mảng sidebar gồm 10 object
module.exports = function(req, res, next) {
  var sidebar = [];
  for (let i = 0; i < 14; i++) {
    var item = { active: false, quantity: 0 };
    sidebar.push(item);
  }

  res.locals.sidebar = sidebar;

  next();
};
