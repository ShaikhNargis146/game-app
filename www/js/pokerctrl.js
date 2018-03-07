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
      $scope.ModalCreate = modal;
    });
  
    $scope.openModal = function () {
      console.log('sdsdsads')
      $scope.ModalCreate.show();
    }
    $scope.closeModal = function () {
      $scope.ModalCreate.hide();
    };
  
//private table info modal

$ionicModal.fromTemplateUrl('templates/model/private-table-info.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function (modal) {
  $scope.ModalInfo = modal;
});

$scope.openInfoModal = function () {
  console.log('sdsdsads')
  $scope.ModalInfo.show();
}
//search table
$ionicModal.fromTemplateUrl('templates/model/search-table.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function (modal) {
  $scope.ModalSearch = modal;
});

$scope.opensearchModal = function () {
  console.log('sdsdsads')
  $scope.ModalSearch.show();
}

$scope.itemArray = [
  {id: 1, name: 'private'},
  {id: 2, name: 'second'},
  {id: 3, name: 'third'},
  {id: 4, name: 'fourth'},
  {id: 5, name: 'fifth'},
];

$scope.selected = { value: $scope.itemArray[0] };


  });
  