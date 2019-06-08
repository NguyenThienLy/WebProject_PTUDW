$("#header-register-modal-birthdate").datetimepicker({
  format: "d/m/Y",
  timepicker: false,
  mask: true
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
      email: true
    },
    BIRTHDATE: {
      required: true
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
      email: "Địa chỉ email không hợp lệ."
    },
    BIRTHDATE: {
      required: "Bạn cần nhập ngày sinh hợp lệ."
    }
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
        }
      }
    });
  }
});
