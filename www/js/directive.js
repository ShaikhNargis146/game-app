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
          $scope.cardFile = "img/" + _.toUpper($scope.card) + ".png";
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
        gameType: "=ngGameType"
      },
      templateUrl: 'templates/directive/player.html',
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
        //  console.log("jokerCard Loaded");
      }
    };
  })
  .directive('gameHistory', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/game-history.html',
      link: function ($scope, element, attr) {
        //console.log("Player Loaded");
      }
    };
  })
  .directive('leftMenu', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/left-menu.html',
      link: function ($scope, element, attr) {
        //console.log("Player Loaded");
      }
    };
  })
  .directive('rightMenu', function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'templates/directive/right-menu.html',
      link: function ($scope, element, attr) {
        //console.log("Player Loaded");
      }
    };
  });
