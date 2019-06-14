jQuery.validator.addMethod("comparisonIMAGE", function (value, element) {
  var numberFile = $("#info-image")[0].files.length;
  if (numberFile != 1) {
    return false;
  } else { return true; }
})

jQuery.validator.addMethod("tinyMCE", function(value, element) {
  var data = tinyMCE.get('my_editor').getContent();
  if(data) {
    return true;
  } else {
    return false;
  }
})

$("#frmInfoAdd").validate({
  ignore: [],
  rules: {
    INFO_IMAGE: {
      comparisonIMAGE: true
    },
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
    INFO_IMAGE:{
      comparisonIMAGE:"Vui lòng chọn 1 hình"
    },
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
