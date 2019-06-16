$(document).ready(function() {
  sumPriceInCartDetail();

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
            }
            else if (data === "notEnough") {
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
            }
            else if (data === "notEnough") {
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
          }
        }
      );
    }
  );

  // Kiểm tra đã đăng nhập chưa
  $(document).on(
    "click",
    "#aOrderNow",
    function() {
      $.post(
        "/customer/auth/check-is-login",
        function(data) {
          if (data === "true") {
            alert("login");
          }
          else {
            $("#not-login-system-modal").modal();  

            $(document).on("click", "#not-login-system-modal #btnAceptLoginSystem", function() {
              $("#header-user-modal").modal();
            });
          }
        }
      );
    }
  );

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
    $("#containProductSimpleInCartDetail .component-cart-quantity").each(
      function() {
        var $id = $(this).attr("id-product-cart-detail");

        // Có tồn tại hàng sản phẩm này trong giỏ hàng
        if ($id === idQuantityCart) {
          $(this).remove();

          return false;
        }
      }
    );
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
    $("#containProductComboInCartDetail .component-cart-quantity").each(
      function() {
        var $id = $(this).attr("id-product-cart-detail");

        // Có tồn tại hàng sản phẩm này trong giỏ hàng
        if ($id === idQuantityCart) {
          $(this).remove();

          return false;
        }
      }
    );
  }
});
