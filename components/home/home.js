pollster.controller('HomeCtrl', ['$scope', '$location', function($scope, $location) {
  var generateUrl = function generateUrl() {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomUrl = '';

    for (var i = 0; i < 5; i++) {
      var randomChar = _.random(chars.length-1);
      randomUrl += chars[randomChar];
    }

    return randomUrl;
  };

  $scope.createPoll = function() {
    var url = generateUrl();
    var test = firebase.database().ref().child('polls');

    test.once('value', function(snap) {
      if (snap.hasChild(url)) {
        debugger;
        // this url exists, re-generateUrl
        $scope.createPoll();
      } else {
        debugger;
        firebase.database().ref('polls/' + url).set({
          newPoll: true
        }).then(function() {
          console.log('url created successfully');
          debugger;
          $location.path('/' + url);
        })
      }
    });
  };

}]);
