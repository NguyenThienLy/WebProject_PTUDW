$("#selectProductType").on("change", function() {
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  $.post(
    base_url + "/admin/product/load-subcategory",
    { CategoryID: this.value },
    function(data) {
      reloadSubCategory(JSON.parse(data));
    }
  );
});

function reloadSubCategory(data) {
  var option = "";
  for (var i = 0; i < data.length; i++) {
    option += `<option value="${data[i].ID}">${data[i].NAME}</option>`;
  }
  $("#SubCategory").html(option);
}

///////////////////////////////// thêm product combo - product 1
var product1, product2, product3;
$("#selectCat1 span").on("click", function() {
  $("#btnSelectCat1").html($(this).text());
  var catID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/product/load-productId-by-categoryId",
    data: { CategoryID: catID },
    success: function(data) {
      reloadProductId1(JSON.parse(data));
    }
  });
});

function reloadProductId1(data) {
  var option = "<option value=''>Chọn...</option>";
  for (var i = 0; i < data.length; i++) {
    option += `<option value="${data[i].ID}">${data[i].ID}</option>`;
  }
  $("#selectProductID1").html(option);
}

$("#selectProductID1").on("change", function() {
  var productId2 = $("#selectProductID2").val();
  var productId3 = $("#selectProductID3").val();

  var productId1 = $(this).val();
  if (productId1 !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/product/load-product-by-productId",
      data: { ProductID: productId1 },
      success: function(data) {
        setNameAndInventoryForPro1(JSON.parse(data));

        // cập nhật giá và trọng lượng combo
        if (productId1 !== "" && productId2 !== "" && productId3 !== "") {
          var comboPrice = product1.PRICE + product2.PRICE + product3.PRICE;
          var kilogram =
            product1.KILOGRAM + product2.KILOGRAM + product3.KILOGRAM;
          $("#inputPriceProductCombo").val(comboPrice);
          $("#inputKLGProductCombo").val(kilogram);
        }
      }
    });
  } else {
    $("#inputNameProduct1").val("");
    $("#inputInventoryProduct1").val("");
  }
});

function setNameAndInventoryForPro1(data) {
  product1 = data[0];
  $("#inputNameProduct1").val(data[0].NAME);
  $("#inputInventoryProduct1").val(data[0].INVENTORY);
}

///////////////////////////////// thêm product combo - product 2

$("#selectCat2 span").on("click", function() {
  $("#btnSelectCat2").html($(this).text());
  var catID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/product/load-productId-by-categoryId",
    data: { CategoryID: catID },
    success: function(data) {
      reloadProductId2(JSON.parse(data));
    }
  });
});

function reloadProductId2(data) {
  var option = "<option value=''>Chọn...</option>";
  for (var i = 0; i < data.length; i++) {
    option += `<option value="${data[i].ID}">${data[i].ID}</option>`;
  }
  $("#selectProductID2").html(option);
}

$("#selectProductID2").on("change", function() {
  var productId1 = $("#selectProductID1").val();
  var productId3 = $("#selectProductID3").val();

  var productId2 = $(this).val();
  if (productId2 !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/product/load-product-by-productId",
      data: { ProductID: productId2 },
      success: function(data) {
        setNameAndInventoryForPro2(JSON.parse(data));

        // cập nhật giá và trọng lượng combo
        if (productId1 !== "" && productId2 !== "" && productId3 !== "") {
          var comboPrice = product1.PRICE + product2.PRICE + product3.PRICE;
          var kilogram =
            product1.KILOGRAM + product2.KILOGRAM + product3.KILOGRAM;
          $("#inputPriceProductCombo").val(comboPrice);
          $("#inputKLGProductCombo").val(kilogram);
        }
      }
    });
  } else {
    $("#inputNameProduct2").val("");
    $("#inputInventoryProduct2").val("");
  }
});

function setNameAndInventoryForPro2(data) {
  product2 = data[0];
  $("#inputNameProduct2").val(data[0].NAME);
  $("#inputInventoryProduct2").val(data[0].INVENTORY);
}

///////////////////////////////// thêm product combo - product 3

$("#selectCat3 span").on("click", function() {
  $("#btnSelectCat3").html($(this).text());
  var catID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/product/load-productId-by-categoryId",
    data: { CategoryID: catID },
    success: function(data) {
      reloadProductId3(JSON.parse(data));
    }
  });
});

function reloadProductId3(data) {
  var option = "<option value=''>Chọn...</option>";
  for (var i = 0; i < data.length; i++) {
    option += `<option value="${data[i].ID}">${data[i].ID}</option>`;
  }
  $("#selectProductID3").html(option);
}

$("#selectProductID3").on("change", function() {
  var productId1 = $("#selectProductID1").val();
  var productId2 = $("#selectProductID2").val();

  var productId3 = $(this).val();
  if (productId3 !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/product/load-product-by-productId",
      data: { ProductID: productId3 },
      success: function(data) {
        setNameAndInventoryForPro3(JSON.parse(data));

        // cập nhật giá và trọng lượng combo
        if (productId1 !== "" && productId2 !== "" && productId3 !== "") {
          var comboPrice = product1.PRICE + product2.PRICE + product3.PRICE;
          var kilogram =
            product1.KILOGRAM + product2.KILOGRAM + product3.KILOGRAM;
          $("#inputPriceProductCombo").val(comboPrice);
          $("#inputKLGProductCombo").val(kilogram);
        }
      }
    });
  } else {
    $("#inputNameProduct3").val("");
    $("#inputInventoryProduct3").val("");
  }
});

function setNameAndInventoryForPro3(data) {
  product3 = data[0];
  $("#inputNameProduct3").val(data[0].NAME);
  $("#inputInventoryProduct3").val(data[0].INVENTORY);
}
