myApp.controller("PokerCtrl", function ($scope, Service, $state, $ionicModal, $ionicPlatform) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })

  $scope.closeAllModal = function () {
    $scope.leftMenu = false;
    $scope.showTableinfo = false;
    $scope.openSlider = false;
    console.log('cole');
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

  $scope.slider = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      step: 10,
      minLimit: 0,
      maxLimit: 100
    }
  };


  $scope.toggleSlider = function () {
    $scope.openSlider = !$scope.openSlider;
    console.log('s', $scope.openSlider);
  }
});
