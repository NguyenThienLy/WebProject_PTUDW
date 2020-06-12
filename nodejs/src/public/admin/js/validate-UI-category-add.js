$("#frmCategoryAdd").validate({
  ignore: [],
  rules: {
    SUBCATEGORIES: {
        required: true
    },
    NAME: {
      required: true
    }
  },
  messages: {
    NAME: {
      required: "Hãy nhập tên danh mục"
    },
    SUBCATEGORIES: {
      required: "Hãy chọn danh mục phụ"
    }
  },
  errorElement: "small",
  errorClass: "help-block text-danger is-invalid",
  validClass: "is-valid"
});
