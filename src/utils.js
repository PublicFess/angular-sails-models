var isEqual = require('lodash.isequal')

exports.serializeObj = function(obj) {
  var result = [];
  for (var property in obj) {
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
  }
  return result.join("&");
};

exports.changeCriteria = function(model, criteria) {
  var skip = isEqual(model.criteria, criteria)
  if (skip) return;
  model.criteria = criteria;
  model._lastChangeCriteria = new Date();
};
