angular.module('starter')

  .controller('boardPageCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $ionicLoading.show();
    console.log($localstorage.get('order'));
    ////////
    $http({
      method: 'get',
      url: 'http://bghgu.iptime.org:9303/board/page/' + $localstorage.get('order'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': $localstorage.getObject('token')
      }
    })
    .success(function(data) {
      $ionicLoading.hide();
      console.log(data);
      $localstorage.setObject('board2', data);
      $scope.board2 = $localstorage.getObject('board2').dto.boardMore;
      $scope.comment = $localstorage.getObject('board2').dto.boardMore.comments;
    })
    .error(function(data) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: '잠시후 다시 시도해 주세요.'
      });
      $location.path('/login');
    });
    ///////////////////////////
    $scope.save = function(data) {
      $ionicLoading.show();
      console.log(data);
      ////////////////////////////////
      $http({
        method: 'post',
        url: 'http://bghgu.iptime.org:9303/board/comment/write',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': $localstorage.getObject('token')
        },
        data: {
          bid : $localstorage.getObject('board2').dto.boardMore.b_id,
          content : data
        }
      })
      .success(function(data) {
        console.log(data);
        ////////////////////////////
        $http({
          method: 'get',
          url: 'http://bghgu.iptime.org:9303/board/page/' + $localstorage.get('order'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': $localstorage.getObject('token')
          }
        })
        .success(function(data) {
          $ionicLoading.hide();
          console.log(data);
          $localstorage.setObject('board2', data);
          $scope.board2 = $localstorage.getObject('board2').dto.boardMore;
          $scope.comment = $localstorage.getObject('board2').dto.boardMore.comments;
        })
        .error(function(data) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
          });
          $location.path('/login');
        });
        ////////////////////////////
      })
      .error(function(data) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
        });
        $location.path('/login');
      });
      ///////////////////////////////////
    };
    ///////////////////////////
  });
