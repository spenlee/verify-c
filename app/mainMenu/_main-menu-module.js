'use strict';

angular.module('app.main-menu', [])
  .component('mainMenuView', {
    controllerAs: 'menu',
    bindings: {},
    controller: MainViewController,
    templateUrl: 'mainMenu/mainMenu.html'
  });

MainViewController.$inject = ['RestService'];
function MainViewController(RestService) {
  var vm = this;
  vm.title = 'MENU';
  RestService.getUsers()
    .then(function(res) {
      vm.users = res.data;
    });
}
