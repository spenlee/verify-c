'use strict';

angular.module('app.main-menu', [])
  .component('mainMenuView', {
    controllerAs: 'mainMenu',
    bindings: {},
    controller: MainViewController,
    templateUrl: 'mainMenu/mainMenu.html'
  });

MainViewController.$inject = ['RestService', 'ConstantsService'];
function MainViewController(RestService, ConstantsService) {
  var vm = this;
  vm.title = 'MENU';
  RestService.getUsers()
    .then(function(res) {
      vm.users = res.data.data;
    });

  vm.logOut = function() {
    RestService.getLogout()
      .then(function(res) {
        ConstantsService.toast(res.data.message, 'top center');
        ConstantsService.removeCurrentUser();
        // reload, since $location won't change path
        ConstantsService.reloadUrlToPath('#/login');
      });
  };
}
