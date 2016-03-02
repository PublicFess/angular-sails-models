var changeCriteria = require('./utils').changeCriteria
  , socketIOClient = require('socket.io-client')
  , sailsIOClient = require('sails.io.js')
  , _ = require('lodash');

var io = sailsIOClient(socketIOClient);;

var BaseModel = function(url, adapter) {
  io.sails.url = 'http://localhost:1337';
  adapter = adapter || io.socket;

  adapter.on(url.substring(1), function(m) {
    var type = m.verb;
    switch (type) {
      case 'created':
        Model.created(m.data);
        break;
      case 'destroyed':
        Model.destroyed(m.id);
        break;
    }
  });

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
      }).catch(function(err) {
        throw err;
      });
    },

    update: function(data) {
      console.log(data);
      var self = this;
      var id = data.id;
      return adapter.post(self.url + '/' + id, data).then(function(res) {
        return res;
      }).catch(function(err) {
        throw err;
      });
    },

    delete: function(data) {
      var self = this;
      var id = data.id || id;
      return adapter.delete(self.url + '/' + id).then(function(res) {
        return res;
      }).catch(function(err) {
        throw err;
      });
    },

    // Handlers for sockets events

    created: function(item) {
      this.items = this.items || [];
      this.items.push(item);
    },

    updated: function(data) {
      var self = this;
      if (!self.items || !self.items.length) return;
      var item = _.find(self.items, function(item) {
        return item.id == data;
      });
    },

    destroyed: function(id) {
      var self = this;
      if (!self.items || !self.items.length) return;
      _.remove(self.items, function(item) {
        return item.id == id;
      });
    }

  };

  return Model;
};

module.exports = BaseModel;
