myApp.directive('pokerLeftMenu', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/poker/poker-left-menu.html',
      link: function ($scope, element, attr) {}
    };
  })

  .directive('pokerTableInfo', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/poker/poker-table-info.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('pokerPotAmount', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/poker/poker-pot-amount.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('pokerTipAmount', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/poker/poker-tip-amount.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('pokerBootAnimation', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/poker/poker-boot-animation.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('pokerPlayers', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        player: "=ngPlayer",
        remainingPlayerCount: "=ngRemainingPlayer",
        remainingAllPlayerCount: "=ngRemainingAllPlayer",
        showWinnerPlayer: "=ngWinnerPlayer",
        gameType: "=ngGameType",
        pos: "=ngPos",
        sitHere: "=ngSitHere",
        winnerPlayerNo: "=ngWin",
        startAnimation: "=ngAnimation",
      },
      templateUrl: 'templates/directive/poker/poker-player.html',
      link: function (scope, element, attr) {

      }
    };
  })
  .directive('pokerMainPlayer', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        player: "=ngPlayer",
        gameType: "=ngGameType",
        pos: "=ngPos",
        mainplayer: "@ngMain",
        sitHere: "=ngSitHere",
        winnerPlayerNo: "=ngWin",
        startAnimation: "=ngAnimation",
        remainingPlayerCount: "=ngRemainingPlayer",
        remainingAllPlayerCount: "=ngRemainingAllPlayer",
      },
      templateUrl: 'templates/directive/poker/poker-main-player.html',
      link: function (scope, element, attr) {

      }
    };
  })
