// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })

      .state('main', {
        url: '/main',
        templateUrl: 'templates/main/main.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/main/login.html',
        controller: 'loginCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/home.html',
            //controller: 'homeCtrl'
          }
        }
      })

      .state('app.myPage', {
        url: '/myPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/myPage/myPage.html',
            controller: 'userCtrl'
          }
        }
      })

      .state('app.myPageUpdate', {
        url: '/myPageUpdate',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/myPage/myPageUpdate.html',
            controller: 'userCtrl'
          }
        }
      })

      .state('app.introduce1', {
        url: '/introduce1',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/introduce/introduce1.html',
            //controller: 'introduceCtrl'
          }
        }
      })
      .state('app.introduce2', {
        url: '/introduce2',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/introduce/introduce2.html',
            //controller: 'introduceCtrl'
          }
        }
      })
      .state('app.introduce3', {
        url: '/introduce3',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/introduce/introduce3.html',
            //controller: 'introduceCtrl'
          }
        }
      })

      .state('app.greeting1', {
        url: '/greeting1',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/greeting/greeting1.html',
            //controller: 'greetingCtrl'
          }
        }
      })

      .state('app.greeting2', {
        url: '/greeting2',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/greeting/greeting2.html',
            //controller: 'greetingCtrl'
          }
        }
      })

      .state('app.tel', {
        url: '/tel',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/phone/tel.html',
            //controller: 'telCtrl'
          }
        }
      })
      .state('app.tel1', {
        url: '/tel1',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/phone/tel1.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.tel2', {
        url: '/tel2',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/phone/tel2.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.tel3', {
        url: '/tel3',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/phone/tel3.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.tel4', {
        url: '/tel4',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/phone/tel4.html',
            //controller: 'tel1Ctrl'
          }
        }
      }).state('app.tel5', {
        url: '/tel5',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/phone/tel5.html',
            //controller: 'tel1Ctrl'
          }
        }
      }).state('app.tel6', {
        url: '/tel6',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/phone/tel6.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.tel7', {
        url: '/tel7',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/phone/tel7.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.cardinalList', {
        url: '/cardinalList',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/cardinalList/cardinalList.html',
            controller: 'cardinalListCtrl'
          }
        }
      })

      .state('app.cardinalListPage', {
        url: '/cardinalListPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/cardinalList/cardinalListPage.html',
            controller: 'cardinalListPageCtrl'
          }
        }
      })

      .state('app.rule', {
        url: '/rule',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/rule/rule.html',
            controller: 'ruleCtrl'
          }
        }
      })

      .state('app.rulePage', {
        url: '/rulePage',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/rule/rulePage.html',
            //controller: 'ruleCtrl'
          }
        }
      })

      .state('app.notice', {
        url: '/notice',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/notice/notice.html',
            controller: 'noticeCtrl'
          }
        }
      })

      .state('app.noticePage', {
        url: '/noticePage',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/notice/noticePage.html',
            controller: 'noticePageCtrl'
          }
        }
      })

      .state('app.board', {
        url: '/board',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/board/board.html',
            controller: 'boardCtrl'
          }
        }
      })

      .state('app.boardPage', {
        url: '/boardPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/board/boardPage.html',
            controller: 'boardPageCtrl'
          }
        }
      })

      .state('app.ad', {
        url: '/ad',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/ad/ad.html',
            controller: 'adCtrl'
          }
        }
      })

      .state('app.adPage', {
        url: '/adPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/ad/adPage.html',
            controller: 'adPageCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/main');
    ///////////////////////////////////////////////////
  });
