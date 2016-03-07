var chai = require('chai')
  , promised = require('chai-as-promised');
chai.use(promised);
var expect = chai.expect;

describe('Populate', function() {
  it('create ', function() {
    var parent = element(by.css('.link'));
    var inputName = parent.element(by.model('newUser.name'));
    var inputAge = parent.element(by.model('newUser.age'));
    var inputCity = parent.element(by.model('newUser.city'));
    var create_btn = parent.element(by.css('.create_user'));

    inputName.clear();
    inputName.sendKeys('Sheldon');
    inputAge.clear();
    inputAge.sendKeys('23');
    inputCity.clear();
    inputCity.sendKeys('Texas');
    create_btn.click();

    var count_users = element.all(by.css('.link table.users tr')).count();
    expect(count_users).to.eventually.equal(1);

    var inputCity = parent.element(by.model('newAddress.city'));
    var inputStreet = parent.element(by.model('newAddress.street'));
    var inputBuilding = parent.element(by.model('newAddress.building'));
    create_btn = parent.element(by.css('.create_address'));

    inputCity.clear();
    inputCity.sendKeys('Texas');
    inputStreet.clear();
    inputStreet.sendKeys('Sheldon`s street');
    inputBuilding.clear();
    inputBuilding.sendKeys('71');
    create_btn.click();

    var count_element = element.all(by.css('.link table.addresses tr')).count();
    expect(count_element).to.eventually.equal(1);
  });

  it('should populate address in user by city field', function() {
    element(by.css('.link table.users tr:nth-child(1) .populate_btn')).click();
    expect(element(by.css('.link table.users tr:nth-child(1) td:nth-child(4)')).getText()).to.eventually.equal('Texas');
    expect(element(by.css('.link table.users tr:nth-child(1) td:nth-child(5)')).getText()).to.eventually.equal('Sheldon`s street');
    expect(element(by.css('.link table.users tr:nth-child(1) td:nth-child(6)')).getText()).to.eventually.equal('71');
  });

  it('should update address and user.Address would be updated too', function() {
    var parent = element(by.css('.link'));
    var inputCity = parent.element(by.model('address.city'));
    var inputStreet = parent.element(by.model('address.street'));
    var inputBuilding = parent.element(by.model('address.building'));
    var update_btn = parent.element(by.css('table.addresses tr .update_btn'));

    inputCity.clear();
    inputCity.sendKeys('Texas');
    inputStreet.clear();
    inputStreet.sendKeys('Leonard`s street');
    inputBuilding.clear();
    inputBuilding.sendKeys('28');
    update_btn.click();

    expect(element(by.css('.link table.users tr:nth-child(1) td:nth-child(5)')).getText()).to.eventually.equal('Leonard`s street');
    expect(element(by.css('.link table.users tr:nth-child(1) td:nth-child(6)')).getText()).to.eventually.equal('28');
  });

  it('shoutd clear all', function() {
    element(by.css('table.users tr .delete_btn')).click();
    var count_users = element.all(by.css('.link table.users tr')).count();
    expect(count_users).to.eventually.equal(0);

    element(by.css('table.addresses tr .delete_btn')).click();
    var count_addresses = element.all(by.css('.link table.addresses tr')).count();
    expect(count_addresses).to.eventually.equal(0);
  });
});
