// Hàm định dạng title của product simple lấy 36 kí tự
module.exports.formatTitleProductSimple = function(value) {
    if (value.length > 36) return value.substr(0, 36) + "...";

    return value;
};

// Hàm định dạng title của product combo lấy 52 kí tự
module.exports.formatTitleProductCombo = function(value) {
    if (value.length > 52) return value.substr(0, 52) + "...";

    return value;
};

// Hàm định dạng title của info lấy 85 kí tự
module.exports.formatTitleInfo = function(value) {
    if (value.length > 85) return value.substr(0, 85) + "...";

    return value;
};

// Hàm định dạng short content của info lấy 320 kí tự
module.exports.formatShortContentInfo = function(value) {
    if (value.length > 320) return value.substr(0, 320) + "...";

    return value;
};

// Hàm định dạng title của product simple khi ở fastcart lấy 25 kí tự
module.exports.formatTitleProductForFastCart = function(value) {
    if (value.length > 25) return value.substr(0, 25) + "...";

    return value;
};

// Hàm định dạng title của product khi ở cart detail lấy 30 kí tự
module.exports.formatTitleProductForCartDetail = function(value) {
    if (value.length > 30) return value.substr(0, 30) + "...";

    return value;
};

// Hàm định dạng title của product khi ở cart detail lấy 30 kí tự
module.exports.formatTitleInBreadCrumb = function(value) {
    if (value.length > 30) return value.substr(0, 30) + "...";

    return value;
};

// Hàm định dạng title của product khi ở full text
module.exports.formatTitleInFullTextSearch = function(value) {
    if (value.length > 37) return value.substr(0, 37) + "...";

    return value;
};
