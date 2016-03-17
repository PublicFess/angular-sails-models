var checkAllCriteria = require('../utils').checkAllCriteria
  , processingItemAssociation = require('../model_methods/_processingItemAssociation');

var created = function(data) {
  if (!data.length) data = [data];
  var self = this;
  data.forEach(function(item) {
    if (checkAllCriteria(this, data)) {
      self.items = self.items || [];
      self.items.push(item);
    }
    self._associations.forEach(function(a) {
      processingItemAssociation([item], a);
    });
  });

};

module.exports = created;
