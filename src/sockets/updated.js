var updated = function(data) {
  var self = this;
  if (!self.items || !self.items.length) return;
  var item = _.find(self.items, function(item) {
    return item.id == data;
  });
};

module.exports = updated;
