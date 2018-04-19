myApp.controller('Home1Ctrl', function ($scope, $ionicModal, Service, $state, $timeout, $rootScope, RouletteService) {
  $scope.a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  $scope.b = [1, 2, 3];
  $scope.blackArray = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
  $scope.totalMoney = 10000;
  $scope.amount = 0;
  $scope.masterArray = {};
  $scope.visitedArray = [];

  $scope.getBlack = function (number) {
    var foundIndex = _.findIndex($scope.blackArray, function (n1) {
      return n1 == number;
    });
    if (foundIndex == -1) {
      return false;
    } else {
      return true;
    }
  }
  $scope.getIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    return index;
  }
  $scope.getQuadIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    index = index + '' + (index - 1) + '' + (index + 2) + '' + (index + 3) + 'Q';
    return index;
  }
  $scope.getRightPairIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    index = index + '' + (index + 3) + 'P';
    return index;
  }
  $scope.getBottomPairIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    index = index + '' + (index - 1) + 'P';
    return index;
  }
  RouletteService.getLastResults(function (data) {
    $scope.lastResults = data;
  });

  $scope.accessToken = $.jStorage.get("accessToken");
  if (_.isEmpty($scope.accessToken)) {
    $state.go("login");
  }

  $scope.playerData = function () {
    Service.sendAccessToken(function (data) {
      $scope.singlePlayerData = data.data.data;
      $scope.image = $scope.singlePlayerData.image;
      $scope.memberId = $scope.singlePlayerData._id;
      $scope.username = $scope.singlePlayerData.username;
      $scope.userType = $scope.singlePlayerData.userType;
      $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;
      $.jStorage.set("singlePlayerData", $scope.singlePlayerData);
    })
  };
  $scope.playerData();

  $scope.coinArray = [{
    name: "coin1",
    amount: 1,
    img: "img/roulette/coin1.png",
    selected: false
  }, {
    name: "coin2",
    amount: 5,
    img: "img/roulette/coin2.png",
    selected: false
  }, {
    name: "coin3",
    amount: 10,
    img: "img/roulette/coin3.png",
    selected: false
  }, {
    name: "coin4",
    amount: 100,
    img: "img/roulette/coin4.png",
    selected: false
  }];

  $scope.selectCoin = function (coin) {
    $scope.selectedCoin = coin;
    _.forEach($scope.coinArray, function (value) {
      if (value.name == coin.name) {
        value.selected = true;
      } else {
        value.selected = false;
      }
    })
  }

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

  $scope.totalMoney = 10000;
  $scope.amount = 0;
  $scope.masterArray = {};
  $scope.convertCoin = function (data) {
    var displayArray = [];
    var coin1 = _.filter(data, {
      'amount': 1
    }).length;
    var coin2 = _.filter(data, {
      'amount': 5
    }).length;
    var coin3 = _.filter(data, {
      'amount': 10
    }).length;
    var coin4 = _.filter(data, {
      'amount': 100
    }).length;
    coin2 += parseInt((coin1 / 5));
    coin1 = (coin1 % 5);
    coin3 += parseInt((coin2 / 2));
    coin2 = (coin2 % 2);
    coin4 += parseInt((coin3 / 10));
    coin3 = (coin3 % 10);
    var i = 0;
    for (i = 0; i < coin1; i++) {
      displayArray.push($scope.coinArray[0]);
    }
    for (i = 0; i < coin2; i++) {
      displayArray.push($scope.coinArray[1]);
    }
    for (i = 0; i < coin3; i++) {
      displayArray.push($scope.coinArray[2]);
    }
    for (i = 0; i < coin4; i++) {
      displayArray.push($scope.coinArray[3]);
    }
    return displayArray;
  };

  $scope.userBet = function (bet) {
    if ($scope.selectedCoin) {
      if ($scope.selectedCoin.amount <= $scope.totalMoney) {
        $scope.visitedArray.push(bet);
        console.log($scope.visitedArray);
        if (!$scope.masterArray[bet]) {
          $scope.masterArray[bet] = {
            coinArray: [],
            displayArray: []
          };
        }
        $scope.amount += $scope.selectedCoin.amount;
        $scope.masterArray[bet].coinArray.push($scope.selectedCoin);
        $scope.masterArray[bet].displayArray = $scope.convertCoin($scope.masterArray[bet].coinArray);
        $scope.totalMoney = $scope.totalMoney - $scope.selectedCoin.amount;
      } else {
        $scope.message = {
          heading: "Not enough money",
          content: "Not enough money for this bet. Try Again!!!"
        };
        $scope.showMessageModal();
      }
    } else {
      $scope.message = {
        heading: "Please Select coin",
        content: "Please Select the coin Before Bet. Try Again!!!"
      };
      $scope.showMessageModal();
    }
  }

  $scope.Undo = function () {
    if (!_.isEmpty($scope.masterArray)) {
      var lastVisitedElement = $scope.visitedArray[$scope.visitedArray.length - 1];
      var coinArray = $scope.masterArray[lastVisitedElement].coinArray;
      $scope.totalMoney = $scope.totalMoney + coinArray[coinArray.length - 1].amount;
      $scope.amount = $scope.amount - coinArray[coinArray.length - 1].amount;
      coinArray.pop();
      $scope.visitedArray.pop();
      $scope.masterArray[lastVisitedElement].displayArray = $scope.convertCoin(coinArray);
    }
  }

  $scope.removeAll = function () {
    $scope.masterArray = {};
  }

  if ($scope.betUser) {
    // $timeout(function () {

    // }, 30000);
  }

  io.socket.on("betsNotAllowed", function (data) {
    if (data.data == "Bets are Not Allowed") {
      if ($scope.betUser) {
        _.each($scope.betUser, function (user) {
          RouletteService.saveUserBets(user, function (data) {
            $rootScope.result = data.data.results;
          });
        });
      }
      $state.go("spinner");
    }
  });

  $scope.logout = function () {
    Service.playerLogout(function (data) {
      if (data.data.value) {
        $.jStorage.deleteKey("accessToken");
        $state.go("home");
      }
    });
  };
  io.socket.on("spinWheel", function (data) {
    $state.go("spinnerNo", {
      number: btoa(data.result + "roulette" + _.random(0, 9999999))
    });
  });

});
