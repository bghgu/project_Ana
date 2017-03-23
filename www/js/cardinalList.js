angular.module('starter')

  .controller('cardinalListCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicModal) {
    $scope.search = function(data) {
      console.log(data);
      $ionicLoading.show();

      if (typeof(data) == 'undefined') {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Warning Message',
          template: '항목을 선택해 주세요.'
        });
        return false;
      }

      if (typeof(data.cNumber) == 'undefined') {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Warning Message',
          template: '기수를 선택해 주세요.'
        });
        return false;
      }

      if (typeof(data.type) == 'undefined') {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Warning Message',
          template: '구분을 선택해 주세요.'
        });
        return false;
      }

      if (typeof(data.keyword) == 'undefined') {
        if (data.type == "name") {
          /*
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '이름을 입력해 주세요'
          });
          return false;
          */
        }
        if (data.type == "phone") {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '전화번호를 입력해 주세요'
          });
          return false;
        }
        if (data.type == "status") {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '소속 지위을 입력해 주세요'
          });
          return false;
        }
      }

      name = phone = status = null;

      if(data.type == "name") {
        name = data.keyword;
        console.log(name);
      } else if(data.type == "phone") {
        phone = data.keyword;
        console.log(phone);
      } else {
        status = data.status;
        console.log(status);
      }

      ///////////////////////////
      if ($localstorage.getObject('token')) {
        $http({
            method: 'get',
            url: 'http://bghgu.iptime.org:9303/cardinalList/search?cNumber=' + data.cNumber + '&name=' + name + '&phone=' + phone + '&status=' + status,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $localstorage.getObject('token')
            }
          })
          .success(function(data) {
            $ionicLoading.hide();
            console.log(data);
            $localstorage.setObject('cardinalList', data);
            $scope.cardinalList = $localstorage.getObject('cardinalList').members;
            ////
            $scope.more = function(data) {
              console.log(data);
              $localstorage.set('order', data);
              $location.path('/app/cardinalListPage');
              $localstorage.get('order');
            };
            /////
          })
          .error(function(data, status, headers, config) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Warning Message',
              template: '잠시후 다시 시도해 주세요.' + token
            });
            $location.path('/login');
          });
      } else {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Warning Message',
          template: '로그인 먼저 해주세요.'
        });
        $location.path('/login');
      }
    };
  });
