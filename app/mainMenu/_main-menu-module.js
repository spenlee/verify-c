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

  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById('myBtn');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];

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
  // When the user clicks on the button, open the modal 
  vm.modal = function() {
    modal.style.display = 'block';
  };

  // When the user clicks on <span> (x), close the modal
  vm.close = function() {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

}
