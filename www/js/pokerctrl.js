var newGameSocketFunction;
var updateSocketFunction;
var showWinnerFunction;
var removePlayerFunction;
var seatSelectionFunction;
var myTableNo = 0;

myApp.controller("PokerCtrl", function ($scope, Service, pokerService, $state, $stateParams, $ionicModal, $ionicPlatform, $timeout) {
  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape')
  })
  Service.checkAccessLevel();
  //socket
  var mySocket1 = io.sails.connect(adminPoker);
  mySocket1.on('connect', function onConnect() {
    socketId = mySocket1._raw.id;
    $.jStorage.set("socketId", mySocket1._raw.id);
    console.log("teenpatti socket connected", mySocket1._raw.id);
    Service.connectSocket(function (data) {
      console.log(data);
    });
  });

  // variables declaration
  $scope.tableId = $stateParams.id;
  $scope.memberId = $.jStorage.get('memberId');
  myTableNo = 0;
  $scope.sitHere = true;


  $scope.auto = {
    isAutoBuy: false,
    payBigBlind: false,
  };

  //end of variables declaration


  // for normal modal and ui popover
  $scope.closeAllModal = function () {
    $scope.leftMenu = false;
    $scope.showTableinfo = false;
    $scope.openSlider = false;
    console.log("close called");
  }
  $scope.closeAllModal();

  $scope.closeLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = false;
  };
  $scope.openLeftMenu = function () {
    $scope.closeAllModal();
    $scope.leftMenu = true;
  };
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
    // console.log('stop propagation');
    $event.stopPropagation();
  };

  $scope.toggleSlider = function () {
    $scope.openSlider = !$scope.openSlider;
    console.log('s', $scope.openSlider);
  }


  $ionicModal.fromTemplateUrl('templates/model/message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.messageModal = modal;
    // $scope.showMessageModal();

  });

  $scope.showMessageModal = function () {
    $scope.messageModal.show();
    $timeout(function () {
      $scope.closeMessageModal();
    }, 3000);
  };
  $scope.closeMessageModal = function () {
    $scope.messageModal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/model/poker/poker_game_price_range.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.priceRangeModal = modal;
    // $scope.gameModal.show();
  });

  $scope.openPriceRangeModal = function (sitNum) {
    // if (!(_.isEmpty($scope.activePlayer))) {
    // if (!$scope.activePlayer[0].tableLeft) {
    //   if (!$scope.sitHere) {
    //     $scope.message = {
    //       heading: "You are already been seated",
    //       content: "No need to sit again !!!"
    //     };
    //     $scope.showMessageModal();
    //     return;
    //   }
    // }
    // }
    console.log('inside price range modal');
    if (!$scope.sitHere) {
      console.log("return because sithere", $scope.sitHere);
      return
    }

    $scope.priceRangeModal.show();
    $scope.sitNo = sitNum;
  };
  $scope.closePriceRangeModal = function () {
    $scope.priceRangeModal.hide();
  };
  //end


  $scope.backToLobby = function () {
    $state.go('lobby');
  }



  $scope.slider = {
    value: 50,
    options: {
      floor: 0,
      ceil: 150000,
      step: 10
    }
  };

  //range slider
  $scope.raiseSlider = {
    value: 100,
    options: {
      floor: 10,
      ceil: 150000,
      step: 10,
      vertical: true
    },
  };
  // All game login starts here
  function reArragePlayers(playersData) {
    console.log(myTableNo);
    var diff = 9 - myTableNo;
    var players = _.times(9, function (n) {
      var playerReturn = _.find(playersData, function (singlePlayer) {
        if (singlePlayer) {
          var checkNo = (singlePlayer.playerNo + diff);
          if (checkNo > 9) {
            checkNo = checkNo - 9;
          }
          if ((n + 1) == checkNo) {
            return singlePlayer;
          } else {
            return null;
          }
        }

      });
      return _.cloneDeep(playerReturn);
    });
    $scope.players = players;
    console.log($scope.players);
  }
  $scope.iAmThere = function (data) {
    if (!$scope.memberId) {
      $scope.memberId = $.jStorage.get('memberId');
    }
    console.log($scope.memberId, "member id", data);
    $scope.isThere = false;
    _.forEach(data, function (value) {
      if (value && value.memberId == $scope.memberId) {
        $scope.isThere = true;
        myTableNo = value.playerNo;
        console.log(myTableNo);
        startSocketUpdate();
        return false;
      }
    });
    $scope.sitHere = !$scope.isThere;

    console.log("you are there", $scope.isThere, "at ", myTableNo);
    // In Case he is already Sitting Please Enable the Game
  };






  $scope.updatePlayers = function () {
    if (!_.isEmpty($scope.tableId)) {
      pokerService.getOneTableDetails($scope.tableId, function (data) {
        // console.log("getOneTableDetails", data.data.data);
        // check whether dealer is selected or not
        console.log("get one table data", data);
        $scope.communityCards = data.data.communityCards;
        $scope.table = data.data.table;
        console.log($scope.table);
        // $scope.currentRoundAmt = $scope.table.currentRoundAmt;
        // $scope.tableYoutube = "https://www.youtube.com/embed/" + $scope.table.youTubeUrl + "?enablejsapi=1&showinfo=0&origin=http%3A%2F%2Flocalhost%3A8100&widgetid=1&autoplay=1&cc_load_policy=1&controls=0&disablekb=1&modestbranding=1";
        // $scope.pots = data.data.pots;
        // $scope.hasTurn = data.data.hasTurn;
        // $scope.isCheck = data.data.isCheck;
        $scope.minimumBuyin = data.data.table.minimumBuyin;
        // $scope.isCalled = data.data.isCalled;
        // $scope.isChecked = data.data.isChecked;
        // $scope.isRaised = data.data.isRaised;

        // $scope.fromRaised = data.data.fromRaised;
        // $scope.fromRaised = data.data.toRaised;

        $scope.slider.value = $scope.minimumBuyin;
        // $scope.slider.options.floor = $scope.minimumBuyin;
        // $scope.slider.options.step = $scope.table.smallBlind;

        // $scope.raiseSlider.value = $scope.fromRaised;
        // $scope.raiseSlider.options.floor = $scope.fromRaised;
        // $scope.raiseSlider.options.ceil = $scope.toRaised;

        // if (data.data.pot) {
        //   $scope.potAmount = data.data.pot[0].totalAmount;
        // }
        $scope.iAmThere(data.data.players);
        reArragePlayers(data.data.players);
        // console.log($scope.players);

        console.log($scope.players);
        // $scope.activePlayer = _.filter($scope.players, function (player) {
        //   // if (player && (player.user._id == $scope._id)) {
        //   //   return true;
        //   // }
        //   if (player && (player._id == $scope._id)) {
        //     return true;
        //   }
        // });
        // $scope.isAllInPlayers = _.filter($scope.players, function (player) {
        //   if ((player && player.isAllIn) || (player && player.isAllIn == false)) {
        //     return true;
        //   }
        // }).length;
        // if (!$scope.sitHere) {
        //   if ($scope.activePlayer) {
        //     $scope.activePlayerNo = $scope.activePlayer[0].playerNo;
        //   };
        // };
        // if (!$scope.sitHere) {
        //   if ($scope.activePlayer[0].buyInAmt < $scope.table.bigBlind) {
        //     var autoBuy
        //     autoBuy = true;
        //     $scope.autoBuygame(autoBuy);
        //     if ($scope.activePlayer[0].buyInAmt < 0) {
        //       $scope.closePriceRangeModal();
        //       $state.go("lobby");
        //       console.log("one");
        //     }
        //   }
        // }
        // if (!(_.isEmpty($scope.extra))) {
        //   if (($scope.extra.action == "raise") || ($scope.extra.action == "call")) {
        //     $scope.chaalAmt = $scope.extra;
        //   };
        // }
        // console.log("$scope.activePlayerNo", $scope.activePlayerNo);
        // $scope.sideShowDataFrom = 0;
        // $scope.remainingActivePlayers = _.filter($scope.players, function (player) {
        //   if ((player && player.isActive) || (player && player.isActive == false)) {
        //     return true;
        //   }
        // }).length;


        // $scope.remainingPlayerCount = _.filter($scope.players, function (player) {
        //   if (player && player.isActive && !player.isFold) {
        //     return true;
        //   }
        // }).length;

        // if ($scope.remainingActivePlayers == 9) {
        //   $scope.message = {
        //     heading: "Table Full",
        //     content: "Try after sometime !!",
        //     error: true
        //   };
        //   $scope.showMessageModal();
        // }

        // $scope.remainingPlayerCount = _.filter($scope.players, function (player) {
        //   if (player && player.isActive && !player.isFold) {
        //     return true;
        //   }
        // }).length;
        // $scope.changeTimer(data.data.table.autoFoldDelay);
      });

      // _.each($scope.players, function (player) {
      //   if (player) {
      //     _.each(data.data.table.currentRoundAmt, function (number) {
      //       var currentRoundAmount = data.data.table.currentRoundAmt
      //       var currentRound = _.findIndex(currentRoundAmount, function (currentRoundAmount) {
      //         // console.log(player);
      //         return currentRoundAmount._id == player._id;
      //       });
      //       if (currentRound >= 0) {
      //         // console.log("currentRound", currentRound);
      //         player.currentRoundAmt = {
      //           currentRoundAmt: currentRoundAmt.amount
      //         };
      //       }
      //     });
      //   }
      // });
    }
  };
  $scope.updatePlayers();

  // Update Socket Player
  updateSocketFunction = function (data, dontDigest) {
    console.log("updateSocketFunction", data);
    $scope.communityCards = data.data.communityCards;
    $scope.table = data.data.table;
    // $scope.currentRoundAmt = $scope.table.currentRoundAmt;
    // $scope.tableYoutube = "https://www.youtube.com/embed/" + $scope.table.youTubeUrl + "?enablejsapi=1&showinfo=0&origin=http%3A%2F%2Flocalhost%3A8100&widgetid=1&autoplay=1&cc_load_policy=1&controls=0&disablekb=1&modestbranding=1";
    // $scope.extra = data.data.extra;
    // $scope.pots = data.data.pots;
    // $scope.hasTurn = data.data.hasTurn;
    // $scope.isCalled = data.data.isCalled;
    // $scope.isChecked = data.data.isChecked;
    // $scope.isRaised = data.data.isRaised;
    // $scope.fromRaised = data.data.fromRaised;
    // $scope.toRaised = data.data.toRaised;
    // console.log("$scope.currentRoundAmt", $scope.currentRoundAmt);

    // $scope.slider.value = $scope.minimumBuyin;
    // $scope.slider.options.floor = $scope.minimumBuyin;
    // $scope.slider.options.step = $scope.table.smallBlind;

    // $scope.raiseSlider.value = $scope.fromRaised;
    // $scope.raiseSlider.options.floor = $scope.fromRaised;
    // $scope.raiseSlider.options.ceil = $scope.toRaised;

    // $scope.minimumBuyin = data.data.table.minimumBuyin;
    // if (data.data.pots[0]) {
    //   $scope.potAmount = data.data.pots[0].totalAmount;
    // }
    // if ($scope.updateSocketVar == 0) {
    //   reArragePlayers(data.data.players);
    // }

    // $scope.activePlayer = _.filter($scope.players, function (player) {
    //   // console.log("activeplayer257", player);
    //   if (_.isEmpty(player)) {} else {
    //     if (player.isTurn && $.jStorage.get("socketId") == player.socketId) {
    //       $ionicPlatform.ready(function () {
    //         if (window.cordova) {
    //           window.plugins.NativeAudio.play('turn');
    //           navigator.vibrate(500);
    //         }
    //       })
    //     } else {

    //     }
    //   }
    //   if (player && (player.user._id == $scope._id)) {
    //     return true;
    //   }
    // });

    // if ($scope.activePlayer[0].playerNo) {
    //   $scope.activePlayerNo = $scope.activePlayer[0].playerNo;
    // };

    // if (!$scope.sitHere) {
    //   if ($scope.activePlayer[0].buyInAmt < $scope.table.bigBlind) {
    //     var autoBuy
    //     autoBuy = true;
    //     $scope.autoBuygame(autoBuy);
    //     if ($scope.activePlayer[0].buyInAmt < 0) {
    //       $scope.closePriceRangeModal();
    //       $state.go("lobby");
    //       console.log("one");
    //     }
    //   }
    // }

    // $scope.remainingActivePlayers = _.filter($scope.players, function (player) {
    //   if ((player && player.isActive) || (player && player.isActive == false)) {
    //     return true;
    //   }
    // }).length;

    // $scope.remainingPlayerCount = _.filter($scope.players, function (player) {
    //   if (player && player.isActive && !player.isFold) {
    //     return true;
    //   }
    // }).length;

    // $scope.isAllInPlayers = _.filter($scope.players, function (player) {
    //   if ((player && player.isAllIn) || (player && player.isAllIn == false)) {
    //     return true;
    //   }
    // }).length;

    // $scope.remainingPlayerCount = _.filter($scope.players, function (player) {
    //   if (player && player.isActive && !player.isFold) {
    //     return true;
    //   }
    // }).length;
    //tip socket
    // if ($scope.extra.action == "tip") {
    //   $scope.tipAmount = $scope.extra.amount;
    //   $scope.TipPlayerNo = $scope.extra.playerNo;

    //   //to reset tip and plyr no
    //   $timeout(function () {
    //     $scope.tipAmount = -1;
    //     $scope.TipPlayerNo = -1;
    //   }, 2000);
    // };
    //Raise socket
    // if ($scope.extra.action == "raise") {
    //   $scope.tipAmount = $scope.extra.amount;
    //   $scope.TipPlayerNo = $scope.extra.playerNo;

    //   //to reset raise and plyr no
    //   $timeout(function () {
    //     $scope.tipAmount = -1;
    //     $scope.TipPlayerNo = -1;
    //   }, 2000);
    // };

    // if (!(_.isEmpty($scope.extra))) {
    //   if (($scope.extra.action == "raise") || ($scope.extra.action == "call")) {
    //     $scope.chaalAmt = $scope.extra;
    //   };
    // }

    // if ($scope.extra.action == "call") {
    //   $scope.tipAmount = $scope.extra.amount;
    //   $scope.TipPlayerNo = $scope.extra.playerNo;

    //   //to reset call and plyr no
    //   $timeout(function () {
    //     $scope.tipAmount = -1;
    //     $scope.TipPlayerNo = -1;
    //   }, 2000);
    // };

    // // remainingActivePlayers
    // if ($scope.remainingActivePlayers == 9) {
    //   $scope.message = {
    //     heading: "Table Full",
    //     content: "Try after sometime !!",
    //     error: true
    //   };
    //   $scope.showMessageModal();
    // };
    // if (!dontDigest) {
    //   $scope.$apply();
    // };

    // _.each($scope.players, function (player) {
    //   if (player) {
    //     _.each(data.data.table.currentRoundAmt, function (pot, number) {
    //       var currentRoundAmount = data.data.table.currentRoundAmt
    //       var currentRound = _.findIndex(currentRoundAmount, function (currentRoundAmount) {
    //         // console.log(player);
    //         return currentRoundAmount._id == player._id;
    //       });
    //       if (currentRound >= 0) {
    //         player.currentRoundAmt = {
    //           currentRoundAmt: currentRoundAmt.amount
    //         };
    //       }
    //     });
    //   };
    // });
    // console.log("$scope.currentRoundAmount", $scope.players);

  };


  function startSocketUpdate() {
    // io.socket.off("Update", updateSocketFunction);
    mySocket1.on("Update", updateSocketFunction);
  }
  startSocketUpdate();
  // Socket Update function with REST API

  $scope.playerData = function () {
    Service.sendAccessToken(function (data) {
      if (data && data.data && data.data.data) {
        $scope.singlePlayerData = data.data.data;
        console.log("send access token", $scope.singlePlayerData);
        $scope.image = $scope.singlePlayerData.image;
        $scope.username = $scope.singlePlayerData.username;
        $scope.userType = $scope.singlePlayerData.userType;
        $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;
        $scope.memberId = data.data.data._id;
        console.log("$scope.balance", $scope.balance);
      } else {
        $state.go("login");
      }
    });
  };
  $scope.playerData();

  if (!$scope.tableId) {
    $state.go('lobby');
  }

  // $scope.updatePlayers = function () {
  //   pokerService.getOneTableDetails($scope.tableId, function (data) {
  //     console.log(data);
  //     $scope.iAmThere(data.data.players);
  //     $scope.reArragePlayers(data.data.players);
  //     console.log($scope.players);
  //   })
  // }
  // $scope.updatePlayers();


  //winner
  function showWinnerFunction(data) {
    // $scope.chaalAmt = {};
    console.log("show winner", data);
    // $scope.winnerData = data.data.pots;
    // _.each($scope.players, function (player) {
    //   if (player) {
    //     player.isTurn = false;
    //     player.isWinner = true;
    //     _.each(data.data.pots, function (pot, number) {
    //       var winners = _.filter(pot.winner, function (potPlayer) {
    //         return potPlayer.winner;
    //       });
    //       var isThisPlayerWinner = _.findIndex(winners, function (winner) {
    //         // console.log(player);
    //         return winner.playerId == player._id;
    //       });
    //       if (isThisPlayerWinner >= 0) {
    //         // console.log("isThisPlayerWinner", isThisPlayerWinner);
    //         player.winnerDetails = {
    //           potMainName: pot.name,
    //           potName: winners[isThisPlayerWinner].winName,
    //           amount: pot.totalAmount,
    //           winnercard: winners[isThisPlayerWinner].winnigCards
    //         };
    //       }
    //     });
    //   }
    //   $scope.$apply();
    // });
    // console.log("inside Winner", $scope.players);
    // $scope.activePlayer = _.filter($scope.players, function (player) {
    //   if (player && (player.user._id == $scope._id)) {
    //     return true;
    //   }
    // });
  }
  mySocket1.on("showWinner", showWinnerFunction);

  //seat selection
  seatSelectionFunction = function (data) {
    console.log("seatSelectionFunction", data);
    // $scope.communityCards = data.data.communityCards;
    // $scope.table = data.data.table;
    // $scope.currentRoundAmt = $scope.table.currentRoundAmt;
    // $scope.extra = data.data.extra;
    // $scope.pots = data.data.pots;
    // $scope.hasTurn = data.data.hasTurn;
    // $scope.isCalled = data.data.isCalled;
    // $scope.isChecked = data.data.isChecked;
    // $scope.isRaised = data.data.isRaised;
    // if ($scope.updateSocketVar == 0) {
    //   reArragePlayers(data.data.players);
    // };
    // $scope.activePlayer = _.filter($scope.players, function (player) {
    //   if (player && (player.user._id == $scope._id)) {
    //     return true;
    //   }
    // });
    // if (!$scope.sitHere) {
    //   if ($scope.activePlayer[0]) {
    //     $scope.activePlayerNo = $scope.activePlayer[0].playerNo;
    //   };
    // };
    // $scope.$apply();
  };
  mySocket1.on("seatSelection" + $scope.tableId, seatSelectionFunction);

  newGameSocketFunction = function (data) {
    console.log("NewGame", data);
    // $scope.communityCards = data.data.communityCards;
    // $scope.playersChunk = data.data.players;
    // $scope.table = data.data.table;
    // $scope.extra = data.extra;
    // $scope.hasTurn = data.hasTurn;
    // $scope.isCheck = data.isCheck;
    // $scope.pots = data.data.pots;
    // if ($scope.updateSocketVar == 0) {
    //   reArragePlayers(data.data.players);
    // }
    // $scope.activePlayer = _.filter($scope.players, function (player) {
    //   if (player && (player.user._id == $scope._id)) {
    //     return true;
    //   }
    // });
    // if (!$scope.sitHere) {
    //   if ($scope.activePlayer) {
    //     $scope.activePlayerNo = $scope.activePlayer[0].playerNo;
    //   };
    // };
    // $scope.$apply();
  };

  mySocket1.on("newGame", newGameSocketFunction);



  $scope.autoBuygame = function (autoBuy) {
    $scope.autoBuy = autoBuy;
    // console.log($scope.autoBuy);
    $scope.priceRangeModal.show();
  };

  $scope.reBuyFunction = function (data) {
    // console.log(data);
    $scope.dataPlayer = {};
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.amount = data.value;
    if ($scope.dataPlayer.amount < $scope.minimumBuyin) {
      // console.log("inside not save Player");
      $scope.message = {
        heading: "Insufficent Balance",
        content: "Min Buy In for this table is " + $scope.minimumBuyin + "<br/> Try Again!"
      };
      $scope.showMessageModal();
    }
    if ($scope.dataPlayer.amount > $scope.slider.options.ceil) {
      // console.log("inside not save Player");
      $scope.message = {
        heading: "You are exceded max balance",
        content: "Min Buy In for this table is " + $scope.slider.options.ceil + "<br/> Try Again!"
      };
      $scope.showMessageModal();
    };
    // if ($scope.dataPlayer.amount <= $scope.balance) {
    //   if ($scope.dataPlayer.amount >= $scope.minimumBuyin && $scope.dataPlayer.amount <= $scope.slider.options.ceil) {
    //     Service.getReFillBuyIn($scope.dataPlayer, function (data) {
    //       // console.log(data);
    //     });
    //   };
    // };
  };



  //sit Here Function
  //player sitting


  $scope.sitHereFunction = function (sliderData, data) {
    // if (!(_.isEmpty($scope.activePlayer[0]))) {
    //   if (!$scope.activePlayer[0].tableLeft) {
    //     if (!$scope.sitHere) {
    //       return;
    //     }
    //   }
    // }
    console.log("sit here function", sliderData, data);
    $scope.ShowLoader = true;
    $scope.dataPlayer = {};
    $scope.dataPlayer.playerNo = $scope.sitNo;
    $scope.dataPlayer.tableId = $scope.tableId;
    $scope.dataPlayer.amount = sliderData.value;
    $scope.dataPlayer.autoRebuy = data.isAutoBuy;
    $scope.dataPlayer.payBigBlind = data.payBigBlind;

    $timeout(function () {
      if ($scope.ShowLoader) {
        $scope.ShowLoader = false;
        $scope.updatePlayers();
      }
    }, 5000);
    if ($scope.dataPlayer.amount >= $scope.balance) {
      $scope.message = {
        heading: "Insufficent Balance",
        content: "Min Buy In for this table is " + $scope.minimumBuyin + " <br/> Try Again!",
        error: true
      };

      $scope.showMessageModal();
      $timeout(function () {
        $state.go('lobby');
        console.log("one");
      }, 5000)

    };
    if ($scope.dataPlayer.amount <= $scope.balance) {
      console.log("savePlayerToTable inside");
      if (!_.isEmpty($scope.dataPlayer.tableId)) {
        if ($scope.dataPlayer.amount >= $scope.minimumBuyin && $scope.dataPlayer.amount <= $scope.slider.options.ceil) {
          // console.log("inside save Player");
          pokerService.savePlayerToTable($scope.dataPlayer, function (data) {
            $scope.ShowLoader = false;
            if (data.data.value) {
              $scope.sitHere = false;
              myTableNo = data.data.data.playerNo;
              $scope.activePlayerNo = data.data.data.playerNo;
              $scope.updatePlayers();
              startSocketUpdate();
            } else {
              if (data.data.error == "Player Already Added") {
                $scope.message = {
                  heading: "Player Already Added",
                  content: "Player Already Added",
                  error: true
                };
                $scope.showMessageModal();

              } else if (data.data.error == "Insufficient Balance") {
                $scope.message = {
                  heading: "Insufficient Funds",
                  content: "Minimum amount required to enter this table",
                  error: true
                };
                $scope.showMessageModal();
              }
            }
          });
        } else if ($scope.dataPlayer.amount < $scope.minimumBuyin) {
          // console.log("inside not save Player");
          $scope.message = {
            heading: "Insufficent Balance",
            content: "Min Buy In for this table is " + $scope.minimumBuyin + "<br/> Try Again!",
            error: true
          };
          $scope.showMessageModal();
        } else if ($scope.dataPlayer.amount > $scope.slider.options.ceil) {
          // console.log("inside not save Player");
          $scope.message = {
            heading: "You are exceded max balance",
            content: "Min Buy In for this table is " + $scope.slider.options.ceil + "<br/> Try Again!",
            error: true
          };
          $scope.showMessageModal();
        }
      }
    }

  };

  // all fn

  //remove player function
  $scope.removePlayers = function () {
    $scope.ShowLoader = true;
    pokerService.removePlayer($scope.tableId, myTableNo, function (data) {
      if (data) {
        $scope.ShowLoader = false;
        // $state.go('lobby');
        console.log("one");
      }
    });
  };

  $scope.fold = function () {
    $scope.foldPromise = pokerService.fold($scope.tableId, function (data) {});
  };
  $scope.allIn = function () {
    $scope.allInPromise = pokerService.allIn($scope.tableId, function (data) {});
  };
  //check
  $scope.check = function () {
    $scope.checkPromise = pokerService.check($scope.tableId, function (data) {});
  };
  $scope.raise = function (raiseAmount) {
    $scope.raisePromise = pokerService.raise($scope.tableId, raiseAmount, function (data) {});
  };
  $scope.call = function () {
    $scope.callPromise = pokerService.call($scope.tableId, function (data) {});
  };


  $scope.$on("$destroy", function () {
    $scope.priceRangeModal.remove();
    $scope.messageModal.remove();
  })

});
