jQuery.validator.addMethod("comparisonIMAGE", function(value, element) {
  var numberFile = $("#info-image")[0].files.length;
  if (numberFile != 1) {
    return false;
  } else {
    return true;
  }
});

jQuery.validator.addMethod("tinyMCE", function(value, element) {
  var data = tinyMCE.get("my_editor").getContent();
  if (data) {
    return true;
  } else {
    return false;
  }
});

$("#frmInfoUpdate").validate({
  ignore: [],
  rules: {
    TITLE: {
      required: true
    },
    TAG: {
      required: true
    },
    SHORTCONTENT: {
      required: true,
      maxlength: 500
    },
    CONTENT: {
      tinyMCE: true
    }
  },
  messages: {
    TITLE: {
      required: "Hãy nhập tiêu đề bài viết"
    },
    TAG: {
      required: "Hãy chọn tag"
    },
    SHORTCONTENT: {
      required: "Hãy nhập tóm tắt bài viết",
      maxlength: "Vui lòng không nhập quá 500 kí tự"
    },
    CONTENT: {
      tinyMCE: "Hãy nhập nội dung bài viết"
    }
  },
  errorElement: "small",
  errorClass: "help-block text-danger is-invalid",
  validClass: "is-valid"
});

$("#frmInfoUpdateImage").validate({
  ignore: [],
  rules: {
    INFO_IMAGE: {
      comparisonIMAGE: true
    }
  },
  messages: {
    INFO_IMAGE: {
      comparisonIMAGE: "Vui lòng chọn 1 hình"
    }
  },
  errorElement: "small",
  errorClass: "help-block text-danger is-invalid",
  validClass: "is-valid",
  submitHandler: function(form) {
    var formData = new FormData($(form)[0]);
    $.ajax({
      url: "/admin/info/info-update-image",
      type: "POST",
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      enctype: "multipart/form-data",
      processData: false,
      success: function(result) {
        if (result.valid == true) {
          window.location.href = location.href;
        } else {
          $("#alert-update-image").remove();
          var alert =
            '<div class="alert alert-warning alert-dismissible fade show" id="alert-update-image" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Cập nhật hình ảnh thất bại</div>';
          $("#info-update-image").prepend(alert);
        }
      }
    });
  }
});
