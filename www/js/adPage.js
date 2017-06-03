angular.module('starter')

  .controller('adPageCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $ionicLoading.show();
    $http({
      method: 'get',
      url: 'http://192.168.0.62:9303/ad/info?id=' + $localstorage.get('order'),
      //url: 'http://bghgu.iptime.org:9303/ad/info?id=' + $localstorage.get('order'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': $localstorage.getObject('token')
      }
    })
    .success(function(data) {
      $ionicLoading.hide();
      console.log(data);
      $localstorage.setObject('adPage', data);
      $scope.adPage = $localstorage.getObject('adPage').dto;
      $scope.adPage.photo = $localstorage.get('photo');
    })
    .error(function(data) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: '잠시후 다시 시도해 주세요.' + token
      });
      $location.path('/login');
    });
  });
