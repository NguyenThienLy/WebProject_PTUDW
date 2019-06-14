// Hàm kiểm tra xem giá id category|subcategory|tag có được selected
module.exports.isSelected = function(v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
};

//Kiểm tra xem id tag có nằm trong list giá trị hay không
module.exports.isExistedInProducts = function(productID, listProducts) {
  var isTrue = false;
  if (listProducts.constructor === Array) {
    listProducts.forEach(product => {
      if (product.ID === productID) {
        isTrue = true;
      }
    });
  } else {
    if (listProducts.ID === productID) {
      isTrue = true;
    }
  }
  if (!isTrue) {
    return (
      '<option value="' + productID + '" selected>' + productID + "</option>"
    );
  }
};
