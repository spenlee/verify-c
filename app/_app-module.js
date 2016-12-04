'use strict';

angular.module('app', [
  'ngAnimate',
  'ngMessages',
  'app.templates',
  'app.router',
  'app.main-menu', // menu
  'app.login',
  'app.sign-up',
  'app.team',
  'app.tutorial',
  'app.work',
  'app.settings',
  'app.services',
  'ngMaterial'
]).run([
  '$window',
  '$rootScope',
  '$state',
  'ConstantsService',
  function($window,
    $rootScope,
    $state,
    ConstantsService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      var currentUser = $window.sessionStorage.currentUser;

      if (requireLogin && !currentUser) {
        event.preventDefault();
        ConstantsService.toast('Please login', 'top center');
        return $state.go('login');
      }
    });
}]);
