var _ = require('lodash')
  , ckeckCriteria = require('../utils').ckeckCriteria
  , helpFind = require('../utils').helpFind;

var populate = function(model) {
  return function(item, value, criteria) {
    if (!model.items || !model.items.length) {
      item[value] = null;
      return;
    }
    item[value] = _.find(model.items, helpFind(criteria));
  };
};

module.exports = populate;
