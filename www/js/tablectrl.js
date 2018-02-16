myApp.controller("TableCtrl", function ($scope, $ionicModal, $ionicPlatform, $state, Service, $stateParams) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })

  
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

  $scope.openPlayerDetails = function () {
    $scope.playerDetails.show();
  }

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




  //to add and remove coin
  $scope.addCoin = function () {
    $scope.coin = $scope.coin + 200;
  }

  $scope.removeCoin = function () {
    if ($scope.coin > 0)
      $scope.coin = $scope.coin - 200;
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
  $scope.username = $scope.playerData.username;
  $scope.userType = $scope.playerData.userType;
  $scope.credit = $scope.playerData.credit;




  //for table data//

  $scope.tableId = $stateParams.id;

  Service.getOneTable($stateParams.id, function (data) {
    $scope.tableData = data.data.data;
    console.log("selected table data", $scope.tableData);
    $scope.bootAmt=$scope.tableData.bootAmt;
    $scope.chalLimit=$scope.tableData.chalLimit;
    $scope.blindAmt=$scope.tableData.blindAmt;
    console.log("$scope.blindAmt", $scope.blindAmt);
    $scope.chalAmt=$scope.tableData.chalAmt;
    console.log("$scope.chalAmt", $scope.chalAmt);
    $scope.maxBlind=$scope.tableData.maxBlind;


    $scope.coin =$scope.blindAmt ;
  });






});
