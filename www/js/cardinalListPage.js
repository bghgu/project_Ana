angular.module('starter')

  .controller('cardinalListPageCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $ionicLoading.show();
    $http({
      method: 'get',
      url: 'http://bghgu.iptime.org:9303/cardinalList/info?loginId=' + $localstorage.get('order'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': $localstorage.getObject('token')
      }
    })
    .success(function(data) {
      $ionicLoading.hide();
      console.log(data);
      $localstorage.setObject('cardinalList2', data);
      $scope.cardinalList2 = $localstorage.getObject('cardinalList2');
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
