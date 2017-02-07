/*angular.module('starter.controllers', ['starter.services'])

  .controller('loginCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    console.log(1)
    $scope.login = function(user) {
      $ionicLoading.show();
      if (typeof(user) == 'undefined') {
        $ionicLoading.hide();
        $scope.showAlert('아이디를 입력해 주세요.');
        return false;
      }

      if (user.username == '1' && user.password == 'demo') {
        $ionicLoading.hide();
        $location.path('/app/home');
      } else {
        $ionicLoading.hide();
        $scope.showAlert('비밀번호를 확인해 주세요.');
      }

    };

    $scope.showAlert = function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: msg
      });
    };

  })

  .controller('cardinalListCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $scope.search = function(data) {
      var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '구분을 선택해 주세요.'
        });
    }
  })
