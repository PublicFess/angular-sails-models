var checkAllCriteria = require('../utils').checkAllCriteria
  , processingItemAssociation = require('../model_methods/_processingItemAssociation');

var created = function(item) {
  if (checkAllCriteria(this, item)) {
    this.items = this.items || [];
    this.items.push(item);
  }
  this._associations.forEach(function(a) {
    processingItemAssociation([item], a);
  });
};

module.exports = created;
