var updateSocketFunction;
var showWinnerFunction;
myApp.controller("TableCtrl", function ($scope, $ionicModal, $ionicPlatform, $state, Service, $stateParams, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })


  //ask for sit here when joining new game
  $scope.sitHere = false;
  $scope.botAmount = 0;
  $scope.PotAmount = 0;
  $scope.startAnimation = false;




  $scope.closeAllModal = function () {
    $scope.showTableinfo = false;
    $scope.rightMenu = false;
    $scope.leftMenu = false;
    $scope.viewHistory = false;
    console.log("close called");
  }

  $scope.closeAllModal();

  $scope.closeLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = false;
  }
  $scope.openLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = true;
  }

  $scope.openRightMenu = function () {
    $scope.closeAllModal();
    $scope.rightMenu = true;
  }
  $scope.closeRightMenu = function () {
    $scope.closeAllModal();
    $scope.rightMenu = false;
  }



  //toggle for played history
  $scope.toggleHistory = function () {
    if ($scope.viewHistory) {
      $scope.viewHistory = false;
      $scope.closeAllModal();
    } else {
      $scope.closeAllModal();
      $scope.viewHistory = true;
    }
  }

  //toggle for table-info
  $scope.toggleTableInfo = function () {
    if ($scope.showTableinfo) {
      $scope.showTableinfo = false;
      $scope.closeAllModal();
    } else {
      $scope.closeAllModal();
      $scope.showTableinfo = true;
    }
  }

  $scope.stopProgation = function ($event) {
    $event.stopPropagation(); //wont call parent onclick function
  }

  //modal for player details
  $ionicModal.fromTemplateUrl('templates/model/player-details.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.playerDetails = modal;
  });

  $scope.openPlayerDetails = function ($event, id) {
    console.log("playerdetails model called")
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
  }

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
  }
  $scope.closeTableInfoModal = function () {
    $scope.tableInfoModal.hide();
  }

  //backtolobby
  $scope.backToLobby = function () {
    var playerdetails = {};
    playerdetails.accessToken = $scope.jsData.accessToken;
    playerdetails.tableId = $scope.tableId;
    console.log(playerdetails, "playerdetails")
    Service.deletePlayer(playerdetails, function (data) {
      console.log("delete player", data);
    })
    $state.go("lobby");
  }
  //show card
  $scope.showCard = function () {

    $scope.cardData = {};
    $scope.cardData.id = $scope.players[8]._id;
    $scope.cardData.tableId = $scope.tableId;

    Service.makeSeen($scope.cardData, function (data) {
      // console.log("data in cardsee",data)
      console.log("makeseen", data)
      if (data.data) {
        // $scope.updatePlayers();
        console.log("make seen sucess");
      }

    });
  }

  $scope.$on('$destroy', function () {
    console.log("destory called from table");
    $scope.tableInfoModal.remove();
    $scope.closeAllModal();
  });

  //back button
  $ionicPlatform.onHardwareBackButton(function (event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("back")
  });

  $scope.jsData = $.jStorage.get("player");
  $scope.jsData.accessToken = $scope.jsData.accessToken;
  $scope.jsData.memberId = $scope.jsData._id;
  console.log("jsData", $scope.jsData);
  $.jStorage.set("player", $scope.jsData);
  $scope.playerData = $.jStorage.get("player");
  $scope.image = $scope.playerData.image;
  $scope.username = $scope.playerData.username;
  $scope.userType = $scope.playerData.userType;
  $scope.credit = $scope.playerData.credit;

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

  showWinnerFunction = function (data) {
    $scope.showWinner = data;
    console.log($scope.showWinner);
  };

  updateSocketFunction = function (data) {
    console.log("update Socket", data);
    $scope.extra = data.extra;
    if ($scope.extra) {
      console.log($scope.extra, "extra")
    }

    if ($scope.extra) {
      if ($scope.extra.serve) {
        $scope.startAnimation = true;
        console.log("start animation true");
        $timeout(function () {
          $scope.startAnimation = false;
          console.log("inside-timeout startAnimation false")
        }, 5000)
      }
    }

    if (data.pot) {
      console.log("pot amt", data.pot.totalAmount)
      $scope.potAmount = data.pot.totalAmount;
      $scope.updatePotAmount(data.pot.totalAmount);
    }

    $scope.maxAmt = data.maxAmt;
    $scope.minAmt = data.minAmt;
    $scope.setBetAmount($scope.minAmt, $scope.maxAmt);
    console.log("min and max", $scope.minAmt, $scope.maxAmt)
    $scope.rawdata = data.players;
    // console.log("raw data of player",$scope.rawdata)
    // $scope.showSitHere=if()



    //re-arrange only if player already have seat
    $scope.IamThere($scope.rawdata, $scope.playerData.memberId);
    //making 9 length array by filling 0 in all empty field
    $scope.rawdata2 = $scope.fillAllPlayer($scope.rawdata)
    $scope.players = $scope.rearrangePlayer($scope.rawdata2);

    // console.log('final playyyyers details from socket', $scope.players);
    // console.log("data making",data)
    $scope.$apply();
  };

  io.socket.on("Update", updateSocketFunction);
  io.socket.on("showWinner", showWinnerFunction);

  $scope.updatePlayers = function () {
    console.log("inside update player")
    $scope.l = {};
    $scope.l.tableId = $stateParams.id;
    // console.log("table id ", $scope.l);
    Service.getAll($scope.l, function (data) {
      // check whether dealer is selected or not
      console.log("get all ", data)
      $scope.maxAmt = data.data.data.maxAmt;
      $scope.minAmt = data.data.data.minAmt;
      $scope.setBetAmount($scope.minAmt, $scope.maxAmt);
      console.log("min and max", $scope.minAmt, $scope.maxAmt)
      // console.log(data.data, "get all service");
      $scope.rawdata = data.data.data.players;
      if (data.data.data.pot) {
        $scope.potAmount = data.data.data.pot.totalAmount;
      }


      $scope.IamThere($scope.rawdata, $scope.playerData.memberId);

      //  console.log($scope.sitHere,"sithere status from updateplayer");


      //re-arrange only if player already have seat
      //making 9 length array by filling 0 in all empty field

      $scope.rawdata2 = $scope.fillAllPlayer($scope.rawdata)
      console.log("after filler fn", $scope.rawdata2)
      $scope.players = $scope.rearrangePlayer($scope.rawdata2);

      // $scope.players = $scope.fillAllPlayer($scope.players)
      // $scope.players = $scope.rearrangePlayer($scope.players);
      // console.log('playyyyers list', $scope.players);
      // $scope.$apply();
    });

  };

  $scope.updatePlayers();
  //to add and remove coin
  $scope.addCoin = function () {
    // $scope.coin = $scope.coin * 2;
    $scope.betamount = $scope.betamount * 2;
  }

  $scope.removeCoin = function () {
    console.log("inside remove coin .......... add")
    $scope.betamount = $scope.betamount / 2;
  }

  //player sitting
  $scope.sitHerefn = function (sitNum) {
    if (!$scope.sitHere) {
      console.log("sitHere is false so returning without exe")
      return
    }
    // console.log($scope.players, "siiiiiiiiiit here")
    // $scope.sitNummber = sitNum;
    $scope.jdata = $.jStorage.get("player");
    console.log("jdata", $scope.jdata)
    // $scope.jdata.sitNummber = $scope.sitNummber;
    // $.jStorage.set("player", $scope.jdata);
    $scope.dataPlayer = {};
    $scope.dataPlayer.playerNo = sitNum;
    $scope.dataPlayer.accessToken = $scope.jdata.accessToken;
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.sitNummber = $scope.sitNummber;
    // $scope.dataPlayer.userType = $scope.jdata.userType;


    Service.savePlayerTotable($scope.dataPlayer, function (data) {
      console.log(data, "sitted");
      if (data.data.value) {
        $scope.sitHere = false;
        console.log(data.data)
      } else {
        console.log("error", data.data.error);
      }
    });
  }


  //fill all player
  $scope.fillAllPlayer = function (array) {
    var filled = [];
    for (i = 0; i < array.length; i++) {
      filled[array[i].playerNo - 1] = array[i];
    }
    for (i = 0; i < 9; i++) {
      if (filled[i] == undefined) {
        filled[i] = 0;
      }
    }
    return filled;
  }


  $scope.rearrangePlayer = function (demoPlayer) {
    var n = 0;
    var memberId = $scope.playerData.memberId;
    console.log(memberId);
    for (i = 0; i < demoPlayer.length; i++) {
      if (demoPlayer[i].memberId == memberId) {
        console.log(i, "memeber location");
        n = i + 1;

      }
    }
    var temp = _.concat(_.slice(demoPlayer, n, demoPlayer.length), _.slice(demoPlayer, 0, n));
    console.log("after re-arrange", temp);
    return temp;

  }


  $scope.IamThere = function (data, id) {
    console.log(data);
    $scope.isthere = false;
    _.forEach(data, function (value) {
      console.log(value, id, "inside isiamthere");
      if (value.memberId == id) {
        $scope.isthere = true;
        console.log("inside iamthere", "value.memberid", value.memberId, "id", id)
        return
      } else {
        // console.log("no equallll")
      }
    });

    $scope.sitHere = !$scope.isthere;
    // console.log($scope.sitHere, "sithere  status");
  }


  $scope.playChaal = function () {
    // console.log("play chaal");
    var playerdetails = {};
    playerdetails.id = $scope.players[8]._id;
    playerdetails.tableId = $scope.tableId;
    Service.chaal({
      tableId: $scope.tableId,
      id: $scope.players[8]._id,
      amount: $scope.betamount
    }, function (data) {
      console.log("inside chaal", data)
    });
  }
  // console.log($scope.rearrangePlayer(demoPlayer, 5), "some random practite")

  //tip
  $scope.makeTip = function () {
    var playerdetails = {};
    playerdetails.id = $scope.players[8]._id;
    playerdetails.tableId = $scope.tableId;
    playerdetails.amount = 100;
    Service.maketip(playerdetails, function (data) {
      console.log("inside maketip fn", data)
    })
  }

  //pack 
  $scope.pack = function () {

    var playerdetails = {};
    playerdetails.id = $scope.players[8]._id;
    playerdetails.tableId = $scope.tableId;
    Service.pack(playerdetails, function (data) {
      console.log("inside pack", data);
    });
  };
  //showWinner

  $scope.showWinner = function () {
    var tableId = $scope.tableId;
    console.log(tableId);
    Service.showWinner(tableId, function (data) {
      console.log("inside pack", data);
    });
  };
  //sideshow
  $scope.sideShow = function () {
    playerdetails.id = $scope.players[8]._id;
    Service.sideShow(playerdetails.id, function (data) {});
  };

  //sideShow Maker
  $scope.doSideShow = function () {
    Service.doSideShow(function (data) {});
  };

  //sideShow Maker
  $scope.rejectSideShow = function () {
    Service.rejectSideShow(function (data) {});
  };




  //  betamount;
  $scope.setBetAmount = function (minamt, maxamt) {
    $scope.betamount = minamt;
  }

  $scope.updatePotAmount = function (potamt) {
    $scope.potAmount = potamt;
  }
});
