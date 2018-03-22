var updateSocketFunction;
var showWinnerFunction;
var myTableNo;
myApp.controller("TableCtrl", function ($scope, $ionicModal, $ionicPlatform, $state, Service, $stateParams, $timeout, $interval) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape');
  });



  $scope.playerData = function () {
    Service.sendAccessToken(function (data) {
      if (data && data.data && data.data.data) {
        $scope.singlePlayerData = data.data.data;
        $scope.singlePlayerData.memberId = $scope.singlePlayerData._id;
        $scope.image = $scope.singlePlayerData.image;
        $scope.username = $scope.singlePlayerData.username;
        $scope.userType = $scope.singlePlayerData.userType;
        $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;
        $scope.memberId = data.data.data.memberId;
      } else {
        $state.go("login");
      }
    });
  };
  $scope.playerData();


  $scope.tableId = $stateParams.id;

  Service.getOneTable($stateParams.id, function (data) {
    $scope.gotTableInfo = true;
    $scope.tableData = data.data.data;
    $scope.bootAmt = $scope.tableData.bootAmt;
    $scope.chalLimit = $scope.tableData.chalLimit;
    $scope.blindAmt = $scope.tableData.blindAmt;
    $scope.chalAmt = $scope.tableData.chalAmt;
    $scope.maxBlind = $scope.tableData.maxBlind;
    $scope.tableShow = $scope.tableData.tableShow;
    $scope.coin = $scope.blindAmt;
  });


  function startSocketUpdate() {
    io.socket.off("Update", updateSocketFunction);
    io.socket.on("Update", updateSocketFunction);

  }

  // All Above Functions






  // Game Play functions

  $scope.botAmount = 0;
  $scope.PotAmount = 0;
  $scope.startAnimation = false;
  $scope.winnerPlayerNo = -1;

  $scope.insufficientFunds = false;
  $scope.chaalAmt = 0;
  $scope.startCoinAnime = false;



  // Socket Update function with REST API
  $scope.updatePlayers = function () {

    $scope.l = {};
    $scope.l.tableId = $stateParams.id;
    Service.getAll($scope.l, function (data) {
      // check whether dealer is selected or not
      $scope.maxAmt = data.data.data.maxAmt;
      $scope.minAmt = data.data.data.minAmt;
      $scope.setBetAmount($scope.minAmt, $scope.maxAmt);
      $scope.players = data.data.data.players;
      if (data.data.data.pot) {
        $scope.potAmount = data.data.data.pot.totalAmount;
      }
      $scope.iAmThere($scope.players);
    });

  };

  $scope.updatePlayers();

  $scope.iAmThere = function (data) {
    $scope.isThere = false;
    _.forEach(data, function (value) {
      if (value.memberId == $scope.memberId) {
        $scope.isThere = true;
        myTableNo = value.playerNo;
        console.log(value.playerNo);
        startSocketUpdate();
        return false;
      }
    });
    $scope.sitHere = !$scope.isThere;


    // In Case he is already Sitting Please Enable the Game
  };


  //player sitting
  $scope.sitHerefn = function (sitNum) {
    if (!$scope.sitHere) {
      return;
    }
    $scope.dataPlayer = {};
    $scope.dataPlayer.playerNo = sitNum;
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.sitNummber = sitNum;
    myTableNo = sitNum;
    // $scope.dataPlayer.socketId = $scope.socketId;
    Service.savePlayerToTable($scope.dataPlayer, function (data) {
      console.log("sit", data);
      if (data.data.value) {
        $scope.sitHere = false;
        startSocketUpdate();
      } else {
        if (data.data.error == "position filled") {
          $scope.showInsufficientFundsModal(); // change it to popup for position filled

        } else if (data.data.error == "Insufficient Balance") {
          $scope.showInsufficientFundsModal();
        }
      }
    });
  };

  $scope.getPlayer = function (number) {
    var player = _.find($scope.players, function (n) {
      if ((myTableNo + number) == n.playerNo) {
        return n;
      }
    });
    // if (player >= 0) {
    //   return $scope.players[player];
    // } else {
    //   return {};
    // }
    return player;


  };


  //loader for table
  $scope.ShowLoader = true;
  // console.log("socket id from socket", $.jStorage.get("socktId"));
  if ($.jStorage.get("socketId")) {
    $scope.ShowLoader = false;
  } else {
    $timeout(function () {
      $scope.ShowLoader = false;
    }, 5000);
  }






  //ask for sit here when joining new game



  $scope.closeAllModal = function () {
    $scope.showTableinfo = false;
    $scope.rightMenu = false;
    $scope.leftMenu = false;
    $scope.viewHistory = false;
  };

  $scope.closeAllModal();

  $scope.closeLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = false;
  };
  $scope.openLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = true;
  };

  $scope.openRightMenu = function () {
    $scope.closeAllModal();
    $scope.rightMenu = true;
  };
  $scope.closeRightMenu = function () {
    $scope.closeAllModal();
    $scope.rightMenu = false;
  };



  //toggle for played history
  $scope.toggleHistory = function () {
    if ($scope.viewHistory) {
      $scope.viewHistory = false;
      $scope.closeAllModal();
    } else {
      $scope.closeAllModal();
      $scope.viewHistory = true;
    }
  };

  //toggle for table-info
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
    $event.stopPropagation(); //wont call parent onclick function
  };

  //modal for player details
  $ionicModal.fromTemplateUrl('templates/model/player-details.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.playerDetails = modal;
  });

  $scope.openPlayerDetails = function ($event, id) {
    $event.stopPropagation();

    $scope.plrNo = plrno;
    $scope.data = {};
    $scope.data.id = id;
    Service.getByPlrId($scope.data, function (data) {
      $scope.pName = data.data.data.name;
      $scope.pImage1 = data.data.data.image;
      $scope.pUserType = data.data.data.userType;
      $scope.pCredit = data.data.data.totalAmount;
      $scope.playerDetails.show();
    });
  };

  $scope.closePlayerDetails = function () {
    $scope.playerDetails.hide();
  };

  //table info modal
  $ionicModal.fromTemplateUrl('templates/model/tableinfo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.tableInfoModal = modal;
    $scope.tableInfoModal.show();
  });

  $scope.showTableInfoModal = function () {
    $scope.tableInfoModal.show();
  };
  $scope.closeTableInfoModal = function () {
    $scope.tableInfoModal.hide();
  };



  $ionicModal.fromTemplateUrl('templates/model/sideshow.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.sideShowModal = modal;
    // $scope.sideShowModal.show();/
  });

  $scope.showSideShowModal = function () {
    $scope.sideShowModal.show();

  };
  $scope.closeSideShowModal = function () {
    $scope.sideShowModal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/model/message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.messageModal = modal;
    // $scope.showMessageModal();

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

  $ionicModal.fromTemplateUrl('templates/model/insufficient-funds.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.insufficientFundsModal = modal;
    // $scope.showMessageModal();

  });

  $scope.showInsufficientFundsModal = function () {
    $scope.insufficientFundsModal.show();
    $timeout(function () {
      $scope.closeInsufficientFundsModal();
    }, 2000);
  };
  $scope.closeInsufficientFundsModal = function () {
    $scope.insufficientFundsModal.hide();
  };






  //backtolobby
  $scope.backToLobby = function () {
    var playerdetails = {};
    playerdetails.tableId = $scope.tableId;
    Service.deletePlayer(playerdetails, function (data) {});
    $state.go("lobby");
  };

  //show card
  $scope.showCard = function () {
    $scope.cardData = {};
    $scope.cardData.tableId = $scope.tableId;

    Service.makeSeen($scope.cardData, function (data) {
      if (data.data) {}

    });
  };

  $scope.$on('$destroy', function () {
    $scope.tableInfoModal.remove();
    $scope.sideShowModal.remove();
    $scope.messageModal.remove();
    $scope.insufficientFundsModal.remove();
    $scope.closeAllModal();
  });

  //back button
  $ionicPlatform.onHardwareBackButton(function (event) {
    event.preventDefault();
    event.stopPropagation();
  });

  //for table data//


  //seat selection Player
  io.socket.on("seatSelection", function (data) {});
  // Update Socket Player
  function updateSocketFunction(data) {
    console.log("update socket", data);
    data = data.data;
    $scope.extra = data.extra;

    if ($scope.extra) {
      if ($scope.extra.newGame) {
        console.log("new game start here");
        $scope.chaalAmt = data.table.blindAmt;
        $scope.startCoinAnime = true;
        $scope.winnerPlayerNo = -1;
        $timeout(function () {
          $scope.startCoinAnime = false;
        }, 1000);
      }
      if ($scope.extra.chaalAmt) {
        $scope.chaalAmt = $scope.extra.chaalAmt;
      }

      if ($scope.extra.serve) {
        $scope.startAnimation = true;
        $timeout(function () {
          $scope.startAnimation = false;
        }, 50);
      }
    }

    if (data.pot) {
      $scope.potAmount = data.pot.totalAmount;
      $scope.updatePotAmount(data.pot.totalAmount);
    } else {
      $scope.potAmount = 0;
    }

    $scope.maxAmt = data.maxAmt;
    $scope.minAmt = data.minAmt;
    $scope.setBetAmount($scope.minAmt, $scope.maxAmt);
    $scope.players = data.players;

    $scope.remainingPlayerCount = _.filter($scope.players, function (player) {
      if (player.isActive && !player.isFold) {
        return true;
      }
    }).length;
    $scope.blindPlayerCount = _.filter($scope.players, function (player) {
      if (player.isActive && !player.isFold && player.blind) {
        return true;
      }
    }).length;


    console.log($scope.players, myTableNo);
    if (($scope.getPlayer(0).balance) < (data.table.chalAmt * 2 * 3)) {
      $scope.insufficientFunds = true;
      // $scope.showInsufficientFundsModal();
    } else {
      $scope.insufficientFunds = false;
    }
    $scope.$apply();
  }


  function showWinnerFunction(data) {
    $scope.showWinnerPlayer = data.data.players;
    $scope.winner = _.find($scope.showWinnerPlayer, {
      'winRank': 1,
      'winner': true
    });
    $scope.winnerPlayerNo = $scope.winner.playerNo;
  }

  //showWinner
  $scope.showWinner = function () {
    var tableId = $scope.tableId;
    $scope.showWinnerPromise = Service.showWinner(tableId, function (data) {});
  };

  // io.socket.on("showWinner", showWinnerFunction);

  //to add and remove coin
  $scope.addCoin = function () {
    $scope.betamount = $scope.betamount * 2;
  };

  $scope.removeCoin = function () {
    $scope.betamount = $scope.betamount / 2;
  };




  $scope.standUp = function () {
    var playerdetails = {};
    playerdetails.tableId = $scope.tableId;
    console.log("standup");
    Service.deletePlayer(playerdetails, function (data) {
      // $scope.sitHere = false;
      // $scope.updatePlayers();
      // $scope.closeAllModal();
      console.log("delete player in stadup", data)
      $state.reload();


    });

  }

  //fill all player
  $scope.fillAllPlayer = function (array) {
    var filled = [];
    for (i = 0; i < array.length; i++) {
      filled[array[i].playerNo - 1] = array[i];
    }
    for (i = 0; i < 9; i++) {
      if (filled[i] === undefined) {
        filled[i] = 0;
      }
    }
    return filled;
  };


  $scope.rearrangePlayer = function (demoPlayer) {
    var n = 0;
    var memberId = $scope.playerData.memberId;
    for (i = 0; i < demoPlayer.length; i++) {
      if (demoPlayer[i].memberId == memberId) {
        n = i + 1;
      }
    }
    var temp = _.concat(_.slice(demoPlayer, n, demoPlayer.length), _.slice(demoPlayer, 0, n));
    return temp;

  };





  $scope.playChaal = function () {

    $scope.chaalPromise = Service.chaal({
      tableId: $scope.tableId,
      amount: $scope.betamount
    }, function (data) {});
  };

  //tip
  $scope.makeTip = function () {
    var playerdetails = {};
    playerdetails.tableId = $scope.tableId;
    playerdetails.amount = 100;
    Service.maketip(playerdetails, function (data) {});
  };

  //pack 
  $scope.pack = function () {
    var playerdetails = {};
    playerdetails.tableId = $scope.tableId;
    $scope.packPromise = Service.pack(playerdetails, function (data) {});
  };

  //sideshow
  $scope.sideShow = function () {
    var playerdetails = {};
    playerdetails.tableId = $scope.tableId;
    $scope.sideShowPromise = Service.sideShow(playerdetails, function (data) {});
  };


  io.socket.on("sideShowCancel", function (data) {
    if (data.data.toPlayer.accessToken == $scope.accessToken) {
      $scope.message = {
        heading: "Side Show",
        content: "Your request for the Side show has been rejected!"
      };
      $scope.showMessageModal();

    }
  });

  io.socket.on("sideShow", function (data) {
    if (data.data.toPlayer.accessToken == $scope.accessToken) {
      $scope.showSideShowModal();
    }
    if (data.data.fromPlayer.accessToken == $scope.accessToken) {
      $scope.message = {
        heading: "Side Show",
        content: "Your request for the Side show has been sent!"
      };
      $scope.showMessageModal();

    }
  });

  //sideShow Maker
  $scope.doSideShow = function () {
    var playerdetails = {};
    playerdetails.tableId = $scope.tableId;
    Service.doSideShow(playerdetails, function (data) {});
  };

  //sideShow Maker
  $scope.rejectSideShow = function () {
    var playerdetails = {};
    playerdetails.tableId = $scope.tableId;
    Service.rejectSideShow(playerdetails, function (data) {});
  };




  //  betamount;
  $scope.setBetAmount = function (minamt, maxamt) {
    $scope.betamount = minamt;
  };

  $scope.updatePotAmount = function (potamt) {
    $scope.potAmount = potamt;
  };

});
