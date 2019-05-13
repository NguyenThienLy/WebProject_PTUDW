const bcrypt = require("bcrypt");
const saltRounds = 10;
var adminModel = require("../models/admin.auth.model");
 
module.exports.login = function(req, res) {
  res.render("admin/login-admin");
 
  // Xóa giá trị cookie khi logout
  res.cookie("adminId", "");
};
 
module.exports.postLogin = function(req, res, next) {
  try {
    var username = req.body.NAME;
    var password = req.body.PASSWORD;
 
    // Đăng kí tài khoản với mật khẩu mã hóa bằng bcrypt
    // bcrypt.hash(password, saltRounds, function(err, hash) {
    // 	// Store hash in your password DB.
    // 	var entity = {
    // 		NAME: username,
    // 		PASSWORD: hash
    // 	}
 
    // 	adminModel.add(entity)
    // 	.then(id => {
    // 		console.log(id);
    // 	}).catch(err => {
    // 		console.log(err);
    // 	});
 
    // 	console.log(hash);
    //   });

    // Lấy dữ liệu từ bảng admin
    var admins = adminModel.all();


    // Duyệt admins để tìm acc admin trùng acc ng dùng nhập
    admins
      .then(rows => {
        var admin = rows.find((value, index, array) => {
          if (value.NAME == username) {
            return value;
          } else {
            return null;
          }
        });

        // // Nếu không tìm thấy acc admin trùng khớp
        // if (!admin) {
        //   res.render("admin/login-admin", {
        //     errors: [{ error: "Admin does not exist!" }],
        //     values: req.body
        //   });
        //   return;
        // }
 
        // // Kiểm tra mật khẩu
        // var hash = admin.PASSWORD;
        // console.log(password);
        // console.log(hash);
        // bcrypt.compare(password, hash, function(err, res_bcrypt) {
        //   if (res_bcrypt == false) {
        //     res.render("admin/login-admin", {
        //       errors: [{ error: "Wrong password!" }],
        //       values: req.body
        //     });
        //     return;
        //   }
 
        //   console.log("haha");
 
        //   // Thiết lập giá trị cookie = admin.ID
        //   res.cookie("adminId", admin.ID, {
        //     signed: true
        //   });
 
        //   // Chuyển đến trang index
        //   res.redirect("/admin/index");
        // });
 
        // Thiết lập giá trị cookie = admin.ID
        res.cookie("adminId", admin.ID, {
          signed: true
        });
 
        // Chuyển đến trang index
        res.redirect("/admin/index");
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    next(error);
  }
};
