myApp.directive('player', function () {
  return {
    restrict: 'E',
    scope: {
      player: '=data'
    },
    templateUrl: 'templates/directive/player.html'
  };
})
