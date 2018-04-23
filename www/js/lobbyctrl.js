myApp.controller("LobbyCtrl", function ($scope, $state, $ionicModal, $ionicPopup, $ionicPlatform, Service, $http, $timeout) {

  $ionicPlatform.ready(function () {
    if (ionic.Platform.isAndroid()) {
      screen.orientation.lock('landscape');
    } else {

    }
    if (window.cordova) {
      // running on device/emulator
      window.plugins.NativeAudio.stop('timer');
      window.plugins.NativeAudio.stop('coin');
      window.plugins.NativeAudio.stop('winner');
      window.plugins.NativeAudio.stop('shuffle');
      window.plugins.NativeAudio.stop('button');
    }

  })
  // screen.orientation.lock('landscape');


  $ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
  }, 100);
  //reset Page
  $scope.resetpage = function () {
    $scope.pageNo = 1;
    $scope.cachedPage = 1;
    $scope.loadingDisable = false;
    $scope.results = [];
    $scope.transferStatementData = [];
    $scope.privateTableDatas = [];
    $scope.tablesData = [];
    $scope.tablesDataFilter = [];
    $scope.privateTablesDataFilter = [];
    $scope.noDataFound = false;
    $scope.paging = {
      maxPage: 1
    };
  }

  $scope.resetpage();
  $scope.filterType = ['private', 'public'];
  $scope.filterGameType = ['Normal', '2 Cards', '4 Cards', 'Joker', 'Muflis'];
  $scope.normalGameType = 'Normal';
  $scope.accountStatmentFilter = [];

  $scope.gameTypeForFilter = [{
      "name": "TeenPatti",
    },
    {
      "name": "Live Casino",
    }
  ]

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
    $scope.VariationTab = false;
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
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.paging = {
      maxPage: 1
    };
    $scope.ACStatementModal = modal;
    // $scope.openACStatement();
  });

  $scope.openACStatement = function () {
    $scope.accountStatmentFilter.date = new Date();
    $scope.results = [];
    $scope.statementNetProfit = false;
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.paging = {
      maxPage: 1
    };
    $scope.ACStatementModal.show();
  }
  $scope.closeACStatement = function () {
    $scope.ACStatementModal.hide();
  }

  //Account Statement
  $scope.loadMore = function () {
    console.log("load more", $scope.paging, $scope.pageNo)
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.accountStatement($scope.accountStatmentFilter);
    } else {

    }
  };

  $scope.resetStatementFilter = function () {
    $scope.pageNo = 1;
    $scope.results = [];
  }

  $scope.accountStatement = function (accountStatmentFilter) {
    console.log("account filter", accountStatmentFilter);
    if (accountStatmentFilter.type.name == "TeenPatti") {
      Service.getTransaction($scope.pageNo, accountStatmentFilter, function (data) {
        if (data) {
          if (data.data.PagData.total === 0) {
            $scope.noDataFound = true;
            $scope.results = [];
            // Error Message or no data found 
            // $scope.displayMessage = {
            //   main: "<p>No Data Found.</p>",
            // };
          }
          $scope.paging = data.data.PagData.options;
          _.each(data.data.PagData.results, function (n) {
            $scope.results.push(n);
          });

          $scope.statementNetProfit = data.data.netProfit;
          $scope.loadingDisable = false;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {}
      });
    }
    if (accountStatmentFilter.type.name == "Live Casino") {
      Service.getARTransaction($scope.memberId, $scope.pageNo, accountStatmentFilter, function (data) {
        // if (data) {

        //   // $scope.result = data.
        //   console.log(data);

        //   $scope.results = data.data.data.accounts;
        //   $scope.statementNetProfit = data.data.data.netProfit;
        //   // if (data.data.data.total === 0) {
        //   //   $scope.noDataFound = true;
        //   //   // Error Message or no data found 
        //   //   // $scope.displayMessage = {
        //   //   //   main: "<p>No Data Found.</p>",
        //   //   // };
        //   // // }
        //   // $scope.paging = data.data.data.options;
        //   // _.each(data.data.data.results, function (n) {
        //   //   $scope.results.push(n);
        //   // });
        //   // $scope.loadingDisable = false;
        //   // $scope.$broadcast('scroll.infiniteScrollComplete');
        // } else {}
        console.log(data);
        if (data.value) {
          if (data.data.accounts.total === 0) {
            $scope.noDataFound = true;
            $scope.results = [];
            $scope.statementNetProfit = false;
            // Error Message or no data found 
            // $scope.displayMessage = {
            //   main: "<p>No Data Found.</p>",
            // };
          }
          $scope.statementNetProfit = data.data.netProfit;
          $scope.paging = data.data.accounts.options;
          _.each(data.data.accounts.results, function (n) {
            $scope.results.push(n);
          });
          $scope.loadingDisable = false;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {}
      });
    }

  };


  //transfer statement
  $ionicModal.fromTemplateUrl('templates/model/transfer-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.transferStatementData = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.transferStatementModal = modal;
  });



  $scope.openTransferStatement = function () {
    $scope.transferStatementData = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
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
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          // $scope.displayMessage = {
          //   main: "<p>No Data Found.</p>",
          // };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.transferStatementData.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
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
    $scope.tablesDataFilter = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.priceRangeModal = modal;
  });
  $scope.openPriceRangeModal = function () {
    $scope.tablesDataFilter = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.priceRangeModal.show();
  }
  $scope.closePriceRangeModal = function () {
    $scope.priceRangeModal.hide();
  }

  //for table selection//
  $scope.playNow = function ($event, tab) {
    console.log(tab);
    $scope.tablesDataFilter = [];
    $scope.gameType = tab;
    console.log($scope.gameType, "gametype");
    $scope.resetFilter();
    $scope.openPriceRangeModal();
    $event.stopPropagation();
    // if (!$scope.VariationActive) {

    // }
  }

  $scope.getcheck = function () {
    return $scope.loadingDisable;
  }
  $scope.loadMoreFilterTable = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.filterTables();
    } else {}
  };

  //Filter Table Data

  $scope.filterTables = function () {
    Service.getFilterTableData($scope.filterData, $scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          // $scope.displayMessage = {
          //   main: "<p>No Data Found.</p>",
          // };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.tablesDataFilter.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };

  //resetFilter
  $scope.resetFilter = function () {
    // $scope.filterData = {};
    if ($scope.gameType != null) {
      $scope.filterData = {
        type: "public",
        gameType: $scope.gameType
      };
    }
    $scope.filterTables();
  };


  //Private Table Modal
  $ionicModal.fromTemplateUrl('templates/model/table-private-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.privateTablesDataFilter = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.privateTableModal = modal;
  });
  $scope.openPrivateTableModal = function () {
    $scope.privateTablesDataFilter = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.privateTableModal.show();
  }
  $scope.closePrivateTableModal = function () {
    $scope.privateTableModal.hide();
  }

  //for table selection//
  $scope.privateTableFilterModal = function ($event) {
    $scope.openPrivateTableModal();
    $event.stopPropagation();
    if (!$scope.VariationActive) {

    }
  }


  //Private Table Filter
  $scope.loadMorePrivateFilterTable = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.privateFilterTables();
    } else {}
  };


  $scope.privateFilterTables = function () {
    console.log($scope.privateFilterData);
    Service.getFilterTableData($scope.privateFilterData, $scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          // $scope.displayMessage = {
          //   main: "<p>No Data Found.</p>",
          // };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.privateTablesDataFilter.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };

  //resetFilter
  $scope.privateResetFilter = function () {
    console.log($scope.gameType);
    // if ($scope.gameType != null) {
    $scope.privateFilterData = {
      type: "private",
      // gameType: $scope.gameType
    };
    // }
    $scope.privateFilterTables();
  };


  //my private Table Info 
  $ionicModal.fromTemplateUrl('templates/model/my-private-table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.myPrivateModal = modal;
    $scope.privateTableDatas = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;

    // $scope.myPrivateTable();
    // $scope.openMyPrivateTable();
  });
  $scope.openMyPrivateTable = function () {
    $scope.privateTableDatas = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.myPrivateModal.show();
  }
  $scope.closeMyPrivateModal = function () {
    $scope.myPrivateModal.hide();
  }

  //Private Table Info
  $scope.loadMorePrivateTable = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.myPrivateTable();
    } else {

    }
  };

  $scope.myPrivateTable = function () {
    var reqData = {};
    if ($scope.gameType) {
      reqData.gameType = $scope.gameType;
    }
    Service.getPrivateTables($scope.pageNo, reqData, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          // $scope.displayMessage = {
          //   main: "<p>Your Private table is empty.</p><p>Create your private table to view.</p>",
          // };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.privateTableDatas.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };

  //logout
  $scope.logout = function () {
    Service.playerLogout(function (data) {
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
    $scope.VariationActive = !$scope.VariationActive;
  }
  $scope.variationGame = function ($event) {
    $event.stopPropagation();
    $scope.VariationTab = !$scope.VariationTab;
  }


  // $scope.playJoker = function ($event) {
  //   if (!$scope.VariationActive) {
  //     $scope.openPriceRangeModal();
  //     $event.stopPropagation();
  //   }
  // }


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

  $scope.createPrivateModal = function ($event, gameTypeModal) {
    $scope.closeMyPrivateModal();
    $scope.gameTypeModal = gameTypeModal;
    $scope.data = {};
    gameTypeModal ? $scope.data.gameType = gameTypeModal : '';
    $scope.ModalCreate.show();
    $event.stopPropagation();
  }
  $scope.closePrivateTable = function () {
    $scope.ModalCreate.hide();
  };

  //Rules

  $ionicModal.fromTemplateUrl('templates/model/rules.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.rulesModal = modal;
  });

  $scope.openRulesModal = function ($event) {
    $scope.rulesModal.show();
    $event.stopPropagation();
  }
  $scope.closeRulesModal = function () {
    $scope.rulesModal.hide();
  };


  //private table info modal

  // $scope.openMyPrivateTable = function () {
  //   $scope.privateTableDatas = [];
  //   $scope.ModalInfo.show();
  // }

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
    $scope.formDataName = _.lowerCase(formData.name);
    formData.name = $scope.formDataName;
    Service.createTable(formData, function (data) {
      if (data.value) {
        $scope.privateTableData = data.data;
        $timeout(function () {
          $scope.privateTableData = false;
        }, 10000);
      } else {}
      console.log(data.error.errors.name.name);
      if (data.error.errors.name.name == "ValidatorError") {
        $scope.sameNameError = "Table Already Exist";
        $timeout(function () {
          $scope.sameNameError = "";
        }, 8000)
      }
    });
  };

  $scope.deletePrivateTable = function (data) {
    console.log(data);
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Private Table',
      template: 'Are you sure you want to delete private table <b>"' + data.name + '"</b> ?',
      // buttons: [{
      //     text: 'Cancel'
      //   },
      //   {
      //     text: 'Yes',
      //     // type: ""
      //   }
      // ]


    });

    confirmPopup.then(function (res) {
      if (res) {
        console.log('You are sure');
        Service.deletePrivateTable(data._id, function (data) {
          console.log(data)
          if (data.value) {
            $scope.myPrivateTable();
            $scope.openMyPrivateTable();
          }
        })

      } else {
        console.log('You are not sure');
      }
    });

  }


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
    console.log("private table", data)
    $scope.privateDataForModal = data;
    $scope.showPrivateLogInModal();
    //
  }

  $scope.goToPrivateTable = function (tableID, password) {
    Service.getAccessToTable({
      'tableId': tableID,
      'password': password
    }, function (data) {
      if (data.data.value) {
        $scope.tableId = data.data.data._id;
        $scope.closePrivateLogInModal();
        $scope.closePriceRangeModal();
        $scope.closePrivateTableModal();
        $timeout(function () {
          $state.go('table', {
            'id': $scope.tableId
          });
        }, 300)
      } else {
        $scope.errorInPrivateLogIn = true;
      }

    })

  };


  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.PLModal.remove();
    $scope.ACStatementModal.remove();
    $scope.transferStatementModal.remove();
    $scope.changePasswordModel.remove();
    $scope.priceRangeModal.remove();
    $scope.privateLogInModal.remove();
    $scope.rulesModal.remove();
    $scope.myPrivateModal.remove();
    $scope.closeAllTab();
  });
});
