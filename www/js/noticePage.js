angular.module('starter')

  .controller('noticePageCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicActionSheet) {
    $ionicLoading.show();
    ////////
    $http({
        method: 'get',
        url: 'http://bghgu.iptime.org:9303/notice/page/' + $localstorage.get('order'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': $localstorage.getObject('token')
        }
      })
      .success(function(data) {
        $ionicLoading.hide();
        console.log(data);
        $localstorage.setObject('notice2', data);
        $scope.notice2 = $localstorage.getObject('notice2').dto.noticeMore;
        $scope.comment = $localstorage.getObject('notice2').dto.noticeMore.comments;
      })
      .error(function(data) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
        });
        $location.path('/login');
      });
    //댓글 저장 메소드
    ///////////////////////////
    $scope.save = function(data) {
      $ionicLoading.show();
      console.log(data);
      ////////////////////////////////
      $http({
          method: 'post',
          url: 'http://bghgu.iptime.org:9303/notice/comment/write',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': $localstorage.getObject('token')
          },
          data: {
            nid: $localstorage.getObject('notice2').dto.noticeMore.n_id,
            content: data
          }
        })
        .success(function(data) {
          console.log(data);
          ////////////////////////////
          $http({
              method: 'get',
              url: 'http://bghgu.iptime.org:9303/notice/page/' + $localstorage.get('order'),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': $localstorage.getObject('token')
              }
            })
            .success(function(data) {
              $ionicLoading.hide();
              console.log(data);
              $localstorage.setObject('notice2', data);
              $scope.notice2 = $localstorage.getObject('notice2').dto.noticeMore;
              $scope.comment = $localstorage.getObject('notice2').dto.noticeMore.comments;
            })
            .error(function(data) {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Warning Message',
                template: '잠시후 다시 시도해 주세요.'
              });
              $location.path('/login');
            });
          ////////////////////////////
        })
        .error(function(data) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
          });
          $location.path('/login');
        });
      ///////////////////////////////////
    };
    ///////////////////////////
    //댓글 삭제, 수정 메소드
    $scope.show = function(data) {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        destructiveText: '삭제',
        destructiveButtonClicked: function() {
          console.log(data);
          $http({
              method: 'Delete',
              url: 'http://bghgu.iptime.org:9303/notice/comment/delete',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': $localstorage.getObject('token')
              },
              data: {
                cid : data
              }
            }).success(function(data) {
              console.log(data);
              hideSheet();
              $ionicLoading.show();
              ////////
              $http({
                  method: 'get',
                  url: 'http://bghgu.iptime.org:9303/notice/page/' + $localstorage.get('order'),
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': $localstorage.getObject('token')
                  }
                })
                .success(function(data) {
                  $ionicLoading.hide();
                  console.log(data);
                  $localstorage.setObject('notice2', data);
                  $scope.notice2 = $localstorage.getObject('notice2').dto.noticeMore;
                  $scope.comment = $localstorage.getObject('notice2').dto.noticeMore.comments;
                })
                .error(function(data) {
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                    title: 'Warning Message',
                    template: '잠시후 다시 시도해 주세요.'
                  });
                  $location.path('/login');
                });
            });
        },
        titleText: '댓글 관리',
        cancelText: '취소',
        cancel: function() {
          console.log(1);
          return 0;
        },
        buttonClicked: function(index) {
          console.log(data);
        }
      });
    };
    /////////////////////////
  });
