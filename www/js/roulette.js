myApp.controller('HomeCtrl', function ($scope, $ionicModal, Service, $state, $timeout, $rootScope) {
  //   $ionicModal.fromTemplateUrl('../modal/spinner.html', {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  //   }).then(function(modal) {
  //     $scope.modal = modal;
  //   });
  // $scope.openModal = function () {
  //   $scope.modal.show();
  // };
  //   $scope.closeModal = function() {
  //     $scope.modal.hide();
  //   };

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

  $scope.coins = ["coin1", "coin2", "coin3", "coin4"];

  $scope.coinSelect = function (coin) {
    switch (coin) {
      case "coin1":
        $scope.coinSelects = "coin1";
        if ($scope.coin1) {

        } else {
          $scope.coin1 = {
            coin1: true,
            amount: 1,
            count: 0
          }
        }
        break;
      case "coin2":
        $scope.coinSelects = "coin2";
        if ($scope.coin2) {

        } else {
          $scope.coin2 = {
            coin2: true,
            amount: 5,
            count: 0
          };
        }
        break;
      case "coin3":
        // $scope.coin3 = true;
        $scope.coinSelects = "coin3";
        if ($scope.coin3) {

        } else {
          $scope.coin3 = {
            coin3: true,
            amount: 10,
            count: 0
          }
        }
        break;
      case "coin4":
        $scope.coinSelects = "coin4";
        if ($scope.coin4) {

        } else {
          $scope.coin4 = {
            coin4: true,
            amount: 100,
            count: 0
          }
        }
        break;
      default:
        break;
    }
  }
  $ionicModal.fromTemplateUrl('modal/message.html', {
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

  $scope.bet = [];
  $scope.amountBet = [];
  $scope.totalMoney = 10000;
  $scope.betUser = [];
  $scope.place = [];
  $scope.displayArray = [];

  $scope.amount = $scope.betAmount = 0;
  $scope.userBet = function (betName, bet) {
    var field = bet;
    $scope.bet[field] = betName;
    $scope.userBet1 = {
      user: $.jStorage.get("singlePlayerData")._id
    }


    $scope.createTemp = function (data) {
      var temp = data;
      if (!_.isEmpty(temp)) {
        var coin1 = 0;
        var coin2 = 0;
        var coin3 = 0;
        var coin4 = 0;
        for (i = 0; i < temp.img.length; i++) {
          if (temp.img[i].id == 1) {
            coin1++;
          }
          if (temp.img[i].id == 2) {
            coin2++;
          }
          if (temp.img[i].id == 3) {
            coin3++;
          }
        }
        if (coin1 >= 5) {
          coin1div = coin1 / 5;
          coin1mod = coin1 % 5;
          for (i = 0; i < coin1div; i++) {
            temp.img.push({
              img: "img/roulette/coin2.png",
              id: 2
            });
            coin2++;
          }
          temp.img = temp.img.filter(function (a) {
            return a.id !== 1;
          });
          for (i = 0; i < coin1mod; i++) {
            temp.img.push({
              img: "img/roulette/coin1.png",
              id: 1
            });
          }
          coin1 = coin1mod;
        }
        if (coin2 >= 2) {
          coin2div = coin2 / 2;
          coin2mod = coin2 % 2;
          for (i = 0; i < coin2div; i++) {
            temp.img.push({
              img: "img/roulette/coin3.png",
              id: 3
            });
            coin3++;
          }
          temp.img = temp.img.filter(function (a) {
            return a.id !== 2;
          });
          for (i = 0; i < coin2mod; i++) {
            temp.img.push({
              img: "img/roulette/coin2.png",
              id: 2
            });
          }
          coin2 = coin2mod;
        }
        if (coin3 >= 10) {
          coin3div = coin3 / 10;
          coin3mod = coin3 % 10;
          for (i = 0; i < coin3div; i++) {
            temp.img.push({
              img: "img/roulette/coin4.png",
              id: 4
            });
            coin4++;
          }
          temp.img = temp.img.filter(function (a) {
            return a.id !== 3;
          });
          for (i = 0; i < coin3mod; i++) {
            temp.img.push({
              img: "img/roulette/coin3.png",
              id: 3
            });
          }
          coin3 = coin3mod;
        }
      }
      return temp;
    };

    if ($scope.coinSelects) {
      if ($scope.coinSelects == "coin1") {
        $scope.coin1[field] = true;
        $scope.coin1.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin1.amount;
        $scope.amount = _.round($scope.amount + $scope.coin1.amount, 2);
        if (_.isEmpty($scope.place[betName])) {
          $scope.place[betName] = {
            img: []
          };
          $scope.place[betName].img.push({
            img: "img/roulette/coin1.png",
            id: 1
          });
        } else {
          $scope.place[betName].img.push({
            img: "img/roulette/coin1.png",
            id: 1
          });
        }
        $scope.displayArray[betName] = $scope.createTemp($scope.place[betName]);
      }
      if ($scope.coinSelects == "coin2") {
        $scope.coin2[field] = true;
        $scope.coin2.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin2.amount;
        $scope.amount = $scope.amount + $scope.coin2.amount;
        if (_.isEmpty($scope.place[betName])) {
          $scope.place[betName] = {
            img: []
          };
          $scope.place[betName].img.push({
            img: "img/roulette/coin2.png",
            id: 2
          });
        } else {
          $scope.place[betName].img.push({
            img: "img/roulette/coin2.png",
            id: 2
          });
        }
        $scope.displayArray[betName] = $scope.createTemp($scope.place[betName]);
      }
      if ($scope.coinSelects == "coin3") {
        $scope.coin3[field] = true;
        $scope.coin3.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin3.amount;
        $scope.amount = $scope.amount + $scope.coin3.amount;
        if (_.isEmpty($scope.place[betName])) {
          $scope.place[betName] = {
            img: []
          };
          $scope.place[betName].img.push({
            img: "img/roulette/coin3.png",
            id: 3
          });
        } else {
          $scope.place[betName].img.push({
            img: "img/roulette/coin3.png",
            id: 3
          });
        }
        $scope.displayArray[betName] = $scope.createTemp($scope.place[betName]);
      }
      if ($scope.coinSelects == "coin4") {
        $scope.coin4[field] = true;
        $scope.coin4.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin4.amount;
        $scope.amount = $scope.amount + $scope.coin4.amount;
        if (_.isEmpty($scope.place[betName])) {
          $scope.place[betName] = {
            img: []
          };
          $scope.place[betName].img.push({
            img: "img/roulette/coin4.png",
            id: 4
          });
        } else {
          $scope.place[betName].img.push({
            img: "img/roulette/coin4.png",
            id: 4
          });
        }
        $scope.displayArray[betName] = $scope.createTemp($scope.place[betName]);
      }


      if ($scope.amountBet[field]) {
        $scope.amountBet[field] = $scope.amountBet[field] + $scope.betAmount;
      } else {
        $scope.amountBet[field] = $scope.betAmount;
      }
      $scope.totalMoney = $scope.totalMoney - $scope.betAmount;
      console.log("TOTALMONEY", $scope.totalMoney, $scope.betAmount);
      if ($scope.betUser.length !== 0) {
        var index = _.find($scope.betUser,
          function (o) {
            return o.bet == betName;
          });

        if (!index) {
          $scope.betUser.push({
            bet: betName,
            amountplaces: $scope.amountBet[bet]
          });
        } else {
          index.amountplaces = $scope.amountBet[bet];
        }
      } else {
        $scope.betUser.push({
          bet: betName,
          amountplaces: $scope.amountBet[bet]
        });
      }
    } else {
      $scope.message = {
        heading: "Please Select coin",
        content: "Please Select the coin Before Bet. Try Again!!!"
      };
      $scope.showMessageModal();
    }

  };
  if ($scope.betUser) {
    // $timeout(function () {

    // }, 30000);
  }

  io.socket.on("betsNotAllowed", function (data) {
    if (data.data == "Bets are Not Allowed") {
      if ($scope.betUser) {
        _.each($scope.betUser, function (user) {
          Service.saveUserBets(user, function (data) {
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


myApp.controller('SpinnerCtrl', function ($scope, $ionicModal, $timeout, $rootScope, $stateParams) {
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
