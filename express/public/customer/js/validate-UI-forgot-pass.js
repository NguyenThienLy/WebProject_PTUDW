

$("#frmupdatepass").validate({
    rules: {

        NEWPASSWORD: {
            required: true,
            minlength: 6,
            maxlength: 32
        },
        COMFIRMPASSWORD: {
            required: true,
            equalTo: "#newpass"
        },
    },
    messages: {
        NEWPASSWORD: {
            required: "Bạn cần nhập mật khẩu.",
            minlength: "Bạn cần nhập ít nhất 6 kí tự.",
            maxlength: "Bạn cần nhập nhiều nhất 32 kí tự."
        },
        COMFIRMPASSWORD: {
            required: "Mật khẩu không khớp.",
            equalTo: "Mật khẩu không khớp."
        },
    },

    errorElement: "small",
    errorClass: "help-block text-danger is-invalid",
    validClass: "is-valid",
});
