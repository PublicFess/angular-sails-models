var checkCriteria = require('../utils').checkCriteria
  , _ = require('lodash');

var processingAssociation = function(items, association) {
  var item = association.item
    , value = association.value
    , criteria = association.criteria;

  var existingItems = item[value];
  var linkingItems = _.compact(items.map(function(i) {
    if (checkCriteria(i, criteria)) {
      return i;
    };
  }));
  if (!linkingItems.length) return;
  linkingItems.forEach(function(li) {
    var existing = _.find(item[value], function(item) {
      return item.id == li.id;
    });
    if (existing) {
      existing = li;
      return;
    };

    item[value] = item[value] || [];
    item[value].push(li);
  });
};

module.exports = processingAssociation;
