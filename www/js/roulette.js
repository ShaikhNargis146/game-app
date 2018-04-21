myApp.controller('HomeCtrl', function ($scope, $ionicModal, Service, $state, $timeout, $rootScope, RouletteService) {
  $scope.a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  $scope.b = [1, 2, 3];
  $scope.blackArray = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
  $scope.totalMoney = 10000;
  $scope.maxBet = 1000;
  $scope.minBet = 1;
  $scope.amount = 0;
  $scope.masterArray = {};
  $scope.visitedArray = [];

  $scope.getBlack = function (number) {
    var foundIndex = _.findIndex($scope.blackArray, function (n1) {
      return n1 == number;
    });
    if (foundIndex == -1) {
      return false;
    } else {
      return true;
    }
  }

  $scope.redColor = function (color) {
    $scope.hovering = color
    console.log(color)
  }

  // $("#sectorBlack").hover(function () {
  //   $(".black").css("background", "rgba(255,255,255,0.3)");
  // });

  $scope.getNgClass = function (index) {
    console.log($scope.betPlaceFor)
    $scope.checkForEvenOdd = index % 2;
    $scope.checkForLowHighBet = index<=18;
    if($scope.betPlaceFor=='firstDozen'){
      $scope.dozen = index<=12;
    }else if($scope.betPlaceFor=='secondDozen'){
      $scope.dozen = index>12 && index<=24;
    }else{
      $scope.dozen = index>24 && index<=36;
    }

    $scope.columnBet = index%3;
    var classStr = "'red':getBlack(getIndex($index,outerIndex)[0])==false,'black' :getBlack(getIndex($index,outerIndex)[0])==true ";
    //for red
    classStr += ",'active-blocks': betPlaceFor== 'red'&& getBlack(getIndex($index,outerIndex)[0])==false ";
    //for black
    classStr += "|| betPlaceFor== 'black'&& getBlack(getIndex($index,outerIndex)[0])==true";
    //for even 
    classStr+="|| betPlaceFor== 'even' && checkForEvenOdd==0";
    //for odd
    classStr+="|| betPlaceFor== 'odd' && checkForEvenOdd==1";
    //for even 
    classStr+="|| betPlaceFor== 'low' && checkForLowHighBet==true";
    //for odd
    classStr+="|| betPlaceFor== 'high' && checkForLowHighBet==false";
    //for firstdozen
    classStr+="|| betPlaceFor== 'firstDozen' && dozen==true";
    //for secondDozen
    classStr+="|| betPlaceFor== 'secondDozen' && dozen==true";
    //for lastDozen
    classStr+="|| betPlaceFor== 'lastDozen' && dozen==true";
    //for firstColumn
    classStr+="|| betPlaceFor== '1 column' && columnBet==0";
    //for secondColumn
    classStr+="|| betPlaceFor== '2 column' && columnBet==2";
    //for thirdColumn
    classStr+="|| betPlaceFor== '3 column' && columnBet==1";
    return "{" + classStr + "}";
  }

  $scope.betPlacing = function (betName) {
    $scope.betPlaceFor = betName
  }

  $scope.getIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    var indexArray = [index];
    return indexArray;
  }

  $scope.getCornerBetIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    // index = 'CornerBet' + index + '' + (index - 1) + '' + (index + 2) + '' + (index + 3);
    var indexArray = [index - 1, index, index + 2, index + 3];
    return indexArray;
  }
  $scope.getCornerBetLeftIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    // index = 'CornerBet' + 0 + '' + index + '' + (index - 1) + '' + (index + 2);
    var indexArray = [0, index - 1, index];
    return indexArray;
  }
  $scope.getRightSplitBetIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    // index = 'SplitBet' + index + '' + (index + 3);
    var indexArray = [index, index + 3];
    return indexArray;
  }
  $scope.getLeftSplitBetIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    // index = 'SplitBet' + 0 + '' + index;
    var indexArray = [0, index];
    return indexArray;
  }
  $scope.getBottomSplitBetIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    // index = 'SplitBet' + index + '' + (index - 1);
    var indexArray = [index - 1, index];
    return indexArray;
  }
  $scope.getStreetBetIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    // index = 'StreetBet' + index + '' + (index + 1) + '' + (index + 2);
    var indexArray = [index, index + 1, index + 2];
    return indexArray;
  }
  $scope.getLineBetIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    // index = 'LineBet' + index + '' + (index + 1) + '' + (index + 2) + '' + (index + 3) + '' + (index + 4) + '' + (index + 5);
    var indexArray = [index, index + 1, index + 2, index + 3, index + 4, index + 5];
    return indexArray;
  }
  $scope.getLineBetLeftIndex = function (innerIndex, outerIndex) {
    var index = ((innerIndex + 1) * 3) - outerIndex;
    // index = 'LineBet' + 0 + '' + index + '' + (index + 1) + '' + (index + 2);
    var indexArray = [0, index, index + 1, index + 2];
    return indexArray;
  }
  RouletteService.getLastResults(function (data) {
    $scope.lastResults = data;
  });

  $scope.accessToken = $.jStorage.get("accessToken");
  if (_.isEmpty($scope.accessToken)) {
    $state.go("login");
  }

  $scope.playerData = function () {
    Service.sendAccessToken(function (data) {
      $scope.singlePlayerData = data.data.data;
      $scope.image = $scope.singlePlayerData.image;
      $scope.memberId = $scope.singlePlayerData._id;
      $scope.username = $scope.singlePlayerData.username;
      $scope.userType = $scope.singlePlayerData.userType;
      $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;
      $.jStorage.set("singlePlayerData", $scope.singlePlayerData);
    })
  };
  $scope.playerData();

  $scope.coinArray = [{
    name: "coin1",
    amount: 1,
    img: "img/roulette/coin1.png",
    selected: false
  }, {
    name: "coin2",
    amount: 5,
    img: "img/roulette/coin2.png",
    selected: false
  }, {
    name: "coin3",
    amount: 10,
    img: "img/roulette/coin3.png",
    selected: false
  }, {
    name: "coin4",
    amount: 100,
    img: "img/roulette/coin4.png",
    selected: false
  }];

  $scope.selectCoin = function (coin) {
    $scope.selectedCoin = coin;
    _.forEach($scope.coinArray, function (value) {
      if (value.name == coin.name) {
        value.selected = true;
      } else {
        value.selected = false;
      }
    })
  }

  $ionicModal.fromTemplateUrl('templates/model/message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.messageModal = modal;
  });
  $scope.showMessageModal = function () {
    $scope.messageModal.show();
    $timeout(function () {
      $scope.closeMessageModal();
    }, 2000);
  };
  $scope.closeMessageModal = function () {
    $scope.messageModal.hide();
  };
  $scope.convertCoin = function (data) {
    var displayArray = [];
    var coin1 = _.filter(data, {
      'amount': 1
    }).length;
    var coin2 = _.filter(data, {
      'amount': 5
    }).length;
    var coin3 = _.filter(data, {
      'amount': 10
    }).length;
    var coin4 = _.filter(data, {
      'amount': 100
    }).length;
    coin2 += parseInt((coin1 / 5));
    coin1 = (coin1 % 5);
    coin3 += parseInt((coin2 / 2));
    coin2 = (coin2 % 2);
    coin4 += parseInt((coin3 / 10));
    coin3 = (coin3 % 10);
    var i = 0;
    for (i = 0; i < coin1; i++) {
      displayArray.push($scope.coinArray[0]);
    }
    for (i = 0; i < coin2; i++) {
      displayArray.push($scope.coinArray[1]);
    }
    for (i = 0; i < coin3; i++) {
      displayArray.push($scope.coinArray[2]);
    }
    for (i = 0; i < coin4; i++) {
      displayArray.push($scope.coinArray[3]);
    }
    return displayArray;
  };

  $scope.userBet = function (bet) {

    Service.getBetId(bet, function (data) {
      $scope.betData = data[0];
      console.log($scope.betData)
      if ($scope.selectedCoin) {
        if ($scope.selectedCoin.amount <= $scope.totalMoney) {
          $scope.amount += $scope.selectedCoin.amount;
          if ($scope.amount <= $scope.maxBet) {
            $scope.visitedArray.push(bet);
            if (!$scope.masterArray[bet]) {
              $scope.masterArray[bet] = {
                _id: $scope.betData ? $scope.betData._id : '',
                totalbet: 0,
                coinArray: [],
                displayArray: []
              };
            }
            $scope.masterArray[bet].totalbet += $scope.selectedCoin.amount;
            $scope.masterArray[bet].coinArray.push($scope.selectedCoin);
            $scope.masterArray[bet].displayArray = $scope.convertCoin($scope.masterArray[bet].coinArray);
            $scope.totalMoney = $scope.totalMoney - $scope.selectedCoin.amount;
          } else {
            $scope.amount -= $scope.selectedCoin.amount;
            $scope.message = {
              heading: "Maximum Limit",
              content: "You have reached maximum limit."
            };
            $scope.showMessageModal();
          }
        } else {
          $scope.message = {
            heading: "Not enough money",
            content: "Not enough money for this bet. Try Again!!!"
          };
          $scope.showMessageModal();
        }
      } else {
        $scope.message = {
          heading: "Please Select coin",
          content: "Please Select the coin Before Bet. Try Again!!!"
        };
        $scope.showMessageModal();
      }
    })
  }

  $scope.Undo = function () {
    if (!_.isEmpty($scope.masterArray)) {
      var lastVisitedElement = $scope.visitedArray[$scope.visitedArray.length - 1];
      var coinArray = $scope.masterArray[lastVisitedElement].coinArray;
      $scope.totalMoney = $scope.totalMoney + coinArray[coinArray.length - 1].amount;
      $scope.amount = $scope.amount - coinArray[coinArray.length - 1].amount;
      coinArray.pop();
      $scope.visitedArray.pop();
      $scope.masterArray[lastVisitedElement].displayArray = $scope.convertCoin(coinArray);
    }
  }

  $scope.removeAll = function () {
    $scope.masterArray = {};
  }

  if ($scope.betUser) {
    // $timeout(function () {

    // }, 30000);
  }

  io.socket.on("betsNotAllowed", function (data) {
    if (data.data == "Bets are Not Allowed") {
      if ($scope.betUser) {
        _.each($scope.betUser, function (user) {
          RouletteService.saveUserBets(user, function (data) {
            $rootScope.result = data.data.results;
          });
        });
      }
      $state.go("spinner");
    }
  });

  $scope.logout = function () {
    Service.playerLogout(function (data) {
      if (data.data.value) {
        $.jStorage.deleteKey("accessToken");
        $state.go("home");
      }
    });
  };
  io.socket.on("spinWheel", function (data) {
    $state.go("spinnerNo", {
      number: btoa(data.result + "roulette" + _.random(0, 9999999))
    });
  });

});

myApp.controller('SpinnerCtrl', function ($scope, $state, $ionicModal, $timeout, $rootScope, $stateParams) {



  io.socket.on("startBetting", function (data) {
    $state.go("roulette");
  });


  var rotationsTime = 8;
  var wheelSpinTime = 6;
  var ballSpinTime = 5;
  var numorder = [
    0,
    32,
    15,
    19,
    4,
    21,
    2,
    25,
    17,
    34,
    6,
    27,
    13,
    36,
    11,
    30,
    8,
    23,
    10,
    5,
    24,
    16,
    33,
    1,
    20,
    14,
    31,
    9,
    22,
    18,
    29,
    7,
    28,
    12,
    35,
    3,
    26
  ];
  var numred = [
    32,
    19,
    21,
    25,
    34,
    27,
    36,
    30,
    23,
    5,
    16,
    1,
    14,
    9,
    18,
    7,
    12,
    3
  ];
  var numblack = [
    15,
    4,
    2,
    17,
    6,
    13,
    11,
    8,
    10,
    24,
    33,
    20,
    31,
    22,
    29,
    28,
    35,
    26
  ];
  var numgreen = [0];
  var numbg = $(".pieContainer");
  var ballbg = $(".ball");
  var btnSpin = $("#btnSpin");
  var toppart = $("#toppart");
  var pfx = $.keyframe.getVendorPrefix();
  var transform = pfx + "transform";
  var rinner = $("#rcircle");
  var numberLoc = [];
  $.keyframe.debug = true;

  $scope.spinner = {
    numberToCome: parseInt(atob($stateParams.number))
  };
  createWheel();
  $scope.results = $rootScope.result;

  function createWheel() {
    var temparc = 360 / numorder.length;
    for (var i = 0; i < numorder.length; i++) {
      numberLoc[numorder[i]] = [];
      numberLoc[numorder[i]][0] = i * temparc;
      numberLoc[numorder[i]][1] = i * temparc + temparc;

      newSlice = document.createElement("div");
      $(newSlice).addClass("hold");
      newHold = document.createElement("div");
      $(newHold).addClass("pie");
      newNumber = document.createElement("div");
      $(newNumber).addClass("num");

      newNumber.innerHTML = numorder[i];
      $(newSlice).attr("id", "rSlice" + i);
      $(newSlice).css(
        "transform",
        "rotate(" + numberLoc[numorder[i]][0] + "deg)"
      );

      $(newHold).css("transform", "rotate(9.73deg)");
      $(newHold).css("-webkit-transform", "rotate(9.73deg)");

      if ($.inArray(numorder[i], numgreen) > -1) {
        $(newHold).addClass("greenbg");
      } else if ($.inArray(numorder[i], numred) > -1) {
        $(newHold).addClass("redbg");
      } else if ($.inArray(numorder[i], numblack) > -1) {
        $(newHold).addClass("greybg");
      }

      $(newNumber).appendTo(newSlice);
      $(newHold).appendTo(newSlice);
      $(newSlice).appendTo(rinner);
    }
  }

  $timeout(function () {
    winningNum = $scope.spinner.numberToCome;
    spinTo(winningNum);
  }, 1000);

  // btnSpin.click(function () {
  //   console.log("btn clicked");
  //   if ($("input").val() == "") {
  //     console.log("inside if");
  //     var rndNum = Math.floor(Math.random() * 34 + 0);
  //   } else {
  //     console.log("inside else");
  //     var rndNum = $("input").val();
  //   }

  //   winningNum = rndNum;
  //   spinTo(winningNum);
  // });

  $("#btnb").click(function () {
    $(".spinner").css("font-size", "+=.3em");
  });
  $("#btns").click(function () {
    $(".spinner").css("font-size", "-=.3em");
  });

  function resetAni() {
    animationPlayState = "animation-play-state";
    playStateRunning = "running";

    $(ballbg)
      .css(pfx + animationPlayState, playStateRunning)
      .css(pfx + "animation", "none");

    $(numbg)
      .css(pfx + animationPlayState, playStateRunning)
      .css(pfx + "animation", "none");
    $(toppart)
      .css(pfx + animationPlayState, playStateRunning)
      .css(pfx + "animation", "none");

    $("#rotate2").html("");
    $("#rotate").html("");
  }

  function spinTo(num) {
    //get location
    var temp = numberLoc[num][0] + 4;

    //randomize
    var rndSpace = Math.floor(Math.random() * 360 + 1);

    resetAni();
    setTimeout(function () {
      bgrotateTo(rndSpace);
      ballrotateTo(rndSpace + temp);
    }, 500);
  }

  function ballrotateTo(deg) {
    var temptime = rotationsTime + 's';
    var dest = -360 * ballSpinTime - (360 - deg);
    $.keyframe.define({
      name: "rotate2",
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(" + dest + "deg)"
      }
    });

    $(ballbg).playKeyframe({
      name: "rotate2", // name of the keyframe you want to bind to the selected element
      duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
      complete: function () {
        // finishSpin();
      } //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
    });
  }

  function bgrotateTo(deg) {
    var dest = 360 * wheelSpinTime + deg;
    var temptime = (rotationsTime * 1000 - 1000) / 1000 + 's';

    $.keyframe.define({
      name: "rotate",
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(" + dest + "deg)"
      }
    });

    $(numbg).playKeyframe({
      name: "rotate", // name of the keyframe you want to bind to the selected element
      duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
      complete: function () {} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
    });

    $(toppart).playKeyframe({
      name: "rotate", // name of the keyframe you want to bind to the selected element
      duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
      complete: function () {} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
    });
  }
});

myApp.factory('RouletteService', function ($http, $ionicLoading, $ionicActionSheet, $timeout, $state) {
  return {
    getLastResults: function (callback) {
      $http.get(adminRoulette + '/api/game/getLastResults').then(function (data) {
        callback(data.data.data);
      });
    },
    saveUserBets: function (data, callback) {

    }
  };
});
