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
    }).catch(function(err) {
      serverError(err);
    });
  },

  update: function(req, res) {
    var id = req.params.id
      , updateParams = req.body;
    User.update({
      id: id
    }, updateParams).then(function() {
      User.publishUpdate(id, updateParams);
      res.send();
    }).catch(function(err) {
      res.serverError(err);
    });
  },

  changeCity: function(req, res) {
    var id = req.params.id;
    console.log(id);
    User.update({
      id: id
    }, {
      city: 'Kursk'
    }).then(function() {
      User.publishUpdate(id, {
        id: id,
        city: 'Kursk'
      });
      res.send();
    }).catch(function(err) {
      serverError(err);
    });
  }
};
