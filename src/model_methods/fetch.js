var fetch = function(adapter, model) {
  return function() {
    return adapter.get(model.url, model.criteriaAll)
    .then(function(res) {
      model._lastFetchAll = new Date();
      _.remove(model.items, function() {
        return true;
      });
      model.items.joinWith(res.body);
      return model.items;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = fetch;
