var destroy = function(adapter, model) {
  return function(data) {
    var id = data.id || id;
    return adapter.delete(model.url + '/' + id).then(function(res) {
      return res;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = destroy;
