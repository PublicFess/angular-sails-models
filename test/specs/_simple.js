var chai = require('chai')
  , promised = require('chai-as-promised');
chai.use(promised);
var expect = chai.expect;

describe.only('Simple Actions', function() {

  it('items should be 0', function() {
    var count_element = element.all(by.css('.users tr')).count();
    expect(count_element).to.eventually.equal(0);
  });

  it('should create first item', function() {
    var parent = element(by.css('.create_user'));
    var inputName = parent.element(by.model('newUser.name'));
    inputName.clear();
    inputName.sendKeys('Bob');
    var inputAge = parent.element(by.model('newUser.age'));
    inputAge.clear();
    inputAge.sendKeys('18');
    parent.element(by.tagName('button')).click();
    var count_element = element.all(by.css('.users tr')).count();
    expect(count_element).to.eventually.equal(1);
  });

  it('should create second item', function() {
    var parent = element(by.css('.create_user'));
    var inputName = parent.element(by.model('newUser.name'));
    inputName.clear();
    inputName.sendKeys('Frank');
    var inputAge = parent.element(by.model('newUser.age'));
    inputAge.clear();
    inputAge.sendKeys('40');
    parent.element(by.tagName('button')).click();
    var count_element = element.all(by.css('.users tr')).count();
    expect(count_element).to.eventually.equal(2);
  });

  it('should update first item', function() {
    element(by.css('.users tr:nth-child(1) .update_user')).click();
    var parent = element(by.css('.save_user'));
    var inputName = parent.element(by.model('updatingUser.name'));
    inputName.clear();
    inputName.sendKeys('Alice');
    var inputAge = parent.element(by.model('updatingUser.age'));
    inputAge.clear();
    inputAge.sendKeys('23');
    parent.element(by.tagName('button')).click();
    browser.refresh();
    expect(element(by.css('.users tr:nth-child(1) td:nth-child(1)')).getText()).to.eventually.equal('Alice');
    expect(element(by.css('.users tr:nth-child(1) td:nth-child(2)')).getText()).to.eventually.equal('23');
  });

  it('should post to changeCity by first item', function() {
    element(by.css('.users tr:nth-child(1) .change_city')).click();
    var city = element(by.css('.users tr:nth-child(1)')).element(by.binding('user.city'));
    expect(city.getText()).to.eventually.equal('Kursk');
  });

  it('should delete first item', function() {
    element(by.css('.users tr:nth-child(1) .delete_user')).click();
    var count_element = element.all(by.css('.users tr')).count();
    expect(count_element).to.eventually.equal(1);
  });

  it('should delete second item', function() {
    element(by.css('.users tr:nth-child(1) .delete_user')).click();
    var count_element = element.all(by.css('.users tr')).count();
    browser.sleep(300);
    expect(count_element).to.eventually.equal(0);
  });
});
