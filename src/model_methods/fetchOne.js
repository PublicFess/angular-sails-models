var fetchOne = function(adapter, model) {
  return function() {
    return adapter.get(model.url, model.criteriaOne)
    .then(function(res) {
      model._lastFetchOne = new Date();
      model.item = res.body[0];
      return model.item;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = fetchOne;
