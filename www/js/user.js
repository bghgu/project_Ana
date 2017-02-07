angular.module('starter')

  .controller('userCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $scope.myPage = {
      photo : '사진 JSON',
      id : '201232016',
      password : '1234',
      name : '배다슬',
      th : '12',
      class : '재학생',
      birthday : '1993-03-09',
      tel : '010-9946-9303',
      email : 'bghgu@naver.com',
      address : '서울시 관악구',
      workPlace : '성공회대학교 소프트웨어공학과',
      workPosition : '재학생',
      workTel : '02-2610-6202'
    };
    $scope.update = function(data) {
      console.log(data);
      $ionicPopup.alert({
        title: 'Warning Message',
        template: '구분을 선택해 주세요.'
      });
    }
  })
