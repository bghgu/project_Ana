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


    //회원정보 수정
    /////////////////////////////////////////
    $scope.update = function(data) {
      $ionicLoading.show();
      //기본값 설정
      //////////////////////////////////
      if(typeof(data.address) == 'undefined') {
        data.address = $localstorage.getObject('user').dto.address;
      }
      if(typeof(data.email) == 'undefined') {
        data.email = $localstorage.getObject('user').dto.email;
      }
      if(typeof(data.jobName) == 'undefined') {
        data.jobName = $localstorage.getObject('user').dto.jobName;
      }
      if(typeof(data.jobPhone) == 'undefined') {
        data.jobPhone = $localstorage.getObject('user').dto.jobPhone;
      }
      if(typeof(data.jobStatus) == 'undefined') {
        data.jobStatus = $localstorage.getObject('user').dto.jobStatus;
      }
      if(typeof(data.openAddress) == 'undefined') {
        data.openAddress = $localstorage.getObject('user').dto.openAddress;
      }
      if(typeof(data.openBirth) == 'undefined') {
        data.openBirth = $localstorage.getObject('user').dto.openBirth;
      }
      if(typeof(data.openEmail) == 'undefined') {
        data.openEmail = $localstorage.getObject('user').dto.openEmail;
      }
      if(typeof(data.openJobName) == 'undefined') {
        data.openJobName = $localstorage.getObject('user').dto.openJobName;
      }
      if(typeof(data.openJobPhone) == 'undefined') {
        data.openJobPhone = $localstorage.getObject('user').dto.openJobPhone;
      }
      if(typeof(data.openJobStatus) == 'undefined') {
        data.openJobStatus = $localstorage.getObject('user').dto.openJobStatus;
      }
      if(typeof(data.openPhone) == 'undefined') {
        data.openPhone = $localstorage.getObject('user').dto.openPhone;
      }
      if(typeof(data.openPhoto) == 'undefined') {
        data.openPhoto = $localstorage.getObject('user').dto.openPhoto;
      }
      //////////////////////////////////
      if ($localstorage.getObject('token')) {
        $http({
            method: 'post',
            url: 'http://bghgu.iptime.org:9303/user/update',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $localstorage.getObject('token')
            },
            data: ({
              loginId: $localstorage.getObject('user').dto.loginId,
              password: $localstorage.getObject('user').dto.password,
              cnumber:  $localstorage.getObject('user').dto.cnumber,

              photo: $localstorage.getObject('user').dto.photo,
              openPhoto: data.openPhoto,

              address: data.address,
              email: data.email,
              jobName: data.jobName,
              jobPhone: data.jobPhone,
              jobStatus: data.jobStatus,

              openAddress: data.openAddress,
              openBirth: data.openBirth,
              openEmail: data.openEmail,
              openJobName: data.openJobName,
              openJobPhone: data.openJobPhone,
              openJobStatus: data.openJobStatus,
              openPhone: data.openPhone,
            })
          })
          .success(function(data) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'success',
              template: '수정 완료'
            });
            $localstorage.setObject('user', data);
            $scope.myPage = $localstorage.getObject('user').dto;
          })
          .error(function(data, status, headers, config) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Warning Message',
              template: '잠시후 다시 시도해 주세요.'
            });
            $location.path('/myPage');
          });
      }
      /////////////////////////////////////////
    };
  });
