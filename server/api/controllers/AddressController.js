module.exports = {
  create: function(req, res) {
    Address.create(req.body).exec(function(err, item) {
      Address.publishCreate(item);
      return res.json(item);
    });
  },

  update: function(req, res) {
    var id = req.params.id
      , updateParams = req.body;
    Address.update({
      id: id
    }, updateParams).then(function() {
      Address.publishUpdate(id, updateParams);
      res.send();
    }).catch(function(err) {
      res.serverError(err);
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
