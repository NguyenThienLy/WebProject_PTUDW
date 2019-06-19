$(document).ready(function() {
  checkHaveProduct();

  $("#inputSearchFullTextCustomer").on("input", function(e) {
    var text = $("#inputSearchFullTextCustomer").val();

    $.post(
      "/customer/product/get-product-suggestion",
      { textSearch: text },
      function(data) {
        emptyContain();
        showProductSimple(JSON.parse(data.productsSimple));
        showProductCombo(JSON.parse(data.productsCombo));
        checkHaveProduct();
      }
    );
  });

//   $('#btnSearchFullTextSeach').click(function() {
//     var text = $("#inputSearchFullTextCustomer").val();
//     window.location.href = `/customer/product/product-all-show/${text}`;
//   });

  function checkHaveProduct() {
    if (
      $("#divContainProductsSimple").children().length +
        $("#divContainProductsCombo").children().length ===
      0
    ) {
      $("#divSuggestionFullTextCustomer").css("display", "none");
    } else {
      $("#divSuggestionFullTextCustomer").css("display", "");
    }
  }

  function emptyContain() {
    $("#divContainProductsSimple").empty();
    $("#divContainProductsCombo").empty();
  }

  function showProductSimple(data) {
    for (var i = 0; i < data.length; i++) {
      $("#divContainProductsSimple").append(`
        <small class="d-block ml-2 mr-3 mb-1"><a class="text-decoration-none text-secondary" href="/customer/product/product-detail/product-simple/${
          data[i].ID
        }">${data[i].NAME}</a></small>
        `);
    }
  }

  function showProductCombo(data) {
    for (var i = 0; i < data.length; i++) {
      $("#divContainProductsCombo").append(`
        <small class="d-block ml-2 mr-3 mb-1"><a class="text-decoration-none text-secondary" href="/customer/product/product-detail/product-combo/${
          data[i].ID
        }">${data[i].NAME}</a></small>
        `);
    }
  }
});
