angular.module('starter')

  .controller('noticeCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicModal, $ionicActionSheet) {
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
    /*
    $scope.update = function(data) {
      $ionicLoading.show();
      console.log(data);
      $http({
          method: 'DELETE',
          url: 'http://bghgu.iptime.org:9303/notice/delete/' + data,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': $localstorage.getObject('token')
          }
        })
        .success(function(data) {
          console.log(data);
          /////////////////////////////
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
          /////////////////////////////
        })
        .error(function(data) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
          });
          $location.path('/login');
        });
    };
    */
    /////////////////////////////////////////
    //댓글 삭제, 수정 메소드
    $scope.update = function(data) {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: '수정'
        }, ],
        destructiveText: '삭제',
        destructiveButtonClicked: function() {
          console.log(data);
          ////////////////////////////////////////////////
          $http({
            method: 'Delete',
            url: 'http://bghgu.iptime.org:9303/notice/delete/' + data,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $localstorage.getObject('token')
            },
            data: {
              cid: data
            }
          }).success(function(data) {
            console.log(data);
            $location.path('/app/notice');
            hideSheet();
            $ionicLoading.show();
            ////////
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
                $location.path('/app/notice');
                console.log(data);
                $localstorage.setObject('notice', data);
                $scope.notice = $localstorage.getObject('notice').noticeList;
                /////////////////////
                $scope.more = function(data) {
                  console.log(data);
                  $localstorage.set('order', data);
                  $location.path('/app/notice');
                };
                ///////////////////
              })
              .error(function(data, status, headers, config) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Warning Message',
                  template: '잠시후 다시 시도해 주세요.'
                });
                $location.path('/login');
              });
          });
          ////////////////////////////////
        },
        titleText: '글 관리',
        cancelText: '취소',
        cancel: function() {
          console.log(1);
          return 0;
        },
        buttonClicked: function(index) {
          console.log(data);
          /*
          /////////////////////////////////////////////////
          $http({
            method: 'Delete',
            url: 'http://bghgu.iptime.org:9303/notice/delete/' + data,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $localstorage.getObject('token')
            },
            data: {
              cid: data
            }
          }).success(function(data) {
            console.log(data);
            hideSheet();
            $ionicLoading.show();
            ////////
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
          });
          /////////////////////////////////////////////////
          */
        }
      });
    };
    ///////////////////////////////////////////////////////////
  });
