var processingModelAssociation = function(items, association) {
  var model = association.model
    , value = association.value
    , criteria = association.criteria;

  var generateCriteria = function(item, criteria) {
    var newCriteria = {};
    for (var i in criteria) {
      if (!criteria.hasOwnProperty(i)) continue;
      newCriteria[i] = item[criteria[i]];
    }
    return newCriteria;
  };

  items.forEach(function(item) {
    model.linkItem(item, value, generateCriteria(item, criteria));
  });
};

module.exports = processingModelAssociation;
