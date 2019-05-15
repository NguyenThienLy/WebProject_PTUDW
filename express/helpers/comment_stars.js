// Hiển thị rating theo value
module.exports = function(value) {
  var result = "";

  for (let i = 0; i < value; i++) {
    result += "<span class='fa fa-star checked'>&nbsp;</span>";
  }

  for (let i = 0; i < 5 - value; i++) {
    result += "<span class='fa fa-star'>&nbsp;</span>";
  }

  return result;
};
