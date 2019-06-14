jQuery.validator.addMethod("comparisonSALECombo", function(value, element) {
  var pcompra = $("#inputPromotionProductCombo").val();
  if (pcompra >= 0 && pcompra <= 100) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonVIPSALECombo", function(value, element) {
  var pcompra = $("#inputPromotionVIPProductCombo").val();
  if (pcompra >= 0 && pcompra <= 100) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonKILOGRAMCombo", function(value, element) {
  var pcompra = $("#inputKLGProductCombo").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonINVENTORYCombo", function(value, element) {
  var pcompra = $("#inputINVENTORYCombo").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("intINVENTORYCombo", function(value, element) {
  var val = $("#inputINVENTORYCombo").val();
  return val % 1 === 0;
});

jQuery.validator.addMethod("isValidInventoryCombo", function(value, element) {
  var inventoryCombo = parseInt($("#inputINVENTORYCombo").val());
  var inventoryPro1 = parseInt($("#inputInventoryProduct1").val());
  var inventoryPro2 = parseInt($("#inputInventoryProduct2").val());
  var inventoryPro3 = parseInt($("#inputInventoryProduct3").val());

  if (inventoryCombo > 0 && inventoryPro1 > 0 && inventoryPro2 > 0 && inventoryPro3 > 0) {
    inventoryPro1 -= inventoryCombo;
    inventoryPro2 -= inventoryCombo;
    inventoryPro3 -= inventoryCombo;

    if (inventoryPro1 >= 0 && inventoryPro2 >= 0 && inventoryPro3 >= 0) {
      return true;
    } else {
      return false;
    }
  }

  return false;
});

jQuery.validator.addMethod("comparisonPRICECombo", function(value, element) {
  var pcompra = $("#inputPriceProductCombo").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("intPRICECombo", function(value, element) {
  var val = $("#inputPriceProductCombo").val();
  return val % 1 === 0;
});

jQuery.validator.addMethod("tinyMCECombo", function(value, element) {
  var data = tinyMCE.get("my_editor_combo").getContent();
  if (data) {
    return true;
  } else {
    return false;
  }
});

jQuery.validator.addMethod("checkNoneProductID1", function(value, element) {
  var value = $("#selectProductID1").val();
  if (value !== "") {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("checkNoneProductID2", function(value, element) {
  var value = $("#selectProductID2").val();
  if (value !== "") {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("checkNoneProductID3", function(value, element) {
  var value = $("#selectProductID3").val();
  if (value !== "") {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("checkNotSameProductID1", function(value, element) {
  var productId1 = $("#selectProductID1").val();
  var productId2 = $("#selectProductID2").val();
  var productId3 = $("#selectProductID3").val();

  if (productId1 === "") {
    return true;
  }

  if (productId1 === productId2 || productId1 === productId3) {
    return false;
  }
  return true;
});

jQuery.validator.addMethod("checkNotSameProductID2", function(value, element) {
  var productId1 = $("#selectProductID1").val();
  var productId2 = $("#selectProductID2").val();
  var productId3 = $("#selectProductID3").val();

  if (productId2 === "") {
    return true;
  }

  if (productId2 === productId1 || productId2 === productId3) {
    return false;
  }
  return true;
});

jQuery.validator.addMethod("checkNotSameProductID3", function(value, element) {
  var productId1 = $("#selectProductID1").val();
  var productId2 = $("#selectProductID2").val();
  var productId3 = $("#selectProductID3").val();

  if (productId3 === "") {
    return true;
  }

  if (productId3 === productId2 || productId3 === productId1) {
    return false;
  }
  return true;
});

$("#add-product-combo-form").validate({
  ignore: [],
  rules: {
    PRODUCTID1: {
      required: true,
      checkNoneProductID1: true,
      checkNotSameProductID1: true
    },
    PRODUCTID2: {
      required: true,
      checkNoneProductID2: true,
      checkNotSameProductID2: true
    },
    PRODUCTID3: {
      required: true,
      checkNoneProductID3: true,
      checkNotSameProductID3: true
    },
    NAME: {
      required: true
    },
    INVENTORY: {
      required: true,
      number: true,
      comparisonINVENTORYCombo: true,
      intINVENTORYCombo: true,
      isValidInventoryCombo: true
    },
    PRICE: {
      required: true,
      number: true,
      comparisonPRICECombo: true,
      intPRICECombo: true
    },
    SALE: {
      required: true,
      number: true,
      comparisonSALECombo: true
    },
    VIPSALE: {
      required: true,
      number: true,
      comparisonVIPSALECombo: true
    },
    SHORTDESCRIPTION: {
      required: true,
      maxlength: 400
    },
    DESCRIPTION: {
      tinyMCECombo: true
    }
  },
  messages: {
    PRODUCTID1: {
      required: "Vui lòng chọn mã sản phẩm 1",
      checkNoneProductID1: "Vui lòng chọn mã sản phẩm 1",
      checkNotSameProductID1: "Vui lòng chọn mã sản phẩm khác nhau"
    },
    PRODUCTID2: {
      required: "Vui lòng chọn mã sản phẩm 2",
      checkNoneProductID2: "Vui lòng chọn mã sản phẩm 2",
      checkNotSameProductID2: "Vui lòng chọn mã sản phẩm khác nhau"
    },
    PRODUCTID3: {
      required: "Vui lòng chọn mã sản phẩm 3",
      checkNoneProductID3: "Vui lòng chọn mã sản phẩm 3",
      checkNotSameProductID3: "Vui lòng chọn mã sản phẩm khác nhau"
    },
    NAME: {
      required: "Vui lòng nhập tên"
    },
    INVENTORY: {
      required: "Vui lòng nhập số lượng",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonINVENTORYCombo: "Vui lòng nhập giá trị lớn hơn 0",
      intINVENTORYCombo: "Vui lòng nhập số nguyên",
      isValidInventoryCombo: "Vui lòng kiểm tra lại số lượng 3 sản phẩm thường"
    },
    PRICE: {
      required: "Vui lòng nhập giá thành một sản phẩm",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonPRICECombo: "Vui lòng nhập giá trị lớn hơn 0",
      intPRICECombo: "Vui lòng nhập số nguyên"
    },
    SALE: {
      required: "Vui lòng nhập phần trăm giảm giá (nếu không có, nhập 0)",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonSALECombo: "Nhập giá trị từ 0 đến 100"
    },
    VIPSALE: {
      required: "Vui lòng nhập phần trăm giảm giá (nếu không có, nhập 0)",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonVIPSALECombo: "Nhập giá trị từ 0 đến 100"
    },
    SHORTDESCRIPTION: {
      required: "Vui lòng nhập mô tả tóm tắt về sản phẩm",
      maxlength: "Vui lòng không nhập quá 400 kí tự"
    },
    DESCRIPTION: {
      tinyMCECombo: "Vui lòng nhập mô tả chi tiết về sản phẩm"
    }
  },
  errorElement: "small",
  errorClass: "form-text text-danger is-invalid",
  validClass: "is-valid"
});
