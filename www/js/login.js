angular.module('starter')
  //로그인
  .controller('loginCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $scope.login = function(user) {
      console.log(user);
      //로딩 표시 시작
      $ionicLoading.show();
      //아이디를 입력하지 않았을 시
      if (typeof(user) == 'undefined') {
        //로딩 표시 중단
        $ionicLoading.hide();
        //알람 팝업창
        $ionicPopup.alert({
          title: 'Warning Message',
          template: '아이디를 입력해 주세요.'
        });
        return false;
      }
      //비밀번호를 입력하지 않았을 시
      if (typeof(user.password) == 'undefined') {
        //로딩 표시 중단
        $ionicLoading.hide();
        //알람 팝업창
        $ionicPopup.alert({
          title: 'Warning Message',
          template: '비밀번호를 입력해 주세요.'
        });
        return false;
      }
      //로그인 통신
      $http({
          //post방식
          method: 'post',
          //url주소
          url: 'http://bghgu.iptime.org:9303/auth',
          //요청 헤더값
          headers: {
            'Content-Type': 'application/json',
          },
          //요청 바디
          data: ({
            username: user.username,
            password: user.password
          })
        })
        //로그인 통신 성공할 시
        .success(function(data) {
          console.log(data);
          var count = data.count;
          console.log(count);
          if (count === true) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Welcome',
              template: '환영합니다.'
            });
            $localstorage.setObject('token', data.token);
            $location.path('/app/home');
          }
        })
        //통신 실패시
        .error(function(data) {
          console.log(data);
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '아이디와 비밀번호를 확인해 주세요.'
          });
        });
      ///////////////////////////
    };
  });
