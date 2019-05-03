// carousel margin top = height of header
function update_margin_top_header_carousel() {
  var win = $(this); //this = window
  // if (win.outerWidth() <= 991) {
    var result = $(".component-header").height();
    $(".header-carousel").css("margin-top", result);
  // } else {
  //   $(".header-carousel").css("margin-top", 0);
  // }
}
$(window).on("resize", update_margin_top_header_carousel);

$(document).ready(update_margin_top_header_carousel);
// carousel margin top = height of header
