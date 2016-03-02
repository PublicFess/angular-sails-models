var chai = require('chai')
  , promised = require('chai-as-promised');
chai.use(promised);
var expect = chai.expect;

describe('Angular Sails Models', function() {
  beforeEach(function() {
    browser.get('http://localhost:3000');
  });
  describe('Simple Actions', function() {

    it('items should be 0', function() {
      var count_element = element.all(by.css('.simple_actions table tr')).count();
      expect(count_element).to.eventually.equal(0);
    });

    it('should create new item', function() {
      var inputName = element(by.model('newUser.name'));
      inputName.clear();
      inputName.sendKeys('Bob');
      var inputAge = element(by.model('newUser.age'));
      inputAge.clear();
      inputAge.sendKeys('18');
      element(by.css('.simple_actions .create_btn')).click();
      var count_element = element.all(by.css('.simple_actions table tr')).count();
      expect(count_element).to.eventually.equal(1);
    });

    it('should delete item', function() {
      element(by.css('.delete_btn')).click();
      var count_element = element.all(by.css('.simple_actions table tr')).count();
      expect(count_element).to.eventually.equal(0);
    });
  });

});
