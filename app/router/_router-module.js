'use strict';

angular.module('app.router', ['ui.router'])
.config(Config);

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login-view></login-view>',
      data: {
        'requireLogin': false
      }
    })
    .state('sign-up', {
      url: '/sign-up',
      template: '<sign-up-view></sign-up-view>',
      data: {
        'requireLogin': false
      }
    })
    .state('app', { // apply login to all children
      abstract: true,
      template: '<ui-view></ui-view>', // necessary for abstract
      data: {
        'requireLogin': true
      }
    })
    .state('app.mainMenu', {
      url: '/',
      template: '<main-menu-view></main-menu-view>'
    })
    .state('app.team', {
      url: '/team',
      templateUrl: 'team/team.html'
    })
    .state('app.tutorial', {
      url: '/tutorial',
      templateUrl: 'tutorial/tutorial.html'
    })
    .state('app.work', {
      url: '/work',
      templateUrl: 'work/work.html'
    })
    .state('app.settings', {
      url: '/settings',
      template: '<settings-view></settings-view>'
    });
}
