// update_margin_top_breadcrumb_div
function update_margin_top_breadcrumb_div(){
    var win = $(this); //this = window
    // if (win.outerWidth() <= 991) {
     var result = $(".component-header").height();
     $(".breadcrumb-div").css("margin-top", result);
  //  } else {
  //   $(".breadcrumb-div").css("margin-top", 0);
  // }

  let image_product_large_width = $('.image-product-large').width();
  $('.image-product-large').css("height", image_product_large_width);

  let image_product_small_width = $('.image-product-small').width();
  $('.image-product-small-container').css("height", image_product_small_width);
}


$(window).on('resize', update_margin_top_breadcrumb_div);
$(document).ready(update_margin_top_breadcrumb_div);
// update_margin_top_breadcrumb_div