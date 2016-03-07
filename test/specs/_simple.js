var chai = require('chai')
  , promised = require('chai-as-promised');
chai.use(promised);
var expect = chai.expect;

describe('Simple Actions', function() {

  it('items should be 0', function() {
    var count_element = element.all(by.css('.simple_actions table tr')).count();
    expect(count_element).to.eventually.equal(0);
  });

  it('should create first item', function() {
    var parent = element(by.css('.simple_actions'));
    var inputName = parent.element(by.model('newUser.name'));
    inputName.clear();
    inputName.sendKeys('Bob');
    var inputAge = parent.element(by.model('newUser.age'));
    inputAge.clear();
    inputAge.sendKeys('18');
    element(by.css('.simple_actions .create_btn')).click();
    var count_element = element.all(by.css('.simple_actions table tr')).count();
    expect(count_element).to.eventually.equal(1);
  });

  it('should create second item', function() {
    var parent = element(by.css('.simple_actions'));
    var inputName = parent.element(by.model('newUser.name'));
    inputName.clear();
    inputName.sendKeys('Frank');
    var inputAge = parent.element(by.model('newUser.age'));
    inputAge.clear();
    inputAge.sendKeys('40');
    element(by.css('.simple_actions .create_btn')).click();
    var count_element = element.all(by.css('.simple_actions table tr')).count();
    expect(count_element).to.eventually.equal(2);
  });

  it('should update first item', function() {
    var inputNameSelector = '.simple_actions tr:nth-child(1) td:nth-child(1) input';
    var inputName = element(by.css(inputNameSelector));
    inputName.clear();
    inputName.sendKeys('Alice');
    var inputAgeSelector = '.simple_actions tr:nth-child(1) td:nth-child(2) input';
    var inputAge = element(by.css(inputAgeSelector));
    inputAge.clear();
    inputAge.sendKeys('23');
    element(by.css('.simple_actions tr:nth-child(1) .update_btn')).click();
    browser.refresh();
    inputName = element(by.css(inputNameSelector));
    expect(inputName.getAttribute('value')).to.eventually.equal('Alice');
    inputAge = element(by.css(inputAgeSelector));
    expect(inputAge.getAttribute('value')).to.eventually.equal('23');
  });

  it('should force update first item', function() {
    element(by.css('.simple_actions tr:nth-child(1) .force_update_btn')).click();
    var inputNameSelector = '.simple_actions tr:nth-child(1) td:nth-child(1) input';
    var inputAgeSelector = '.simple_actions tr:nth-child(1) td:nth-child(2) input';
    var inputName = element(by.css(inputNameSelector));
    expect(inputName.getAttribute('value')).to.eventually.equal('Frank');
    var inputAge = element(by.css(inputAgeSelector));
    expect(inputAge.getAttribute('value')).to.eventually.equal('58');
  });

  it('should post to changeCity by first item', function() {
    element(by.css('.simple_actions tr:nth-child(1) .change_city_btn')).click();
    var city = element(by.css('.simple_actions tr:nth-child(1)')).element(by.binding('user.city'));
    expect(city.getText()).to.eventually.equal('Kursk');
  });

  it('should update second item', function() {
    var inputNameSelector = '.simple_actions tr:nth-child(2) td:nth-child(1) input';
    var inputName = element(by.css(inputNameSelector));
    inputName.clear();
    inputName.sendKeys('Tayler');
    var inputAgeSelector = '.simple_actions tr:nth-child(2) td:nth-child(2) input';
    var inputAge = element(by.css(inputAgeSelector));
    inputAge.clear();
    inputAge.sendKeys('28');
    element(by.css('.simple_actions tr:nth-child(2) .update_btn')).click();
    browser.refresh();
    inputName = element(by.css(inputNameSelector));
    expect(inputName.getAttribute('value')).to.eventually.equal('Tayler');
    inputAge = element(by.css(inputAgeSelector));
    expect(inputAge.getAttribute('value')).to.eventually.equal('28');
  });

  it('should delete first item', function() {
    element(by.css('.simple_actions tr:nth-child(1) .delete_btn')).click();
    var count_element = element.all(by.css('.simple_actions table tr')).count();
    expect(count_element).to.eventually.equal(1);
  });

  it('should delete second item', function() {
    element(by.css('.simple_actions tr:nth-child(1) .delete_btn')).click();
    var count_element = element.all(by.css('.simple_actions table tr')).count();
    expect(count_element).to.eventually.equal(0);
  });
});
