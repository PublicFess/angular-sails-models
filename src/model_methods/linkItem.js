var _ = require('lodash')
  , processingItemAssociation = require('./_processingItemAssociation');

var linkItem = function(model) {
  return function(item, value, criteria) {
    if (!item || !value || !criteria) {
      return new Error('Элемент, значение или критерии не переданы.');
    }
    var associations = model._associations;
    var exist = _.find(associations, function(a) {
      return a.item.id == item.id;
    });
    if (exist) return;
    associations.push({
      item: item,
      value: value,
      criteria: criteria
    });
    var association = associations[associations.length-1];
    processingItemAssociation(model.items, association);
  };
};

module.exports = linkItem;
