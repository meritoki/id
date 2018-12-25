var database = require('./database.js');
var sql = require('./relational/sql.js');
var bcrypt = require('bcryptjs');
var user = require('./object/user.js');


exports.getNamePasswordUser = function(name, password, callback) {
  console.log("relational.getNamePasswordUser")
  this.getNameUser(name, function(err, user) {
    if (err) {
      //return callback(err, null);
      return callback(null,null);
    } else {
      console.log('bcrypt compare');
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return callback(err, null);
        } else {
          if (result) {
            console.log('bcrypt success');
            database.getQueryResult(sql.updateUserLogin(user), function(err, result, fields) {
              return callback(err, user);
            });
          } else {
            return callback(null, null);
          }
        }
      });
    }
  });
};


exports.getNameUser = function(name, callback) {
  console.log('relational.getNameUser ' + name);
  if (typeof name !== "undefined") {
    database.getQueryResult(sql.selectNameUser(name), function(err, result) {
      u = null;
      if (result !== undefined && result != null && result.length > 0) {
        u = new user();
        u.idUser = result[0].id;
        u.name = result[0].name;
        u.email = result[0].email;
        u.role = result[0].role;
        u.password = result[0].password;
        console.log(u);
      } else {
        return callback(new Error("user is null"), null);
      }
      return callback(err, u);
    });
  } else {
    return callback(new Error("typeof name === \"undefined\""), null);
  }
};
