var checkAllCriteria = require('../utils').checkAllCriteria;

var created = function(item) {
  if (checkAllCriteria(this, item)) {
    this.items = this.items || [];
    this.items.push(item);
  }
};

module.exports = created;
