myApp.controller("TableCtrl", function ($scope, $ionicModal, $ionicPlatform, $state, Service, $stateParams) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })



 $scope.tableInfoOk = function () {
    console.log("okkkkkkk");

  $scope.l = {};
  $scope.l.tableId = $stateParams.id;
  console.log("$scope.l", $scope.l)

  Service.getAllActive($scope.l, function (data) {
    console.log("in get all active");
    console.log("data in active plyrr", data);
    if (data.data.value) {
      $scope.actPlayers = data.data.data;

      _.forEach($scope.actPlayers, function (n) {
        // console.log("n");
        $scope.p = n;
        Service.getOnePlayer($scope.p, function (data) {
          // console.log("data..", data.data.data);
          $scope.pData = data.data.data;
          $scope.playerNo = $scope.pData.playerNo;
          // console.log("playerNo", $scope.playerNo);
          if ($scope.playerNo == 1) {
            $("#plr1").removeClass("sit_here");

            $scope.credit1 = $scope.pData.totalAmount;
            $scope.name1 = $scope.pData.name;
            $scope.image1 = $scope.pData.image;
          }
          if ($scope.playerNo == 2) {
            $("#plr2").removeClass("sit_here");

            $scope.credit2 = $scope.pData.totalAmount;
            $scope.name2 = $scope.pData.name;
            $scope.image2 = $scope.pData.image;

          }
          if ($scope.playerNo == 3) {
            $("#plr3").removeClass("sit_here");

            $scope.credit3 = $scope.pData.totalAmount;
            $scope.name3 = $scope.pData.name;
            $scope.image3 = $scope.pData.image;
          }
          if ($scope.playerNo == 4) {
            $("#plr4").removeClass("sit_here");

            $scope.credit4 = $scope.pData.totalAmount;
            $scope.name4 = $scope.pData.name;
            $scope.image4 = $scope.pData.image;
          }
          if ($scope.playerNo == 5) {
            $("#plr5").removeClass("sit_here");

            $scope.credit5 = $scope.pData.totalAmount;
            $scope.name5 = $scope.pData.name;
            $scope.image5 = $scope.pData.image;
          }
          if ($scope.playerNo == 6) {
            $("#plr6").removeClass("sit_here");

            $scope.credit6 = $scope.pData.totalAmount;
            $scope.name6 = $scope.pData.name;
            $scope.image6 = $scope.pData.image;
          }
          if ($scope.playerNo == 7) {
            $("#plr7").removeClass("sit_here");

            $scope.credit7 = $scope.pData.totalAmount;
            $scope.name7 = $scope.pData.name;
            $scope.image7 = $scope.pData.image;
          }
          if ($scope.playerNo == 8) {
            $("#plr8").removeClass("sit_here");

            $scope.credit8 = $scope.pData.totalAmount;
            $scope.name8 = $scope.pData.name;
            $scope.image8 = $scope.pData.image;
          }
          if ($scope.playerNo == 9) {
            $("#plr9").removeClass("sit_here");

            $scope.credit9 = $scope.pData.totalAmount;
            $scope.name9 = $scope.pData.name;
            $scope.image9 = $scope.pData.image;
          }
        });
      });
      //to start new game
if($scope.actPlayers.length>=2){
  $scope.d = {};
      $scope.d.tableId = $stateParams.id;
      console.log("$scope.d", $scope.d)

      // setDealer
      Service.makeDealer($scope.d, function (data) {
        console.log("dealer done")
      });

      //deductBootAmount
      $scope.t = {};
      $scope.t.tableId = $stateParams.id;
 console.log("$scope.t", $scope.t)

      Service.deductBootAmount($scope.t, function (data) {
        console.log("deductBuyInAmount")

      });


      //to set//
      $scope.p = {};
      $scope.p.tableId = $stateParams.id;
 console.log("$scope.p", $scope.p)

      Service.getAllActive($scope.p, function (data) {
        console.log("in set")
        if (data.data.value) {
          $scope.actPlayers = data.data.data;

          _.forEach($scope.actPlayers, function (n) {
            $scope.p = n;
            Service.getOnePlayer($scope.p, function (data) {
              $scope.pData = data.data.data;
              $scope.playerNo = $scope.pData.playerNo;
              if ($scope.playerNo == 1) {

                $scope.credit1 = $scope.pData.totalAmount;
              }
              if ($scope.playerNo == 2) {

                $scope.credit2 = $scope.pData.totalAmount;

              }
              if ($scope.playerNo == 3) {

                $scope.credit3 = $scope.pData.totalAmount;
              }
              if ($scope.playerNo == 4) {

                $scope.credit4 = $scope.pData.totalAmount;
              }
              if ($scope.playerNo == 5) {

                $scope.credit5 = $scope.pData.totalAmount;
              }
              if ($scope.playerNo == 6) {

                $scope.credit6 = $scope.pData.totalAmount;
              }
              if ($scope.playerNo == 7) {

                $scope.credit7 = $scope.pData.totalAmount;
              }
              if ($scope.playerNo == 8) {

                $scope.credit8 = $scope.pData.totalAmount;
              }
              if ($scope.playerNo == 9) {

                $scope.credit9 = $scope.pData.totalAmount;
              }

            });


          });
        }
      });

      //to serve//

 $scope.b = {};
      $scope.b.tableId = $stateParams.id;
 console.log("$scope.b", $scope.b)


      Service.serve($scope.b, function (data) {
        console.log("serve done")

      });
}
    }
  });


  }




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

  $scope.openPlayerDetails = function (plrno) {
    $scope.plrNo = plrno;
    $scope.data = {};
    $scope.data.sitNummber = plrno;
    Service.getByPlrNo($scope.data, function (data) {
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
  $scope.mainPlayerClicked = function () {
    console.log("main player");
  }

  $scope.showCard = function () {
    console.log("inside show card");
    $('.showing_cards img:nth-child(1)').attr("src", "img/table/cardA.png");
    $('.showing_cards img:nth-child(2)').attr("src", "img/table/cardA.png");
    $('.showing_cards img:nth-child(3)').attr("src", "img/table/cardA.png");
    $(".card_see").css("display", "none");
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

  //to add and remove coin
  $scope.addCoin = function () {
    $scope.coin = $scope.coin * 2;
  }

  $scope.removeCoin = function () {
    if ($scope.coin > 0)
      $scope.coin = $scope.coin / 2;
  }

  //player sitting
  $scope.sitHere = function (sitNum) {
    console.log("sitNum", sitNum);
    $scope.sitNummber = sitNum;
    $scope.jdata = $.jStorage.get("player");
    $scope.jdata.sitNummber = $scope.sitNummber;
    $.jStorage.set("player", $scope.jdata);

    $scope.data = {};
    $scope.data.playerNo = $scope.sitNummber;
    $scope.data.memberId = $scope.jdata._id;
    $scope.data.totalAmount = $scope.jdata.credit;
    $scope.data.tableId = $scope.tableId;
    $scope.data.sitNummber = $scope.sitNummber;
    $scope.data.image = $scope.jdata.image;
    $scope.data.name = $scope.jdata.username;
    $scope.data.userType = $scope.jdata.userType;


    Service.savePlayerTotable($scope.data, function (data) {
      if (data.data.value) {
        console.log("player saved");
        $(".main-player").removeClass("sit_here");
        $scope.playingPlayer = true;
      } else {
        console.log("error", data.data.error);
      }

    });

  }
});
