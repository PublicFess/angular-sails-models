var processingPopulate = function(model, populate) {
  var populatedModel = populate.populatedModel
    , value = populate.value
    , criteria = populate.criteria;

  var generateCriteria = function(item, criteria) {
    var newCriteria = {};
    for (var i in criteria) {
      if (!criteria.hasOwnProperty(i)) continue;
      newCriteria[i] = item[criteria[i]];
    }
    return newCriteria;
  };

  model.items.forEach(function(item) {
    model.populate(item, value, populatedModel, generateCriteria(item, criteria));
  });
};

module.exports = processingPopulate;
