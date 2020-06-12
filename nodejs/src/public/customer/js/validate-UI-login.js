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
  validClass: "is-valid",
  submitHandler: function(form) {
    $.ajax({
      url: "/customer/auth/login",
      type: "POST",
      data: $(form).serialize(),
      success: function(result) {
        if (result.valid == true) {
          window.location.href = location.href;
        } else {
          $("#alert-login").remove();
          var alert =
            '<div class="alert alert-warning alert-dismissible fade show" id="alert-login" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            result.message +
            "</div>";
          $("#frmLogin").prepend(alert);
          $("#header-login-modal-username").val(result.userName);
          $("#header-login-modal-password").val(result.passWord);
        }
      }
    });
  }
});
