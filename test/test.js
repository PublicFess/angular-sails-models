describe('MyController', function(){
	beforeEach(module('test-models'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('ctrl', { $scope: $scope });
      expect($scope.getName()).to.be.equal('Nikita');
    });
  });
});
