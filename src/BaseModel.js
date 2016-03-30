
var socketIOClient = require('socket.io-client')
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
      Model.destroyed(m.criteria || m.id || m.data);
      break;
    }
  });

  var Model = {
    url: url,
    items: [],
    cached: [],
    criteriaCached: {},
    criteriaAll: {},
    criteriaOne: {},

    _associations: [],
    _modelAssociations: []
  };

  Model.cache = require('./model_methods/cache')(adapter, Model);
  Model.fetch = require('./model_methods/fetch')(adapter, Model);
  Model.getAll = require('./model_methods/getAll')(Model);
  Model.fetchOne = require('./model_methods/fetchOne')(adapter, Model);
  Model.fetchOneById = require('./model_methods/fetchOneById')(adapter, Model);
  Model.fetchOneByUrl = require('./model_methods/fetchOneByUrl')(adapter, Model);
  Model.getOne = require('./model_methods/getOne')(Model);
  Model.getOneById = require('./model_methods/getOneById')(Model);
  Model.populate = require('./model_methods/populate')();
  Model.linkItem = require('./model_methods/linkItem')(Model);
  Model.linkModel = require('./model_methods/linkModel')(Model);

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
