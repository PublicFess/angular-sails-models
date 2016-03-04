var update = function(adapter, model) {
  return function(data) {
    var id = data.id;
    return adapter.post(model.url + '/' + id, data).then(function(res) {
      return res;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = update;
