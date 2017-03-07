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
            templateUrl: 'templates/page/myPage.html',
            controller: 'userCtrl'
          }
        }
      })

      .state('app.introduce', {
        url: '/introduce',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/introduce.html',
            //controller: 'introduceCtrl'
          }
        }
      })

      .state('app.greeting1', {
        url: '/greeting1',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/greeting1.html',
            //controller: 'greetingCtrl'
          }
        }
      })

      .state('app.greeting2', {
        url: '/greeting2',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/greeting2.html',
            //controller: 'greetingCtrl'
          }
        }
      })

      .state('app.tel', {
        url: '/tel',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/tel.html',
            //controller: 'telCtrl'
          }
        }
      })

      .state('app.cardinalList', {
        url: '/cardinalList',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/cardinalList.html',
            controller: 'cardinalListCtrl'
          }
        }
      })

      .state('app.rule', {
        url: '/rule',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/rule.html',
            controller: 'ruleCtrl'
          }
        }
      })

      .state('app.rulePage', {
        url: '/rulePage',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/rulePage.html',
            //controller: 'ruleCtrl'
          }
        }
      })

      .state('app.notice', {
        url: '/notice',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/notice.html',
            controller: 'noticeCtrl'
          }
        }
      })

      .state('app.board', {
        url: '/board',
        views: {
          'menuContent': {
            templateUrl: 'templates/page/board.html',
            controller: 'boardCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/main');
    ///////////////////////////////////////////////////
  });
