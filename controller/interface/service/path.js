var properties = require('../../properties.js');
var id = require('../id.js');

exports.delete = function(router) {
  console.log('service.path.delete()');
};

exports.get = function(router) {
  console.log('service.path.get()');
};

exports.post = function(router) {
  console.log('service.path.post()');
  router.post("/v1/id/id",id.postIDID);
  router.post("/v1/id",id.postID);
};
