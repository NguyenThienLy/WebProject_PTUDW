$('p[data-toggle="tab"]').on('show.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab
    if(target === "#header-info-modal-nav") {
        document.getElementById("header-avatar-modal-title").innerText = "Thông tin tài khoản";
        document.getElementById("header-avatar-modal-content").innerText = "Quí khách cần đảm bảo cung cấp thông tin một cách chính xác để chúng tôi có thể liên hệ và tương tác một cách tốt nhất.";
    } else if (target === "#header-edit-info-modal-nav") {
        document.getElementById("header-avatar-modal-title").innerText = "Chỉnh sửa thông tin";
        document.getElementById("header-avatar-modal-content").innerText = "Luôn cập nhật thông tin cá nhân để có trải nghiệm tốt.";
    }
});