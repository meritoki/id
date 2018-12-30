var database = require('./database.js');
var sql = require('./relational/sql.js');
var bcrypt = require('bcryptjs');
var identification = require('./object/identification.js');

exports.setID = function(id, callback) {
  if (typeof id !== "undefined") {
    database.getQueryResult(sql.insertID(id), function(err, result, fields) {
      if (err) {
        callback(err, null);
      }
      callback(null, true);
    });
  } else {
    callback(new Error("typeof user === \"undefined\""), null);
  }
};


exports.getID = function(user, callback) {
  if (typeof user !== "undefined") {
    database.getQueryResult(sql.selectID(user), function(err, result) {
      u = null;
      if (result !== undefined && result != null && result.length > 0) {
        l = new identification();
        l.idUser = result[0].idUser;
        l.idAgent = result[0].idAgent;
        l.idMerchant = result[0].idMerchant;
        l.idConsumer = result[0].idConsumer;
        l.idCustomer = result[0].idCustomer;
        l.idDonor = result[0].idDonor;
        l.idIdentification = result[0].idIdentification;
        l.name = result[0].name;
        console.log(l);
      } else {
        return callback(new Error("id is null"), null);
      }
      return callback(err, l);
    });
  } else {
    return callback(new Error("typeof name === \"undefined\""), null);
  }
};
