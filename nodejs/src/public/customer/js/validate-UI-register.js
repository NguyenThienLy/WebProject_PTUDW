$("#header-register-modal-birthdate").datetimepicker({
  format: "d/m/Y",
  timepicker: false,
  mask: false
});

$("#frmRegister").validate({
  rules: {
    USERNAME: {
      required: true,
      remote: {
        url: "/customer/auth/is-available"
      }
    },
    PASSWORD: {
      required: true,
      minlength: 6,
      maxlength: 32
    },
    CONFIRMPASSWORD: {
      required: true,
      equalTo: "#header-register-modal-password"
    },
    FULLNAME: {
      required: true
    },
    EMAIL: {
      required: true,
      email: true,
      remote: {
        url: "/customer/auth/is-valid-email"
      }
    },
    BIRTHDATE: {
      required: true
    },
    PHONE: {
      required: true,
      number: true,
      minlength: 10,
      maxlength: 12
    }
  },
  messages: {
    USERNAME: {
      required: "Bạn cần nhập tên đăng nhập.",
      remote: "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác."
    },
    PASSWORD: {
      required: "Bạn cần nhập mật khẩu.",
      minlength: "Bạn cần nhập ít nhất 6 kí tự.",
      maxlength: "Bạn cần nhập nhiều nhất 32 kí tự."
    },
    CONFIRMPASSWORD: {
      required: "Mật khẩu không khớp.",
      equalTo: "Mật khẩu không khớp."
    },
    FULLNAME: {
      required: "Bạn cần nhập họ tên."
    },
    EMAIL: {
      required: "Bạn cần nhập địa chỉ email.",
      email: "Địa chỉ email không hợp lệ.",
      remote: "Email này đã được đăng ký. Vui lòng chọn email khác."
    },
    BIRTHDATE: {
      required: "Bạn cần nhập ngày sinh hợp lệ."
    },
    PHONE: {
      required: "Bạn cần nhập số điện thoại.",
      number: "Bạn cần nhập số điện thoại hợp lệ.",
      minlength: "Bạn cần nhập số điện thoại hợp lệ.",
      maxlength: "Bạn cần nhập số điện thoại hợp lệ."
    },
  },

  errorElement: "small",
  errorClass: "help-block text-danger is-invalid",
  validClass: "is-valid",
  submitHandler: function(form) {
    $.ajax({
      url: "/customer/auth/register",
      type: "POST",
      data: $(form).serialize(),
      success: function(result) {
        if (result.success == true) {
          $("#header-login-modal-nav-tab").tab("show");
        } else {
          $("#alert-register").remove();
          var alert =
            '<div class="alert alert-warning alert-dismissible fade show" id="alert-register" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Lỗi hệ thống. Đăng ký thất bại!</div>';
          $("#frmRegister").prepend(alert);
        }
      }
    });
  }
});
