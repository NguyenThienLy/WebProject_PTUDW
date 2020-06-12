$("#formTabProductDetail").validate({
  rules: {
    TITLE: {
      required: true,
      minlength: 10,
      maxlength: 200
    },
    CONTENT: {
      required: true,
      minlength: 50,
      maxlength: 2000
    }
  },
  messages: {
    TITLE: {
      required: "Bạn cần nhập tiêu đề bình luận.",
      minlength: "Bạn cần nhập ít nhất 10 kí tự.",
      maxlength: "Bạn cần nhập nhiều nhất 20 kí tự."
    },
    CONTENT: {
      required: "Bạn cần nhập nội dung bình luận.",
      minlength: "Bạn cần nhập ít nhất 50 kí tự.",
      maxlength: "Bạn cần nhập nhiều nhất 2000 kí tự."
    }
  },

  errorElement: "small",
  errorClass: "help-block text-danger is-invalid",
  validClass: "is-valid"
});
