//Chưa kiểm tra ô nhập text
jQuery.validator.addMethod("comparisonIMAGE", function(value, element) {
  var numberFile = $("#product-image").get(0).files.length;
  if (numberFile != 5) {
    return false;
  } else {
    return true;
  }
});

jQuery.validator.addMethod("comparisonSALE", function(value, element) {
  var pcompra = $("#inputPromotionProduct").val();
  if (pcompra >= 0 && pcompra <= 100) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonVIPSALE", function(value, element) {
  var pcompra = $("#inputPromotionVIPProduct").val();
  if (pcompra >= 0 && pcompra <= 100) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonKILOGRAM", function(value, element) {
  var pcompra = $("#inputKLGProduct").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonINVENTORY", function(value, element) {
  var pcompra = $("#inputINVENTORY").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("intINVENTORY", function(value, element) {
  var val = $("#inputINVENTORY").val();
  return val % 1 === 0;
});

jQuery.validator.addMethod("comparisonPRICE", function(value, element) {
  var pcompra = $("#inputPriceProduct").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("intPRICE", function(value, element) {
  var val = $("#inputPriceProduct").val();
  return val % 1 === 0;
});

jQuery.validator.addMethod("tinyMCE", function(value, element) {
  var data = tinyMCE.get("my_editor").getContent();
  if (data) {
    return true;
  } else {
    return false;
  }
});

$("#add-product-form").validate({
  ignore: [],
  rules: {
    NAME: {
      required: true
    },
    ORIGIN: {
      required: true
    },
    BRANDID: {
      required: true
    },
    CATEGORYID: {
      required: true
    },
    SUBCATEGORYID: {
      required: true
    },
    KILOGRAM: {
      required: true,
      number: true,
      comparisonKILOGRAM: true
    },
    INVENTORY: {
      required: true,
      number: true,
      comparisonINVENTORY: true,
      intINVENTORY: true
    },
    PRICE: {
      required: true,
      number: true,
      comparisonPRICE: true,
      intPRICE: true
    },
    SALE: {
      required: true,
      number: true,
      comparisonSALE: true
    },
    VIPSALE: {
      required: true,
      number: true,
      comparisonVIPSALE: true
    },
    PRODUCT_IMAGE: {
      comparisonIMAGE: true
    },
    TAG: {
      required: true
    },
    SHORTDESCRIPTION: {
      required: true,
      maxlength: 400
    },
    DESCRIPTION: {
      tinyMCE: true
    }
  },
  messages: {
    NAME: {
      required: "Vui lòng nhập tên"
    },
    ORIGIN: {
      required: "Vui lòng chọn xuất xứ"
    },
    BRANDID: {
      required: "Vui lòng chọn thương hiệu"
    },
    CATEGORYID: {
      required: "Vui lòng chọn loại"
    },
    SUBCATEGORYID: {
      required: "Vui lòng chọn loại"
    },
    KILOGRAM: {
      required: "Vui lòng nhập khối lượng của một sản phẩm",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonKILOGRAM: "Vui lòng nhập giá trị lớn hơn 0"
    },
    INVENTORY: {
      required: "Vui lòng nhập số lượng",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonINVENTORY: "Vui lòng nhập giá trị lớn hơn 0",
      intINVENTORY: "Vui lòng nhập số nguyên"
    },
    PRICE: {
      required: "Vui lòng nhập giá thành một sản phẩm",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonPRICE: "Vui lòng nhập giá trị lớn hơn 0",
      intPRICE: "Vui lòng nhập số nguyên"
    },
    SALE: {
      required: "Vui lòng nhập phần trăm giảm giá (nếu không có, nhập 0)",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonSALE: "Nhập giá trị từ 0 đến 100"
    },
    VIPSALE: {
      required: "Vui lòng nhập phần trăm giảm giá (nếu không có, nhập 0)",
      number: "Vui lòng nhập giá trị hợp lệ",
      comparisonVIPSALE: "Nhập giá trị từ 0 đến 100"
    },
    PRODUCT_IMAGE: {
      comparisonIMAGE: "Vui lòng chọn đủ 5 hình"
    },
    TAG: {
      required: "Vui lòng chọn tag"
    },
    SHORTDESCRIPTION: {
      required: "Vui lòng nhập mô tả tóm tắt về sản phẩm",
      maxlength: "Vui lòng không nhập quá 400 kí tự"
    },
    DESCRIPTION: {
      tinyMCE: "Vui lòng nhập mô tả chi tiết về sản phẩm"
    }
  },
  errorElement: "small",
  errorClass: "form-text text-danger is-invalid",
  validClass: "is-valid"
});
