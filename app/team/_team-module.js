'use strict';

angular.module('app.team', [])
  .component('teamView', {
    controllerAs: 'team',
    bindings: {},
    controller: teamViewController,
    templateUrl: 'team/team.html'
  });

teamViewController.$inject = ['RestService', 'ConstantsService'];
function teamViewController(RestService, ConstantsService) {
  var vm = this;
  vm.index=0;

  RestService.getUsers()
  .success(function(raw_data) {
  	console.log(raw_data);
    vm.llamas = raw_data.data;
  })
  .error(function(err) {
    ConstantsService.displayError(err, 'top center');
  });

  vm.attemptLogin = function() {
    RestService.postLogin({'email': vm.userAttempt.email, 'password': vm.userAttempt.password})
      .then(function(res) {
        ConstantsService.toast(res.data.message, 'top center');
        ConstantsService.setCurrentUser(res.data.data);
        // go to main menu, successful user
        ConstantsService.redirectUrl('#/');
      })
      .catch(function(err) {
        ConstantsService.displayError(err, 'top center');
      });
  };
}
