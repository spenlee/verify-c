'use strict';

angular.module('app.services')
  .factory('RestService', RestService);

RestService.$inject = ['$http', 'ConstantsService', '$cacheFactory'];
function RestService($http, ConstantsService, $cacheFactory) {

  var $httpCache = $cacheFactory.get('$http');

  var postEvents = function(data) {
    return $http.post(ConstantsService.getUrl() + '/events', data);
  };

  var getEvents = function(config) {
    return $http.get(ConstantsService.getUrl() + '/events', config);
  };

  var clearEventsByUser = function(userID, data) {
    return $http.put(ConstantsService.getUrl() + '/users/' + userID + '/clear-events', data);
  };

  var removeCache = function(request) {
    $httpCache.remove(request);
  };

  var getEventsByUserURL = function(userID, currentBoolean) {
    return ConstantsService.getUrl() + '/users/' + userID + '/events/' + currentBoolean;
  };

  var getEventsByUser = function(userID, currentBoolean) {
    return $http({
      'method': 'GET',
      'url': ConstantsService.getUrl() + '/users/' + userID + '/events/' + currentBoolean,
      'cache': true // cache get results
    });
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

  var populateEventsForUser = function(userID) {
    return $http.put(ConstantsService.getUrl() + '/events/' + userID);
  };  

  return {
    'postEvents': postEvents,
    'getEvents': getEvents,
    'clearEventsByUser': clearEventsByUser,
    'getEventsByUser': getEventsByUser,
    'postResponses': postResponses,
    'postSignUp': postSignUp,
    'postLogin': postLogin,
    'getLogout': getLogout,
    'populateEventsForUser': populateEventsForUser,
    'removeCache': removeCache,
    'getEventsByUserURL': getEventsByUserURL
  };
}
