$(document).ready(function() {
  var offsetForProductSimple = 0;
  var offsetForProductCombo = 0;

  // Load more for product simple best sale
  $("#btnLoadMoreProductSimpleSale").on("click", function() {
    $("#btnLoadMoreProductSimpleSale").text("Đang tải ...");

    offsetForProductSimple++;

    if (offsetForProductSimple < 3) {
      $.post(
        "/customer/index/load-more-product-simple",
        { offset: offsetForProductSimple },
        function(data) {
          // Nếu ko đủ số lượng hình lấy thì ấn button load more
          if (data.length === 8) {
            loadMoreProductSimpleSale(JSON.parse(data));

            $("#btnLoadMoreProductSimpleSale").text("Xem thêm");
          } else {
            loadMoreProductSimpleSale(JSON.parse(data));

            $("#btnLoadMoreProductSimpleSale").text("Xem thêm");

            $("#btnLoadMoreProductSimpleSale").css("display", "none");
          }
        }
      );
    } else {
      $("#btnLoadMoreProductSimpleSale").css("display", "none");
    }
  });

  // Load more for product combo best sale
  $("#btnLoadMoreProductComboSale").on("click", function() {
    $("#btnLoadMoreProductComboSale").text("Đang tải ...");

    offsetForProductCombo++;

    if (offsetForProductCombo < 3) {
      $.post(
        "/customer/index/load-more-product-combo",
        { offset: offsetForProductCombo },
        function(data) {
          if (data.length === 6) {
            loadMoreProductComboSale(JSON.parse(data));

            $("#btnLoadMoreProductComboSale").text("Xem thêm");
          } else {
            loadMoreProductComboSale(JSON.parse(data));

            $("#btnLoadMoreProductComboSale").text("Xem thêm");

            $("#btnLoadMoreProductComboSale").css("display", "none");
          }
        }
      );
    } else {
      $("#btnLoadMoreProductComboSale").css("display", "none");
    }
  });

  // Hàm thực hiện load more cho product simple
  function loadMoreProductSimpleSale(data) {
    var i;
    for (i = 0; i < data.length; i++) {
      if (data[i].SALE > 0) appendSimplehaveSale(data[i]);
      else appendSimpleNothaveSale(data[i]);
    }
  }

  // Hàm thêm sản phẩm simple có sale
  function appendSimplehaveSale(productSimple) {
    $("#containProductSimple").append(`
    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 d-flex justify-content-center">
          <div class="component-product-simple card w-100">
              <div class="card-img-top w-100 h-75 position-relative" data-toggle="tooltip"
                  id-product-to-cart="productSimple${
                    productSimple.ID
                  }" title="${productSimple.NAME}">
                  <a class="stretched-link" href="/customer/product/product-detail/product-simple/${
                    productSimple.ID
                  }"></a>

                  <div id="sale-image" class="position-absolute d-flex justify-content-center ml-2">
                      -${productSimple.SALE}%
                  </div>

                  <img src="${
                    productSimple.IMAGE
                  }" class="rounded-top w-100 h-100" id-product-to-cart="productSimple${productSimple.ID}" alt="">
                  <div class="overlay h-100 w-100 d-flex justify-content-center align-items-end">
                      <a id-product-to-cart="productSimple${
                        productSimple.ID
                      }" id="aAddProductSimple" id-product-simple=${productSimple.ID}
                          class="mr-2 mb-3 rounded-circle d-flex justify-content-center align-items-center"
                          data-toggle="tooltip" title="Mua ngay">
                          <i class="fas fa-shopping-cart"></i>
                      </a>
                      <a href="/customer/product/product-detail/product-simple/${
                        productSimple.ID
                      }"
                          class="mr-2 mb-3 rounded-circle d-flex justify-content-center align-items-center"
                          data-toggle="tooltip" title="Xem nhanh">
                          <i class="fas fa-search"></i>
                      </a>
                  </div>
              </div>

              <div class="card-body h-25 text-center d-flex align-items-center justify-content-center flex-column">
                  <a href="/customer/product/product-detail/product-simple/${
                    productSimple.ID
                  }"
                      class="title card-title m-0">${
                        productSimple.FORMATNAME
                      }</a>
                  <div class="mt-1 d-flex justify-content-center">
                      <div class="price-sale">
                          <span id-product-to-cart="productSimple${
                            productSimple.ID
                          }">${productSimple.SALEPRICE}</span>
                          <span><u>đ</u></span>
                      </div>

                      <div class="price-old">
                          <del class="ml-3">
                              ${productSimple.PRICE}
                              <span><u>đ</u></span>
                          </del>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `);
  }

  // Hàm thêm sản phẩm simple không có sale
  function appendSimpleNothaveSale(productSimple) {
    $("#containProductSimple").append(`
    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 d-flex justify-content-center">
          <div class="component-product-simple card w-100">
              <div class="card-img-top w-100 h-75 position-relative" data-toggle="tooltip"
                  id-product-to-cart="productSimple${
                    productSimple.ID
                  }" title="${productSimple.NAME}">
                  <a class="stretched-link" href="/customer/product/product-detail/product-simple/${
                    productSimple.ID
                  }"></a>

                  <img src="${
                    productSimple.IMAGE
                  }" class="rounded-top w-100 h-100" id-product-to-cart="productSimple${productSimple.ID}" alt="">
                  <div class="overlay h-100 w-100 d-flex justify-content-center align-items-end">
                      <a id-product-to-cart="productSimple${
                        productSimple.ID
                      }"  id="aAddProductSimple" id-product-simple=${productSimple.ID}
                          class="mr-2 mb-3 rounded-circle d-flex justify-content-center align-items-center"
                          data-toggle="tooltip" title="Mua ngay">
                          <i class="fas fa-shopping-cart"></i>
                      </a>
                      <a href="/customer/product/product-detail/product-simple/${
                        productSimple.ID
                      }"
                          class="mr-2 mb-3 rounded-circle d-flex justify-content-center align-items-center"
                          data-toggle="tooltip" title="Xem nhanh">
                          <i class="fas fa-search"></i>
                      </a>
                  </div>
              </div>

              <div class="card-body h-25 text-center d-flex align-items-center justify-content-center flex-column">
                  <a href="/customer/product/product-detail/product-simple/${
                    productSimple.ID
                  }"
                      class="title card-title m-0">${
                        productSimple.FORMATNAME
                      }</a>
                  <div class="mt-1 d-flex justify-content-center">
                      <div class="price-sale">
                          <span id-product-to-cart="productSimple${
                            productSimple.ID
                          }">${productSimple.SALEPRICE}</span>
                          <span><u>đ</u></span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `);
  }

  // Hàm thực hiện load more cho product combo
  function loadMoreProductComboSale(data) {
    var i;
    for (i = 0; i < data.length; i++) {
      if (data[i].SALE > 0) appendCombohaveSale(data[i]);
      else appendComboNothaveSale(data[i]);
    }
  }

  // Hàm thêm sản phẩm combo có sale
  function appendCombohaveSale(productCombo) {
    $("#containProductCombo").append(`
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
    <div class="component-product-combo card font-weight-bold w-100">
                <div class="position-relative w-100 h-75 card-img-top" data-toggle="tooltip"
                    id-product-to-cart="productCombo${
                      productCombo.ID
                    }" title="${productCombo.NAME}">
                    <div class="position-relative d-flex h-100">
                        <a href="/customer/product/product-detail/product-combo/${
                          productCombo.ID
                        }" class="stretched-link"></a>

                        <div id="sale-image" class="position-absolute d-flex justify-content-center ml-2">
                            -${productCombo.SALE}%
                        </div>

                        <img id-product-to-cart-src-1="productCombo${
                          productCombo.ID
                        }" class="image-product-1" src="${productCombo.IMAGE1}"
                            alt="" />
                        <img id-product-to-cart-src-2="productCombo${
                          productCombo.ID
                        }" class="image-product-2" src="${productCombo.IMAGE2}"
                            alt="" />
                        <img id-product-to-cart-src-3="productCombo${
                          productCombo.ID
                        }" class="image-product-3" src="${productCombo.IMAGE3}"
                            alt="" />
                    </div>
                    <div class="overlay d-flex justify-content-center align-items-end position-absolute h-100 w-100">
                        <a id-product-to-cart="productCombo${
                          productCombo.ID
                        }"  id="aAddProductCombo" id-product-combo=${productCombo.ID}
                            class="mr-2 mb-3 rounded-circle d-flex justify-content-center align-items-center"
                            data-toggle="tooltip" title="Mua ngay">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                        <a href="customer/product/product-detail/product-combo/${
                          productCombo.ID
                        }"
                            class="mb-3 rounded-circle d-flex justify-content-center align-items-center"
                            data-toggle="tooltip" title="Xem nhanh">
                            <i class="fas fa-search"></i>
                        </a>
                    </div>
                </div>

                <div class="card-body h-25 text-center d-flex align-items-center justify-content-center flex-column">
                    <a href="customer/product/product-detail/product-combo/${
                      productCombo.ID
                    }" class="title card-title m-0"
                        data-toggle="tooltip"
                        title="Baby combo - combo rau hữu cơ Nhật cho bé">${
                          productCombo.FORMATNAME
                        }</a>
                    <div class="m-0 d-flex justify-content-center">
                        <div class="price-sale">
                            <span id-product-to-cart="productCombo${
                              productCombo.ID
                            }">${productCombo.SALEPRICE}</span>
                            <span><u>đ</u></span>
                        </div>

                        <div class="price-old">
                            <del class="ml-2">
                                ${productCombo.PRICE}
                                <span><u>đ</u></span>
                            </del>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    `);
  }

  // Hàm thêm sản phẩm combo không có sale
  function appendComboNothaveSale(productCombo) {
    $("#containProductCombo").append(`
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
    <div class="component-product-combo card font-weight-bold w-100">
                <div class="position-relative w-100 h-75 card-img-top" data-toggle="tooltip"
                    id-product-to-cart="productCombo${
                      productCombo.ID
                    }" title="${productCombo.NAME}">
                    <div class="position-relative d-flex h-100">
                        <a href="/customer/product/product-detail/product-combo/${
                          productCombo.ID
                        }" class="stretched-link"></a>

                        <img id-product-to-cart-src-1="productCombo${
                          productCombo.ID
                        }" class="image-product-1" src="${productCombo.IMAGE1}"
                            alt="" />
                        <img id-product-to-cart-src-2="productCombo${
                          productCombo.ID
                        }" class="image-product-2" src="${productCombo.IMAGE2}"
                            alt="" />
                        <img id-product-to-cart-src-3="productCombo${
                          productCombo.ID
                        }" class="image-product-3" src="${productCombo.IMAGE3}"
                            alt="" />
                    </div>
                    <div class="overlay d-flex justify-content-center align-items-end position-absolute h-100 w-100">
                        <a id-product-to-cart="productCombo${
                          productCombo.ID
                        }" id="aAddProductCombo" id-product-combo=${productCombo.ID}
                            class="mr-2 mb-3 rounded-circle d-flex justify-content-center align-items-center"
                            data-toggle="tooltip" title="Mua ngay">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                        <a href="customer/product/product-detail/product-combo/${
                          productCombo.ID
                        }"
                            class="mb-3 rounded-circle d-flex justify-content-center align-items-center"
                            data-toggle="tooltip" title="Xem nhanh">
                            <i class="fas fa-search"></i>
                        </a>
                    </div>
                </div>

                <div class="card-body h-25 text-center d-flex align-items-center justify-content-center flex-column">
                    <a href="customer/product/product-detail/product-combo/${
                      productCombo.ID
                    }" class="title card-title m-0"
                        data-toggle="tooltip"
                        title="Baby combo - combo rau hữu cơ Nhật cho bé">${
                          productCombo.FORMATNAME
                        }</a>
                    <div class="m-0 d-flex justify-content-center">
                        <div class="price-sale">
                            <span id-product-to-cart="productCombo${
                              productCombo.ID
                            }">${productCombo.SALEPRICE}</span>
                            <span><u>đ</u></span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    `);
  }
});
