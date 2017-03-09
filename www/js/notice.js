angular.module('starter')

  .controller('noticeCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicModal) {
    $ionicLoading.show();
    console.log($localstorage.getObject('token'));
    if ($localstorage.getObject('token')) {
      $http({
          method: 'get',
          url: 'http://bghgu.iptime.org:9303/notice/page',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': $localstorage.getObject('token')
          }
        })
        .success(function(data) {
          $ionicLoading.hide();
          console.log(data);
          $localstorage.setObject('notice', data);
          $scope.notice = $localstorage.getObject('notice').noticeList;
          /////////////////////
          $scope.more = function(data) {
            console.log(data);
            $localstorage.set('order', data);
            $location.path('/app/noticePage');
          };
          ///////////////////
          /*
          ///////////////////////
          // Create the login modal that we will use later
          $ionicModal.fromTemplateUrl('templates/page/notice/noticePage.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
          });
          // Open the login modal
          $scope.notice2 = function(data) {
            console.log(data);
            $http({
                method: 'get',
                url: 'http://bghgu.iptime.org:9303/notice/page/' + data,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': $localstorage.getObject('token')
                }
              })
              .success(function(data) {
                console.log(data);
                $localstorage.setObject('notice2', data);
                $scope.noticePage = $localstorage.getObject('notice2').dto.noticeMore;
                $scope.comment = $localstorage.getObject('notice2').dto.noticeMore.comments;
              })
              .error(function(data, status, headers, config) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Warning Message',
                  template: '잠시후 다시 시도해 주세요.' + token
                });
                $location.path('/login');
              });
            $scope.modal.show();
          };
          ///////////////////////
          */
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
  });
