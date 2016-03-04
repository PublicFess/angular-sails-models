var changeCriteriaOne = changeCriteriaOne = require('../utils').changeCriteriaOne;

var getOne = function(model) {
  return function(criteria) {
    changeCriteriaOne(model, criteria);
    if (model._lastFetchOne > model._lastChangeCriteriaOne && model.item) {
      return Promise.resolve().then(function() {
        return model.item;
      });
    }
    return model.fetchOne();
  };
};

module.exports = getOne;
