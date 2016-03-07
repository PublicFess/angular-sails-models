var BaseModel = require('angular-sails-models');

module.exports = function(app) {
  app.service('Address', ['$sails', function($sails) {
    var Address = new BaseModel('/address', $sails);
    return Address;
  }]);
};
