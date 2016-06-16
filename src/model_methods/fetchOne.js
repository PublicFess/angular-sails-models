var fetchOne = function(adapter, model) {
  return function() {
    return adapter.get(model.url, model.criteriaOne)
    .then(function(res) {
      model.item = res.body.models[0] || res.body[0] || res.body;
      return model.item;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = fetchOne;
