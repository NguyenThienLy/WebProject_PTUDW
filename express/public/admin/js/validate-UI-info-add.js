jQuery.validator.addMethod("ckeditor", function(value, element) { 
    var textData = myEditor.getData();
    if(textData.length > 0) return true;
    return false;
});

$("#frmInfoAdd").validate({
  ignore: [],
  rules: {
    // simple rule, converted to {required:true}
    TITLE: {
      required: true
    },
    TAG: {
      required: true
    },
    image_info: {
      required: true
    },
    SHORTCONTENT: {
      required: true
    },
    CONTENT: {
        ckeditor: true
    }
  },
  messages: {
    TITLE: {
      required: "Hãy nhập tiêu đề bài viết"
    },
    TAG: {
      required: "Hãy chọn tag"
    },
    image_info: {
      required: "Hãy chọn hình đại diện"
    },
    SHORTCONTENT: {
      required: "Hãy nhập tóm tắt bài viết"
    },
    CONTENT: {
        ckeditor: "Hãy nhập nội dung bài viết"
    }
  },
  errorElement: "small",
  errorClass: "help-block text-danger is-invalid",
  validClass: "is-valid"
});
