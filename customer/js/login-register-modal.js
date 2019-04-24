$('p[data-toggle="tab"]').on('show.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab
    if(target === "#nav-login") {
        document.getElementById("title").innerText = "Đăng nhập";
        document.getElementById("content").innerText = "Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.";
    } else if (target === "#nav-signup") {
        document.getElementById("title").innerText = "Đăng ký";
        document.getElementById("content").innerText = "Tạo tài khoản để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.";
    }
});