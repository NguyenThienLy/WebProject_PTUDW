// Lấy database
var db = require("../utils/db");

//Hàm trả về tất cả các tag trên database
module.exports.allTag = () => {
  return db.load(`SELECT * FROM tag`);
};

//Hàm trả về tag của sản phẩm
module.exports.allTagOfProduct = (productID) => {
  return db.load(`SELECT tg.ID,tg.NAME FROM product_tag AS pr JOIN tag as tg
                  ON pr.TAGID = tg.ID WHERE pr.PRODUCTID = ${productID}`);
};

//Hàm thêm vào danh sách tag cho product | input: ID sản phẩm, mảng tag
module.exports.addTagForProduct = (productID, tags) => {

  if (tags.constructor === Array) {
    tags.forEach(element => {
      //Tạo entity
      var entity = {
        PRODUCTID: productID,
        TAGID: element
      };

      //gọi hàm insert
      db.add("product_tag", entity);
    });
  } else {
    //Tạo entity
    var entity = {
      PRODUCTID: productID,
      TAGID: tags
    };

    //gọi hàm insert
    db.add("product_tag", entity);
  }

};

module.exports.deleteProductTag= productID=>{
  return db.delete('product_tag','PRODUCTID',productID);
}

//Hàm thêm vào danh sách tag cho news | input: ID news, mảng tag
module.exports.addTagForNews = (newsID, tags) => {
  if (tags.constructor === Array) {
    tags.forEach(tag => {
      //Tạo entity
      var entity = {
        NEWSID: newsID,
        TAGID: tag
      };

      //gọi hàm insert
      db.add("news_tag", entity);
    });
  } else {
    //Tạo entity
    var entity = {
      NEWSID: newsID,
      TAGID: tags
    };

    //gọi hàm insert
    db.add("news_tag", entity);
  }
};
