module.exports = {
  create: function(req, res) {
    User.create(req.body).exec(function(err, item) {
      User.publishCreate(item);
      return res.json(item);
    });
  },

  destroy: function(req, res) {
    var id = req.params.id;
    User.destroy({
      id: id
    }).then(function() {
      User.publishDestroy(id);
      res.send();
    });
  }
};
