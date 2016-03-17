var _ = require('lodash');

var checkDestroyCriteria = function(item, criteria) {
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
  _.remove(self.items, function(item) {
    if (typeof criteria == 'number' || typeof criteria == 'string') {
      return item.id == criteria;
    }
    return checkDestroyCriteria(item, criteria);
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
      if (typeof criteria == 'number' || typeof criteria == 'string') {
        return item.id == criteria;
      }
      return checkDestroyCriteria(item, criteria);
    });
  });
};

module.exports = destroyed;
