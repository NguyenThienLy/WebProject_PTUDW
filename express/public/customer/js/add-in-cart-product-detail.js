$(document).ready(function() {
  checkHaveProductInCart();

  sumPriceInFastCart();

  $(document).on(
    "click",
    "#divInfoAllProductDetail #btnDecreaseQuantity",
    function() {
      // Lấy số lượng hiện tại
      var currQuantity = +$(
        `#divInfoAllProductDetail #inputQuantityProduct`
      ).attr("value");

      //alert(currQuantity);

      if (currQuantity > 1) {
        --currQuantity;

        $(`#divInfoAllProductDetail #inputQuantityProduct`).attr(
          "value",
          currQuantity
        );
      }
    }
  );

  $(document).on(
    "click",
    "#divInfoAllProductDetail #btnIncreaseQuantity",
    function() {
      var $id = $(this).attr("id-product");
      var isSimple = $(this).attr("is-simple") === "true";
      //alert("run");
      // Lấy số lượng hiện tại
      var currQuantity = +$(
        `#divInfoAllProductDetail #inputQuantityProduct`
      ).attr("value");

      ++currQuantity;

      if (currQuantity < 100) {
        $.post(
          "/customer/cart/check-product-in-cart",
          { productId: $id, quantityProduct: currQuantity, isSimple: isSimple },
          function(data) {
            if (data === "enough") {
              $(`#divInfoAllProductDetail #inputQuantityProduct`).attr(
                "value",
                currQuantity
              );
            } else if (data === "notEnough") {
              $("#not-enough-product").modal();
            }
          }
        );
      }
    }
  );

  $(document).on(
    "click",
    "#divInfoAllProductDetail #btnAddToCartProductDetail",
    function() {
      var $idProductDetail = $(this).attr("id-product-detail");
      var $id = $(this).attr("id-product");
      var isSimple = $(this).attr("is-simple") === "true";

      // Lấy số lượng hiện tại
      var currQuantity = +$(
        `#divInfoAllProductDetail #inputQuantityProduct`
      ).attr("value");

      $.post(
        "/customer/cart/add-product-in-cart",
        { productId: $id, quantityProduct: currQuantity, isSimple: isSimple },
        function(data) {
          if (data === "success") {
            if (isSimple === true)
              addProductSimpleToCart($idProductDetail, $id, currQuantity);
            else addProductComboToCart($idProductDetail, $id, currQuantity);
            checkHaveProductInCart();
            sumPriceInFastCart();
          } else if (data === "notEnough") {
            $("#not-enough-product").modal();
          }
        }
      );
    }
  );

  function sumPriceInFastCart() {
    var sumPrice = 0;
    // Lặp tìm vị trí product cần xóa
    $(".component-show-fast-cart-items #containPriceAndQuantity").each(
      function() {
        var $id = $(this).attr("id-quantity-cart");

        var priceProduct = Number(
          $(
            `.component-show-fast-cart-items #spanPriceInRow[id-quantity-cart-price=${$id}]`
          )
            .text()
            .replace(/[^0-9.-]+/g, "")
        );

        var quantity = Number(
          $(
            `.component-show-fast-cart-items #spanQuantityProduct[id-quantity-cart=${$id}]`
          ).text()
        );

        sumPrice += priceProduct * quantity;
      }
    );

    $("#spanSumPriceInFastCart").text(
      String(sumPrice).replace(/(.)(?=(\d{3})+$)/g, "$1,")
    );
  }

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

  function addProductSimpleToCart(idProductToCart, id, currQuantity) {
    // Lấy tên của sản phẩm
    var title = $(
      `#divInfoAllProductDetail #h1ProductNameProductDetail`
    ).text();

    var formatTitle = title;
    if (title.length > 25) formatTitle = title.substr(0, 25) + "...";

    // Lấy đường dẫn của ảnh
    var src = $(`#divContainImageSmall img:first`).attr("src");

    // Lấy giá tiền
    var salePrice = $(
      `#divInfoAllProductDetail #h1ProductPriceProductDetail`
    ).text();

    // Tăng số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() + currQuantity);

    var isNewProductInCart = true;
    $("#containProductSimpleInCart .component-show-fast-cart-items").each(
      function() {
        var $id = $(this).attr("id-quantity-cart");

        // Có tồn tại hàng sản phẩm này trong giỏ hàng
        if ($id === idProductToCart) {
          isNewProductInCart = false;
        }
      }
    );

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
                <img src="${src}" class="mt-3 w-100 h-100" alt="" />
            </div>
 
            <div class="product-info text-left">
                <a href="/customer/product/product-detail/product-simple/${idProductToCart}"
                    class="title text-decoration-none" data-toggle="tooltip"
                    title="${title}">${formatTitle}</a>
 
                <div class="price mt-2" id="containPriceAndQuantity" id-quantity-cart="${idProductToCart}">
                    <span id="spanPriceInRow"
                    id-quantity-cart-price="${idProductToCart}">${salePrice}</span>
                    <span><u>đ</u></span>
                    &nbsp;
                    <span>x</span>
                    <span id-quantity-cart="${idProductToCart}" id="spanQuantityProduct" id="${id}"
                    >${currQuantity}</span>
                </div>
            </div>
 
            <div class="product-delete text-right">
                <button id="btnDeleteQuantitySimple" id-quantity-simple=${id} id-quantity-cart="${idProductToCart}" class="p-0 border-0" data-toggle="tooltip" title="Xóa">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <hr class="m-0 ml-2 mr-2" />
        </div>`);
    }
  }

  function addProductComboToCart(idProductToCart, id, currQuantity) {
    // Lấy tên của sản phẩm
    var title = $(
      `#divInfoAllProductDetail #h1ProductNameProductDetail`
    ).text();

    var formatTitle = title;
    if (title.length > 25) formatTitle = title.substr(0, 25) + "...";
    // Lấy đường dẫn của ảnh
    var src1 = $(
      `#divContainImageSmall #imgProductSmall1`
    ).attr("src");
    var src2 = $(
      `#divContainImageSmall #imgProductSmall2`
    ).attr("src");
    var src3 = $(
      `#divContainImageSmall #imgProductSmall3`
    ).attr("src");

     // Lấy giá tiền
     var salePrice = $(
      `#divInfoAllProductDetail #h1ProductPriceProductDetail`
    ).text();

    // Tăng số lượng trong giỏ hàng
    $("#pQuantityProduct").text(+$("#pQuantityProduct").text() + currQuantity);

    var isNewProductInCart = true;
    $("#containProductComboInCart .component-show-fast-cart-items").each(
      function() {
        var $id = $(this).attr("id-quantity-cart");
        //console.log("TCL: addProductToCart -> id", id)

        // Có tồn tại hàng sản phẩm này trong giỏ hàng
        if ($id === idProductToCart) {
          isNewProductInCart = false;
        }
      }
    );

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
          <div class="position-relative product-image-combo pt-3 pb-3" data-toggle="tooltip"
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

              <div class="price mt-2" id="containPriceAndQuantity" id-quantity-cart="${idProductToCart}">
                  <span id="spanPriceInRow"
                  id-quantity-cart-price="${idProductToCart}">${salePrice}</span>
                  <span><u>đ</u></span>
                  &nbsp;
                  <span>x</span>
                  <span id="spanQuantityProduct"
                  id-quantity-cart="${idProductToCart}">${currQuantity}</span>
              </div>
          </div>

          <div class="product-delete text-right">
              <button id="btnDeleteQuantityCombo" id-quantity-combo=${id} id-quantity-cart="${idProductToCart}" class="p-0 border-0" data-toggle="tooltip" title="Xóa">
                  <i class="fas fa-times"></i>
              </button>
          </div>
        </div>
        <hr class="m-0 ml-2 mr-2" />
      </div>`);
    }
  }
});
