var fetch = function(adapter, model) {
  return function() {
    return adapter.get(model.url, model.criteriaAll)
    .then(function(res) {
      _.remove(model.items, function() {
        return true;
      });
      var models = res.body.models || res.body;
      model.items.joinWith(models);
      return model.items;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = fetch;
