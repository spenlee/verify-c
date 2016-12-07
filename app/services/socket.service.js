'use strict';

angular.module('app.services')
  .factory('SocketService', SocketService);

SocketService.$inject = ['socketFactory'];
function SocketService(socketFactory) {
  return socketFactory();
}
