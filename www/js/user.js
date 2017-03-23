angular.module('starter')

  .controller('userCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $ionicLoading.show();
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
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
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

    /////////////////////////////////////////
    $scope.update = function(data) {
      //$ionicLoading.show();
      console.log(data);
      //////////////////////////////////
      if (typeof(data) == 'undefined') {
        data = $localstorage.getObject('user').dto;
      }
      //////////////////////////////////

      if ($localstorage.getObject('token')) {
        console.log(data);
        $http({
            method: 'post',
            //url: 'http://:9303/user/update',
            url: 'http://bghgu.iptime.org:9303/user/update',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $localstorage.getObject('token')
            },
            data: ({
              loginId: $localstorage.getObject('user').dto.loginId,
              password: $localstorage.getObject('user').dto.password,
              email: data.email,
              address: data.adress,
              jobName: data.jobName,
              jobPhone: data.jobPhone,
              jobStatus: data.jobStatus,
              photo: data.photo,
              openBirth: data.openBirth,
              openPhone: data.openPhone,
              openEmail: data.openEmail,
              openAddress: data.openEmail,
              openJobName: data.openJobName,
              openJobPhone: data.openJobPhone,
              openJobStatus: data.openjobStatus,
              openPhoto: data.openPhoto,
              cnumber:  $localstorage.getObject('user').dto.cnumber
            })
          })
          .success(function(data) {
            $ionicLoading.hide();
            console.log(data);
            $localstorage.setObject('user', data);
            $scope.myPage = $localstorage.getObject('user').dto;
          })
          .error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Warning Message',
              template: '잠시후 다시 시도해 주세요.'
            });
            //$location.path('/myPage');
          });
      }
    };
    /////////////////////////////////////////
  });
