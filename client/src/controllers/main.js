var main = function(app) {
  app.controller('main', ['$scope', 'User', 'Address', function($scope, User, Address) {
    $scope.users = User.items;
    $scope.addresses = Address.items;
    User.getAll();
    Address.getAll();

    $scope.newUser = {
      name: 'Alice',
      age: 23
    };

    $scope.newAddress = {
      city: 'Kanzas',
      street: 'Street',
      building: '1'
    };

    $scope.createUser = function() {
      User.create({
        name: $scope.newUser.name,
        age: $scope.newUser.age,
        city: $scope.newUser.city
      }).then(function() {}).catch(function(err) {
        console.log(err);
      });
    };

    $scope.createAddress = function() {
      Address.create({
        city: $scope.newAddress.city,
        street: $scope.newAddress.street,
        building: $scope.newAddress.building
      }).then(function(res) {console.log(res);}).catch(function(err) {
        console.log(err);
      });
    };

    $scope.updateUser = function(item) {
      $scope.updatingUser = {
        id: item.id,
        name: item.name,
        age: item.age,
        city: item.city
      };
    };

    $scope.changeCity = function(item) {
      User.post('/changeCity/' + item.id).then(function() {
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.updateAddress = function(item) {
      $scope.updatingAddress = {
        id: item.id,
        city: item.city,
        street: item.street,
        building: item.building
      };
    };

    $scope.saveUser = function() {
      User.update($scope.updatingUser).then(function() {}).catch(function(err) {
        console.log(err);
      });
    };

    $scope.saveAddress = function() {
      Address.update($scope.updatingAddress).then(function() {}).catch(function(err) {
        console.log(err);
      });
    };

    $scope.deleteUser = function(item) {
      User.destroy(item).then(function() {}).catch(function(err) {
        console.log(err);
      });
    };

    $scope.deleteAddress = function(item) {
      Address.destroy(item).then(function() {}).catch(function(err) {
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

    $scope.populateAddress = function(item) {
      Address.populate(item, 'Address', {'city': item.city});
    };

    $scope.linkUserWithAddresses = function(item) {
      Address.linkItem(item, 'Addresses', {});
    };
  }]);
};

module.exports = main;
