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
          $scope.style = {
            width: $scope.width + "px",
            height: $scope.height + "px"
          };
          $scope.cardFile = "img/cards/" + _.toUpper($scope.card) + ".svg";
        }
        calc();
        $scope.$watch("card", function () {
          calc();
        });
      }
    };
  })
  .directive('player', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        player: "=ngPlayer",
        gameType: "=ngGameType"
      },
      templateUrl: 'templates/directive/player.html',
      link: function ($scope, element, attr) {
        //console.log("Player Loaded");
      }
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
  });