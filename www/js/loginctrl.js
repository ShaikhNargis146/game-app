myApp.controller("LoginCtrl", function ($scope, Service, $state, $ionicPlatform) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait')
  })

  $scope.invalidUser = false;
  $scope.playerLogin = function (data, login) {
    $scope.loginPromise = Service.playerLogin(data, function (data) {
      $scope.accessT = data.data;
      if (data.value) {
        Service.sendAccessToken($scope.accessT, function (data) {
          $.jStorage.set("player", data.data.data);
          $scope.playerData = $.jStorage.get("player");
          $state.go("lobby");
        })
      } else {
        if (!login.$invalid) {
          $scope.invalidUser = true;
        }
      }
    });
  };


  //js Storage 
  // $scope.jsData = $.jStorage.get("player");
  // $scope.jsData.accessToken = $scope.jsData.accessToken;

  // if ($scope.jsData.accessToken) {
  //   $state.go("lobby");
  // }
});
