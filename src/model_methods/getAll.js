var changeCriteriaAll = require('../utils').changeCriteriaAll;

var getAll = function(model) {
  return function(criteria) {
    changeCriteriaAll(model, criteria);
    if (model._lastFetchAll > model._lastChangeCriteriaAll && model.items) {
      return Promise.resolve().then(function() {
        return model.items;
      });
    }
    return model.fetch();
  };
};

module.exports = getAll;
