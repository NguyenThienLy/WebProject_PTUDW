
$("#frmForgotPass").validate({
    rules: {
        EMAIL: {
            required: true,
            email: true,
            remote: {
                url: "/customer/auth/is-available-mail"
              }
        }
    },
    messages: {
        EMAIL: {
            required: "Bạn cần nhập địa chỉ email.",
            email: "Địa chỉ email không hợp lệ.",
            remote:"Địa chỉ mail này không tồn tại hoặc chưa được đăng ký"
        },
    },

    errorElement: "small",
    errorClass: "help-block text-danger is-invalid",
    validClass: "is-valid",
    submitHandler: function (form) {
        $.ajax({
            url: "/customer/auth/forgot-pass",
            type: "POST",
            data: $(form).serialize(),
            success: function (result) {
                if (result.success == true) {
                    alert('Vui lòng kiểm tra email để nhận link đổi mật khẩu');
                } else {
                    alert('Có lỗi xảy ra');
                }
            }
        });
    }
});
