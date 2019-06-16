// $("#btn-register").on("click", function() {
//   $.ajax({
//     type: "POST",
//     data: $("#frmRegister").serialize(),
//     url: "/customer/auth/register",
//     success: function(result) {
//       window.location.href = location.href;
//     }
//   });
// });

$("#frmRegister").on("submit", function(e) {
  e.preventDefault();
});

$("#frmLogin").on("submit", function(e) {
  e.preventDefault();
});

$("#frmUpdate").on("submit", function(e) {
  e.preventDefault();
});

$("#frmUpdatePass").on("submit", function(e) {
  e.preventDefault();
});

$("#frmForgotPass").on("submit", function(e) {
  e.preventDefault();
});

$("#btn-logout").on("click", function(e) {
  $.ajax({
    type: "POST",
    url: "/customer/auth/logout",
    success: function(result) {
      window.location.href = location.href;
    }
  });
});
