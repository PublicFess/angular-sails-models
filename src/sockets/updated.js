var assign = require('lodash').assign
  , findIndex = require('lodash').findIndex
  , checkAllCriteria = require('../utils').checkAllCriteria;

var updated = function(data) {
  var self = this;
  if (!self.items || !self.items.length) return;
  var item = _.find(self.items, function(item) {
    return item.id == data.id;
  });
  if (item ) assign(item, data);
  if (!checkAllCriteria(self, data)) {
    var id = findIndex(self.items, {'id': data.id});
    self.items.splice(id, 1);
  };
  if (self.item && self.item.id == data.id) {
    assign(self.item, data);
  };
};

module.exports = updated;
