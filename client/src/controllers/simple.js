module.exports = function(app) {
  app.controller('simple', ['$scope', '$sails', 'User', function($scope, $sails, User) {

    User.getAll().then(function(res) {
      $scope.users = res;
    });

    $scope.create = function() {
      User.create({name:'Alice', age: '23'}).then(function() {
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
