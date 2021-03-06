myApp.controller("RedirectingCtrl", function ($scope, Service, $state, $ionicPlatform) {
  if (ionic.Platform.isAndroid()) {
    $ionicPlatform.ready(function () {
      screen.orientation.lock('portrait')
    })
    screen.orientation.lock('portrait');
  } else {

    console.log("nothing for ios")
  }
  var accessToken = $.jStorage.get("accessToken");

  if (_.isEqual(accessToken, {})) {
    $.jStorage.flush();
  }
  var accessToken = $.jStorage.get("accessToken");
  if (accessToken) {
    $state.go("lobby");
  } else {
    $state.go("login");
  }
});

myApp.controller("LoginCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout) {

  $ionicPlatform.ready(function () {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock('portrait')
    } else {

    }
  })

  $ionicModal.fromTemplateUrl('templates/model/message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.messageModal = modal;
  });

  $scope.showMessageModal = function () {
    $scope.messageModal.show();
    $timeout(function () {
      $scope.closeMessageModal();
    }, 2000);
  };
  $scope.closeMessageModal = function () {
    $scope.messageModal.hide();
  };

  $scope.invalidUser = false;
  $scope.playerLogin = function (data, login) {
    $scope.loginPromise = Service.playerLogin(data, function (data) {
      console.log("login", data);
      $.jStorage.set("accessToken", data.data);
      if (data && !_.isEmpty(data.data)) {
        $state.go("lobby");
      } else if (data.error == "Member already Logged In") {
        $scope.message = {
          heading: "User Already Loged In",
          content: "User already loged in another device. Logout from that device. Try Again!!!"
        };
        $scope.showMessageModal();
      } else if (data.error == "Login denied") {
        $scope.message = {
          heading: "Login denied",
          content: "Login denied"
        };
        $scope.showMessageModal();
      } else {
        $scope.message = {
          heading: "Incorrect Username Password",
          content: "Try Again!!!"
        };
        $scope.showMessageModal();
      }
    });
  };


  //js Storage 
  $scope.accessToken = $.jStorage.get("accessToken");

  if (_.isEqual($scope.accessToken, {})) {
    $.jStorage.flush();
  }
  $scope.accessToken = $.jStorage.get("accessToken");

  if ($scope.accessToken) {
    $state.go("lobby");
  }
  $ionicPlatform.registerBackButtonAction(function (event) {
    ionic.Platform.exitApp();
    // event.preventDefault();
  }, 100);
});
