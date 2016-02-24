var changeCriteria = require('./utils').changeCriteria
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

var io = sailsIOClient(socketIOClient);;

var BaseModel = function(adapter, url) {
  io.sails.url = 'http://localhost:1337';
  adapter = adapter || io.socket;
  var Model = {
    url: url,
    criteria: {},

    _lastChangeCriteria: null,
    _lastFetch: null,

    fetch: function() {
      var self = this;
      return adapter.get(self.url, self.criteria)
      .then(function(res) {
        self.items = res.body;
        return self.items;
      }).catch(function(err) {
        throw err;
      });
    },

    getAll: function(criteria) {
      var self = this;
      changeCriteria(self, criteria);
      console.log(self._lastChangeCriteria);
      if (self._lastFetch > self._lastChangeCriteria && self.items) {
        return Promise.resolve().then(function() {
          return self.items;
        });
      }
      return self.fetch();
    },

    create: function(data) {
      var self = this;
      return adapter.post(self.url, data).then(function(res) {
        return res;
      });
    }
  }

  return Model;
}

module.exports = BaseModel;
