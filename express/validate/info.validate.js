var tagModel = require("../models/tag.model");

module.exports.postInfoAdd = async function(req, res, next) {
    var errors = [];

	if (!req.body.TITLE) {
		errors.push('Bạn chưa nhập tiêu đề bài viết');
	}

	if (!req.body.TAG) {
		errors.push('Bạn chưa chọn tag');
    }
    
    if (!req.file) {
		errors.push('Bạn chưa chọn ảnh đại diện');
    }

    if (!req.body.SHORTCONTENT) {
		errors.push('Bạn chưa nhập nội dung tóm tắt');
    }
		
    if (!req.body.CONTENT) {
		errors.push('Bạn chưa nhập nội dung đầy đủ');
	}

	 //Lấy dữ liệu từ tag
	 var dataTags = await tagModel.allTag();

	if (errors.length) {
        res.render("admin/info-add", { 
            layout: "main-admin.hbs",
            errors: errors,
						values: req.body,
						tags: dataTags
        });

		return;
	}

	next();
};