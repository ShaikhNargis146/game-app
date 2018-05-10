// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var myApp = angular.module('starter', ['ionic', 'rzModule', 'starter.service', 'ui.select', 'ngSanitize', 'angularPromiseButtons'])

  .run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      StatusBar.hide();

      if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required

        StatusBar.styleDefault();
      }


      window.plugins.insomnia.keepAwake();
      // Preload audio resources
      window.plugins.NativeAudio.preloadComplex('timer', 'audio/timer.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log('error: ' + msg);
      });
      window.plugins.NativeAudio.preloadSimple('coin', 'audio/coin.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log('error: ' + msg);
      });
      window.plugins.NativeAudio.preloadComplex('winner', 'audio/winner.wav', 1, 1, 0, function (msg) {}, function (msg) {
        console.log('error: ' + msg);
      });
      window.plugins.NativeAudio.preloadComplex('shuffle', 'audio/shuffle.wav', 1, 1, 0, function (msg) {}, function (msg) {
        console.log('error: ' + msg);
      });
      window.plugins.NativeAudio.preloadSimple('button', 'audio/button.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log('error: ' + msg);
      });
      //spin wheel
      window.plugins.NativeAudio.preloadComplex('spinwheel', 'audio/wheel_sound.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log("error", msg);
      })
      window.plugins.NativeAudio.preloadComplex('lose', 'audio/lose.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log("error", msg);
      })
      window.plugins.NativeAudio.preloadComplex('win', 'audio/win.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log("error", msg);
      })
      window.plugins.NativeAudio.preloadComplex('click', 'audio/click.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log("error", msg);
      })
      window.plugins.NativeAudio.preloadComplex('chip', 'audio/chip.mp3', 1, 1, 0, function (msg) {}, function (msg) {
        console.log("error", msg);
      })
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.views.swipeBackEnabled(false);
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
        cache: false,
        templateUrl: 'templates/redirecting.html',
        controller: 'RedirectingCtrl'
      })
      .state('onlinegame', {
        url: '/onlinegame/:gameId',
        cache: false,
        templateUrl: 'templates/onlinegame.html',
        controller: 'OnlinegameCtrl'
      })
      .state('login', {
        url: '/login',
        cache: false,
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
        url: '/poker/:id',
        cache: false,
        templateUrl: 'templates/poker.html',
        controller: 'PokerCtrl'
      })
      .state('roulette', {
        url: '/roulette',
        cache: false,
        templateUrl: 'templates/roulette/home.html',
        controller: 'HomeCtrl'
      })
      .state('spinner', {
        url: '/spinner',
        cache: false,
        templateUrl: 'templates/roulette/spinner.html',
        controller: 'SpinnerCtrl'
      })
      .state('spinnerNo', {
        url: '/spinner/:number',
        cache: false,
        templateUrl: 'templates/roulette/spinner.html',
        controller: 'SpinnerCtrl'
      });
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


myApp.filter('positive', function () {
  return function (input) {
    if (!input) {
      return 0;
    }
    return Math.abs(input);
  };
})
