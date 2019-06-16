
$("#frmUpdatePass").validate({
    rules: {
        OLDPASSWORD: {
            required: true,
            remote: {
                url: "/customer/auth/is-password"
              }
        },
        NEWPASSWORD: {
            required: true,
            minlength: 6,
            maxlength: 32
        },
        CONFIRMPASSWORD: {
            required: true,
            equalTo: "#header-update-modal-newPassword"
        },
    },
    messages: {
        OLDPASSWORD: {
            required: "Mật khẩu không đúng.",
            remote:"Mật khẩu không đúng"
        },
        NEWPASSWORD: {
            required: "Bạn cần nhập mật khẩu.",
            minlength: "Bạn cần nhập ít nhất 6 kí tự.",
            maxlength: "Bạn cần nhập nhiều nhất 32 kí tự."
        },
        CONFIRMPASSWORD: {
            required: "Mật khẩu không khớp.",
            equalTo: "Mật khẩu không khớp."
        },
    },

    errorElement: "small",
    errorClass: "help-block text-danger is-invalid",
    validClass: "is-valid",
    submitHandler: function (form) {
        $.ajax({
            url: "/customer/auth/update-password",
            type: "POST",
            data: $(form).serialize(),
            success: function (result) {
                if (result.success == true) {
                    alert("Cập nhật thành công");
                } else {
                    alert("Cập nhật thất bại");
                }
            }
        });
    }
});
