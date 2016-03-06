var post = function(adapter, model) {
  return function(url, data) {
    return adapter.post(model.url + url, data)
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      throw err;
    });
  };
};

module.exports = post;
