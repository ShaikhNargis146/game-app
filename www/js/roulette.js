myApp.controller('HomeCtrl', function ($scope, $ionicModal, Service, $state, $timeout, $rootScope) {
    console.log("hiiii")
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
  
    $scope.coins = ["coin1", "coin2", "coin3", "coin4", "coin5", "coin6"];
  
    $scope.coinSelect = function (coin) {
      switch (coin) {
        case "coin1":
          console.log("#### coin1");
          $scope.coinSelects = "coin1";
          // $scope.coin1Select = true;
          // $scope.coin2Select = false;
          // $scope.coin3Select = false;
          // $scope.coin4Select = false;
          // $scope.coin5Select = false;
          // $scope.coin6Select = false;
          // $scope.coin7Select = false;
          if ($scope.coin1) {
  
          } else {
            $scope.coin1 = {
              coin1: true,
              amount: 0.1,
              count: 0
            }
          }
          break;
        case "coin2":
          console.log("#### coin2");
          $scope.coinSelects = "coin2";
          if ($scope.coin2) {
  
          } else {
            $scope.coin2 = {
              coin2: true,
              amount: 1,
              count: 0
            }
          }
          // $scope.coin1Select = false;
          // $scope.coin2Select = true;
          // $scope.coin3Select = false;
          // $scope.coin4Select = false;
          // $scope.coin5Select = false;
          // $scope.coin6Select = false;
          // $scope.coin7Select = false;
          break;
        case "coin3":
          // $scope.coin3 = true;
          $scope.coinSelects = "coin3";
          if ($scope.coin3) {
  
          } else {
            $scope.coin3 = {
              coin3: true,
              amount: 5,
              count: 0
            }
          }
          break;
        case "coin4":
          // $scope.coin4 = true;
          $scope.coinSelects = "coin4";
          if ($scope.coin4) {
  
          } else {
            $scope.coin4 = {
              coin4: true,
              amount: 10,
              count: 0
            }
          }
          break;
        case "coin5":
          // $scope.coin5 = true;
          $scope.coinSelects = "coin5";
          if ($scope.coin5) {
  
          } else {
            $scope.coin5 = {
              coin5: true,
              amount: 25,
              count: 0
            }
          }
          break;
        case "coin6":
          // $scope.coin6 = true;
          $scope.coinSelects = "coin6";
          if ($scope.coin6) {
  
          } else {
            $scope.coin6 = {
              coin6: true,
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
    $scope.betUser = [];
    $scope.singleField1 = [];
    $scope.singleField2 = [];
    $scope.singleField3 = [];
    $scope.singleField4 = [];
    $scope.singleField5 = [];
    $scope.singleField6 = [];
  
  
    $scope.place = [];
  
    $scope.amount = $scope.betAmount = 0;
    $scope.userBet = function (betName, bet) {
      var field = bet;
      $scope.bet[field] = betName;
      $scope.userBet1 = {
        user: $.jStorage.get("singlePlayerData")._id
      }
      if ($scope.coinSelects) {
        if ($scope.coinSelects == "coin1") {
          $scope.coin1[field] = true;
          $scope.coin1.count++;
          $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin1.amount;
          $scope.amount = $scope.amount + $scope.coin1.amount;
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
  
          if (!_.isEmpty($scope.place[betName])) {
            var c = 0;
            for (i = 0; i < $scope.place[betName].img.length; i++) {
              if ($scope.place[betName].img[i].id == 1) {
                c++;
              }
            }
  
            if (c == 10) {
  
              var newarr = $scope.place[betName].img.filter(function (a) {
                return a.id !== 1
              });
  
              $scope.place[betName].img = newarr;
  
              $scope.place[betName].img.push({
                img: "img/roulette/coin2.png",
                id: 2
              });
            }
          }
          console.log($scope.place);
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
  
          if (!_.isEmpty($scope.place[betName])) {
            var c = 0;
            for (i = 0; i < $scope.place[betName].img.length; i++) {
              if ($scope.place[betName].img[i].id == 2) {
                c++;
              }
            }
  
            if (c == 5) {
  
              var newarr = $scope.place[betName].img.filter(function (a) {
                return a.id !== 2
              });
  
              $scope.place[betName].img = newarr;
  
              $scope.place[betName].img.push({
                img: "img/roulette/coin3.png",
                id: 3
              });
            }
          }
          console.log($scope.place);
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
  
          if (!_.isEmpty($scope.place[betName])) {
            var c = 0;
            for (i = 0; i < $scope.place[betName].img.length; i++) {
              if ($scope.place[betName].img[i].id == 3) {
                c++;
              }
            }
  
            if (c == 2) {
  
              var newarr = $scope.place[betName].img.filter(function (a) {
                return a.id !== 3
              });
  
              $scope.place[betName].img = newarr;
  
              $scope.place[betName].img.push({
                img: "img/roulette/coin4.png",
                id: 4
              });
            }
          }
          console.log($scope.place);
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
  
          if (!_.isEmpty($scope.place[betName])) {
            var c = 0;
            for (i = 0; i < $scope.place[betName].img.length; i++) {
              if ($scope.place[betName].img[i].id == 4) {
                c++;
              }
            }
  
            if (c == 3) {
  
              var newarr = $scope.place[betName].img.filter(function (a) {
                return a.id !== 4
              });
  
              $scope.place[betName].img = newarr;
  
              $scope.place[betName].img.push({
                img: "img/roulette/coin5.png",
                id: 5
              });
            }
          }
          console.log($scope.place);
        }
        if ($scope.coinSelects == "coin5") {
          $scope.coin5[field] = true;
          $scope.coin5.count++;
          $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin5.amount;
          $scope.amount = $scope.amount + $scope.coin5.amount;
          if (_.isEmpty($scope.place[betName])) {
            $scope.place[betName] = {
              img: []
            };
            $scope.place[betName].img.push({
              img: "img/roulette/coin5.png",
              id: 5
            });
          } else {
            $scope.place[betName].img.push({
              img: "img/roulette/coin5.png",
              id: 5
            });
          }
  
          if (!_.isEmpty($scope.place[betName])) {
            var c = 0;
            for (i = 0; i < $scope.place[betName].img.length; i++) {
              if ($scope.place[betName].img[i].id == 5) {
                c++;
              }
            }
  
            if (c == 4) {
  
              var newarr = $scope.place[betName].img.filter(function (a) {
                return a.id !== 5
              });
  
              $scope.place[betName].img = newarr;
  
              $scope.place[betName].img.push({
                img: "img/roulette/coin6.png",
                id: 6
              });
            }
          }
          console.log($scope.place);
        }
        if ($scope.coinSelects == "coin6") {
          $scope.coin6[field] = true;
          $scope.coin6.count++;
          $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin6.amount;
          $scope.amount = $scope.amount + $scope.coin6.amount;
          if (_.isEmpty($scope.place[betName])) {
            $scope.place[betName] = {
              img: []
            };
            $scope.place[betName].img.push({
              img: "img/roulette/coin6.png",
              id: 6
            });
          } else {
            $scope.place[betName].img.push({
              img: "img/roulette/coin6.png",
              id: 6
            });
          }
  
          if (!_.isEmpty($scope.place[betName])) {
            var c = 0;
            for (i = 0; i < $scope.place[betName].img.length; i++) {
              if ($scope.place[betName].img[i].id == 6) {
                c++;
              }
            }
  
            // if (c == 3) {
  
            //   var newarr = $scope.place[betName].img.filter(function (a) {
            //     return a.id !== 4
            //   });
  
            //   $scope.place[betName].img = newarr;
  
            //   $scope.place[betName].img.push({
            //     img: "img/coin5.png",
            //     id: 5
            //   });
            // }
          }
          console.log($scope.place);
        }
        if ($scope.amountBet[field]) {
          $scope.amountBet[field] = $scope.amountBet[field] + $scope.betAmount;
        } else {
          $scope.amountBet[field] = $scope.betAmount;
        }
        console.log("$scope.amountBet$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", $scope.newArray);
        console.log("$scope.amountBet################################", $scope.amountBet[field]);
        if ($scope.betUser.length != 0) {
          var index = _.find($scope.betUser,
            function (o) {
              return o.bet == betName;
            });
  
          if (index == undefined) {
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
  
        console.log("$scope.betAmount", $scope.betAmount);
        console.log("$scope.amount[field]$scope.amount[field]", $scope.amountBet);
        console.log("$scope.amount $scope.amount ", $scope.amount);
        console.log(" $scope.betUser $scope.betUser ", $scope.betUser);
  
        console.log("$scope.userBet1", $scope.userBet1);
      } else {
        $scope.message = {
          heading: "Please Select coin",
          content: "Please Select the coin Before Bet. Try Again!!!"
        };
        $scope.showMessageModal();
      }
  
    }
    if ($scope.betUser) {
      // $timeout(function () {
  
      // }, 30000);
    }
  
    io.socket.on("betsNotAllowed", function (data) {
      console.log("in socket", data);
      if (data.data == "Bets are Not Allowed") {
        console.log("in timeout function ", $scope.betUser);
        if ($scope.betUser) {
          _.each($scope.betUser, function (user) {
            Service.saveUserBets(user, function (data) {
              console.log("################", data);
              $rootScope.result = data.data.results;
            })
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
    }
    var btnSpin = $("#btnSpin");
    btnSpin.click(function () {
      console.log("btn clicked");
      $state.go("spinner");
    });
  })
  
  
  myApp.controller('SpinnerCtrl', function ($scope, $ionicModal, $timeout, $rootScope) {
    console.log("Spinner");
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
    console.log("$.keyframe", $.keyframe);
    var pfx = $.keyframe.getVendorPrefix();
    var transform = pfx + "transform";
    var rinner = $("#rcircle");
    var numberLoc = [];
    $.keyframe.debug = true;
  
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
      //console.log(numberLoc);
    }
  
    $timeout(function () {
      console.log("btn clicked");
      if ($("input").val() == "") {
        console.log("inside if");
        var rndNum = Math.floor(Math.random() * 34 + 0);
      } else {
        console.log("inside else");
        var rndNum = $("input").val();
      }
  
      winningNum = rndNum;
      spinTo(winningNum);
    }, 100);
  
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
  })
  