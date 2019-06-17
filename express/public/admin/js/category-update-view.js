$(".btn_add_subCategory").click(function(e) {
  var newSubCategoryName = $("#inputNewSubCategoryName").val();

  if (newSubCategoryName.trim() !== "") {
    $("#selectTag").append(
      $("<option>", {
        value: newSubCategoryName,
        text: newSubCategoryName
      })
    );

    $("#selectTag").trigger("chosen:updated");

    $("#alert-add-subCategory").remove();
    var alert =
      '<div class="alert alert-success alert-dismissible fade show" id="alert-add-subCategory" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Thêm danh mục con thành công</div>';
    $("#lblAddNewSubCategory").prepend(alert);
    $("#inputNewSubCategoryName").removeClass("is-invalid");
    $("#inputNewSubCategoryName").val("");
    $("#inputNewSubCategoryName").focus();
  } else {
    $("#alert-add-subCategory").remove();
    var alert =
      '<div class="alert alert-warning alert-dismissible fade show" id="alert-add-subCategory" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Vui lòng nhập tên danh mục con</div>';
    $("#lblAddNewSubCategory").prepend(alert);
    $("#inputNewSubCategoryName").addClass("is-invalid");
    $("#inputNewSubCategoryName").focus();
  }
});

$(function() {
  $("#spanHiddenSelectTag").hide();
});
