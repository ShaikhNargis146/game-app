myApp.controller("LobbyCtrl", function ($scope, $state, $ionicModal, $ionicPlatform, Service, $http, $timeout) {

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


    Service.searchPlayerTransaction({
      '_id': $scope.playerId,
      pageNo: 1
    }, function (data) {
      $scope.transferStatementData = data.data.data.results;
      console.log(data);
    })
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


  // going to next SVGViewElement
  $scope.goTO = function (view) {
    // if (!$scope.VariationActive) {
    //   $state.go('table');
    // }
    $scope.gameType = view;
    if ($scope.gameType == "playnow") {}
  }






  $scope.playerData = $.jStorage.get("player");
  console.log($scope.playerData);
  $scope.username = $scope.playerData.username;
  $scope.userType = $scope.playerData.userType;
  $scope.playerId = $scope.playerData._id;
  $scope.image = $scope.playerData.image;
  $scope.accessToken = $scope.playerData.accessToken;

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
      $scope.openPriceRangeModal();
      $event.stopPropagation();
    }


    //for table selection//

    Service.tableData(function (data) {
      console.log(data);
      $scope.tableData = data.data.data.results;
    });
  }

  $scope.playJoker = function ($event) {

    if (!$scope.VariationActive) {
      $scope.openPriceRangeModal();
      $event.stopPropagation();

    }
  }


  $scope.goToTable = function (table) {
    $scope.tableId = table._id;
    $state.go('table', {
      'id': $scope.tableId
    });
    $scope.closePriceRangeModal();
  }





  Service.sendAccessToken($scope.accessToken, function (data) {
    console.log("access token", data)
    $scope.playerDataBalance = data.data.data;
    $scope.balance = $scope.playerDataBalance.creditLimit + $scope.playerDataBalance.balanceUp;
  })

  $scope.accountStatement = function () {
    var pageNo = 1;
    Service.getTransaction(pageNo, function (data) {
      console.log(data);
      $scope.results = data.data.data.results;
    });
  }
  $timeout(function () {

  }, 1000)

  //change password//

  $scope.passwordChange = function (data) {
    $scope.passwordData = data;
    if (data.newPassword == data.repeatPassword) {
      $scope.playerData = $.jStorage.get("player");
      $scope.passwordData._id = $scope.playerData._id;

      $scope.changePasswordPromise = Service.passwordchange(data, function (data) {
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
      $scope.fail2 = true;
      $scope.success = false;
      $scope.fail1 = false;
    }
  };




  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.PLModal.remove();
    $scope.ACStatementModal.remove();
    $scope.transferStatementModal.remove();
    $scope.changePasswordModel.remove();
    $scope.priceRangeModal.remove();
    $scope.closeAllTab();
  });

});
