angular.module('starter.login', ['starter.services'])

  .controller('loginCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {

    $scope.login = function(user) {
      $ionicLoading.show();
      if (typeof(user) == 'undefined') {
        $ionicLoading.hide();
        $scope.showAlert('아이디를 입력해 주세요.');
        return false;
      }

      if (user.username == 'demo' && user.password == 'demo') {
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
