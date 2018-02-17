myApp.controller("LoginCtrl", function ($scope, Service, $state, $ionicPlatform) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait')
  })

  console.log("login controller");
  $scope.invalidUser = false;
  $scope.playerLogin = function (data, login) {
    console.log("in player login")
    Service.playerLogin(data, function (data) {
      $scope.accessT = data.data;
      if (data.value) {
        console.log("$scope.accessT", $scope.accessT);
        console.log("player exist....");
        Service.sendAccessToken(data, function (data) {
          console.log("dataaaaa", data);
          $.jStorage.set("player", data.data.data);
          $scope.playerData = $.jStorage.get("player");
          $scope.data.playerData = $scope.playerData;
          console.log("login completed");
          $state.go("lobby");
        })
      } else {
        console.log("Invalid credentials");
        if (!login.$invalid) {
          $scope.invalidUser = true;
        }
        console.log(login)
      }
    })
  }

});
