angular.module('starter')

  .controller('adCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicModal) {
    $scope.search = function(data) {
      $ionicLoading.show();
      var adName = '';
      var text = '';
      //all 검색
      if (typeof(data) == 'undefined') {
        adName = "";
        text = "";
      } else {
        if (data.adName !== null) {
          adName = data.adName;
        } else if (data.text !== null) {
          text = data.text;
        }
      }
      ///////////////////////////
      if ($localstorage.getObject('token')) {
        $http({
            method: 'get',
            url: 'http://192.168.0.62:9303/ad/search?adName=' + adName + '&text=' + text,
            //url: 'http://bghgu.iptime.org:9303/ad/search?adName=' + adName + '&text=' + text,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $localstorage.getObject('token')
            }
          })
          .success(function(data) {
            $ionicLoading.hide();
            for(i = 0; i < data.ads.length; i++) {
              if(data.ads[i].photo === null) {
                data.ads[i].photo = "no_pic.gif";
              }
            }
            console.log(data);
            $localstorage.setObject('ad', data);
            $scope.ad = $localstorage.getObject('ad').ads;
            ////
            $scope.more = function(data) {
              $localstorage.set('order', data.id);
              $localstorage.set('photo', data.photo);
              $location.path('/app/adPage');
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
