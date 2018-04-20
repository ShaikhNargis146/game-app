myApp.controller("OnlinegameCtrl", function ($scope, $state, $ionicModal, $stateParams, $ionicPlatform, Service, $http, $timeout) {


  Service.sendAccessToken(function (data) {
    $scope.singlePlayerData = data.data.data;
    var evoUser = {};
    evoUser.nickname = $scope.singlePlayerData.username;
    evoUser.userId = $scope.singlePlayerData._id;
    evoUser.game = $stateParams.gameId;
    $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;



    Service.getARCurrentBalance({
      'id': $scope.singlePlayerData._id
    }, function (data) {
      if (data.value) {

        console.log("get currecnt balc", data);
        $scope.ARBalance = data.data.balance;
        $scope.ARRate = data.data.rate;
      }
    })


    Service.playerSession($scope.singlePlayerData, function (data) {
      console.log("online game", data);
      if (data) {
        evoUser.sessionId = data.sid;
        Service.getEntryUrl(evoUser, function (data) {
          console.log("data----", data);
          EvolutionGaming.loadGame({
            url: "https://kingscasino.uat1.evo-test.com" + data.entry, // url part returned by User  Authentification in entry or entryEmbedded parameters
            offset: 0 // Optional. Default: 0. Need to be added if licensee has some buttons

          });
        });
      } else {}
    });


  })



});
