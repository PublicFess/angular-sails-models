module.exports = {
  create: function(req, res) {
    User.create(req.body).exec(function(err, item) {
      User.publishCreate(item);
      return res.json(item);
    });
  }
};
