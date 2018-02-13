myApp.controller("LobbyCtrl", function ($scope, $state, $ionicModal) {
  console.log("hi this is lobby")

  //to close all tab and side menu
  $scope.closeAllTab = function () {
    $scope.VariationActive = false;
    $scope.sideMenu = false;
  }
  $scope.closeAllTab();


  $scope.variationToggle = function () {
    if ($scope.VariationActive) {
      $scope.VariationActive = false;
    } else {
      $scope.VariationActive = true;
    }
  }

  $scope.closeMenu = function () {
    $scope.sideMenu = false;
  }
  $scope.openMenu = function () {
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
    $scope.changePasswordModel.show();
  }
  $scope.closeChangePasswordModel = function () {
    $scope.changePasswordModel.hide();
  }



  // going to next SVGViewElement
  $scope.goTO = function (view) {
    if (!$scope.VariationActive) {
      $state.go('table');
    }
  }




  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    console.log("destory called");
    $scope.PLModal.remove();
    $scope.ACStatementModal.remove();
    $scope.transferStatementModal.remove();
    $scope.changePasswordModel.remove();
    $scope.closeAllTab();
  });



  // $scope.stopPropagation=function($event){
  // $event.stopPropagation();
  // }
});
