// Định dạng các trạng thái của đơn hàng
module.exports = function(id, name) {
    var badgeType = "";

    if (id === 1) {
        badgeType = "badge-primary";
    } else if (id === 2) {
        badgeType ="badge-warning";
    } else if (id === 3) {
        badgeType ="badge-success";
    } else {
        badgeType ="badge-danger";
    }
  
    return (
      '<span class="badge ' + badgeType + '">' + name + '</span>'
    );
  };