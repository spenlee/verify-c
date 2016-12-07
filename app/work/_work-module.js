'use strict';

angular.module('app.work', [])
  .component('messagesView', {
    controllerAs: 'messages',
    bindings: {},
    controller: MessagesViewController,
    templateUrl: 'work/messagesView.html'
  });

MessagesViewController.$inject = ['RestService', 'ConstantsService', 'SocketService'];
function MessagesViewController(RestService, ConstantsService, SocketService) {
  var vm = this;

  SocketService.on('newMessage', function(data) {
    vm.messages = data;
    ConstantsService.toast(data, 'top center');
  });

  vm.send = function() {
    SocketService.emit('newMessage', 'hello');
  }
}
