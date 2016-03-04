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
};

module.exports = destroyed;
