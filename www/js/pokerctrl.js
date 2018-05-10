var myTableNo = 0;

myApp.controller("PokerCtrl", function ($scope, Service, pokerService, $state, $stateParams, $ionicModal, $ionicPlatform) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })


  // variables declaration
  $scope.tableId = $stateParams.id;
  $scope.memberId = $.jStorage.get('memberId');
  myTableNo = 0;
  $scope.sitHere = true;

  //end of variables declaration


  // for normal modal and ui popover
  $scope.closeAllModal = function () {
    $scope.leftMenu = false;
    $scope.showTableinfo = false;
    $scope.openSlider = false;
  }
  $scope.closeAllModal();

  $scope.closeLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = false;
  };
  $scope.openLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = true;
  };
  $scope.toggleTableInfo = function () {
    if ($scope.showTableinfo) {
      $scope.showTableinfo = false;
      $scope.closeAllModal();
    } else {
      $scope.closeAllModal();
      $scope.showTableinfo = true;
    }
  };
  $scope.stopProgation = function ($event) {
    $event.stopPropagation();
  };

  $scope.toggleSlider = function () {
    $scope.openSlider = !$scope.openSlider;
    console.log('s', $scope.openSlider);
  }



  $ionicModal.fromTemplateUrl('templates/model/poker/game-price-range.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.priceRangeModal = modal;
    // $scope.gameModal.show();
  });


  $scope.openPriceRangeModal = function () {
    $scope.priceRangeModal.show()
  }

  $scope.closePriceRangeModal = function () {
    $scope.priceRangeModal.hide();
  }
  //end


  $scope.backToLobby = function () {
    $state.go('lobby');
  }



  $scope.slider = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      step: 10,
      minLimit: 0,
      maxLimit: 100
    }
  };


  // All game login starts here


  // $scope.playerData = function () {
  //   Service.sendAccessToken(function (data) {
  //     if (data && data.data && data.data.data) {
  //       $scope.singlePlayerData = data.data.data;
  //       $scope.image = $scope.singlePlayerData.image;
  //       $scope.username = $scope.singlePlayerData.username;
  //       $scope.userType = $scope.singlePlayerData.userType;
  //       $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;
  //       $scope.memberId = data.data.data._id;
  //       $.jStorage.set("memberId", $scope.memberId);
  //       // console.log("member id", $.jStorage.get('memberId'));
  //     } else {
  //       $state.go("login");
  //     }
  //   });
  // };
  // $scope.playerData();



  if (!$scope.tableId) {
    $state.go('lobby');
  }

  $scope.updatePlayers = function () {
    pokerService.getOneTableDetails($scope.tableId, function (data) {
      console.log(data);
      $scope.iAmThere(data.data.players);
      $scope.reArragePlayers(data.data.players);
      console.log($scope.players);
    })
  }
  $scope.updatePlayers();






  $scope.sitHerefn = function (num) {
    $scope.openPriceRangeModal();

  }








  $scope.reArragePlayers = function (playersData) {
    var diff = 9 - myTableNo;
    var players = _.times(9, function (n) {
      var playerReturn = _.find(playersData, function (singlePlayer) {
        if (singlePlayer) {
          var checkNo = (singlePlayer.playerNo + diff);
          if (checkNo > 9) {
            checkNo = checkNo - 9;
          }

          if ((n + 1) == checkNo) {
            return singlePlayer;
          } else {
            return null;
          }
        }

      });
      return _.cloneDeep(playerReturn);
    });
    $scope.players = players;
  }
  $scope.iAmThere = function (data) {
    if (!$scope.memberId) {
      $scope.memberId = $.jStorage.get('memberId');
    }
    $scope.isThere = false;
    _.forEach(data, function (value) {
      if (value && value.memberId == $scope.memberId) {

        $scope.isThere = true;
        myTableNo = value.playerNo;
        startSocketUpdate();
        return false;
      }
    });
    $scope.sitHere = !$scope.isThere;

    console.log("you are there", $scope.isThere);
    // In Case he is already Sitting Please Enable the Game
  };



  $scope.$on("$destroy", function () {
    $scope.priceRangeModal.remove();
  })

});
