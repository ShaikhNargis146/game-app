myApp.controller("LobbyCtrl", function ($scope) {
  console.log("hi this is lobby")
  $scope.VariationActive = 'no';
  $scope.sideMenu = 'no';

  $scope.variationToggle = function () {
    if ($scope.VariationActive == 'variation_active') {
      $scope.VariationActive = "no";
    } else {
      $scope.VariationActive = 'variation_active';
    }
  }

  $scope.closeMenu = function () {
$scope.sideMenu="no"
  }
  $scope.openMenu = function () {
    $scope.sideMenu="menu_open"
  }

  $scope.playerData=$.jStorage.get("player");
  console.log("$scope.playerData",$scope.playerData);
$scope.username=$scope.playerData.username;
$scope.userType=$scope.playerData.userType;
$scope.credit=$scope.playerData.credit;



});
