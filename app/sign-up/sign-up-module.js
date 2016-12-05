'use strict';

angular.module('app.sign-up', [])
  .component('signUpView', {
    controllerAs: 'signUp',
    bindings: {},
    controller: SignUpViewController,
    templateUrl: 'sign-up/sign-up.html'
  });

SignUpViewController.$inject = ['RestService', 'ConstantsService'];
function SignUpViewController(RestService, ConstantsService) {
  var vm = this;
  vm.duplicateEmails = {};
  vm.attemptSignUp = function() {
    RestService.postSignUp({'email': vm.newUser.email, 'password': vm.newUser.password})
      .then(function(res) {
        ConstantsService.toast(res.data.message, 'top center');
        ConstantsService.setCurrentUser(res.data);
      })
      .catch(function(err) {
        ConstantsService.displayError(err, 'top center');
        vm.duplicateEmails[vm.newUser.email] = true;
      });
  }
}
