var BaseModel = require('angular-sails-models');

module.exports = function(app) {
  app.service('User', ['$sails', function($sails) {
    var User = new BaseModel('/user', $sails);
    return User;
  }]);
};
