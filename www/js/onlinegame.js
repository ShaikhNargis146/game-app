var mySocket;
myApp.controller("OnlinegameCtrl", function ($scope, $state, $ionicModal, $stateParams, $ionicPlatform, Service, $http, $timeout) {
  var s = document.createElement('script'); // use global document since Angular's $document is weak 
  s.src = 'https://kingscasino.uat1.evo-test.com/mobile/js/iframe.js';
  document.body.appendChild(s);

  Service.sendAccessToken(function (data) {
    $scope.singlePlayerData = data.data.data;
    var evoUser = {};
    evoUser.nickname = $scope.singlePlayerData.username;
    evoUser.userId = $scope.singlePlayerData._id;
    evoUser.game = $stateParams.gameId;
    $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;



    Service.getARCurrentBalance({
      'accessToken': $.jStorage.get("accessToken")
    }, function (data) {
      if (data.value) {
        console.log("get currecnt balc", data);
        $scope.ARBalance = data.data.balance;
        $scope.ARRate = data.data.rate;
      }else if (data.error == 'No Member Found') {
        $.jStorage.flush();
        mySocket.disconnect();
        mySocket.close()
        mySocket.on("disconnect", function () {
        console.log("client disconnected from server");
        });
        $state.go('login');
        }
    })
    // io.sails.url='http://ar.wohlig.co.in';

    mySocket = io.connect(adminARUUU, {
      reconnection: false
    });
    mySocket.on('connect', function onConnect() {
      console.log("Socket connected!", mySocket);
    });
    // mySocket.on('redirectPlayer', function (data) {
    //   console.log("redirectPlayer",data);

    // });

    mySocket.on('balanceSocket' + $.jStorage.get("userId"), function (data) {
      console.log(data);
      $scope.ARBalance = Number(data.balance);
      $scope.balance = Number(data.balance) * $scope.ARRate;
      $scope.$apply();
    });

    Service.playerSession($scope.singlePlayerData, function (data) {
      console.log("online game", data);
      if (data) {
        evoUser.sessionId = data.sid;
        Service.getEntryUrl(evoUser, function (data) {
          console.log("data----", data);
          if (typeof EvolutionGaming !== "undefined") {
            EvolutionGaming.loadGame({
              url: "https://kingscasino.uat1.evo-test.com" + data.entry, // url part returned by User  Authentification in entry or entryEmbedded parameters
              offset: 0 // Optional. Default: 0. Need to be added if licensee has some buttons

            });
          }
        });
      } else {}
    });


  })
  $scope.backToLobby = function () {
    mySocket.disconnect();
    $state.go('lobby');
    mySocket.on("disconnect", function () {
      console.log("client disconnected from server");
    });
  }


});
