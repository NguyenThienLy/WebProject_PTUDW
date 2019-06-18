var CreateConnection = () => {
  var mysql = require("mysql");
  // return mysql.createConnection({
  //   host: "remotemysql.com",
  //   user: "CpQZk1ZFm6",
  //   port: "3306",
  //   password: "e046ApP13p",
  //   database: "CpQZk1ZFm6"
  //   password: "",
  //   database: "new_organic"
  // });
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "",
    database: "organic"
    //database: "CpQZk1ZFm6"
    //database: "newest_organic"

    //database: "organic"
    //database: "CpQZk1ZFm6"
    //database: "newest_organic"
    //database: "organic"
    //database: "CpQZk1ZFm6"

  });

  // return mysql.createConnection({
  //   host: "remotemysql.com",
  //   user: "CpQZk1ZFm6",
  //   port: "3306",
  //   password: "e046ApP13p",
  //   database: "CpQZk1ZFm6"
  // });
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
  },

  update: (tableName, idField, entity) => {
    return new Promise((resolve, reject) => {

      var id = entity[idField];
      delete entity[idField];

      var sql = `update ${tableName} set ? where ${idField} = ?`;

      var connection = CreateConnection();
      connection.connect();
 
      connection.query(sql, [entity, id], (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.changedRows);
        }
        connection.end();
      });
    });
  },

  updateIncrease: (tableName,rowIncrease,idField,Id)=>{
    return new Promise((resolve, reject) => {

      var sql = `update ${tableName} set ${rowIncrease} = ${rowIncrease} + 1  where ${idField} = ${Id}`;

      var connection = CreateConnection();
      connection.connect();
 
      connection.query(sql, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.changedRows);
        }
        connection.end();
      });
    });
  },

  update3Primarykey: (tableName, idField1, idField2, idField3, entity) => {
    return new Promise((resolve, reject) => {

      var id1 = entity[idField1];
      var id2 = entity[idField2];
      var id3 = entity[idField3];
      delete entity[idField1];
      delete entity[idField2];
      delete entity[idField3];

      var sql = `update ${tableName} set ? where ${idField1} = ? and ${idField2} = ? and ${idField3} = ?`;

      var connection = CreateConnection();
      connection.connect();

      connection.query(sql, [entity, id1, id2, id3], (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.changedRows);
        }
        connection.end();
      });
    });
  },

  delete: (tableName, idField, id) => {
    return new Promise((resolve, reject) => {
      var sql = `delete from ${tableName} where ${idField} = ?`;

      var connection = CreateConnection();
      connection.connect();

      connection.query(sql, id, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
  },

  delete2PrimaryKey: (tableName, idField1, idField2, entity) => {
    return new Promise((resolve, reject) => {
      var id1 = entity[idField1];
      var id2 = entity[idField2];

      var sql = `delete from ${tableName} where ${idField1} = ? and ${idField2} = ?`;
     
      var connection = CreateConnection();
      connection.connect();

      connection.query(sql, [id1, id2], (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
  },

  delete3PrimaryKey: (tableName, idField1, idField2, idField3, entity) => {
    return new Promise((resolve, reject) => {
      var id1 = entity[idField1];
      var id2 = entity[idField2];
      var id3 = entity[idField3];

      var sql = `delete from ${tableName} where ${idField1} = ? and ${idField2} = ? and ${idField3} = ?`;
     
      var connection = CreateConnection();
      connection.connect();

      connection.query(sql, [id1, id2, id3], (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
  }
};
