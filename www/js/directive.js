myApp.directive('card', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        card: "@",
        width: "@",
        height: "@"
      },
      templateUrl: 'templates/directive/card.html',
      link: function ($scope, element, attr) {
        function calc() {
          // $scope.style = {
          //   width: $scope.width + "px",
          //   height: $scope.height + "px"
          // };
          $scope.cardFile = "img/cards/" + _.toUpper($scope.card) + ".svg";
        }
        calc();
        $scope.$watch("card", function () {
          calc();
        });
      }
    };
  })
  .directive('players', function () {
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
        timerOut: "&"
      },
      templateUrl: 'templates/directive/player.html',
      link: function (scope, element, attr) {

        $('.pietimer1').pietimer({
          seconds: 20,
          color: 'rgb(219, 22, 22,0.5)',
          height: 100,
          width: 100
        });
      }
    };
  })
  .directive('mainplayer', function () {
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
      templateUrl: 'templates/directive/main-player.html',
      link: function (scope, element, attr) {}
    };
  })
  .directive('mainplayercard', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        player: "=ngPlayer",
        // gameType: "=ngGameType",
        // pos: "=ngPos",
        // mainplayer: "@ngMain",
        sitHere: "=ngSitHere",
        winnerPlayerNo: "=ngWin",
        startAnimation: "=ngAnimation",
        remainingPlayerCount: "=ngRemainingPlayer",
        remainingAllPlayerCount: "=ngRemainingAllPlayer",
        cardOneJoker: "=ngCardOneJoker",
        cardTwoJoker: "=ngCardTwoJoker",
        cardThreeJoker: "=ngCardThreeJoker",
        showCard: "&",
      },
      templateUrl: 'templates/directive/mainplayercard.html',
      link: function (scope, element, attr) {}
    };
  })
  .directive('joker', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        gameType: "=ngGameType"
      },
      templateUrl: 'templates/directive/jokerCard.html',
      link: function ($scope, element, attr) {
        $scope.style = {
          "margin-left": "10px"
        }
      }
    };
  })
  .directive('gameHistory', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/game-history.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('potAmount', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        amount: "=ngAmount",
        winnerPlayerNo: "=ngWinner",
        players: "=ngPlayer"
      },
      templateUrl: 'templates/directive/pot-amount.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('tipAmount', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        amount: "=ngAmount",
        PlayerNo: "=ngPlayerNo",
        players: "=ngPlayer"
      },
      templateUrl: 'templates/directive/tip-amount.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('tableInfo', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/table-info.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('leftMenu', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/left-menu.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('rightMenu', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/right-menu.html',
      link: function ($scope, element, attr) {}
    };
  })
  .directive('playerArea', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/player-area.html',
      link: function ($scope, element, attr) {

      }
    };
  });
