var changeCriteriaOne = changeCriteriaOne = require('../utils').changeCriteriaOne;

var fetchOneByUrl = function(adapter, model) {
  return function(url, criteria) {
    changeCriteriaOne(model, criteria);
    return adapter.get(model.url + '/' + url, model.criteriaOne)
    .then(function(res) {
      model.item = res.body[0] || res.body;
      return model.item;
    }).catch(function(err) {
      throw err;
    });
  };
};

module.exports = fetchOneByUrl;
