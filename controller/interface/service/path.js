var properties = require('../../properties.js');
var user = require('../user.js');

exports.delete = function(router) {
  console.log('service.path.delete()');
};

exports.get = function(router) {
  console.log('service.path.get()');
};

exports.post = function(router) {
  console.log('service.path.post()');
  router.post("/v1/auth/name/password", user.getNamePasswordUser);
  router.post("/v1/auth/name", user.getNameUser);
};
