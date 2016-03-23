Array.prototype.joinWith = function(array) {
  var self = this;
  if (!array || !array.length) return;
  array.forEach(function(item) {
    self.push(item);
  });
};

var isEqual = require('lodash.isequal');

exports.changeCriteriaAll = function(model, criteria) {
  model.criteriaAll = criteria;
};

exports.changeCriteriaOne = function(model, criteria) {
  model.criteriaOne = criteria;
};

exports.changeCriteriaCached = function(model, criteria) {
  model.criteriaCached = criteria;
};

exports.checkCriteria = function(item, criteria) {
  var result = true;
  for (var i in criteria) {
    if (!criteria.hasOwnProperty(i)) return;
    switch (typeof criteria[i]) {
      case 'string':
        result = criteria[i] == item[i];
        break;
      case 'object':
        if (criteria[i] == null) {
          result = criteria[i] == item[i];
          break;
        };
        var key = Object.keys(criteria[i])[0];
        if (key == '$in') {
          result = criteria[i][key].indexOf(item[i]) > -1;
        };
        break;
      default:
        break;
    }
  };
  return result;
};

exports.helpFind = function(criteria) {
  var criteria = criteria;
  return function(o) {
    var skip = false;
    for (var i in criteria) {
      if (!criteria.hasOwnProperty(i)) return;
      if (!criteria[i]) {
        skip = true;
        continue;
      }
      if (o[i].toString() != criteria[i].toString()) {
        skip = true;
      }
    }
    return !skip;
  };
};
