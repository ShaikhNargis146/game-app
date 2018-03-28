myApp.controller("LobbyCtrl", function ($scope, $state, $ionicModal, $ionicPlatform, Service, $http, $timeout) {

  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape');
  })
  screen.orientation.lock('landscape');


  $ionicPlatform.registerBackButtonAction(function (event) {
    // console.log("back button");
    event.preventDefault();
  }, 100);

  $scope.pageNo = 1;
  $scope.results = [];
  $scope.transferStatementData = [];
  $scope.privateTableDatas = [];
  $scope.tablesData = [];
  $scope.noDataFound = false;
  $scope.loadingDisable = false;
  $scope.paging = {
    maxPage: 1
  };


  $scope.filterType = ['private', 'public'];

  $scope.accessToken = $.jStorage.get("accessToken");

  $scope.playerData = function () {
    Service.sendAccessToken(function (data) {
      $scope.singlePlayerData = data.data.data;
      // console.log($scope.singlePlayerData);
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

  //account statementloadingDisable
  $ionicModal.fromTemplateUrl('templates/model/account-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.results = [];
    $scope.ACStatementModal = modal;
  });

  $scope.openACStatement = function () {
    $scope.results = [];
    $scope.ACStatementModal.show();
  }
  $scope.closeACStatement = function () {
    $scope.ACStatementModal.hide();
  }

  //Account Statement
  $scope.loadMore = function () {
    // console.log("in load more" + $scope.pageNo + $scope.paging.maxPage);
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.accountStatement();
    } else {

    }
  };

  $scope.accountStatement = function () {
    Service.getTransaction($scope.pageNo, function (data) {
      // console.log(data);
      if (data) {
        if (data.data.data.count === 0) {
          $scope.noDataFound = true;
          $scope.displayMessage = {
            main: "Oops! Your Account Statement  is empty.",
          };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
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
    $scope.transferStatementData = [];
    $scope.transferStatementModal = modal;
  });



  $scope.openTransferStatement = function () {
    $scope.transferStatementData = [];
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
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          // console.log(n);
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
  $ionicModal.fromTemplateUrl('templates/model/table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.tablesData = [];
    $scope.priceRangeModal = modal;
  });
  $scope.openPriceRangeModal = function () {
    $scope.tablesData = [];
    $scope.priceRangeModal.show();
  }
  $scope.closePriceRangeModal = function () {
    $scope.priceRangeModal.hide();
  }

  //for table selection//
  $scope.playNow = function ($event) {
    if (!$scope.VariationActive) {
      $scope.openPriceRangeModal();
      $event.stopPropagation();
    }
  }
  $scope.loadMoreTable = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.getTable();
    } else {

    }
  };
  $scope.getTable = function () {
    Service.tableData($scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.count === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          $scope.displayMessage = {
            main: "Oops! Table is empty.",
          };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          // console.log("Proper Table", n);
          $scope.tablesData.push(n);
        });
        $scope.loadingDisable = false;
      } else {}
    });
  }


  //my private Table Info 
  $ionicModal.fromTemplateUrl('templates/model/private-table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.myPrivateModal = modal;
    $scope.privateTableDatas = [];
  });
  $scope.openMyPrivateModal = function () {
    $scope.privateTableDatas = [];
    $scope.myPrivateModal.show();
  }
  $scope.closeMyPrivateModal = function () {
    $scope.myPrivateModal.hide();
  }

  //Private Table Info
  $scope.loadMorePrivateTable = function () {
    console.log($scope.paging.maxPage);
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.myPrivateTable();
    } else {

    }
  };

  $scope.myPrivateTable = function () {
    Service.getPrivateTables($scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.count === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          $scope.displayMessage = {
            main: "Oops! Your Private Table is empty.",
          };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          // console.log("private Table", n);
          $scope.privateTableDatas.push(n);
        });
        $scope.loadingDisable = false;
      } else {}
    });
  };

  //logout
  $scope.logout = function () {
    Service.playerLogout(function (data) {
      console.log("logout", data.data.value);
      if (data.data.value) {
        $.jStorage.flush();
        $state.go('login');
      }
    });
  }


  // going to next SVGViewElement
  $scope.goTO = function (view) {
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
    $scope.privateTableDatas = [];
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



  //privatetable call
  $scope.createPrivateTable = function (formData) {
    Service.createTable(formData, function (data) {
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
      // console.log(data.data.value);
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

  };
  //Filter Table Data
  $scope.filterTables = function (data) {
    var fliterData
    fliterData = data;
    $scope.filterTablePromise = Service.getFilterTableData(fliterData, function (data) {
      $scope.tablesData = data.data.data.results;
    });
  };

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
