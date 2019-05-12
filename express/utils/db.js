var CreateConnection = () => {
  var mysql = require("mysql");
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    //port: "3306",
    password: "",
    database: "organic"
  });
};

module.exports = {
  load: sql => {
    //Return veef sau kho querry xong
    return new Promise((resolve, reject) => {
      var connection = CreateConnection();
      connection.connect();

      connection.query(sql, (error, results, fields) => {
        if (error)
          //tra ve loi
          reject(error);
        else {
          //tra ve json oject khi lay xong du lieu
          resolve(results);
        }

        connection.end();
      });
    });
  },

  add: (tablename, entity) => {
    return new Promise((resolve, reject) => {
      var connection = CreateConnection();
      connection.connect();

      var sqlinsert = `insert into ${tablename} set ?`;

      connection.query(sqlinsert, entity, (error, value) => {
        if (error)
          //tra ve loi
          reject(error);
        else {
          //tra ve json oject khi lay xong du lieu
          resolve(value.insertId);
        }

        connection.end();
      });
    });
  }
};
