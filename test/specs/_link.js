var chai = require('chai')
  , promised = require('chai-as-promised');
chai.use(promised);
var expect = chai.expect;

describe('Linking', function() {
  it('create ', function() {
    var parent = element(by.css('.create_user'));
    var inputName = parent.element(by.model('newUser.name'));
    var inputAge = parent.element(by.model('newUser.age'));
    var inputCity = parent.element(by.model('newUser.city'));
    var create_btn = parent.element(by.tagName('button'));

    inputName.clear();
    inputName.sendKeys('Sheldon');
    inputAge.clear();
    inputAge.sendKeys('23');
    inputCity.clear();
    inputCity.sendKeys('Texas');
    create_btn.click();

    var count_users = element.all(by.css('.users tr')).count();
    expect(count_users).to.eventually.equal(1);

    parent = element(by.css('.create_address'));
    var inputCity = parent.element(by.model('newAddress.city'));
    var inputStreet = parent.element(by.model('newAddress.street'));
    var inputBuilding = parent.element(by.model('newAddress.building'));
    create_btn = parent.element(by.tagName('button'));

    inputCity.clear();
    inputCity.sendKeys('Texas');
    inputStreet.clear();
    inputStreet.sendKeys('Sheldon`s street');
    inputBuilding.clear();
    inputBuilding.sendKeys('71');
    create_btn.click();

    var count_element = element.all(by.css('.addresses tr')).count();
    expect(count_element).to.eventually.equal(1);
  });

  it('should linking addresses to user', function() {
    element(by.css('.find_one_by_age')).click();
    element(by.css('.user tr:nth-child(1) .link_user')).click();
    expect(element(by.css('.user tr:nth-child(2) td:nth-child(2)'))
      .getText()).to.eventually.equal('Sheldon`s street');
  });

  it('should create address and then it should be added to user.Addresses', function() {
    var parent = element(by.css('.create_address'));
    var inputCity = parent.element(by.model('newAddress.city'));
    var inputStreet = parent.element(by.model('newAddress.street'));
    var inputBuilding = parent.element(by.model('newAddress.building'));
    create_btn = parent.element(by.tagName('button'));

    inputCity.clear();
    inputCity.sendKeys('New Jersey');
    inputStreet.clear();
    inputStreet.sendKeys('Leonard`s street');
    inputBuilding.clear();
    inputBuilding.sendKeys('28');
    create_btn.click();

    expect(element.all(by.css('.addresses tr')).count()).to.eventually.equal(2);
    expect(element(by.css('.user tr:nth-child(2) td:nth-child(2)'))
      .getText()).to.eventually.equal('Sheldon`s street');
    expect(element(by.css('.user tr:nth-child(3) td:nth-child(2)'))
      .getText()).to.eventually.equal('Leonard`s street');
  });

  it('should clear all', function() {
    element(by.css('.users tr .delete_user')).click();
    browser.sleep(100).then(function() {
      expect(element.all(by.css('.users tr')).count()).to.eventually.equal(0);
      element(by.css('.addresses tr .delete_address')).click();
      return browser.sleep(100);
    }).then(function() {
      expect(element.all(by.css('.addresses tr')).count()).to.eventually.equal(1);
      element(by.css('.addresses tr .delete_address')).click();
      return browser.sleep(100);
    }).then(function() {
      expect(element.all(by.css('.addresses tr')).count()).to.eventually.equal(0);
    });
  });
});
