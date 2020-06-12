$(document).ready(function() {
  var url = window.location.href;
  var isStatus1 = url
    .substring(url.lastIndexOf("/") + 1)
    .indexOf("order-info-show-status-1");

  var isStatus2 = url
    .substring(url.lastIndexOf("/") + 1)
    .indexOf("order-info-show-status-2");

  var isStatus3 = url
    .substring(url.lastIndexOf("/") + 1)
    .indexOf("order-info-show-status-3");

  var isStatus4 = url
    .substring(url.lastIndexOf("/") + 1)
    .indexOf("order-info-show-status-4");

    if (isStatus1 === 0) {
        $("#nav-order-info-type-1-tab").tab("show");
        $("#collapse-order-type-1").collapse("show");
        $("#collapse-order-type-2").collapse("hide");
        $("#collapse-order-type-3").collapse("hide");
        $("#collapse-order-type-4").collapse("hide");
    }
    if (isStatus2 === 0) {
        $("#nav-order-info-type-2-tab").tab("show");
        $("#collapse-order-type-2").collapse("show");
        $("#collapse-order-type-1").collapse("hide");
        $("#collapse-order-type-3").collapse("hide");
        $("#collapse-order-type-4").collapse("hide");
    }
    if (isStatus3 === 0) {
        $("#nav-order-info-type-3-tab").tab("show");
        $("#collapse-order-type-3").collapse("show");
        $("#collapse-order-type-2").collapse("hide");
        $("#collapse-order-type-1").collapse("hide");
        $("#collapse-order-type-4").collapse("hide");
    }
    if (isStatus4 === 0) {
        $("#nav-order-info-type-4-tab").tab("show");
        $("#collapse-order-type-4").collapse("show");
        $("#collapse-order-type-2").collapse("hide");
        $("#collapse-order-type-3").collapse("hide");
        $("#collapse-order-type-1").collapse("hide");
    }
    

  // Tăng số lượng sản phẩm trong giỏ hàng product simple
  $(document).on("click", "#btnShowDetail", function() {
    var $id = $(this).attr("id-show-detail");

    $.post("/customer/order/order-detail-show", { orderInfoId: $id }, function(
      data
    ) {
      emptyContain();
      showOrderDetailProductSimple(JSON.parse(data.productsSimple));
      showOrderDetailProductCombo(JSON.parse(data.productsCombo));
      $("#orderDetailModal").modal();
    });
  });

  function emptyContain() {
    $("#containProductSimpleInOrderDetailShow").empty();
    $("#containProductComboInOrderDetailShow").empty();
  }

  function showOrderDetailProductSimple(data) {
    for (var i = 0; i < data.length; i++) {
      appendProductSimple(data[i]);
    }
  }

  function showOrderDetailProductCombo(data) {
    for (var i = 0; i < data.length; i++) {
      appendProductCombo(data[i]);
    }
  }

  function appendProductSimple(productSimple) {
    //alert(productSimple);
    $("#orderDetailModal #containProductSimpleInOrderDetailShow").append(
      `
      <div class="row mt-2 mr-2 ml-2">
          <div class="component-cart-quantity card d-flex flex-row align-items-center p-4 w-100 h-100">

              <div class="position-relative h-100 content-left" data-toggle="tooltip" title="${
                productSimple.NAME
              }">
                  <a class="stretched-link"
                      href="/customer/product/product-detail/product-simple/${
                        productSimple.ID
                      }"></a>
                  <img src="${productSimple.IMAGE}" class="h-100 w-100" alt="">
              </div>

              <div class="d-flex content-right">
                  <div class="product-info d-flex align-items-center">
                      <a href="/customer/product/product-detail/product-simple/${
                        productSimple.ID
                      }"
                          class="title product-name"><strong>${
                            productSimple.FORMATNAME
                          }</strong></a>
                  </div>

                  <div class="d-flex align-items-center justify-content-center product-quantity">

                      <input type="number" id="inputQuantityProduct" class="mr-1 text-center p-1"
                          id-product-cart-detail="productSimple${
                            productSimple.ID
                          }" value="${productSimple.QUANTITY}" />

                  </div>

                  <div class="d-flex flex-column align-items-end product-general">
                      <div class="total-price-text">
                          Tổng tiền
                      </div>

                      <div class="mt-2 font-weight-bold total-price">
                          <span id="spanSumPriceInRow"
                              id-product-cart-detail="productSimple${
                                productSimple.ID
                              }">${productSimple.TOTALMONEY}</span>
                          <span><u>đ</u></span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
        `
    );
  }

  function appendProductCombo(productCombo) {
    $("#orderDetailModal #containProductSimpleInOrderDetailShow").append(
      `
      <div class="row mt-2 mr-2 ml-2">
          <div class="component-cart-quantity card d-flex flex-row align-items-center p-4 w-100 h-100">

              <div class="position-relative h-100 content-left d-flex align-items-center"
                  data-toggle="tooltip" title="${productCombo.NAME}">
                  <a class="stretched-link"
                      href="/customer/product/product-detail/product-simple/${
                        productCombo.ID
                      }"></a>
                  <img src="${
                    productCombo.IMAGE1
                  }" style="width: 33.33%;" alt="" />
                  <img src="${
                    productCombo.IMAGE2
                  }" style="width: 33.33%;" alt="" />
                  <img src="${
                    productCombo.IMAGE3
                  }" style="width: 33.33%;" alt="" />
              </div>

              <div class="d-flex content-right">
                  <div class="product-info  d-flex align-items-center" >
                      <a href="/customer/product/product-detail/product-simple/${
                        productCombo.NAME
                      }"
                          class="title product-name"><strong>${
                            productCombo.FORMATNAME
                          }</strong></a>
                  </div>

                  <div class="d-flex align-items-center justify-content-center product-quantity">

                      <input type="number" id="inputQuantityProduct" class="mr-1 text-center p-1"
                          id-product-cart-detail="productCombo${
                            productCombo.NAME
                          }" value="${productCombo.QUANTITY}"
                          disabled="false" />
                  </div>

                  <div class="d-flex flex-column align-items-end product-general">
                      <div class="total-price-text">
                          Tổng tiền
                      </div>

                      <div class="mt-2 font-weight-bold total-price">
                          <span id="spanSumPriceInRow"
                              id-product-cart-detail="productCombo${
                                productCombo.NAME
                              }">${productCombo.TOTALMONEY}</span>
                          <span><u>đ</u></span>
                      </div>

                  </div>
              </div>
          </div>
      </div>
        `
    );
  }
});

// $(function() {
//     var url = window.location.href;
//     var isStatus1 = url
//       .substring(url.lastIndexOf("/") + 1)
//       .indexOf("order-info-show-status-1");

//       var isStatus2 = url
//       .substring(url.lastIndexOf("/") + 1)
//       .indexOf("order-info-show-status-2");

//       var isStatus3 = url
//       .substring(url.lastIndexOf("/") + 1)
//       .indexOf("order-info-show-status-3");

//       var isStatus4 = url
//       .substring(url.lastIndexOf("/") + 1)
//       .indexOf("order-info-show-status-4");

//     return isSimple;
// }
