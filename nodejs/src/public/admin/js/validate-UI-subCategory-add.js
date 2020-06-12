$("#frmSubCategoryAdd").validate({
  ignore: [],
  rules: {
    CATEGORYID: {
      required: true
    },
    NAME: {
      required: true
    }
  },
  messages: {
    NAME: {
      required: "Hãy nhập tên danh mục phụ"
    },
    CATEGORYID: {
      required: "Hãy chọn danh mục"
    }
  },
  errorElement: "small",
  errorClass: "help-block text-danger is-invalid",
  validClass: "is-valid"
});
