angular.module('starter')

  .controller('boardCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicModal, $ionicActionSheet) {
    $ionicLoading.show();
    if ($localstorage.getObject('token')) {
      $http({
          method: 'get',
          //url: 'http://192.168.0.62:9303/board/page',
          url: 'http://bghgu.iptime.org:9303/board/page',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': $localstorage.getObject('token')
          }
        })
        .success(function(data) {
          $ionicLoading.hide();
          console.log(data);
          $localstorage.setObject('board', data);
          $scope.board = $localstorage.getObject('board').boardList;
          /////////////////////
          $scope.more = function(data) {
            console.log(data);
            $localstorage.set('order', data);
            $location.path('/app/boardPage');
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
      console.log(data.title);
      var fd = new FormData();
      fd.append("title", data.title);
      fd.append("body", data.body);
      fd.append("file", data.file);
      $http({
          method: 'post',
          //url: 'http://192.168.0.62:9303/board/write',
          url: 'http://bghgu.iptime.org:9303/board/write',
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
          //console.log($localstorage.getObject('token'));
          if ($localstorage.getObject('token')) {
            $http({
                method: 'get',
                //url: 'http://192.168.0.62:9303/board/page',
                url: 'http://bghgu.iptime.org:9303/board/page',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': $localstorage.getObject('token')
                }
              })
              .success(function(data) {
                $ionicLoading.hide();
                console.log(data);
                $localstorage.setObject('board', data);
                $scope.board = $localstorage.getObject('board').boardList;
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
            url: 'http://bghgu.iptime.org:9303/board/delete/' + data,
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
                url: 'http://bghgu.iptime.org:9303/board/page',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': $localstorage.getObject('token')
                }
              })
              .success(function(data) {
                $ionicLoading.hide();
                console.log(data);
                $localstorage.setObject('board', data);
                $scope.board = $localstorage.getObject('board').boardList;
                /////////////////////
                $scope.more = function(data) {
                  console.log(data);
                  $localstorage.set('order', data);
                  $location.path('/app/boardPage');
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
            url: 'http://bghgu.iptime.org:9303/board/delete/' + data,
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
                url: 'http://bghgu.iptime.org:9303/board/page',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': $localstorage.getObject('token')
                }
              })
              .success(function(data) {
                $ionicLoading.hide();
                console.log(data);
                $localstorage.setObject('board', data);
                $scope.board = $localstorage.getObject('board').boardList;
                /////////////////////
                $scope.more = function(data) {
                  console.log(data);
                  $localstorage.set('order', data);
                  $location.path('/app/boardPage');
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
  });
