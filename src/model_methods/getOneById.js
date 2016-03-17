var changeCriteriaOne = changeCriteriaOne = require('../utils').changeCriteriaOne;

var getOneById = function(model) {
  return function(id) {
    changeCriteriaOne(model, {id: id});
    if (model._lastFetchOne > model._lastChangeCriteriaOne && model.item) {
      return Promise.resolve().then(function() {
        return model.item;
      });
    }
    return model.fetchOneById();
  };
};

module.exports = getOneById;
