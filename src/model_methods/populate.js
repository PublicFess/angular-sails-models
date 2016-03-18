var _ = require('lodash')
  , ckeckCriteria = require('../utils').ckeckCriteria
  , helpFind = require('../utils').helpFind;

var populate = function(model) {
  return function(item, value, populatedModel, criteria) {
    if (!populatedModel.items || !populatedModel.items.length) {
      item[value] = null;
      return;
    }
    item[value] = _.find(populatedModel.items, helpFind(criteria));
  };
};

module.exports = populate;
