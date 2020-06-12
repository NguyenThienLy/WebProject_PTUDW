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
    .indexOf("product-comment-simple");

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

//Tìm kiếm
$("#btn_search_simple").click(function() {
  var inputName = $("#nameSimple").val();

  var query = CreateQuerySimple(inputName);
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/comment/product-comment-simple?${query}`;
  } else {
    window.location = base_url + `/admin/comment/product-comment-simple`;
  }
});

function CreateQuerySimple(name) {
  var data = {
    name: name
  };

  return encodeQueryData(data);
}

//Tìm kiếm
$("#btn_search_combo").click(function() {
  var inputName = $("#nameCombo").val();

  var query = CreateQueryCombo(inputName);
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/comment/product-comment-combo?${query}`;
  } else {
    window.location = base_url + `/admin/comment/product-comment-combo`;
  }
});

function CreateQueryCombo(name) {
  var data = {
    name: name
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
