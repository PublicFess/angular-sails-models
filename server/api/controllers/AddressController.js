module.exports = {
  create: function(req, res) {
    console.log(req.body);
    Address.create(req.body).exec(function(err, item) {
      Address.publishCreate(item);
      return res.json(item);
    });
  },

  destroy: function(req, res) {
    var id = req.params.id;
    Address.destroy({
      id: id
    }).then(function() {
      Address.publishDestroy(id);
      res.send();
    }).catch(function(err) {
      serverError(err);
    });
  }
};
