'use strict';

angular.module('app.router', ['ui.router'])
.config(Config);

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('mainMenu', {
      url: '/',
      template: '<main-menu-view></main-menu-view>'
    });
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html'
    });
  $stateProvider
    .state('team', {
      url: '/team',
      templateUrl: 'team/team.html'
    });
  $stateProvider
    .state('tutorial', {
      url: '/tutorial',
      templateUrl: 'tutorial/tutorial.html'
    });
  $stateProvider
    .state('work', {
      url: '/work',
      templateUrl: 'work/work.html'
    });
  $stateProvider
    .state('settings', {
      url: '/settings',
      template: '<settings-view></settings-view>'
    });
}
