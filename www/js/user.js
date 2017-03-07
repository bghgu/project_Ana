angular.module('starter')

  .controller('userCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $ionicLoading.show();
    console.log($localstorage.getObject('token'))
    if ($localstorage.getObject('token')) {
      $http({
          method: 'get',
          url: 'http://bghgu.iptime.org:9303/user/userInfo',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': $localstorage.getObject('token')
          }
        })
        .success(function(data) {
          $ionicLoading.hide();
          console.log(data);
          $localstorage.setObject('user', data);
          $scope.myPage = $localstorage.getObject('user').dto;
        })
        .error(function(data, status, headers, config) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'+token
          });
          $location.path('/login');
        })
    } else {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Warning Message',
        template: '로그인 먼저 해주세요.'
      });
      $location.path('/login');
    };
  }
)
