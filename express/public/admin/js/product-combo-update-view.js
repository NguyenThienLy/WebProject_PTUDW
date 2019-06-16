//////////////////////////////////

var product1, product2, product3;

var g_productId1 = $("#selectProductID1").val();
var g_productId2 = $("#selectProductID2").val();
var g_productId3 = $("#selectProductID3").val();

$(function() {
  if (g_productId1 !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/product/load-product-by-productId",
      data: { ProductID: g_productId1 },
      success: function(data) {
        var _product1 = JSON.parse(data);
        product1 = _product1[0];
      }
    });
  }

  if (g_productId2 !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/product/load-product-by-productId",
      data: { ProductID: g_productId2 },
      success: function(data) {
        var _product2 = JSON.parse(data);
        product2 = _product2[0];
      }
    });
  }

  if (g_productId3 !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/product/load-product-by-productId",
      data: { ProductID: g_productId3 },
      success: function(data) {
        var _product3 = JSON.parse(data);
        product3 = _product3[0];
      }
    });
  }
});

///////////////////////////////// thêm product combo - product 1

$("#selectCat1 span").on("click", function() {
  $("#btnSelectCat1").html($(this).text());
  var catID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/product/load-productId-by-categoryId",
    data: { CategoryID: catID },
    success: function(data) {
      reloadProductId1(JSON.parse(data), catID);
    }
  });
});

function reloadProductId1(data, catID) {
  var option = "<option value=''>Chọn...</option>";
  $("#inputNameProduct1").val("");
  $("#inputInventoryProduct1").val("");

  if (catID !== "-1") {
    for (var i = 0; i < data.length; i++) {
      option += `<option value="${data[i].ID}">${data[i].ID}</option>`;
    }
  } else {
    var isHaveProductId1 = false;
    for (var i = 0; i < data.length; i++) {
      option += `<option value="${data[i].ID}">${data[i].ID}</option>`;

      if (data[i].ID === g_productId1) {
        isHaveProductId1 = true;
      }
    }

    if (!isHaveProductId1) {
      option += `<option value="${g_productId1}">${g_productId1}</option>`;
    }
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
      reloadProductId2(JSON.parse(data), catID);
    }
  });
});

function reloadProductId2(data, catID) {
  var option = "<option value=''>Chọn...</option>";
  $("#inputNameProduct2").val("");
  $("#inputInventoryProduct2").val("");

  if (catID !== "-1") {
    for (var i = 0; i < data.length; i++) {
      option += `<option value="${data[i].ID}">${data[i].ID}</option>`;
    }
  } else {
    var isHaveProductId2 = false;
    for (var i = 0; i < data.length; i++) {
      option += `<option value="${data[i].ID}">${data[i].ID}</option>`;

      if (data[i].ID === g_productId2) {
        isHaveProductId2 = true;
      }
    }

    if (!isHaveProductId2) {
      option += `<option value="${g_productId2}">${g_productId2}</option>`;
    }
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
      reloadProductId3(JSON.parse(data), catID);
    }
  });
});

function reloadProductId3(data, catID) {
  var option = "<option value=''>Chọn...</option>";
  $("#inputNameProduct3").val("");
  $("#inputInventoryProduct3").val("");

  if (catID !== "-1") {
    for (var i = 0; i < data.length; i++) {
      option += `<option value="${data[i].ID}">${data[i].ID}</option>`;
    }
  } else {
    var isHaveProductId3 = false;
    for (var i = 0; i < data.length; i++) {
      option += `<option value="${data[i].ID}">${data[i].ID}</option>`;

      if (data[i].ID === g_productId3) {
        isHaveProductId3 = true;
      }
    }

    if (!isHaveProductId3) {
      option += `<option value="${g_productId3}">${g_productId3}</option>`;
    }
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
