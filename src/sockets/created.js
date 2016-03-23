var checkCriteria = require('../utils').checkCriteria
  , processingItemAssociation = require('../model_methods/_processingItemAssociation')
  , processingModelAssociation = require('../model_methods/_processingModelAssociation');

var created = function(data) {
  if (!data.length) data = [data];
  var self = this;
  data.forEach(function(item) {
    if (checkCriteria(item, self.criteriaAll)) {
      self.items.push(item);
    }
    if (checkCriteria(item, self.criteriaCached)) {
      self.cached.push(item);
    }
    self._associations.forEach(function(a) {
      processingItemAssociation([item], a);
    });
    self._modelAssociations.forEach(function(a) {
      processingModelAssociation([item], a);
    });
  });

};

module.exports = created;
