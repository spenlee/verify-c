'use strict';

angular.module('app.settings', [])
  .component('settingsView', {
    controllerAs: 'settings',
    bindings: {},
    controller: SettingsViewController,
    templateUrl: 'settings/settings.html'
  });

SettingsViewController.$inject = ['ConstantsService'];
function SettingsViewController(ConstantsService) {
  var vm = this;
  vm.url = ConstantsService.getUrl();

  vm.setUrl = function() {
    ConstantsService.setUrl(vm.url);
  };

  vm.showUrlToast = function() {
    ConstantsService.toast('Base URL Set!', 'top center');
  };
}
