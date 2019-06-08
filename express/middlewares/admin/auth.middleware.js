module.exports.requireAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect('/admin/auth/login');
  }
  else next();
}

module.exports.loggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect('/admin/index');
  }
  else next();
}

module.exports.notAllowed = (req, res, next) => {
  if (req.user) {
    res.redirect('/admin/index');
  }
  else {
    res.redirect('/admin/auth/login');
  };
}

//var adminModel = require("../../models/admin.model");

// module.exports.requireAuth = async function(req, res, next) {
//   // Kiểm tra giá trị cookie
//   if (!req.signedCookies.adminId) {
//     res.redirect("/admin/auth/login");
//     return;
//   }

//   // Lấy dữ liệu từ bảng admin
//   var admins = await adminModel.allAdmin();

//   // Tìm xem có acc trong bảng admin không
//   var admin = admins.find((value, index, array) => {
//     if (value.ID == req.signedCookies.adminId) {
//       return value;
//     } else {
//       return null;
//     }
//   });

//   // Nếu không tìm thấy acc, chuyển sang trang login
//   if (!admin) {
//     res.redirect("/admin/auth/login");
//     return;
//   }

//   // Chuyển sang trang được yêu cầu
//   next();
// };

