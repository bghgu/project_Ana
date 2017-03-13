angular.module('starter')

  .controller('noticeCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicModal) {
    $ionicLoading.show();
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

    ///////////////////////
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/page/write.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    // Open the login modal
    $scope.writeCall = function(data) {
      $scope.modal.show();
    };

    $scope.write = function(data) {
      $ionicLoading.show();
      console.log(data);
      console.log(data.title);
      var fd = new FormData();
      fd.append("title", data.title);
      fd.append("body", data.body);
      fd.append("file", data.file);
      $http({
          method: 'post',
          url: 'http://bghgu.iptime.org:9303/notice/write',
          headers: {
            'Content-Type': undefined,
            'Authorization': $localstorage.getObject('token')
          },
          data: fd
        })
        .success(function(data) {
          console.log(data);
          $scope.modal.hide();
          ///////////////////////
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
          ///////////////////////
        })
        .error(function(data, status, headers, config) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
          });
          $location.path('/login');
        });
    };
    ///////////////////////

  });
