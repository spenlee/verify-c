'use strict';

angular.module('app.sign-up', [])
  .component('signUpView', {
    controllerAs: 'signUp',
    bindings: {},
    controller: SignUpViewController,
    templateUrl: 'sign-up/sign-up.html'
  });

SignUpViewController.$inject = ['RestService'];
function SignUpViewController(RestService) {
  var vm = this;
  vm.title = 'LOGIN';
  // RestService.getUsers()
  //   .then(function(res) {
  //     vm.users = res.data;
  //   });

  // post login info. get validation.
}
