var changeCriteriaCached = require('../utils').changeCriteriaCached;

var cache = function(adapter, model) {
  return function(criteria) {
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
