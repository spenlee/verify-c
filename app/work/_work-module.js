'use strict';

angular.module('app.work', [])
  .component('workView', {
    controllerAs: 'files',
    bindings: {},
    controller: FilesViewController,
    templateUrl: 'work/work.html'
  });

FilesViewController.$inject = ['RestService', 'ConstantsService', '$scope', '_'];
function FilesViewController(RestService, ConstantsService, $scope, _) {
  var vm = this;

  var sock = new SockJS(ConstantsService.getUrl() + '/web-socket');
  sock.onopen = function() {
    console.log('open');
  };
  sock.onmessage = function(e) {
    var data = JSON.parse(e.data);
    if (data.type === 'file') {
      vm.list.push(data.data);
      console.log(data.data);
      //loadMessages();
      $scope.$apply();
    }
  };
  sock.onclose = function() {
    console.log('close');
  };

  loadFiles();

  function loadFiles() {
    RestService.getFiles()
    .then(function(resp) {
      console.log(resp.data.data);
      vm.list = resp.data.data;
    });
  }

  vm.post = function() {
    if (vm.fileName !== '') {
      var content = {'content': '', 'name': vm.fileName};
      RestService.postFiles(content)
        .then(function(resp) {
          vm.fileName = ''; // clear input
          sock.send(JSON.stringify({'type': 'file', 'data': resp.data.data}));
        });
    } else {
      ConstantsService.toast('Please enter a file name!', 'bottom center');
    }
  };

  vm.delete = function(id) {
    console.log(id);
    RestService.deleteFilesById(id)
      .then(function(resp) {
        _.remove(vm.list, {'_id': id});
      });
  };
}
