var chai = require('chai')
  , promised = require('chai-as-promised');
chai.use(promised);
var expect = chai.expect;

describe('Angular Sails Models', function() {
  before(function() {
    browser.get('http://localhost:3000');
  });
  require('./_simple');
  require('./_get');
});
