'use strict';

angular.module('app.work', [])
  .component('messagesView', {
    controllerAs: 'messages',
    bindings: {},
    controller: MessagesViewController,
    templateUrl: 'work/messagesView.html'
  });

MessagesViewController.$inject = ['RestService', 'ConstantsService', '$scope', '_'];
function MessagesViewController(RestService, ConstantsService, $scope, _) {
  var vm = this;

  //var sock = new SockJS(ConstantsService.getUrl());
  var sock = new SockJS(ConstantsService.getUrl() + '/web-socket');
  sock.onopen = function() {
    console.log('open');
  };
  sock.onmessage = function(e) {
    var data = JSON.parse(e.data);
    if (data.type === 'message') {
      vm.list.push(data.data);
      console.log(data.data);
      //loadMessages();
      $scope.$apply();
    }
  };
  sock.onclose = function() {
    console.log('close');
  };

  loadMessages();

  function loadMessages() {
    RestService.getMessages()
    .then(function(resp) {
      vm.list = resp.data.data;
    });
  }

  // vm.user = ConstantsService.getCurrentUser();

  vm.post = function() {
    var content = {'content': vm.input, 'email': ConstantsService.getCurrentUser().email};
    RestService.postMessages(content)
      .then(function(resp) {
        vm.input = ''; // clear input
        sock.send(JSON.stringify({'type': 'message', 'data': resp.data.data}));
      });
  };

  vm.delete = function(id) {
    console.log(id);
    RestService.deleteMessagesById(id)
      .then(function(resp) {
        _.remove(vm.list, {'_id': id});
      });
  };
}
