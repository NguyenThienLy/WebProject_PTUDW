$("#frmLogin").validate({
    rules: {
      USERNAME: {
        required: true
      },
      PASSWORD: {
        required: true,
        minlength: 6,
        maxlength: 32
      }
    },
    messages: {
      USERNAME: {
        required: "Bạn cần nhập tên đăng nhập."
      },
      PASSWORD: {
        required: "Bạn cần nhập mật khẩu.",
        minlength: "Bạn cần nhập ít nhất 6 kí tự.",
        maxlength: "Bạn cần nhập nhiều nhất 32 kí tự."
      }
    },
  
    errorElement: "small",
    errorClass: "help-block text-danger is-invalid",
    validClass: "is-valid"
  });
  