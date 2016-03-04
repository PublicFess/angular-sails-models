var checkCriteria = require('../utils').checkCriteria;

var created = function(item) {
  if (checkCriteria(this, item)) {
    this.items = this.items || [];
    this.items.push(item);
  }
};

module.exports = created;
