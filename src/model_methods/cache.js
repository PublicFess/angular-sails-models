var changeCriteriaCached = require('../utils').changeCriteriaCached;

var cache = function(adapter, model) {
  return function(criteria) {
    // TODO сделать нормально
    if (JSON.stringify(model.criteriaCached) == JSON.stringify(criteria)) {
      return Promise.resolve().then(function() {
        return model.cached;
      });
    }

    changeCriteriaCached(model, criteria);

    return adapter.get(model.url, criteria)
    .then(function(res) {
      _.remove(model.cached, function() {
        return true;
      });
      var cached = res.body.models || res.body;
      model.cached.joinWith(cached);
      return model.cached;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = cache;
