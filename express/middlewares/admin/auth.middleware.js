var adminModel = require('../../models/admin.model');

module.exports.requireAuth = async function(req, res, next) {
	// Kiểm tra giá trị cookie
	if(!req.signedCookies.adminId) {
		res.redirect('/admin/auth/login');
		return;
	}

	// Lấy dữ liệu từ bảng admin
	var admins = adminModel.allAdmin();

	// Duyệt admins tìm acc admin có id trùng với giá trị cookie đã lưu
	admins.then(rows => {
		var admin = 
		rows.find((value, index, array) => {
			if(value.ID == req.signedCookies.adminId) {
				return value;
			} else {
				return null;
			}
		});

		// Nếu không tìm thấy acc, chuyển sang trang login
		if(!admin) {
			res.redirect('/admin/auth/login');
			return;
		}
		
		// Chuyển sang trang được yêu cầu
		next();

	}).catch(err => {
		console.log(err);
	});
};