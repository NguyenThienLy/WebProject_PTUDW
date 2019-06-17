
$(function() {
  $("#switchType").prop("checked", false);

  $("#labelType").html("Sản phẩm thường");
  $("#product-simple-content").show();
  $("#product-combo-content").hide();
});

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
$("#btn_search").click(function () {
    var selectedCategory = $("#selectProductType").children("option:selected").val();
    var selectedSubCategory = $("#SubCategory").children("option:selected").val();
    var selectedBrand = $("#Brand").children("option:selected").val();

    var query = CreateQuery(selectedCategory,selectedSubCategory,selectedBrand);
    var base_url = location.protocol + "//" + document.domain + ":" + location.port;
    if(query!=""){
        //Chuyển trang
        window.location = base_url+`/admin/product/product-show?${query}`;
    }
    else{
        window.location = base_url+`/admin/product/product-show`;
    }
});

function CreateQuery(catID, subCatID, brandID) {
    var data = {
        'catid': catID,
        'subcatid': subCatID,
        'brandid': brandID
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

