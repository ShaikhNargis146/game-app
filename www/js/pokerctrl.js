myApp.controller("PokerCtrl", function ($scope, Service, $state, $ionicModal, $ionicPlatform) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })

  $scope.closeAllModal = function () {
    $scope.leftMenu = false;
    $scope.showTableinfo = false;
  }
  $scope.closeLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = false;
  };
  $scope.openLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = true;
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



  $scope.sitHere = false;

});
