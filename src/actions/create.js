var create = function(adapter, model) {
  return function(data) {
    return adapter.post(model.url, data).then(function(res) {
      return res;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = create;
