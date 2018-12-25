/*
 * Name: User.js
 * Date: 2015-07-08
 * Author: Joaquin Osvaldo Rodriguez
 */
var relational = require('../../model/relational.js');
var properties = require('../properties.js');

exports.getNamePasswordUser = function(req, res, next) {
  console.log('getNamePasswordUser');
  console.log(req.body);

  var name = req.body.name;
  var password = req.body.password;
  console.log('getNamePasswordUser '+name);
  console.log('getNamePasswordUser '+ password);
  relational.getNamePasswordUser(name, password, function (error, u) {
    if (error) {
      res.end(error);
    } else {
      res.end(u);
    }
  });
};
