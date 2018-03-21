myApp.controller("RedirectingCtrl", function ($scope, Service, $state, $ionicPlatform) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait')
  })

  var player = $.jStorage.get("player");
  if (player) {
    $state.go("lobby");
  } else {
    $state.go("login");
  }
});

myApp.controller("LoginCtrl", function ($scope, Service, $state, $ionicPlatform) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait')
  })

  $scope.invalidUser = false;
  $scope.playerLogin = function (data, login) {
    $scope.loginPromise = Service.playerLogin(data, function (data) {
      $scope.accessT = data.data;
      console.log($scope.accessT);
      $.jStorage.set("accessToken", data.data);
      if (data.value) {
          $state.go("lobby");
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
