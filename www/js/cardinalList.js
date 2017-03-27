angular.module('starter')

  .controller('cardinalListCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicModal) {
    $scope.search = function(data) {
      console.log(data);
      $ionicLoading.show();
      var cNumber = '';
      var name = '';
      var phone = '';
      var status = '';
      console.log(cNumber);
      //all 검색
      if (typeof(data) == 'undefined') {
        cNumber = "";
        name = "";
        phone = "";
        status = "";
      } else {
        if (data.cNumber !== null) {
          cNumber = data.cNumber;
          console.log(cNumber);
        }

        if(data.type == "name") {
          name = data.keyword;
          console.log(name);
        } else if(data.type == "phone") {
          phone = data.keyword;
          console.log(phone);
        } else if(data.type == "status") {
          status = data.keyword;
          console.log(status);
        }
      }
      /*
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
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '이름을 입력해 주세요'
          });
          return false;
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
      */

      ///////////////////////////
      if ($localstorage.getObject('token')) {
        $http({
            method: 'get',
            url: 'http://bghgu.iptime.org:9303/cardinalList/search?cNumber=' + cNumber + '&name=' + name + '&phone=' + phone + '&status=' + status,
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
