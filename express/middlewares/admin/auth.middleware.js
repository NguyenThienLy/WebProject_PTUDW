var adminModel = require("../../models/admin.model");

module.exports.requireAuth = async function(req, res, next) {
  // Kiểm tra giá trị cookie
  if (!req.signedCookies.adminId) {
    res.redirect("/admin/auth/login");
    return;
  }

  // Lấy dữ liệu từ bảng admin
  var admins = await adminModel.allAdmin();

  // Tìm xem có acc trong bảng admin không
  var admin = admins.find((value, index, array) => {
    if (value.ID == req.signedCookies.adminId) {
      return value;
    } else {
      return null;
    }
  });

  // Nếu không tìm thấy acc, chuyển sang trang login
  if (!admin) {
    res.redirect("/admin/auth/login");
    return;
  }

  // Chuyển sang trang được yêu cầu
  next();
};
