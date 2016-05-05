var _ = require('lodash')
  , processingItemAssociation = require('./_processingItemAssociation')
  , rs = require('randomstring');

var linkItem = function(model) {
  return function(item, value, criteria) {
    if (!item || !value || !criteria) {
      return new Error('Элемент, значение или критерии не переданы.');
    }
    var associations = model._associations;
    var exist = _.find(associations, function(a) {
      return a.item.id == item.id;
    });
    if (exist) {
      processingItemAssociation(model.cached, exist);
      return;
    }
    var id = rs.generate(12);
    associations.push({
      id: id,
      item: item,
      value: value,
      criteria: criteria
    });
    item._associations = item._associations || [];
    item._associations.push({
      id: id,
      model: model
    });
    var association = associations[associations.length-1];
    processingItemAssociation(model.cached, association);
  };
};

module.exports = linkItem;
