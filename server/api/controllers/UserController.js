module.exports = {
  create: function(req, res) {
    User.create(req.body).exec(function(err, item) {
      return res.json(item);
    });
  }
};
