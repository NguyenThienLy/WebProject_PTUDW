$(document).ready(function() {
  // filter product show
  $(".component-open-filter").click(function(e) {
    e.stopPropagation();
    $(".side-filter").toggleClass("show-filter");
    $(".bg-over-lay").css("display", "block");
  });

  $("#mySideFilter").click(function(e) {
    e.stopPropagation();
  });

  $("body,html").click(function(e) {
    $(".side-filter").removeClass("show-filter");
    $(".bg-over-lay").css("display", "none");
  });
});
