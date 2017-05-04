'use strict';

angular.module('app.sign-up', [])
  .component('signUpView', {
    controllerAs: 'signUp',
    bindings: {},
    controller: SignUpViewController,
    templateUrl: 'sign-up/sign-up.html'
  });

SignUpViewController.$inject = ['RestService', 'ConstantsService', '$location'];
function SignUpViewController(RestService, ConstantsService, $location) {
  var vm = this;
  vm.duplicateEmails = {};
  vm.attemptSignUp = function() {
    RestService.postSignUp({'email': vm.newUser.email, 'password': vm.newUser.password})
      .then(function(res) {
        ConstantsService.toast(res.data.message, 'top center');
        ConstantsService.setCurrentUser(res.data.data);
        // go to main menu, successful user

        // loading events
        ConstantsService.displayError('Loading...', 'top center');        
        // New RestService request here -- populateEventsForUserPUT
        vm.userID = ConstantsService.getCurrentUser()._id;
        RestService.populateEventsForUser(vm.userID)
          .then(function(res) {
            // events loaded
            ConstantsService.redirectUrl('#!/');          
          })
          .catch(function(err) {
            console.log(err);
          });
      })
      .catch(function(err) {
        ConstantsService.displayError(err, 'top center');
        vm.duplicateEmails[vm.newUser.email] = true;
      });
  };
}
