var chai = require('chai')
  , promised = require('chai-as-promised');
chai.use(promised);
var expect = chai.expect;

describe('Angular Sails Models', function() {
  describe('Simple Actions', function() {
    it('should create a new item', function() {
      browser.get('http://localhost:3000');
      var simple = element(by.className('simple_actions'));
      var count_element = element.all(by.css('.simple_actions table tr')).count();
      expect(count_element).to.eventually.equal(0);
    });
  });

});
