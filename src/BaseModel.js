
var checkCriteria = require('./utils').checkCriteria
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
      case 'updated':
      Model.updated(m.data);
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
    _lastFetchOne: null
  };

  Model.fetch = require('./model_methods/fetch')(adapter, Model);
  Model.getAll = require('./model_methods/getAll')(Model);
  Model.fetchOne = require('./model_methods/fetchOne')(adapter, Model);
  Model.getOne = require('./model_methods/getOne')(Model);

  Model.create = require('./actions/create')(adapter, Model);
  Model.update = require('./actions/update')(adapter, Model);
  Model.destroy = require('./actions/destroy')(adapter, Model);
  Model.post = require('./actions/post')(adapter, Model);

  Model.created = require('./sockets/created');
  Model.updated = require('./sockets/updated');
  Model.destroyed = require('./sockets/destroyed');
  return Model;
};

module.exports = BaseModel;
