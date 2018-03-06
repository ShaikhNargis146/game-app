myApp.controller("PokerCtrl", function ($scope, Service, $state,$ionicModal, $ionicPlatform) {
    $ionicPlatform.ready(function () {
      screen.orientation.lock('landscape')
    })
    // $scope.openModal = function() {
    //   console.log("**************");
    //   $scope.modal.show();
    // };
  //create table modal
    $ionicModal.fromTemplateUrl('templates/model/create-private-table.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.Modal = modal;
    });
  
    $scope.openModal = function () {
      console.log('sdsdsads')
      $scope.Modal.show();
    }
    $scope.closeModal = function () {
      $scope.Modal.hide();
    };
  
//private table info modal

$ionicModal.fromTemplateUrl('templates/model/private-table-info.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function (modal) {
  $scope.Modal = modal;
});

$scope.openInfoModal = function () {
  console.log('sdsdsads')
  $scope.Modal.show();
}
//search table
$ionicModal.fromTemplateUrl('templates/model/search-table.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function (modal) {
  $scope.Modal = modal;
});

$scope.opensearchModal = function () {
  console.log('sdsdsads')
  $scope.Modal.show();
}
  });
  