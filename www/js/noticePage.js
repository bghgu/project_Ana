angular.module('starter')

  .controller('noticePageCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage, $ionicActionSheet) {
    $ionicLoading.show();

    //첫 통신
    /////////////////////////////////////////////////
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
        $localstorage.setObject('notice2', data);
        $scope.notice2 = $localstorage.getObject('notice2').dto.noticeMore;
        $scope.comment = $localstorage.getObject('notice2').dto.noticeMore.comments;

      })
      .error(function(data) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
        });
        $location.path('/login');
      });
    /////////////////////////////////////////////////

    //댓글 저장
    /////////////////////////////////////////////////
    $scope.save = function(data) {
      $ionicLoading.show();
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
          //리콜
          /////////////////////////////////////////////////
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
          /////////////////////////////////////////////////
        })
        .error(function(data) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
          });
          $location.path('/login');
        });
      /////////////////////////////////////////////////
    };

    //댓글 삭제
    /////////////////////////////////////////////////
    $scope.show = function(data) {
      var hideSheet = $ionicActionSheet.show({
        destructiveText: '삭제',
        //삭제
        /////////////////////////////////////////////////
        destructiveButtonClicked: function() {
          $http({
            method: 'Delete',
            url: 'http://bghgu.iptime.org:9303/notice/comment/delete',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $localstorage.getObject('token')
            },
            data: {
              cid: data
            }
          }).success(function(data) {
            hideSheet();
            $ionicLoading.show();
            //리콜
            /////////////////////////////////////////////////
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
                $localstorage.setObject('notice2', data);
                $scope.notice2 = $localstorage.getObject('notice2').dto.noticeMore;
                $scope.comment = $localstorage.getObject('notice2').dto.noticeMore.comments;
              })
              .error(function(data) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                  title: 'Warning Message',
                  template: '잠시후 다시 시도해 주세요.'
                });
                $location.path('/login');
              });
          });
          /////////////////////////////////////////////////
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
    /*
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //글 수정, 삭제
    /////////////////////////////////////////
    $scope.update = function(data) {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: '수정'
        }, ],
        destructiveText: '삭제',
        destructiveButtonClicked: function() {
          //삭제
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
              hideSheet();
              //리콜
              ////////////////////////////////////////////////
              $http({
                  method: 'get',
                  url: 'http://bghgu.iptime.org:9303/notice/page',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': $localstorage.getObject('token')
                  }
                })
                .success(function(data) {
                  console.log(data);
                  $ionicLoading.hide();
                  $localstorage.setObject('notice', data);
                  $scope.notice = $localstorage.getObject('notice').noticeList;

                  $ionicPopup.show({
                    template: '글 삭제 성공',
                    title: 'success',
                    scope: $scope.more = $location.path('/app/notice'),
                    buttons: [{
                        text: '<b>확인</b>',
                        type: 'button-positive',

                      }]
                    });

                })
                .error(function(data, status, headers, config) {
                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Warning Message',
                    template: '잠시후 다시 시도해 주세요.'
                  });
                  $location.path('/login');
                });
              ////////////////////////////////////////////////
            })
            .error(function(data, status, headers, config) {
              $ionicLoading.hide();
              $ionicPopup.alert({
                title: 'Warning Message',
                template: '잠시후 다시 시도해 주세요.'
              });
              $location.path('/login');
            });
          ////////////////////////////////
        },
        titleText: '글 관리',
        cancelText: '취소',
        cancel: function() {
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

        }
      });
    };
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    */

  });
