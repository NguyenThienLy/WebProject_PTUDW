$(document).ready(function() {
  var isReloadChangeQuantity = false;

  //showModelIsUpdateQuantity();

  sumPriceInCartDetail();

  checkHaveProductInCartDetail();

  // Giảm số lượng sản phẩm trong giỏ hàng product simple
  $(document).on(
    "click",
    "#containProductSimpleInCartDetail #btnDecreaseQuantity",
    function() {
      var $idProductCartDetail = $(this).attr("id-product-cart-detail");
      var $id = $(this).attr("id-product-simple");

      // Lấy số lượng hiện tại
      var currQuantity = +$(
        `#containProductSimpleInCartDetail input[id-product-cart-detail=${$idProductCartDetail}]`
      ).attr("value");

      if (currQuantity > 1) {
        //Giảm số lượng sản phẩm
        --currQuantity;

        $.post(
          "/customer/cart/update-quantity-product-in-cart",
          { productId: $id, quantityProduct: currQuantity, isSimple: true },
          function(data) {
            if (data === "success") {
              decreaseQuantityProductSimple($idProductCartDetail, currQuantity);
              sumPriceInCartDetail();
            }
          }
        );
      }
    }
  );

  // Tăng số lượng sản phẩm trong giỏ hàng product simple
  $(document).on(
    "click",
    "#containProductSimpleInCartDetail #btnIncreaseQuantity",
    function() {
      var $idProductCartDetail = $(this).attr("id-product-cart-detail");
      var $id = $(this).attr("id-product-simple");

      // Lấy số lượng hiện tại
      var currQuantity = +$(
        `#containProductSimpleInCartDetail input[id-product-cart-detail=${$idProductCartDetail}]`
      ).attr("value");

      // Tăng số lướng sản phẩm
      ++currQuantity;

      if (currQuantity < 100) {
        $.post(
          "/customer/cart/update-quantity-product-in-cart",
          { productId: $id, quantityProduct: currQuantity, isSimple: true },
          function(data) {
            if (data === "success") {
              increaseQuantityProductSimple($idProductCartDetail, currQuantity);
              sumPriceInCartDetail();
            } else if (data === "notEnough") {
              $("#not-enough-product-modal").modal();
            }
          }
        );
      }
    }
  );

  // Giảm số lượng sản phẩm trong giỏ hàng product combo
  $(document).on(
    "click",
    "#containProductComboInCartDetail #btnDecreaseQuantity",
    function() {
      var $idProductCartDetail = $(this).attr("id-product-cart-detail");
      var $id = $(this).attr("id-product-combo");

      // Lấy số lượng hiện tại
      var currQuantity = +$(
        `#containProductComboInCartDetail input[id-product-cart-detail=${$idProductCartDetail}]`
      ).attr("value");

      if (currQuantity > 1) {
        //Giảm số lượng sản phẩm
        --currQuantity;

        $.post(
          "/customer/cart/update-quantity-product-in-cart",
          { productId: $id, quantityProduct: currQuantity, isSimple: false },
          function(data) {
            if (data === "success") {
              decreaseQuantityProductCombo($idProductCartDetail, currQuantity);
              sumPriceInCartDetail();
            }
          }
        );
      }
    }
  );

  // Tăng số lượng sản phẩm trong giỏ hàng product combo
  $(document).on(
    "click",
    "#containProductComboInCartDetail #btnIncreaseQuantity",
    function() {
      var $idProductCartDetail = $(this).attr("id-product-cart-detail");
      var $id = $(this).attr("id-product-combo");

      // Lấy số lượng hiện tại
      var currQuantity = +$(
        `#containProductComboInCartDetail input[id-product-cart-detail=${$idProductCartDetail}]`
      ).attr("value");

      // Tăng số lướng sản phẩm
      ++currQuantity;

      if (currQuantity < 100) {
        $.post(
          "/customer/cart/update-quantity-product-in-cart",
          { productId: $id, quantityProduct: currQuantity, isSimple: false },
          function(data) {
            if (data === "success") {
              increaseQuantityProductCombo($idProductCartDetail, currQuantity);
              sumPriceInCartDetail();
            } else if (data === "notEnough") {
              $("#not-enough-product-modal").modal();
            }
          }
        );
      }
    }
  );

  // Xóa product simple trong cart detail
  $(document).on(
    "click",
    "#containProductSimpleInCartDetail #btnRemoveProduct",
    function() {
      var $id = $(this).attr("id-product-simple");
      var $idProductCartDetail = $(this).attr("id-product-cart-detail");

      $.post(
        "/customer/cart/remove-product-in-cart",
        { productId: $id, isSimple: true },
        function(data) {
          if (data === "success") {
            removeProductSimpleToCart($idProductCartDetail);

            sumPriceInCartDetail();

            checkHaveProductInCartDetail();
          }
        }
      );
    }
  );

  // Xóa product combo trong cart detail
  $(document).on(
    "click",
    "#containProductComboInCartDetail #btnRemoveProduct",
    function() {
      var $id = $(this).attr("id-product-combo");
      var $idProductCartDetail = $(this).attr("id-product-cart-detail");

      $.post(
        "/customer/cart/remove-product-in-cart",
        { productId: $id, isSimple: false },
        function(data) {
          if (data === "success") {
            removeProductComboToCart($idProductCartDetail);

            sumPriceInCartDetail();

            checkHaveProductInCartDetail();
          }
        }
      );
    }
  );

  // Kiểm tra đã đăng nhập chưa
  $(document).on("click", "#aOrderNow", function() {
    $.post("/customer/auth/check-is-login", function(data) {
      if (data === "true") {
        $.post("/customer/cart/check-real-quantity-product", function(data) {
          if (data === "isChange") {
            var contentModel = `
              <p></p>Giỏ hàng <strong>cập nhật</strong> theo số lượng còn, xin lỗi quí khách!!!
              <p class="text-center">Đang chuyển hướng <strong id="strongRediectPage"></strong></p>
            `;

            updateModel(contentModel, 4, 4000, location.href);

            setTimeout(function() {
              location.reload();
            }, 4000);
          } else if (data === "success") {
            var contentModel = `
            <p>Đơn hàng <strong>thành công</strong>, cảm ơn quí khách!!!</p>
            <p class="text-center">Đang chuyển hướng <strong id="strongRediectPage"></strong></p>
          `;

            updateModel(contentModel, 3, 3000, "/customer/order/show-order-info/");
          } else {
            var contentModel = `
            <p>Đơn hàng <strong>thất bại</strong>, cảm ơn quí khách!!!</p>
            <p class="text-center">Đang chuyển hướng <strong id="strongRediectPage"></strong></p>
          `;

            updateModel(contentModel, 3, 3000, "/customer/index");
          }
        });
      } else {
        $("#not-login-system-modal").modal();

        $(document).on(
          "click",
          "#not-login-system-modal #btnAceptLoginSystem",
          function() {
            $("#header-user-modal").modal();
          }
        );
      }
    });
  });

  function showModelIsUpdateQuantity() {
    alert(isReloadChangeQuantity);
    if (isReloadChangeQuantity === true) {
      $("#update-quantity-product-inventory-modal").modal();
      isReloadChangeQuantity === false;
    }
  }

  function updateModel(contentModel, inteval, timeout, hrefResult) {
    window.scrollTo({ top: 0, behavior: "smooth" });

    $("#notifycation-cart-detail-modal #divContainContent").empty("");
    $("#notifycation-cart-detail-modal #divContainContent").append(
      contentModel
    );

    $("#notifycation-cart-detail-modal").modal();

    var currInteval = inteval;

    $("#notifycation-cart-detail-modal #strongRediectPage").text(inteval + "s");

    // Tính thời gian giảm dần chuyển hướng
    setInterval(function() {
      $("#notifycation-cart-detail-modal #strongRediectPage").text(
        (--currInteval).toString() + "s"
      );
    }, 1000);

    // Chuyển hướng sau 2s
    setTimeout(function() {
      window.location.href = hrefResult;
    }, timeout);
  }

  function checkHaveProductInCartDetail() {
    if (
      $("#containProductSimpleInCartDetail").children().length +
        $("#containProductComboInCartDetail").children().length >
      0
    ) {
      $("#h1EmptyCartDetail").attr("style", "display: none !important");
    } else {
      $("#aOrderNow").attr("style", "display: none !important");
      $("#divTotalMoney").attr("style", "display: none !important");
      $("#h1EmptyCartDetail").attr("style", "display: block !important");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function sumPriceInCartDetail() {
    var sumPrice = 0;
    // Lặp tìm vị trí product cần xóa
    $(".component-cart-quantity #spanSumPriceInRow").each(function() {
      sumPrice += Number(
        $(this)
          .text()
          .replace(/[^0-9.-]+/g, "")
      );
    });

    $("#h1SumPriceInCartDetail").text(
      String(sumPrice).replace(/(.)(?=(\d{3})+$)/g, "$1,")
    );

    if (sumPrice === 0) {
      $("#aOrderNow").css("display", "none");
    }
  }

  function emptyContainProductSimple() {
    $("#containProductSimpleInCartDetail").empty();
  }

  function emptyContainProductCombo() {
    $("#containProductComboInCartDetail").empty();
  }

  function decreaseQuantityProductSimple(idQuantityCart, currQuantity) {
    $(
      `#containProductSimpleInCartDetail input[id-product-cart-detail=${idQuantityCart}]`
    ).attr("value", currQuantity);

    /* Cập nhật tổng tiền */
    var sumPrice = Number(
      $(
        `#containProductSimpleInCartDetail span[id-product-cart-detail=${idQuantityCart}]`
      )
        .text()
        .replace(/[^0-9.-]+/g, "")
    );

    // Tổng số tiền hiện tại
    sumPrice = sumPrice - sumPrice / (currQuantity + 1);

    $(
      `#containProductSimpleInCartDetail span[id-product-cart-detail=${idQuantityCart}]`
    ).text(String(sumPrice).replace(/(.)(?=(\d{3})+$)/g, "$1,"));
    /* Cập nhật tổng tiền */

    // Giảm số lượng trong tổng sản phẩm trong cart detail
    $("#bQuantityInCartDetail").text(+$("#bQuantityInCartDetail").text() - 1);

    // Giảm số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() - 1);
  }

  function increaseQuantityProductSimple(idQuantityCart, currQuantity) {
    $(
      `#containProductSimpleInCartDetail input[id-product-cart-detail=${idQuantityCart}]`
    ).attr("value", currQuantity);

    /* Cập nhật tổng tiền */
    var sumPrice = Number(
      $(
        `#containProductSimpleInCartDetail span[id-product-cart-detail=${idQuantityCart}]`
      )
        .text()
        .replace(/[^0-9.-]+/g, "")
    );

    // Tổng số tiền hiện tại
    sumPrice = sumPrice + sumPrice / (currQuantity - 1);

    $(
      `#containProductSimpleInCartDetail span[id-product-cart-detail=${idQuantityCart}]`
    ).text(String(sumPrice).replace(/(.)(?=(\d{3})+$)/g, "$1,"));
    /* Cập nhật tổng tiền */

    // Tăng số lượng trong tổng sản phẩm trong cart detail
    $("#bQuantityInCartDetail").text(+$("#bQuantityInCartDetail").text() + 1);

    // Tăng số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() + 1);
  }

  function decreaseQuantityProductCombo(idQuantityCart, currQuantity) {
    $(
      `#containProductComboInCartDetail input[id-product-cart-detail=${idQuantityCart}]`
    ).attr("value", currQuantity);

    /* Cập nhật tổng tiền */
    var sumPrice = Number(
      $(
        `#containProductComboInCartDetail span[id-product-cart-detail=${idQuantityCart}]`
      )
        .text()
        .replace(/[^0-9.-]+/g, "")
    );

    // Tổng số tiền hiện tại
    sumPrice = sumPrice - sumPrice / (currQuantity + 1);

    $(
      `#containProductComboInCartDetail span[id-product-cart-detail=${idQuantityCart}]`
    ).text(String(sumPrice).replace(/(.)(?=(\d{3})+$)/g, "$1,"));
    /* Cập nhật tổng tiền */

    // Giảm số lượng trong tổng sản phẩm trong cart detail
    $("#bQuantityInCartDetail").text(+$("#bQuantityInCartDetail").text() - 1);

    // Giảm số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() - 1);
  }

  function increaseQuantityProductCombo(idQuantityCart, currQuantity) {
    $(
      `#containProductComboInCartDetail input[id-product-cart-detail=${idQuantityCart}]`
    ).attr("value", currQuantity);

    /* Cập nhật tổng tiền */
    var sumPrice = Number(
      $(
        `#containProductComboInCartDetail span[id-product-cart-detail=${idQuantityCart}]`
      )
        .text()
        .replace(/[^0-9.-]+/g, "")
    );

    // Tổng số tiền hiện tại
    sumPrice = sumPrice + sumPrice / (currQuantity - 1);

    $(
      `#containProductComboInCartDetail span[id-product-cart-detail=${idQuantityCart}]`
    ).text(String(sumPrice).replace(/(.)(?=(\d{3})+$)/g, "$1,"));
    /* Cập nhật tổng tiền */

    // Tăng số lượng trong tổng sản phẩm trong cart detail
    $("#bQuantityInCartDetail").text(+$("#bQuantityInCartDetail").text() + 1);

    // Tăng số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() + 1);
  }

  function removeProductSimpleToCart(idQuantityCart) {
    // Lấy số lượng có của sản phẩm này.
    var currQuantity = +$(
      `#containProductSimpleInCartDetail input[id-product-cart-detail=${idQuantityCart}]`
    ).attr("value");

    // Giảm số lượng trong tổng sản phẩm trong cart detail
    $("#bQuantityInCartDetail").text(
      +$("#bQuantityInCartDetail").text() - currQuantity
    );

    // Giảm số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() - currQuantity);

    // Lặp tìm vị trí product cần xóa
    $("#containProductSimpleInCartDetail .row").each(function() {
      var $id = $(this).attr("id-product-cart-detail");

      // Có tồn tại hàng sản phẩm này trong giỏ hàng
      if ($id === idQuantityCart) {
        $(this).remove();

        return false;
      }
    });
  }

  function removeProductComboToCart(idQuantityCart) {
    // Lấy số lượng có của sản phẩm này.
    var currQuantity = +$(
      `#containProductComboInCartDetail input[id-product-cart-detail=${idQuantityCart}]`
    ).attr("value");

    // Giảm số lượng trong tổng sản phẩm trong cart detail
    $("#bQuantityInCartDetail").text(
      +$("#bQuantityInCartDetail").text() - currQuantity
    );

    // Giảm số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() - currQuantity);

    // Lặp tìm vị trí product cần xóa
    $("#containProductComboInCartDetail .row").each(function() {
      var $id = $(this).attr("id-product-cart-detail");

      // Có tồn tại hàng sản phẩm này trong giỏ hàng
      if ($id === idQuantityCart) {
        $(this).remove();

        return false;
      }
    });
  }
});
