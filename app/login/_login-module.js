'use strict';

angular.module('app.login', [])
  .component('loginView', {
    controllerAs: 'login',
    bindings: {},
    controller: LoginViewController,
    templateUrl: 'login/login.html'
  });

LoginViewController.$inject = ['RestService'];
function LoginViewController(RestService) {
  var vm = this;
  vm.title = 'LOGIN';
  // RestService.getUsers()
  //   .then(function(res) {
  //     vm.users = res.data;
  //   });

  // post login info. get validation.
}
