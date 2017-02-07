angular.module('starter')

  .controller('cardinalListCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    $scope.search = function(data) {
      $ionicLoading.show();
      if (typeof(data) == 'undefined') {
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
        if (data.type == "tel") {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '전화번호를 입력해 주세요'
          });
          return false;
        }
        if (data.type == "class") {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '소속 지위을 입력해 주세요'
          });
          return false;
        }
      }
      /*
      ///////////////////////////
      //로그인 통신
      $http({
          //post방식
          method: 'post',
          //url주소
          url: 'http://',
          //요청 헤더값
          headers: {
            'Content-Type': 'application/json'
          },
          //요청 바디
          data: ({
            type: data.type,
            keyword: data.keyword,
            cookie: $localstorage.getObject('cookie')
          })
        })
        //로그인 통신 성공할 시
        .success(function(data, status, headers, config) {
            $ionicLoading.hide();
            $localstorage.setObject('cardinalList', data);
            var count = $localstorage.getObject('cardinalList').syllabus[0].code
            if (count == "자료가 없습니다.") {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: '자료가 없습니다.'
              });
            })
          //통신 실패시
          .error(function(data) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Warning Message',
              template: '잠시후 다시 시도해 주세요.'
            });
            $location.path('/login');
          })
          ///////////////////////////
          */
    }
  })
