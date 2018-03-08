var updateSocketFunction;
myApp.controller("TableCtrl", function ($scope, $ionicModal, $ionicPlatform, $state, Service, $stateParams, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })


  //ask for sit here when joining new game
  $scope.sitHere = false;

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

    // $event.preventDefault();
    // $event.stopProgation();
    console.log("stop propagation");
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

  // main playper clicked
  // $scope.mainPlayerClicked = function () {
  //   console.log("main player");
  // }

  //backtolobby
  $scope.backToLobby = function () {
    var playerdetails = {};
    playerdetails.id = $scope.players[8]._id;
    playerdetails.tableId = $scope.tableId;
    Service.deletePlayer(playerdetails, function (data) {
      console.log(data);
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


    console.log("inside show card");
    // $('.showing_cards img:nth-child(1)').attr("src", "img/table/cardA.png");
    // $('.showing_cards img:nth-child(2)').attr("src", "img/table/cardA.png");
    // $('.showing_cards img:nth-child(3)').attr("src", "img/table/cardA.png");
    // $(".card_see").css("display", "none");
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

  io.socket.on("ShowWinner", function (data) {});
  $scope.randomCard = function () {
    Service.randomCard();
  };

  updateSocketFunction = function (data) {
    console.log("update Socket", data);
    // $scope.turnPlayer = _.find(data.playerCards, function (player) {
    //   return player.isTurn;
    // });
    // //cardServed
    // $scope.cardServed = data.cardServed;
    // $scope.communityCards = data.communityCards;
    // $scope.gameType = data.currentGameType;
    // $scope.playersChunk = _.chunk(data.playerCards, 8);
    // $scope.extra = data.extra;
    // $scope.hasTurn = data.hasTurn;
    // $scope.isCheck = data.isCheck;
    // $scope.showWinner = data.showWinner;
    console.log(data.players, "updating socket");
    $scope.players = data.players;
    // $scope.showSitHere=if()



    //re-arrange only if player already have seat
    $scope.isIamThere($scope.players, $scope.playerData.memberId);
    //making 9 length array by filling 0 in all empty field
    $scope.players = $scope.fillAllPlayer($scope.players)
    $scope.players = $scope.rearrangePlayer($scope.players);

    // $scope.players = $scope.fillAllPlayer($scope.players)
    // $scope.players = $scope.rearrangePlayer($scope.players);
    console.log('playyyyers', $scope.players);

    // $scope.updatePlayers();
    // console.log("data making",data)
    $scope.$apply();
  };
  io.socket.on("Update", updateSocketFunction);

  $scope.updatePlayers = function () {
    console.log("inside update player")
    $scope.l = {};
    $scope.l.tableId = $stateParams.id;
    console.log("table id ", $scope.l);
    Service.getAll($scope.l, function (data) {
      // check whether dealer is selected or not

      console.log(data.data, "get all service");
      $scope.players = data.data.data.players;
      // $scope.showSitHere=if()
      $scope.isIamThere($scope.players, $scope.playerData.memberId);

      //  console.log($scope.sitHere,"sithere status from updateplayer");


      //re-arrange only if player already have seat
      //making 9 length array by filling 0 in all empty field
      $scope.players = $scope.fillAllPlayer($scope.players)
      $scope.players = $scope.rearrangePlayer($scope.players);

      // $scope.players = $scope.fillAllPlayer($scope.players)
      // $scope.players = $scope.rearrangePlayer($scope.players);
      console.log('playyyyers', $scope.players);
      // $scope.$apply();
    });

  };

  $scope.updatePlayers();
  //to add and remove coin
  $scope.addCoin = function () {
    $scope.coin = $scope.coin * 2;
  }

  $scope.removeCoin = function () {
    if ($scope.coin > 0)
      $scope.coin = $scope.coin / 2;
  }

  //player sitting
  $scope.sitHerefn = function (sitNum) {
    // var temp=$scope.players[8];
    // $scope.players[8]= $scope.players[sitNum];
    // $scope.players[sitNum]=temp;
    // $scope.players = $scope.rearrangePlayer($scope.players, sitNum);
    if (!$scope.sitHere) {
      console.log("sitHere is false so returning without exe")
      return
    }
    console.log($scope.players, "siiiiiiiiiit here")
    // $scope.sitNummber = sitNum;
    $scope.jdata = $.jStorage.get("player");
    console.log("jdata", $scope.jdata)
    // $scope.jdata.sitNummber = $scope.sitNummber;
    // $.jStorage.set("player", $scope.jdata);
    $scope.dataPlayer = {};
    $scope.dataPlayer.playerNo = sitNum;
    $scope.dataPlayer.memberId = $scope.jdata._id;
    $scope.dataPlayer.totalAmount = $scope.jdata.credit;
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.sitNummber = $scope.sitNummber;
    $scope.dataPlayer.image = $scope.jdata.image;
    $scope.dataPlayer.name = $scope.jdata.username;
    // $scope.dataPlayer.userType = $scope.jdata.userType;


    Service.savePlayerTotable($scope.dataPlayer, function (data) {
      console.log(data, "sitted");
      if (data.data.value) {
        // console.log("player saved");
        // $(".main-player").removeClass("sit_here");
        // $scope.playingPlayer = true;
        $scope.sitHere = false;
        $scope.updatePlayers();
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
      console.log(filled[i], "inside fill");
      if (filled[i] == undefined) {
        filled[i] = 0;
      }
    }
    return filled;
  }


  $scope.rearrangePlayer = function (demoPlayer) {
    //input [1,2,3,4,5,6,7,8,9] selected 3
    //output [4,5,6,7,8,9,1,2,3]
    console.log("before re-arrange", demoPlayer);
    var n = 0;
    var memberId = $scope.playerData.memberId;
    for (i = 0; i < demoPlayer.length; i++) {
      if (demoPlayer[i].memberId == memberId) {
        console.log(i, "memeber location");
        // $scope.sitHere=true;
        n = i + 1;

      }
    }
    var temp = _.concat(_.slice(demoPlayer, n, demoPlayer.length), _.slice(demoPlayer, 0, n));
    console.log("after re-arrange", temp);
    return temp;

  }


  $scope.isIamThere = function (data, id) {
    var isthere = false;
    _.forEach(data, function (value) {
      console.log(value.memberId, id, "inside isiamthere");
      if (value.memberId == id) {
        isthere = true;
        return
      } else {
        console.log("no equallll")
      }
    });

    $scope.sitHere = !isthere;
    console.log($scope.sitHere, "sithere  status");
  }


  $scope.playChaal = function () {
    console.log("play chaal");
    var playerdetails = {};
    playerdetails.id = $scope.players[8]._id;
    playerdetails.tableId = $scope.tableId;
    Service.chaal({
      tableId: $scope.tableId,
      id: $scope.players[8]._id
    }, function (data) {
      console.log(data)
    });
  }
  // console.log($scope.rearrangePlayer(demoPlayer, 5), "some random practite")

 


  //pack 
  $scope.pack = function () {
    playerdetails.id = $scope.players[8]._id;
    Service.pack(playerdetails.id, function (data) {});
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
});
