var updateSocketFunction;
var showWinnerFunction;
myApp.controller("TableCtrl", function ($scope, $ionicModal, $ionicPlatform, $state, Service, $stateParams, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape');
  });

  $scope.jsData = $.jStorage.get("player");
  $scope.jsData.accessToken = $scope.jsData.accessToken;
  $scope.jsData.memberId = $scope.jsData._id;
  $.jStorage.set("player", $scope.jsData);
  $scope.playerData = $.jStorage.get("player");
  $scope.image = $scope.playerData.image;
  $scope.username = $scope.playerData.username;
  $scope.userType = $scope.playerData.userType;
  $scope.balance = $scope.playerData.creditLimit + $scope.playerData.balanceUp;


  //ask for sit here when joining new game
  $scope.sitHere = false;
  $scope.botAmount = 0;
  $scope.PotAmount = 0;
  $scope.startAnimation = false;
  $scope.winnerPlayerNo = -1;

  $scope.insufficientFunds = false;



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

  $ionicModal.fromTemplateUrl('templates/model/sideshowsend.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.sideShowSendModal = modal;
    // $scope.showSideShowSendModal();

  });

  $scope.showSideShowSendModal = function () {
    $scope.sideShowSendModal.show();
    $timeout(function () {
      $scope.closeSideShowSendModal();
    }, 2000);
  };
  $scope.closeSideShowSendModal = function () {
    $scope.sideShowSendModal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/model/insufficient-funds.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.insufficientFundsModal = modal;
    // $scope.showSideShowSendModal();

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
    playerdetails.accessToken = $scope.jsData.accessToken;
    playerdetails.tableId = $scope.tableId;
    Service.deletePlayer(playerdetails, function (data) {
      console.log("delete player", data);
    });
    $state.go("lobby");
  };

  //show card
  $scope.showCard = function () {
    $scope.cardData = {};
    $scope.cardData.accessToken = $scope.jsData.accessToken;
    $scope.cardData.tableId = $scope.tableId;

    Service.makeSeen($scope.cardData, function (data) {
      if (data.data) {}

    });
  };

  $scope.$on('$destroy', function () {
    $scope.tableInfoModal.remove();
    $scope.sideShowModal.remove();
    $scope.sideShowSendModal.remove();
    $scope.insufficientFundsModal.remove();
    $scope.closeAllModal();
  });

  //back button
  $ionicPlatform.onHardwareBackButton(function (event) {
    event.preventDefault();
    event.stopPropagation();
  });

  //for table data//

  $scope.tableId = $stateParams.id;

  Service.getOneTable($stateParams.id, function (data) {
    $scope.tableData = data.data.data;
    $scope.bootAmt = $scope.tableData.bootAmt;
    $scope.chalLimit = $scope.tableData.chalLimit;
    $scope.blindAmt = $scope.tableData.blindAmt;
    $scope.chalAmt = $scope.tableData.chalAmt;
    $scope.maxBlind = $scope.tableData.maxBlind;
    $scope.tableShow = $scope.tableData.tableShow;
    $scope.coin = $scope.blindAmt;
  });

  // Update Socket Player
  updateSocketFunction = function (data) {
    console.log("update socket", data);
    data = data.data;
    $scope.extra = data.extra;
    if ($scope.extra) {}

    if ($scope.extra) {
      if ($scope.extra.serve) {
        console.log("serve")
        $scope.startAnimation = true;
        $timeout(function () {
          $scope.startAnimation = false;
        }, 5000);
      }
    }

    if (data.pot) {
      $scope.potAmount = data.pot.totalAmount;
      $scope.updatePotAmount(data.pot.totalAmount);
    }

    $scope.maxAmt = data.maxAmt;
    $scope.minAmt = data.minAmt;
    $scope.setBetAmount($scope.minAmt, $scope.maxAmt);
    $scope.rawdata = data.players;
    $scope.remainingPlayer = _.filter(data.players, function (n) {
      return n.isActive && !n.isFold;
    }).length;
    //re-arrange only if player already have seat
    $scope.IamThere($scope.rawdata, $scope.playerData.memberId);
    //making 9 length array by filling 0 in all empty field
    $scope.rawdata2 = $scope.fillAllPlayer($scope.rawdata);
    $scope.players = $scope.rearrangePlayer($scope.rawdata2);



    if (($scope.players[8].isTurn) && (($scope.players[8].balance - $scope.players[8].totalAmount) < (data.table.chalAmt * 2 * 3))) {
      $scope.insufficientFunds = true;
      $scope.showInsufficientFundsModal();
    } else {
      $scope.insufficientFunds = false;
    }
    $scope.$apply();
  };


  showWinnerFunction = function (data) {
    console.log("winner data", data.data.players);
    $scope.showWinnerPlayer = data.data.players;
    $scope.winner = _.find($scope.showWinnerPlayer, {
      'winRank': 1,
      'winner': true
    })
    $scope.winnerPlayerNo = $scope.winner.playerNo;
    console.log("winnerPlayerNo", $scope.winnerPlayerNo);

    $timeout(function () {
      $scope.winnerPlayerNo = -1;
    }, 8000);
  };

  //showWinner
  $scope.showWinner = function () {
    console.log("entered");
    var tableId = $scope.tableId;
    Service.showWinner(tableId, function (data) {});
  };

  io.socket.on("Update", updateSocketFunction);
  io.socket.on("showWinner", showWinnerFunction);
  $scope.updatePlayers = function () {

    $scope.l = {};
    $scope.l.tableId = $stateParams.id;
    Service.getAll($scope.l, function (data) {
      // check whether dealer is selected or not
      console.log("update player", data)
      $scope.maxAmt = data.data.data.maxAmt;
      $scope.minAmt = data.data.data.minAmt;
      $scope.setBetAmount($scope.minAmt, $scope.maxAmt);
      $scope.rawdata = data.data.data.players;
      if (data.data.data.pot) {
        $scope.potAmount = data.data.data.pot.totalAmount;
      }
      $scope.remainingPlayer = _.filter(data.data.data.players, function (n) {
        return n.isActive && !n.isFold;
      }).length;
      $scope.IamThere($scope.rawdata, $scope.playerData.memberId);
      $scope.rawdata2 = $scope.fillAllPlayer($scope.rawdata);
      $scope.players = $scope.rearrangePlayer($scope.rawdata2);

    });

  };

  $scope.updatePlayers();
  //to add and remove coin
  $scope.addCoin = function () {
    $scope.betamount = $scope.betamount * 2;
  };

  $scope.removeCoin = function () {
    $scope.betamount = $scope.betamount / 2;
  };

  //player sitting
  $scope.sitHerefn = function (sitNum) {
    if (!$scope.sitHere) {
      return;
    }
    $scope.socketId = $.jStorage.get("socketId");
    $scope.dataPlayer = {};
    $scope.dataPlayer.playerNo = sitNum;
    $scope.dataPlayer.accessToken = $scope.jsData.accessToken;
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.sitNummber = sitNum;
    $scope.dataPlayer.socketId = $scope.socketId;
    // $scope.dataPlayer.userType = $scope.jdata.userType;
    Service.savePlayerTotable($scope.dataPlayer, function (data) {
      console.log("sit here", data);
      if (data.data.value) {
        $scope.sitHere = false;

      } else {
        if (data.error = "Insufficient Balance")
          $scope.showInsufficientFundsModal();
      }
    });
  };


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


  $scope.IamThere = function (data, id) {
    $scope.isthere = false;
    _.forEach(data, function (value) {

      if (value.memberId == id) {
        $scope.isthere = true;
        return;
      } else {}
    });

    $scope.sitHere = !$scope.isthere;

  };


  $scope.playChaal = function () {

    Service.chaal({
      tableId: $scope.tableId,
      accessToken: $scope.jsData.accessToken,
      amount: $scope.betamount
    }, function (data) {

      console.log("chaal", data)
    });
  };

  //tip
  $scope.makeTip = function () {
    var playerdetails = {};
    playerdetails.accessToken = $scope.jsData.accessToken;
    playerdetails.tableId = $scope.tableId;
    playerdetails.amount = 100;
    Service.maketip(playerdetails, function (data) {});
  };

  //pack 
  $scope.pack = function () {
    var playerdetails = {};
    playerdetails.accessToken = $scope.jsData.accessToken;
    playerdetails.tableId = $scope.tableId;
    Service.pack(playerdetails, function (data) {
      console.log("pack", data)
    });
  };

  //sideshow
  $scope.sideShow = function () {
    var playerdetails = {};
    playerdetails.accessToken = $scope.jsData.accessToken;
    playerdetails.tableId = $scope.tableId;
    Service.sideShow(playerdetails, function (data) {


    });
  };


  io.socket.on("sideShowCancel", function (data) {
    if (data.data.ToPlayer.accessToken == $scope.jsData.accessToken) {
      $scope.showSideShowSendModal();
      $scope.message = {
        content: "Your request for the Side show has been rejected!"
      };
    }
  });

  io.socket.on("sideShow", function (data) {
    if (data.data.toPlayer.accessToken == $scope.jsData.accessToken) {
      $scope.showSideShowModal();
    }
    if (data.data.fromPlayer.accessToken == $scope.jsData.accessToken) {
      $scope.showSideShowSendModal();
      $scope.message = {
        content: "Your request for the Side show has been sent!"
      };
    }
  });

  //sideShow Maker
  $scope.doSideShow = function () {
    var playerdetails = {};
    playerdetails.accessToken = $scope.jsData.accessToken;
    playerdetails.tableId = $scope.tableId;
    Service.doSideShow(playerdetails, function (data) {});
  };

  //sideShow Maker
  $scope.rejectSideShow = function () {
    var playerdetails = {};
    playerdetails.accessToken = $scope.jsData.accessToken;
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
