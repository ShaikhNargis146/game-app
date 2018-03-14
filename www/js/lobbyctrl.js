myApp.controller("LobbyCtrl", function ($scope, $state, $ionicModal, $ionicPlatform, Service, $http) {

  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })

  //to close all tab and side menu
  $scope.closeAllTab = function () {
    $scope.VariationActive = false;
    $scope.sideMenu = false;
    $scope.showType = false;
  }
  $scope.closeAllTab();





  $scope.closeMenu = function () {
    $scope.sideMenu = false;
  }
  $scope.openMenu = function ($event) {
    $event.stopPropagation();
    $scope.sideMenu = true;
  }

  //storing all model in $scope

  //profit and loss
  $ionicModal.fromTemplateUrl('templates/model/profit-loss-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.PLModal = modal;
  });

  $scope.openPLModal = function () {
    console.log('sdsdsads')
    $scope.PLModal.show();
  }
  $scope.closePLModal = function () {
    $scope.PLModal.hide();
  };

  //account statement
  $ionicModal.fromTemplateUrl('templates/model/account-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ACStatementModal = modal;
  });

  $scope.openACStatement = function () {
    $scope.ACStatementModal.show();
  }
  $scope.closeACStatement = function () {
    $scope.ACStatementModal.hide();
  }


  //transfer statement
  $ionicModal.fromTemplateUrl('templates/model/transfer-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.transferStatementModal = modal;
  });
  $scope.openTransferStatement = function () {
    $scope.transferStatementModal.show();
  }
  $scope.closeTransferStatement = function () {
    $scope.transferStatementModal.hide();
  }


  //password change

  $ionicModal.fromTemplateUrl('templates/model/change-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.changePasswordModel = modal;
  });

  $scope.openChangePasswordModel = function () {
    $scope.data = {};
    $scope.fail1 = false;
    $scope.success = false;
    $scope.fail2 = false;
    $scope.changePasswordModel.show();
  }
  $scope.closeChangePasswordModel = function () {
    $scope.changePasswordModel.hide();
    console.log("cancel modal");

  }
  //game price range 
  $ionicModal.fromTemplateUrl('templates/model/game_price_range.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.priceRangeModal = modal;


  });
  $scope.openPriceRangeModal = function () {
    $scope.priceRangeModal.show();
  }
  $scope.closePriceRangeModal = function () {
    $scope.priceRangeModal.hide();
  }
  $scope.logout = function () {
    $.jStorage.flush();
  $state.go('login');
  }

  //room summary

  // $ionicModal.fromTemplateUrl('templates/model/room-summary.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function (modal) {
  //   $scope.roomSummaryModel = modal;
  //   $scope.roomSummaryModel.show();
  // });

  // $scope.openRoomSummaryModel = function () {
  //       $scope.roomSummaryModel.show();
  // }
  // $scope.closeRoomSummaryModel = function () {
  //   $scope.roomSummaryModel.hide();

  // }



  // going to next SVGViewElement
  $scope.goTO = function (view) {
    // if (!$scope.VariationActive) {
    //   $state.go('table');
    // }
    console.log("view", view)
    $scope.gameType = view;
    if ($scope.gameType == "playnow") {
      console.log("show tables");
    }
  }






  $scope.playerData = $.jStorage.get("player");
  $scope.username = $scope.playerData.username;
  $scope.userType = $scope.playerData.userType;
  $scope.credit = $scope.playerData.credit;
  $scope.image = $scope.playerData.image;



  //onclick for each play type
  $scope.variationToggle = function ($event) {
    $event.stopPropagation();
    if ($scope.VariationActive) {
      $scope.VariationActive = false;
    } else {
      $scope.VariationActive = true;
    }
  }


  $scope.playNow = function ($event) {

    if (!$scope.VariationActive) {
      $scope.openPriceRangeModal()
      $event.stopPropagation();
    }


  }

  $scope.playJoker = function ($event) {

    if (!$scope.VariationActive) {
      $scope.openPriceRangeModal()
      $event.stopPropagation();

    }
  }

  //for table selection//

  Service.tableData(function (data) {
    $scope.tableData = data.data.data.results;
  });

  $scope.goToTable = function (table) {
    console.log("table id", table._id);
    $scope.tableId = table._id;
    $state.go('table', {
      'id': $scope.tableId
    });
  }







  //change password//

  $scope.passwordChange = function (data) {
    $scope.passwordData = data;
    if (data.newPassword == data.repeatPassword) {
      $scope.playerData = $.jStorage.get("player");
      $scope.passwordData._id = $scope.playerData._id;

      Service.passwordchange(data, function (data) {
        if (data.data == "Old password did not match") {
          $scope.fail1 = true;
          $scope.success = false;
          $scope.fail2 = false;
        } else if (data.data == "Password changed") {
          $scope.success = true;
          $scope.fail1 = false;
          $scope.fail2 = false;
        }

      });

    } else {
      console.log("passwords does not matches");
      $scope.fail2 = true;
      $scope.success = false;
      $scope.fail1 = false;
    }
  };




  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    console.log("destory called lobby");
    $scope.PLModal.remove();
    $scope.ACStatementModal.remove();
    $scope.transferStatementModal.remove();
    $scope.changePasswordModel.remove();

    $scope.priceRangeModal.remove();
    $scope.closeAllTab();
    // $scope.roomSummaryModel.remove();
  });
  // $scope.stopPropagation=function($event){
  // $event.stopPropagation();
  // }
});
