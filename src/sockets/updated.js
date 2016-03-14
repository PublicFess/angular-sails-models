var assign = require('lodash').assign;

var updated = function(data) {
  var self = this;
  if (!self.items || !self.items.length) return;
  var item = _.find(self.items, function(item) {
    return item.id == data.id;
  });
  if (item) assign(item, data);
};

module.exports = updated;
