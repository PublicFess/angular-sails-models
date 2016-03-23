var _ = require('lodash')
  , helpFind = require('../utils').helpFind;

var checkDestroyCriteria = function(item, criteria) {
  if (typeof criteria == 'number' || typeof criteria == 'string') {
    return item.id == criteria;
  }
  var result = true;
  var keys = Object.keys(criteria);
  keys.forEach(function(key) {
    switch (typeof criteria[key]) {
      case 'number':
      if (item[key] != criteria[key]) {
        result = false;
      }
      break;
      case 'object':
      if (criteria[key].length) {
        if (criteria[key].indexOf(item[key]) == -1) {
          result = false;
        }
      }
      break;
      default:
      break;
    }
  });
  return result;
};

var destroyed = function(criteria) {
  var self = this;
  if (!self.items || !self.items.length) return;

  var items = _.compact(self.items.map(function(item) {
    return checkDestroyCriteria(item, criteria) ? item : null;
  }));
  _.remove(self.items, function(item) {
    return items.indexOf(item) > -1;
  });
  _.remove(self.cached, function(item) {
    return _.find(items, helpFind({id: item.id}));
  });
  if (self.item && checkDestroyCriteria(self.item, criteria)) {
    for (var i in self.item) {
      if (!self.item.hasOwnProperty(i)) return;
      delete self.item[i];
    }
  }
  this._associations.forEach(function(a) {
    var item = a.item
    , value = a.value;
    _.remove(item[value], function(item) {
      return checkDestroyCriteria(item, criteria);
    });
  });
  items.forEach(function(item) {
    if (item._associations && item._associations.length) {
      item._associations.forEach(function(association) {
        _.remove(association.model._associations, function(a) {
          return a.id == association.id;
        });
      });
    }
  });
};

module.exports = destroyed;
