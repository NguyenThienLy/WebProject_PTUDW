// update_top_component_avatar_user_content
function update_top_component_avatar_user_content(){
    var win = $(this); //this = window
    var result = $(".component-header").height();
    if (win.outerWidth() <= 575) {
     $(".component-avatar-user-content").css("top", 0.5*result);
   } else if (win.outerWidth() <= 767) {
    $(".component-avatar-user-content").css("top", 0.5*result);
  } else if (win.outerWidth() <= 991) {
    $(".component-avatar-user-content").css("top", 0.88*result);
  } else if (win.outerWidth() <= 1199) {
    $(".component-avatar-user-content").css("top", 0.78*result);
  } else {
    $(".component-avatar-user-content").css("top", 0.83*result);
  }
}


$(window).on('resize', update_top_component_avatar_user_content);
$(document).ready(update_top_component_avatar_user_content);
// update_top_component_avatar_user_content

// update_top_component_show_fast_cart
function update_top_component_show_fast_cart(){
    var win = $(this); //this = window
    var result = $(".component-header").height();
    if (win.outerWidth() <= 1199) {
      $(".component-show-fast-cart").css("top", 0.55*result);
    } else if (win.outerWidth() <= 2000) {
      $(".component-show-fast-cart").css("top", 0.58*result);
    }
  }


  $(window).on('resize', update_top_component_show_fast_cart);
  $(document).ready(update_top_component_show_fast_cart);
// update_top_component_show_fast_cart

// update_top_header_button_product_content
function update_top_header_button_product_content (){
    var win = $(this); //this = window
    var result = $(".component-header").height();
    if (win.outerWidth() <= 1199) {
      $(".header-button-product-content").css("top", 0.73*result);
    } else if (win.outerWidth() <= 2000) {
      $(".header-button-product-content").css("top", 0.78*result);
    }
  }


  $(window).on('resize', update_top_header_button_product_content);
  $(document).ready(update_top_header_button_product_content);
// update_top_header_button_product_content