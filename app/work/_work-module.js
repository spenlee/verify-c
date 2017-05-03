'use strict';

angular.module('app.work', [])
  .component('workView', {
    controllerAs: 'eventsView',
    bindings: {},
    controller: EventsViewController,
    templateUrl: 'work/work.html'
  })
  .filter('keywordDisplay', function() {
    return function(keywords) {
      var keywordDisplay = "";
      if (keywords.length === 1) {
        keywordDisplay = keywords[0];
      }
      else if (keywords.length === 2) {
        keywordDisplay = '"' + keywords[0] + '"' + ' or ' + '"' + keywords[1] + '"';
      }
      else if (keywords.length > 2) {
        keywords.forEach(function(w) {
          keywordDisplay += '"' + w + '"' + ', ';
        });
        keywordDisplay += 'or ' + '"' + keywords[keywords.length - 1] + '"'; 
      }

      return keywordDisplay;
    };
  }).filter('unsafe', ['$sce', function($sce) {
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }]).filter('tweetDisplay', ['$sce', function($sce) {
    return function(tweetText) {
      // var display =
      // remove URLs
      // remove @ symbols
      // remove full hashtags
      return tweetText;
    };
  }]);

EventsViewController.$inject = ['RestService', 'ConstantsService', '$scope', '_', '$filter'];
function EventsViewController(RestService, ConstantsService, $scope, _, $filter) {
  var vm = this;

  var sock = new SockJS(ConstantsService.getUrl() + '/web-socket');
  sock.onopen = function() {
    console.log('open');
  };
  sock.onmessage = function(e) {
    var data = JSON.parse(e.data);
    // if (data.type === 'file') {

    // } else if (data.type === 'remove-file') {

    // } else if (data.type === 'update-file') {

    // }
  };
  sock.onclose = function() {
    console.log('close');
  };

  init();

  function init() {
    // get user
    vm.userID = ConstantsService.getCurrentUser()._id;
    // current events
    vm.currentState = true;
    console.log(vm.userID);
    // vm.loadEvents(vm.userID, vm.currentState);
    RestService.getEventsByUser(vm.userID, true)
    .then(function(res) {
      // randomization
      vm.list = res.data.data;
    });
  }

  // load current events
  vm.loadEvents = function(userID, current) {
    console.log("call");
    RestService.getEventsByUser(userID, current)
    .then(function(res) {
      // set new state
      vm.currentState = current;
      // past
      vm.list = res.data.data;
      vm.list = _.map(vm.list, applyHide);

      if (!current) {
        vm.list = _.map(vm.list, applyPercent);
      }
      // randomization
      console.log(vm.list);
    });
  };

  vm.toggleShowHIT = function(HIT) {
    HIT.show = !HIT.show;
  };

  function applyHide(HIT) {
    HIT.show = false; // hide at first
    return HIT;
  }

  function applyPercent(HIT) {
    var totalAnswer = HIT.numYes + HIT.numNo + HIT.numUncertain;
    var totalSource = HIT.numSource1 + HIT.numSource2 + HIT.numSourceOther;

    HIT.yesP = getPercent(HIT.numYes, totalAnswer);
    HIT.noP = getPercent(HIT.numNo, totalAnswer);
    HIT.unP = getPercent(HIT.numUncertain, totalAnswer);
    HIT.s1P = getPercent(HIT.numSource1, totalSource);
    HIT.s2P = getPercent(HIT.numSource2, totalSource);
    HIT.s3P = getPercent(HIT.numSourceOther, totalSource);
    return HIT;
  }

  function getPercent(n1, n2) {
    return n2 === 0 ? '' : "" + Math.floor((n1 / n2) * 100).toString() + "%";
  }

  vm.post = function() {
    // if (vm.fileName !== '') {
    //   var content = {'content': '', 'name': vm.fileName};
    //   RestService.postFiles(content)
    //     .then(function(resp) {
    //       vm.fileName = ''; // clear input
    //       sock.send(JSON.stringify({'type': 'file', 'data': resp.data.data}));
    //     });
    // } else {
    //   ConstantsService.toast('Please enter a file name!', 'bottom center');
    // }
  };

  // $scope.$watch('subSource', function(oldContent, newContent) {
  // 	console.log("change");
  //   updateContent();
  // });

  vm.sendResponse = function(HITID, answer, source, citation) {
    // source is not currently able to handle multiple values
    // if (source) {
    //   for (var key in source) {
    //     if (source.hasOwnProperty(key) {

    //     }
    //   }
    // }

    var response = {
      'answer': answer,
      'source': source,
      'citation': citation,
      'userID': vm.userID,
      'HITID': HITID
    };

    RestService.postResponses(response)
      .then(function(res) {
        ConstantsService.toast(res.data.message, 'top center');
        // temporary, reload after answer to get current state
        vm.loadEvents(vm.userID, true);
      })
      .catch(function(err) {
        console.log("post responses");
        console.log(err);
      });
  };

  vm.logOut = function() {
    RestService.getLogout()
      .then(function(res) {
        ConstantsService.toast(res.data.message, 'top center');
        ConstantsService.removeCurrentUser();
        // reload, since $location won't change path
        ConstantsService.reloadUrlToPath('#!/login');
      });
  };

  vm.constants = {
    'question': function(timestamp, keywords) {
      // TODO:: third param = optional timezone, timezone configuration
      var timeDisplay = $filter('date')(timestamp, "h:mm a 'on' EEE. MMM d, y");
      console.log(timeDisplay);
      var keywordDisplay;
      if (keywords.length === 1) {
        keywordDisplay = keywords[0];
      }
      else if (keywords.length === 2) {
        keywordDisplay = keywords[0] + ' or ' + keywords[1];
      }
      else if (keywords.length > 2) {
        keywords.forEach(function(w) {
          keywordDisplay += '"' + w + '"' + ', ';
        });
        keywordDisplay += 'or ' + '"' + keywords[keywords.length - 1] + '"'; 
      }

      var q = 'Does this statement describe an ongoing, real, physical event that ' +
              'happened around ' + timeDisplay + ' related to ' + keywordDisplay + '?';
      return q;
    },
    'text': function(tweetText) {
      return tweetText;
    },
    'img': function(imgURL) {
      return imgURL;
    }
  };

}
