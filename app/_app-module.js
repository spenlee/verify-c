'use strict';

angular.module('app', [
  'ngAnimate',
  'ngMessages',
  'app.templates',
  'app.router',
  'app.main-menu', // menu
  'app.login',
  'app.team',
  'app.tutorial',
  'app.work',
  'app.settings',
  'app.services',
  'ngMaterial'
]).run(['$window', '$rootScope', '$state', function($window, $rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    var currentUser = $window.sessionStorage.currentUser;

    // if (requireLogin && !currentUser) {
    //   event.preventDefault();
    //   // login required page
    //   console.log('LOGIN!!!!!');

    //   return $state.go(toState.name, toParams);
    // }
  });
}]);
