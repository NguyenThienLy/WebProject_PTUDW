$(function() {
  if (getProductTypeFromUrl() === 0) {
    $("#switchType").prop("checked", false);

    $("#labelType").html("Sản phẩm thường");
    $("#product-simple-content").show();
    $("#product-combo-content").hide();
  } else {
    $("#switchType").prop("checked", true);

    $("#labelType").html("Sản phẩm combo");
    $("#product-combo-content").show();
    $("#product-simple-content").hide();
  }
});

function getProductTypeFromUrl() {
  var url = window.location.href;
  var isSimple = url
    .substring(url.lastIndexOf("/") + 1)
    .indexOf("product-show-simple");

  return isSimple;
}

$("#switchType").on("change", function() {
  if (this.checked) {
    $("#labelType").html("Sản phẩm combo");
    $("#product-combo-content").show();
    $("#product-simple-content").hide();
  } else {
    $("#labelType").html("Sản phẩm thường");
    $("#product-simple-content").show();
    $("#product-combo-content").hide();
  }
});

// Xóa sản phẩm simple
$(".post_delete_simple").click(function() {
  var deleteProductID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/product/product-delete",
    data: { ProductID: deleteProductID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $(".alert_modal").click();
      }
    }
  });
});


// Xóa sản phẩm combo
$(".post_delete_combo").click(function() {
  var deletedComboID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/product/product-combo-delete",
    data: { ProductComboID: deletedComboID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $(".alert_modal").click();
      }
    }
  });
});

$("#selectProductType").on("change", function () {
    var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;
    $.post(
        base_url + "/admin/product/load-subcategory",
        { CategoryID: this.value },
        function (data) {
            reloadSubCategory(JSON.parse(data));
        }
    );
});

function reloadSubCategory(data) {
    var option = `<option value="0">Tất cả</option>`;
    for (var i = 0; i < data.length; i++) {
        option += `<option value="${data[i].ID}">${data[i].NAME}</option>`;
    }
    $("#SubCategory").html(option);
}

//Tìm kiếm
$("#btn_search_simple").click(function() {
  var selectedCategory = $("#CategorySimple")
    .children("option:selected")
    .val();
  var selectedSubCategory = $("#SubCategorySimple")
    .children("option:selected")
    .val();
  var selectedBrand = $("#BrandSimple")
    .children("option:selected")
    .val();
  var inputName = $("#NameSimple").val();

  var query = CreateQuerySimple(
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    inputName
  );
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/product/product-show-simple?${query}`;
  } else {
    window.location = base_url + `/admin/product/product-show-simple`;
  }
});

function CreateQuerySimple(catID, subCatID, brandID, name) {
  var data = {
    catId: catID,
    subCatId: subCatID,
    brandId: brandID,
    name: name
  };

  return encodeQueryData(data);
}

//Tìm kiếm
$("#btn_search_combo").click(function() {
  var inputName = $("#product_combo_name").val();
  var inputSimpleName = $("#product_simple_name").val();

  var query = CreateQueryCombo(inputName, inputSimpleName);
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/product/product-show-combo?${query}`;
  } else {
    window.location = base_url + `/admin/product/product-show-combo`;
  }
});

function CreateQueryCombo(name, nameSimple) {
  var data = {
    name: name,
    nameSimple: nameSimple
  };

  return encodeQueryData(data);
}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        if (data[d] != 0) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
    return ret.join('&');
}

