module.exports = function(app) {
  app.controller('simple', ['$scope', '$sails', 'User', function($scope, $sails, User) {

    User.getAll().then(function() {
      $scope.users = User.items;
    });

    $scope.newUser = {
      name: 'Alice',
      age: 23
    };

    $scope.create = function() {
      User.create({
        name: $scope.newUser.name,
        age: $scope.newUser.age
      }).then(function() {}).catch(function(err) {
        console.log(err);
      });
    };

    $scope.update = function(item) {
      User.update({
        id: item.id,
        name: item.name,
        age: item.age
      }).then(function() {
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.delete = function(item) {
      User.delete(item).then(function() {
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.findByAge = function() {
      User.getAll({age: '23'}).then(function() {
        $scope.users = User.items;
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.findOneByAge = function() {
      User.getOne({age: '23'}).then(function(res) {
        $scope.user = res;
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.resetCriteria = function() {
      User.getAll().then(function() {
      }).catch(function(err) {
        console.log(err);
      });
    };
  }]);
};
