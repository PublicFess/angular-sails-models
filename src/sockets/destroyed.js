var _ = require('lodash');

var destroyed = function(id) {
  var self = this;
  if (!self.items || !self.items.length) return;
  _.remove(self.items, function(item) {
    return item.id == id;
  });
  if (self.item && self.item.id == id) {
    for (var i in self.item) {
      if (!self.item.hasOwnProperty(i)) return;
      delete self.item[i];
    }
  }
  this._associations.forEach(function(a) {
    var item = a.item
      , value = a.value;
    _.remove(item[value], function(i) {
      return i.id == id;
    });
  });
};

module.exports = destroyed;
