// Lấy database
var db = require("../utils/db");

//Hàm thêm vào lịch sử lúc tạo mới của news | input : ID news
module.exports.addCreatedHistory = (newsID, ACTION, DETAIL) => {
  //Tạo đối tượng
  var entity = {
    NEWSID: newsID,
    CREATED: getDateNow(),
    ACTION: ACTION,
    DETAIL: DETAIL
  };
  //Thêm
  db.add("news_info_history", entity);
};

//Hàm trả về thời gian hiện tại
function getDateNow() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  return today;
}
