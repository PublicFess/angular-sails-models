var _ = require('lodash')
  , processingModelAssociation = require('../model_methods/_processingModelAssociation');

// TODO Написать тесты
var linkModel = function(model) {
  return function(linkedModel, value, criteria) {
    if (!linkedModel || !value || !criteria) {
      return new Error('Модель, значение или критерии не переданы.');
    }
    var associations = model._modelAssociations;
    var exist = _.find(associations, function(a) {
      return a.model.url = linkedModel.url;
    });
    if (exist) {
      processingModelAssociation(model.cached, exist);
      return;
    };
    associations.push({
      model: linkedModel,
      value: value,
      criteria: criteria
    });
    var association = associations[associations.length-1];
    processingModelAssociation(model.cached, association);
  };
};

module.exports = linkModel;
