module.exports = function(app) {
  app.controller('populate', ['$scope', '$sails',
  'User', 'Address',
  function($scope, $sails,
    User, Address) {
      User.getAll().then(function() {
        $scope.users = User.items;
      });

      Address.getAll().then(function() {
        $scope.addresses = Address.items;
      });

      $scope.newUser = {
        name: '',
        age: '',
        city: ''
      };

      $scope.newAddress = {
        city: '',
        street: '',
        building: ''
      };

      $scope.create = function() {
        User.create({
          name: $scope.newUser.name,
          age: $scope.newUser.age,
          city: $scope.newUser.city
        }).then(function() {}).catch(function(err) {
          console.log(err);
        });
      };

      $scope.createAddress = function() {
        console.log(1);
        Address.create({
          city: $scope.newAddress.city,
          street: $scope.newAddress.street,
          building: $scope.newAddress.building
        }).then(function(res) {
          console.log(res);
        }).catch(function(err) {
          console.log(err);
        });
      };

      $scope.updateAddress = function(item) {
        Address.update({
          id: item.id,
          city: item.city,
          street: item.street,
          building: item.building
        }).then(function() {
        }).catch(function(err) {
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

      $scope.populateAddress = function(item) {
        Address.populate(item, 'Address', {'city': item.city});
      };
    }]);
  };
