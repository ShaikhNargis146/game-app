myApp.controller("LobbyCtrl", function ($scope, $state, $ionicModal, $ionicPlatform, Service, $http, $timeout) {

  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape');
  })
  screen.orientation.lock('landscape');


  $ionicPlatform.registerBackButtonAction(function (event) {
    console.log("back button");
    event.preventDefault();
  }, 100);

  $scope.pageNo = 0;
  $scope.results = [];
  $scope.transferStatementData = [];
  // $scope.privateTableDatas = [];
  $scope.noDataFound = false;
  $scope.loadingDisable = false;
  $scope.paging = {
    maxPage: 1
  };

  $scope.accessToken = $.jStorage.get("accessToken");

  $scope.playerData = function () {
    Service.sendAccessToken(function (data) {
      $scope.singlePlayerData = data.data.data;
      $scope.image = $scope.singlePlayerData.image;
      $scope.memberId = $scope.singlePlayerData._id;
      $scope.username = $scope.singlePlayerData.username;
      $scope.userType = $scope.singlePlayerData.userType;
      $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;
    })
  };

  $scope.playerData();
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

  //Account Statement
  $scope.loadMore = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.accountStatement();
    } else {

    }
  };

  $scope.accountStatement = function () {
    Service.getTransaction($scope.pageNo, function (data) {
      console.log(data);
      if (data) {
        if (data.data.data.count === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          $scope.displayMessage = {
            main: "Oops! Your Account Statement  is empty.",
          };
        }
        $scope.paging = data.data.data.total;
        _.each(data.data.data.results, function (n) {
          console.log(n);
          $scope.results.push(n);
        });
        $scope.loadingDisable = false;
      } else {}
    });
  };


  //transfer statement
  $ionicModal.fromTemplateUrl('templates/model/transfer-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.transferStatementModal = modal;
  });



  $scope.openTransferStatement = function () {

    // console.log($scope.memberId);
    // Service.searchPlayerTransaction({
    //   _id: $scope.memberId,
    //   pageNo: 1
    // }, function (data) {
    //   $scope.transferStatementData = data.data.data.results;
    //   console.log(data);
    // })
    $scope.transferStatementModal.show();
  }
  $scope.closeTransferStatement = function () {
    $scope.transferStatementModal.hide();
  }

  //Transfer Statement
  $scope.loadTransferMore = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.accountStatement();
    } else {

    }
  };

  $scope.transferStatement = function () {
    Service.searchPlayerTransaction($scope.memberId, $scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.count === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          $scope.displayMessage = {
            main: "Oops! Your Transfer Statement  is empty.",
          };
        }
        $scope.paging = data.data.data.total;
        _.each(data.data.data.results, function (n) {
          console.log(n);
          $scope.transferStatementData.push(n);
        });
        $scope.loadingDisable = false;
      } else {}
    });
  };


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

  //my private Table Info 
  $ionicModal.fromTemplateUrl('templates/model/private-table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.myPrivateModal = modal;


  });
  $scope.openMyPrivateModal = function () {
    $scope.myPrivateModal.show();
  }
  $scope.closeMyPrivateModal = function () {
    $scope.myPrivateModal.hide();
  }
  $scope.logout = function () {
    Service.playerLogout(function (data) {
      console.log("logout", data);
      if (data.data.data == "Logged out") {
        $.jStorage.flush();
        $state.go('login');
      }
    });
  }


  // going to next SVGViewElement
  $scope.goTO = function (view) {
    // if (!$scope.VariationActive) {
    //   $state.go('table');
    // }
    $scope.gameType = view;
    if ($scope.gameType == "playnow") {}
  }

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
      console.log("tabledata", data);
      $scope.tableData = data.data.data.results;
    });
  }
  // $scope.formData = {};
  // $scope.formData.page = 1;
  // $scope.formData.type = '';
  // $scope.formData.keyword = '';
  // $scope.searchInTable = function (data) {
  //   $scope.formData.page = 1;
  //   if (data.length >= 1) {
  //     $scope.formData.keyword = data;
  //     $scope.myPrivateTable();
  //   } else if (data.length == '') {
  //     $scope.formData.keyword = data;
  //     $scope.myPrivateTable();
  //   }
  // }

  //Account Statement
  // $scope.loadMorePrivateTable = function () {
  //   if ($scope.pageNo < $scope.paging.maxPage) {
  //     $scope.pageNo++;
  //     $scope.loadingDisable = true;
  //     $scope.myPrivateTable();
  //   } else {

  //   }
  // };

  $scope.myPrivateTable = function () {
    var pageNo = 1;
    Service.getPrivateTables(function (data) {
      console.log(data);
      $scope.privateTableDatas = data.data.data.results;
      console.log($scope.privateTableDatas);
    });
    // Service.getPrivateTables($scope.pageNo, function (data) {
    //   console.log(data);
    //   if (data) {
    //     if (data.data.data.count === 0) {
    //       $scope.noDataFound = true;
    //       // Error Message or no data found 
    //       $scope.displayMessage = {
    //         main: "Oops! Your Account Statement  is empty.",
    //       };
    //     }
    //     $scope.paging = data.data.data.total;
    //     _.each(data.data.results, function (n) {
    //       console.log("private Table", n);
    //       $scope.privateTableData.push(n);
    //     });
    //     $scope.loadingDisable = false;
    //   } else {}
    // });
  };

  $scope.playJoker = function ($event) {

    if (!$scope.VariationActive) {
      $scope.openPriceRangeModal();
      $event.stopPropagation();

    }
  }


  $scope.goToTable = function (table) {

    $scope.tableId = table._id;
    $scope.closePriceRangeModal();
    $timeout(function () {
      $state.go('table', {
        'id': $scope.tableId
      });
    }, 300)


  }


  //change password//

  $scope.passwordChange = function (data) {
    $scope.passwordData = data;
    if (data.newPassword == data.repeatPassword) {
      $scope.playerData = $.jStorage.get("player");
      $scope.passwordData._id = $scope.memberId;

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



  //private Table

  $ionicModal.fromTemplateUrl('templates/model/create-private-table.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalCreate = modal;
  });

  $scope.createPrivateModal = function ($event) {
    $scope.ModalCreate.show();
    $event.stopPropagation();
  }
  $scope.closePrivateTable = function () {
    $scope.ModalCreate.hide();
  };


  //private table info modal

  $ionicModal.fromTemplateUrl('templates/model/private-table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalInfo = modal;
  });

  $scope.openMyPrivateTable = function () {
    Service.getPrivateTables(function (data) {
      $scope.privateTableDatas = data.data.data.results;
      console.log($scope.privateTableDatas);
    });
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
    $scope.ModalSearch.show();
  }

  $scope.itemArray = [{
      id: 1,
      name: 'private'
    },
    {
      id: 2,
      name: 'second'
    },
    {
      id: 3,
      name: 'third'
    },
    {
      id: 4,
      name: 'fourth'
    },
    {
      id: 5,
      name: 'fifth'
    },
  ];

  $scope.selected = {
    value: $scope.itemArray[0]
  };


  //privatetable call
  $scope.createPrivateTable = function (formData) {
    formData.accessToken = $.jStorage.get("accessToken");
    Service.createTable(formData, function (data) {
      console.log("private Table", data)
      if (data.value) {
        $scope.privateTableData = data.data;

        $timeout(function () {
          $scope.privateTableData = false;
        }, 10000);
      } else {}
    });
  };

  //private table  login in 
  $ionicModal.fromTemplateUrl('templates/model/private-table-login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.privateLogInModal = modal;
  });

  $scope.showPrivateLogInModal = function () {
    $scope.privateLogInModal.show();
  }
  $scope.closePrivateLogInModal = function () {
    $scope.privateLogInModal.hide();
  };

  $scope.goToPrivateTableLogIn = function (data) {
    $scope.privateDataForModal = data;
    $scope.showPrivateLogInModal();
    //
  }

  $scope.goToPrivateTable = function (tableID, password) {
    Service.getAccessToTable({
      'tableId': tableID,
      'password': password
    }, function (data) {
      console.log(data.data.value);
      if (data.data.value) {
        $scope.tableId = data.data.data._id;
        $scope.closePrivateLogInModal();
        $scope.closePriceRangeModal();
        $timeout(function () {
          $state.go('table', {
            'id': $scope.tableId
          });
        }, 300)
      } else {
        $scope.errorInPrivateLogIn = true;
      }

    })
    // $scope.tableId = table._id;
    // $scope.closePriceRangeModal();
    // $timeout(function () {
    //   $state.go('table', {
    //     'id': $scope.tableId
    //   });
    // }, 300)

  }

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.PLModal.remove();
    $scope.ACStatementModal.remove();
    $scope.transferStatementModal.remove();
    $scope.changePasswordModel.remove();
    $scope.priceRangeModal.remove();
    $scope.privateLogInModal.remove();
    $scope.closeAllTab();
  });

});
