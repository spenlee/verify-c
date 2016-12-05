'use strict';

angular.module('app.login', [])
  .component('loginView', {
    controllerAs: 'login',
    bindings: {},
    controller: LoginViewController,
    templateUrl: 'login/login.html'
  });

LoginViewController.$inject = ['RestService', 'ConstantsService'];
function LoginViewController(RestService, ConstantsService) {
  var vm = this;

  vm.attemptLogin = function() {
    RestService.postLogin({'email': vm.userAttempt.email, 'password': vm.userAttempt.password})
      .then(function(res) {
        ConstantsService.toast(res.data.message, 'top center');
        ConstantsService.setCurrentUser(res.data.data);
        // go to main menu, successful user
        ConstantsService.redirectUrl('#/');
      })
      .catch(function(err) {
        ConstantsService.displayError(err, 'top center')
      });
  };
}
