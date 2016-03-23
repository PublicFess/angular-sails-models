var _ = require('lodash')
  , ckeckCriteria = require('../utils').ckeckCriteria
  , helpFind = require('../utils').helpFind;

var populate = function() {
  return function(item, value, populatedModel, criteria) {
    item[value] = null;
    if (populatedModel.cached.length) {
      item[value] = _.find(populatedModel.cached, helpFind(criteria));
    };
  };
};

module.exports = populate;
