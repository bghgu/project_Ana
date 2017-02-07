angular.module('starter')

  .controller('noticeCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $scope.search = function(data) {
      $ionicPopup.alert({
          title: 'Warning Message',
          template: '구분을 선택해 주세요.'
        });
    }
  })
