$("#header-edit-modal-birthdate").datetimepicker({
  format: "d/m/Y",
  timepicker: false,
  mask: false
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
      number: true,
      minlength: 10,
      maxlength: 12
    },
    BIRTHDATE: {
      required: true
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
      required: "Bạn cần nhập số điện thoại.",
      number: "Bạn cần nhập số điện thoại hợp lệ.",
      minlength: "Bạn cần nhập số điện thoại hợp lệ.",
      maxlength: "Bạn cần nhập số điện thoại hợp lệ."
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
      url: "/customer/auth/update",
      type: "POST",
      data: $(form).serialize(),
      success: function(result) {
        if (result.success == true) {
          $("#update-succes-modal").modal();
        } else {
            $("#alert-update").remove();
          var alert =
            '<div class="alert alert-warning alert-dismissible fade show" id="alert-update" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Lỗi hệ thống. Cập nhật thông tin thất bại!</div>';
          $("#frmUpdate").prepend(alert);
        }
      }
    });
  }
});
