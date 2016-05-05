var changeCriteriaOne = changeCriteriaOne = require('../utils').changeCriteriaOne
  , find = require('lodash').find
  , helpFind = require('../utils').helpFind;

var getOne = function(model) {
  return function(criteria, force) {
    changeCriteriaOne(model, criteria);
    if (model.cached.length && !force) {
      return Promise.resolve().then(function() {
        model.item = find(model.cached, helpFind(model.criteriaOne));

        return model.item;
      });
    }
    return model.fetchOne();
  };
};

module.exports = getOne;
