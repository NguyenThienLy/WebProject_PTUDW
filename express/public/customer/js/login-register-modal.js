$('p[data-toggle="tab"]').on('show.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab
    if(target === "#header-login-modal-nav") {
        document.getElementById("header-user-modal-title").innerText = "Đăng nhập";
        document.getElementById("header-user-modal-content").innerText = "Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.";
    } else if (target === "#header-register-modal-nav") {
        document.getElementById("header-user-modal-title").innerText = "Đăng ký";
        document.getElementById("header-user-modal-content").innerText = "Tạo tài khoản để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.";
    }
});