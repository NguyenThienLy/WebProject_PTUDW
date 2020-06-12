// Định dạng tiền thành dạng 200.000
module.exports = function(value) {
  var money = String(parseInt(value));

  // Lấy số lượng số trước dấu chấm
  var number_before_dot =
    (number_before_dot = money.length) > 3 ? number_before_dot % 3 : 0;
  var fomat = "";
  var i;

  for (i = money.length / 3 - 1; i > 0; i--) {
    if (number_before_dot === 0) {
      number_before_dot = 3;
    }

    fomat =
      money.substr(0, number_before_dot) +
      "." +
      money.substr(number_before_dot);

    money = fomat;

    number_before_dot = number_before_dot + 4;
  }

  return money;
};
