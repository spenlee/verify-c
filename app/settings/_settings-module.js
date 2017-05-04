'use strict';

angular.module('app.settings', [])
  .component('settingsView', {
    controllerAs: 'settings',
    bindings: {},
    controller: SettingsViewController,
    templateUrl: 'settings/settings.html'
  });

SettingsViewController.$inject = ['ConstantsService', 'RestService'];
function SettingsViewController(ConstantsService, RestService) {
  var vm = this;
  vm.url = ConstantsService.getUrl();

  vm.setUrl = function() {
    ConstantsService.setUrl(vm.url);
  };

  vm.showUrlToast = function() {
    ConstantsService.toast('Base URL Set!', 'top center');
  };

  vm.logOut = function() {
    RestService.getLogout()
    .then(function(res) {
      ConstantsService.toast(res.data.message, 'top center');
      ConstantsService.removeCurrentUser();
        // reload, since $location won't change path
        ConstantsService.reloadUrlToPath('#!/login');
      });
  };

}
