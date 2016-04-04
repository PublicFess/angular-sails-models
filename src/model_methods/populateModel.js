var processingPopulate = require('./_processingPopulate');

var populateModel = function(model) {
  return function(value, populatedModel, criteria) {
    var p = {
      value: value,
      populatedModel: populatedModel,
      criteria: criteria
    };
    model._populations.push(p);
    processingPopulate(model, p);
  };
};

module.exports = populateModel;
