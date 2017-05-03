'use strict';

angular.module('app.services')
  .factory('RestService', RestService);

RestService.$inject = ['$http', 'ConstantsService'];
function RestService($http, ConstantsService) {

  var postEvents = function(data) {
    return $http.post(ConstantsService.getUrl() + '/events', data);
  };

  var getEvents = function(config) {
    return $http.get(ConstantsService.getUrl() + '/events', config);
  };

  var clearEventsByUser = function(userID, data) {
    return $http.put(ConstantsService.getUrl() + '/users' + '/' + userID + '/clear-events', data);
  };

  var getEventsByUser = function(userID, currentBoolean, config) {
    return $http.get(ConstantsService.getUrl() + '/users' + '/' + userID + '/events' + '/' + currentBoolean, config);
  };

  var postResponses = function(data) {
    return $http.post(ConstantsService.getUrl() + '/responses', data);
  };

  var postSignUp = function(user) {
    return $http.post(ConstantsService.getUrl() + '/sign-up', user);
  };
  var postLogin = function(user) {
    return $http.post(ConstantsService.getUrl() + '/login', user);
  };

  var getLogout = function() {
    return $http.get(ConstantsService.getUrl() + '/logout');
  };

  return {
    'postEvents': postEvents,
    'getEvents': getEvents,
    'clearEventsByUser': clearEventsByUser,
    'getEventsByUser': getEventsByUser,
    'postResponses': postResponses,
    'postSignUp': postSignUp,
    'postLogin': postLogin,
    'getLogout': getLogout
  };
}
