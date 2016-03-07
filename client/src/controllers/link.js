var link = function (app) {
  app.controller('link', ['$scope', '$sails',
  'User', 'Address',
  function($scope, $sails,
    User, Address) {

      $scope.users = User.items;
      $scope.prepareData = function() {
        User.create({
          name: 'Alice',
          age: '23',
          city: 'Kursk'
        }).then(function() {
          return Address.create({
            city: 'Kursk',
            street: 'Lenina',
            building: '1'
          });
        }).then(function() {
          return Address.create({
            city: 'Kursk',
            street: 'Lenina',
            building: '2'
          });
        }).catch(function(err) {
          console.log(err);
        });
      };

      $scope.linkUser = function() {
        Address.link($scope.users[0], 'Addresses', {});
      };

    }]);
  };

  module.exports = link;
