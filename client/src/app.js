(function(){

  var app = angular.module('test-models', ['ngSails']);

  app.config([
    '$sailsProvider',
    function($sailsProvider) {
      $sailsProvider.url = 'http://127.0.0.1:1337';
    }
  ]);

  require('./models/UserModel')(app);
  require('./controllers/simple')(app);

})();
