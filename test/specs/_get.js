var chai = require('chai')
  , promised = require('chai-as-promised');
chai.use(promised);
var expect = chai.expect;

describe('Get Actions', function() {
  it('create ', function() {
    var parent = element(by.css('.simple_actions'));
    var inputName = parent.element(by.model('newUser.name'));
    var inputAge = parent.element(by.model('newUser.age'));
    var create_btn = element(by.css('.simple_actions .create_btn'));

    inputName.clear();
    inputName.sendKeys('Bob');
    inputAge.clear();
    inputAge.sendKeys('23');
    create_btn.click();

    inputName.clear();
    inputName.sendKeys('Frank');
    inputAge.clear();
    inputAge.sendKeys('23');
    create_btn.click();

    inputName.clear();
    inputName.sendKeys('Alice');
    inputAge.clear();
    inputAge.sendKeys('24');
    create_btn.click();

    inputName.clear();
    inputName.sendKeys('Any');
    inputAge.clear();
    inputAge.sendKeys('24');
    create_btn.click();

    inputName.clear();
    inputName.sendKeys('Leo');
    inputAge.clear();
    inputAge.sendKeys('25');
    create_btn.click();

    inputName.clear();
    inputName.sendKeys('Penny');
    inputAge.clear();
    inputAge.sendKeys('25');
    create_btn.click();

    var count_element = element.all(by.css('.simple_actions table tr')).count();
    expect(count_element).to.eventually.equal(6);
  });

  it('should get 2 user by 23 age', function() {
    element(by.css('.find_by_age')).click();
    var count_element = element.all(by.css('.simple_actions table tr')).count();
    expect(count_element).to.eventually.equal(2);
  });

  it('should get first user by 23 age', function() {
    element(by.css('.find_one_by_age')).click();
    var parent = element(by.css('.simple_actions'));
    var name = parent.element(by.binding('user.name'));
    expect(name.getText()).to.eventually.equal('Bob');
  });

  it('should clean model item after destroy element', function() {
    element(by.css('.simple_actions tr:nth-child(1) .delete_btn')).click();
    var parent = element(by.css('.simple_actions'));
    var name = parent.element(by.binding('user.name'));
    expect(name.getText()).to.eventually.equal('');
  });

  it('should clean all', function() {
    element(by.css('.reset_criteria')).click();
    element(by.css('.simple_actions tr:nth-child(1) .delete_btn')).click();
    var count_element = element.all(by.css('.simple_actions table tr')).count();
    browser.refresh();
    expect(count_element).to.eventually.equal(4);
    element(by.css('.simple_actions tr:nth-child(1) .delete_btn')).click();
    count_element = element.all(by.css('.simple_actions table tr')).count();
    browser.refresh();
    expect(count_element).to.eventually.equal(3);
    element(by.css('.simple_actions tr:nth-child(1) .delete_btn')).click();
    count_element = element.all(by.css('.simple_actions table tr')).count();
    browser.refresh();
    expect(count_element).to.eventually.equal(2);
    element(by.css('.simple_actions tr:nth-child(1) .delete_btn')).click();
    count_element = element.all(by.css('.simple_actions table tr')).count();
    browser.refresh();
    expect(count_element).to.eventually.equal(1);
    element(by.css('.simple_actions tr:nth-child(1) .delete_btn')).click();
    count_element = element.all(by.css('.simple_actions table tr')).count();
    browser.refresh();
    expect(count_element).to.eventually.equal(0);
  });
});
