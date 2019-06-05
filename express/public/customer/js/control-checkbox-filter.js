$(document).ready(function() {
  /* categories */
  // Đổi màu category nền nếu kích vào checkbox
  $(`#ulCategoriesFilter input[name="checkboxCategory"]`).change(function() {
    var $id = $(this).attr("id");

    if (
      $(`#ulCategoriesFilter > li input[id=${$id}]`).prop("checked") == true
    ) {
      // Xóa màu nền hết tất cả category subcategory
      $(`#ulCategoriesFilter > li`).removeClass("category-choosing");

      // Xóa màu nên hết tất cả của sub category
      $(`#ulCategoriesFilter > ul li`).removeClass("sub-category-choosing");

      /* Đánh dấu tích vào một ô đang chọn category */
      $(`#ulCategoriesFilter > li input[name="checkboxCategory"]`).prop(
        "checked",
        false
      );
      $(`#ulCategoriesFilter > li input[id=${$id}]`).prop("checked", true);
      /* Đánh dấu tích vào một ô đang chọn category */

      /* Đánh dấu tích vào một ô đang chọn sub category */
      $(`#ulCategoriesFilter > ul input[name="checkboxSubCategory"]`).prop(
        "checked",
        false
      );
      $(`#ulCategoriesFilter > ul[id=${$id}] input`).prop("checked", true);
      /* Đánh dấu tích vào một ô đang chọn sub category */

      // Tô màu category có id
      $(`#ulCategoriesFilter > li[id=${$id}]`).addClass("category-choosing");

      // Tô màu sub category có id
      $(`#ulCategoriesFilter > ul li[id=${$id}]`).addClass(
        "sub-category-choosing"
      );
    } else {
      // Xóa tô mà category
      $(`#ulCategoriesFilter > li`).removeClass("category-choosing");

      // Xóa tô màu sub category
      $(`#ulCategoriesFilter > ul li`).removeClass("sub-category-choosing");

      // Bỏ chọn tất cả các checkbox
      $(`#ulCategoriesFilter > ul input[name="checkboxSubCategory"]`).prop(
        "checked",
        false
      );
    }
  });

  // Mở subcategory khi kích vào
  $(`#ulCategoriesFilter > li`).on("click", function(e) {
    var $id = $(this).attr("id");

    $(`#ulCategoriesFilter > ul[id=${$id}]`).collapse("toggle");
  });

  // Đổi màu subcategory nền nếu kích vào checkbox
  $(`#ulCategoriesFilter ul input[name="checkboxSubCategory"]`).change(
    function() {
      var $id = $(this).attr("id");
      var $idSub = $(this).attr("id-sub");

      // alert($idSub);

      if (
        $(`#ulCategoriesFilter > ul input[id-sub=${$idSub}]`).prop("checked") ==
        true
      ) {
        // Xóa màu nền hết tất cả của category
        $(`#ulCategoriesFilter > li`).removeClass("category-choosing");

        // Xóa màu nên hết tất cả của sub category
        $(`#ulCategoriesFilter > ul li`).removeClass("sub-category-choosing");

        /* Đánh dấu tích vào một ô đang chọn category */
        $(`#ulCategoriesFilter input[name="checkboxCategory"]`).prop(
          "checked",
          false
        );

        $(`#ulCategoriesFilter > li input[id=${$id}]`).prop("checked", true);
        /* Đánh dấu tích vào một ô đang chọn category */

        /* Đánh dấu tích vào một ô đang chọn sub category */
        $(`#ulCategoriesFilter input[name="checkboxSubCategory"]`).prop(
          "checked",
          false
        );

        $(`#ulCategoriesFilter > ul input[id-sub=${$idSub}]`).prop(
          "checked",
          true
        );
        /* Đánh dấu tích vào một ô đang chọn sub category */

        // Tô màu nền cho category có id
        $(`#ulCategoriesFilter > li[id=${$id}]`).addClass("category-choosing");

        // Tô màu nền cho sub category có id
        $(`#ulCategoriesFilter > ul li[id-sub=${$idSub}]`).addClass(
          "sub-category-choosing"
        );
      } else {
        // Xóa màu nên hết tất cả của category
        $(`#ulCategoriesFilter > li`).removeClass("category-choosing");

        // Xóa màu nên hết tất cả của sub category
        $(`#ulCategoriesFilter > ul li`).removeClass("sub-category-choosing");

        // Bỏ chọn tất cả các dâu tích của checkbox category
        $(`#ulCategoriesFilter input[name="checkboxCategory"]`).prop(
          "checked",
          false
        );

        // Bỏ chọn tất cả các dâu tích của checkbox sub category
        $(`#ulCategoriesFilter input[name="checkboxSubCategory"]`).prop(
          "checked",
          false
        );
      }
    }
  );
  /* categories */

  /* brands */
  $(`#ulBrandsFilter input[name="checkboxBrand"]`).change(function() {
    var $id = $(this).attr("id");

    if ($(`#ulBrandsFilter input[id=${$id}]`).prop("checked") == true) {
      // Xóa màu nền tất cả
      $(`#ulBrandsFilter li`).removeClass("category-choosing");

      // Đánh dấu tích vào một ô đang chọn
      $(`#ulBrandsFilter input[name="checkboxBrand"]`).prop("checked", false);
      $(`#ulBrandsFilter input[id=${$id}]`).prop("checked", true);

      // Đổi màu
      $(`#ulBrandsFilter li[id=${$id}]`).addClass("category-choosing");
    } else {
      // Xóa màu
      $(`#ulBrandsFilter li[id=${$id}]`).removeClass("category-choosing");
    }
  });
  /* brands */

  /* prices */
  $(`#ulPricesFilter input[name="checkboxPrice"]`).change(function() {
    var $id = $(this).attr("id");

    if ($(`#ulPricesFilter input[id=${$id}]`).prop("checked") == true) {
      // Xóa màu nền tất cả
      $(`#ulPricesFilter li`).removeClass("category-choosing");

      // Đánh dấu tích vào một ô đang chọn
      $(`#ulPricesFilter input[name="checkboxPrice"]`).prop("checked", false);
      $(`#ulPricesFilter input[id=${$id}]`).prop("checked", true);

      // Đổi màu
      $(`#ulPricesFilter > li[id=${$id}]`).addClass("category-choosing");
    } else {
      // Xóa màu
      $(`#ulPricesFilter > li[id=${$id}]`).removeClass("category-choosing");
    }
  });
  /* prices */
});
