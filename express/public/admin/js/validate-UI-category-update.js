$("#frmCategoryUpdate").validate({
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
      required: "Hãy chọn danh mục con"
    }
  },
  errorElement: "small",
  errorClass: "help-block text-danger is-invalid",
  validClass: "is-valid",
  submitHandler: function(form) {
    var listSubCategories = $("[name=SUBCATEGORIES]").val();
    var listOldSubCategories = $("[name=OLDSUBCATEGORIES]").val();
    var listDeleteSubCategories = [];

    // tìm những danh mục con cũ bị xóa
    listOldSubCategories.forEach(oldSubCategory => {
      if (listSubCategories.indexOf(oldSubCategory) == -1) {
        listDeleteSubCategories.push(oldSubCategory);
      }
    });

    $.ajax({
      url: "/admin/subCategory/subCategory-is-valid-delete",
      type: "POST",
      data: JSON.stringify({ SUBCATEGORIES: listDeleteSubCategories }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(result) {
        if (result) {
          $.ajax({
            url: "/admin/category/category-update-info",
            type: "POST",
            data: $(form).serialize(),
            success: function(result) {
              if (result) {
                window.location.href = "/admin/category/category-show";
              }
            }
          });
        } else {
          $("#alert-delete-subCategory").remove();
          var alert =
            '<div class="alert alert-warning alert-dismissible fade show" id="alert-delete-subCategory" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Không thể xóa danh mục con</div>';
          $("#categoryId").prepend(alert);

          var option = "";
          listDeleteSubCategories.forEach(subCategoryId => {
            var subCategoryName = $(
              '#spanHiddenSelectTag select option[value="' + subCategory + '"]'
            ).html();

            option += `<option selected value="${subCategoryId}">${subCategoryName}</option>`;
          });

          $("#selectTag").html(option);
          $("#selectTag").trigger("chosen:updated");
        }
      }
    });
  }
});
