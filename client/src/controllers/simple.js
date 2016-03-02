module.exports = function(app) {
  app.controller('simple', ['$scope', 'User', function($scope, User) {

    $scope.create = function() {
      User.create({name:'Alice', age: '23'}).then(function(res) {
        console.log(res);
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.findByAge = function() {
      User.getAll({age: '23'}).then(function(res) {
        console.log(res);
      }).catch(function(err) {
        console.log(err);
      });
    };
  }]);
};
