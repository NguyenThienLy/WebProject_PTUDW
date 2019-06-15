$("#header-register-modal-birthdate").datetimepicker({
    format: "d/m/Y",
    timepicker: false,
    mask: true
});

$("#frmUpdate").validate({
    rules: {
        FULLNAME: {
            required: true
        },
        EMAIL: {
            required: true,
            email: true
        },
        PHONE: {
            required: true,
            number:true
        }
    },
    messages: {

        FULLNAME: {
            required: "Bạn cần nhập họ tên."
        },
        EMAIL: {
            required: "Bạn cần nhập địa chỉ email.",
            email: "Địa chỉ email không hợp lệ."
        },
        PHONE: {
            required: "Bạn cần nhập số điện thoại",
            number:"Bạn cần nhập vào số điện thoại"
        }
    },

    errorElement: "small",
    errorClass: "help-block text-danger is-invalid",
    validClass: "is-valid",
    submitHandler: function (form) {
        $.ajax({
            url: "/customer/auth/update",
            type: "POST",
            data: $(form).serialize(),
            success: function (result) {
                if (result.success == true) {
                    alert('Cập nhật thành công');
                } else {
                }
            }
        });
    }
});
