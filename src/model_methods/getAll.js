var changeCriteriaAll = require('../utils').changeCriteriaAll
  , checkCriteria = require('../utils').checkCriteria
  , compact = require('lodash').compact;

var getAll = function(model) {
  return function(criteria, force) {
    changeCriteriaAll(model, criteria);
    if (model.cached.length && !force) {
      return Promise.resolve().then(function() {
        var items = compact(model.cached.map(function(cache) {
          return checkCriteria(cache, model.criteriaAll) ? cache : null;
        }));
        _.remove(model.items, function() {
          return true;
        });
        model.items.joinWith(items);
        return model.items;
      });
    }
    return model.fetch();
  };
};

module.exports = getAll;
