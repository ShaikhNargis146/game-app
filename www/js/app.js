// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var myApp = angular.module('starter', ['ionic', 'starter.service', 'ui.select', 'ngSanitize', 'angularPromiseButtons'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
      }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('table', {
        url: '/table/:id',
        cache: false,
        templateUrl: 'templates/table.html',
        controller: 'TableCtrl'
      })
      .state('table6', {
        url: '/table6',
        cache: false,
        templateUrl: 'templates/table6.html',
        controller: 'Table6Ctrl'
      })
      // .state('app.table', {
      //   url: '/table/:id',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/table.html'
      //     }
      //   }
      // })      
      .state('redirecting', {
        url: '/redirecting',
        templateUrl: 'templates/redirecting.html',
        controller: 'RedirectingCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('lobby', {
        url: '/lobby',
        cache: false,
        templateUrl: 'templates/lobby.html',
        controller: 'LobbyCtrl'
      })
      .state('poker', {
        url: '/poker',
        cache: false,
        templateUrl: 'templates/poker.html',
        controller: 'PokerCtrl'
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('redirecting');
  });

myApp.controller("AppCtrl", function ($scope) {});



myApp.filter('uploadpath', function () {
  return function (input, width, height, style) {
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      if (input.indexOf('https://') == -1) {
        return imgpath + "?file=" + input + other;
      } else {
        return input;
      }
    }
  };
});

myApp.filter('serverimage', function () {
  return function (input, width, height, style) {
    if (input) {

      if (input.substr(0, 4) == "http") {
        return input;
      } else {
        image = imgpath + "?file=" + input;
        if (width) {
          image += "&width=" + width;
        }
        if (height) {
          image += "&height=" + height;
        }
        if (style) {
          image += "&style=" + style;
        }
        return image;
      }

    } else {
      //    return "img/logo.png";
      return "img/not.png";
    }
  };
});

myApp.filter('cardimg', function () {
  return function (input) {
    if (input) {
      return "img/cards/" + input + ".svg"

    } else {
      //    return "img/logo.png";
      return "img/not.png";
    }
  };
});
