$(document).ready(function() {
  // Kiểm tra xem có sản phẩm nào trong giỏ hàng không
  checkHaveProductInCart();

  // Add product simple in cart
  $("#containProductSimple div div a").on("click", function() {
    var $idProductToCart = $(this).attr("id-product-to-cart");
    var $id = $(this).attr("id");

    $.post(
      "/customer/cart/add-product-in-cart",
      { productId: $id, isSimple: true },
      function(data) {
        if (data === "success") {
          addProductSimpleToCart($idProductToCart, $id);
          checkHaveProductInCart();
        }
      }
    );
  });

  // Add product combo in cart
  $("#containProductCombo div div a").on("click", function() {
    var $idProductToCart = $(this).attr("id-product-to-cart");
    var $id = $(this).attr("id");

    $.post(
      "/customer/cart/add-product-in-cart",
      { productId: $id, isSimple: false },
      function(data) {
        if (data === "success") {
          addProductComboToCart($idProductToCart, $id);
          checkHaveProductInCart();
        }
      }
    );
  });

  // Remove product simple in cart
  $("#containProductSimpleInCart").delegate("button","click", function() {
    var $idQuantityCart = $(this).attr("id-quantity-cart");
    var $id = $(this).attr("id");

    $.post(
      "/customer/cart/remove-product-in-cart",
      { productId: $id, isSimple: true },
      function(data) {
        if (data === "success") {
          removeProductSimpleToCart($idQuantityCart, $id);
          checkHaveProductInCart();
        }
      }
    );
  });

  // Remove product combo in cart
  $("#containProductComboInCart").delegate("button","click", function() {
    var $idQuantityCart = $(this).attr("id-quantity-cart");
    var $id = $(this).attr("id");

    $.post(
      "/customer/cart/remove-product-in-cart",
      { productId: $id, isSimple: false },
      function(data) {
        if (data === "success") {
          removeProductComboToCart($idQuantityCart, $id);
          checkHaveProductInCart();
        }
      }
    );
  });

  function checkHaveProductInCart() {
    if (
      $("#containProductSimpleInCart").children().length +
        $("#containProductComboInCart").children().length >
      0
    ) {
      $("#parentContainQuantityProduct").css("display", "");
    } else {
      $("#parentContainQuantityProduct").css("display", "none");
    }
  }

  function addProductSimpleToCart(idProductToCart, id) {
    // Lấy tên của sản phẩm
    var title = $(
      `#containProductSimple div div[id-product-to-cart=${idProductToCart}]`
    ).attr("title");

    var formatTitle = title;
    if (title.length > 25) formatTitle = title.substr(0, 25) + "...";

    // Lấy đường dẫn của ảnh
    var src = $(
      `#containProductSimple div img[id-product-to-cart=${idProductToCart}]`
    ).attr("src");
    // Lấy giá tiền
    var salePrice = $(
      `#containProductSimple div span[id-product-to-cart=${idProductToCart}]`
    ).text();

    // Tăng số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() + 1);

    var isNewProductInCart = true;
    $("#containProductSimpleInCart .component-show-fast-cart-items").each(function() {
      var $id = $(this).attr("id-quantity-cart");

      // Có tồn tại hàng sản phẩm này trong giỏ hàng
      if ($id === idProductToCart) {
        isNewProductInCart = false;
      }
    });

    // Có tồn tại hàng sản phẩm này trong giỏ hàng
    if (isNewProductInCart === false) {
      $(
        `#containProductSimpleInCart span[id-quantity-cart=${idProductToCart}]`
      ).text(
        +$(
          `#containProductSimpleInCart span[id-quantity-cart=${idProductToCart}]`
        ).text() + 1
      );
    }
    // Không tồn tại sản phẩm này trong giỏ hàng
    else {
      $("#containProductSimpleInCart").append(`
        <div class="component-show-fast-cart-items" id-quantity-cart="${idProductToCart}">
        <div class="d-flex align-items-center pl-3 pr-3 pb-3">
            <div class="position-relative product-image" data-toggle="tooltip"
                title="${title}">
                <a class="stretched-link"
                    href="/customer/product/product-detail/product-simple/${idProductToCart}"></a>
                <img src="${src}" class="w-100" alt="" />
            </div>
 
            <div class="product-info text-left">
                <a href="/customer/product/product-detail/product-simple/${idProductToCart}"
                    class="title text-decoration-none" data-toggle="tooltip"
                    title="${title}">${formatTitle}</a>
 
                <div class="price mt-2">
                    <span>${salePrice}</span>
                    <span><u>đ</u></span>
                    &nbsp;
                    <span>x</span>
                    <span id-quantity-cart="${idProductToCart}">1</span>
                </div>
            </div>
 
            <div class="product-delete text-right">
                <button id="${id}" id-quantity-cart="${idProductToCart}" class="p-0 border-0" data-toggle="tooltip" title="Xóa">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <hr class="m-0 ml-2 mr-2" />
        </div>`);
    }
  }

  function addProductComboToCart(idProductToCart, id) {
    // Lấy tên của sản phẩm
    var title = $(
      `#containProductCombo div div[id-product-to-cart=${idProductToCart}]`
    ).attr("title");

    var formatTitle = title;
    if (title.length > 25) formatTitle = title.substr(0, 25) + "...";
    // Lấy đường dẫn của ảnh
    var src1 = $(
      `#containProductCombo div img[id-product-to-cart-src-1=${idProductToCart}]`
    ).attr("src");
    var src2 = $(
      `#containProductCombo div img[id-product-to-cart-src-2=${idProductToCart}]`
    ).attr("src");
    var src3 = $(
      `#containProductCombo div img[id-product-to-cart-src-3=${idProductToCart}]`
    ).attr("src");
    // Lấy giá tiền
    var salePrice = $(
      `#containProductCombo div span[id-product-to-cart=${idProductToCart}]`
    ).text();

    // Tăng số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() + 1);

    var isNewProductInCart = true;
    $("#containProductComboInCart .component-show-fast-cart-items").each(function() {
      var $id = $(this).attr("id-quantity-cart");
      //console.log("TCL: addProductToCart -> id", id)

      // Có tồn tại hàng sản phẩm này trong giỏ hàng
      if ($id === idProductToCart) {
        isNewProductInCart = false;
      }
    });

    // Có tồn tại hàng sản phẩm này trong giỏ hàng
    if (isNewProductInCart === false) {
      $(
        `#containProductComboInCart span[id-quantity-cart=${idProductToCart}]`
      ).text(
        +$(
          `#containProductComboInCart span[id-quantity-cart=${idProductToCart}]`
        ).text() + 1
      );
    }
    // Không tồn tại sản phẩm này trong giỏ hàng
    else {
      $("#containProductComboInCart").append(`
      <div class="component-show-fast-cart-items" id-quantity-cart="${idProductToCart}">
      <div class="d-flex align-items-center pl-3 pr-3 pb-3">
          <div class="position-relative product-image pt-3 pb-3" data-toggle="tooltip"
              title="${title}">
              <a class="stretched-link"
                  href="/customer/product/product-detail/product-combo/{{ID}}"></a>
              <img src="${src1}" class="image-combo"
                  alt="" />
              <img src="${src2}" class="image-combo"
                  alt="" />
              <img src="${src3}" class="image-combo"
                  alt="" />
          </div>

          <div class="product-info text-left">
              <a href="/customer/product/product-detail/product-combo/{{ID}}"
                  class="title text-decoration-none" data-toggle="tooltip"
                  title="${title}">${formatTitle}</a>

              <div class="price mt-2">
                  <span>${salePrice}</span>
                  <span><u>đ</u></span>
                  &nbsp;
                  <span>x</span>
                  <span id-quantity-cart="${idProductToCart}">1</span>
              </div>
          </div>

          <div class="product-delete text-right">
              <button id="${id}" id-quantity-cart="${idProductToCart}" class="p-0 border-0" data-toggle="tooltip" title="Xóa">
                  <i class="fas fa-times"></i>
              </button>
          </div>
        </div>
        <hr class="m-0 ml-2 mr-2" />
      </div>`);
    }
  }

  function removeProductSimpleToCart(idQuantityCart, id) {
    // Lấy số lượng có của sản phẩm này.
    var quantityProduct = +$(
      `#containProductSimpleInCart span[id-quantity-cart=${idQuantityCart}]`
    ).text();

    // Giảm số lượng sản phẩm đã xóa trong giỏ hàng
    $("#pQuantityProduct").text(
      +$("#pQuantityProduct").text() - quantityProduct
    );

    $("#containProductSimpleInCart .component-show-fast-cart-items").each(function() {
      var $id = $(this).attr("id-quantity-cart");

      // Có tồn tại hàng sản phẩm này trong giỏ hàng
      if ($id === idQuantityCart) {
        $(this).remove();

        return false;
      }
    });
  }

  function removeProductComboToCart(idQuantityCart, id) {
    // Lấy số lượng có của sản phẩm này.
    var quantityProduct = +$(
      `#containProductComboInCart span[id-quantity-cart=${idQuantityCart}]`
    ).text();

    // Giảm số lượng sản phẩm đã xóa trong giỏ hàng
    $("#pQuantityProduct").text(
      +$("#pQuantityProduct").text() - quantityProduct
    );

    $("#containProductComboInCart .component-show-fast-cart-items").each(function() {
      var $id = $(this).attr("id-quantity-cart");

      // Có tồn tại hàng sản phẩm này trong giỏ hàng
      if ($id === idQuantityCart) {
        $(this).remove();

        return false;
      }
    });
  }
});
