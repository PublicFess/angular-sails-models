var isEqual = require('lodash.isequal');

exports.changeCriteriaAll = function(model, criteria) {
  var skip = isEqual(model.criteriaAll, criteria);
  if (skip) return;
  model.criteriaAll = criteria;
  model._lastChangeCriteriaAll = new Date();
};

exports.changeCriteriaOne = function(model, criteria) {
  var skip = isEqual(model.criteriaOne, criteria);
  if (skip) return;
  model.criteriaOne = criteria;
  model._lastChangeCriteriaOne = new Date();
};

Array.prototype.joinWith = function(array) {
  var self = this;
  array.forEach(function(item) {
    self.push(item);
  });
};

exports.checkCriteria = function(model, item) {
  var criteria = model.criteriaAll;
  var result = true;
  for (var i in criteria) {
    if (!criteria.hasOwnProperty(i)) return;
    if (criteria[i] != item[i]) result = false;
  };
  return result;
};
