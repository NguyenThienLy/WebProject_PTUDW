
//Chưa kiểm tra ô nhập text

jQuery.validator.addMethod("comparisonIMAGE", function (value, element) {
  var numberFile = $("#product-image")[0].files.length;
  if (numberFile != 5) {
    return false;
  } else { return true; }
})

jQuery.validator.addMethod("comparisonSALE", function (value, element) {
  var pcompra = $("#inputPromotionProduct").val();
  if (pcompra >= 0 && pcompra <= 100) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonKILOGAM", function (value, element) {
  var pcompra = $("#inputKLGProduct").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonINVENTORY", function (value, element) {
  var pcompra = $("#inputINVENTORY").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonRPICE", function (value, element) {
  var pcompra = $("#inputPriceProduct").val();
  if (pcompra > 0) {
    return true;
  }
  return false;
});

jQuery.validator.addMethod("comparisonIMAGE", function (value, element) {
  var pcompra = $("#product-image")[0].files.length;
  if (pcompra == 5) {
    return true;
  }
  return false;
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
      comparisonKILOGAM: true
    },
    INVENTORY: {
      required: true,
      number: true,
      comparisonINVENTORY: true
    },
    PRICE: {
      required: true,
      number: true,
      comparisonRPICE: true,
    },
    SALE: {
      required: true,
      number: true,
      comparisonSALE: true
    },
    TAG: {
      required: true
    },
    PRODUCT_IMAGE:{
      comparisonIMAGE:true
    }
  },
  messages: {
    NAME: {
      required: "Vui lòng nhập tên"
    },
    ORIGIN: {
      required: "Vui lòng chọn xuất sứ"
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
      required: "Vui lòng nhập vào cân nặng của 1 sản phẩm",
      number: "Vui lòng nhập vào giá trị hợp lệ",
      comparisonKILOGAM: "Vui lòng nhập giá trị lớn hơn 0"
    },
    INVENTORY: {
      required: "Vui lòng nhập vào số lượng",
      number: "Vui lòng nhập vào giá trị hợp lệ",
      comparisonINVENTORY: "Vui lòng nhập giá trị lớn hơn 0"
    },
    PRICE: {
      required: "Vui lòng nhập vào giá của sản phẩm",
      number: "Vui lòng nhập vào giá trị hợp lệ",
      comparisonRPICE: "Vui lòng nhập giá trị lớn hơn 0"
    },
    SALE: {
      required: "Vui lòng nhập vào phần trăm nếu không có hãy nhập 0",
      number: "Vui lòng nhập vào giá trị hợp lệ",
      comparisonSALE: "Nhập giá trị từ 0 đến 100"
    },
    TAG: {
      required: "Vui lòng chọn tag"
    },
    PRODUCT_IMAGE:{
      comparisonIMAGE:"Vui lòng chọn đủ 5 hình"
    }
  },
  errorElement: "small",
  errorClass: "form-text text-danger is-invalid",
  validClass: "is-valid"
});