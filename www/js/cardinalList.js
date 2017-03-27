angular.module('starter')

  .controller('cardinalListCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicModal) {
    $scope.search = function(data) {
      $ionicLoading.show();
      var cNumber = '';
      var name = '';
      var phone = '';
      var status = '';
      //all 검색
      if (typeof(data) == 'undefined') {
        cNumber = "";
        name = "";
        phone = "";
        status = "";
      } else {
        if (data.cNumber !== null) {
          cNumber = data.cNumber;
        }

        if(data.type == "name") {
          name = data.keyword;
        } else if(data.type == "phone") {
          phone = data.keyword;
        } else if(data.type == "status") {
          status = data.keyword;
        }
      }
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
            for(i = 0; i < data.length; i++) {
              console.log(data[i]);
            }
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
