var changeCriteriaAll = require('./utils').changeCriteriaAll
, changeCriteriaOne = require('./utils').changeCriteriaOne
, checkCriteria = require('./utils').checkCriteria
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
    items: [],
    criteriaAll: {},
    criteriaOne: {},

    _lastChangeCriteriaAll: null,
    _lastFetchAll: null,
    _lastChangeCriteriaOne: null,
    _lastFetchOne: null,

    fetch: function() {
      var self = this;
      return adapter.get(self.url, self.criteriaAll)
      .then(function(res) {
        self._lastFetchAll = new Date();
        _.remove(self.items, function() {
          return true;
        });
        self.items.joinWith(res.body);
        return self.items;
      }).catch(function(err) {
        throw err;
      });
    },

    getAll: function(criteria) {
      var self = this;
      changeCriteriaAll(self, criteria);
      if (self._lastFetchAll > self._lastChangeCriteriaAll && self.items) {
        return Promise.resolve().then(function() {
          return self.items;
        });
      }
      return self.fetch();
    },

    fetchOne: function() {
      var self = this;
      return adapter.get(self.url, self.criteriaOne)
      .then(function(res) {
        self._lastFetchOne = new Date();
        self.item = res.body[0];
        return self.item;
      }).catch(function(err) {
        throw err;
      });
    },

    getOne: function(criteria) {
      var self = this;
      changeCriteriaOne(self, criteria);
      if (self._lastFetchOne > self._lastChangeCriteriaOne && self.item) {
        return Promise.resolve().then(function() {
          return self.item;
        });
      }
      return self.fetchOne();
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
      if (checkCriteria(this, item)) {
        this.items = this.items || [];
        this.items.push(item);
      }
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
      if (self.item && self.item.id == id) {
        for (var i in self.item) {
          if (!self.item.hasOwnProperty(i)) return;
          delete self.item[i];
        }
      }
    }

  };

  return Model;
};

module.exports = BaseModel;
